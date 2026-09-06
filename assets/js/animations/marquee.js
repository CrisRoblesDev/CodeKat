/* CodeKat · assets/js/animations/marquee.js — extraído de index.html */
    // (codigo del catalogo anterior eliminado; ver seccion cotizacion)


    // IntersectionObserver to pause offscreen animations
    try{
      var io2=new IntersectionObserver(function(entries){ entries.forEach(function(e){ var tr=e.target.querySelector('.clients-track,.marquee-track'); if(tr) tr.style.animationPlayState = e.isIntersecting ? '' : 'paused';});},{threshold:0.05});
      var cs=document.querySelector('.clients-section'); if(cs) io2.observe(cs);
      var ms=document.querySelector('.footer-marquee'); if(ms) io2.observe(ms);
    }catch(e){}
    // clients marquee drag
    (function(){
      var marq=document.getElementById('clientsMarquee'); if(!marq) return;
      var down=false,startX=0,sl=0;
      marq.addEventListener('mousedown',function(e){down=true;marq.classList.add('dragging');startX=e.pageX;sl=marq.scrollLeft;});
      window.addEventListener('mouseup',function(){down=false;marq.classList.remove('dragging');});
      marq.addEventListener('mousemove',function(e){if(!down)return;e.preventDefault();marq.scrollLeft=sl-(e.pageX-startX);});
      marq.addEventListener('touchstart',function(e){startX=e.touches[0].pageX;sl=marq.scrollLeft;},{passive:true});
      marq.addEventListener('touchmove',function(e){marq.scrollLeft=sl-(e.touches[0].pageX-startX);},{passive:true});
    })();
