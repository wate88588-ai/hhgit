const items = [
  {id:1,type:"novel",title:"长夜照归人",meta:"沈砚 · 武侠悬疑",views:"68.4万观看",count:"2.3万",pos:"0% 0%",desc:"他从雪夜归来，带着一封不能见光的密信。庙堂与江湖之间，每一个选择都在改写故人的命运。"},
  {id:2,type:"novel",title:"霓虹失序",meta:"林野 · 科幻悬疑",views:"51.8万观看",count:"1.6万",pos:"33.33% 0%",desc:"记忆可以被出售的年代，一名数据清道夫发现了本不该存在的城市备份。"},
  {id:3,type:"novel",title:"等风也等你",meta:"程见 · 都市情感",views:"45.2万观看",count:"1.2万",pos:"66.66% 0%",desc:"重逢那天，樱花正落满旧街。两个人用了七年，终于学会如何说出留下。"},
  {id:4,type:"novel",title:"金枝疑云",meta:"青黛 · 古言探案",views:"39.6万观看",count:"9860",pos:"100% 0%",desc:"深宫华灯之下，一面旧铜镜牵出三代人守口如瓶的秘密。"},
  {id:5,type:"novel",title:"人间小满",meta:"苏禾 · 治愈日常",views:"32.4万观看",count:"8760",pos:"0% 33.33%",desc:"一间只在黄昏营业的小面馆，收留每一个暂时没有答案的人。"},
  {id:6,type:"comic",title:"异闻收录局",meta:"鹿屿 · 每周五更新",views:"98.7万观看",count:"1.5万",pos:"33.33% 33.33%",desc:"能看见城市怪谈的实习生，第一天上班就接到了来自十年前的报案。"},
  {id:7,type:"comic",title:"跃动界线",meta:"鹿屿工作室 · 142话",views:"142.8万观看",count:"1.8万",pos:"66.66% 33.33%",desc:"最后一秒才是比赛真正开始的时候。五个问题少年，向全国大赛发起冲击。"},
  {id:8,type:"comic",title:"群星彼岸",meta:"太空歌剧 · 89话",views:"76.5万观看",count:"1.1万",pos:"100% 33.33%",desc:"帝国边境的无名信使，意外成为足以改变星系格局的唯一坐标。"},
  {id:9,type:"comic",title:"灯影长安",meta:"悬疑志怪 · 52话",views:"66.1万观看",count:"9520",pos:"0% 66.66%",desc:"每逢雨夜，长安城里就会多出一条地图上不存在的巷子。"},
  {id:10,type:"comic",title:"白刃听风",meta:"新武侠 · 76话",views:"59.4万观看",count:"8860",pos:"33.33% 66.66%",desc:"天下第一剑客封剑十年，只为等一个连名字都不知道的人。"},
  {id:11,type:"film",title:"午夜来客",meta:"8.7 · 犯罪 / 剧情 · 126分钟",views:"326.5万观看",count:"3.6万",pos:"66.66% 66.66%",desc:"一杯未喝完的酒，一通来自空号的电话，让退休警探重回最后一案。"},
  {id:12,type:"film",title:"狐火",meta:"9.1 · 奇幻 / 动作 · 118分钟",views:"287.4万观看",count:"3.1万",pos:"100% 66.66%",desc:"当古老山灵再次苏醒，守护人必须在天亮前兑现百年前的承诺。"},
  {id:13,type:"film",title:"盛世灯火",meta:"8.9 · 历史 / 剧情",views:"241.9万观看",count:"2.8万",pos:"0% 100%",desc:"繁华城池的一夜之间，六个小人物的命运悄然交汇。"},
  {id:14,type:"film",title:"未来环线",meta:"8.5 · 科幻 / 冒险",views:"198.5万观看",count:"2.2万",pos:"33.33% 100%",desc:"没有终点的高速公路上，一辆来自未来的车正在追赶昨天。"},
  {id:15,type:"film",title:"风暴航路",meta:"8.8 · 冒险 / 剧情",views:"176.8万观看",count:"1.9万",pos:"66.66% 100%",desc:"一张残缺海图，带领一群陌生人驶向所有地图之外。"},
  {id:16,type:"film",title:"荒原旗语",meta:"8.3 · 战争 / 西部",views:"154.3万观看",count:"1.6万",pos:"100% 100%",desc:"战火熄灭之后，一个信使仍要完成那封已经迟到十年的信。"}
];
const comments = {
  novel:[["江湖晚风","剧情太精彩了，伏笔层层递进，根本停不下来！","2小时前","136"],["墨染青衣","沈砚的文笔真的绝，武侠氛围感拉满。","5小时前","98"]],
  comic:[["三分热度","热血沸腾！这场比赛画得太燃了！","1小时前","256"],["篮板少女","每个角色都有魅力，期待下一话！","3小时前","143"]],
  film:[["影迷阿哲","剧情反转太绝了，全程高能！","2小时前","324"],["夜色微澜","氛围感拉满，结尾让我细思极恐。","6小时前","218"]]
};
let favorites=JSON.parse(localStorage.getItem("moguang-favorites")||"[1,7,11]"), currentCategory="recommend", currentItem=null, favFilter="all";
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)], typeLabel={novel:"小说",comic:"漫画",film:"影片"};
const isSaved=id=>favorites.includes(id);
const saveButton=i=>`<button class="save ${isSaved(i.id)?"saved":""}" data-save="${i.id}" aria-label="收藏">${isSaved(i.id)?"♥":"♡"}</button>`;
const card=i=>`<article class="card" data-detail="${i.id}"><div class="cover portrait" style="--pos:${i.pos}">${saveButton(i)}<span class="tag">${typeLabel[i.type]}</span></div><h3>${i.title}</h3><p>${i.meta}</p></article>`;

function renderFeed(){
  const n=items.filter(i=>i.type==="novel"),c=items.filter(i=>i.type==="comic"),f=items.filter(i=>i.type==="film");
  const hero=currentCategory==="film"?items[12]:items[0];
  let html=`<div class="hero" data-detail="${hero.id}"><div class="cover" style="--pos:${hero.pos}"></div><div class="hero-copy"><span class="eyebrow">EDITOR'S PICK</span><h1>${currentCategory==="film"?"盛世灯火":"长夜漫漫，幸有故事作伴"}</h1><p>${currentCategory==="film"?"一夜长安，六段人生。年度口碑佳作独家上线。":"本周编辑精选，打开属于你的另一重世界。"}</p><button>立即${currentCategory==="film"?"观看":"阅读"} →</button></div></div>`;
  const section=(title,body)=>`<section class="section"><div class="section-head"><h2>${title}</h2><button>查看全部 →</button></div>${body}</section>`;
  if(["recommend","novel"].includes(currentCategory)){html+=section(currentCategory==="novel"?"人气小说":"正在流行",`<div class="grid-3">${n.map(card).join("")}</div>`);html+=section("编辑私藏",`<div class="grid-2">${n.slice(0,4).map(card).join("")}</div>`)}
  if(["recommend","comic"].includes(currentCategory)){html+=section(currentCategory==="comic"?"本周漫画榜":"漫画新章",`<div class="grid-3">${c.map(card).join("")}</div>`);html+=section("沉浸追更",`<div class="grid-2">${c.slice(0,4).map(card).join("")}</div>`)}
  if(["recommend","film"].includes(currentCategory)){
    html+=section("口碑影片",`<div class="film-list">${f.map(i=>`<article class="film-card" data-detail="${i.id}"><div class="cover landscape" style="--pos:${i.pos}">${saveButton(i)}</div><div><h3>${i.title}</h3><p>${i.meta}</p><p>${i.desc}</p></div></article>`).join("")}</div>`);
    html+=section("周末片单",`<div class="film-duo">${f.map(i=>`<article data-detail="${i.id}"><div class="cover landscape" style="--pos:${i.pos}"></div><h3>${i.title}</h3><p>${i.meta}</p></article>`).join("")}</div>`)
  }
  $("#contentFeed").innerHTML=html;bindDynamic()
}
function bindDynamic(){
  $$("[data-save]").forEach(b=>b.onclick=e=>{e.stopPropagation();toggleFavorite(+b.dataset.save)});
  $$("[data-detail]").forEach(el=>el.onclick=()=>openDetail(+el.dataset.detail))
}
function toggleFavorite(id){
  favorites=isSaved(id)?favorites.filter(x=>x!==id):[...favorites,id];
  localStorage.setItem("moguang-favorites",JSON.stringify(favorites));renderFeed();renderFavorites();updateBadge();
  if(currentItem?.id===id)updateDetailSave();toast(isSaved(id)?"已加入收藏":"已取消收藏")
}
function renderComments(){
  $("#commentsList").innerHTML=comments[currentItem.type].map((c,i)=>`<div class="comment"><div class="comment-avatar">${c[0][0]}</div><div><div class="comment-top"><b>${c[0]}</b><span>${c[2]}</span></div><p>${c[1]}</p><div class="comment-actions"><button data-like="${i}">♡ ${c[3]}</button><button>○ 回复</button></div></div></div>`).join("");
  $$("[data-like]").forEach(b=>b.onclick=()=>{b.classList.toggle("liked");b.textContent=b.classList.contains("liked")?"♥ 已赞":`♡ ${comments[currentItem.type][+b.dataset.like][3]}`})
}
function openDetail(id){
  currentItem=items.find(i=>i.id===id);$("#detailCover").style.setProperty("--pos",currentItem.pos);
  $("#detailType").textContent=`${typeLabel[currentItem.type]}详情`;$("#detailTitle").textContent=currentItem.title;$("#detailMeta").textContent=currentItem.meta;
  $("#detailViews").textContent=`🔥 ${currentItem.views}`;$("#detailDesc").textContent=currentItem.desc;$("#detailStatus").textContent=currentItem.type==="film"?"126分钟":"连载中";
  $("#commentCount").textContent=currentItem.count;$("#startReading").textContent=currentItem.type==="film"?"立即播放":"开始阅读";
  $("#chapterCard").style.display=currentItem.type==="film"?"none":"grid";
  $("#chapterCard").innerHTML=currentItem.type==="comic"?`<div><b>▣ 共142话</b><span>持续更新</span></div><div><b>最新</b><span>第142话 最后一秒 ›</span></div>`:`<div><b>▣ 目录</b><span>128章</span></div><div><b>最新章节</b><span>第128章 雪夜归人 ›</span></div>`;
  updateDetailSave();renderComments();$("#commentCompose").classList.remove("open");$("#detailModal").classList.add("open")
}
function updateDetailSave(){const saved=isSaved(currentItem.id);$("#saveDetail").textContent=saved?"♥":"♡";$("#saveDetail").classList.toggle("saved",saved)}
function renderFavorites(){
  const list=items.filter(i=>isSaved(i.id)&&(favFilter==="all"||i.type===favFilter));$("#favCount").textContent=favorites.length;
  $("#favoritesList").innerHTML=list.length?list.map(i=>`<article class="favorite-item ${i.type}" data-detail="${i.id}"><div class="cover mini-cover" style="--pos:${i.pos}"></div><div><h3>${i.title}</h3><p>${typeLabel[i.type]} · ${i.meta}</p></div><button class="remove-fav" data-save="${i.id}">×</button></article>`).join(""):`<div class="empty"><span style="font-size:35px">♡</span><b>这里还空着</b>遇见喜欢的故事，就把它收进来吧</div>`;bindDynamic()
}
function updateBadge(){const b=$("#favBadge");b.textContent=favorites.length;b.style.display=favorites.length?"block":"none"}
function go(page){$$(".page").forEach(x=>x.classList.remove("active"));$(`#${page}Page`).classList.add("active");$$(".bottom-nav button").forEach(x=>x.classList.toggle("active",x.dataset.go===page));$(".category-nav").style.display=page==="home"?"flex":"none";window.scrollTo({top:0,behavior:"smooth"})}
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1600)}

$$("[data-category]").forEach(b=>b.onclick=()=>{$$("[data-category]").forEach(x=>x.classList.remove("active"));b.classList.add("active");currentCategory=b.dataset.category;renderFeed()});
$$(".subnav button").forEach(b=>b.onclick=()=>{$$(".subnav button").forEach(x=>x.classList.remove("active"));b.classList.add("active");toast(`已切换至${b.textContent}`)});
$$("[data-go]").forEach(b=>b.onclick=()=>go(b.dataset.go));
$$("[data-close]").forEach(b=>b.onclick=()=>$("#"+b.dataset.close).classList.remove("open"));
$$(".modal-backdrop").forEach(m=>m.onclick=e=>{if(e.target===m)m.classList.remove("open")});
$$(".favorite-tabs button").forEach(b=>b.onclick=()=>{$$(".favorite-tabs button").forEach(x=>x.classList.remove("active"));b.classList.add("active");favFilter=b.dataset.filter;renderFavorites()});
$("#searchBtn").onclick=()=>{$("#searchPanel").classList.add("open");$("#searchInput").focus()};
$("#closeSearch").onclick=()=>{$("#searchPanel").classList.remove("open");$("#searchInput").value="";renderFeed()};
$("#searchInput").oninput=e=>{const q=e.target.value.trim(),found=items.filter(i=>(i.title+i.meta).includes(q));if(q){$("#contentFeed").innerHTML=`<section class="section" style="margin-top:22px"><div class="section-head"><h2>搜索结果 · ${found.length}</h2></div><div class="grid-2">${found.map(card).join("")}</div></section>`;bindDynamic()}else renderFeed()};
$("#saveDetail").onclick=()=>toggleFavorite(currentItem.id);$("#startReading").onclick=()=>toast(currentItem.type==="film"?"正在播放预告片…":"已进入沉浸阅读模式");
$("#writeComment").onclick=()=>{$("#commentCompose").classList.toggle("open");$("#commentInput").focus()};
$("#sendComment").onclick=()=>{const v=$("#commentInput").value.trim();if(!v)return;comments[currentItem.type].unshift(["岚",v,"刚刚","0"]);$("#commentInput").value="";$("#commentCompose").classList.remove("open");renderComments();toast("评论发布成功")};
$("#openPaywall").onclick=()=>$("#paywallModal").classList.add("open");
$$(".plan").forEach(p=>p.onclick=()=>{$$(".plan").forEach(x=>x.classList.remove("selected"));p.classList.add("selected");$("#payButton").textContent=p.dataset.plan==="year"?"确认开通 · ¥148/年":"确认开通 · ¥18/月"});
$("#payButton").onclick=()=>toast("已进入安全支付流程");$("#editFavorites").onclick=()=>toast("点击 × 即可移除收藏");
renderFeed();renderFavorites();updateBadge();
