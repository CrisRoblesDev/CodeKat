/* CodeKat · assets/js/functions/remuneracion-app.js — extraído de remuneracion.html */
  (function(){
    'use strict';
    function el(id){return document.getElementById(id);}

    /* =========================================================
       TASAS LEGALES CON SELECTORES POR PAÍS
       Cada país puede tener selectores (AFP, salud, etc.)
       con opciones que tienen tasas distintas.
       ========================================================= */
    var TASAS_LEGALES = {
      CL:{
        selectores:[
          {key:'afp',label:'¿En qué AFP estás?',options:[
            {key:'capital',label:'AFP Capital (11,44%)',tasa:0.1144},
            {key:'cuprum',label:'AFP Cuprum (11,44%)',tasa:0.1144},
            {key:'habitat',label:'AFP Habitat (11,27%)',tasa:0.1127},
            {key:'modelo',label:'AFP Modelo (10,58%)',tasa:0.1058},
            {key:'planvital',label:'AFP PlanVital (11,16%)',tasa:0.1116},
            {key:'provida',label:'AFP Provida (11,45%)',tasa:0.1145},
            {key:'uno',label:'AFP Uno (10,69%)',tasa:0.1069}
          ]},
          {key:'salud',label:'¿Qué sistema de salud tienes?',options:[
            {key:'fonasa',label:'Fonasa (7%)',tasa:0.07},
            {key:'isapre',label:'Isapre (7%)',tasa:0.07}
          ]}
        ],
        aportesFijos:[{label:'Seguro de cesantía',tasa:0.006}],
        horaExtraOrd:1.5,horaExtraNoct:1.5,horaExtraFest:2.0,horaExtraFestNoct:2.0,recargoNocturno:1.25,
        impuestoTramos:[{hasta:900360,tasa:0},{hasta:1997376,tasa:0.04},{hasta:3328956,tasa:0.08},{hasta:4660548,tasa:0.135},{hasta:5992128,tasa:0.23},{hasta:11318520,tasa:0.304},{hasta:18864180,tasa:0.35},{hasta:Infinity,tasa:0.40}]
      },
      AR:{
        selectores:[
          {key:'obraSocial',label:'¿Tienes obra social?',options:[
            {key:'os',label:'Obra social (3%)',tasa:0.03},
            {key:'sinOs',label:'Sin obra social',tasa:0}
          ]}
        ],
        aportesFijos:[{label:'Jubilación (SIPA)',tasa:0.11}],
        horaExtraOrd:1.5,horaExtraNoct:1.5,horaExtraFest:2.0,horaExtraFestNoct:2.0,recargoNocturno:1.0,
        impuestoTramos:[{hasta:Infinity,tasa:0}]
      },
      PE:{
        selectores:[
          {key:'pensiones',label:'¿En qué sistema de pensiones estás?',options:[
            {key:'integra',label:'AFP Integra (12,27%)',tasa:0.1227},
            {key:'prima',label:'Prima AFP (12,60%)',tasa:0.1260},
            {key:'habitat',label:'AFP Habitat (11,90%)',tasa:0.1190},
            {key:'profuturo',label:'Profuturo AFP (12,45%)',tasa:0.1245},
            {key:'onp',label:'ONP (13%)',tasa:0.13}
          ]}
        ],
        aportesFijos:[],
        horaExtraOrd:1.5,horaExtraNoct:1.5,horaExtraFest:2.0,horaExtraFestNoct:2.0,recargoNocturno:1.0,
        impuestoTramos:[{hasta:144900,tasa:0.08},{hasta:627900,tasa:0.14},{hasta:1110600,tasa:0.17},{hasta:1593300,tasa:0.20},{hasta:Infinity,tasa:0.30}]
      },
      MX:{
        selectores:[
          {key:'afore',label:'¿En qué Afore estás?',options:[
            {key:'afore',label:'Afore (SAR 2%)',tasa:0.02},
            {key:'sinAfore',label:'Sin Afore',tasa:0}
          ]}
        ],
        aportesFijos:[{label:'IMSS (cuota obrera)',tasa:0.02875}],
        horaExtraOrd:2.0,horaExtraNoct:2.0,horaExtraFest:3.0,horaExtraFestNoct:3.0,recargoNocturno:1.25,
        impuestoTramos:[{hasta:10000,tasa:0.0192},{hasta:85000,tasa:0.064},{hasta:150000,tasa:0.1088},{hasta:180000,tasa:0.16},{hasta:500000,tasa:0.2136},{hasta:Infinity,tasa:0.30}]
      },
      CO:{
        selectores:[
          {key:'fondoPension',label:'¿En qué fondo de pensión estás?',options:[
            {key:'colpensiones',label:'Colpensiones (4%)',tasa:0.04},
            {key:'porvenir',label:'Porvenir (4%)',tasa:0.04},
            {key:'proteccion',label:'Protección (4%)',tasa:0.04},
            {key:'colfondos',label:'Colfondos (4%)',tasa:0.04}
          ]}
        ],
        aportesFijos:[{label:'Salud',tasa:0.04}],
        horaExtraOrd:1.25,horaExtraNoct:1.75,horaExtraFest:2.0,horaExtraFestNoct:2.5,recargoNocturno:1.35,
        impuestoTramos:[{hasta:50520000,tasa:0},{hasta:72000000,tasa:0.19},{hasta:156000000,tasa:0.28},{hasta:360000000,tasa:0.33},{hasta:Infinity,tasa:0.39}]
      },
      UY:{
        selectores:[
          {key:'afap',label:'¿En qué AFAP estás?',options:[
            {key:'afap',label:'AFAP (5%)',tasa:0.05},
            {key:'sinAfap',label:'Solo BPS',tasa:0}
          ]}
        ],
        aportesFijos:[{label:'BPS (jubilación)',tasa:0.15},{label:'FONASA (salud)',tasa:0.06}],
        horaExtraOrd:1.5,horaExtraNoct:1.5,horaExtraFest:2.0,horaExtraFestNoct:2.0,recargoNocturno:1.20,
        impuestoTramos:[{hasta:696000,tasa:0},{hasta:1008000,tasa:0.10},{hasta:1560000,tasa:0.15},{hasta:2400000,tasa:0.24},{hasta:Infinity,tasa:0.36}]
      },
      EC:{selectores:[],aportesFijos:[{label:'IESS (aporto personal)',tasa:0.0945}],horaExtraOrd:1.5,horaExtraNoct:1.75,horaExtraFest:2.0,horaExtraFestNoct:2.5,recargoNocturno:1.25,impuestoTramos:[{hasta:11706,tasa:0},{hasta:14933,tasa:0.05},{hasta:19440,tasa:0.10},{hasta:27530,tasa:0.12},{hasta:Infinity,tasa:0.35}]},
      BO:{selectores:[],aportesFijos:[{label:'Gestora (jubilación)',tasa:0.1289},{label:'Aporte solidario',tasa:0.01}],horaExtraOrd:2.0,horaExtraNoct:2.0,horaExtraFest:2.0,horaExtraFestNoct:3.0,recargoNocturno:1.30,impuestoTramos:[{hasta:156000,tasa:0},{hasta:240000,tasa:0.13},{hasta:600000,tasa:0.16},{hasta:Infinity,tasa:0.25}]},
      PY:{selectores:[],aportesFijos:[{label:'IPS (jubilación + salud)',tasa:0.095}],horaExtraOrd:1.5,horaExtraNoct:1.75,horaExtraFest:2.0,horaExtraFestNoct:2.5,recargoNocturno:1.30,impuestoTramos:[{hasta:36000000,tasa:0},{hasta:180000000,tasa:0.08},{hasta:540000000,tasa:0.09},{hasta:Infinity,tasa:0.10}]},
      VE:{selectores:[],aportesFijos:[{label:'SSO',tasa:0.04},{label:'FAOV (vivienda)',tasa:0.01},{label:'INCES',tasa:0.005}],horaExtraOrd:1.5,horaExtraNoct:1.6,horaExtraFest:2.0,horaExtraFestNoct:2.5,recargoNocturno:1.30,impuestoTramos:[{hasta:12000,tasa:0},{hasta:30000,tasa:0.06},{hasta:54000,tasa:0.09},{hasta:Infinity,tasa:0.34}]}
    };

    var COUNTRIES = {
      CL:{name:'Chile',flag:'🇨🇱',symbol:'$',locale:'es-CL',weeklyHours:45},
      AR:{name:'Argentina',flag:'🇦🇷',symbol:'$',locale:'es-AR',weeklyHours:48},
      PE:{name:'Perú',flag:'🇵🇪',symbol:'S/',locale:'es-PE',weeklyHours:48},
      MX:{name:'México',flag:'🇲🇽',symbol:'$',locale:'es-MX',weeklyHours:48},
      CO:{name:'Colombia',flag:'🇨🇴',symbol:'$',locale:'es-CO',weeklyHours:47},
      UY:{name:'Uruguay',flag:'🇺🇾',symbol:'$',locale:'es-UY',weeklyHours:44},
      EC:{name:'Ecuador',flag:'🇪🇨',symbol:'$',locale:'es-EC',weeklyHours:40},
      BO:{name:'Bolivia',flag:'🇧🇴',symbol:'Bs',locale:'es-BO',weeklyHours:48},
      PY:{name:'Paraguay',flag:'🇵🇾',symbol:'₲',locale:'es-PY',weeklyHours:48},
      VE:{name:'Venezuela',flag:'🇻🇪',symbol:'Bs.D',locale:'es-VE',weeklyHours:40}
    };

    var STEPS=[
      {key:'pais',label:'País y sueldo',icon:'fa-flag'},
      {key:'extras',label:'Horas extras',icon:'fa-clock'},
      {key:'descuentos',label:'Descuentos',icon:'fa-scissors'},
      {key:'resultado',label:'Resultado',icon:'fa-wallet'}
    ];

    var state={
      country:'CL', salary:'', workerName:'', weeklyHours:'',
      turno:'diurno',
      extraOrd:'',extraNight:'',extraHol:'',extraHolNight:'',
      discounts:[],
      selectorOptions:{}
    };

    function fmt(n){
      var c=COUNTRIES[state.country];
      if(!isFinite(n))n=0;
      try{return c.symbol+' '+Math.round(n).toLocaleString(c.locale);}
      catch(e){return c.symbol+' '+Math.round(n).toLocaleString('es-CL');}
    }
    function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
    function setTxt(id,v){var e=el(id);if(e)e.textContent=v;}
    function showToast(msg){var t=el('toast');el('toastMsg').textContent=msg;t.classList.add('show');clearTimeout(showToast._t);showToast._t=setTimeout(function(){t.classList.remove('show');},2200);}

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
      if(STEPS[n].key==='resultado'){renderResultado();}
      window.scrollTo({top:0,behavior:'smooth'});
    }
    function updateFooter(){
      setTxt('stepNow',currentStep+1);setTxt('stepTotal',STEPS.length);
      el('progressBar').style.width=((currentStep+1)/STEPS.length*100)+'%';
      el('prevBtn').disabled=currentStep===0;el('nextBtn').disabled=currentStep===STEPS.length-1;
      el('nextBtn').innerHTML=currentStep===STEPS.length-1?'<i class="fa-solid fa-check"></i> Listo':'Siguiente <i class="fa-solid fa-arrow-right"></i>';
    }
    el('prevBtn').addEventListener('click',function(e){e.preventDefault();this.focus();goToStep(currentStep-1);});
    el('nextBtn').addEventListener('click',function(e){e.preventDefault();this.focus();goToStep(currentStep+1);});

    var wfWrap=el('wizardFooterWrap'),siteFooter=el('siteFooter');
    function positionWizardFooter(){
      if(!siteFooter||!wfWrap)return;
      if(window.innerWidth >= 768){wfWrap.style.bottom='';return;}
      var r=siteFooter.getBoundingClientRect();
      var overlap=window.innerHeight - r.top;
      wfWrap.style.bottom=(overlap>0?(overlap+12):12)+'px';
    }
    window.addEventListener('scroll',positionWizardFooter,{passive:true});
    window.addEventListener('resize',function(){moveIndicator();positionWizardFooter();});

    /* SELECTOR DE PAÍS */
    function renderCountries(){
      var g=el('countryGrid');g.innerHTML='';
      Object.keys(COUNTRIES).forEach(function(code){
        var c=COUNTRIES[code];
        var b=document.createElement('button');
        b.type='button';
        b.className='country-opt'+(code===state.country?' selected':'');
        b.innerHTML='<span class="country-flag">'+c.flag+'</span><span class="country-name">'+c.name+'</span><span class="country-code">'+c.symbol+'</span>';
        b.addEventListener('click',function(){
          state.country=code;
          state.weeklyHours=c.weeklyHours;
          el('weeklyHours').value=c.weeklyHours;
          // Inicializar opciones de selectores con la primera opción
          var tasas=TASAS_LEGALES[code];
          if(!state.selectorOptions[code]){
            state.selectorOptions[code]={};
            if(tasas.selectores){
              tasas.selectores.forEach(function(sel){
                state.selectorOptions[code][sel.key]=sel.options[0].key;
              });
            }
          }
          renderCountries();
          renderSelectores();
          renderExtraValores();
          renderResultado();
        });
        g.appendChild(b);
      });
    }

    /* SELECTORES DE APORTES (AFP, salud, etc.) */
    function renderSelectores(){
      var wrap=el('selectoresWrap');
      var tasas=TASAS_LEGALES[state.country];
      var card=el('selectoresCard');
      if(!tasas.selectores || !tasas.selectores.length){
        card.style.display='none';
        return;
      }
      card.style.display='';
      var html='<div class="field-grid">';
      tasas.selectores.forEach(function(sel){
        var currentOpt=(state.selectorOptions[state.country] && state.selectorOptions[state.country][sel.key])||sel.options[0].key;
        html+='<div class="field">';
        html+='<label><i class="fa-solid fa-building-columns"></i> '+esc(sel.label)+'</label>';
        html+='<select data-selector="'+sel.key+'">';
        sel.options.forEach(function(opt){
          html+='<option value="'+opt.key+'"'+(opt.key===currentOpt?' selected':'')+'>'+esc(opt.label)+'</option>';
        });
        html+='</select>';
        html+='</div>';
      });
      html+='</div>';
      wrap.innerHTML=html;
      wrap.querySelectorAll('select').forEach(function(selEl){
        selEl.addEventListener('change',function(){
          var selKey=selEl.getAttribute('data-selector');
          if(!state.selectorOptions[state.country])state.selectorOptions[state.country]={};
          state.selectorOptions[state.country][selKey]=selEl.value;
          renderResultado();
        });
      });
    }

    /* Obtener aportes según selectores + aportes fijos */
    function obtenerAportes(){
      var tasas=TASAS_LEGALES[state.country];
      var aportes=[];
      if(tasas.selectores){
        tasas.selectores.forEach(function(sel){
          var currentOptKey=(state.selectorOptions[state.country] && state.selectorOptions[state.country][sel.key])||sel.options[0].key;
          var opt=sel.options.find(function(o){return o.key===currentOptKey;})||sel.options[0];
          if(opt.tasa>0){
            aportes.push({label:opt.label,monto:state.salary*opt.tasa});
          }
        });
      }
      if(tasas.aportesFijos){
        tasas.aportesFijos.forEach(function(a){
          aportes.push({label:a.label,monto:state.salary*a.tasa});
        });
      }
      return aportes;
    }

    el('salaryInput').addEventListener('input',function(e){state.salary=parseFloat(e.target.value)||0;renderExtraValores();renderResultado();});
    el('workerName').addEventListener('input',function(e){state.workerName=e.target.value;});
    el('weeklyHours').addEventListener('input',function(e){state.weeklyHours=parseFloat(e.target.value)||0;renderExtraValores();renderResultado();});

    /* TURNO */
    document.querySelectorAll('.turno-opt').forEach(function(opt){
      opt.addEventListener('click',function(){
        document.querySelectorAll('.turno-opt').forEach(function(o){o.classList.remove('selected');});
        opt.classList.add('selected');
        state.turno=opt.getAttribute('data-turno');
        renderResultado();
      });
    });

    /* HORAS EXTRAS */
    function renderExtraValores(){
      var tasas=TASAS_LEGALES[state.country];
      var horasMes=state.weeklyHours*4.33;
      var valorHora=(state.salary||0)/horasMes;
      el('valorOrd').textContent='= '+fmt(state.extraOrd*valorHora*tasas.horaExtraOrd);
      el('valorNight').textContent='= '+fmt(state.extraNight*valorHora*tasas.horaExtraNoct);
      el('valorHol').textContent='= '+fmt(state.extraHol*valorHora*tasas.horaExtraFest);
      el('valorHolNight').textContent='= '+fmt(state.extraHolNight*valorHora*tasas.horaExtraFestNoct);
    }
    ['extraOrd','extraNight','extraHol','extraHolNight'].forEach(function(id){
      el(id).addEventListener('input',function(e){
        state[id]=parseFloat(e.target.value)||0;
        renderExtraValores();
        renderResultado();
      });
    });

    /* DESCUENTOS */
    function renderDiscounts(){
      var list=el('discountsList');list.innerHTML='';
      if(!state.discounts.length){
        list.innerHTML='<div class="discounts-empty"><i class="fa-regular fa-circle-check" style="color:var(--green);font-size:1.3rem;margin-bottom:.4rem;display:block;"></i>Sin descuentos adicionales. Solo se aplicarán los descuentos legales de tu país.</div>';
        return;
      }
      state.discounts.forEach(function(d,i){
        var item=document.createElement('div');
        item.className='discount-item';
        item.innerHTML='<input type="text" placeholder="Ej: Préstamo empresa" value="'+esc(d.name)+'" data-i="'+i+'" data-k="name"/>'+
          '<input type="number" placeholder="Monto" value="'+d.amount+'" data-i="'+i+'" data-k="amount" min="0" step="1"/>'+
          '<button type="button" data-i="'+i+'" aria-label="Quitar"><i class="fa-solid fa-trash"></i></button>';
        list.appendChild(item);
      });
      list.querySelectorAll('input').forEach(function(inp){
        inp.addEventListener('input',function(){
          var i=parseInt(inp.getAttribute('data-i'));
          var k=inp.getAttribute('data-k');
          state.discounts[i][k]=k==='amount'?(parseFloat(inp.value)||0):inp.value;
          renderResultado();
        });
      });
      list.querySelectorAll('button').forEach(function(btn){
        btn.addEventListener('click',function(){
          var i=parseInt(btn.getAttribute('data-i'));
          state.discounts.splice(i,1);
          renderDiscounts();
          renderResultado();
        });
      });
    }
    el('addDiscount').addEventListener('click',function(){
      state.discounts.push({name:'Descuento',amount:0});
      renderDiscounts();
    });

    /* LIMPIAR FORMULARIO */
    function limpiarFormulario(){
      state={
        country:'CL', salary:'', workerName:'', weeklyHours:'',
        turno:'diurno',
        extraOrd:'',extraNight:'',extraHol:'',extraHolNight:'',
        discounts:[], selectorOptions:{}
      };
      try{localStorage.removeItem('remuneracion_state');}catch(e){}
      var si=el('salaryInput'); if(si) si.value='';
      var wn=el('workerName'); if(wn) wn.value='';
      var wh=el('weeklyHours'); if(wh) wh.value='';
      ['extraOrd','extraNight','extraHol','extraHolNight'].forEach(function(id){var e=el(id); if(e) e.value='';});
      document.querySelectorAll('.turno-opt').forEach(function(o){o.classList.toggle('selected', o.getAttribute('data-turno')==='diurno');});
      document.querySelectorAll('input[type="text"],input[type="number"]').forEach(function(inp){
        if(['salaryInput','workerName','weeklyHours','extraOrd','extraNight','extraHol','extraHolNight'].indexOf(inp.id)===-1){
          if(inp.id && inp.id.indexOf('discount')===-1) inp.value='';
        }
      });
      var dl=el('discountsList'); if(dl) dl.innerHTML='';
      renderCountries();
      renderSelectores();
      renderDiscounts();
      renderExtraValores();
      renderResultado();
      var resBox=document.getElementById('resultadoBox'); if(resBox) resBox.innerHTML='';
      var extraBox=document.getElementById('extraValoresBox'); if(extraBox) extraBox.innerHTML='';
      goToStep(0);
      window.scrollTo({top:0,behavior:'smooth'});
      showToast('Formulario limpiado');
    }
    // Modal confirmación custom (no confirm nativo)
    function showConfirmModal(msg, cb){
      var m=document.getElementById('confirmModal');
      if(!m){
        m=document.createElement('div');
        m.id='confirmModal';
        m.innerHTML='<div style="position:fixed;inset:0;z-index:300;background:rgba(5,5,10,.75);display:grid;place-items:center;padding:1rem;"><div style="background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:1.5rem;max-width:360px;width:100%;text-align:center;box-shadow:0 20px 50px rgba(0,0,0,.5);"><p style="color:var(--white);font-weight:600;margin-bottom:1rem;">'+msg+'</p><div style="display:flex;gap:.6rem;justify-content:center;"><button id="confirmNo" style="flex:1;padding:.6rem;border-radius:10px;border:1px solid var(--border);background:var(--surface-2);color:var(--white);">Cancelar</button><button id="confirmYes" style="flex:1;padding:.6rem;border-radius:10px;background:linear-gradient(135deg,var(--amb-soft),var(--amb-dark));color:#fff;border:none;">Limpiar</button></div></div></div>';
        document.body.appendChild(m);
      } else {
        m.querySelector('p').textContent=msg;
        m.style.display='grid';
      }
      m.style.display='grid';
      m.querySelector('#confirmYes').onclick=function(){m.style.display='none'; cb(true);};
      m.querySelector('#confirmNo').onclick=function(){m.style.display='none'; cb(false);};
      m.onclick=function(e){if(e.target===m) {m.style.display='none'; cb(false);}};
    }
    el('btnLimpiar').addEventListener('click',function(){
      showConfirmModal('¿Limpiar todo el formulario? Se borrarán los datos ingresados.', function(ok){ if(ok) limpiarFormulario(); });
    });

    /* MOTOR DE CÁLCULO */
    function calcular(){
      var tasas=TASAS_LEGALES[state.country];
      var sueldo=state.salary||0;
      var horasMes=state.weeklyHours*4.33;
      var valorHora=sueldo/horasMes;

      var aportes=obtenerAportes();
      var totalAportes=aportes.reduce(function(s,a){return s+a.monto;},0);

      var bonoTurno=0;
      if(state.turno==='nocturno'){bonoTurno=sueldo*(tasas.recargoNocturno-1);}
      else if(state.turno==='mixto'){bonoTurno=sueldo*(tasas.recargoNocturno-1)*0.5;}

      var heOrd=state.extraOrd*valorHora*tasas.horaExtraOrd;
      var heNight=state.extraNight*valorHora*tasas.horaExtraNoct;
      var heHol=state.extraHol*valorHora*tasas.horaExtraFest;
      var heHolNight=state.extraHolNight*valorHora*tasas.horaExtraFestNoct;
      var totalExtras=heOrd+heNight+heHol+heHolNight;

      var extrasDet=[];
      if(heOrd>0)extrasDet.push({label:'Horas extra diurnas ('+state.extraOrd+' h)',monto:heOrd});
      if(heNight>0)extrasDet.push({label:'Horas extra nocturnas ('+state.extraNight+' h)',monto:heNight});
      if(heHol>0)extrasDet.push({label:'Horas extra festivas ('+state.extraHol+' h)',monto:heHol});
      if(heHolNight>0)extrasDet.push({label:'Horas extra festivas nocturnas ('+state.extraHolNight+' h)',monto:heHolNight});
      if(bonoTurno>0)extrasDet.push({label:'Bono por turno '+state.turno,monto:bonoTurno});

      var baseImp=sueldo-totalAportes;
      var impuesto=0, tasaImp=0;
      for(var i=0;i<tasas.impuestoTramos.length;i++){
        var tr=tasas.impuestoTramos[i];
        if(baseImp<=tr.hasta){impuesto=baseImp*tr.tasa;tasaImp=tr.tasa;break;}
      }

      var descuentosExtra=state.discounts.filter(function(d){return d.amount>0;});
      var totalDescExtra=descuentosExtra.reduce(function(s,d){return s+d.amount;},0);

      var brutoTotal=sueldo+totalExtras+bonoTurno;
      var liquido=brutoTotal-totalAportes-impuesto-totalDescExtra;

      return {sueldo:sueldo,valorHora:valorHora,aportes:aportes,totalAportes:totalAportes,extrasDet:extrasDet,totalExtras:totalExtras+bonoTurno,impuesto:impuesto,tasaImp:tasaImp,descuentosExtra:descuentosExtra,totalDescExtra:totalDescExtra,brutoTotal:brutoTotal,liquido:liquido};
    }

    /* RENDER DEL RESULTADO */
    function renderResultado(){
      var c=COUNTRIES[state.country];
      var r=calcular();

      el('resFlag').textContent=c.flag;
      el('resNeto').textContent=fmt(r.liquido);
      var subText = state.workerName?esc(state.workerName)+' · ':'';
      subText += 'Sueldo bruto '+fmt(r.sueldo);
      el('resSub').innerHTML=subText;
      el('apiBadgeText').textContent='Tasas legales actualizadas (2025)';

      var html='';
      html+='<div class="desglose"><div class="desglose-head"><i class="fa-solid fa-plus-circle"></i> Lo que ganas</div>';
      html+='<div class="desglose-row"><span class="label"><i class="fa-solid fa-coins"></i> Sueldo bruto</span><span class="value">'+fmt(r.sueldo)+'</span></div>';
      r.extrasDet.forEach(function(e){
        html+='<div class="desglose-row"><span class="label"><i class="fa-solid fa-circle-plus"></i> '+esc(e.label)+'</span><span class="value plus">+'+fmt(e.monto)+'</span></div>';
      });
      html+='</div>';

      if(r.totalAportes>0){
        html+='<div class="desglose" style="margin-top:.85rem;"><div class="desglose-head"><i class="fa-solid fa-building-columns"></i> Descuentos de ley</div>';
        r.aportes.forEach(function(a){
          html+='<div class="desglose-row"><span class="label"><i class="fa-solid fa-minus-circle"></i> '+esc(a.label)+'</span><span class="value minus">-'+fmt(a.monto)+'</span></div>';
        });
        if(r.impuesto>0){
          html+='<div class="desglose-row"><span class="label"><i class="fa-solid fa-landmark"></i> Impuesto a la renta ('+Math.round(r.tasaImp*100)+'%)</span><span class="value minus">-'+fmt(r.impuesto)+'</span></div>';
        }
        html+='</div>';
      }

      if(r.descuentosExtra.length){
        html+='<div class="desglose" style="margin-top:.85rem;"><div class="desglose-head"><i class="fa-solid fa-scissors"></i> Descuentos adicionales</div>';
        r.descuentosExtra.forEach(function(d){
          html+='<div class="desglose-row"><span class="label"><i class="fa-solid fa-minus-circle"></i> '+esc(d.name)+'</span><span class="value minus">-'+fmt(d.amount)+'</span></div>';
        });
        html+='</div>';
      }

      html+='<div class="desglose" style="margin-top:.85rem;"><div class="desglose-row total"><span class="label"><i class="fa-solid fa-wallet"></i> Líquido a recibir</span><span class="value">'+fmt(r.liquido)+'</span></div></div>';
      el('desgloseWrap').innerHTML=html;

      var total=Math.max(r.brutoTotal,1);
      var pctLiq=Math.round((r.liquido/total)*100);
      var pctAp=Math.round((r.totalAportes/total)*100);
      var pctImp=Math.round((r.impuesto/total)*100);
      var pctDe=Math.round((r.totalDescExtra/total)*100);
      var pctHe=Math.round((r.totalExtras/total)*100);

      var bar='';
      bar+='<div class="chart-simple-seg" style="width:'+pctLiq+'%;background:var(--green);"></div>';
      bar+='<div class="chart-simple-seg" style="width:'+pctHe+'%;background:var(--green-soft);"></div>';
      bar+='<div class="chart-simple-seg" style="width:'+pctAp+'%;background:var(--amb);"></div>';
      if(pctImp>0)bar+='<div class="chart-simple-seg" style="width:'+pctImp+'%;background:var(--amber);"></div>';
      if(pctDe>0)bar+='<div class="chart-simple-seg" style="width:'+pctDe+'%;background:var(--red);"></div>';
      el('chartBar').innerHTML=bar;

      var legend='';
      legend+='<div class="chart-simple-item"><span class="chart-simple-dot" style="background:var(--green);"></span><span class="label">Líquido (lo que recibes)</span><span class="value">'+pctLiq+'%</span></div>';
      if(pctHe>0)legend+='<div class="chart-simple-item"><span class="chart-simple-dot" style="background:var(--green-soft);"></span><span class="label">Horas extras y bonos</span><span class="value">'+pctHe+'%</span></div>';
      legend+='<div class="chart-simple-item"><span class="chart-simple-dot" style="background:var(--amb);"></span><span class="label">Aportes legales</span><span class="value">'+pctAp+'%</span></div>';
      if(pctImp>0)legend+='<div class="chart-simple-item"><span class="chart-simple-dot" style="background:var(--amber);"></span><span class="label">Impuestos</span><span class="value">'+pctImp+'%</span></div>';
      if(pctDe>0)legend+='<div class="chart-simple-item"><span class="chart-simple-dot" style="background:var(--red);"></span><span class="label">Descuentos adicionales</span><span class="value">'+pctDe+'%</span></div>';
      el('chartLegend').innerHTML=legend;
    }

    /* MENÚ / TEMA */
    var burger=el('burger'),navMenu=el('navMenu'),menuBack=el('menuBack');
    function isMenuOpen(){return navMenu.classList.contains('open');}
    function openMenu(){navMenu.classList.add('open');burger.classList.add('active');burger.setAttribute('aria-expanded','true');navMenu.setAttribute('aria-hidden','false');document.body.classList.add('menu-open');}
    function closeMenu(){navMenu.classList.remove('open');burger.classList.remove('active');burger.setAttribute('aria-expanded','false');navMenu.setAttribute('aria-hidden','true');document.body.classList.remove('menu-open');}
    burger.addEventListener('click',function(e){e.stopPropagation();isMenuOpen()?closeMenu():openMenu();});
    if(menuBack)menuBack.addEventListener('click',closeMenu);
    document.addEventListener('click',function(e){if(isMenuOpen()&&!navMenu.contains(e.target)&&!burger.contains(e.target))closeMenu();});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&isMenuOpen())closeMenu();});

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

    /* INIT */
    buildNav();
    renderCountries();
    renderSelectores();
    renderDiscounts();
    renderExtraValores();
    renderResultado();
    updateFooter();
    positionWizardFooter();
    setTimeout(moveIndicator,50);
    window.addEventListener('load',function(){moveIndicator();positionWizardFooter();});
  })();
