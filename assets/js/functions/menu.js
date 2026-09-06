/* CodeKat · assets/js/functions/menu.js — extraído de index.html */
(function(){
'use strict';
    var navbar=document.getElementById('navbar');
    var scrollProgress=document.getElementById('scrollProgress');
    var backToTop=document.getElementById('backToTop');
    var stStepperEl=document.getElementById('stStepper');
    var waFloat=document.getElementById('waFloat');
    var waTooltip=document.getElementById('waTooltip');
    var burger=document.getElementById('burger');
    var navMenu=document.getElementById('navMenu');
    var menuBack=document.getElementById('menuBack');
    var menuLinks=navMenu.querySelectorAll('.menu-link');
    var sections=document.querySelectorAll('main section[id]');

     var waSections={servicios:true,cotizacion:true,faq:true};

    /* ===== MENÚ ===== */
    function isMenuOpen(){return navMenu.classList.contains('open');}
    function openMenu(){navMenu.classList.add('open');burger.classList.add('active');burger.setAttribute('aria-expanded','true');navMenu.setAttribute('aria-hidden','false');document.body.classList.add('menu-open');}
    function closeMenu(){navMenu.classList.remove('open');burger.classList.remove('active');burger.setAttribute('aria-expanded','false');navMenu.setAttribute('aria-hidden','true');document.body.classList.remove('menu-open');}
    burger.addEventListener('click',function(e){e.stopPropagation();isMenuOpen()?closeMenu():openMenu();});
    if(menuBack){menuBack.addEventListener('click',closeMenu);}
    /* CORRECCIÓN: solo interceptar anclas (#...); dejar navegar a cotizador.html normalmente */
    menuLinks.forEach(function(l){
      l.addEventListener('click',function(e){
        var href=l.getAttribute('href');
        if(!href || href.charAt(0)!=='#'){
          closeMenu();
          return;
        }
        e.preventDefault();
        var t=document.querySelector(href);
        closeMenu();
        if(t){setTimeout(function(){t.scrollIntoView({behavior:'smooth',block:'start'});},300);}
      });
    });
    document.addEventListener('click',function(e){
      if(!isMenuOpen())return;
      if(!navMenu.contains(e.target)&&!burger.contains(e.target)){closeMenu();}
    });

    function setActive(id){
      menuLinks.forEach(function(l){l.classList.toggle('active',l.getAttribute('href')==='#'+id);});
    }
    function getCurrentSection(){
      var c='inicio';
      sections.forEach(function(s){var top=s.offsetTop-160;if(window.scrollY>=top){c=s.id;}});
      return c;
    }
    var lastY=0,ticking=false,lastSection='inicio';
    function onFrame(){
      var y=window.scrollY;
      navbar.classList.toggle('scrolled',y>20);
      var max=document.documentElement.scrollHeight-window.innerHeight;
      scrollProgress.style.width=(max>0?(y/max)*100:0)+'%';
      var cur=getCurrentSection();
      if(cur!==lastSection){lastSection=cur;setActive(cur);}
      var waVisible=!!waSections[cur];
      waFloat.classList.toggle('visible',waVisible);
      var inSteps=false;
      if(stStepperEl){var sr=stStepperEl.getBoundingClientRect();inSteps=sr.top<window.innerHeight*0.7&&sr.bottom>window.innerHeight*0.3;}
      backToTop.classList.toggle('visible',(!waVisible && y>500 && !inSteps));
      lastY=y;ticking=false;
    }
    window.addEventListener('scroll',function(){if(!ticking){requestAnimationFrame(onFrame);ticking=true;}},{passive:true});
    onFrame();
    backToTop.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});
})();
