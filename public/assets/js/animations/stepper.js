/* CodeKat · assets/js/animations/stepper.js — extraído de index.html */
    // stepper "Cómo trabajamos": autoplay al verse + transiciones distintas
    (function(){
      var stepper=document.getElementById('stStepper');
      if(!stepper){return;}
      var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var cards=Array.prototype.slice.call(stepper.querySelectorAll('.st-card'));
      var pills=Array.prototype.slice.call(stepper.querySelectorAll('.st-pill'));
      if(!cards.length||!pills.length){return;}
      var cur=0;
      var stage=document.getElementById('stStage');
      // todas las cards a la altura de la más grande: nada se mueve
      function fitStage(){
        if(!stage){return;}
        var h=0,i;
        for(i=0;i<cards.length;i++){cards[i].classList.add('active');h=Math.max(h,cards[i].offsetHeight);}
        for(i=0;i<cards.length;i++){if(i!==cur){cards[i].classList.remove('active');}}
        stage.style.minHeight=h+'px';
      }
      fitStage();
      window.addEventListener('load',fitStage);
      window.addEventListener('resize',fitStage);
      if(document.fonts&&document.fonts.ready){document.fonts.ready.then(function(){fitStage();});}
      function show(n){
        n=(n+cards.length)%cards.length;
        if(n===cur){return;}
        var old=cards[cur];
        old.classList.remove('active');
        old.classList.add('out-'+cur);
        setTimeout(function(){old.classList.remove('out-0','out-1','out-2');},480);
        cur=n;
        var nw=cards[cur];
        nw.classList.remove('in');void nw.offsetWidth;nw.classList.add('active','in');
        pills.forEach(function(p,j){p.classList.toggle('on',j===cur);p.setAttribute('aria-selected',j===cur?'true':'false');});
        var pr=stepper.querySelector('.st-pills'),tg=pills[cur];
        if(pr&&tg){try{pr.scrollTo({left:tg.offsetLeft-pr.clientWidth/2+tg.clientWidth/2,behavior:'smooth'});}catch(e){pr.scrollLeft=tg.offsetLeft;}}
        var cc=document.getElementById('stCur');
        if(cc){var s='0'+(cur+1);cc.textContent=s.slice(-2);}
      }
      pills.forEach(function(p,j){p.addEventListener('click',function(){show(j);});});
      var pv=document.getElementById('stPrev'),nx=document.getElementById('stNext');
      if(pv){pv.addEventListener('click',function(){show(cur-1);});}
      if(nx){nx.addEventListener('click',function(){show(cur+1);});}
      // avance 100% manual: el usuario elige con pills o flechas
      // encuadre nativo por CSS (scroll-snap): fluido en móvil y desktop, sin pelear con el scroll
    })();
