(function(){
var c=document.getElementById('sea'),x=c.getContext('2d'),W,H,D,t0=performance.now();
var still=matchMedia('(prefers-reduced-motion:reduce)').matches;
function fit(){D=Math.min(window.devicePixelRatio||1,2);W=c.clientWidth;H=c.clientHeight;c.width=W*D;c.height=H*D;x.setTransform(D,0,0,D,0,0)}
fit();addEventListener('resize',fit);
var L=[
{y:.34,c:'46,170,148',a:.15,k:[.0042,.0095,.016],s:[.35,.6,.9],h:26,p:0,f:.07},
{y:.46,c:'10,107,95',a:.14,k:[.0036,.0088,.015],s:[-.3,.55,-.8],h:30,p:1.7,f:.05},
{y:.58,c:'46,170,148',a:.19,k:[.0048,.0105,.019],s:[.45,-.7,1.0],h:34,p:3.1,f:.09},
{y:.70,c:'169,133,79',a:.15,k:[.0040,.0092,.017],s:[-.4,.65,-.95],h:36,p:4.4,f:.06},
{y:.82,c:'10,107,95',a:.24,k:[.0052,.0110,.021],s:[.5,-.75,1.1],h:40,p:5.6,f:.08},
{y:.92,c:'255,255,255',a:.34,k:[.0058,.0125,.024],s:[-.55,.8,-1.2],h:30,p:2.4,f:.11}];
/* ---- interaction state ---- */
var rip=[],vel=0,drift=0,lastY=scrollY,lastMove=0,down=false;
function addRip(px,py,a){rip.push({x:px,y:py,t:performance.now(),a:a});if(rip.length>18)rip.shift()}
if(!still){
 addEventListener('pointerdown',function(e){down=true;addRip(e.clientX,e.clientY,40)},{passive:true});
 addEventListener('pointerup',function(){down=false},{passive:true});
 addEventListener('pointercancel',function(){down=false},{passive:true});
 addEventListener('pointermove',function(e){var n=performance.now();if(n-lastMove<(down||e.pointerType==='touch'?70:140))return;lastMove=n;addRip(e.clientX,e.clientY,down||e.pointerType==='touch'?26:14)},{passive:true});
 addEventListener('scroll',function(){var d=scrollY-lastY;lastY=scrollY;vel+=d;drift+=d*.012;
  var n=performance.now();if(Math.abs(d)>6&&n-lastMove>120){lastMove=n;addRip(Math.random()*W,H*(d>0?.9:.3),Math.min(46,10+Math.abs(d)*.6))}},{passive:true});
}
function draw(now){
var t=(now-t0)/1000;x.clearRect(0,0,W,H);
vel*=.94;var surge=Math.min(1.6,Math.abs(vel)*.018);
var big=Math.max(0,Math.sin(t*.09)*Math.sin(t*.037+1.3));
var calm=.55+.45*Math.sin(t*.05+.8);
for(var i=0;i<rip.length;){if((now-rip[i].t)/1000>3.6)rip.splice(i,1);else i++}
for(var i=0;i<L.length;i++){var l=L[i];
 var swell=.45+.55*calm*(.5+.5*Math.sin(t*l.f+l.p))+1.25*big*(.6+.4*Math.sin(t*.4+l.p))+surge;
 var tide=Math.sin(t*.13+l.p)*H*.018+big*Math.sin(t*.5+l.p)*H*.02;
 var base=H*l.y+tide,m=l.h*swell,ys=[],xs=[];
 for(var px=0;px<=W+8;px+=8){
  var ph=drift*(1+i*.12);
  var y=base+Math.sin(px*l.k[0]+t*l.s[0]+l.p+ph)*m+Math.sin(px*l.k[1]+t*l.s[1]+l.p*2+ph)*m*.45+Math.sin(px*l.k[2]+t*l.s[2]+l.p*3+ph)*m*.18;
  for(var r=0;r<rip.length;r++){var R=rip[r],age=(now-R.t)/1000,dx=Math.abs(px-R.x),dy=(R.y-base)/(H*.22);
   y+=Math.sin(dx*.032-age*7.5)*Math.exp(-dx/280)*Math.exp(-age*1.25)*Math.exp(-dy*dy)*R.a}
  xs.push(px);ys.push(y)}
 x.beginPath();x.moveTo(0,H);
 for(var j=0;j<xs.length;j++)x.lineTo(xs[j],ys[j]);
 x.lineTo(W+8,H);x.closePath();
 var g=x.createLinearGradient(0,base-l.h*2,0,H);
 g.addColorStop(0,'rgba('+l.c+','+(l.a*1.5)+')');g.addColorStop(1,'rgba('+l.c+','+(l.a*.7)+')');
 x.fillStyle=g;x.fill();
 x.lineWidth=1.5;x.strokeStyle='rgba(255,255,255,'+Math.min(.75,.28+.25*big+surge*.2)+')';
 x.beginPath();for(var j=0;j<xs.length;j++)j?x.lineTo(xs[j],ys[j]):x.moveTo(xs[j],ys[j]);x.stroke()}
if(!still)requestAnimationFrame(draw)}
requestAnimationFrame(draw);
})();
