/* CodeKat · assets/js/animations/loader.js — extraído de index.html */
    // page loader rápido: muestra máx ~700ms y nunca bloquea el scroll más de lo necesario
    (function(){
      var pl=document.getElementById('pageLoader');
      if(!pl){return;}
      var min=700;
      var start=Date.now();
      var done=false;
      function hide(){
        if(done){return;}done=true;
        pl.classList.add('hidden');pl.setAttribute('aria-hidden','true');
        document.body.style.overflow='';
      }
      document.body.style.overflow='hidden';
      if(document.readyState==='complete'){setTimeout(hide,Math.max(0,min-(Date.now()-start)));}
      else{window.addEventListener('load',function(){setTimeout(hide,Math.max(0,min-(Date.now()-start)));});}
      setTimeout(hide,min+900);
    })();
