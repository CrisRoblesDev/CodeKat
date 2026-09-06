/* CodeKat · assets/js/functions/reveal.js — reveal on scroll (compartido) */
(function(){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}});},{threshold:0.12,rootMargin:'0px 0px -60px 0px'});document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});})();
