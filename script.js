const requests = [
  {id:"mamo-0005",time:"10:24:35",name:"山田 太郎",age:32,gender:"男性",agency:"救急",location:"○○市○○町1-2-3付近",distance:"約120m先",content:"転倒して足を痛めて動けません。意識はあります。早急に救助をお願いします。",consideration:"ホルモン治療中",lat:24,top:28,status:"未対応"},
  {id:"mamo-0004",time:"10:21:18",name:"佐藤 花子",age:45,gender:"女性",agency:"消防",location:"○○市○○町4-5付近",distance:"約550m先",content:"建物内に取り残されています。",consideration:"医療的ケアが必要",lat:48,top:55,status:"未対応"},
  {id:"mamo-0003",time:"10:18:59",name:"鈴木 一郎",age:28,gender:"男性",agency:"自衛隊",location:"○○市○○町2-1付近",distance:"約1.2km先",content:"道路が塞がれて移動できません。",consideration:"なし",lat:67,top:31,status:"未対応"},
  {id:"mamo-0002",time:"10:15:42",name:"田中 美咲",age:36,gender:"女性",agency:"警察",location:"○○市○○町3-7付近",distance:"約2.5km先",content:"家族と連絡が取れず避難場所から動けません。",consideration:"妊娠中",lat:37,top:72,status:"対応中"},
  {id:"mamo-0001",time:"10:10:08",name:"高橋 健",age:52,gender:"男性",agency:"消防",location:"○○市○○町5-8付近",distance:"約3.8km先",content:"自宅周辺が浸水しています。救助をお願いします。",consideration:"人工呼吸器使用",lat:78,top:60,status:"対応中"}
];

let selectedId = requests[0].id;
let statusFilter = "すべて";
let agencyFilter = "すべて";

function showView(id){
  document.querySelectorAll(".view").forEach(v=>v.classList.remove("active-view"));
  document.getElementById(id).classList.add("active-view");
  document.querySelectorAll(".nav").forEach(n=>n.classList.toggle("active",n.dataset.view===id));
  if(id==="requests") renderRequests();
  if(id==="status") renderStatus();
  if(id==="map") renderMap("mainMap");
}

document.querySelectorAll(".nav").forEach(n=>n.addEventListener("click",()=>showView(n.dataset.view)));
document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{
  statusFilter=b.dataset.status;
  document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));
  b.classList.add("active"); renderRequests();
}));
document.getElementById("agencyFilter").addEventListener("change",e=>{agencyFilter=e.target.value;renderRequests()});
document.querySelectorAll(".agency").forEach(b=>b.addEventListener("click",()=>filterAgency(b.dataset.agency)));

function filterAgency(a){
  agencyFilter=a;
  statusFilter="すべて";
  document.getElementById("agencyFilter").value=a;
  showView("requests");
}

function filtered(){
  return requests.filter(r=>(statusFilter==="すべて"||r.status===statusFilter)&&(agencyFilter==="すべて"||r.agency===agencyFilter));
}

function renderRequests(){
  const list=document.getElementById("requestList");
  const data=filtered();
  list.innerHTML=data.length?data.map(r=>`
    <div class="request-item ${r.id===selectedId?"selected":""}" onclick="selectRequest('${r.id}')">
      <div class="row"><span><b>${r.time}</b>　${r.agency}要請</span><span class="status ${r.status}">${r.status}</span></div>
      <h3>${r.location}</h3><p>📍 ${r.distance}　｜　${r.name}</p>
    </div>`).join(""):"<p>該当する救助要請はありません。</p>";
  renderDetail();
  updateCounts();
}

function selectRequest(id){selectedId=id;renderRequests()}

function renderDetail(){
  const r=requests.find(x=>x.id===selectedId);
  if(!r)return;
  document.getElementById("detailPanel").innerHTML=`
    <div class="detail-header"><div><h2>🚨 ${r.agency}要請</h2><span class="status ${r.status}">${r.status}</span></div><b>受信時刻　${r.time}</b></div>
    <div class="detail-section"><h3>いつ（受信時刻）</h3><p>◷ 2024/06/05 ${r.time}</p></div>
    <div class="detail-section"><h3>どこから来た情報か / 届いた情報は何m先・何km先か</h3><p>📍 ${r.location}</p><p><b>${r.distance}</b>（直線距離）</p></div>
    <div class="detail-section"><h3>だれから（通報者情報）</h3><p>👤 <b>${r.name}</b>（MAMOアプリユーザー）</p><p>ID：${r.id}</p></div>
    <div class="detail-section"><h3>どういった内容か</h3><p>💬 ${r.content}</p></div>
    <div class="detail-section"><h3>関連情報</h3><div class="detail-grid"><div class="info-box">📱 MAMOアプリからの救助要請<br>アプリバージョン：2.3.1</div><div class="info-box">📍 GPS位置情報<br>${r.location}</div></div></div>
    <div class="detail-section"><h3>救助時の配慮事項</h3><p>${r.consideration}</p></div>
    <div class="actions">
      <button class="primary" onclick="changeStatus('${r.id}','対応中')">対応開始</button>
      <button class="secondary" onclick="alert('関係機関へ共有しました（デモ）')">関係機関に共有</button>
      <button class="danger" onclick="changeStatus('${r.id}','対応済み')">🔔 対応完了</button>
    </div>`;
}

function changeStatus(id,newStatus){
  const r=requests.find(x=>x.id===id); if(!r)return;
  r.status=newStatus; selectedId=id; renderRequests(); renderStatus(); renderDashboard();
  alert(`「${newStatus}」に変更しました（デモ）`);
}

function updateCounts(){
  const count=s=>requests.filter(r=>r.status===s).length;
  document.getElementById("allCount").textContent=requests.length;
  document.getElementById("pendingCount").textContent=count("未対応");
  document.getElementById("workingFilterCount").textContent=count("対応中");
  document.getElementById("doneFilterCount").textContent=count("対応済み");
  document.getElementById("newCount").textContent=count("未対応");
  document.getElementById("workingCount").textContent=count("対応中");
  document.getElementById("doneCount").textContent=count("対応済み");
  document.getElementById("sidebarBadge").textContent=count("未対応");
  document.getElementById("notificationCount").textContent=count("未対応");
}

function renderDashboard(){
  const data=requests.slice(0,5);
  document.getElementById("dashboardRequests").innerHTML=data.map(r=>`
    <div class="request-mini"><span class="time">${r.time}</span><div><b>${r.agency}要請</b><br>${r.location}<br><small>${r.name}　${r.distance}</small></div><span class="status ${r.status}">${r.status}</span></div>`).join("");
  renderMap("dashMap");
  updateCounts();
}

function renderMap(id){
  const el=document.getElementById(id); if(!el)return;
  el.innerHTML=requests.map(r=>`<div class="pin ${r.status==="対応済み"?"green":r.agency==="警察"?"blue":""}" style="left:${r.lat}%;top:${r.top}%" title="${r.name}：${r.status}" onclick="selectFromMap('${r.id}')"></div>`).join("");
}
function selectFromMap(id){selectedId=id;showView("requests")}

function renderStatus(){
  document.getElementById("statusTable").innerHTML=`<table class="status-table"><thead><tr><th>時刻</th><th>氏名</th><th>機関</th><th>位置</th><th>状況</th></tr></thead><tbody>${requests.map(r=>`<tr><td>${r.time}</td><td>${r.name}</td><td>${r.agency}</td><td>${r.location}</td><td><span class="status ${r.status}">${r.status}</span></td></tr>`).join("")}</tbody></table>`;
}

function clock(){
  document.getElementById("clock").textContent=new Date().toLocaleTimeString("ja-JP",{hour:"2-digit",minute:"2-digit",second:"2-digit"});
}
setInterval(clock,1000); clock();
renderDashboard(); renderRequests(); renderStatus();


// MAMO展示用：Supabaseから救助要請を取得＋リアルタイム受信
let mamoSupabaseClient=null;
let mamoRealtimeReady=false;

function dbRowToRequest(x){
  return {
    id:x.request_id || ('DB-'+x.id),
    dbId:x.id,
    time:new Date(x.created_at || Date.now()).toLocaleTimeString('ja-JP',{hour:'2-digit',minute:'2-digit',second:'2-digit'}),
    name:x.requester_name || x.user_name || '不明',
    age:'',gender:'',agency:x.request_type && x.request_type.includes('消防')?'消防':x.request_type && x.request_type.includes('警察')?'警察':x.request_type && x.request_type.includes('自衛隊')?'自衛隊':'救急',
    location:x.location_text || x.location || '位置情報',
    distance:x.distance_text || x.distance || '',
    content:x.rescue_details || x.detail || '救助要請',
    consideration:x.considerations || x.health_condition || x.consideration || 'なし',
    lat:50,top:50,status:x.status || '未対応'
  };
}

function addDbRequest(x,showAlert=false){
  const r=dbRowToRequest(x);
  if(requests.some(v=>v.dbId && String(v.dbId)===String(r.dbId))) return;
  requests.unshift(r);
  selectedId=r.id;
  renderDashboard(); renderRequests(); renderStatus();
  if(showAlert) alert('🚨 新しい救助要請が届きました\n'+r.name+'　'+r.distance);
}

async function setupRealtime(){
  if(!window.MAMO_SUPABASE_URL || !window.MAMO_SUPABASE_ANON_KEY || !window.supabase){
    console.warn('Supabase設定がありません');
    return;
  }
  mamoSupabaseClient=window.supabase.createClient(window.MAMO_SUPABASE_URL, window.MAMO_SUPABASE_ANON_KEY);

  // iPadを開いた時点ですでにDBにある救助要請も表示
  const {data,error}=await mamoSupabaseClient
    .from('rescue_requests')
    .select('*')
    .order('created_at',{ascending:false})
    .limit(50);
  if(error){
    console.error('MAMO DB取得エラー',error);
  }else if(Array.isArray(data)){
    data.reverse().forEach(x=>addDbRequest(x,false));
  }

  mamoSupabaseClient.channel('mamo-rescue-live')
    .on('postgres_changes',{event:'INSERT',schema:'public',table:'rescue_requests'},payload=>{
      addDbRequest(payload.new || {},true);
    })
    .on('postgres_changes',{event:'UPDATE',schema:'public',table:'rescue_requests'},payload=>{
      const x=payload.new || {};
      const r=requests.find(v=>v.dbId && String(v.dbId)===String(x.id));
      if(r){
        r.status=x.status || r.status;
        renderDashboard(); renderRequests(); renderStatus();
      }
    })
    .subscribe(status=>{
      console.log('MAMO realtime:',status);
      mamoRealtimeReady = status === 'SUBSCRIBED';
      document.title = mamoRealtimeReady ? 'MAMO 自治体管理システム（接続中）' : 'MAMO 自治体管理システム';
    });
}

setupRealtime();

// 管理画面から対応状況を変更したとき、Supabaseにも反映
const originalChangeStatus=changeStatus;
changeStatus=async function(id,newStatus){
  const r=requests.find(x=>x.id===id); if(!r)return;
  r.status=newStatus; selectedId=id; renderRequests(); renderStatus(); renderDashboard();
  if(mamoSupabaseClient && r.dbId){
    const {error}=await mamoSupabaseClient.from('rescue_requests').update({status:newStatus}).eq('id',r.dbId);
    if(error) console.error('ステータス更新エラー',error);
  }
  alert(`「${newStatus}」に変更しました`);
};
