(function(){
var f=document.getElementById('enquiryForm');if(!f)return;
var C=window.TK_CONFIG||{},$=function(s){return f.querySelector(s)};
var rules={
 name:function(v){return v.trim().length>=2||'Please enter your full name.'},
 email:function(v){return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())||'Enter a valid email address, like name@company.com.'},
 phone:function(v){return !v.trim()||/^\+?[\d\s\-()]{7,18}$/.test(v.trim())||'Enter a valid phone number or leave this blank.'},
 service:function(v){return !!v||'Choose the area you would like to discuss.'},
 objective:function(v){return v.trim().length>=20||'Please describe your objective in at least 20 characters.'},
 consent:function(v,el){return el.checked||'Please confirm that we may contact you about this enquiry.'}
};
function check(n){var el=f.elements[n],ok=rules[n](el.value,el),box=el.closest('.field');
 box.classList.toggle('invalid',ok!==true);el.classList.toggle('bad',ok!==true);
 box.querySelector('.err').textContent=ok===true?'':ok;el.setAttribute('aria-invalid',ok!==true);return ok===true}
Object.keys(rules).forEach(function(n){var el=f.elements[n];el.addEventListener('blur',function(){check(n)});el.addEventListener('input',function(){if(el.closest('.field').classList.contains('invalid'))check(n)});el.addEventListener('change',function(){check(n)})});
var ob=f.elements.objective,cn=$('.counter');
function cnt(){cn.textContent=ob.value.length+' / 1000'}ob.addEventListener('input',cnt);cnt();
var pre=new URLSearchParams(location.search).get('service'),sv=f.elements.service;
if(pre)for(var i=0;i<sv.options.length;i++)if(sv.options[i].text===pre){sv.selectedIndex=i;break}
function status(msg,err){var s=$('.status');s.hidden=false;s.className='status'+(err?' error':'');s.textContent=msg}
function done(d,mail){
 f.hidden=true;var t=document.getElementById('thanks');t.hidden=false;
 document.getElementById('tName').textContent=d.name.split(' ')[0];
 document.getElementById('tMsg').textContent=mail?'Your email app should now be open with your enquiry pre-filled. Press send there to complete it. If nothing opened, email us directly at '+(C.email||'our contact address')+'.':'Your enquiry has been sent. We will review it and reply by '+d.method.toLowerCase()+'.';
 document.getElementById('recap').innerHTML='';
 [['Area',d.service],['Email',d.email],['Preferred contact',d.method+' · '+d.time]].forEach(function(r){var x=document.createElement('div');x.innerHTML='<b></b><span></span>';x.firstChild.textContent=r[0];x.lastChild.textContent=r[1];document.getElementById('recap').appendChild(x)});
 t.scrollIntoView({behavior:'smooth',block:'center'});t.focus()}
document.getElementById('again').addEventListener('click',function(){f.reset();cnt();document.getElementById('thanks').hidden=true;f.hidden=false;$('.status').hidden=true;f.elements.name.focus()});
f.addEventListener('submit',function(e){
 e.preventDefault();
 var bad=Object.keys(rules).filter(function(n){return !check(n)});
 if(bad.length){f.elements[bad[0]].focus();status('Please fix the highlighted fields and try again.',true);return}
 if(f.elements.website.value)return; /* honeypot */
 var d={name:f.elements.name.value.trim(),company:f.elements.company.value.trim(),email:f.elements.email.value.trim(),phone:f.elements.phone.value.trim(),service:sv.value,method:f.elements.method.value,time:f.elements.time.value,objective:ob.value.trim()};
 var btn=$('button[type=submit]');
 if(C.formEndpoint){
  btn.disabled=true;btn.textContent='Sending…';
  fetch(C.formEndpoint,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(Object.assign({_subject:'Website enquiry: '+d.service},d))})
  .then(function(r){if(!r.ok)throw 0;done(d,false)})
  .catch(function(){status('Your enquiry could not be sent. Check your connection and try again, or email us at '+(C.email||'our contact address')+'.',true)})
  .then(function(){btn.disabled=false;btn.textContent='Send enquiry'})
 }else{
  var body='Name: '+d.name+'\nOrganisation: '+d.company+'\nEmail: '+d.email+'\nPhone: '+d.phone+'\nArea of interest: '+d.service+'\nPreferred contact: '+d.method+' ('+d.time+')\n\nObjective:\n'+d.objective;
  location.href='mailto:'+(C.email||'hello@YOUR-DOMAIN')+'?subject='+encodeURIComponent('Website enquiry: '+d.service)+'&body='+encodeURIComponent(body);
  done(d,true)}
});
})();
