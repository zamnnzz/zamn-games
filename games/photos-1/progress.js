import {
  initializeApp,
  getApp,
  getApps
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {
  getDatabase,
  ref,
  get,
  onValue,
  runTransaction,
  update
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyACS3IRZjIEkBk38y5C3uXOTa8N2ju8jwA",
  authDomain: "picture-game-8946e.firebaseapp.com",
  databaseURL: "https://picture-game-8946e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "picture-game-8946e",
  storageBucket: "picture-game-8946e.firebasestorage.app",
  messagingSenderId: "246477951240",
  appId: "1:246477951240:web:e0e2666fddb83f4ada5cbd",
  measurementId: "G-00NCKBL9Q8"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

let activeUser = null;
let ready = false;
let applyingRemote = false;
let saveInProgress = false;
let saveQueued = false;
let stopRealtimeListener = null;
let fallbackTimer = null;
let lastSerializedState = "";

function getBridge(){
  return window.gameProgressBridge || null;
}

function setAccountStatus(text){
  const subtitle = document.getElementById("levelsAccountSubtitle");
  if(subtitle && activeUser){
    subtitle.textContent = text;
  }
}

function normalizeState(state){
  return {
    unlockedLevel: Math.max(1, Number(state?.unlockedLevel) || 1),
    hintBalances: state?.hintBalances || {},
    hintCooldowns: state?.hintCooldowns || {},
    fastAnswerProgress: Math.max(
      0,
      Number(state?.fastAnswerProgress) || 0
    ),
    fastAnswerTarget: Math.max(
      1,
      Number(state?.fastAnswerTarget) || 3
    )
  };
}

function serializeState(state){
  return JSON.stringify(normalizeState(state));
}

function mergeRemoteIntoLocal(localState, remoteState){
  const local = normalizeState(localState);
  const remote = normalizeState(remoteState);

  return {
    // المرحلة الأعلى هي المعتمدة دائمًا ولا يمكن أن ترجع للخلف.
    unlockedLevel: Math.max(
      local.unlockedLevel,
      remote.unlockedLevel
    ),

    // القيم الأخرى تأخذ النسخة الأحدث القادمة من Firebase.
    hintBalances: remote.hintBalances || local.hintBalances,
    hintCooldowns: remote.hintCooldowns || local.hintCooldowns,
    fastAnswerProgress: Math.max(
      local.fastAnswerProgress,
      remote.fastAnswerProgress
    ),
    fastAnswerTarget: Math.max(
      local.fastAnswerTarget,
      remote.fastAnswerTarget
    )
  };
}

async function saveProgress(force = false){
  if(!ready || applyingRemote || !activeUser || activeUser.isAnonymous){
    return false;
  }

  const bridge = getBridge();
  if(!bridge?.getState) return false;

  if(saveInProgress){
    saveQueued = true;
    return false;
  }

  const localProgress = normalizeState(bridge.getState());
  const serialized = serializeState(localProgress);

  if(!force && serialized === lastSerializedState){
    return true;
  }

  saveInProgress = true;
  saveQueued = false;

  try{
    const progressRef = ref(
      db,
      `users/${activeUser.uid}/progress`
    );

    const result = await runTransaction(
      progressRef,
      currentValue => {
        const remote = normalizeState(currentValue || {});

        return {
          ...localProgress,
          unlockedLevel: Math.max(
            localProgress.unlockedLevel,
            remote.unlockedLevel
          ),
          updatedAt: Date.now()
        };
      },
      {applyLocally: false}
    );

    const savedProgress = normalizeState(
      result.snapshot.val() || localProgress
    );

    // إذا كان Firebase يحتوي على مرحلة أعلى، طبقها محليًا.
    if(savedProgress.unlockedLevel > localProgress.unlockedLevel){
      applyingRemote = true;
      try{
        bridge.applyState(savedProgress);
      }finally{
        applyingRemote = false;
      }
    }

    await update(
      ref(db, `users/${activeUser.uid}/profile`),
      {
        name: activeUser.displayName || "",
        email: activeUser.email || "",
        photoURL: activeUser.photoURL || ""
      }
    );

    lastSerializedState = serializeState(bridge.getState());
    setAccountStatus("تم تسجيل الدخول — تقدمك محفوظ ومتزامن");
    return true;
  }catch(error){
    console.error("Progress save failed:", error);
    setAccountStatus(
      "تعذر الحفظ السحابي — التقدم محفوظ على هذا الجهاز"
    );
    return false;
  }finally{
    saveInProgress = false;

    if(saveQueued){
      saveQueued = false;
      setTimeout(() => {
        saveProgress(true).catch(() => {});
      }, 80);
    }
  }
}

function applyRemoteProgress(remoteValue){
  if(!activeUser || applyingRemote) return;

  const bridge = getBridge();
  if(!bridge?.getState || !bridge?.applyState) return;

  const local = normalizeState(bridge.getState());
  const remote = normalizeState(remoteValue || {});
  const merged = mergeRemoteIntoLocal(local, remote);

  if(serializeState(merged) === serializeState(local)){
    lastSerializedState = serializeState(local);
    return;
  }

  applyingRemote = true;
  try{
    bridge.applyState(merged);
    lastSerializedState = serializeState(bridge.getState());
    setAccountStatus("تم تحديث تقدمك من جهاز آخر");
  }finally{
    applyingRemote = false;
  }
}

async function connectUser(user){
  const bridge = getBridge();

  if(!bridge?.getState || !bridge?.applyState){
    throw new Error("Game progress bridge is unavailable");
  }

  const progressRef = ref(
    db,
    `users/${user.uid}/progress`
  );

  const snapshot = await get(progressRef);

  if(snapshot.exists()){
    applyRemoteProgress(snapshot.val());
  }else{
    ready = true;
    await saveProgress(true);
  }

  if(stopRealtimeListener){
    stopRealtimeListener();
  }

  stopRealtimeListener = onValue(
    progressRef,
    snapshotValue => {
      if(snapshotValue.exists()){
        applyRemoteProgress(snapshotValue.val());
      }
    },
    error => {
      console.error("Realtime progress listener failed:", error);
      setAccountStatus("تعذر التحديث اللحظي");
    }
  );

  clearInterval(fallbackTimer);
  fallbackTimer = setInterval(() => {
    saveProgress(false).catch(() => {});
  }, 10000);
}

onAuthStateChanged(auth, async user => {
  if(stopRealtimeListener){
    stopRealtimeListener();
    stopRealtimeListener = null;
  }

  clearInterval(fallbackTimer);
  fallbackTimer = null;

  activeUser = user && !user.isAnonymous ? user : null;
  ready = false;
  lastSerializedState = "";

  if(!activeUser){
    return;
  }

  try{
    await connectUser(activeUser);
  }catch(error){
    console.error("Progress connection failed:", error);
    setAccountStatus(
      "تعذر ربط التقدم — سيستمر الحفظ المحلي"
    );
  }finally{
    ready = true;
  }
});

window.addEventListener("pagehide", () => {
  saveProgress(true).catch(() => {});
});

window.addEventListener("online", () => {
  saveProgress(true).catch(() => {});
});

window.addEventListener("focus", () => {
  saveProgress(true).catch(() => {});
});

document.addEventListener("visibilitychange", () => {
  if(document.visibilityState === "visible"){
    saveProgress(true).catch(() => {});
  }
});

window.gameCloudProgress = {
  saveNow: () => saveProgress(true)
};
