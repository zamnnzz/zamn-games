const crypto=require('crypto');
const {CODES,BUNDLES}=require('./activation-catalog');
const BASE='activationReceiptsV1';
function key(){const credential=JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON||'{}');const secret=process.env.ZAMN_SUPPORT_ENCRYPTION_KEY||credential.private_key;if(!secret)throw Error('activation_tracking_not_configured');return crypto.createHash('sha256').update('zamn-activation-v1\0').update(secret).digest();}
function seal(value,k){const iv=crypto.randomBytes(12),cipher=crypto.createCipheriv('aes-256-gcm',k,iv);return {iv:iv.toString('base64'),data:Buffer.concat([cipher.update(JSON.stringify(value),'utf8'),cipher.final()]).toString('base64'),tag:cipher.getAuthTag().toString('base64')};}
function decode(receipt,k=key()){const d=crypto.createDecipheriv('aes-256-gcm',k,Buffer.from(receipt.sealed.iv,'base64'));d.setAuthTag(Buffer.from(receipt.sealed.tag,'base64'));return JSON.parse(Buffer.concat([d.update(Buffer.from(receipt.sealed.data,'base64')),d.final()]).toString('utf8'));}
function valid(item){return item.type==='game'?Boolean(CODES[item.id]):item.type==='bundle'&&Object.values(BUNDLES).some(b=>b.id===item.id);}
async function trackingUpdates(db,phone,items,source,now=Date.now()){
 const k=key(),updates={};
 for(const item of items){if(!valid(item))throw Error('invalid_activation_subject');const id=crypto.createHmac('sha256',k).update(phone+'\0'+item.type+'\0'+item.id).digest('hex'),ref=BASE+'/'+id;const previous=(await db.ref(ref).get()).val();let prior=null;if(previous)prior=decode(previous,k);
  // A deterministic customer/product receipt counts once, even after retries or reactivation.
  // Reading the existing receipt and preserving firstAt also keeps historical counts stable.
  const firstAt=prior&&Number.isFinite(previous.firstAt)?Math.min(previous.firstAt,now):now;
  updates[ref]={version:1,firstAt,lastAt:Math.max(Number(previous?.lastAt)||0,now),sealed:seal({phone,type:item.type,id:item.id,source:prior?.source||source,lastSource:source},k)};
 }
 return updates;
}
module.exports={BASE,decode,key,trackingUpdates};
