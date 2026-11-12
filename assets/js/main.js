(function(){
var $=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var C=window.TK_CONFIG||{};
$$('.fy,[id=year]').forEach(function(y){y.textContent=new Date().getFullYear()});
/* config-driven contact details */
$$('[data-cfg]').forEach(function(el){var k=el.dataset.cfg,v=C[k];if(!v)return;el.textContent=v;if(k==='email')el.href='mailto:'+v;if(k==='phone'){el.href='tel:'+v.replace(/[^\d+]/g,'');el.hidden=false;if(el.parentNode.hidden)el.parentNode.hidden=false}});
$$('[data-cfg-link]').forEach(function(el){var v=C[el.dataset.cfgLink];if(v)el.href=v});
if(C.plausibleDomain){var an=document.createElement('script');an.defer=true;an.dataset.domain=C.plausibleDomain;an.src='https://plausible.io/js/script.js';document.head.appendChild(an)}
/* navigation: drawer + services dropdown */
var nav=$('#siteNav'),tg=$('#navToggle');
function closeNav(){if(!nav)return;nav.classList.remove('open');tg.setAttribute('aria-expanded','false');tg.textContent='☰';tg.setAttribute('aria-label','Open navigation');document.body.classList.remove('nav-open')}
function closeDD(){$$('.dd.open').forEach(function(d){d.classList.remove('open');$('.dd-btn',d).setAttribute('aria-expanded','false')})}
if(nav&&tg){
 tg.addEventListener('click',function(){var o=!nav.classList.contains('open');if(!o)return closeNav();nav.classList.add('open');tg.setAttribute('aria-expanded','true');tg.textContent='✕';tg.setAttribute('aria-label','Close navigation');document.body.classList.add('nav-open')});
 nav.addEventListener('click',function(e){var a=e.target.closest('a');if(a)closeNav()});
 $$('.dd-btn',nav).forEach(function(b){b.addEventListener('click',function(){var d=b.parentNode,o=!d.classList.contains('open');closeDD();d.classList.toggle('open',o);b.setAttribute('aria-expanded',o)})});
 document.addEventListener('keydown',function(e){if(e.key==='Escape'){closeNav();closeDD()}});
 document.addEventListener('click',function(e){if(!e.target.closest('.dd'))closeDD();if(nav.classList.contains('open')&&!e.target.closest('.navbar'))closeNav()});
 matchMedia('(min-width:901px)').addEventListener('change',closeNav)}
/* back to top */
var tt=$('#toTop');
if(tt){var sh=function(){tt.hidden=scrollY<700};addEventListener('scroll',sh,{passive:true});sh();tt.addEventListener('click',function(){scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'})})}
/* tab sets (keyboard + #hash deep links) */
$$('[data-tabset]').forEach(function(set){
 var tabs=$$('.tab',set),panes=$$('.panel-pane',set);
 function sel(i){tabs.forEach(function(t,k){t.setAttribute('aria-selected',k===i)});panes.forEach(function(p,k){p.classList.toggle('on',k===i)})}
 tabs.forEach(function(t,i){
  t.addEventListener('click',function(){sel(i);if(t.dataset.key)history.replaceState(null,'','#'+t.dataset.key)});
  t.addEventListener('keydown',function(e){var n=e.key==='ArrowDown'?i+1:e.key==='ArrowUp'?i-1:null;if(n!==null){e.preventDefault();n=(n+tabs.length)%tabs.length;sel(n);tabs[n].focus()}})});
 function fromHash(){var h=location.hash.slice(1);tabs.forEach(function(t,i){if(t.dataset.key===h){sel(i);set.scrollIntoView({behavior:'smooth',block:'start'})}})}
 fromHash();addEventListener('hashchange',fromHash)});
/* scroll-spy for sticky sub-navigation */
var sn=$$('.subnav a'),secs=sn.map(function(a){return $(a.getAttribute('href'))}).filter(Boolean);
if(sn.length&&'IntersectionObserver' in window){
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){sn.forEach(function(a){var on=a.getAttribute('href')==='#'+e.target.id;a.classList.toggle('on',on);if(on&&a.parentNode.scrollWidth>a.parentNode.clientWidth)a.parentNode.scrollTo({left:a.offsetLeft-24,behavior:'smooth'})})}})},{rootMargin:'-35% 0px -55% 0px'});
 secs.forEach(function(s){io.observe(s)})}
/* service finder */
var fd=$('[data-finder]');
if(fd){var out=$('#finderOut',fd),gs=$$('.goal',fd);
 gs.forEach(function(g){g.addEventListener('click',function(){
  gs.forEach(function(x){x.setAttribute('aria-pressed',x===g)});
  out.className='result';out.innerHTML='';
  var h=document.createElement('h3');h.textContent=g.dataset.t;
  var p=document.createElement('p');p.textContent=g.dataset.s;
  var a=document.createElement('div');a.className='acts';
  a.innerHTML='<a class="btn btn-primary" href="#'+g.dataset.id+'">View service details</a><a class="btn btn-outline" href="contact.html?service='+encodeURIComponent(g.dataset.o)+'#enquiry">Discuss this service</a>';
  out.appendChild(h);out.appendChild(p);out.appendChild(a)})})}
})();
