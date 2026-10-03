// Shared round rules for the host and display.
(function () {
  function turnFor(record) {
    return record.turn || { firstTeam:null, activeTeam:null, strikes:{1:0,2:0}, stealMode:false, claimed:false };
  }
  function award(data, record, team, reason) {
    const points = Number(record.points) || 0;
    const scores = data.scores || {c1:0,c2:0};
    scores['c' + team] = (Number(scores['c' + team]) || 0) + points;
    data.scores = scores;
    Object.assign(record,{completed:true,show:true,awardedTeam:team,awardedPoints:points,result:reason});
    data.status = {locked:true,time:Date.now()};
    if (Array.isArray(data.questionOrder) && data.state.index === data.questionOrder.length - 1) {
      data.lifecycle = {...data.lifecycle,finished:true};
    }
  }
  async function change(db, session, index, mutate) {
    const ref = db.ref('games/' + session);
    const snapshot = await ref.once('value');
    if (!snapshot.exists()) throw new Error('Session missing');
    return ref.transaction(data => {
      if (!data) return null;
      if ((data.state?.index || 0) !== index || !data.lifecycle?.started) return;
      data.rounds = data.rounds || {};
      const record = data.rounds[index] || {points:0,revealed:{}};
      if (record.completed || mutate(data,record) === false) return;
      data.rounds[index] = record;
      data.round = {points:Number(record.points) || 0};
      return data;
    }, undefined, false);
  }
  window.FeudRules = {
    pickQuestions(total,count) {
      if (!Number.isInteger(count) || count < 1 || count > total) throw new Error('Invalid question count');
      const ids = Array.from({length:total},(_,i) => i);
      for (let i=ids.length-1;i>0;i--) {
        const j=Math.floor(Math.random()*(i+1));
        [ids[i],ids[j]]=[ids[j],ids[i]];
      }
      return ids.slice(0,count);
    },
    async showResults(db,session) {
      const data = (await db.ref('games/' + session).once('value')).val();
      if (!data?.lifecycle?.finished) return;
      document.getElementById('finalResults')?.remove();
      const overlay = document.createElement('div');
      overlay.id = 'finalResults';
      overlay.setAttribute('role','dialog');
      overlay.setAttribute('aria-modal','true');
      overlay.style.cssText = 'position:fixed;inset:0;z-index:11000;background:#020819dc;backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:16px;font-family:Arial,sans-serif;color:white';
      const card=document.createElement('div');
      card.style.cssText='width:min(100%,420px);max-height:90dvh;overflow:auto;padding:30px 24px;text-align:center;border:1px solid #d9b965;border-radius:24px;background:linear-gradient(145deg,#142f58,#040e23);box-shadow:0 24px 80px #0008';
      const names=data.settings?.teamNames || {c1:'الفريق الأول',c2:'الفريق الثاني'};
      const scores=data.scores || {c1:0,c2:0};
      const heading=document.createElement('h2');heading.textContent='انتهت اللعبة';heading.style.color='#ffe09a';
      const winner=document.createElement('p');winner.textContent=scores.c1===scores.c2 ? 'تعادل!' : 'الفائز: ' + names[scores.c1>scores.c2 ? 'c1':'c2'];winner.style.cssText='font-size:22px;font-weight:bold;overflow-wrap:anywhere';
      const summary=document.createElement('p');summary.textContent=names.c1 + ': ' + (scores.c1||0) + '  —  ' + names.c2 + ': ' + (scores.c2||0);summary.style.cssText='color:#b6c9e7;line-height:1.7;overflow-wrap:anywhere';
      const review=document.createElement('button');review.textContent='مراجعة النتائج';review.style.cssText='width:100%;padding:13px;margin-top:16px;border:1px solid #ffe59d;border-radius:10px;background:#f4cc61;color:#14223b;font-size:15px;font-weight:bold;cursor:pointer';review.onclick=()=>overlay.remove();
      card.append(heading,winner,summary,review);overlay.append(card);document.body.append(overlay);
    },
    claim(db,session,index,team) {
      return change(db,session,index,(data,record) => {
        const turn = turnFor(record);
        if (turn.claimed) return false;
        const fastest = Object.values(data.buzzers || {}).sort((a,b) => a.time - b.time)[0];
        if (!fastest || !['c1','c2'].includes(fastest.team) || (fastest.team === 'c1' ? 1 : 2) !== team) return false;
        data.status = {locked:true,time:Date.now()};
        record.turn = {...turn,firstTeam:team,activeTeam:team,claimed:true};
      });
    },
    answer(db,session,index,answerIndex,answers) {
      return change(db,session,index,(data,record) => {
        const turn = turnFor(record);
        if (!turn.claimed || ![1,2].includes(turn.firstTeam)) return false;
        if (!answers[answerIndex] || record.revealed?.[answerIndex]) return false;
        record.revealed = {...record.revealed,[answerIndex]:true};
        record.points = answers.reduce((sum,answer,i) => sum + (record.revealed[i] ? answer.p : 0),0);
        record.show = true;
        record.turn = turn;
        if (turn.stealMode) award(data,record,turn.activeTeam,'steal-success');
        else if (answers.every((_,i) => record.revealed[i])) award(data,record,turn.firstTeam,'all-answers');
      });
    },
    error(db,session,index) {
      return change(db,session,index,(data,record) => {
        const turn = turnFor(record);
        if (!turn.claimed || ![1,2].includes(turn.firstTeam)) return false;
        turn.strikes = {...turn.strikes};
        turn.strikes[turn.activeTeam] = (turn.strikes[turn.activeTeam] || 0) + 1;
        record.turn = turn;
        if (turn.stealMode) award(data,record,turn.firstTeam,'steal-failed');
        else if (turn.strikes[turn.firstTeam] >= 3) {
          turn.stealMode = true;
          turn.activeTeam = turn.firstTeam === 1 ? 2 : 1;
          data.status = {locked:true,time:Date.now()};
        }
      });
    }
  };
})();
