/* CodeKat · assets/js/animations/magnetic.js — extraído de index.html */
(function(){
'use strict';
    // botones magnéticos del footer (solo puntero fino, sin reduced-motion)
    try{
      if(window.matchMedia('(pointer:fine)').matches&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
        document.querySelectorAll('.footer-actions .btn').forEach(function(el){
          var raf=0;
          el.addEventListener('mousemove',function(e){
            var r=el.getBoundingClientRect();
            var x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;
            if(raf){cancelAnimationFrame(raf);}
            raf=requestAnimationFrame(function(){
              el.style.transition='transform .12s ease-out';
              el.style.transform='translate('+(x*0.18).toFixed(1)+'px,'+(y*0.22).toFixed(1)+'px)';
            });
          });
          el.addEventListener('mouseleave',function(){
            if(raf){cancelAnimationFrame(raf);}
            el.style.transition='transform .7s cubic-bezier(0.175,0.885,0.32,1.275)';
            el.style.transform='';
          });
        });
      }
    }catch(e){}
})();
