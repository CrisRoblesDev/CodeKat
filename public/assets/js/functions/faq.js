/* CodeKat · assets/js/functions/faq.js — extraído de index.html */
    // FAQ accordion
    (function(){
      var items=document.querySelectorAll('.faq-q');
      items.forEach(function(q){
        function toggle(){
          var item=q.parentElement;
          var isOpen=item.classList.contains('open');
          document.querySelectorAll('.faq-item.open').forEach(function(openItem){
            openItem.classList.remove('open');
            openItem.querySelector('.faq-q').setAttribute('aria-expanded','false');
          });
          if(!isOpen){
            item.classList.add('open');
            q.setAttribute('aria-expanded','true');
          }
        }
        q.addEventListener('click',toggle);
        q.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle();}});
      });
    })();
