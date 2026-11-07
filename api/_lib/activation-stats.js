const {CODES,BUNDLES}=require('./activation-catalog');
const {decode,key}=require('./activation-tracking');
function buildActivationStats(records,customers,games,now,ownerPhone){
 const day=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Riyadh',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(now));
 const today=Date.parse(day+'T00:00:00+03:00'),week=today-6*86400000,month=Date.parse(day.slice(0,7)+'-01T00:00:00+03:00');
 const metric=()=>({today:0,week:0,month:0,total:0});
 const bundleRows=['complete','seven','classic','new','duo'].map(id=>Object.values(BUNDLES).find(b=>b.id===id)).map(b=>({id:b.id,name:b.name,gameCount:b.games.length,counts:metric()}));
 const gameRows=games.map(g=>({id:g.slug,name:g.name,counts:metric()}));
 const byBundle=new Map(bundleRows.map(b=>[b.id,b])),byGame=new Map(gameRows.map(g=>[g.id,g]));
 const people=Object.fromEntries(['today','week','month','total'].map(p=>[p,new Set()]));
 const gamePeople=Object.fromEntries(['today','week','month','total'].map(p=>[p,new Set()]));
 const result={bundles:bundleRows,games:gameRows,entries:[],bundleActivations:metric(),gameActivations:metric(),bundlePeople:metric(),gamePeople:metric(),firstRecordedAt:null,unreadable:0};
 const k=Object.keys(records||{}).length?key():null,seen=new Set();
 for(const receipt of Object.values(records||{})){
  try{const entry=decode(receipt,k),at=Number(receipt.firstAt);if(!Number.isFinite(at)||at<=0||at>now+300000||!/^\d{10,15}$/.test(entry.phone))continue;if('+'+entry.phone===ownerPhone)continue;const row=(entry.type==='bundle'?byBundle:byGame).get(entry.id);if(!row)continue;const unique=entry.phone+':'+entry.type+':'+entry.id;if(seen.has(unique))continue;seen.add(unique);
   const customer=customers[entry.phone]||{};const m=entry.type==='bundle'?result.bundleActivations:result.gameActivations,sets=entry.type==='bundle'?people:gamePeople;
   for(const [period,start] of [['total',0],['today',today],['week',week],['month',month]])if(at>=start){m[period]++;row.counts[period]++;sets[period].add(entry.phone);}
   result.firstRecordedAt=Math.min(result.firstRecordedAt||at,at);
   result.entries.push({phone:entry.phone,name:String(customer.name||'لاعب').slice(0,100),type:entry.type,id:entry.id,label:row.name,gameCount:row.gameCount||1,firstAt:at,lastAt:Number(receipt.lastAt)||at,source:entry.source,lastSource:entry.lastSource||entry.source});
  }catch{result.unreadable++;}
 }
 result.bundlePeople=Object.fromEntries(Object.entries(people).map(([p,s])=>[p,s.size]));result.gamePeople=Object.fromEntries(Object.entries(gamePeople).map(([p,s])=>[p,s.size]));result.entries.sort((a,b)=>b.firstAt-a.firstAt);result.periods={today,week,month};
 return result;
}
module.exports={buildActivationStats};
