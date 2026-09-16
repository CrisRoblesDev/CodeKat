/* CodeKat · assets/js/animations/loader.js — extraído de index.html */
    // page loader 3.5s
    (function(){
      var pl=document.getElementById('pageLoader');
      if(pl){
        var min=3400;
        var start=Date.now();
        window.addEventListener('load',function(){
          var elapsed=Date.now()-start;
          var wait=Math.max(0,min-elapsed);
          setTimeout(function(){pl.classList.add('hidden');pl.setAttribute('aria-hidden','true');document.body.style.overflow='';}, wait);
        });
        document.body.style.overflow='hidden';
        setTimeout(function(){if(pl && !pl.classList.contains('hidden')){pl.classList.add('hidden');pl.setAttribute('aria-hidden','true');document.body.style.overflow='';}}, min+800);
      }
    })();
