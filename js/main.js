/* ===== CAROZZA CALZATURE · main.js ===== */
(function(){
  'use strict';

  /* ---- INTRO ---- */
  var intro=document.getElementById('intro');
  function closeIntro(){ if(intro){intro.classList.add('done');document.body.style.overflow='';} }
  if(intro){
    document.body.style.overflow='hidden';
    var skip=document.getElementById('intro-skip');
    if(skip) skip.addEventListener('click',closeIntro);
    setTimeout(closeIntro,1900);
  }
  if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches){ if(intro){intro.classList.add('done');document.body.style.overflow='';} }

  /* ---- HEADER scroll ---- */
  var header=document.getElementById('site-header');
  function onScroll(){ if(header) header.classList.toggle('scrolled',window.scrollY>18); }
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();

  /* ---- BURGER ---- */
  var burger=document.getElementById('burger'), nav=document.querySelector('.nav');
  if(burger&&nav){
    burger.addEventListener('click',function(){
      var open=nav.classList.toggle('open');
      burger.setAttribute('aria-expanded',open?'true':'false');
    });
    nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('open');burger.setAttribute('aria-expanded','false');});});
  }

  /* ---- REVEAL ---- */
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12,rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});

  /* ---- LIGHTBOX ---- */
  var lb=document.getElementById('lightbox'),lbImg=document.getElementById('lb-img'),lbClose=document.getElementById('lb-close');
  document.querySelectorAll('.g-item').forEach(function(it){
    it.addEventListener('click',function(){
      var full=it.getAttribute('data-full'); if(!full)return;
      lbImg.src=full; var im=it.querySelector('img'); lbImg.alt=im?im.alt:''; lb.classList.add('open');
    });
  });
  function closeLb(){lb.classList.remove('open');setTimeout(function(){lbImg.src='';},300);}
  if(lbClose) lbClose.addEventListener('click',closeLb);
  if(lb) lb.addEventListener('click',function(e){if(e.target===lb)closeLb();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&lb.classList.contains('open'))closeLb();});

  /* ---- ORARI DINAMICI ---- */
  // getDay: 0=Dom..6=Sab. Aperti tutti i giorni, doppia finestra.
  var TABLE={
    0:[[10.5,13.5],[14.5,18.5]],
    1:[[10,13],[15.5,19.5]],
    2:[[9.5,13.5],[15.5,19.5]],
    3:[[9.5,13.5],[15.5,19.5]],
    4:[[9.5,13.5],[15.5,19.5]],
    5:[[9.5,13.5],[15.5,19.5]],
    6:[[9.5,13.5],[15.5,19.5]]
  };
  function nowRome(){
    try{ var s=new Date().toLocaleString('en-US',{timeZone:'Europe/Rome'}); return new Date(s); }
    catch(e){ return new Date(); }
  }
  function fmt(h){var H=Math.floor(h),M=Math.round((h-H)*60);return H+':'+(M<10?'0'+M:''+M);}
  function updateLive(){
    var dot=document.getElementById('live-dot'), txt=document.getElementById('live-text');
    if(!dot||!txt)return;
    var d=nowRome(), day=d.getDay(), hr=d.getHours()+d.getMinutes()/60;
    var wins=TABLE[day]||[], openNow=false, closeAt=0, nextOpen=null;
    for(var i=0;i<wins.length;i++){ if(hr>=wins[i][0]&&hr<wins[i][1]){openNow=true;closeAt=wins[i][1];} if(hr<wins[i][0]&&nextOpen===null){nextOpen=wins[i][0];} }
    var LANG=document.documentElement.getAttribute('lang')||'it';
    if(openNow){
      dot.className='open';
      txt.textContent=(LANG==='en'?'Open now · until ':'Aperto ora · fino alle ')+fmt(closeAt);
    }else if(nextOpen!==null){
      dot.className='closed';
      txt.textContent=(LANG==='en'?'Closed · opens at ':'Chiuso · apre alle ')+fmt(nextOpen);
    }else{
      var names=LANG==='en'?['Sun','Mon','Tue','Wed','Thu','Fri','Sat']:['dom','lun','mar','mer','gio','ven','sab'];
      var nd=null,ndDay=null;
      for(var k=1;k<=7;k++){ var dd=(day+k)%7; if((TABLE[dd]||[]).length){ nd=TABLE[dd][0][0]; ndDay=dd; break; } }
      dot.className='closed';
      if(nd!==null) txt.textContent=(LANG==='en'?'Closed · opens ':'Chiuso · apre ')+names[ndDay]+' '+fmt(nd);
      else txt.textContent=(LANG==='en'?'Closed':'Chiuso');
    }
  }
  updateLive(); setInterval(updateLive,60000);

  /* ---- I18N ---- */
  var EN={
    'intro.skip':'Enter →',
    'brand.sub':'Calzature · since 1956',
    'nav.storia':'Since 1956','nav.marche':'The brands','nav.passo':'What you find','nav.dove':'The shop',
    'cta.call':'02 3360 1721',
    'hero.eyebrow':'Via Luigi Canonica 59 · Sempione, Milan',
    'hero.since':'since 1956 · three generations',
    'hero.sub':'Shoes that are <b>comfortable and beautiful</b>, made to be shown off. For three generations we’ve picked the best comfort brands for you — starting with Birkenstock — with the patience and care of a family shop.',
    'hero.cta1':'Our brands','hero.cta2':'Visit the shop',
    'hero.live':'Checking hours…','hero.f2':'★ 4.8 · official Birkenstock retailer',
    'storia.kicker':'Since 1956',
    'storia.h2':'Three generations,<br>one love: shoes.',
    'storia.p1':'Carozza Calzature has been on <b>Via Luigi Canonica</b>, in the Sempione district, <b>since 1956</b>. Ever since, from father to child, the same idea: to pick shoes that are <em>comfortable but beautiful</em>, worth showing off.',
    'storia.p2':'Love and passion for footwear, an always well-stocked selection and patient, expert advice: that’s why, after almost seventy years, people keep coming back.',
    'storia.s1':'the year we opened','storia.s2':'generations','storia.s3':'and loyal customers',
    'marche.kicker':'The brands','marche.h2':'The names of comfort',
    'marche.sub':'We choose the best brands of comfortable, quality footwear. And we’re an official Birkenstock retailer.',
    'brand.official':'official retailer',
    'marche.note':'…and many more. Just ask: if it’s not in, we can often find it for you.',
    'passo.kicker':'What you find','passo.h2':'For every step',
    'cat.1t':'Comfort & Birkenstock','cat.1p':'The heart of the shop: footbeds, sandals and iconic models, from the Montana onwards.',
    'cat.2t':'Women','cat.2p':'Women’s footwear, comfortable yet elegant, for every season.',
    'cat.3t':'Men','cat.3p':'From the classic shoe to the everyday comfortable one.',
    'cat.4t':'Sandals & slippers','cat.4p':'For summer and for home, soft and well-made.',
    'cat.5t':'Boots','cat.5p':'Quality boots and ankle boots, often on sale too.',
    'cat.6t':'Elegant','cat.6p':'Formal and office models, from the best brands.',
    'gallery.kicker':'The shop','gallery.h2':'Take a look',
    'rev.kicker':'The word','rev.h2':'4.8 ★ · «comfortable but beautiful»',
    'dove.kicker':'The shop','dove.h2':'In the Sempione district,<br>on Via Canonica.',
    'dove.addr':'Address','dove.addr2':'— Sempione','dove.hours':'Hours','dove.hoursv':'Every day · Tue–Sat 9:30–13:30 / 15:30–19:30 · Mon & Sun reduced hours',
    'dove.phone':'Phone','dove.social':'Social','dove.route':'Get directions','dove.call':'Call the shop',
    'faq.h2':'Frequently asked questions',
    'faq.q1':'Where is Carozza Calzature?','faq.a1':'At Via Luigi Canonica 59, in Milan’s Sempione district. A family shop since 1956.',
    'faq.q2':'Do you sell Birkenstock?','faq.a2':'Yes, we’re an official Birkenstock retailer with a wide range of models. Alongside many other comfort brands like Ecco, Legero, Ara, Löwenweiss, Giesswein, Tamaris and Valleverde.',
    'faq.q3':'What kind of shoes will I find?','faq.a3':'Footwear for men and women: comfortable but beautiful, made to show off. Elegant shoes, boots, sandals, slippers and the best comfort brands.',
    'faq.q4':'When are you open?','faq.a4':'Open every day. Tuesday to Saturday 9:30–13:30 and 15:30–19:30; Monday 10–13 and 15:30–19:30; Sunday 10:30–13:30 and 14:30–18:30.',
    'foot.sub':'Comfortable, beautiful shoes since 1956 · Milan',
    'foot.where':'Where','foot.hours':'Hours','foot.hours2':'Open every day','foot.hours3':'Tue–Sat 9:30–13:30 / 15:30–19:30','foot.contact':'Contact',
    'foot.disclaimer':'Demo website. Content and photos gathered from public sources (Google Maps); hours, brands and availability are indicative, to be confirmed with the shop.',
    'rev.g1':'Google review · <span>★★★★★</span>','rev.g2':'Google review · <span>★★★★★</span>',
    'ab.marche':'Brands','ab.call':'Call','ab.route':'Directions'
  };
  var IT={};
  document.querySelectorAll('[data-i18n]').forEach(function(el){ IT[el.getAttribute('data-i18n')]=el.innerHTML; });
  function setLang(lang){
    var dict=lang==='en'?EN:IT;
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      var k=el.getAttribute('data-i18n'); if(dict[k]!=null) el.innerHTML=dict[k]; else if(IT[k]!=null) el.innerHTML=IT[k];
    });
    document.documentElement.setAttribute('lang',lang);
    document.querySelectorAll('.lang button').forEach(function(b){b.classList.toggle('active',b.getAttribute('data-lang')===lang);});
    try{localStorage.setItem('carozza_lang',lang);}catch(e){}
    updateLive();
  }
  document.querySelectorAll('.lang button').forEach(function(b){ b.addEventListener('click',function(){setLang(b.getAttribute('data-lang'));}); });
  var saved='it'; try{saved=localStorage.getItem('carozza_lang')||'it';}catch(e){}
  if(saved==='en') setLang('en');

})();
