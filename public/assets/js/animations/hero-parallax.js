/* CodeKat · assets/js/animations/hero-parallax.js — extraído de index.html */
    // parallax suave del fondo del hero (vanilla + rAF)
    (function(){
      var hero=document.getElementById('inicio');
      if(!hero){return;}
      if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){return;}
      var layers=hero.querySelectorAll('[data-hx]');
      if(!layers.length){return;}
      var ghost=document.getElementById('hxGhost');
      var intro=document.getElementById('heroIntro');
      var code=document.getElementById('hxCode');
      var kat=document.getElementById('hxKat');
      var frozenPin=0;
      var baseSc=0,dirUp=false,ghostTgt=1,ghostOp=1,prevQ=0;
      var hxEls=intro?Array.prototype.slice.call(intro.querySelectorAll('h1,p,a')):[];
      hxEls.forEach(function(el){el._op=1;el._tgt=1;});
      var hxRaf=0;
      function hxSettle(){
        hxRaf=0;
        var more=false;
        for(var s=0;s<hxEls.length;s++){
          var el=hxEls[s];
          var d=el._tgt-el._op;
          if(Math.abs(d)>0.004){el._op=el._op+d*0.12;more=true;}
          else{el._op=el._tgt;}
          el.style.opacity=el._op.toFixed(2);
          el.style.filter=el._op>0.97?'':'blur('+((1-el._op)*3).toFixed(1)+'px)';
        }
        var gd=ghostTgt-ghostOp;
        if(Math.abs(gd)>0.004){ghostOp=ghostOp+gd*0.06;more=true;}
        else{ghostOp=ghostTgt;}
        if(ghost){
          ghost.style.opacity=ghostOp.toFixed(2);
          ghost.style.filter=ghostOp>0.97?'':'blur('+((1-ghostOp)*2).toFixed(1)+'px)';
        }
        if(more){hxRaf=requestAnimationFrame(hxSettle);}
      }
      var queued=false;
      function hxUpdate(){
        queued=false;
        var r=hero.getBoundingClientRect();
        if(r.bottom<0||r.top>window.innerHeight){return;}
        var p=Math.min(1,Math.max(0,-r.top/((r.height)||1)));
        for(var i=0;i<layers.length;i++){
          var s=parseFloat(layers[i].getAttribute('data-hx'))||0;
          layers[i].style.transform='translate3d(0,'+(p*s*680).toFixed(1)+'px,0)';
        }
        // Bajando: CODEKAT fijo y visible, los textos/botones ceden. Subiendo: se esconde CODEKAT
        var sc=Math.max(0,-r.top);
        // Arriba del todo: reseteo total, pero el CODEKAT reaparece con fundido suave
        if(sc<=2){
          frozenPin=0;baseSc=0;dirUp=false;ghostTgt=1;
          if(ghost){ghost.style.transform='';}
          if(code){code.style.transform='';code.style.opacity='';}
          if(kat){kat.style.transform='';kat.style.opacity='';}
          for(var z=0;z<hxEls.length;z++){hxEls[z]._op=1;hxEls[z]._tgt=1;hxEls[z].style.opacity='';hxEls[z].style.filter='';}
          if(!hxRaf){hxRaf=requestAnimationFrame(hxSettle);}
        }
        var vh=window.innerHeight;
        if(Math.abs(sc-baseSc)>12){dirUp=sc<baseSc;baseSc=sc;}
        ghostTgt=(sc<=2||!dirUp)?1:0;
        var pinMax=Math.max(0,r.height-vh+300);
        var pin=Math.min(sc*1.03,pinMax);
        var maxB=-Infinity;
        var gr=null;
        if(ghost){
          ghost.style.transform='translate3d(0,'+pin.toFixed(1)+'px,0)';
          gr=ghost.getBoundingClientRect();
        }
        if(gr){
          for(var k=0;k<hxEls.length;k++){
            var er=hxEls[k].getBoundingClientRect();
            if(er.bottom>maxB){maxB=er.bottom;}
            var hit=(sc>40&&ghostOp>0.5&&er.top<gr.bottom+6&&er.bottom>gr.top-6&&er.left<gr.right&&er.right>gr.left);
            hxEls[k]._tgt=hit?0.04:1;
          }
          if(!hxRaf){hxRaf=requestAnimationFrame(hxSettle);}
        }
        // split en el mismo punto: pasado el último botón, quieto y en horizontal
        var q=0;
        if(gr&&maxB>-Infinity){q=Math.min(1,Math.max(0,((gr.top-6)-maxB)/(vh*0.28)));}
        if(q<=0){frozenPin=pin;}
        if(ghost){ghost.style.transform='translate3d(0,'+frozenPin.toFixed(1)+'px,0)';}
        var dx=Math.min(320,window.innerWidth*0.32)*q;
        if(code){code.style.transform='translate3d('+(-dx).toFixed(1)+'px,0,0)';code.style.opacity=(1-q).toFixed(2);}
        if(kat){kat.style.transform='translate3d('+(dx).toFixed(1)+'px,0,0)';kat.style.opacity=(1-q).toFixed(2);}
        if(q>=1&&prevQ<1){try{window.dispatchEvent(new CustomEvent('hx-split'));}catch(e){}}
        prevQ=q;
      }
      window.addEventListener('scroll',function(){if(!queued){queued=true;requestAnimationFrame(hxUpdate);}},{passive:true});
    })();
