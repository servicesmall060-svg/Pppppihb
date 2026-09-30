'use strict';
const $=(s,r=document)=>r.querySelector(s);const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const CONFIG={freeShipping:50000,christmas:'2026-12-25',deliveryDeadline:'2026-12-20',storagePrefix:'mn9',whatsapp:'22603996469'};
const GALLERY=[
  [6305609,'Présents sous le sapin'],
  [1681147,'Ruban vert & lumières'],
  [712317,'Cadeau & lueur de bougie'],
  [1687045,'Le geste d’emballer'],
  [19465368,'Salon de Noël'],
  [6061841,'Table de fête'],
  [8939114,'L’instant d’offrir'],
  [6334544,'Écrin doré'],
  [1764087,'Ornements & bokeh'],
  [5469774,'Dîner de réveillon']
];
const imgUrl=(id,w=1000)=>`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&q=82`;
const PRODUCTS=[
{id:1,name:'Coffret Douce Nuit',subtitle:'Bougie, plaid & chocolat',category:'coffret',price:39900,img:imgUrl(35099198),altImg:imgUrl(6305609),pos:'center',badge:'BEST-SELLER',recipients:['elle','lui','parents','famille'],styles:['cocoon','elegant']},
{id:2,name:'Bougie Feu de Bois',subtitle:'Cire végétale · Notes de pin',category:'maison',price:14900,img:imgUrl(29135613),altImg:imgUrl(712317),pos:'center',badge:'NOUVEAU',recipients:['elle','lui','parents','collegue'],styles:['cocoon','elegant']},
{id:3,name:'Plaid Soir d\'Hiver',subtitle:'Maille douce · Esprit chalet',category:'maison',price:24900,img:imgUrl(35002554),altImg:imgUrl(35359590),pos:'center',badge:'COCOONING',recipients:['elle','lui','parents','famille'],styles:['cocoon']},
{id:4,name:'Coffret Éclat de Fête',subtitle:'Soin & rituel premium',category:'coffret',price:29900,img:imgUrl(38821127),altImg:imgUrl(3309666),pos:'center',badge:'PRÊT À OFFRIR',recipients:['elle','parents','collegue'],styles:['bien','elegant']},
{id:5,name:'Cacao & Épices Rares',subtitle:'Chocolat chaud · Épices de fête',category:'gourmand',price:18900,img:imgUrl(10550503),altImg:imgUrl(5469774),pos:'center',badge:'GOURMAND',recipients:['lui','parents','famille','collegue','enfant'],styles:['gourmand','cocoon']},
{id:6,name:'Rituel Karité Doré',subtitle:'Soin naturel · Édition de fête',category:'bien-etre',price:34900,img:imgUrl(29611533),altImg:imgUrl(6334622),pos:'center',badge:'PRESTIGE',recipients:['elle','parents'],styles:['bien','elegant']},
{id:7,name:'Lanterne Verre Ambré',subtitle:'Lueur chaude · Esprit maison',category:'maison',price:21900,img:imgUrl(9665338),altImg:imgUrl(1764087),pos:'center',badge:'OBJET D\'ART',recipients:['elle','lui','parents','famille'],styles:['elegant','cocoon']},
{id:8,name:'Étoile Bois & Maille',subtitle:'Décoration artisanale',category:'maison',price:9900,img:imgUrl(14643077),altImg:imgUrl(19465368),pos:'center',badge:null,recipients:['famille','parents','collegue','enfant'],styles:['elegant','cocoon']},
{id:9,name:'Duo Tasses de Fête',subtitle:'Cacao & douceur d\'hiver',category:'gourmand',price:14900,img:imgUrl(35210020),altImg:imgUrl(5469774),pos:'center',badge:'IDÉE CADEAU',recipients:['elle','lui','parents','collegue'],styles:['gourmand','cocoon']},
{id:10,name:'Coffret Lumière d\'Hiver',subtitle:'Bougie parfumée · Ambiance',category:'maison',price:16900,img:imgUrl(29542574),altImg:imgUrl(712317),pos:'center',badge:null,recipients:['elle','parents','collegue'],styles:['cocoon','elegant']},
{id:11,name:'Malle Prestige Noël',subtitle:'Sélection signature de la Maison',category:'coffret',price:69900,img:imgUrl(10482144),altImg:imgUrl(6305609),pos:'center',badge:'ÉDITION LIMITÉE',recipients:['elle','lui','parents','famille'],styles:['elegant','gourmand','cocoon']},
{id:12,name:'Nuit Cacao & Plaid',subtitle:'Cocooning · Chocolat · Maille',category:'coffret',price:32900,img:imgUrl(35210030),altImg:imgUrl(35359590),pos:'center',badge:'COUP DE CŒUR',recipients:['elle','lui','parents','famille'],styles:['cocoon','gourmand']}
];
const ADVENT=Array.from({length:24},(_,i)=>({day:i+1,icon:['✦','🎁','🕯','★','❄','🎀'][i%6],title:['Surprise de l’atelier','Idée cadeau secrète','Privilège du jour','Inspiration de fête'][i%4]}));
const money=v=>new Intl.NumberFormat('fr-FR').format(v)+' F CFA';
const read=(k,f)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):f}catch{return f}};const write=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}};
let cart=read('mn9-cart',read('mn3-cart',[])),favs=read('mn9-favs',read('mn3-favs',[])),lastFocus=null,activeShell=null;
const focusables=root=>root?[...root.querySelectorAll('a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])')].filter(el=>!el.hasAttribute('hidden')&&el.offsetParent!==null):[];
function setPageInert(on){const main=$('#main'),footer=$('.site-footer'),chrome=$('.site-chrome');[main,footer,chrome].forEach(el=>{if(!el)return;on?el.setAttribute('inert',''):el.removeAttribute('inert')})}
function buildCheckoutWhatsAppUrl(){
  if(!cart.length)return '';
  const lines=['Bonjour Maison Noël,','Je souhaite passer cette commande :',''];
  cart.forEach((it,i)=>{const p=PRODUCTS.find(x=>x.id===it.id);if(!p)return;lines.push(`${i+1}. ${p.name} × ${it.qty} — ${money(p.price*it.qty)}`)});
  const total=cart.reduce((s,it)=>s+(PRODUCTS.find(p=>p.id===it.id)?.price||0)*it.qty,0);
  lines.push('',`Total estimatif : ${money(total)}`,'',`Page : ${document.body.dataset.page||'site'}`,'Merci ✨');
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;
}
function checkoutViaWhatsApp(){
  if(!cart.length){toast('Ajoutez au moins un cadeau à votre panier.');return}
  const url=buildCheckoutWhatsAppUrl();
  closeShell('cartShell');
  window.open(url,'_blank','noopener');
  toast('Votre commande s’ouvre dans WhatsApp.');
}

function setActiveNav(){const page=document.body.dataset.page;$$('.primary-nav a,.mobile-menu nav a').forEach(a=>{if(a.dataset.page===page)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')})}
function initHeader(){
  const h=$('#siteHeader'),announcement=$('.announcement');
  if(!h)return;
  const sync=()=>{
    h.classList.toggle('scrolled',scrollY>30);
    const headerH=Math.round(h.getBoundingClientRect().height);
    const announcementH=announcement&&getComputedStyle(announcement).display!=='none'?Math.round(announcement.getBoundingClientRect().height):0;
    document.documentElement.style.setProperty('--header-current',`${headerH}px`);
    document.documentElement.style.setProperty('--chrome-h',`${headerH+announcementH}px`);
  };
  addEventListener('scroll',sync,{passive:true});addEventListener('resize',sync,{passive:true});sync();
}
function initReveal(){
  const els=$$('[data-reveal]');
  if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver'in window)){els.forEach(e=>e.classList.add('in'));return}
  const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in');io.unobserve(entry.target)}}),{threshold:.06,rootMargin:'0px 0px -2% 0px'});
  els.forEach(e=>io.observe(e));window.__revealIO=io;
  requestAnimationFrame(()=>{document.documentElement.classList.add('motion-ready');els.forEach(e=>{const r=e.getBoundingClientRect();if(r.top<innerHeight*.98&&r.bottom>0)e.classList.add('in')})});
}
function observeNew(root=document){if(window.__revealIO)$$( '[data-reveal]',root).forEach(e=>window.__revealIO.observe(e));else $$('[data-reveal]',root).forEach(e=>e.classList.add('in'))}

async function runIntro(){
  const curtain=$('#introCurtain');if(!curtain)return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches||sessionStorage.getItem('mn9-intro')||sessionStorage.getItem('mn3-intro')){curtain.remove();return}
  document.body.classList.add('is-locked');
  const imgs=$$('[data-intro-image]',curtain);
  const loadImage=(target,timeout=3600)=>Promise.race([new Promise(res=>{if(target.complete&&target.naturalWidth)return res(true);target.addEventListener('load',()=>res(true),{once:true});target.addEventListener('error',()=>res(false),{once:true})}),new Promise(res=>setTimeout(()=>res(false),timeout))]);
  const results=await Promise.all(imgs.map(img=>loadImage(img)));
  if(results.some(ok=>!ok)){const ph=makeFestivePlaceholder('OUVERTURE DE NOËL');imgs.forEach(img=>{if(!img.complete||!img.naturalWidth)img.src=ph});await Promise.all(imgs.map(img=>loadImage(img,700)))}
  await Promise.all(imgs.map(async img=>{try{await img.decode?.()}catch{}}));
  curtain.classList.add('image-ready');await wait(330);curtain.classList.add('primed');await wait(210);curtain.classList.add('opening');await wait(960);curtain.remove();document.body.classList.remove('is-locked');sessionStorage.setItem('mn9-intro','1');
}
const wait=ms=>new Promise(r=>setTimeout(r,ms));

function initPageTransitions(){
  const overlay=$('#pageTransition');
  const nativeVT=!!(window.CSS&&CSS.supports&&CSS.supports('view-transition-name: root'))&&!matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(nativeVT){addEventListener('pageshow',()=>overlay?.classList.remove('in'));return}
  $$('a[data-page-link]').forEach(a=>a.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey||e.shiftKey||a.target==='_blank')return;const u=new URL(a.href,location.href);if(u.origin!==location.origin)return;e.preventDefault();overlay?.classList.add('in');setTimeout(()=>location.href=u.href,360)}));
  addEventListener('pageshow',()=>overlay?.classList.remove('in'))
}

function galleryMarkup(){
  // Reverse the DOM order so #01 starts centered at the far end of the track,
  // then the strip physically travels from left to right as the page scrolls.
  return GALLERY.map(([id,label],i)=>({id,label,n:i+1})).reverse().map(item=>`<figure class="gallery-card" data-gallery-number="${item.n}"><img src="${imgUrl(item.id,900)}" alt="${item.label}" loading="lazy" decoding="async"><span>${String(item.n).padStart(2,'0')} · ${item.label}</span></figure>`).join('')
}
function initMagicGallery(){
  const s=$('#magicGallery'),track=$('#galleryTrack'),bar=$('#galleryBar'),head=$('#magicHead'),viewport=$('#galleryViewport'),note=$('#magicNote'),header=$('#siteHeader');
  if(!s||!track)return;
  track.innerHTML=galleryMarkup();initImageReliability(track);
  const cards=$$('.gallery-card',track),clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
  const smoother=t=>t*t*t*(t*(t*6-15)+10);
  let distance=0,usable=0,bridge=0,edge=0,cardWidth=0,step=0,targetRaw=0,displayRaw=0,raf=0,lastTs=0;

  const rawFromLayout=()=>{
    const r=s.getBoundingClientRect();
    const max=Math.max(1,r.height-innerHeight-(bridge*2));
    return clamp((bridge-r.top)/max);
  };

  const render=raw=>{
    // 1) Copy is alone. 2) Copy fully clears. 3) #01 installs at center.
    // 4) Short hold. 5) Only then does the strip travel left -> right.
    const headOut=smoother(clamp((raw-.09)/.13));          // finished by .22
    const imageEntry=smoother(clamp((raw-.235)/.095));    // begins after copy is essentially gone
    const travel=smoother(clamp((raw-.39)/.47));          // hold #01 centered until .39
    const exit=smoother(clamp((raw-.92)/.08));

    if(head){
      const opacity=(1-headOut)*(1-exit*.12);
      head.style.opacity=String(opacity);
      head.style.transform=`translate3d(-50%,${-24*headOut}px,0) scale(${1-.016*headOut})`;
      head.style.filter=`blur(${3.2*headOut}px)`;
      head.style.pointerEvents=headOut>.78?'none':'';
    }

    if(viewport){
      const y=(1-imageEntry)*36 + exit*12;
      viewport.style.opacity=String(imageEntry*(1-exit*.28));
      viewport.style.transform=`translate3d(0,calc(-50% + ${y}px),0) scale(${.974+imageEntry*.026-exit*.008})`;
    }

    // Because the cards are reversed, x=-distance centers card #01 exactly.
    // Increasing x toward zero moves the whole strip to the right.
    const x=-distance + distance*travel;
    track.style.transform=`translate3d(${x}px,0,0)`;

    if(bar){
      bar.style.transform=`scaleX(${travel})`;
      bar.parentElement.style.opacity=String(imageEntry*(1-exit));
    }
    if(note){
      note.style.opacity=String(imageEntry*(1-exit)*(.35+.65*travel));
    }

    const center=innerWidth/2;
    cards.forEach((card,i)=>{
      const centerX=edge+cardWidth/2+i*step+x;
      const focus=clamp(1-Math.abs(centerX-center)/(center+cardWidth*.12));
      const visible=imageEntry*(1-exit*.16);
      card.style.opacity=String(visible*(.36+focus*.64));
      card.style.transform=`translate3d(0,${(1-focus)*10}px,0) scale(${.95+focus*.055})`;
      card.style.zIndex=String(10+Math.round(focus*10));
      const im=$('img',card);
      if(im){
        const par=clamp((centerX-center)/innerWidth*6,-3,3);
        const brightness=.86+focus*.18;
        im.style.transform=`translate3d(${par}%,0,0) scale(${1.025+focus*.025})`;
        im.style.filter=`brightness(${brightness}) saturate(${.88+focus*.12}) contrast(${.98+focus*.04})`;
      }
    });
    header?.classList.toggle('gallery-mode',raw>.045&&raw<.97);
  };

  const tick=ts=>{
    if(!lastTs)lastTs=ts;
    const dt=Math.min(48,ts-lastTs);lastTs=ts;
    const alpha=1-Math.exp(-dt/72); // frame-rate independent smoothing
    const diff=targetRaw-displayRaw;
    displayRaw+=diff*alpha;
    if(Math.abs(diff)<.00025)displayRaw=targetRaw;
    render(displayRaw);
    if(displayRaw!==targetRaw)raf=requestAnimationFrame(tick);else{raf=0;lastTs=0}
  };
  const request=()=>{targetRaw=rawFromLayout();if(!raf)raf=requestAnimationFrame(tick)};

  const measure=()=>{
    const first=cards[0];if(!first)return;
    const cs=getComputedStyle(track);
    cardWidth=first.offsetWidth;
    const gap=parseFloat(cs.columnGap||cs.gap)||18;
    step=cardWidth+gap;
    edge=Math.max(14,(innerWidth-cardWidth)/2);
    track.style.setProperty('--gallery-edge',`${edge}px`);
    bridge=parseFloat(getComputedStyle(s).getPropertyValue('--magic-bridge'))||0;
    distance=Math.max(0,(cards.length-1)*step);
    // Slightly shorter than V12: immersive without creating a huge dark void.
    usable=Math.max(innerHeight*1.55,distance*.78);
    s.style.height=`${usable+innerHeight+(bridge*2)}px`;
    targetRaw=rawFromLayout();displayRaw=targetRaw;render(displayRaw);
  };

  addEventListener('scroll',request,{passive:true});
  addEventListener('resize',()=>requestAnimationFrame(measure),{passive:true});
  requestAnimationFrame(measure);
}

function productCard(p){const fav=favs.includes(p.id);return `<article class="product-card" data-reveal="up"><div class="product-media" style="--pos:${p.pos}"><img class="product-img-primary" src="${p.img}" alt="${p.name}" loading="lazy" decoding="async"><img class="product-img-alt" src="${p.altImg||p.img}" alt="" loading="lazy" decoding="async">${p.badge?`<span class="product-badge ${p.id===11?'gold':''}">${p.badge}</span>`:''}<button class="fav-btn ${fav?'active':''}" data-fav="${p.id}" aria-pressed="${fav}" aria-label="${fav?'Retirer':'Ajouter'} ${p.name} des favoris"><svg viewBox="0 0 24 24"><path d="M20.8 4.9a5.3 5.3 0 0 0-7.5 0L12 6.2l-1.3-1.3a5.3 5.3 0 1 0-7.5 7.5L12 21l8.8-8.6a5.3 5.3 0 0 0 0-7.5Z"></path></svg></button><button class="quick-add" data-add="${p.id}">Ajouter à la hotte +</button></div><button class="product-open" data-product="${p.id}"><div class="product-info-row"><h3>${p.name}</h3><strong>${money(p.price)}</strong></div><p>${p.subtitle}</p></button></article>`}
function wireProductActions(root=document){$$('[data-add]',root).forEach(b=>b.onclick=()=>addToCart(+b.dataset.add));$$('[data-product]',root).forEach(b=>b.onclick=()=>openProduct(+b.dataset.product));$$('[data-fav]',root).forEach(b=>b.onclick=()=>toggleFav(+b.dataset.fav))}
function renderHomeProducts(){const g=$('#homeProducts');if(!g)return;g.innerHTML=PRODUCTS.slice(0,4).map(productCard).join('');wireProductActions(g);observeNew(g);initImageReliability(g)}

function renderShop(){const grid=$('#shopGrid');if(!grid)return;const q=($('#shopSearch')?.value||'').trim().toLowerCase();const cat=$('.chip.active')?.dataset.filter||'all';const sort=$('#shopSort')?.value||'featured';let list=PRODUCTS.filter(p=>(cat==='all'||p.category===cat)&&(!q||`${p.name} ${p.subtitle} ${p.category}`.toLowerCase().includes(q)));if(sort==='asc')list.sort((a,b)=>a.price-b.price);if(sort==='desc')list.sort((a,b)=>b.price-a.price);grid.innerHTML=list.map(productCard).join('');$('#shopCount').textContent=`${list.length} création${list.length>1?'s':''}`;$('#shopEmpty').hidden=!!list.length;wireProductActions(grid);observeNew(grid);initImageReliability(grid)}
function initShop(){if(!$('#shopGrid'))return;$$('.chip').forEach(b=>b.onclick=()=>{$$('.chip').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderShop()});$('#shopSearch').addEventListener('input',renderShop);$('#shopSort').addEventListener('change',renderShop);renderShop()}

function initGiftFinder(){
  const box=$('#giftFinder');if(!box)return;
  let state={recipient:null,budget:null,style:null};
  const steps=$$('.finder-step',box),progress=$('#finderProgress'),gift=$('#giftObject'),tag=$('#giftTag'),preview=$('#giftPreviewText');
  const labels={elle:'POUR ELLE',lui:'POUR LUI',enfant:'POUR ENFANT',parents:'POUR PARENTS',collegue:'POUR COLLÈGUE',famille:'POUR LA FAMILLE'};
  function show(n){steps.forEach((s,i)=>s.hidden=i!==n);progress.textContent=n<3?`${n+1} / 3`:'VOS IDÉES'}
  function syncVisual(){
    if(!gift)return;
    gift.dataset.recipient=state.recipient||'';gift.dataset.style=state.style||'';
    tag.textContent=state.recipient?labels[state.recipient]:'POUR QUI ?';
    preview.textContent=!state.recipient?'Choisissez une personne : le paquet commencera à prendre forme.':!state.budget?'L’étiquette est posée. Choisissez maintenant le budget qui guidera la sélection.':!state.style?'L’écrin prend forme. Il ne reste plus qu’à choisir l’émotion à offrir.':'Votre cadeau est prêt à s’ouvrir.';
  }
  function pick(kind,val,btn){state[kind]=val;$$(`[data-${kind}]`,box).forEach(x=>x.classList.remove('active'));btn.classList.add('active');syncVisual();if(kind==='style'){gift?.classList.add('is-revealing');setTimeout(()=>{result();show(3)},520)}else setTimeout(()=>show(kind==='recipient'?1:2),220)}
  function result(){
    const max=state.budget==='10'?10000:state.budget==='25'?25000:state.budget==='50'?50000:999999;
    let list=PRODUCTS.map(p=>{let score=0;if(p.price<=max)score+=2;else if(p.price<=max*1.18)score+=.5;else score-=4;if(state.recipient&&p.recipients?.includes(state.recipient))score+=4;if(state.style&&p.styles?.includes(state.style))score+=3;return{p,score}}).sort((a,b)=>b.score-a.score||a.p.price-b.p.price).slice(0,3).map(x=>x.p);
    const target=$('#finderResultGrid');target.innerHTML=list.map(p=>`<button class="finder-mini" data-product="${p.id}"><img src="${p.img}" alt="${p.name}"><div><strong>${p.name}</strong><span>${money(p.price)}</span></div></button>`).join('');wireProductActions(target);initImageReliability(target)
  }
  $$('[data-recipient]',box).forEach(b=>b.onclick=()=>pick('recipient',b.dataset.recipient,b));$$('[data-budget]',box).forEach(b=>b.onclick=()=>pick('budget',b.dataset.budget,b));$$('[data-style]',box).forEach(b=>b.onclick=()=>pick('style',b.dataset.style,b));
  $$('[data-recipient-card]').forEach(c=>c.addEventListener('click',()=>{const v=c.dataset.recipientCard;const b=$(`[data-recipient="${v}"]`,box);if(b){$$('[data-recipient-card]').forEach(x=>x.dataset.selected='false');c.dataset.selected='true';box.scrollIntoView({behavior:'smooth',block:'center'});setTimeout(()=>b.click(),500)}}));
  $('#finderReset').onclick=()=>{state={recipient:null,budget:null,style:null};$$('.finder-options button',box).forEach(b=>b.classList.remove('active'));$$('[data-recipient-card]').forEach(x=>x.dataset.selected='false');gift?.classList.remove('is-revealing');syncVisual();show(0)};syncVisual();show(0)
}

function experienceDate(){const q=new URLSearchParams(location.search).get('demo');if(q){const d=/^\d{4}-\d{2}-\d{2}$/.test(q)?new Date(q+'T12:00:00'): /^\d{1,2}$/.test(q)?new Date(`2026-12-${String(+q).padStart(2,'0')}T12:00:00`):null;if(d&&!isNaN(d))return{date:d,demo:true}}return{date:new Date(),demo:false}}
function initAdvent(){
  const grid=$('#adventGrid');if(!grid)return;const {date,demo}=experienceDate();let open=read('mn9-advent',read('mn3-advent',[]));let limit=0;if(date.getFullYear()>2026||(date.getFullYear()===2026&&date.getMonth()>11))limit=24;else if(date.getFullYear()===2026&&date.getMonth()===11)limit=Math.min(24,date.getDate());
  grid.innerHTML=ADVENT.map(x=>`<button class="advent-door ${x.day>limit?'locked':''} ${open.includes(x.day)?'open':''} ${x.day===limit&&limit>0?'today':''}" data-day="${x.day}" aria-label="Case ${x.day}${x.day>limit?' verrouillée':''}"><span class="door-scene"><span class="door-reward"><span>${x.icon}</span><b>${x.title}</b></span><span class="door-front"><strong>${x.day}</strong><small>${x.day>limit?'VERROUILLÉ':x.day===limit?'AUJOURD’HUI':'OUVRIR'}</small></span></span></button>`).join('');
  const demoLine=$('#adventDemo');if(demo)demoLine.textContent=`Démo du ${date.toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'})}`;else demoLine.textContent=limit?`La porte du jour vous attend — ${date.toLocaleDateString('fr-FR',{day:'numeric',month:'long'})}.`:'Les premières portes s’ouvriront en décembre 2026.';
  $$('[data-day]',grid).forEach(b=>b.onclick=()=>{const day=+b.dataset.day;if(day>limit){toast(`La case ${day} s’ouvrira en temps voulu.`);return}if(!open.includes(day)){open.push(day);write('mn9-advent',open);b.classList.add('open');b.setAttribute('aria-label',`Case ${day} ouverte — ${ADVENT[day-1].title}`);sparkDoor(b)}toast(`Jour ${day} — ${ADVENT[day-1].title}`)})
}
function sparkDoor(door){for(let i=0;i<7;i++){const s=document.createElement('i');s.className='advent-spark';const a=Math.random()*Math.PI*2,d=28+Math.random()*48;s.style.left='50%';s.style.top='50%';s.style.setProperty('--x',`${Math.cos(a)*d}px`);s.style.setProperty('--y',`${Math.sin(a)*d}px`);door.appendChild(s);setTimeout(()=>s.remove(),800)}}

function injectGlobalUI(){document.body.insertAdjacentHTML('beforeend',`
<section class="overlay-shell" id="cartShell" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Votre hotte"><button class="backdrop" data-close="cart"></button><aside class="drawer" tabindex="-1"><div class="drawer-head"><h2>Votre hotte <span id="cartCountDrawer"></span></h2><button class="close-btn" data-close="cart" aria-label="Fermer">×</button></div><div class="cart-items" id="cartItems"></div><div class="cart-foot"><div class="cart-total"><span>Total</span><strong id="cartTotal">0 F CFA</strong></div><p class="cart-foot-note">Commande fictive envoyée via WhatsApp.</p><button class="btn btn-primary" id="demoCheckoutBtn" style="width:100%" type="button">Commander via WhatsApp</button></div></aside></section>
<section class="overlay-shell" id="searchShell" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Recherche de cadeaux"><button class="backdrop" data-close="search"></button><div class="search-panel" tabindex="-1"><button class="close-btn" style="position:absolute;right:18px;top:18px" data-close="search" aria-label="Fermer">×</button><span class="eyebrow"><i></i> RECHERCHE</span><h2>Quel cadeau <em>cherchez-vous ?</em></h2><label class="search-field"><span class="sr-only">Recherche</span><input id="globalSearch" type="search" placeholder="Bougie, coffret, cacao…"><button class="btn btn-secondary" type="button" data-search-clear>Effacer</button></label><div class="search-results" id="globalSearchResults"></div></div></section>
<section class="overlay-shell" id="productShell" aria-hidden="true" role="dialog" aria-modal="true" aria-label="Fiche produit"><button class="backdrop" data-close="product"></button><div class="product-modal" tabindex="-1"><button class="close-btn modal-close" data-close="product" aria-label="Fermer">×</button><div id="productModalContent"></div></div></section>
<section class="mobile-menu" id="mobileMenu" aria-hidden="true"><div class="mobile-menu-head"><a class="brand" href="index.html"><span class="brand-mark" style="color:#fff">MN</span><span class="brand-copy"><strong style="color:#fff">MAISON NOËL</strong></span></a><button class="close-btn" id="mobileMenuClose" style="color:#fff;border-color:rgba(255,255,255,.2)" aria-label="Fermer">×</button></div><nav>${navLinks(true)}</nav><div class="mobile-menu-tools"><button data-mobile-search>Recherche</button><button data-mobile-cart>Hotte · <span id="mobileCartCount">0</span></button></div></section>
<div class="toast" id="toast" role="status" aria-live="polite"></div>`)}
function navLinks(m=false){return `<a data-page-link data-page="home" href="index.html">Accueil</a><a data-page-link data-page="shop" href="boutique.html">Boutique</a><a data-page-link data-page="univers" href="univers.html">Univers</a><a data-page-link data-page="advent" href="avent.html">L’Avent</a><a data-page-link data-page="maison" href="maison.html">La Maison</a>`}
function openShell(id,trigger){lastFocus=trigger||document.activeElement;const s=$('#'+id);if(!s)return;activeShell=s;s.classList.add('open');s.setAttribute('aria-hidden','false');document.body.classList.add('is-locked');setPageInert(true);setTimeout(()=>$('[tabindex="-1"]',s)?.focus(),30)}
function closeShell(id){const s=$('#'+id);if(!s)return;s.classList.remove('open');s.setAttribute('aria-hidden','true');if(activeShell===s)activeShell=null;document.body.classList.remove('is-locked');setPageInert(false);lastFocus?.focus?.()}
function initGlobalUI(){
  injectGlobalUI();
  const openMenu=()=>{const m=$('#mobileMenu');m.classList.add('open');m.setAttribute('aria-hidden','false');document.body.classList.add('is-locked');setPageInert(true);setTimeout(()=>$('#mobileMenuClose')?.focus(),20)};
  const closeMenu=()=>{const m=$('#mobileMenu');if(!m)return;m.classList.remove('open');m.setAttribute('aria-hidden','true');document.body.classList.remove('is-locked');setPageInert(false)};
  $('#menuOpen')?.addEventListener('click',openMenu);$('#mobileMenuClose')?.addEventListener('click',closeMenu);
  $$('[data-mobile-search]').forEach(b=>b.onclick=()=>{closeMenu();openSearch(b)});$$('[data-mobile-cart]').forEach(b=>b.onclick=()=>{closeMenu();openCart(b)});
  $('#cartOpen')?.addEventListener('click',e=>openCart(e.currentTarget));$('#searchOpen')?.addEventListener('click',e=>openSearch(e.currentTarget));
  $$('[data-close="cart"]').forEach(b=>b.onclick=()=>closeShell('cartShell'));$$('[data-close="search"]').forEach(b=>b.onclick=()=>closeShell('searchShell'));$$('[data-close="product"]').forEach(b=>b.onclick=()=>closeShell('productShell'));
  $('#globalSearch')?.addEventListener('input',renderGlobalSearch);$('[data-search-clear]')?.addEventListener('click',()=>{$('#globalSearch').value='';renderGlobalSearch();$('#globalSearch').focus()});
  $('#demoCheckoutBtn')?.addEventListener('click',checkoutViaWhatsApp);
  addEventListener('keydown',e=>{if(e.key==='Escape'){closeShell('cartShell');closeShell('searchShell');closeShell('productShell');closeMenu()}if(e.key==='Tab'&&activeShell){const f=focusables(activeShell);if(!f.length)return;const first=f[0],last=f[f.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
  updateCartUI();renderGlobalSearch();
}
function openCart(t){updateCartUI();openShell('cartShell',t)}function openSearch(t){renderGlobalSearch();openShell('searchShell',t);setTimeout(()=>$('#globalSearch').focus(),100)}
function renderGlobalSearch(){const q=($('#globalSearch')?.value||'').trim().toLowerCase();const list=PRODUCTS.filter(p=>!q||`${p.name} ${p.subtitle} ${p.category}`.toLowerCase().includes(q)).slice(0,9);$('#globalSearchResults').innerHTML=list.map(p=>`<button class="search-result" data-product="${p.id}"><img src="${p.img}" alt="${p.name}"><div><strong>${p.name}</strong><span>${money(p.price)}</span></div></button>`).join('')||'<div class="empty-state">Aucun cadeau trouvé.</div>';wireProductActions($('#globalSearchResults'));initImageReliability($('#globalSearchResults'))}
function openProduct(id){
  const p=PRODUCTS.find(x=>x.id===id);if(!p)return;
  const delivery=new Date(CONFIG.deliveryDeadline+'T12:00:00');const now=new Date();const deliveryText=now<=delivery?'Commandez avant le 20 décembre pour une livraison estimée avant Noël.':'La livraison standard de Noël est close — privilégiez les options express ou la carte cadeau.';
  $('#productModalContent').innerHTML=`<div class="product-modal-grid"><div class="product-modal-gallery"><div class="product-thumbs"><button class="active" data-gallery-src="${p.img}"><img src="${p.img}" alt="Vue principale"></button><button data-gallery-src="${p.altImg||p.img}"><img src="${p.altImg||p.img}" alt="Vue d’ambiance"></button></div><div class="product-main-image"><img id="productMainImage" src="${p.img}" alt="${p.name}"></div></div><div class="product-modal-info"><span class="eyebrow"><i></i> ${p.category.toUpperCase()}</span><h2>${p.name}</h2><strong>${money(p.price)}</strong><p>${p.subtitle}. Une attention sélectionnée pour être offerte dans l’écrin Maison Noël.</p><div class="product-options"><span class="product-options-label">CHOISISSEZ L’ÉCRIN</span><div class="wrap-options"><button class="active" data-wrap="ivoire">Ivoire</button><button data-wrap="sapin">Sapin</button><button data-wrap="bordeaux">Bordeaux</button></div><div class="wrap-preview" id="wrapPreview" data-wrap="ivoire"><span class="wrap-mini"></span><p>L’écrin Maison Noël est offert et préparé juste avant l’expédition.</p></div><div class="gift-message"><div class="message-meta"><span class="product-options-label" style="margin:0">AJOUTER UN MOT</span><b id="giftMessageCount">0 / 160</b></div><textarea id="giftMessageInput" maxlength="160" placeholder="Quelques mots à glisser dans le cadeau…"></textarea></div><div class="delivery-note"><span>✦</span><span>${deliveryText}</span></div></div><button class="btn btn-primary" data-add="${p.id}" style="margin-top:20px;width:100%">Offrir ce cadeau</button></div></div>`;
  wireProductActions($('#productModalContent'));initImageReliability($('#productModalContent'));
  $$('[data-gallery-src]',$('#productModalContent')).forEach(b=>b.onclick=()=>{const im=$('#productMainImage');$$('[data-gallery-src]',$('#productModalContent')).forEach(x=>x.classList.toggle('active',x===b));im.style.opacity='.25';im.style.transform='scale(.985)';setTimeout(()=>{im.src=b.dataset.gallerySrc;im.onload=()=>{im.style.opacity='1';im.style.transform='none'}},140)});
  $$('[data-wrap]',$('#productModalContent')).forEach(b=>b.onclick=()=>{$$('[data-wrap]',$('#productModalContent')).forEach(x=>x.classList.toggle('active',x===b));$('#wrapPreview').dataset.wrap=b.dataset.wrap;toast(`Écrin ${b.textContent} sélectionné.`)});const msg=$('#giftMessageInput');msg?.addEventListener('input',()=>$('#giftMessageCount').textContent=`${msg.value.length} / 160`);
  openShell('productShell')
}
function addToCart(id){const p=PRODUCTS.find(x=>x.id===id);const it=cart.find(x=>x.id===id);if(it)it.qty++;else cart.push({id,qty:1});write('mn9-cart',cart);updateCartUI();$$('[data-cart-count]').forEach(el=>{const host=el.closest('.bag-btn')||el;host.classList.remove('cart-pulse');void host.offsetWidth;host.classList.add('cart-pulse')});toast(`${p.name} ajouté à votre hotte.`)}
function toggleFav(id){favs=favs.includes(id)?favs.filter(x=>x!==id):[...favs,id];write('mn9-favs',favs);$$(`[data-fav="${id}"]`).forEach(b=>{const a=favs.includes(id);b.classList.toggle('active',a);b.setAttribute('aria-pressed',a)});toast(favs.includes(id)?'Ajouté aux favoris.':'Retiré des favoris.')}
function updateCartUI(){const n=cart.reduce((s,x)=>s+x.qty,0);$$('[data-cart-count]').forEach(e=>e.textContent=n);$('#mobileCartCount')&&( $('#mobileCartCount').textContent=n);$('#cartCountDrawer')&&( $('#cartCountDrawer').textContent=n?`· ${n}`:'');const list=$('#cartItems');if(!list)return;if(!cart.length){list.innerHTML='<div class="empty-state" style="width:auto;margin:40px 0">Votre hotte est encore vide.</div>'}else list.innerHTML=cart.map(it=>{const p=PRODUCTS.find(x=>x.id===it.id);return `<article class="cart-item"><img src="${p.img}" alt="${p.name}"><div><h3>${p.name}</h3><small>${p.subtitle}</small><div class="qty"><button data-qty="${p.id}" data-delta="-1">−</button><span>${it.qty}</span><button data-qty="${p.id}" data-delta="1">+</button></div></div><strong>${money(p.price*it.qty)}</strong></article>`}).join('');$$('[data-qty]',list).forEach(b=>b.onclick=()=>{const it=cart.find(x=>x.id===+b.dataset.qty);it.qty+=+b.dataset.delta;if(it.qty<=0)cart=cart.filter(x=>x.id!==it.id);write('mn9-cart',cart);updateCartUI()});const total=cart.reduce((s,it)=>s+(PRODUCTS.find(p=>p.id===it.id)?.price||0)*it.qty,0);$('#cartTotal').textContent=money(total);const cta=$('#demoCheckoutBtn');if(cta){cta.disabled=!cart.length;cta.textContent=cart.length?'Commander via WhatsApp':'Panier vide';}}
function toast(m){const t=$('#toast');if(!t)return;t.textContent=m;t.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>t.classList.remove('show'),3200)}




function initAmbientAudio(){
  if($('#ambientAudio'))return;
  document.body.insertAdjacentHTML('beforeend',`
    <audio id="ambientAudio" src="assets/audio/maison-noel-ambiance.mp3" preload="metadata" loop></audio>
    <aside class="ambient-prompt" id="ambientPrompt" aria-live="polite" aria-label="Ambiance musicale de Noël">
      <button class="ambient-prompt-close" id="ambientPromptClose" type="button" aria-label="Fermer">×</button>
      <span class="ambient-kicker">AMBIANCE MAISON NOËL</span>
      <strong>Un peu de musique ?</strong>
      <p>Une ambiance instrumentale douce peut accompagner votre visite. Elle reste discrète et peut être coupée à tout moment.</p>
      <div class="ambient-prompt-actions"><button class="btn btn-primary" id="ambientAccept" type="button">Activer l’ambiance ✦</button><button class="ambient-later" id="ambientLater" type="button">Pas maintenant</button></div>
    </aside>
    <button class="ambient-control" id="ambientControl" type="button" aria-pressed="false" aria-label="Activer l’ambiance musicale">
      <span class="ambient-control-icon" aria-hidden="true"><i></i><i></i><i></i></span>
      <span class="ambient-control-copy"><small>AMBIANCE</small><strong id="ambientControlLabel">Musique</strong></span>
    </button>`);
  const audio=$('#ambientAudio'),prompt=$('#ambientPrompt'),control=$('#ambientControl'),label=$('#ambientControlLabel');
  const accept=$('#ambientAccept'),later=$('#ambientLater'),close=$('#ambientPromptClose');
  const pref=localStorage.getItem('mn11-audio');
  let volRaf=0,lastSave=0;
  const targetVolume=.16;
  const setState=playing=>{
    control.classList.toggle('is-playing',playing);
    control.setAttribute('aria-pressed',String(playing));
    control.setAttribute('aria-label',playing?'Mettre l’ambiance musicale en pause':'Activer l’ambiance musicale');
    label.textContent=playing?'En lecture':'Musique';
  };
  const fadeTo=(to,duration=520,after)=>{
    cancelAnimationFrame(volRaf);
    const from=audio.volume,start=performance.now();
    const tick=now=>{const t=Math.min(1,(now-start)/duration);audio.volume=from+(to-from)*(t*t*(3-2*t));if(t<1)volRaf=requestAnimationFrame(tick);else after?.()};
    volRaf=requestAnimationFrame(tick);
  };
  const restoreTime=()=>{const saved=parseFloat(sessionStorage.getItem('mn11-audio-time')||'0');if(Number.isFinite(saved)&&audio.duration){try{audio.currentTime=saved%audio.duration}catch{}}};
  audio.addEventListener('loadedmetadata',restoreTime,{once:true});
  audio.addEventListener('timeupdate',()=>{const now=Date.now();if(now-lastSave>900){lastSave=now;sessionStorage.setItem('mn11-audio-time',String(audio.currentTime||0))}});
  addEventListener('pagehide',()=>sessionStorage.setItem('mn11-audio-time',String(audio.currentTime||0)));
  audio.addEventListener('play',()=>setState(true));audio.addEventListener('pause',()=>setState(false));
  audio.addEventListener('error',()=>{prompt.classList.remove('show');control.hidden=true;});
  const play=async(userInitiated=false)=>{try{if(audio.readyState>=1)restoreTime();audio.volume=0;await audio.play();fadeTo(targetVolume,700);if(userInitiated)localStorage.setItem('mn11-audio','on');prompt.classList.remove('show');sessionStorage.setItem('mn11-audio-prompt','done');return true}catch{setState(false);return false}};
  const pause=(remember=true)=>{fadeTo(0,360,()=>audio.pause());if(remember)localStorage.setItem('mn11-audio','off')};
  control.addEventListener('click',()=>audio.paused?play(true):pause(true));
  accept.addEventListener('click',()=>play(true));
  const dismiss=()=>{prompt.classList.remove('show');sessionStorage.setItem('mn11-audio-prompt','done')};
  later.addEventListener('click',dismiss);close.addEventListener('click',dismiss);
  const offer=()=>{
    if(pref==='on'){setTimeout(()=>play(false),220);return}
    if(pref==='off'||sessionStorage.getItem('mn11-audio-prompt'))return;
    setTimeout(()=>prompt.classList.add('show'),650);
  };
  const waitIntro=()=>{
    const curtain=$('#introCurtain');
    if(!curtain||!document.body.contains(curtain)){offer();return}
    const started=Date.now();const timer=setInterval(()=>{if(!$('#introCurtain')||Date.now()-started>6500){clearInterval(timer);offer()}},180);
  };
  setState(false);waitIntro();
}

function initMaisonRibbon(){const path=$('#maisonRibbonPath'),main=$('.maison-story');if(!path||!main)return;const len=path.getTotalLength?.()||1300;path.style.strokeDasharray=len;path.style.strokeDashoffset=len;let raf=0;const update=()=>{raf=0;const r=main.getBoundingClientRect();const total=Math.max(1,main.scrollHeight-innerHeight);const p=Math.max(0,Math.min(1,(-r.top)/total));path.style.strokeDashoffset=String(len*(1-p))};const on=()=>{if(!raf)raf=requestAnimationFrame(update)};addEventListener('scroll',on,{passive:true});addEventListener('resize',on);update()}
function initNewsletter(){const f=$('#newsletterForm');if(!f)return;f.onsubmit=e=>{e.preventDefault();const i=$('input',f);if(!i.value.includes('@'))return toast('Indiquez une adresse e-mail valide.');i.value='';toast('Bienvenue dans le Cercle Noël ✦')}}


function makeFestivePlaceholder(kind='Maison Noël'){const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f4eadb"/><stop offset="0.55" stop-color="#d8c6ab"/><stop offset="1" stop-color="#7a684f"/></linearGradient><radialGradient id="r" cx="0.22" cy="0.18" r="0.45"><stop stop-color="#fff8ef" stop-opacity="0.95"/><stop offset="1" stop-color="#fff8ef" stop-opacity="0"/></radialGradient></defs><rect width="1200" height="900" fill="url(#g)"/><rect width="1200" height="900" fill="url(#r)"/><g fill="#fff4df" opacity="0.85">${Array.from({length:20},(_,i)=>`<circle cx="${80+i*52}" cy="${80+(i%5)*22}" r="${6+(i%4)*3}"/>`).join('')}</g><g fill="none" stroke="#10382d" stroke-opacity="0.28"><path d="M160 675c108-145 248-218 418-218 171 0 319 73 463 218" stroke-width="2"/></g><text x="92" y="744" fill="#10382d" font-family="Georgia, serif" font-size="96">Maison Noël</text><text x="96" y="806" fill="#a7192b" font-family="Arial, sans-serif" font-size="28" letter-spacing="6">${kind.toUpperCase()}</text></svg>`;return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`}

function initImageReliability(root=document){
  $$('img',root).forEach(img=>{if(img.dataset.reliabilityBound)return;img.dataset.reliabilityBound='1';const fb=img.dataset.fallback;let triedFallback=false;const host=img.closest('.shop-hero-background,.page-hero-media,.hero-media,.journey-card,.recipient-card,.story-photo,.editorial-media,.product-media,.gallery-card,.search-result,.finder-mini,.product-modal-gallery,.cart-item');const placeholder=()=>{if(img.dataset.placeholderApplied)return;img.dataset.placeholderApplied='1';host?.classList.add('image-fallback');img.src=makeFestivePlaceholder(img.alt||'ÉDITION NOËL')};img.addEventListener('error',()=>{if(fb&&!triedFallback){triedFallback=true;img.src=fb;return}placeholder()});img.addEventListener('load',()=>{if(img.naturalWidth>0)host?.classList.remove('image-fallback')});if(img.complete&&img.naturalWidth===0){if(fb&&!triedFallback){triedFallback=true;img.src=fb}else placeholder()}})
}
function init(){initGlobalUI();setActiveNav();initHeader();initReveal();initPageTransitions();initImageReliability();runIntro();initMagicGallery();renderHomeProducts();initShop();initGiftFinder();initAdvent();initMaisonRibbon();initNewsletter();initAmbientAudio();}
document.addEventListener('DOMContentLoaded',init);
