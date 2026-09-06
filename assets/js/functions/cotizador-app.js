/* CodeKat · assets/js/functions/cotizador-app.js — extraído de cotizador.html */
  (function(){
    'use strict';
    function el(id){return document.getElementById(id);}

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
      {key:'marco', name:'Marco'}
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
      {key:'teal', name:'Teal', primary:'#0D9488', secondary:'#5EEAD4', accent:'#0F766E'}
    ];

    var state={
      title:'Cotización',
      number:'COT-'+new Date().getFullYear()+'-'+String(Math.floor(Math.random()*900)+100),
      date:new Date().toISOString().slice(0,10),
      validDays:15, currency:'$', notes:'', logo:null, design:'moderno',
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
      return name+'.'+ext;
    }

    /* WIZARD NAV */
    var currentStep=0,navBtns=[];
    function buildNav(){
      var nav=el('wizardNav');nav.innerHTML='';
      var ind=document.createElement('span');ind.className='nav-indicator';ind.id='navIndicator';nav.appendChild(ind);
      STEPS.forEach(function(s,i){
        var b=document.createElement('button');
        b.className='wtab'+(i===0?' active':'');b.setAttribute('role','tab');
        b.innerHTML='<i class="fa-solid '+s.icon+'"></i><span>'+s.label+'</span>';
        b.addEventListener('click',function(){goToStep(i);});
        nav.appendChild(b);navBtns.push(b);
      });
    }
    function moveIndicator(){
      var b=navBtns[currentStep];if(!b)return;
      var ind=el('navIndicator');
      ind.style.left=b.offsetLeft+'px';ind.style.width=b.offsetWidth+'px';
    }
    function goToStep(n){
      if(n<0||n>=STEPS.length)return;
      var dir=n>currentStep?'fwd':'back';currentStep=n;
      var panels=document.querySelectorAll('.wpanel');
      panels.forEach(function(p){p.classList.remove('active','from-left','from-right');});
      panels[n].classList.add('active',dir==='fwd'?'from-right':'from-left');
      navBtns.forEach(function(b,i){b.classList.toggle('active',i===n);});
      moveIndicator();
      try{navBtns[n].scrollIntoView({behavior:'smooth',inline:'center',block:'nearest'});}catch(e){}
      updateFooter();
      if(STEPS[n].key==='preview'){renderPreview();}
      if(STEPS[n].key==='descarga'){renderTotals();}
      if(STEPS[n].key==='diseno'){renderDesignThumbs();}
      window.scrollTo({top:0,behavior:'smooth'});
    }
    function updateFooter(){
      setTxt('stepNow',currentStep+1);setTxt('stepTotal',STEPS.length);
      el('progressBar').style.width=((currentStep+1)/STEPS.length*100)+'%';
      el('prevBtn').disabled=currentStep===0;el('nextBtn').disabled=currentStep===STEPS.length-1;
    }

    /* CAMBIO 2: prevenir fuga del clic y retener foco en el botón */
    el('prevBtn').addEventListener('click',function(e){
      e.preventDefault();
      this.focus();
      goToStep(currentStep-1);
    });
    el('nextBtn').addEventListener('click',function(e){
      e.preventDefault();
      this.focus();
      goToStep(currentStep+1);
    });

    var wfWrap=el('wizardFooterWrap'),siteFooter=el('siteFooter');
    function positionWizardFooter(){
      if(!siteFooter||!wfWrap)return;
      if(window.innerWidth >= 768){
        wfWrap.style.bottom='';
        return;
      }
      var r=siteFooter.getBoundingClientRect();
      var overlap=window.innerHeight - r.top;
      wfWrap.style.bottom=(overlap>0?(overlap+12):12)+'px';
    }
    window.addEventListener('scroll',positionWizardFooter,{passive:true});
    window.addEventListener('resize',function(){moveIndicator();positionWizardFooter();});

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
      var wrap=el('itemsList');wrap.innerHTML='';
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
      editingItemId=(mode==='edit')?id:null;
      el('itemModalTitle').innerHTML=(mode==='edit')?'<i class="fa-solid fa-pen"></i> Editar ítem':'<i class="fa-solid fa-list-check"></i> Agregar ítem';
      var it=(mode==='edit')?findItem(id):null;
      el('itemModalName').value=it?it.name:'';
      el('itemModalDesc').value=it?it.description:'';
      el('itemModalQty').value=it?it.qty:1;
      el('itemModalPrice').value=it?it.price:0;
      itemBackdrop.classList.add('open');itemBackdrop.setAttribute('aria-hidden','false');
      setTimeout(function(){el('itemModalName').focus();},100);
    }
    function closeItemModal(){itemBackdrop.classList.remove('open');itemBackdrop.setAttribute('aria-hidden','true');editingItemId=null;}
    el('openItemModal').addEventListener('click',function(){openItemModal('add');});
    el('itemClose').addEventListener('click',closeItemModal);
    el('itemCancel').addEventListener('click',closeItemModal);
    itemBackdrop.addEventListener('click',function(e){if(e.target===itemBackdrop)closeItemModal();});
    el('itemSave').addEventListener('click',function(){
      var name=el('itemModalName').value.trim();
      if(!name){showToast('Escribe un concepto');return;}
      var desc=el('itemModalDesc').value.trim();
      var qty=parseFloat(el('itemModalQty').value)||1;
      var price=parseFloat(el('itemModalPrice').value)||0;
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
      var ctx=canvas.getContext('2d');var w=canvas.width,h=canvas.height;
      ctx.clearRect(0,0,w,h);
      var initials=(el('lmInitials').value||'CK').toUpperCase();
      var bg=el('lmBg').value,txt=el('lmText').value;
      var shape=el('lmShape').value,style=el('lmStyle').value;
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
    function openLm(){lmBackdrop.classList.add('open');lmBackdrop.setAttribute('aria-hidden','false');drawLogo();}
    function closeLm(){lmBackdrop.classList.remove('open');lmBackdrop.setAttribute('aria-hidden','true');}
    el('openLogoMaker').addEventListener('click',openLm);
    el('lmClose').addEventListener('click',closeLm);
    lmBackdrop.addEventListener('click',function(e){if(e.target===lmBackdrop)closeLm();});
    ['lmInitials','lmBg','lmText','lmShape','lmStyle'].forEach(function(id){el(id).addEventListener('input',drawLogo);});
    el('lmUse').addEventListener('click',function(){
      state.logo=el('lmCanvas').toDataURL('image/png');
      el('logoThumb').innerHTML='<img src="'+state.logo+'" alt="logo" />';
      renderPreview();closeLm();showToast('Logo creado y aplicado');
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
        marco:{topStyle:'background:#fff;color:#1a1a2e;border:2px solid '+p+';',logo:'background:'+p+';color:#fff;',title:'#1a1a2e',sub:'#888',meta:'#888'}
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
      var g=el('designGrid');g.innerHTML='';
      DESIGNS.forEach(function(d){
        var b=document.createElement('button');
        b.className='design-opt'+(d.key===state.design?' selected':'');
        b.innerHTML='<span class="design-thumb-wrap">'+buildDesignThumb(d.key)+'</span><span class="design-name">'+d.name+'</span>';
        b.addEventListener('click',function(){state.design=d.key;renderDesignThumbs();renderPreview();});
        g.appendChild(b);
      });
    }

    function renderPalettes(){
      var r=el('paletteRow');r.innerHTML='';
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
      var t=totals();var c=state.colors;var s=state.sender;var cl=state.client;
      var rows=state.items.map(function(it){
        return '<tr><td>'+esc(it.name)+(it.description?'<br><span style="font-size:.68rem;color:#999;">'+esc(it.description)+'</span>':'')+'</td>'+
          '<td class="r">'+it.qty+'</td><td class="r">'+fmt(it.price)+'</td><td class="r" style="font-weight:600;">'+fmt(it.qty*it.price)+'</td></tr>';
      }).join('')||'<tr><td colspan="4" style="text-align:center;color:#999;">Sin ítems</td></tr>';
      var html=buildHeader()+
        '<div class="qd-body" style="padding-top:1.25rem;">'+
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
      el('quoteDoc').innerHTML=html;
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
      L.push('  '+state.title.toUpperCase());L.push('  '+(s.name||''));
      L.push('======================================');
      L.push('N° '+state.number+'   Fecha: '+dateFmt(state.date)+'   Válida por '+state.validDays+' días');
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
      rows.push(['Cotización',state.number]);rows.push(['Título',state.title]);rows.push(['Fecha',dateFmt(state.date)]);rows.push(['Válida por',state.validDays+' días']);rows.push([]);
      rows.push(['Emisor',s.name||'']);rows.push(['Emisor ID',s.tax||'']);rows.push(['Emisor correo',s.email||'']);rows.push(['Emisor teléfono',s.phone||'']);rows.push([]);
      rows.push(['Cliente',cl.name||'']);rows.push(['Cliente empresa',cl.company||'']);rows.push(['Cliente correo',cl.email||'']);rows.push(['Cliente teléfono',cl.phone||'']);rows.push([]);
      rows.push(['Concepto','Descripción','Cantidad','Precio unitario','Total']);
      state.items.forEach(function(it){rows.push([it.name,it.description,it.qty,it.price,it.qty*it.price]);});
      rows.push([]);
      rows.push(['Subtotal','','','',t.sub]);rows.push(['Descuento '+state.discount+'%','','','',-t.disc]);rows.push(['Impuesto '+state.tax+'%','','','',t.tax]);rows.push(['TOTAL','','','',t.total]);
      return '\uFEFF'+rows.map(function(r){return r.map(function(x){return '"'+String(x==null?'':x).replace(/"/g,'""')+'"';}).join(',');}).join('\r\n');
    }
    el('btnTXT').addEventListener('click',function(){if(download(getFileName('txt'),buildText(),'text/plain;charset=utf-8'))showToast('TXT descargado');});
    el('btnExcel').addEventListener('click',function(){if(download(getFileName('csv'),buildCSV(),'text/csv;charset=utf-8'))showToast('Excel (CSV) descargado');});
    el('btnPrint').addEventListener('click',function(){renderPreview();window.print();});
    el('btnEmail').addEventListener('click',function(){
      var to=state.client.email||state.sender.email||'';
      var subject=encodeURIComponent(state.title+' '+state.number+' — '+(state.sender.name||''));
      var body=encodeURIComponent(buildText()+'\n\n(Adjunte el PDF descargado para más detalle.)');
      window.location.href='mailto:'+to+'?subject='+subject+'&body='+body;
      showToast('Abriendo tu correo…');
    });
    el('btnPDF').addEventListener('click',function(){
      if(!window.jspdf){showToast('Cargando librería PDF…');return;}
      var jsPDF=window.jspdf.jsPDF;
      var doc=new jsPDF({unit:'pt',format:'a4'});
      var c=state.colors;var t=totals();var s=state.sender;var cl=state.client;
      function hex(h){h=h.replace('#','');return[parseInt(h.substr(0,2),16),parseInt(h.substr(2,2),16),parseInt(h.substr(4,2),16)];}
      var pr=hex(c.primary),ac=hex(c.accent);
      doc.setFillColor(pr[0],pr[1],pr[2]);doc.rect(0,0,595,110,'F');
      doc.setFillColor(ac[0],ac[1],ac[2]);doc.rect(0,104,595,6,'F');
      doc.setTextColor(255,255,255);doc.setFontSize(20);doc.setFont(undefined,'bold');
      doc.text(state.title,40,50);
      doc.setFontSize(10);doc.setFont(undefined,'normal');doc.text(s.name||'',40,70);
      doc.setFontSize(9);
      doc.text('N° '+state.number,555,40,{align:'right'});
      doc.text('Fecha: '+dateFmt(state.date),555,55,{align:'right'});
      doc.text('Válida por '+state.validDays+' días',555,70,{align:'right'});
      if(state.logo){try{doc.addImage(state.logo,'PNG',480,18,75,75);}catch(e){}}
      doc.setTextColor(60,60,60);doc.setFontSize(10);doc.setFont(undefined,'bold');
      doc.text('EMITIDO POR',40,140);doc.text('CLIENTE',320,140);
      doc.setFont(undefined,'normal');doc.setTextColor(80,80,80);
      var sy=158,cy=158;
      doc.text(s.name||'—',40,sy);sy+=16;
      if(s.tax){doc.text('ID: '+s.tax,40,sy);sy+=16;}
      if(s.email){doc.text(s.email,40,sy);sy+=16;}
      if(s.phone){doc.text(s.phone,40,sy);sy+=16;}
      if(s.web){doc.text(s.web,40,sy);sy+=16;}
      doc.text(cl.name||'—',320,cy);cy+=16;
      if(cl.company){doc.text(cl.company,320,cy);cy+=16;}
      if(cl.email){doc.text(cl.email,320,cy);cy+=16;}
      if(cl.phone){doc.text(cl.phone,320,cy);cy+=16;}
      var body=state.items.map(function(it){return[it.name+(it.description?'\n'+it.description:''),it.qty,fmt(it.price),fmt(it.qty*it.price)];});
      doc.autoTable({
        startY:Math.max(sy,cy)+15,
        head:[['Concepto','Cant.','Precio unit.','Total']],body:body,
        theme:'striped',headStyles:{fillColor:pr,fontSize:9},
        styles:{fontSize:9,cellPadding:6},
        columnStyles:{1:{halign:'right'},2:{halign:'right'},3:{halign:'right'}},
        margin:{left:40,right:40}
      });
      var y=doc.lastAutoTable.finalY+25;
      doc.setFontSize(10);doc.setTextColor(80,80,80);
      doc.text('Subtotal:',420,y);doc.text(fmt(t.sub),555,y,{align:'right'});
      doc.text('Descuento ('+state.discount+'%):',420,y+16);doc.text('-'+fmt(t.disc),555,y+16,{align:'right'});
      doc.text('Impuesto ('+state.tax+'%):',420,y+32);doc.text(fmt(t.tax),555,y+32,{align:'right'});
      doc.setFontSize(13);doc.setFont(undefined,'bold');doc.setTextColor(ac[0],ac[1],ac[2]);
      doc.text('TOTAL:',420,y+55);doc.text(fmt(t.total),555,y+55,{align:'right'});
      if(state.notes){doc.setFontSize(9);doc.setFont(undefined,'normal');doc.setTextColor(120,120,120);doc.text('Notas: '+state.notes,40,y+75,{maxWidth:515});}
      doc.setFontSize(8);doc.setTextColor(140,140,140);
      doc.text((s.name||'Cotización')+' · '+(s.email||'')+' '+(s.phone||''),40,820);
      doc.save(getFileName('pdf'));showToast('PDF descargado');
    });

    ['senderName','senderTax','senderEmail','senderPhone','senderWeb'].forEach(function(id){
      var k=id.replace('sender','').toLowerCase();
      el(id).addEventListener('input',function(e){state.sender[k]=e.target.value;renderPreview();});
    });
    ['clientName','clientCompany','clientEmail','clientPhone'].forEach(function(id){
      var k=id.replace('client','').toLowerCase();
      el(id).addEventListener('input',function(e){state.client[k]=e.target.value;renderPreview();});
    });
    el('quoteTitle').addEventListener('input',function(e){state.title=e.target.value;renderPreview();});
    el('quoteNumber').addEventListener('input',function(e){state.number=e.target.value;renderPreview();});
    el('quoteDate').addEventListener('input',function(e){state.date=e.target.value;renderPreview();});
    el('validDays').addEventListener('input',function(e){state.validDays=parseInt(e.target.value)||0;renderPreview();});
    el('currency').addEventListener('change',function(e){state.currency=e.target.value;renderItems();renderTotals();renderPreview();});
    el('quoteNotes').addEventListener('input',function(e){state.notes=e.target.value;renderPreview();});
    el('discountInput').addEventListener('input',function(e){state.discount=Math.max(0,Math.min(100,parseFloat(e.target.value)||0));renderTotals();renderPreview();});
    el('taxInput').addEventListener('input',function(e){state.tax=Math.max(0,Math.min(100,parseFloat(e.target.value)||0));renderTotals();renderPreview();});
    ['Primary','Secondary','Accent'].forEach(function(s){
      el('color'+s).addEventListener('input',function(e){state.colors[s.toLowerCase()]=e.target.value;selectedPalette='';renderPalettes();renderDesignThumbs();renderPreview();});
    });
    el('logoInput').addEventListener('change',function(e){
      var f=e.target.files[0];if(!f)return;
      var r=new FileReader();
      r.onload=function(){state.logo=r.result;el('logoThumb').innerHTML='<img src="'+state.logo+'" alt="logo" />';renderPreview();showToast('Logo cargado');};
      r.readAsDataURL(f);
    });
    el('removeLogo').addEventListener('click',function(){
      state.logo=null;el('logoThumb').innerHTML='<i class="fa-regular fa-image"></i>';
      el('logoInput').value='';renderPreview();showToast('Logo quitado');
    });

    var burger=el('burger'),navMenu=el('navMenu'),menuBack=el('menuBack');
    function isMenuOpen(){return navMenu.classList.contains('open');}
    function openMenu(){navMenu.classList.add('open');burger.classList.add('active');burger.setAttribute('aria-expanded','true');navMenu.setAttribute('aria-hidden','false');document.body.classList.add('menu-open');}
    function closeMenu(){navMenu.classList.remove('open');burger.classList.remove('active');burger.setAttribute('aria-expanded','false');navMenu.setAttribute('aria-hidden','true');document.body.classList.remove('menu-open');}
    burger.addEventListener('click',function(e){e.stopPropagation();isMenuOpen()?closeMenu():openMenu();});
    if(menuBack)menuBack.addEventListener('click',closeMenu);
    document.addEventListener('click',function(e){if(isMenuOpen()&&!navMenu.contains(e.target)&&!burger.contains(e.target))closeMenu();});
    document.addEventListener('keydown',function(e){
      if(e.key==='Escape'){
        if(el('itemBackdrop').classList.contains('open'))closeItemModal();
        else if(el('lmBackdrop').classList.contains('open'))closeLm();
        else if(isMenuOpen())closeMenu();
      }
    });

    var root=document.documentElement,themeIconMini=el('themeIconMini'),themeBtns=document.querySelectorAll('.theme-btn'),themeMini=el('themeToggleMini');
    function setTheme(t){
      if(t==='light'){root.setAttribute('data-theme','light');themeIconMini.className='fa-solid fa-sun';}
      else{root.removeAttribute('data-theme');themeIconMini.className='fa-solid fa-moon';}
      themeBtns.forEach(function(b){b.classList.toggle('active',b.getAttribute('data-theme-set')===t);});
      try{localStorage.setItem('codekat-theme',t);}catch(e){}
    }
    var savedTheme='dark';try{savedTheme=localStorage.getItem('codekat-theme')||'dark';}catch(e){}
    setTheme(savedTheme);
    themeBtns.forEach(function(b){b.addEventListener('click',function(){setTheme(b.getAttribute('data-theme-set'));});});
    if(themeMini)themeMini.addEventListener('click',function(){setTheme(root.getAttribute('data-theme')==='light'?'dark':'light');});

    el('quoteNumber').value=state.number;
    el('quoteDate').value=state.date;
    buildNav();renderPalettes();renderDesignThumbs();drawLogo();
    renderItems();renderTotals();renderPreview();updateFooter();positionWizardFooter();
    setTimeout(moveIndicator,50);
    window.addEventListener('load',function(){moveIndicator();positionWizardFooter();});
  })();
