/* CodeKat · assets/js/functions/cotizador-app.js — extraído de cotizador.html */
  (function(){
    'use strict';
    function el(id){return document.getElementById(id);}
    function on(id,ev,fn){var e=el(id);if(e)e.addEventListener(ev,fn);return e;}
    function safe(fn){try{fn();}catch(e){if(window.console&&console.warn)console.warn('[cotizador]',e);}}

    var STEPS=[
      {key:'negocio', label:'Negocio', icon:'fa-store'},
      {key:'cliente', label:'Cliente', icon:'fa-user'},
      {key:'items', label:'Ítems', icon:'fa-list-check'},
      {key:'detalles', label:'Detalles', icon:'fa-file-invoice'},
      {key:'diseno', label:'Diseño', icon:'fa-paintbrush'},
      {key:'preview', label:'Vista previa', icon:'fa-eye'},
      {key:'descarga', label:'Descarga', icon:'fa-download'}
    ];

    var DESIGNS=[
      {key:'moderno', name:'Moderno'},
      {key:'clasico', name:'Clásico'},
      {key:'minimal', name:'Minimalista'},
      {key:'corporativo', name:'Corporativo'},
      {key:'elegante', name:'Elegante'},
      {key:'creativo', name:'Creativo'},
      {key:'lateral', name:'Lateral'},
      {key:'doble', name:'Dos tonos'},
      {key:'cinta', name:'Cinta'},
      {key:'marco', name:'Marco'},
      {key:'banda', name:'Banda superior'},
      {key:'oscuro', name:'Oscuro'},
      {key:'factura', name:'Factura'},
      {key:'suave', name:'Degradé suave'},
      {key:'tarjeta', name:'Tarjeta'},
      {key:'linea', name:'Línea acento'}
    ];
    var PALETTES=[
      {key:'violet', name:'Violeta', primary:'#8B5CF6', secondary:'#C4B5FD', accent:'#7C3AED'},
      {key:'blue', name:'Azul', primary:'#2563EB', secondary:'#93C5FD', accent:'#1D4ED8'},
      {key:'navy', name:'Azul Marino', primary:'#1E3A8A', secondary:'#60A5FA', accent:'#1E40AF'},
      {key:'emerald', name:'Esmeralda', primary:'#059669', secondary:'#6EE7B7', accent:'#047857'},
      {key:'forest', name:'Bosque', primary:'#15803D', secondary:'#86EFAC', accent:'#166534'},
      {key:'orange', name:'Naranja', primary:'#EA580C', secondary:'#FDBA74', accent:'#C2410C'},
      {key:'coral', name:'Coral', primary:'#F43F5E', secondary:'#FDA4AF', accent:'#E11D48'},
      {key:'slate', name:'Gris', primary:'#475569', secondary:'#CBD5E1', accent:'#334155'},
      {key:'gold', name:'Dorado', primary:'#B45309', secondary:'#FCD34D', accent:'#92400E'},
      {key:'wine', name:'Vino', primary:'#9F1239', secondary:'#FDA4AF', accent:'#881337'},
      {key:'pink', name:'Rosa', primary:'#DB2777', secondary:'#F9A8D4', accent:'#BE185D'},
      {key:'teal', name:'Teal', primary:'#0D9488', secondary:'#5EEAD4', accent:'#0F766E'},
      {key:'terracota', name:'Terracota', primary:'#C2410C', secondary:'#FDBA74', accent:'#7C2D12'},
      {key:'oliva', name:'Oliva', primary:'#4D7C0F', secondary:'#BEF264', accent:'#365314'},
      {key:'cielo', name:'Cielo', primary:'#0284C7', secondary:'#BAE6FD', accent:'#075985'},
      {key:'carbon', name:'Carbón', primary:'#1F2937', secondary:'#9CA3AF', accent:'#F59E0B'}
    ];
    var TEXTURES=[
      {key:'lisa', name:'Lisa', icon:'fa-minus'},
      {key:'puntos', name:'Puntos', icon:'fa-braille'},
      {key:'lineas', name:'Líneas', icon:'fa-bars'},
      {key:'rejilla', name:'Rejilla', icon:'fa-border-all'}
    ];

    /* ═══════════════════════════════════════════════
       DEBOUNCE & requestIdleCallback — Performance
       ═══════════════════════════════════════════════ */
    function debounce(fn,delay){var t=null;return function(){var a=arguments,c=this;clearTimeout(t);t=setTimeout(function(){fn.apply(c,a);},delay);};}
    function rafOrIdle(fn){if(typeof requestIdleCallback==='function'){requestIdleCallback(fn,{timeout:2000});}else{requestAnimationFrame(fn);}}

    var renderPreviewPending=false;
    function scheduleRenderPreview(){
      if(renderPreviewPending)return;
      renderPreviewPending=true;
      rafOrIdle(function(){renderPreview();renderPreviewPending=false;});
    }
    function renderPreviewNow(){renderPreviewPending=false;renderPreview();}
    /* ═══════════════════════════════════════════════
       FIN PERFORMANCE
       ═══════════════════════════════════════════════ */

    var state={
      title:'Cotización',
      number:'COT-'+new Date().getFullYear()+'-'+String(Math.floor(Math.random()*900)+100),
      date:new Date().toISOString().slice(0,10),
      validDays:15,       currency:'$', notes:'', logo:null, design:'moderno', texture:'lisa',
      colors:{primary:'#8B5CF6',secondary:'#C4B5FD',accent:'#7C3AED'},
      sender:{name:'',tax:'',email:'',phone:'',web:''},
      client:{name:'',company:'',email:'',phone:''},
      items:[], discount:0, tax:0
    };
    var selectedPalette='violet';

    function fmt(n){return state.currency+' '+Math.round(n).toLocaleString('es-CL');}
    function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
    function setTxt(id,v){var e=el(id);if(e)e.textContent=v;}
    function totals(){
      var sub=0;state.items.forEach(function(it){sub+=it.qty*it.price;});
      var disc=sub*(state.discount/100);var taxable=sub-disc;var tax=taxable*(state.tax/100);
      return{sub:sub,disc:disc,tax:tax,total:taxable+tax};
    }
    function showToast(msg){var t=el('toast');el('toastMsg').textContent=msg;t.classList.add('show');clearTimeout(showToast._t);showToast._t=setTimeout(function(){t.classList.remove('show');},2200);}
    function findItem(id){for(var i=0;i<state.items.length;i++){if(state.items[i].id==id)return state.items[i];}return null;}
    function dateFmt(d){try{return new Date(d+'T00:00:00').toLocaleDateString('es-CL');}catch(e){return d;}}
     function getFileName(ext){
       var name=(el('fileName')?el('fileName').value.trim():'')||state.number;
       name=name.replace(/[\\/:*?"<>|]/g,'').trim();
       if(!name)name=state.number;
       return name+'-'+state.design+'.'+ext;
     }

    /* WIZARD NAV */
    var currentStep=0,navBtns=[];
    function buildNav(){
      var nav=el('wizardNav');if(!nav)return;nav.innerHTML='';navBtns=[];
      STEPS.forEach(function(s,i){
        var b=document.createElement('button');
        b.type='button';
        b.className='wtab'+(i===0?' active':'');b.setAttribute('role','tab');
        b.setAttribute('aria-selected',i===0?'true':'false');
        b.innerHTML='<span class="wtab-num">'+(i+1)+'</span><i class="fa-solid '+s.icon+'"></i><span>'+s.label+'</span>';
        b.addEventListener('click',function(){goToStep(i);});
        nav.appendChild(b);navBtns.push(b);
      });
    }
    /* Centra la pastilla activa SOLO dentro del carril, sin mover la página */
    function centerTab(){
      var nav=el('wizardNav'),b=navBtns[currentStep];
      if(!nav||!b||!b.offsetWidth)return;
      try{
        nav.scrollTo({left:b.offsetLeft-nav.clientWidth/2+b.offsetWidth/2,behavior:'smooth'});
      }catch(e){nav.scrollLeft=b.offsetLeft-nav.clientWidth/2+b.offsetWidth/2;}
    }
    /* Transición deslizante: la saliente se va a un lado y la entrante
       llega desde el otro (Siguiente: sale ← / entra → · Atrás: al revés) */
    var slideTimer=null;
    function goToStep(n){
      if(n<0||n>=STEPS.length)return;
      if(n===currentStep){updateFooter();return;}
      var dir=n>currentStep?'fwd':'back';
      var panels=document.querySelectorAll('.wpanel');
      var oldP=panels[currentStep],newP=panels[n];
      currentStep=n;
      try{if(slideTimer)clearTimeout(slideTimer);}catch(e){}
      panels.forEach(function(p){p.classList.remove('exit-left','exit-right','enter-right','enter-left');});
      if(oldP&&newP&&oldP!==newP){
        var enterCls=dir==='fwd'?'enter-right':'enter-left';
        var exitCls=dir==='fwd'?'exit-left':'exit-right';
        newP.classList.add(enterCls);
        void newP.offsetWidth;
        oldP.classList.remove('active');
        oldP.classList.add(exitCls);
        newP.classList.add('active');
        newP.classList.remove(enterCls);
        slideTimer=setTimeout(function(){
          if(oldP)oldP.classList.remove('exit-left','exit-right');
        },340);
      }else if(newP){
        panels.forEach(function(p){p.classList.remove('active');});
        newP.classList.add('active');
      }
      navBtns.forEach(function(b,i){b.classList.toggle('active',i===n);b.setAttribute('aria-selected',i===n?'true':'false');});
      centerTab();
      updateFooter();
      if(STEPS[n].key==='preview'){renderPreviewNow();}
      if(STEPS[n].key==='descarga'){renderTotals();}
      if(STEPS[n].key==='diseno'){renderDesignThumbs();}
      /* Sin scroll de página al cambiar de paso: la shell tiene altura fija
         por viewport y los paneles se deslizan sin mover window. */
    }
    function updateFooter(){
      setTxt('stepNow',currentStep+1);setTxt('stepTotal',STEPS.length);
      var bar=el('progressBar');if(bar)bar.style.width=((currentStep+1)/STEPS.length*100)+'%';
      var pv=el('prevBtn'),nx=el('nextBtn');
      if(pv)pv.disabled=currentStep===0;if(nx)nx.disabled=currentStep===STEPS.length-1;
    }

    /* CAMBIO 2: prevenir fuga del clic y retener foco en el botón */
    on('prevBtn','click',function(e){
      e.preventDefault();
      try{this.focus();}catch(_){}
      goToStep(currentStep-1);
    });
    on('nextBtn','click',function(e){
      e.preventDefault();
      try{this.focus();}catch(_){}
      goToStep(currentStep+1);
    });

    window.addEventListener('resize',function(){safe(centerTab);});

    /* ÍTEMS */
    var dragSrcId=null,allowDrag=false,editingItemId=null;
    document.addEventListener('mouseup',function(){allowDrag=false;});
    function reorderItems(fromId,toId){
      var fromIdx=-1,toIdx=-1;
      state.items.forEach(function(it,i){if(it.id==fromId)fromIdx=i;if(it.id==toId)toIdx=i;});
      if(fromIdx<0||toIdx<0||fromIdx===toIdx)return;
      var moved=state.items.splice(fromIdx,1)[0];
      state.items.splice(toIdx,0,moved);
      renderItems();renderPreview();renderTotals();
    }
    function moveItem(id,dir){
      var idx=-1;state.items.forEach(function(it,i){if(it.id==id)idx=i;});
      if(idx<0)return;var newIdx=idx+dir;
      if(newIdx<0||newIdx>=state.items.length)return;
      var tmp=state.items[idx];state.items[idx]=state.items[newIdx];state.items[newIdx]=tmp;
      renderItems();renderPreview();renderTotals();
    }
    function renderItems(){
      var wrap=el('itemsList');if(!wrap)return;wrap.innerHTML='';
      if(!state.items.length){
        wrap.innerHTML='<div class="items-empty"><i class="fa-solid fa-box-open"></i>Sin ítems todavía. Toca "Agregar ítem" para comenzar.</div>';
        return;
      }
      state.items.forEach(function(it,idx){
        var card=document.createElement('div');card.className='item-card';card.setAttribute('draggable','true');
        card.innerHTML=
          '<span class="drag-handle" title="Arrastrar"><i class="fa-solid fa-grip-vertical"></i></span>'+
          '<span class="item-index">'+(idx+1)+'</span>'+
          '<div class="item-info">'+
            '<div class="item-name">'+esc(it.name)+'</div>'+
            (it.description?'<div class="item-desc">'+esc(it.description)+'</div>':'')+
            '<div class="item-meta">'+it.qty+' × '+fmt(it.price)+' = <b>'+fmt(it.qty*it.price)+'</b></div>'+
          '</div>'+
          '<span class="item-side">'+
            '<span class="item-arrows">'+
              '<button class="mini-btn" data-id="'+it.id+'" data-dir="-1" aria-label="Subir"><i class="fa-solid fa-chevron-up"></i></button>'+
              '<button class="mini-btn" data-id="'+it.id+'" data-dir="1" aria-label="Bajar"><i class="fa-solid fa-chevron-down"></i></button>'+
            '</span>'+
            '<button class="icon-btn edit-btn" data-id="'+it.id+'" aria-label="Editar"><i class="fa-solid fa-pen"></i></button>'+
            '<button class="icon-btn del-btn" data-id="'+it.id+'" aria-label="Eliminar"><i class="fa-solid fa-trash"></i></button>'+
          '</span>';
        wrap.appendChild(card);
        var handle=card.querySelector('.drag-handle');
        handle.addEventListener('mousedown',function(){allowDrag=true;});
        card.addEventListener('dragstart',function(e){ if(!allowDrag){e.preventDefault();return;} dragSrcId=it.id; setTimeout(function(){card.classList.add('dragging');},0); e.dataTransfer.effectAllowed='move'; try{e.dataTransfer.setData('text/plain',it.id);}catch(err){} });
        card.addEventListener('dragover',function(e){e.preventDefault();});
        card.addEventListener('dragenter',function(){card.classList.add('drag-over');});
        card.addEventListener('dragleave',function(){card.classList.remove('drag-over');});
        card.addEventListener('drop',function(e){e.preventDefault();card.classList.remove('drag-over'); if(dragSrcId&&dragSrcId!==it.id)reorderItems(dragSrcId,it.id);});
        card.addEventListener('dragend',function(){card.classList.remove('dragging');dragSrcId=null;allowDrag=false;});
      });
      wrap.querySelectorAll('.mini-btn').forEach(function(btn){
        btn.addEventListener('click',function(){moveItem(btn.getAttribute('data-id'),parseInt(btn.getAttribute('data-dir'),10));});
      });
      wrap.querySelectorAll('.edit-btn').forEach(function(btn){
        btn.addEventListener('click',function(){openItemModal('edit',btn.getAttribute('data-id'));});
      });
      wrap.querySelectorAll('.del-btn').forEach(function(btn){
        btn.addEventListener('click',function(){
          var id=btn.getAttribute('data-id');
          state.items=state.items.filter(function(x){return x.id!=id;});
          renderItems();renderTotals();renderPreview();showToast('Ítem eliminado');
        });
      });
    }

    var itemBackdrop=el('itemBackdrop');
    function openItemModal(mode,id){
      if(!itemBackdrop)return;
      editingItemId=(mode==='edit')?id:null;
      var ttl=el('itemModalTitle');if(ttl)ttl.innerHTML=(mode==='edit')?'<i class="fa-solid fa-pen"></i> Editar ítem':'<i class="fa-solid fa-list-check"></i> Agregar ítem';
      var it=(mode==='edit')?findItem(id):null;
      var nm=el('itemModalName'),ds=el('itemModalDesc'),qy=el('itemModalQty'),pr=el('itemModalPrice');
      if(nm)nm.value=it?it.name:'';if(ds)ds.value=it?it.description:'';
      if(qy)qy.value=it?it.qty:1;if(pr)pr.value=it?it.price:0;
      itemBackdrop.classList.add('open');itemBackdrop.setAttribute('aria-hidden','false');
      document.body.classList.add('modal-open');lockScroll();
      focusNoScroll(el('itemModalName'));
      setTimeout(function(){safe(fitModalToKeyboard);},80);
    }
    function closeItemModal(){if(!itemBackdrop)return;itemBackdrop.classList.remove('open');itemBackdrop.setAttribute('aria-hidden','true');clearModalFit(itemBackdrop);unlockScroll();document.body.classList.remove('modal-open');editingItemId=null;}
    on('openItemModal','click',function(){openItemModal('add');});
    on('itemClose','click',closeItemModal);
    on('itemCancel','click',closeItemModal);
    if(itemBackdrop)itemBackdrop.addEventListener('click',function(e){if(e.target===itemBackdrop)closeItemModal();});
    on('itemSave','click',function(){
      var nameEl=el('itemModalName'),descEl=el('itemModalDesc'),qtyEl=el('itemModalQty'),priceEl=el('itemModalPrice');
      if(!nameEl)return;
      var name=nameEl.value.trim();
      if(!name){showToast('Escribe un concepto');return;}
      var desc=descEl?descEl.value.trim():'';
      var qty=qtyEl?(parseFloat(qtyEl.value)||1):1;
      var price=priceEl?(parseFloat(priceEl.value)||0):0;
      if(qty<0)qty=0;if(price<0)price=0;
      if(editingItemId){
        var it=findItem(editingItemId);
        if(it){it.name=name;it.description=desc;it.qty=qty;it.price=price;}
        showToast('Ítem actualizado');
      }else{
        state.items.push({id:Date.now()+''+Math.floor(Math.random()*999),name:name,description:desc,qty:qty,price:price});
        showToast('Ítem agregado');
      }
      renderItems();renderTotals();renderPreview();closeItemModal();
    });

    function renderTotals(){
      var t=totals();
      setTxt('tSub',fmt(t.sub));setTxt('tDisc','-'+fmt(t.disc));setTxt('tTax',fmt(t.tax));setTxt('tTotal',fmt(t.total));
      setTxt('tDiscLabel',state.discount);setTxt('tTaxLabel',state.tax);
      setTxt('itemsTotalChip',fmt(t.total));
    }

    function shade(hex,amt){
      var c=hex.replace('#','');
      var r=parseInt(c.substr(0,2),16),g=parseInt(c.substr(2,2),16),b=parseInt(c.substr(4,2),16);
      r=Math.max(0,Math.min(255,r+amt));g=Math.max(0,Math.min(255,g+amt));b=Math.max(0,Math.min(255,b+amt));
      return '#'+[r,g,b].map(function(x){return x.toString(16).padStart(2,'0');}).join('');
    }
    function roundRect(ctx,x,y,w,h,r){
      ctx.beginPath();ctx.moveTo(x+r,y);
      ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);
      ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();
    }
    function drawLogo(){
      var canvas=el('lmCanvas');if(!canvas)return;
      var ctx=null;try{ctx=canvas.getContext('2d');}catch(e){return;}
      if(!ctx)return;
      var w=canvas.width,h=canvas.height;
      try{ctx.clearRect(0,0,w,h);}catch(e){return;}
      var iniEl=el('lmInitials'),bgEl=el('lmBg'),txEl=el('lmText'),shEl=el('lmShape'),stEl=el('lmStyle');
      if(!iniEl||!bgEl||!txEl||!shEl||!stEl)return;
      var initials=(iniEl.value||'CK').toUpperCase();
      var bg=bgEl.value,txt=txEl.value;
      var shape=shEl.value,style=stEl.value;
      var fill;
      if(style==='gradient'){
        var g=ctx.createLinearGradient(0,0,w,h);
        g.addColorStop(0,bg);g.addColorStop(1,shade(bg,-40));fill=g;
      }else{fill=bg;}
      ctx.fillStyle=fill;
      if(shape==='circle'){ctx.beginPath();ctx.arc(w/2,h/2,w/2,0,Math.PI*2);ctx.fill();}
      else{roundRect(ctx,0,0,w,h,w*0.2);ctx.fill();}
      ctx.fillStyle=txt;
      var fs=initials.length>=3?w*0.32:w*0.42;
      ctx.font='700 '+fs+'px Outfit, sans-serif';
      ctx.textAlign='center';ctx.textBaseline='middle';
      ctx.fillText(initials,w/2,h/2+4);
    }
    var lmBackdrop=el('lmBackdrop');
    function openLm(){if(!lmBackdrop)return;lmBackdrop.classList.add('open');lmBackdrop.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');lockScroll();safe(drawLogo);focusNoScroll(el('lmInitials'));setTimeout(function(){safe(fitModalToKeyboard);},80);}
    function closeLm(){if(!lmBackdrop)return;lmBackdrop.classList.remove('open');lmBackdrop.setAttribute('aria-hidden','true');clearModalFit(lmBackdrop);unlockScroll();document.body.classList.remove('modal-open');}
    on('openLogoMaker','click',openLm);
    on('lmClose','click',closeLm);
    if(lmBackdrop)lmBackdrop.addEventListener('click',function(e){if(e.target===lmBackdrop)closeLm();});
    ['lmInitials','lmBg','lmText','lmShape','lmStyle'].forEach(function(id){on(id,'input',function(){safe(drawLogo);});});
    on('lmUse','click',function(){
      var cv=el('lmCanvas');if(!cv)return;
      try{state.logo=cv.toDataURL('image/png');}catch(e){showToast('No se pudo crear el logo');return;}
      var th=el('logoThumb');if(th)th.innerHTML='<img src="'+state.logo+'" alt="logo" />';
      safe(renderPreview);closeLm();showToast('Logo creado y aplicado');
    });

    function getHeaderCfg(key,c){
      var p=c.primary,a=c.accent,s=c.secondary;
      var map={
        moderno:{topStyle:'background:linear-gradient(135deg,'+p+','+a+');color:#fff;',logo:'background:rgba(255,255,255,.2);color:#fff;',title:'#fff',sub:'rgba(255,255,255,.85)',meta:'rgba(255,255,255,.9)'},
        clasico:{topStyle:'background:'+p+';color:#fff;',logo:'background:rgba(255,255,255,.2);color:#fff;',title:'#fff',sub:'rgba(255,255,255,.85)',meta:'rgba(255,255,255,.9)'},
        minimal:{topStyle:'background:#fff;color:#1a1a2e;border-bottom:4px solid '+p+';',logo:'background:'+p+'1A;color:'+p+';',title:p,sub:'#888',meta:'#888'},
        corporativo:{topStyle:'background:#fff;color:#1a1a2e;border-top:6px solid '+p+';border-bottom:1px solid #eee;',logo:'background:'+p+';color:#fff;',title:'#1a1a2e',sub:p,meta:'#888'},
        elegante:{topStyle:'background:#141414;color:#fff;border-bottom:3px solid '+p+';',logo:'background:'+p+';color:#fff;',title:'#fff',sub:s,meta:s},
        creativo:{topStyle:'background:linear-gradient(120deg,'+p+' 0%,'+a+' 55%,'+s+' 100%);color:#fff;',logo:'background:rgba(255,255,255,.25);color:#fff;',title:'#fff',sub:'rgba(255,255,255,.9)',meta:'rgba(255,255,255,.9)'},
        lateral:{topStyle:'background:#fff;color:#1a1a2e;border-left:6px solid '+p+';',logo:'background:'+p+';color:#fff;',title:'#1a1a2e',sub:'#888',meta:'#888'},
        doble:{topStyle:'background:linear-gradient(90deg,'+p+' 0%,'+p+' 28%,#fff 28%);',logo:'background:rgba(255,255,255,.25);color:#fff;',title:'#1a1a2e',sub:'#888',meta:'#888'},
        cinta:{topStyle:'background:#fff;color:#1a1a2e;border-bottom:5px double '+p+';',logo:'background:'+p+'1A;color:'+p+';',title:'#1a1a2e',sub:'#888',meta:'#888'},
        marco:{topStyle:'background:#fff;color:#1a1a2e;border:2px solid '+p+';',logo:'background:'+p+';color:#fff;',title:'#1a1a2e',sub:'#888',meta:'#888'},
        banda:{topStyle:'background:#fff;color:#1a1a2e;border-top:10px solid '+p+';border-bottom:1px solid #eee;',logo:'background:'+p+'1A;color:'+p+';',title:'#1a1a2e',sub:p,meta:'#888'},
        oscuro:{topStyle:'background:#14161F;color:#fff;border-bottom:3px solid '+a+';',logo:'background:'+p+';color:#fff;',title:'#fff',sub:s,meta:s},
        factura:{topStyle:'background:#f5f5f7;color:#1a1a2e;border-left:8px solid '+p+';',logo:'background:'+p+';color:#fff;',title:'#1a1a2e',sub:'#555',meta:'#555'},
        suave:{topStyle:'background:linear-gradient(135deg,'+s+' 0%,#ffffff 70%);color:#1a1a2e;',logo:'background:'+p+';color:#fff;',title:'#1a1a2e',sub:'#555',meta:'#555'},
        tarjeta:{topStyle:'background:#fff;color:#1a1a2e;border-bottom:1px solid #eee;',logo:'background:linear-gradient(135deg,'+p+','+a+');color:#fff;',title:'#1a1a2e',sub:'#888',meta:'#888'},
        linea:{topStyle:'background:#fff;color:#1a1a2e;border-bottom:3px solid '+p+';box-shadow:0 3px 0 '+a+';',logo:'background:'+p+'1A;color:'+p+';',title:p,sub:'#888',meta:'#888'}
      };
      return map[key]||map.moderno;
    }

    function buildDesignThumb(key){
      var c=state.colors;
      var cfg=getHeaderCfg(key,c);
      return '<div class="design-doc">'+
        '<div class="dd-head" style="'+cfg.topStyle+'">'+
          '<span class="dd-logo" style="'+cfg.logo+'"></span>'+
          '<div class="dd-headtxt">'+
            '<span class="dd-title" style="background:'+cfg.title+';"></span>'+
            '<span class="dd-sub" style="background:'+cfg.sub+';"></span>'+
          '</div>'+
          '<span class="dd-meta" style="background:'+cfg.meta+';"></span>'+
        '</div>'+
        '<div class="dd-parties"><span class="dd-party"></span><span class="dd-party"></span></div>'+
        '<div class="dd-items"><span class="dd-item"></span><span class="dd-item"></span><span class="dd-item"></span></div>'+
        '<div class="dd-totals"><span class="dd-total" style="background:'+c.accent+';"></span></div>'+
      '</div>';
    }
    function renderDesignThumbs(){
      var g=el('designGrid');if(!g)return;g.innerHTML='';
      DESIGNS.forEach(function(d){
        var b=document.createElement('button');
        b.className='design-opt'+(d.key===state.design?' selected':'');
        b.innerHTML='<span class="design-thumb-wrap">'+buildDesignThumb(d.key)+'</span><span class="design-name">'+d.name+'</span>';
        b.addEventListener('click',function(){state.design=d.key;renderDesignThumbs();renderPreview();});
        g.appendChild(b);
      });
    }

    function renderPalettes(){
      var r=el('paletteRow');if(!r)return;r.innerHTML='';
      PALETTES.forEach(function(p){
        var b=document.createElement('button');
        b.className='palette-btn'+(p.key===selectedPalette?' selected':'');
        b.innerHTML='<span class="palette-dots"><span style="background:'+p.primary+'"></span><span style="background:'+p.secondary+'"></span><span style="background:'+p.accent+'"></span></span>'+p.name;
        b.addEventListener('click',function(){
          selectedPalette=p.key;
          state.colors={primary:p.primary,secondary:p.secondary,accent:p.accent};
          el('colorPrimary').value=p.primary;el('colorSecondary').value=p.secondary;el('colorAccent').value=p.accent;
          renderPalettes();renderDesignThumbs();renderPreview();
        });
        r.appendChild(b);
      });
    }

    function renderTextures(){
      var r=el('textureRow');if(!r)return;r.innerHTML='';
      var t=document.createElement('span');t.className='texture-label';t.textContent='Textura del documento:';r.appendChild(t);
      TEXTURES.forEach(function(tx){
        var b=document.createElement('button');
        b.className='palette-btn'+(tx.key===state.texture?' selected':'');
        b.innerHTML='<i class="fa-solid '+tx.icon+'"></i>'+tx.name;
        b.addEventListener('click',function(){state.texture=tx.key;renderTextures();renderPreview();});
        r.appendChild(b);
      });
    }

    function buildHeader(){
      var c=state.colors,s=state.sender;
      var cfg=getHeaderCfg(state.design,c);
      var logoImg=state.logo?'<img src="'+state.logo+'" alt="logo" />':'<i class="fa-solid fa-file-invoice"></i>';
      var title=esc(state.title),sub=esc(s.name)||'';
      var meta='N° '+esc(state.number)+'<br>Fecha: '+dateFmt(state.date)+'<br>Válida por '+state.validDays+' días';
      return '<div class="qd-top" style="'+cfg.topStyle+'">'+
        '<div class="qd-brand">'+
          '<span class="qd-logo" style="'+cfg.logo+'">'+logoImg+'</span>'+
          '<div><div class="qd-title" style="color:'+cfg.title+';">'+title+'</div><div class="qd-sub" style="color:'+cfg.sub+';">'+sub+'</div></div>'+
        '</div>'+
        '<div class="qd-meta" style="color:'+cfg.meta+';">'+meta+'</div>'+
      '</div>';
    }
    function renderPreview(){
      var qd=el('quoteDoc');if(!qd)return;
      var t=totals();var c=state.colors;var s=state.sender;var cl=state.client;
      var rows=state.items.map(function(it){
        return '<tr><td>'+esc(it.name)+(it.description?'<br><span style="font-size:.68rem;color:#999;">'+esc(it.description)+'</span>':'')+'</td>'+
          '<td class="r">'+it.qty+'</td><td class="r">'+fmt(it.price)+'</td><td class="r" style="font-weight:600;">'+fmt(it.qty*it.price)+'</td></tr>';
      }).join('')||'<tr><td colspan="4" style="text-align:center;color:#999;">Sin ítems</td></tr>';
      var html=buildHeader()+
        '<div class="qd-body tex-'+state.texture+'" style="padding-top:1.25rem;">'+
          '<div class="qd-parties">'+
            '<div class="qd-party"><h4>Emitido por</h4><div class="p-name">'+(esc(s.name)||'—')+'</div>'+
              (s.tax?'<div class="p-line">ID: '+esc(s.tax)+'</div>':'')+
              (s.email?'<div class="p-line">'+esc(s.email)+'</div>':'')+
              (s.phone?'<div class="p-line">'+esc(s.phone)+'</div>':'')+
              (s.web?'<div class="p-line">'+esc(s.web)+'</div>':'')+'</div>'+
            '<div class="qd-party"><h4>Para</h4><div class="p-name">'+(esc(cl.name)||'—')+'</div>'+
              (cl.company?'<div class="p-line">'+esc(cl.company)+'</div>':'')+
              (cl.email?'<div class="p-line">'+esc(cl.email)+'</div>':'')+
              (cl.phone?'<div class="p-line">'+esc(cl.phone)+'</div>':'')+'</div>'+
          '</div>'+
          '<table class="qd-items"><thead><tr><th>Concepto</th><th style="text-align:right">Cant.</th><th style="text-align:right">Precio</th><th style="text-align:right">Total</th></tr></thead><tbody>'+rows+'</tbody></table>'+
          '<div class="qd-totals">'+
            '<div class="tr"><span>Subtotal</span><span>'+fmt(t.sub)+'</span></div>'+
            '<div class="tr"><span>Descuento ('+state.discount+'%)</span><span>-'+fmt(t.disc)+'</span></div>'+
            '<div class="tr"><span>Impuesto ('+state.tax+'%)</span><span>'+fmt(t.tax)+'</span></div>'+
            '<div class="tr grand" style="color:'+c.accent+';"><span>TOTAL</span><span>'+fmt(t.total)+'</span></div>'+
          '</div>'+
          (state.notes?'<div class="qd-notes"><h4>Notas / condiciones</h4>'+esc(state.notes)+'</div>':'')+
        '</div>'+
        '<div class="qd-foot"><span>'+(esc(s.name)||'Cotización')+'</span><span>'+(esc(s.email)||'')+' '+(esc(s.phone)||'')+'</span></div>';
      qd.innerHTML=html;
      /* Si estamos en el paso Vista previa, re-encajar la miniatura */
      if(STEPS[currentStep].key==='preview'&&window.requestAnimationFrame){
        requestAnimationFrame(function(){safe(fitPreview);});
      }
    }

    /* Miniatura: escala el documento para que se vea COMPLETO sin scroll */
    function fitPreview(){
      var stage=el('previewStage'),doc=el('quoteDoc'),wrap=el('previewScale');
      if(!stage||!doc||!wrap)return;
      if(STEPS[currentStep].key!=='preview')return;
      wrap.style.transform='';
      var dw=doc.scrollWidth||doc.offsetWidth,dh=doc.scrollHeight||doc.offsetHeight;
      var sw=stage.clientWidth-16,sh=stage.clientHeight-16;
      if(!dw||!dh||!sw||!sh)return;
      var s=Math.min(sw/dw,sh/dh,1);
      wrap.style.transform='scale('+s+')';
      wrap.style.width=Math.round(dw*s)+'px';
      wrap.style.height=Math.round(dh*s)+'px';
    }

    function download(filename,content,type){
      var blob=new Blob([content],{type:type});var url=URL.createObjectURL(blob);
      var a=document.createElement('a');a.href=url;a.download=filename;
      document.body.appendChild(a);a.click();document.body.removeChild(a);
      URL.revokeObjectURL(url);return true;
    }
     function buildText(){
       var t=totals();var s=state.sender;var cl=state.client;var L=[];
       L.push('======================================');
       L.push('  '+state.title.toUpperCase()+' — '+state.design.toUpperCase());L.push('  '+(s.name||''));
       L.push('======================================');
       L.push('N° '+state.number+'   Fecha: '+dateFmt(state.date)+'   Válida por '+state.validDays+' días');
       L.push('Diseño: '+state.design+' | Colores: primario '+state.colors.primary+' | secundario '+state.colors.secondary+' | acento '+state.colors.accent);
       L.push('Textura: '+state.texture);
       L.push('');L.push('EMITIDO POR');L.push('Nombre: '+(s.name||'—'));
       if(s.tax)L.push('ID: '+s.tax);if(s.email)L.push('Correo: '+s.email);
       if(s.phone)L.push('Teléfono: '+s.phone);if(s.web)L.push('Web/Dirección: '+s.web);
       L.push('');L.push('CLIENTE');L.push('Nombre: '+(cl.name||'—'));
       if(cl.company)L.push('Empresa: '+cl.company);if(cl.email)L.push('Correo: '+cl.email);
       if(cl.phone)L.push('Teléfono: '+cl.phone);
       L.push('');L.push('DETALLE');
       state.items.forEach(function(it){L.push('• '+it.name+(it.description?' ('+it.description+')':'')+' x'+it.qty+' @ '+fmt(it.price)+' = '+fmt(it.qty*it.price));});
       L.push('');L.push('Subtotal: '+fmt(t.sub));
       L.push('Descuento ('+state.discount+'%): -'+fmt(t.disc));
       L.push('Impuesto ('+state.tax+'%): '+fmt(t.tax));
       L.push('TOTAL: '+fmt(t.total));
       if(state.notes){L.push('');L.push('NOTAS: '+state.notes);}
       return L.join('\n');
     }
     function buildCSV(){
       var t=totals();var s=state.sender;var cl=state.client;var rows=[];
       rows.push(['Cotización',state.number]);rows.push(['Título',state.title]);rows.push(['Fecha',dateFmt(state.date)]);rows.push(['Válida por',state.validDays+' días']);rows.push(['Diseño',state.design]);rows.push(['Color primario',state.colors.primary]);rows.push(['Color secundario',state.colors.secondary]);rows.push(['Color acento',state.colors.accent]);rows.push(['Textura',state.texture]);rows.push([]);
       rows.push(['Emisor',s.name||'']);rows.push(['Emisor ID',s.tax||'']);rows.push(['Emisor correo',s.email||'']);rows.push(['Emisor teléfono',s.phone||'']);rows.push([]);
       rows.push(['Cliente',cl.name||'']);rows.push(['Cliente empresa',cl.company||'']);rows.push(['Cliente correo',cl.email||'']);rows.push(['Cliente teléfono',cl.phone||'']);rows.push([]);
       rows.push(['Concepto','Descripción','Cantidad','Precio unitario','Total']);
       state.items.forEach(function(it){rows.push([it.name,it.description,it.qty,it.price,it.qty*it.price]);});
       rows.push([]);
       rows.push(['Subtotal','','','',t.sub]);rows.push(['Descuento '+state.discount+'%','','','',-t.disc]);rows.push(['Impuesto '+state.tax+'%','','','',t.tax]);rows.push(['TOTAL','','','',t.total]);
       return '\uFEFF'+rows.map(function(r){return r.map(function(x){return '"'+String(x==null?'':x).replace(/"/g,'""')+'"';}).join(',');}).join('\r\n');
     }
    on('btnTXT','click',function(){if(download(getFileName('txt'),buildText(),'text/plain;charset=utf-8'))showToast('TXT descargado con diseño');});
    on('btnExcel','click',function(){if(download(getFileName('csv'),buildCSV(),'text/csv;charset=utf-8'))showToast('Excel (CSV) descargado con diseño');});
    on('btnPrint','click',function(){safe(renderPreviewNow);window.print();});
    on('btnEmail','click',function(){
      var to=state.client.email||state.sender.email||'';
      var subject=encodeURIComponent(state.title+' '+state.number+' — '+(state.sender.name||''));
      var body=encodeURIComponent(buildText()+'\n\n(Adjunte el PDF descargado para más detalle.)');
      window.location.href='mailto:'+to+'?subject='+subject+'&body='+body;
      showToast('Abriendo tu correo…');
    });
    on('btnPDF','click',function(){
      if(!window.jspdf){showToast('Cargando librería PDF… reintenta en 3s');return;}
      var jsPDF=window.jspdf.jsPDF;
      try{
      var doc=new jsPDF({unit:'pt',format:'a4'});
      if(typeof doc.autoTable!=='function'){showToast('PDF incompleto: falta autotable, recarga');return;}
      var c=state.colors;var t=totals();var s=state.sender;var cl=state.client;
      function hex(h){h=h.replace('#','');return[parseInt(h.substr(0,2),16),parseInt(h.substr(2,2),16),parseInt(h.substr(4,2),16)];}
      var pr=hex(c.primary),ac=hex(c.accent);
      /* El encabezado replica el diseño elegido en el paso Diseño */
      var cfg0=getHeaderCfg(state.design,c);
      function pdfCol(str,fb){try{if(str&&str.charAt(0)==='#'){var h=str.length===4?('#'+str[1]+str[1]+str[2]+str[2]+str[3]+str[3]):str;return hex(h);}}catch(e){}return fb;}
      function mixW(rgb,t){return[Math.round(rgb[0]+(255-rgb[0])*t),Math.round(rgb[1]+(255-rgb[1])*t),Math.round(rgb[2]+(255-rgb[2])*t)];}
      var PW=595,PH=842,M=40,CW=PW-M*2,HH=120;
      var dk=state.design;
      var darkBg=(dk==='elegante'||dk==='oscuro');
      /* fondo según diseño */
      if(dk==='oscuro'){doc.setFillColor(20,22,31);doc.rect(0,0,PW,HH,'F');}
      else if(dk==='elegante'){doc.setFillColor(20,20,20);doc.rect(0,0,PW,HH,'F');}
      else if(dk==='factura'){doc.setFillColor(245,245,247);doc.rect(0,0,PW,HH,'F');}
      else if(dk==='suave'){var sb=mixW(hex(c.secondary),0.85);doc.setFillColor(sb[0],sb[1],sb[2]);doc.rect(0,0,PW,HH,'F');}
      else if(dk==='moderno'||dk==='creativo'||dk==='clasico'){doc.setFillColor(pr[0],pr[1],pr[2]);doc.rect(0,0,PW,HH,'F');}
      else if(dk==='doble'){doc.setFillColor(255,255,255);doc.rect(0,0,PW,HH,'F');doc.setFillColor(pr[0],pr[1],pr[2]);doc.rect(0,0,Math.round(PW*0.28),HH,'F');}
      else{doc.setFillColor(255,255,255);doc.rect(0,0,PW,HH,'F');}
      /* marcas distintivas de cada diseño */
      if(dk==='moderno'||dk==='creativo'){doc.setFillColor(ac[0],ac[1],ac[2]);doc.rect(0,HH-6,PW,6,'F');}
      else if(dk==='clasico'){doc.setFillColor(255,255,255);doc.rect(0,HH-2,PW,2,'F');}
      else if(dk==='minimal'){doc.setFillColor(pr[0],pr[1],pr[2]);doc.rect(0,HH-4,PW,4,'F');}
      else if(dk==='corporativo'){doc.setFillColor(pr[0],pr[1],pr[2]);doc.rect(0,0,PW,6,'F');doc.setFillColor(238,238,238);doc.rect(0,HH-1,PW,1,'F');}
      else if(dk==='elegante'){doc.setFillColor(pr[0],pr[1],pr[2]);doc.rect(0,HH-3,PW,3,'F');}
      else if(dk==='oscuro'){doc.setFillColor(ac[0],ac[1],ac[2]);doc.rect(0,HH-6,PW,6,'F');}
      else if(dk==='lateral'){doc.setFillColor(pr[0],pr[1],pr[2]);doc.rect(0,0,8,HH,'F');doc.setFillColor(238,238,238);doc.rect(0,HH-1,PW,1,'F');}
      else if(dk==='factura'){doc.setFillColor(pr[0],pr[1],pr[2]);doc.rect(0,0,8,HH,'F');}
      else if(dk==='cinta'){doc.setFillColor(pr[0],pr[1],pr[2]);doc.rect(0,HH-8,PW,2,'F');doc.rect(0,HH-4,PW,2,'F');}
      else if(dk==='marco'){doc.setDrawColor(pr[0],pr[1],pr[2]);doc.setLineWidth(2);doc.rect(8,8,PW-16,HH-16,'S');}
      else if(dk==='banda'){doc.setFillColor(pr[0],pr[1],pr[2]);doc.rect(0,0,PW,10,'F');doc.setFillColor(238,238,238);doc.rect(0,HH-1,PW,1,'F');}
      else if(dk==='suave'){doc.setFillColor(pr[0],pr[1],pr[2]);doc.rect(0,HH-3,PW,3,'F');}
      else if(dk==='tarjeta'){doc.setFillColor(238,238,238);doc.rect(0,HH-1,PW,1,'F');}
      else if(dk==='linea'){doc.setFillColor(pr[0],pr[1],pr[2]);doc.rect(0,HH-6,PW,3,'F');doc.setFillColor(ac[0],ac[1],ac[2]);doc.rect(0,HH-3,PW,3,'F');}
      else if(dk==='doble'){doc.setFillColor(ac[0],ac[1],ac[2]);doc.rect(0,HH-4,PW,4,'F');}
      var headTx=pdfCol(cfg0.title,darkBg?[255,255,255]:[26,26,46]);
      var headSub=pdfCol(cfg0.sub,darkBg?[210,210,220]:[120,120,130]);
      var metaX=state.logo?462:555;
      doc.setTextColor(headTx[0],headTx[1],headTx[2]);doc.setFontSize(20);doc.setFont(undefined,'bold');
      doc.text(doc.splitTextToSize(state.title,300)[0],M,50);
      doc.setFontSize(10);doc.setFont(undefined,'normal');
      doc.setTextColor(headSub[0],headSub[1],headSub[2]);
      doc.text(doc.splitTextToSize(s.name||'',300)[0]||'',M,70);
      doc.setFontSize(9);
      doc.text('N° '+state.number,metaX,40,{align:'right'});
      doc.text('Fecha: '+dateFmt(state.date),metaX,55,{align:'right'});
      doc.text('Válida por '+state.validDays+' días',metaX,70,{align:'right'});
      if(state.logo){try{doc.addImage(state.logo,'PNG',482,22,62,62);}catch(e){}}
      /* Bloques emisor / cliente con corte de texto */
      doc.setTextColor(60,60,60);doc.setFontSize(10);doc.setFont(undefined,'bold');
      doc.text('EMITIDO POR',M,140);doc.text('CLIENTE',320,140);
      doc.setFont(undefined,'normal');doc.setTextColor(80,80,80);doc.setFontSize(9.5);
      function block(x,y,lines){
        for(var i=0;i<lines.length;i++){
          if(!lines[i])continue;
          var parts=doc.splitTextToSize(String(lines[i]),235);
          for(var j=0;j<parts.length;j++){doc.text(parts[j],x,y);y+=14;}
        }
        return y;
      }
      var sy=block(M,158,[s.name||'—',s.tax?('ID: '+s.tax):'',s.email||'',s.phone||'',s.web||'']);
      var cy=block(320,158,[cl.name||'—',cl.company||'',cl.email||'',cl.phone||'']);
      var body=state.items.map(function(it){return[it.name+(it.description?'\n'+it.description:''),String(it.qty),fmt(it.price),fmt(it.qty*it.price)];});
      if(!body.length){body=[['Sin ítems — agregue conceptos en el paso Ítems','','','']];}
      doc.autoTable({
        startY:Math.max(sy,cy)+15,
        head:[['Concepto','Cant.','Precio unit.','Total']],body:body,
        theme:'striped',headStyles:{fillColor:pr,fontSize:9},
        styles:{fontSize:9,cellPadding:6,overflow:'linebreak'},
        columnStyles:{1:{halign:'right'},2:{halign:'right'},3:{halign:'right'}},
        margin:{left:M,right:M}
      });
      /* Totales en caja estructurada, con salto de página si no caben */
      function needPage(h){if(y+h>PH-60){doc.addPage();y=50;}return y;}
      var y=doc.lastAutoTable.finalY+25;
      y=needPage(120);
      doc.setFillColor(245,245,247);doc.roundedRect(300,y-12,255,108,6,6,'F');
      doc.setFontSize(10);doc.setTextColor(80,80,80);doc.setFont(undefined,'normal');
      doc.text('Subtotal:',315,y);doc.text(fmt(t.sub),540,y,{align:'right'});
      doc.text('Descuento ('+state.discount+'%):',315,y+18);doc.text('-'+fmt(t.disc),540,y+18,{align:'right'});
      doc.text('Impuesto ('+state.tax+'%):',315,y+36);doc.text(fmt(t.tax),540,y+36,{align:'right'});
      doc.setDrawColor(ac[0],ac[1],ac[2]);doc.setLineWidth(1.5);doc.line(315,y+46,540,y+46);
      doc.setFontSize(14);doc.setFont(undefined,'bold');doc.setTextColor(ac[0],ac[1],ac[2]);
      doc.text('TOTAL:',315,y+68);doc.text(fmt(t.total),540,y+68,{align:'right'});
      y+=96;
      if(state.notes){
        var noteLines=doc.splitTextToSize('Notas / condiciones: '+state.notes,CW);
        y=needPage(noteLines.length*12+24);
        doc.setFontSize(9);doc.setFont(undefined,'bold');doc.setTextColor(90,90,100);
        doc.text('Notas / condiciones',M,y);y+=14;
        doc.setFont(undefined,'normal');doc.setTextColor(110,110,120);
        doc.text(noteLines,M,y);y+=noteLines.length*12+10;
      }
       /* Agregar línea de diseño al encabezado */
       doc.setFontSize(8);doc.setTextColor(120,120,130);doc.setFont(undefined,'normal');
       doc.text('Diseño: '+state.design.toUpperCase(),M,PH-55,{align:'left'});
       doc.text('Colores: '+c.primary+' / '+c.secondary+' / '+c.accent,M,PH-45,{align:'left'});
       doc.text('Textura: '+state.texture,M,PH-35,{align:'left'});
       /* Pie con numeración en todas las páginas */
       var pages=doc.getNumberOfPages();
       for(var pg=1;pg<=pages;pg++){
         doc.setPage(pg);
         doc.setFontSize(8);doc.setTextColor(150,150,160);doc.setFont(undefined,'normal');
         doc.text((s.name||'Cotización')+' · '+(s.email||'')+' '+(s.phone||''),M,PH-30);
         doc.text('Página '+pg+' de '+pages,PW-M,PH-30,{align:'right'});
       }
        doc.save(getFileName('pdf'));showToast('PDF descargado — diseño: '+state.design);
      }catch(err){if(window.console&&console.error)console.error(err);showToast('No se pudo generar el PDF');}
    });

    ['senderName','senderTax','senderEmail','senderPhone','senderWeb'].forEach(function(id){
      var k=id.replace('sender','').toLowerCase();
      on(id,'input',function(e){state.sender[k]=e.target.value;scheduleRenderPreview();});
    });
    ['clientName','clientCompany','clientEmail','clientPhone'].forEach(function(id){
      var k=id.replace('client','').toLowerCase();
      on(id,'input',function(e){state.client[k]=e.target.value;scheduleRenderPreview();});
    });
    on('quoteTitle','input',function(e){state.title=e.target.value;scheduleRenderPreview();});
    on('quoteNumber','input',function(e){state.number=e.target.value;scheduleRenderPreview();});
    on('quoteDate','input',function(e){state.date=e.target.value;scheduleRenderPreview();});
    on('validDays','input',function(e){state.validDays=parseInt(e.target.value)||0;scheduleRenderPreview();});
    on('currency','change',function(e){state.currency=e.target.value;safe(renderItems);safe(renderTotals);scheduleRenderPreview();});
    on('quoteNotes','input',function(e){state.notes=e.target.value;scheduleRenderPreview();});
    on('discountInput','input',function(e){state.discount=Math.max(0,Math.min(100,parseFloat(e.target.value)||0));safe(renderTotals);scheduleRenderPreview();});
    on('taxInput','input',function(e){state.tax=Math.max(0,Math.min(100,parseFloat(e.target.value)||0));safe(renderTotals);scheduleRenderPreview();});
    ['Primary','Secondary','Accent'].forEach(function(s){
      on('color'+s,'input',function(e){state.colors[s.toLowerCase()]=e.target.value;selectedPalette='';safe(renderPalettes);safe(renderDesignThumbs);scheduleRenderPreview();});
    });
    on('logoInput','change',function(e){
      var f=e.target.files&&e.target.files[0];if(!f)return;
      if(f.size>2*1024*1024){showToast('Logo muy pesado (máx 2MB)');return;}
      var r=new FileReader();
      r.onload=function(){state.logo=r.result;var th=el('logoThumb');if(th)th.innerHTML='<img src="'+state.logo+'" alt="logo" />';scheduleRenderPreview();showToast('Logo cargado');};
      r.readAsDataURL(f);
    });
    on('removeLogo','click',function(){
      state.logo=null;var th=el('logoThumb');if(th)th.innerHTML='<i class="fa-regular fa-image"></i>';
      var li=el('logoInput');if(li)li.value='';scheduleRenderPreview();showToast('Logo quitado');
    });

    var burger=el('burger'),navMenu=el('navMenu'),menuBack=el('menuBack');
    function isMenuOpen(){return !!(navMenu&&navMenu.classList.contains('open'));}
    function openMenu(){if(!navMenu||!burger)return;navMenu.classList.add('open');burger.classList.add('active');burger.setAttribute('aria-expanded','true');navMenu.setAttribute('aria-hidden','false');document.body.classList.add('menu-open');}
    function closeMenu(){if(!navMenu||!burger)return;navMenu.classList.remove('open');burger.classList.remove('active');burger.setAttribute('aria-expanded','false');navMenu.setAttribute('aria-hidden','true');document.body.classList.remove('menu-open');}
    if(burger)burger.addEventListener('click',function(e){e.stopPropagation();isMenuOpen()?closeMenu():openMenu();});
    if(menuBack)menuBack.addEventListener('click',closeMenu);
    document.addEventListener('click',function(e){if(isMenuOpen()&&navMenu&&burger&&!navMenu.contains(e.target)&&!burger.contains(e.target))closeMenu();});
    document.addEventListener('keydown',function(e){
      if(e.key==='Escape'){
        var ib=el('itemBackdrop'),lb=el('lmBackdrop');
        if(ib&&ib.classList.contains('open'))closeItemModal();
        else if(lb&&lb.classList.contains('open'))closeLm();
        else if(isMenuOpen())closeMenu();
      }
    });

    var root=document.documentElement,themeIconMini=el('themeIconMini'),themeBtns=document.querySelectorAll('.theme-btn'),themeMini=el('themeToggleMini');
    function setTheme(t){
      if(t==='light'){root.setAttribute('data-theme','light');if(themeIconMini)themeIconMini.className='fa-solid fa-sun';}
      else{root.removeAttribute('data-theme');if(themeIconMini)themeIconMini.className='fa-solid fa-moon';}
      themeBtns.forEach(function(b){b.classList.toggle('active',b.getAttribute('data-theme-set')===t);});
      try{localStorage.setItem('codekat-theme',t);}catch(e){}
    }
    var savedTheme='dark';try{savedTheme=localStorage.getItem('codekat-theme')||'dark';}catch(e){}
    setTheme(savedTheme);
    themeBtns.forEach(function(b){b.addEventListener('click',function(){setTheme(b.getAttribute('data-theme-set'));});});
    if(themeMini)themeMini.addEventListener('click',function(){setTheme(root.getAttribute('data-theme')==='light'?'dark':'light');});

    /* ═══════════════════════════════════════════════
       BLOQUEO DE SCROLL SIN SALTO: overflow oculto (conserva la posición
       exacta, compatible con teclado móvil) + contador para modales
       anidados (negocio → crear logo).
       ═══════════════════════════════════════════════ */
    var scrollLockCount=0;
    function lockScroll(){
      if(scrollLockCount===0){
        document.body.classList.add('is-locked');
        vkOverlay(true);
      }
      scrollLockCount++;
    }
    function unlockScroll(){
      if(scrollLockCount>0)scrollLockCount--;
      if(scrollLockCount===0){
        document.body.classList.remove('is-locked');
        vkOverlay(false);
      }
    }
    /* El teclado avisa su geometría exacta: un solo ajuste, sin persecución */
    try{
      var _vk=vkApi();
      if(_vk&&_vk.addEventListener)_vk.addEventListener('geometrychange',function(){scheduleModalSettle(120);});
    }catch(e){}
    /* Foco sin mover la página; acerca el campo dentro del modal.
       SOLO en escritorio: en táctil el autofoco abre el teclado al instante
       y reflota todo el layout (la página "se desliza"). En móvil el foco
       lo pone el usuario al tocar el campo, con el pin ya armado. */
    var isTouchDevice=(('ontouchstart' in window)||(navigator.maxTouchPoints>0));
    function focusNoScroll(f){
      if(!f)return;
      if(isTouchDevice)return;
      try{if(window.innerWidth<640)return;}catch(e){}
      setTimeout(function(){
        try{f.focus({preventScroll:true});}catch(_){try{f.focus();}catch(__){}}
        try{if(f.scrollIntoView)f.scrollIntoView({block:'nearest'});}catch(__){}
      },120);
    }

    /* ═══════════════════════════════════════════════
       MODALES DE EDICIÓN (negocio / cliente / detalles)
       Apertura genérica con [data-open], cierre con [data-close]
       ═══════════════════════════════════════════════ */
    function openBackdrop(id){
      var b=typeof id==='string'?el(id):id;if(!b)return;
      /* Al abrir la vista real, clonar el documento actual */
      if((typeof id==='string'?id:(b.id||''))==='previewBackdrop'){
        var src=el('quoteDoc'),dst=el('previewFullDoc');
        if(src&&dst)dst.innerHTML=src.innerHTML;
      }
      b.classList.add('open');b.setAttribute('aria-hidden','false');
      document.body.classList.add('modal-open');lockScroll();
      focusNoScroll(b.querySelector('input,select,textarea'));
      setTimeout(function(){safe(fitModalToKeyboard);},80);
      scheduleModalSettle(450);
    }
    function closeBackdrop(b){
      if(typeof b==='string')b=el(b);if(!b||!b.classList.contains('open'))return;
      b.classList.remove('open');b.setAttribute('aria-hidden','true');
      clearModalFit(b);
      unlockScroll();
      if(!document.querySelector('.fm-backdrop.open'))document.body.classList.remove('modal-open');
    }
    document.addEventListener('click',function(e){
      var opener=e.target.closest?e.target.closest('[data-open]'):null;
      if(opener){if(e.preventDefault)e.preventDefault();openBackdrop(opener.getAttribute('data-open'));return;}
      var closer=e.target.closest?e.target.closest('[data-close]'):null;
      if(closer){var bd=closer.closest?closer.closest('.fm-backdrop'):null;if(bd)closeBackdrop(bd);return;}
      if(e.target.classList&&e.target.classList.contains('fm-backdrop'))closeBackdrop(e.target);
    });
    document.addEventListener('keydown',function(e){
      if(e.key==='Escape'){
        var open=document.querySelector('.fm-backdrop.open');
        if(open&&(open.id==='bizBackdrop'||open.id==='clientBackdrop'||open.id==='detailsBackdrop'))closeBackdrop(open);
      }
    });

    /* Resúmenes compactos de cada card */
    function setSum(id,v,fallback){
      var e=el(id);if(!e)return;
      var t=String(v==null?'':v).trim();
      e.textContent=t||fallback||'Sin completar';
      e.classList.toggle('empty',!t);
    }
    function renderSummaries(){
      setSum('sumSenderName',state.sender.name);setSum('sumSenderTax',state.sender.tax);
      setSum('sumSenderEmail',state.sender.email);setSum('sumSenderPhone',state.sender.phone);
      setSum('sumSenderWeb',state.sender.web);
      setSum('sumClientName',state.client.name);setSum('sumClientCompany',state.client.company);
      setSum('sumClientEmail',state.client.email);setSum('sumClientPhone',state.client.phone);
      setSum('sumQuoteTitle',state.title,'Cotización');setSum('sumQuoteNumber',state.number);
      setSum('sumQuoteDate',state.date?dateFmt(state.date):'');
      setSum('sumValidDays',(state.validDays||0)+' días');
      var cur=el('currency');setSum('sumCurrency',cur?cur.options[cur.selectedIndex].text.split(' ')[0]:state.currency,state.currency);
      setSum('sumDiscount',(state.discount||0)+'%');setSum('sumTax',(state.tax||0)+'%');
      setSum('sumNotes',state.notes,'Sin notas');
      var sl=el('sumLogoThumb');
      if(sl){
        if(state.logo){sl.innerHTML='<img src="'+state.logo+'" alt="logo" />';}
        else{sl.innerHTML='<i class="fa-regular fa-image"></i>';}
      }
      setSum('sumLogoTxt',state.logo?'Logo aplicado':'Sin logo','Sin logo');
    }
    /* Refrescar resúmenes ante cualquier cambio en los formularios */
    document.addEventListener('input',function(){safe(renderSummaries);});
    document.addEventListener('change',function(){safe(renderSummaries);});

    /* ═══════════════════════════════════════════════
       CARRUSELES (diseños / paletas / texturas)
       ═══════════════════════════════════════════════ */
    function wireCarousel(trackId,prevId,nextId){
      var track=el(trackId);if(!track)return;
      function step(dir){
        var w=track.clientWidth||280;
        try{track.scrollBy({left:dir*w*0.8,behavior:'smooth'});}
        catch(e){track.scrollLeft+=dir*w*0.8;}
      }
      on(prevId,'click',function(){step(-1);});
      on(nextId,'click',function(){step(1);});
    }

    /* ═══════════════════════════════════════════════
       TECLADO: la API virtualKeyboard da el rect exacto del teclado y
       evita que el layout se reencoga (cero deslizamiento). Fallback:
       pin al viewport visual. Último recurso: nativo.
       ═══════════════════════════════════════════════ */
    function vkApi(){try{return navigator.virtualKeyboard||null;}catch(e){return null;}}
    function vkOverlay(on){
      var vk=vkApi();if(!vk)return;
      try{vk.overlaysContent=!!on;}catch(e){}
    }
    function vkKbHeight(){
      try{
        var vk=vkApi();
        if(vk&&vk.boundingRect&&vk.boundingRect.height)return Math.round(vk.boundingRect.height);
      }catch(e){}
      return 0;
    }
    function fitModalToKeyboard(){
      var box=document.querySelector('.fm-backdrop.open .fm-box');
      if(!box)return;
      try{
        var vv=window.visualViewport;
        if(vv&&vv.height)box.style.maxHeight=Math.max(220,Math.round(vv.height*0.92))+'px';
      }catch(e){}
    }
    /* Fija el telón al viewport VISUAL: aunque el teclado no encoja el
       layout (adjustPan/WebView), el modal queda pegado sobre el teclado. */
    function pinModalToVisual(){
      var bd=document.querySelector('.fm-backdrop.open');
      if(!bd)return;
      try{
        var vv=window.visualViewport;
        if(!vv||!vv.height)return;
        var layoutH=window.innerHeight||0;
        if(layoutH&&vv.height<layoutH*0.92){
          bd.style.top=Math.round(vv.offsetTop||0)+'px';
          bd.style.height=Math.round(vv.height)+'px';
          bd.style.bottom='auto';
        }else{
          bd.style.top='';bd.style.height='';bd.style.bottom='';
        }
      }catch(e){}
    }
    function adjustModalForKeyboard(){
      /* Vía 1 (determinista): rect exacto del teclado, sin reflow del layout */
      try{
        var kbH=vkKbHeight();
        if(kbH>40){
          var bd2=document.querySelector('.fm-backdrop.open');
          var box2=bd2?bd2.querySelector('.fm-box'):null;
          if(bd2&&box2){
            bd2.style.top='';bd2.style.height='';
            bd2.style.bottom=kbH+'px';
            var room=(window.innerHeight||0)-kbH-24;
            box2.style.maxHeight=Math.max(220,room)+'px';
            return;
          }
        }
      }catch(e){}
      /* Vía 2: pin al viewport visual */
      pinModalToVisual();fitModalToKeyboard();
    }
    /* Asentamiento ÚNICO con debounce: durante la animación del teclado el
       viewport se mueve muchas veces; ajustar una sola vez al final evita
       que el modal "persiga" esos movimientos y se deslice. */
    var kbSettleT=null;
    function scheduleModalSettle(ms){
      try{if(kbSettleT)clearTimeout(kbSettleT);}catch(e){}
      kbSettleT=setTimeout(function(){safe(adjustModalForKeyboard);},ms||150);
    }
    function clearModalFit(b){
      try{
        if(kbSettleT)clearTimeout(kbSettleT);
        var box=b.querySelector?b.querySelector('.fm-box'):null;if(box)box.style.maxHeight='';
        if(b.classList&&b.classList.contains('fm-backdrop')){b.style.top='';b.style.height='';b.style.bottom='';}
        else{var bd=b.closest?b.closest('.fm-backdrop'):null;if(bd){bd.style.top='';bd.style.height='';bd.style.bottom='';}}
      }catch(e){}
    }
    try{
      if(window.visualViewport){
        window.visualViewport.addEventListener('resize',function(){scheduleModalSettle(150);});
      }
    }catch(e){}
    /* Re-pin al asentarse el layout (teclado abriendo/cerrando) */
    window.addEventListener('resize',function(){
      if(document.querySelector('.fm-backdrop.open'))scheduleModalSettle(150);
    });
    document.addEventListener('focusin',function(e){
      var t=e.target;
      if(t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.tagName==='SELECT')){
        /* Sincrónico: muestra el campo en la caja ANTES de que Chrome decida
           panear el viewport (ese paneo es el "deslizamiento hacia abajo"). */
        try{if(t.scrollIntoView)t.scrollIntoView({block:'nearest'});}catch(_){}
        scheduleModalSettle(350);
      }
    });

    var qn=el('quoteNumber');if(qn)qn.value=state.number;
    var qd=el('quoteDate');if(qd)qd.value=state.date;
    safe(buildNav);safe(renderPalettes);safe(renderTextures);safe(renderDesignThumbs);safe(drawLogo);
    safe(renderItems);safe(renderTotals);safe(renderPreviewNow);safe(updateFooter);safe(centerTab);safe(renderSummaries);
    wireCarousel('designTrack','dPrev','dNext');
    wireCarousel('paletteTrack','pPrev','pNext');
    wireCarousel('textureTrack','tPrev','tNext');
    wireCarousel('itemsTrack','iPrev','iNext');
    window.addEventListener('resize',function(){safe(fitPreview);});
    if(document.fonts&&document.fonts.ready){try{document.fonts.ready.then(function(){safe(centerTab);safe(fitPreview);});}catch(e){}}
    window.addEventListener('resize',function(){safe(centerTab);});
  /* Pausa de auroras con pestaña oculta (ahorro GPU, evita parpadeo al volver) */
  document.addEventListener('visibilitychange',function(){
    document.documentElement.classList.toggle('tabs-hidden',document.hidden);
    document.body.classList.toggle('cotizador-paused',document.hidden);
  });
  /* Aplicar paused state inicial si la pestaña está oculta */
  if(document.hidden)document.body.classList.add('cotizador-paused');
  /* Loader: ocultar cuando todo esté listo */
  window.addEventListener('load',function(){
    setTimeout(function(){
      var l=document.getElementById('pageLoader');
      if(l)l.classList.add('hidden');
    },300);
  });
  setTimeout(function(){safe(centerTab);},50);
  window.addEventListener('load',function(){safe(centerTab);});
  /* Diagnóstico ?debug o #debug: métricas vivas del viewport + teclado */
  try{
    if(location.search.indexOf('debug')>-1||location.hash==='#debug'){
      var dd=document.createElement('div');
      dd.style.cssText='position:fixed;top:0;left:0;z-index:99999;background:#000;color:#0f0;font:11px/1.5 monospace;padding:6px 8px;opacity:.92;pointer-events:none;white-space:pre;';
      document.body.appendChild(dd);
      setInterval(function(){
        try{
          var vv=window.visualViewport,kbH=0,vk=false;
          try{if(navigator.virtualKeyboard){vk=true;if(navigator.virtualKeyboard.boundingRect)kbH=Math.round(navigator.virtualKeyboard.boundingRect.height);}}catch(e){}
          dd.textContent='IH='+window.innerHeight+' VV='+(vv?Math.round(vv.height):'-')+' off='+(vv?Math.round(vv.offsetTop):'-')+' kbAPI='+vk+' kbH='+kbH+' modal='+document.querySelectorAll('.fm-backdrop.open').length;
        }catch(e){}
      },300);
    }
  }catch(e){}
})();
