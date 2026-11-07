const crypto = require('crypto');
const admin = require('firebase-admin');
const {CODES,BUNDLES}=require("./_lib/activation-catalog");
const {trackingUpdates}=require("./_lib/activation-tracking");
function digits(v){return String(v||'').replace(/[٠-٩]/g,d=>'0123456789'['٠١٢٣٤٥٦٧٨٩'.indexOf(d)]).replace(/[۰-۹]/g,d=>'0123456789'['۰۱۲۳۴۵۶۷۸۹'.indexOf(d)]).replace(/\D/g,'');}
function reply(res,status,data){res.setHeader('Cache-Control','no-store');res.setHeader('Content-Type','application/json; charset=utf-8');res.status(status).end(JSON.stringify(data));}
function database(){
 if(!admin.apps.length){const credential=JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON||'{}');if(!credential.private_key)throw Error('not_configured');admin.initializeApp({credential:admin.credential.cert(credential),databaseURL:'https://zamn-games-default-rtdb.europe-west1.firebasedatabase.app'});}
 return admin.database();
}
module.exports=async function(req,res){
 if(req.method!=='POST')return reply(res,405,{ok:false,error:'method_not_allowed'});
 try{
  const origin=req.headers.origin;
  if(origin){let host;try{host=new URL(origin).host;}catch{return reply(res,403,{ok:false,error:'forbidden'});}if(host!==req.headers.host)return reply(res,403,{ok:false,error:'forbidden'});}
  const body=typeof req.body==='string'?JSON.parse(req.body):req.body||{};
  const phone=digits(body.phone);if(!/^\d{10,15}$/.test(phone))return reply(res,422,{ok:false,error:'invalid_phone'});
  if(!['library','activate'].includes(body.action))return reply(res,422,{ok:false,error:'invalid_action'});
  const db=database();
  let activation=null;
  if(body.action==='activate'){
   const ip=String(req.headers['x-forwarded-for']||req.socket?.remoteAddress||'unknown').split(',')[0].trim();
   const bucket=Math.floor(Date.now()/900000),id=crypto.createHash('sha256').update(ip).digest('hex');
   const limit=await db.ref('activationRateV1/'+id).transaction(v=>{if(v?.bucket===bucket&&v.count>=15)return;return {bucket,count:v?.bucket===bucket?v.count+1:1};});
   if(!limit.committed)return reply(res,429,{ok:false,error:'too_many_attempts'});
   const entered=digits(body.code),bundle=BUNDLES[entered];
   if(bundle){
    // Package codes grant only the explicitly listed current games, atomically.
    if(body.slug&&!bundle.games.includes(body.slug))return reply(res,422,{ok:false,error:'invalid_code'});
    const grants=Object.fromEntries(bundle.games.map(slug=>[CODES[slug],true]));
    const updates=Object.fromEntries(Object.entries(grants).map(([code,value])=>['customers/'+phone+'/games/'+code,value]));
    Object.assign(updates,await trackingUpdates(db,phone,[{type:'bundle',id:bundle.id}], 'code'));
    await db.ref().update(updates);
    activation={type:'bundle',id:bundle.id,name:bundle.name,count:bundle.games.length};
   }else{
    // Existing individual-game codes and their optional slug check are unchanged.
    const slug=Object.keys(CODES).find(s=>CODES[s]===entered&&(!body.slug||body.slug===s));
    if(!slug)return reply(res,422,{ok:false,error:'invalid_code'});
    const updates={['customers/'+phone+'/games/'+CODES[slug]]:true,...await trackingUpdates(db,phone,[{type:'game',id:slug}], 'code')};
    await db.ref().update(updates);
    activation={type:'game',slug};
   }
  }
  const ref=db.ref('customers/'+phone+'/games');const owned=(await ref.get()).val()||{};
  if((owned['1850']||owned['17007'])&&!owned[CODES['photos-1']]){await ref.child(CODES['photos-1']).set(true);owned[CODES['photos-1']]=true;}
  const games=Object.keys(CODES).filter(s=>owned[CODES[s]]===true);
  return reply(res,200,{ok:true,games,...(activation?{activation}:{})});
 }catch{return reply(res,503,{ok:false,error:'activation_unavailable'});}
};
