const admin = require("firebase-admin");

const PRODUCT_GAMES = {
  "769912795": ["1950"],
  "1919105503": ["116677"],
  "1743830549": ["20026"],
  "1190070368": ["20066"],
  "1311241515": ["19009"],
  "2017869223": ["140004"],
  "932315838": ["119900"],
  "1490828167": ["191909"],
  "967171060": ["109010"],
  "893537775": ["1950", "116677", "191909", "140004", "20066", "19009", "119900"],
  "1029842905": ["191909", "20066", "19009", "20026"],
  "1738957153": ["1950", "116677"]
};

const NAME_GAMES = [
  [/بكج فالكون.*حروف.*تحدي الصور/u, ["1950", "116677"]],
  [/بكج 7 العاب/u, ["1950", "116677", "191909", "140004", "20066", "19009", "119900"]],
  [/بكج 4 العاب/u, ["191909", "20066", "19009", "20026"]],
  [/حروف/u, ["1950"]],
  [/تحدي.*صور|خمن.*صور/u, ["116677"]],
  [/فوازير/u, ["20026"]],
  [/خمن الرابط/u, ["20066"]],
  [/فاميلي فيود/u, ["19009"]],
  [/الأطرش|الاطرش/u, ["140004"]],
  [/توب تن/u, ["119900"]],
  [/من أنا|من انا/u, ["191909"]],
  [/الجواب المجهول/u, ["109010"]]
];

function send(res, status, body) {
  res.status(status).setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

function normalizePhone(value) {
  let phone = String(value || "").replace(/[^0-9]/g, "");
  if (phone.startsWith("00")) phone = phone.slice(2);
  if (phone.startsWith("05") && phone.length === 10) phone = "966" + phone.slice(1);
  if (phone.startsWith("5") && phone.length === 9) phone = "966" + phone;
  return phone;
}

function gamesForItem(item) {
  const productId = String(item?.product?.id || item?.product_id || "");
  if (PRODUCT_GAMES[productId]) return PRODUCT_GAMES[productId];
  const name = String(item?.name || item?.product?.name || "").trim();
  return [...new Set(
    NAME_GAMES.flatMap(([pattern, gameCodes]) => pattern.test(name) ? gameCodes : [])
  )];
}

function getApp() {
  if (admin.apps.length) return admin.app();
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON || "{}");
  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://zamn-games-default-rtdb.europe-west1.firebasedatabase.app"
  });
}

module.exports = async function activateOrder(req, res) {
  if (req.method !== "POST") return send(res, 405, { ok: false, error: "method_not_allowed" });

  const expected = process.env.ZAMN_ACTIVATION_SECRET || "";
  const supplied = String(req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  if (!expected || supplied !== expected) return send(res, 401, { ok: false, error: "unauthorized" });

  const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
  if (body.status !== "completed") return send(res, 422, { ok: false, error: "order_not_completed" });

  const phone = normalizePhone(body.phone);
  if (phone.length < 10 || phone.length > 15) return send(res, 422, { ok: false, error: "invalid_phone" });

  const items = Array.isArray(body.items) ? body.items : [];
  const gameCodes = [...new Set(items.flatMap(gamesForItem))];
  if (!gameCodes.length) return send(res, 422, { ok: false, error: "unmapped_products" });

  const orderId = String(body.order_id || "").replace(/[^0-9A-Za-z_-]/g, "");
  if (!orderId) return send(res, 422, { ok: false, error: "invalid_order_id" });

  getApp();
  const updates = {};
  for (const code of gameCodes) updates[`customers/${phone}/games/${code}`] = true;
  updates[`customers/${phone}/purchases/${orderId}`] = {
    gameCodes,
    source: "salla",
    activatedAt: admin.database.ServerValue.TIMESTAMP
  };
  await admin.database().ref().update(updates);

  return send(res, 200, { ok: true, order_id: orderId, activated_games: gameCodes });
};
