/* CodeKat · assets/js/functions/widgets.js — extraído de index.html */
(function(){
'use strict';
    var waMessages=['Asesórate con nosotros','¿Tienes una idea? Conversemos','Cotiza sin compromiso','Tu web a un mensaje de distancia'];
    var waMsgIndex=0;
    function waShowCurrent(){
      waTooltip.textContent=waMessages[waMsgIndex];
      waFloat.classList.add('show-tip');
      setTimeout(function(){
        waFloat.classList.remove('show-tip');
        waMsgIndex=(waMsgIndex+1)%waMessages.length;
      },3500);
    }
    setTimeout(function(){waShowCurrent();setInterval(waShowCurrent,9000);},3000);

    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){if(en.isIntersecting){en.target.classList.add('visible');io.unobserve(en.target);}});
    },{threshold:0.12,rootMargin:'0px 0px -60px 0px'});
    document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
})();
