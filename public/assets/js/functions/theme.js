/* CodeKat · assets/js/functions/theme.js — extraído de index.html */
(function(){
'use strict';
    var root=document.documentElement;
    var themeIconMini=document.getElementById('themeIconMini');
    var themeBtns=document.querySelectorAll('.theme-btn');
    var themeMini=document.getElementById('themeToggleMini');
    function setTheme(t){
      if(t==='light'){root.setAttribute('data-theme','light');themeIconMini.className='fa-solid fa-sun';}
      else{root.removeAttribute('data-theme');themeIconMini.className='fa-solid fa-moon';}
      themeBtns.forEach(function(b){b.classList.toggle('active',b.getAttribute('data-theme-set')===t);});
      try{localStorage.setItem('codekat-theme',t);}catch(e){}
    }
    var savedTheme='dark'; try{savedTheme=localStorage.getItem('codekat-theme')||'dark';}catch(e){}
    setTheme(savedTheme);
    themeBtns.forEach(function(b){b.addEventListener('click',function(){setTheme(b.getAttribute('data-theme-set'));});});
    if(themeMini){themeMini.addEventListener('click',function(){setTheme(root.getAttribute('data-theme')==='light'?'dark':'light');});}
})();
