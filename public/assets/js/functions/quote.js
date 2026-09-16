/* CodeKat · assets/js/functions/quote.js — extraído de index.html */
(function(){
'use strict';
    // Cotizador: 3 preguntas -> total + recomendación + WhatsApp
    var Q=[
      {key:'dominio',q:'¿Posees dominio para tu página web?',s:'El dominio es la dirección de tu web (ej: minegocio.cl)',opts:[
        {v:'no',t:'No tengo dominio',d:'Lo registramos por ti · +$13.000 por 1 año incluido',p:13000,icon:'fa-solid fa-globe'},
        {v:'si',t:'Sí, ya tengo',d:'Lo conectamos sin costo extra',p:0,icon:'fa-solid fa-circle-check'}]},
      {key:'auto',q:'¿Quieres autogestionar tu página?',s:'Cambiar textos e imágenes cuando quieras, sin depender de nadie',opts:[
        {v:'si',t:'Sí, quiero autogestionarla',d:'Panel simple para ti · +$10.000',p:10000,icon:'fa-solid fa-pen-to-square'},
        {v:'no',t:'No, prefiero que la gestionen',d:'Nosotros nos encargamos de todo',p:0,icon:'fa-solid fa-user-gear'}]},
      {key:'mail',q:'¿Necesitas un correo personalizado?',s:'Ej: contacto@tunegocio.cl · $9.000 c/u por año',opts:[
        {v:'si',t:'Sí, quiero uno',d:'+$9.000 por año',p:9000,icon:'fa-solid fa-envelope'},
        {v:'no',t:'No necesito',d:'Seguimos sin problema',p:0,icon:'fa-solid fa-minus'}]}
    ];
    var card=document.getElementById('quoteCard');
    if(!card){return;}
    var stepsEl=document.getElementById('quoteSteps');
    var stepEl=document.getElementById('quoteStep');
    var barEl=document.getElementById('quoteBar');
    var totalEl=document.getElementById('quoteTotal');
    var listEl=document.getElementById('quoteList');
    var recoEl=document.getElementById('quoteReco');
    var waEl=document.getElementById('quoteWa');
    var restartEl=document.getElementById('quoteRestart');
    var sumBtn=document.getElementById('quoteSum');
    var detailEl=document.getElementById('quoteDetail');
    function setDetail(open){
      if(!detailEl||!sumBtn){return;}
      detailEl.hidden=!open;
      sumBtn.setAttribute('aria-expanded',open?'true':'false');
      if(open){detailEl.classList.remove('show');void detailEl.offsetWidth;detailEl.classList.add('show');}
    }
    if(sumBtn){sumBtn.addEventListener('click',function(){setDetail(detailEl.hidden);});}
    var modal=document.getElementById('quoteModal');
    var openBtn=document.getElementById('quoteOpen');
    var closeBtn=document.getElementById('quoteClose');
    var step=0,ans={},qty=1;
    function openModal(){modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';['waFloat','backToTop'].forEach(function(id){var el=document.getElementById(id);if(el){el.style.visibility='hidden';}});}
    function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';['waFloat','backToTop'].forEach(function(id){var el=document.getElementById(id);if(el){el.style.visibility='';}});}
    if(openBtn){openBtn.addEventListener('click',openModal);}
    if(closeBtn){closeBtn.addEventListener('click',closeModal);}
    modal.addEventListener('click',function(e){if(e.target===modal){closeModal();}});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&modal.classList.contains('open')){closeModal();}});
    function fmt(n){return '$'+n.toLocaleString('es-CL');}
    function build(){
      var html='';
      Q.forEach(function(q,i){
        html+='<div class="quote-pane'+(i===0?' on':'')+'" data-pane="'+i+'" role="group" aria-label="'+q.q+'">';
        html+='<div class="quote-q">'+q.q+'</div>';
        if(q.s){html+='<div class="quote-sub">'+q.s+'</div>';}
        html+='<div class="quote-opts">';
        q.opts.forEach(function(o){
          html+='<button type="button" class="quote-opt" data-q="'+q.key+'" data-v="'+o.v+'"><span class="quote-opt-ico"><i class="'+o.icon+'"></i></span><span class="quote-opt-txt"><b>'+o.t+'</b><small>'+o.d+'</small></span><span class="quote-price">'+(o.p>0?'+'+fmt(o.p):'Incluido')+'</span></button>';
        });
        html+='</div>';
        if(i>0){html+='<button type="button" class="quote-back" data-back="'+i+'"><i class="fa-solid fa-arrow-left"></i> Atrás</button>';}
        if(q.key==='mail'){html+='<div class="quote-qty off" id="quoteQtyRow"><span>¿Cuántos correos necesitas?</span><span class="quote-qty-ctl"><button type="button" id="quoteDec" aria-label="Menos correos">−</button><b id="quoteQty">1</b><button type="button" id="quoteInc" aria-label="Más correos">+</button></span><span class="quote-qty-price" id="quoteQtyPrice">+$9.000/año</span></div>';}
        html+='</div>';
      });
      // pane resultado
      html+='<div class="quote-pane" data-pane="3" role="group" aria-label="Tu resultado"><div class="quote-q">¡Listo! Esta es tu cotización 🎉</div><div class="quote-sub">Revisa el resumen y envíanosla por WhatsApp para partir.</div><button type="button" class="quote-back" data-back="3"><i class="fa-solid fa-arrow-left"></i> Cambiar respuestas</button></div>';
      stepsEl.innerHTML=html;
      stepsEl.querySelectorAll('.quote-opt').forEach(function(b){
        b.addEventListener('click',function(){choose(b.getAttribute('data-q'),b.getAttribute('data-v'),b);});
      });
      stepsEl.querySelectorAll('.quote-back').forEach(function(b){
        b.addEventListener('click',function(){goStep(parseInt(b.getAttribute('data-back'),10)-1);});
      });
      var dec=document.getElementById('quoteDec'),inc=document.getElementById('quoteInc');
      if(dec){dec.addEventListener('click',function(){if(qty>1){qty--;syncQty();}});}
      if(inc){inc.addEventListener('click',function(){if(qty<10){qty++;syncQty();}});}
    }
    function syncQty(){
      var qn=document.getElementById('quoteQty'),qp=document.getElementById('quoteQtyPrice');
      if(qn){qn.textContent=qty;}
      if(qp){qp.textContent='+'+fmt(9000*qty)+'/año';}
      update();
    }
    function goStep(n){
      step=n;
      stepsEl.querySelectorAll('.quote-pane').forEach(function(p){
        var on=parseInt(p.getAttribute('data-pane'),10)===step;
        p.classList.remove('on');
        if(on){void p.offsetWidth;p.classList.add('on');}
      });
      stepEl.textContent=step<3?('Pregunta '+(step+1)+' de 3'):'Tu resultado';
      barEl.style.width=(Math.min(step,3)/3*100)+'%';
    }
    function choose(key,val,btn){
      ans[key]=val;
      var qr=document.getElementById('quoteQtyRow');
      if(qr){qr.classList.toggle('off',ans.mail!=='si');}
      syncQty();
      var pane=btn.closest('.quote-pane');
      pane.querySelectorAll('.quote-opt').forEach(function(o){o.classList.remove('sel');});
      btn.classList.add('sel');
      update();
      setTimeout(function(){goStep(Math.min(step+1,3));},320);
    }
    function update(){
      var BASE=7000;
      var total=BASE,items=[['Configuración y despliegue',BASE,'quote-base']],custom=[];
      if(ans.dominio==='no'){total+=13000;items.push(['Dominio + hosting (1 año)',13000,'']);}
      if(ans.auto==='si'){total+=10000;items.push(['Panel autogestionable',10000,'']);custom.push('panel autogestionable');}
      if(ans.mail==='si'){var mp=9000*qty;total+=mp;items.push(['Correo personalizado × '+qty+' (1 año)',mp,'']);custom.push('correo personalizado × '+qty);}
      totalEl.textContent=fmt(total);
      listEl.innerHTML=items.map(function(it){return '<li class="'+it[2]+'">'+(it[2]==='quote-base'?'<i class="fa-solid fa-screwdriver-wrench"></i>':'')+'<b>'+it[0]+'</b><span>'+fmt(it[1])+'</span></li>';}).join('');
      var done=(ans.dominio!==undefined&&ans.auto!==undefined&&ans.mail!==undefined);
      if(done&&ans.mail==='no'){
        listEl.innerHTML+='<li class="quote-note"><i class="fa-solid fa-envelope"></i><span>Usa tu correo personal gratis (Gmail/Outlook)</span></li>';
      }
      if(done){
        setDetail(true);
        var reco;
        if(ans.auto==='no'&&ans.mail==='no'){
          reco='<b>🎯 Tu mejor opción: una Landing Page.</b><br>Rápida, directa y sin costos de gestión. Ideal para captar clientes desde el día uno.';
        }else{
          reco='<b>✨ Servicios personalizados para ti.</b><br>Incluyen: '+custom.join(' + ')+'. Diseñados a tu medida.';
        }
        recoEl.innerHTML=reco;recoEl.hidden=false;
        var L={dominio:{si:'Sí tengo',no:'No tengo (+$13.000)'},auto:{si:'Sí (+$10.000)',no:'No'},mail:{si:'Sí ('+qty+' x $9.000)',no:'No, uso personal'}};
        var msg='Hola CodeKat! Quiero cotizar mi web:\n- Configuracion y despliegue (+$7.000)\n- Dominio: '+L.dominio[ans.dominio]+'\n- Autogestion: '+L.auto[ans.auto]+'\n- Correo: '+L.mail[ans.mail]+'\nTotal estimado: '+fmt(total);
        waEl.href='https://wa.me/56933465843?text='+encodeURIComponent(msg);
        waEl.classList.remove('disabled');
      }else{
        recoEl.hidden=true;recoEl.innerHTML='';
        waEl.classList.add('disabled');waEl.href='#cotizacion';
      }
    }
    function restart(){ans={};qty=1;setDetail(false);syncQty();goStep(0);}
    restartEl.addEventListener('click',restart);
    build();update();goStep(0);
})();
