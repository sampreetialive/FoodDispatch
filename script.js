const IMG = new Proxy({}, {get:(_,n)=>`assets/${n}.${String(n).startsWith('icon-')?'png':'webp'}`});
const $=s=>document.querySelector(s),rm=matchMedia('(prefers-reduced-motion:reduce)').matches,cl=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
document.querySelectorAll('[data-img]').forEach(i=>i.src=IMG[i.dataset.img]);
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target);if(e.target.querySelector('[data-n]'))e.target.querySelectorAll('[data-n]').forEach(count)}}),{threshold:.15});
const watch=r=>(r||document).querySelectorAll('.rv,#dots,#cta').forEach(e=>io.observe(e));watch();
function count(el){const n=+el.dataset.n,p=el.dataset.pre||'',s=el.dataset.suf||'',t0=performance.now();(function f(t){const k=rm?1:cl((t-t0)/1400);el.textContent=p+Math.round(n*(1-Math.pow(1-k,3)))+s;if(k<1)requestAnimationFrame(f)})(t0)}
// hero
const H=[["pizza","Chicken BBQ Pizza","#E8C39E","#442F23"],["biryani","Veg Biryani","#DAA520","#442F23"],["palak-paneer","Palak Paneer","#4E6E58","#F5E5C0"],["spaghetti","Spaghetti Pomodoro","#F2725B","#442F23"],["dosa","Masala Dosa","#D36228","#F5E5C0"],["ramen","Beef Kimchi Ramen","#2C3E50","#F5E5C0"]];
const st=$('#stage'),hero=$('#hero'),brand=$('#brand');let k=0,tm;
brand.querySelectorAll('.w').forEach((w,wi)=>{w.innerHTML=[...w.textContent].map((c,i)=>`<span class="c"><i style="--i:${i+wi*4}">${c}</i></span>`).join('');w.setAttribute('aria-label',w.textContent)});
H.forEach(d=>{const i=new Image();i.src=IMG[d[0]];i.alt=d[1];st.append(i)});
function show(first){const n=H.length,w=innerWidth;[...st.children].forEach((im,j)=>{const o=((j-k+n+1)%n)-1,c=cl(o,-2,2),sp=w<760?.8:.62,was=+im.dataset.o;
if(was===-1&&o>1||first){im.style.transition='none'}
im.style.transform=`translateX(calc(-50% + ${c*sp*w}px)) scale(${o?.84:1}) rotate(${c*9}deg)`;im.style.opacity=Math.abs(o)<=1?1:0;im.style.zIndex=o?1:3;im.dataset.o=o;
if(im.style.transition==='none'){im.offsetWidth;im.style.transition=''}});
const d=H[k];hero.style.backgroundColor=d[2];hero.style.color=d[3];$('#cap').textContent=d[1]}
const go=s=>{k=(k+s+H.length)%H.length;show()};
const auto=()=>{clearInterval(tm);if(!rm)tm=setInterval(()=>go(1),4200)};
$('#prev').onclick=()=>{go(-1);auto()};$('#next').onclick=()=>{go(1);auto()};
hero.onmouseenter=()=>clearInterval(tm);hero.onmouseleave=auto;addEventListener('resize',()=>show());
show(true);requestAnimationFrame(()=>requestAnimationFrame(()=>hero.classList.add('in')));auto();
// marquee
const M=['Order in under 30 seconds','Live driver position','Live ETA','Placed to Delivered','Nearest driver assigned','Customer · Restaurant · Driver'];
$('#mq').innerHTML=M.map(t=>`<span>${t}</span><span><i>✺</i></span>`).join('').repeat(4);
// restaurants (sample data)
const R=[["alfredo","Trattoria Verde","Italian","#E8C39E",1.4,25],["omelette","Morning Pan Café","Café","#F5E5C0",0.8,15],["dal-makhani","Dhaba Junction","Indian","#DAA520",2.1,30],["salad","Green Bowl Co.","Café","#6E6F33",1.1,20],["dumplings","Little Dumpling House","Asian","#F2725B",3.2,35],["mutton-curry","Masala Haveli","Indian","#B3342C",2.8,40],["dal","Tadka Tiffins","Indian","#E8C39E",4.6,35],["tom-kha","Bangkok Lane","Asian","#4E6E58",3.9,30]];
let cu='All',rad=5,cart=+(localStorage.getItem('fooddispatch_cart')||0);const cb=$('#cart');cb.textContent=cart;
function chip(box,vals,cur,fn){vals.forEach(v=>{const b=document.createElement('button');b.textContent=typeof v=='number'?v+' km':v;b.setAttribute('aria-pressed',v==cur);b.onclick=()=>{[...box.querySelectorAll('button')].forEach(x=>x.setAttribute('aria-pressed',x==b));fn(v)};box.append(b)})}
chip($('#cu'),['All','Indian','Italian','Asian','Café'],cu,v=>{cu=v;draw()});chip($('#rd'),[1,2,3,5],rad,v=>{rad=v;draw()});
function draw(){const l=R.filter(r=>(cu=='All'||r[2]==cu)&&r[4]<=rad);$('#grid').innerHTML=l.length?l.map((r,i)=>`<article class="card rv" style="--d:${i}"><div class="t" style="background:${r[3]}"><img src="${IMG[r[0]]}" alt=""></div><small>${r[2]} · ${r[4]} km · ${r[5]} min</small><h3>${r[1]}</h3><div class="row"><button class="btn" data-add>Order now</button></div></article>`).join(''):'<p class="empty">No restaurants in range. Try a larger delivery radius.</p>';requestAnimationFrame(()=>watch($('#grid')))}
draw();$('#grid').onclick=e=>{if(e.target.matches('[data-add]')){cart++;try{localStorage.setItem('fooddispatch_cart',cart)}catch(_){}cb.textContent=cart;cb.classList.add('bump');setTimeout(()=>cb.classList.remove('bump'),250)}};
// promise word reveal
const big=$('#big');big.innerHTML=[...big.childNodes].map(n=>n.nodeType==3?n.textContent.split(/\s+/).filter(Boolean).map(w=>`<span class="wd">${w}</span>`).join(' '):`<span class="g">${n.textContent.split(' ').map(w=>`<span class="wd">${w}</span>`).join(' ')}</span>`).join(' ');
const wds=[...big.querySelectorAll('.wd')];
// pinned how-it-works
const how=$('#how'),pl=$('#pl'),fill=$('#fill'),trk=$('#trk'),stp=[...$('#steps').children];let cur=0;
function frame(){const y=scrollY,vh=innerHeight;
if(y<vh*1.2){brand.style.transform=`translate3d(0,${y*.16}px,0)`;st.style.marginBottom=y*.06+'px'}
const r=big.getBoundingClientRect(),pr=cl((vh*.85-r.top)/(vh*.55)),lit=rm?99:pr*wds.length*1.05;wds.forEach((w,i)=>w.style.opacity=.22+.78*cl(lit-i));
const hr=how.getBoundingClientRect(),t=cl(-hr.top/(hr.height-vh));cur+=(t-cur)*(rm?1:.12);
const w=trk.clientWidth-pl.offsetWidth;pl.style.transform=`translate3d(${cur*w}px,0,0) rotate(${cur*540}deg)`;fill.style.transform=`scaleX(${cur})`;
const di=cl((cur-.12)/.25);const im=pl.firstElementChild;im.style.opacity=di;im.style.transform=`scale(${.6+.4*di}) rotate(${-cur*540}deg)`;
const a=cur<.34?0:cur<.67?1:2;stp.forEach((s,i)=>s.classList.toggle('on',i==a));requestAnimationFrame(frame)}
frame();
// tracker simulation
const S=['Placed','Accepted','Preparing','Ready','Picked up','Delivered'],MG=['Order placed. The restaurant will confirm it shortly.','Accepted. The kitchen has your order.','Preparing your order.','Ready for pickup. Nearest driver assigned.','','Delivered. Enjoy your meal!'],PR=[12,9,5,0,0,0],D0=2.4;
let si=-1,pg=0,tmo,tik,tt=[];const tl=$('#tl'),eta=$('#eta'),drv=$('#drv');
function rt(){tl.innerHTML=S.map((s,i)=>`<li class="${i<si?'done':i==si?'cur':''}"><i></i>${s}<em>${tt[i]||''}</em></li>`).join('');
let m=MG[si];if(si<=3){m+=` Estimated arrival in ${Math.ceil(D0/20*60+PR[si])} minutes.`}
if(si==4){const rem=D0*(1-pg);m=`Your driver is ${rem.toFixed(1)} km away. Estimated arrival in ${Math.max(1,Math.ceil(rem/20*60))} minutes.`}
if(si==5)m=MG[5];eta.textContent=m;drv.classList.toggle('on',si>=3);drv.style.left=24+52*pg+'%';drv.style.top=70-40*pg+'%'}
function stp2(){tt[si]=new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});rt();
if(si<3||si==3){tmo=setTimeout(()=>{si++;stp2()},si==3?1800:2000)}
else if(si==4){tik=setInterval(()=>{pg=Math.min(1,pg+.05);rt();if(pg>=1){clearInterval(tik);setTimeout(()=>{si=5;stp2()},500)}},350)}}
function run(){clearTimeout(tmo);clearInterval(tik);si=0;pg=0;tt=[];stp2()}
$('#replay').onclick=run;rt();new IntersectionObserver((e,o)=>{if(e[0].isIntersecting){run();o.disconnect()}},{threshold:.4}).observe($('#track'));
// tickets (sample data)
const T=[["#1042","Trattoria Verde","2× Fettuccine Alfredo","Placed","#8A3324","Mon 19:42 · waiting for a driver"],["#1043","Little Dumpling House","1× Pan-fried Dumplings","Preparing","#C28840","Mon 19:55 · Driver: Ravi"],["#1044","Masala Haveli","1× Mutton Curry","Picked up","#D36228","Mon 20:10 · Driver: Meera"],["#1045","Tadka Tiffins","2× Yellow Dal Tadka","Delivered","#6E6F33","Mon 20:21 · Driver: Ravi"]];
$('#tk').innerHTML=T.map((t,i)=>`<div class="t1 rv" style="--r:${[-1.5,1,-.8,1.4][i]}deg;--d:${i}"><b>Order ${t[0]}</b><h3>${t[1]}</h3>${t[2]}<p><span class="st" style="background:${t[4]}">${t[3]}</span></p><p>${t[5]}</p></div>`).join('');watch($('#tk'));
// log in: role cards are plain HTML in index.html
(function(){const form=$('#lf');if(!form)return;const go=$('#go'),msg=$('#lm'),chosen=()=>form.querySelector('input[name="role"]:checked').value;
form.addEventListener('change',()=>{go.textContent=`Continue as ${chosen()} →`;msg.textContent=''});
form.addEventListener('submit',e=>{e.preventDefault();try{localStorage.setItem('fooddispatch_prefs',JSON.stringify({role:chosen()}))}catch(_){}msg.textContent=`Logged in as ${chosen()}. Your view is ready.`})})();
