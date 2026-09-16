/* CodeKat · assets/js/functions/generador-app.js — extraído de generador.html */
"use strict";
/* ═══ CODEKAT · GENERADOR PRO v5.3 (strings corregidos + fix sección 03) ═══ */
window.onerror=function(msg){try{var t=document.getElementById("toast");if(t){t.innerHTML='<span class="tk" style="color:#FF6B6B">✕</span> '+String(msg).slice(0,140);t.classList.add("show");setTimeout(function(){t.classList.remove("show")},7000)}}catch(e){}};
function $(s){return document.querySelector(s)}
function $$(s){return Array.prototype.slice.call(document.querySelectorAll(s))}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function pick(a){return a[Math.floor(Math.random()*a.length)]}
function hexToRgb(h){h=h.replace("#","");if(h.length===3)h=h.split("").map(function(c){return c+c}).join("");var n=parseInt(h,16);return[(n>>16)&255,(n>>8)&255,n&255]}
function hexA(h,a){var r=hexToRgb(h);return "rgba("+r[0]+","+r[1]+","+r[2]+","+a+")"}
function mix(h1,h2,w){var a=hexToRgb(h1),b=hexToRgb(h2);return "#"+a.map(function(v,i){return Math.round(v+(b[i]-v)*w).toString(16).padStart(2,"0")}).join("")}
function lum(h){var r=hexToRgb(h).map(function(v){v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)});return .2126*r[0]+.7152*r[1]+.0722*r[2]}
function onColor(h){return lum(h)>.58?"#14161C":"#FFFFFF"}
var FONT_LIST=["Geist","Outfit","Sora","Manrope","Geist","Syne","Fraunces","Playfair Display","DM Serif Display","JetBrains Mono","IBM Plex Mono","Georgia","Courier"];
var SYS_FONTS=["Georgia","Courier"];
var FONT_STACK="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif";
/* ═══ 100 ALEACIONES ═══ */
var RAW=[
["moderno","Moderno","Esenciales",1,"gradiente-oscuro","#6E56F8","#37D4C0","Geist","Manrope",16,"redondeado","vidrio","media",1,0,1,2],
["elegante","Elegante","Esenciales",0,"solido-claro","#A67C2E","#1E2A44","Playfair Display","Manrope",2,"recto","borde","sutil",0,1,0,2],
["bold","Bold","Esenciales",0,"solido-claro","#4438F0","#FF6B2C","Syne","Sora",24,"pildora","sombra","alta",0,0,0,3],
["minimal","Minimal","Esenciales",0,"solido-claro","#16181D","#FF4D00","Outfit","Outfit",0,"recto","borde","ninguna",0,0,0,2],
["neon","Neón","Esenciales",1,"solido-oscuro","#3DFF8B","#37F3FF","JetBrains Mono","Geist",12,"redondeado","borde","media",1,1,1,2],
["oceano","Océano","Esenciales",1,"gradiente-color","#2AA6FF","#38E1C6","Sora","Manrope",18,"redondeado","vidrio","media",1,0,1,2],
["atardecer-a","Atardecer","Esenciales",1,"atardecer","#FF8A3D","#FF4D8D","Fraunces","Outfit",22,"pildora","degradado","media",1,0,1,2],
["bosque","Bosque","Esenciales",1,"gradiente-oscuro","#4CC38A","#D9E86B","DM Serif Display","Outfit",14,"redondeado","borde","sutil",0,1,0,2],
["monocromo","Monocromo","Esenciales",1,"solido-oscuro","#F2F4F8","#8B93A7","Geist","Outfit",0,"recto","borde","ninguna",0,1,0,2],
["ambar","Ámbar","Esenciales",1,"gradiente-oscuro","#FFB224","#F0E2C0","Geist","Manrope",16,"redondeado","vidrio","media",1,0,1,2],
["ciber","Ciber","Esenciales",1,"gradiente-color","#B44CFF","#FF4ECD","Syne","Geist",20,"pildora","vidrio","alta",1,0,1,3],
["editorial-a","Editorial","Esenciales",0,"solido-claro","#15181D","#C2410C","Fraunces","Manrope",6,"recto","borde","sutil",0,1,0,2],
["medianoche","Medianoche","Oscuros",1,"solido-oscuro","#7AA2FF","#C3B0FF","Geist","Outfit",14,"redondeado","vidrio","media",1,0,1,2],
["grafito","Grafito","Oscuros",1,"grafito","#E8EAF0","#7AA2FF","Geist","Outfit",6,"recto","borde","sutil",0,1,0,2],
["abismo","Abismo","Oscuros",1,"gradiente-color","#3B82F6","#22D3EE","Sora","Manrope",18,"redondeado","vidrio","media",1,0,1,2],
["nebulosa","Nebulosa","Oscuros",1,"aurora","#A78BFA","#F0ABFC","Syne","Outfit",22,"pildora","degradado","alta",1,0,1,3],
["volcan","Volcán","Oscuros",1,"gradiente-oscuro","#FF5A3C","#FFB224","Syne","Sora",16,"redondeado","sombra","alta",1,0,0,3],
["zafiro-a","Zafiro","Oscuros",1,"profundo-azul","#2563EB","#60A5FA","Playfair Display","Manrope",4,"recto","borde","sutil",0,0,0,2],
["esmeralda-noche","Esmeralda Noche","Oscuros",1,"verde-noche","#34D399","#A7F3D0","DM Serif Display","Outfit",12,"redondeado","borde","media",0,1,0,2],
["cobre-oscuro","Cobre Oscuro","Oscuros",1,"gradiente-oscuro","#E0956B","#F3D5B5","Fraunces","Manrope",10,"redondeado","vidrio","media",1,1,1,2],
["acero","Acero","Oscuros",1,"medianoche","#94A3B8","#38BDF8","Geist","Outfit",0,"recto","borde","ninguna",0,0,0,2],
["petroleo","Petróleo","Oscuros",1,"gradiente-oscuro","#14B8A6","#67E8F9","Sora","Manrope",16,"redondeado","vidrio","media",1,0,1,2],
["uva","Uva","Oscuros",1,"gradiente-color","#8B5CF6","#F472B6","Fraunces","Outfit",20,"pildora","degradado","media",1,0,0,2],
["carbon-azul","Carbón Azul","Oscuros",1,"solido-oscuro","#60A5FA","#F59E0B","JetBrains Mono","Geist",10,"redondeado","borde","media",0,1,0,2],
["noche-rosada","Noche Rosada","Oscuros",1,"atardecer-rosa","#FB7185","#FBBF24","Fraunces","Manrope",18,"pildora","vidrio","media",1,0,1,2],
["titanio","Titanio","Oscuros",1,"profundo","#CBD5E1","#7AA2FF","Geist","Outfit",8,"recto","sombra","sutil",0,1,0,2],
["lava","Lava","Oscuros",1,"solido-oscuro","#FF4D00","#FFC96A","Syne","Geist",24,"pildora","sombra","alta",1,0,0,3],
["tormenta","Tormenta","Oscuros",1,"p-diagonal-o1","#818CF8","#38BDF8","Sora","Manrope",14,"redondeado","vidrio","media",0,1,1,2],
["nube","Nube","Claros",0,"solido-claro","#6366F1","#22D3EE","Outfit","Outfit",16,"redondeado","sombra","sutil",0,0,0,2],
["arena","Arena","Claros",0,"solido-crema","#C2410C","#0F766E","Fraunces","Manrope",8,"recto","borde","sutil",0,1,0,2],
["lino","Lino","Claros",0,"hueso","#44403C","#B45309","DM Serif Display","Manrope",6,"recto","borde","ninguna",0,1,0,2],
["porcelana","Porcelana","Claros",0,"solido-claro","#0EA5E9","#F472B6","Sora","Manrope",20,"pildora","sombra","media",0,0,0,2],
["menta-clara","Menta Clara","Claros",0,"solido-claro","#059669","#84CC16","Outfit","Manrope",14,"redondeado","sombra","sutil",0,0,0,2],
["cielo","Cielo","Claros",0,"g-radial-top-l","#38BDF8","#818CF8","Geist","Outfit",16,"redondeado","sombra","sutil",0,0,0,2],
["durazno","Durazno","Claros",0,"solido-crema","#FB923C","#F43F5E","Fraunces","Outfit",22,"pildora","sombra","media",0,0,0,2],
["rosa-suave","Rosa Suave","Claros",0,"solido-claro","#F43F5E","#F59E0B","Syne","Sora",18,"pildora","sombra","media",0,0,0,2],
["lavanda-clara","Lavanda Clara","Claros",0,"solido-claro","#8B5CF6","#EC4899","Outfit","Manrope",16,"redondeado","sombra","sutil",0,0,0,2],
["marfil","Marfil","Claros",0,"solido-crema","#1F2937","#C2A35C","Playfair Display","Manrope",2,"recto","borde","sutil",0,1,0,2],
["perla","Perla","Claros",0,"gris-perla","#64748B","#0EA5E9","Outfit","Manrope",24,"pildora","borde","ninguna",0,0,0,1],
["citrico","Cítrico","Claros",0,"solido-claro","#EAB308","#16A34A","Geist","Manrope",12,"redondeado","sombra","media",0,0,0,2],
["oliva-claro","Oliva Claro","Claros",0,"solido-crema","#65A30D","#B45309","DM Serif Display","Outfit",10,"redondeado","borde","sutil",0,1,0,2],
["terracota","Terracota","Claros",0,"solido-crema","#C2410C","#0F766E","Fraunces","Manrope",14,"redondeado","sombra","sutil",0,1,0,2],
["brisa","Brisa","Claros",0,"solido-claro","#06B6D4","#8B5CF6","Manrope","Manrope",18,"redondeado","vidrio","sutil",0,0,0,2],
["vainilla","Vainilla","Claros",0,"solido-crema","#D97706","#78716C","Playfair Display","Manrope",4,"recto","borde","sutil",0,1,0,2],
["matrix","Matrix","Neón",1,"solido-oscuro","#3DFF8B","#B6FF5C","JetBrains Mono","Geist",0,"recto","borde","media",1,1,0,2],
["laser","Láser","Neón",1,"solido-oscuro","#FF2E88","#22D3EE","Syne","Geist",14,"redondeado","borde","alta",1,0,0,3],
["ultravioleta","Ultravioleta","Neón",1,"gradiente-color","#A855F7","#22D3EE","Geist","Geist",16,"redondeado","vidrio","alta",1,0,1,2],
["plasma","Plasma","Neón",1,"aurora-fria","#E879F9","#22D3EE","Syne","Outfit",20,"pildora","degradado","alta",1,0,1,3],
["radar","Radar","Neón",1,"p-puntos-o1","#4ADE80","#FACC15","IBM Plex Mono","Geist",8,"recto","borde","media",0,1,0,2],
["arcade","Arcade","Neón",1,"solido-oscuro","#FACC15","#FF2E88","Geist","Geist",12,"redondeado","sombra","alta",1,0,0,3],
["synth","Synth","Neón",1,"atardecer","#FF4ECD","#37F3FF","Syne","Geist",18,"pildora","vidrio","alta",1,0,1,3],
["fosforo","Fósforo","Neón",1,"solido-oscuro","#D9F99D","#4ADE80","JetBrains Mono","Manrope",10,"recto","borde","sutil",1,1,0,1],
["voltio","Voltio","Neón",1,"p-zigzag-o1","#FDE047","#22D3EE","Geist","Manrope",16,"redondeado","sombra","alta",1,0,0,3],
["holograma","Holograma","Neón",1,"aurora","#67E8F9","#F0ABFC","Outfit","Sora",22,"pildora","vidrio","alta",1,0,1,2],
["algodon","Algodón","Pastel",0,"solido-claro","#F9A8D4","#A5B4FC","Outfit","Manrope",20,"pildora","sombra","sutil",0,0,0,2],
["pistacho","Pistacho","Pastel",0,"solido-crema","#84CC16","#FDE047","DM Serif Display","Manrope",14,"redondeado","borde","sutil",0,1,0,2],
["melocoton","Melocotón","Pastel",0,"solido-crema","#FDA4AF","#FDBA74","Fraunces","Outfit",18,"pildora","sombra","sutil",0,0,0,2],
["cielo-pastel","Cielo Pastel","Pastel",0,"solido-claro","#7DD3FC","#C4B5FD","Manrope","Manrope",16,"redondeado","sombra","sutil",0,0,0,1],
["lila","Lila","Pastel",0,"solido-claro","#C4B5FD","#F9A8D4","Sora","Manrope",18,"pildora","sombra","sutil",0,0,0,2],
["rosa-pastel","Rosa Pastel","Pastel",0,"solido-claro","#FBCFE8","#A5B4FC","Outfit","Manrope",22,"pildora","sombra","sutil",0,0,0,2],
["mantequilla","Mantequilla","Pastel",0,"solido-crema","#FDE68A","#FDA4AF","DM Serif Display","Manrope",12,"redondeado","borde","sutil",0,1,0,2],
["salvia","Salvia","Pastel",0,"solido-crema","#BBF7D0","#FDE68A","Fraunces","Manrope",14,"redondeado","borde","sutil",0,1,0,2],
["turquesa-suave","Turquesa Suave","Pastel",0,"solido-claro","#99F6E4","#FDE68A","Manrope","Manrope",16,"redondeado","sombra","sutil",0,0,0,2],
["coral-suave","Coral Suave","Pastel",0,"solido-claro","#FDBA74","#FDA4AF","Outfit","Manrope",18,"pildora","sombra","sutil",0,0,0,2],
["arena-rosa","Arena Rosa","Pastel",0,"solido-crema","#F5D0C5","#C4B5FD","Fraunces","Manrope",16,"redondeado","borde","sutil",0,1,0,2],
["hielo","Hielo","Pastel",0,"gris-perla","#BAE6FD","#E9D5FF","Geist","Outfit",12,"redondeado","borde","ninguna",0,0,0,1],
["selva","Selva","Naturaleza",1,"gradiente-oscuro","#22C55E","#FDE047","DM Serif Display","Outfit",12,"redondeado","borde","media",0,1,0,2],
["musgo","Musgo","Naturaleza",1,"verde-noche","#84CC16","#D9F99D","Fraunces","Manrope",10,"redondeado","borde","sutil",0,1,0,2],
["desierto","Desierto","Naturaleza",0,"solido-crema","#D97706","#65A30D","Fraunces","Outfit",8,"recto","borde","sutil",0,1,0,2],
["otono","Otoño","Naturaleza",0,"solido-crema","#EA580C","#CA8A04","Playfair Display","Manrope",6,"recto","sombra","sutil",0,1,0,2],
["glaciar","Glaciar","Naturaleza",0,"solido-claro","#38BDF8","#A5F3FC","Geist","Outfit",14,"redondeado","borde","ninguna",0,0,0,1],
["arrecife","Arrecife","Naturaleza",1,"gradiente-color","#06B6D4","#F472B6","Sora","Manrope",18,"redondeado","vidrio","media",1,0,0,2],
["pradera","Pradera","Naturaleza",0,"solido-claro","#16A34A","#FACC15","Manrope","Manrope",16,"redondeado","sombra","sutil",0,0,0,2],
["corteza","Corteza","Naturaleza",1,"solido-oscuro","#C8956C","#EAD9C2","DM Serif Display","Manrope",8,"recto","borde","sutil",0,1,0,2],
["rio","Río","Naturaleza",1,"p-ondas-o1","#38BDF8","#34D399","Sora","Manrope",16,"redondeado","vidrio","media",0,0,0,2],
["amanecer","Amanecer","Naturaleza",1,"atardecer-dorado","#FB923C","#FDE047","Fraunces","Outfit",20,"pildora","vidrio","media",1,0,0,2],
["oro-negro","Oro Negro","Lujo",1,"gradiente-oscuro","#EAC54F","#F7E9C4","Playfair Display","Manrope",2,"recto","borde","media",1,1,1,2],
["champagna","Champán","Lujo",0,"solido-crema","#C8A96A","#3F3A33","Playfair Display","Manrope",4,"recto","borde","sutil",0,1,0,2],
["rubi","Rubí","Lujo",1,"vino","#E11D48","#F5C065","Playfair Display","Manrope",6,"recto","sombra","alta",1,0,0,2],
["platino","Platino","Lujo",0,"gris-perla","#334155","#94A3B8","Outfit","Outfit",0,"recto","borde","ninguna",0,0,0,1],
["esmeralda-lujo","Esmeralda","Lujo",1,"verde-noche","#10B981","#EAC54F","Playfair Display","Manrope",6,"recto","borde","media",1,0,0,2],
["zafiro-real","Zafiro Real","Lujo",1,"profundo-azul","#4F46E5","#EAC54F","Playfair Display","Manrope",6,"recto","vidrio","media",1,0,1,2],
["marfil-oro","Marfil y Oro","Lujo",0,"solido-crema","#B08D3E","#1F2937","Playfair Display","Manrope",2,"recto","borde","sutil",0,1,0,2],
["bronce","Bronce","Lujo",1,"solido-oscuro","#CD7F32","#F1E3D3","DM Serif Display","Manrope",8,"recto","borde","media",0,1,0,2],
["onix","Ónix","Lujo",1,"solido-oscuro","#F5F5F4","#C8A96A","Geist","Outfit",0,"recto","borde","ninguna",0,1,0,1],
["perla-negra","Perla Negra","Lujo",1,"profundo-violeta","#D4D4D8","#A78BFA","Playfair Display","Manrope",10,"redondeado","sombra","media",0,1,0,2],
["funky","Funky 70s","Retro",0,"solido-crema","#EA580C","#0F766E","Fraunces","Outfit",24,"pildora","sombra","media",0,1,0,3],
["retro-80s","Retro 80s","Retro",1,"solido-oscuro","#FF4ECD","#22D3EE","Geist","Geist",12,"redondeado","borde","alta",1,0,0,3],
["noventos","Noventos","Retro",0,"solido-claro","#FACC15","#3B82F6","Geist","Manrope",0,"recto","sombra","media",0,0,0,2],
["polaroid","Polaroid","Retro",0,"solido-crema","#F87171","#60A5FA","DM Serif Display","Manrope",10,"redondeado","sombra","media",0,1,0,2],
["vinilo","Vinilo","Retro",1,"solido-oscuro","#F472B6","#FACC15","Syne","Geist",28,"pildora","sombra","alta",0,1,0,3],
["neo-brutal","Neo-Brutal","Retro",0,"solido-claro","#111827","#FACC15","Geist","Geist",0,"recto","borde","ninguna",0,0,0,3],
["y2k","Y2K","Retro",1,"gradiente-color","#7DD3FC","#F9A8D4","Sora","Manrope",22,"pildora","vidrio","media",1,0,1,2],
["sepia","Sepia","Retro",0,"solido-crema","#92400E","#57534E","Playfair Display","Manrope",4,"recto","borde","sutil",0,1,0,2],
["periodico","Periódico","Editorial",0,"solido-claro","#111827","#B91C1C","Playfair Display","Georgia",0,"recto","borde","ninguna",0,1,0,2],
["revista","Revista","Editorial",0,"solido-claro","#0F172A","#E11D48","Playfair Display","Manrope",0,"recto","borde","sutil",0,0,0,3],
["manuscrito","Manuscrito","Editorial",0,"hueso","#374151","#B45309","DM Serif Display","Georgia",6,"recto","borde","sutil",0,1,0,2],
["tintas","Tintas","Editorial",1,"solido-oscuro","#E5E7EB","#F59E0B","Geist","Georgia",0,"recto","borde","ninguna",0,1,0,2],
["fanzine","Fanzine","Editorial",0,"solido-claro","#DB2777","#111827","Syne","Geist",0,"recto","sombra","media",0,0,0,3],
["boletin","Boletín","Editorial",0,"solido-crema","#1F2937","#0E7490","Georgia","Manrope",8,"recto","borde","sutil",0,1,0,1]
];
var ALLOYS=RAW.map(function(r){return{id:r[0],name:r[1],tag:r[2],dark:!!r[3],bg:r[4],primary:r[5],accent:r[6],fh:r[7],fb:r[8],radius:r[9],btn:r[10],card:r[11],shadow:r[12],glow:!!r[13],grain:!!r[14],glass:!!r[15],headScale:r[16]}});
var CATS=["Todas","Esenciales","Oscuros","Claros","Neón","Pastel","Naturaleza","Lujo","Retro","Editorial"];
/* ═══ 100 FONDOS ═══ */
var BGS=[];
function bgAdd(id,label,cat,dark,make){BGS.push({id:id,label:label,cat:cat,dark:!!dark,make:make})}
var Wc="rgba(255,255,255,",Kc="rgba(20,22,30,";
var SOL_D=[["solido-oscuro","Sólido oscuro","#0C0F15"],["grafito","Grafito","#14161C"],["medianoche","Medianoche","#0B1020"],["azul-noche","Azul noche","#0A1220"],["verde-noche","Verde noche","#0A1512"],["vino","Vino","#170B12"]];
var SOL_L=[["solido-claro","Sólido claro","#F7F6F2"],["solido-crema","Sólido crema","#F4EFE3"],["hueso","Hueso","#EFEBE2"],["gris-perla","Gris perla","#EDEEF2"]];
SOL_D.forEach(function(s){bgAdd(s[0],s[1],"Sólidos",true,function(){return{bgc:s[2]}})});
SOL_L.forEach(function(s){bgAdd(s[0],s[1],"Sólidos",false,function(){return{bgc:s[2]}})});
var GR_D=[
["gradiente-oscuro","Gradiente oscuro",function(p){return{bgc:"linear-gradient(180deg,#0F1219,"+mix("#0C0F15",p,.14)+")"}}],
["gradiente-color","Gradiente con color",function(p){return{bgc:"linear-gradient(160deg,"+mix("#0C0F15",p,.40)+" 0%,"+mix("#0C0F15",p,.10)+" 55%,#0B0D12 100%)"}}],
["g-diagonal-a","Diagonal acento",function(p,a){return{bgc:"linear-gradient(135deg,"+mix("#0C0F15",a,.34)+",#0B0D12)"}}],
["g-vertical-p","Vertical intenso",function(p){return{bgc:"linear-gradient(180deg,"+mix("#0C0F15",p,.30)+",#0A0C11)"}}],
["g-horizontal","Horizontal bicolor",function(p,a){return{bgc:"linear-gradient(90deg,"+mix("#0C0F15",p,.28)+","+mix("#0C0F15",a,.20)+")"}}],
["g-radial-top","Radial superior",function(p){return{bgc:"radial-gradient(120% 80% at 50% 0%,"+mix("#0C0F15",p,.32)+",#0A0C11 70%)"}}],
["g-radial-bottom","Radial inferior",function(p){return{bgc:"radial-gradient(120% 80% at 50% 100%,"+mix("#0C0F15",p,.28)+",#0A0C11 70%)"}}],
["g-esquina","Esquina bicolor",function(p,a){return{bgc:"linear-gradient(135deg,"+mix("#0C0F15",p,.32)+" 0%,#0B0D12 50%,"+mix("#0C0F15",a,.22)+" 100%)"}}],
["g-bruma","Bruma",function(p){return{bgc:"linear-gradient(180deg,#12151d 0%,"+mix("#0C0F15",p,.10)+" 60%,#0A0C11 100%)"}}],
["g-noche-calida","Noche cálida",function(p){return{bgc:"linear-gradient(160deg,"+mix("#14090f",p,.30)+",#0C0A10)"}}]
];
var GR_L=[
["g-claro-suave","Claro suave",function(p){return{bgc:"linear-gradient(180deg,#FFFFFF,"+mix("#F7F6F2",p,.10)+")"}}],
["g-crema-p","Crema con color",function(p){return{bgc:"linear-gradient(160deg,"+mix("#F4EFE3",p,.16)+",#F7F6F2 70%)"}}],
["g-radial-top-l","Radial claro",function(p){return{bgc:"radial-gradient(120% 80% at 50% 0%,"+mix("#FFFFFF",p,.16)+",#F7F6F2 70%)"}}],
["g-diagonal-l","Diagonal clara",function(p){return{bgc:"linear-gradient(135deg,"+mix("#F7F6F2",p,.18)+",#F5F4EF)"}}],
["g-horizontal-l","Horizontal claro",function(p,a){return{bgc:"linear-gradient(90deg,"+mix("#F7F6F2",p,.14)+","+mix("#F7F6F2",a,.12)+")"}}],
["g-esquina-l","Esquina clara",function(p,a){return{bgc:"linear-gradient(135deg,"+mix("#F7F6F2",p,.16)+" 0%,#F7F6F2 55%,"+mix("#F7F6F2",a,.14)+" 100%)"}}],
["g-rosa-emp","Rosa empolvado",function(p){return{bgc:"linear-gradient(160deg,"+mix("#FBF3F2",p,.3)+",#F7F6F2)"}}],
["g-verde-agua","Verde agua",function(p){return{bgc:"linear-gradient(160deg,"+mix("#F1F7F2",p,.3)+",#F7F6F2)"}}],
["g-azulado","Azulado",function(p){return{bgc:"linear-gradient(180deg,"+mix("#F1F5FB",p,.3)+",#F7F6F2)"}}],
["g-amarillo-s","Amarillo suave",function(p){return{bgc:"linear-gradient(160deg,"+mix("#FBF7EC",p,.3)+",#F7F6F2)"}}]
];
GR_D.forEach(function(g){bgAdd(g[0],g[1],"Gradientes",true,function(p,a){return g[2](p,a)})});
GR_L.forEach(function(g){bgAdd(g[0],g[1],"Gradientes",false,function(p,a){return g[2](p,a)})});
var AMB=[
["atardecer","Atardecer",true,function(p,a){return{bgc:"linear-gradient(168deg,"+mix("#1B0E23",p,.62)+" 0%,"+mix("#120A18",a,.34)+" 52%,#0C0A12 100%)"}}],
["atardecer-rosa","Atardecer rosa",true,function(p,a){return{bgc:"linear-gradient(168deg,"+mix("#230B18",p,.5)+","+mix("#160A14",a,.3)+" 55%,#0C0A10 100%)"}}],
["atardecer-dorado","Atardecer dorado",true,function(p,a){return{bgc:"linear-gradient(168deg,"+mix("#201205",p,.55)+","+mix("#160F06",a,.28)+" 55%,#0C0A08 100%)"}}],
["aurora","Aurora",true,function(p,a){return{bgc:"#0C0F15",bgi:"radial-gradient(640px 440px at 14% -4%,"+hexA(p,.30)+",transparent 62%),radial-gradient(560px 400px at 88% 8%,"+hexA(a,.24)+",transparent 62%),radial-gradient(640px 460px at 50% 112%,"+hexA(mix(p,a,.5),.20)+",transparent 64%)"}}],
["aurora-fria","Aurora fría",true,function(p,a){return{bgc:"#0A0E16",bgi:"radial-gradient(620px 420px at 10% 0%,"+hexA(p,.28)+",transparent 60%),radial-gradient(600px 420px at 90% 100%,"+hexA(a,.22)+",transparent 62%)"}}],
["aurora-calida","Aurora cálida",true,function(p,a){return{bgc:"#120D0A",bgi:"radial-gradient(620px 420px at 85% 0%,"+hexA(p,.30)+",transparent 60%),radial-gradient(560px 400px at 10% 100%,"+hexA(a,.22)+",transparent 62%)"}}],
["profundo","Profundo",true,function(){return{bgc:"radial-gradient(120% 90% at 50% 0%, #171B26 0%, #0B0D12 72%)"}}],
["profundo-azul","Profundo azul",true,function(){return{bgc:"radial-gradient(120% 90% at 50% 0%, #101627 0%, #090C14 72%)"}}],
["profundo-violeta","Profundo violeta",true,function(){return{bgc:"radial-gradient(120% 90% at 50% 0%, #1A1426 0%, #0C0A12 72%)"}}],
["destello","Destello",true,function(p){return{bgc:"#0C0F15",bgi:"radial-gradient(760px 440px at 50% -8%, "+hexA(p,.32)+", transparent 66%)"}}],
["destello-doble","Destello doble",true,function(p,a){return{bgc:"#0C0F15",bgi:"radial-gradient(640px 380px at 22% -8%, "+hexA(p,.30)+", transparent 64%),radial-gradient(640px 380px at 82% -8%, "+hexA(a,.22)+", transparent 64%)"}}],
["oceano-profundo","Océano profundo",true,function(p){return{bgc:"linear-gradient(180deg,"+mix("#08131C",p,.24)+",#070D13)"}}],
["halo-claro","Halo claro",false,function(p){return{bgc:"#F7F6F2",bgi:"radial-gradient(720px 420px at 50% -10%, "+hexA(p,.18)+", transparent 66%)"}}],
["lienzo-halo","Lienzo con halo",false,function(p,a){return{bgc:"#F4EFE3",bgi:"radial-gradient(600px 380px at 12% -6%, "+hexA(p,.14)+", transparent 62%),radial-gradient(560px 360px at 92% 0%, "+hexA(a,.12)+", transparent 62%)"}}],
["amanecer-suave","Amanecer suave",false,function(p){return{bgc:"linear-gradient(180deg,"+mix("#FDF4E8",p,.35)+",#F7F6F2 65%)"}}]
];
AMB.forEach(function(g){bgAdd(g[0],g[1],"Ambiente",g[2],function(p,a){return g[3](p,a)})});
function pat(pid,dark){
var c=dark?Wc:Kc;
var P={
"puntos":{bgi:"radial-gradient("+c+".10) 1px,transparent 1.4px)",bgs:"22px 22px"},
"puntos-f":{bgi:"radial-gradient("+c+".07) 1px,transparent 1.3px)",bgs:"12px 12px"},
"puntos-doble":{bgi:"radial-gradient("+c+".10) 1px,transparent 1.4px),radial-gradient("+c+".06) 1px,transparent 1.3px)",bgs:"22px 22px,11px 11px"},
"cuadricula":{bgi:"linear-gradient("+c+".06) 1px,transparent 1px),linear-gradient(90deg,"+c+".06) 1px,transparent 1px)",bgs:"44px 44px"},
"cuadricula-g":{bgi:"linear-gradient("+c+".05) 1px,transparent 1px),linear-gradient(90deg,"+c+".05) 1px,transparent 1px)",bgs:"88px 88px"},
"trama":{bgi:"linear-gradient("+c+".05) 1px,transparent 1px),linear-gradient(90deg,"+c+".05) 1px,transparent 1px)",bgs:"14px 14px"},
"diagonal":{bgi:"repeating-linear-gradient(45deg,"+c+".045) 0 1.5px,transparent 1.5px 14px)"},
"diagonal-d":{bgi:"repeating-linear-gradient(45deg,"+c+".04) 0 1.5px,transparent 1.5px 14px),repeating-linear-gradient(-45deg,"+c+".04) 0 1.5px,transparent 1.5px 14px)"},
"zigzag":{bgi:"repeating-linear-gradient(45deg,"+c+".05) 0 1.5px,transparent 1.5px 12px),repeating-linear-gradient(-45deg,"+c+".05) 0 1.5px,transparent 1.5px 12px)"},
"ondas":{bgi:"repeating-radial-gradient(circle at 50% 130%,"+c+".06) 0 1.5px,transparent 1.5px 26px)"},
"circulos":{bgi:"repeating-radial-gradient(circle at 82% -10%,"+c+".06) 0 1.5px,transparent 1.5px 30px)"},
"rombos":{bgi:"repeating-linear-gradient(60deg,"+c+".04) 0 1.5px,transparent 1.5px 18px),repeating-linear-gradient(-60deg,"+c+".04) 0 1.5px,transparent 1.5px 18px)"},
"rayas-v":{bgi:"repeating-linear-gradient(90deg,"+c+".05) 0 2px,transparent 2px 28px)"},
"rayas-h":{bgi:"repeating-linear-gradient(0deg,"+c+".05) 0 2px,transparent 2px 28px)"},
"malla":{bgi:"linear-gradient("+c+".05) 1px,transparent 1px),linear-gradient(90deg,"+c+".05) 1px,transparent 1px),linear-gradient(45deg,"+c+".03) 1px,transparent 1px)",bgs:"40px 40px,40px 40px,56px 56px"}
};
return P[pid]
}
var PAT_D=["puntos","puntos-f","puntos-doble","cuadricula","cuadricula-g","trama","diagonal","diagonal-d","zigzag","ondas","circulos","rombos","rayas-v","rayas-h","malla"];
PAT_D.forEach(function(pid){
[["o1","#0C0F15","neutro"],["o2","#0B1020","frío"]].forEach(function(b){
bgAdd("p-"+pid+"-"+b[0],pid.replace(/-/g," ")+" oscuro "+b[2],"Patrones oscuros",true,function(){var s=pat(pid,true);return{bgc:b[1],bgi:s.bgi,bgs:s.bgs}})
})
});
var PAT_L=["puntos","puntos-f","cuadricula","trama","diagonal","diagonal-d","zigzag","ondas","circulos","rombos","rayas-v","rayas-h","malla"];
PAT_L.forEach(function(pid,i){
[["l1","#F7F6F2","claro"],["l2","#F4EFE3","crema"]].forEach(function(b,j){
if(i===PAT_L.length-1&&j===1)return;
bgAdd("p-"+pid+"-"+b[0],pid.replace(/-/g," ")+" "+b[2],"Patrones claros",false,function(){var s=pat(pid,false);return{bgc:b[1],bgi:s.bgi,bgs:s.bgs}})
})
});
var BG_CATS=["Todos","Sólidos","Gradientes","Ambiente","Patrones oscuros","Patrones claros"];
function bgById(id){for(var i=0;i<BGS.length;i++)if(BGS[i].id===id)return BGS[i];return BGS[0]}
/* ═══ 100 TIPOS ═══ */
var ARCH=[
{id:"producto",name:"Producto",hero:"split",plan:["nav","hero","logos","features","stats","pricing","faq","cta","footer"]},
{id:"saas",name:"SaaS",hero:"center",plan:["nav","hero","logos","features","showcase","stats","pricing","faq","cta","footer"]},
{id:"startup",name:"Startup",hero:"center",plan:["nav","hero","logos","features","steps","stats","testi","cta","footer"]},
{id:"app",name:"App Móvil",hero:"split",plan:["nav","hero","logos","features","showcase","stats","testi","pricing","cta","footer"]},
{id:"clasica",name:"Clásica",hero:"center",plan:["nav","hero","logos","features","testi","pricing","cta","footer"]},
{id:"moderna",name:"Moderna",hero:"center",plan:["nav","hero","stats","features","showcase","faq","cta","footer"]},
{id:"creativa",name:"Creativa",hero:"big",plan:["nav","hero","logos","gallery","showcase","testi","cta","footer"]},
{id:"minimal",name:"Minimal",hero:"minimal",plan:["nav","hero","features","stats","faq","footer"]},
{id:"split",name:"Split",hero:"split",plan:["nav","hero","features","showcase","pricing","cta","footer"]},
{id:"evento",name:"Evento",hero:"evento",plan:["nav","hero","steps","team","pricing","cta","footer"]},
{id:"servicio",name:"Servicio",hero:"split",plan:["nav","hero","features","steps","stats","testi","form","footer"]},
{id:"consultora",name:"Consultora",hero:"minimal",plan:["nav","hero","features","team","stats","testi","form","footer"]},
{id:"portfolio",name:"Portfolio",hero:"big",plan:["nav","hero","gallery","showcase","testi","form","footer"]},
{id:"restaurante",name:"Restaurante",hero:"big",plan:["nav","hero","gallery","showcase","testi","form","footer"]},
{id:"inmobiliaria",name:"Inmobiliaria",hero:"split",plan:["nav","hero","stats","gallery","features","form","footer"]},
{id:"curso",name:"Curso",hero:"center",plan:["nav","hero","features","team","testi","pricing","faq","cta","footer"]},
{id:"tienda",name:"Tienda",hero:"split",plan:["nav","hero","gallery","features","testi","newsletter","footer"]},
{id:"podcast",name:"Podcast",hero:"center",plan:["nav","hero","stats","blog","newsletter","footer"]},
{id:"blog",name:"Blog",hero:"blog",plan:["nav","hero","blog","newsletter","footer"]},
{id:"agencia",name:"Agencia",hero:"big",plan:["nav","hero","logos","gallery","steps","testi","cta","footer"]}
];
var SEC_ORDER=["nav","hero","logos","features","gallery","blog","steps","showcase","team","stats","testi","pricing","faq","form","newsletter","cta","footer"];
function ord(l){return SEC_ORDER.filter(function(t){return l.indexOf(t)>=0})}
var CUTS=[
{id:"or",name:"",desc:"Estructura equilibrada.",make:function(p){return p.slice()}},
{id:"es",name:"Esencial",desc:"Versión corta: hero, contenido clave y cierre.",make:function(p){var core=p.filter(function(t){return["features","gallery","blog","steps","showcase"].indexOf(t)>=0}).slice(0,1);return ord(["nav","hero"].concat(core).concat(p.indexOf("form")>=0?["form"]:[]).concat(["cta","footer"]))}},
{id:"cv",name:"Conversión",desc:"Suma precios, FAQ y llamados a la acción.",make:function(p){return ord(p.concat(["pricing","faq","cta"]))}},
{id:"cn",name:"Confianza",desc:"Suma métricas y testimonios.",make:function(p){return ord(p.concat(["stats","testi"]))}},
{id:"co",name:"Completa",desc:"Todo: logos, métricas, testimonios, precios y FAQ.",make:function(p){return ord(p.concat(["logos","stats","testi","pricing","faq","cta"]))}}
];
var TYPES={};
ARCH.forEach(function(a){CUTS.forEach(function(c){TYPES[a.id+"-"+c.id]={name:a.name+(c.name?" · "+c.name:""),desc:c.desc,hero:a.hero,secs:c.make(a.plan),arch:a.name}})});
var NAVS=[["clasica","Clásica"],["centrada","Centrada"],["minimal","Minimal"],["pildora","Píldora"],["compacta","Compacta"],["doble","Doble fila"],["acento","Línea acento"],["invertida","Invertida"]];
var CARDS=[["borde","Borde"],["sombra","Sombra"],["vidrio","Vidrio"],["degradado","Degradé"],["elevada","Elevada"],["plana","Plana"],["acento","Acento superior"],["lado","Icono lateral"],["numerada","Numerada"],["centrada","Centrada"]];
var BTNS=[["solido","Sólido"],["contorno","Contorno"],["suave","Suave"],["degradado","Degradé"],["resplandor","Resplandor"],["3d","3D"],["doble","Doble borde"],["minimal","Minimal"],["viva","Sombra viva"],["neon","Neón"]];
var ANIMS=[["fade-up","Aparece subiendo"],["fade","Aparece"],["slide-l","Desliza izquierda"],["slide-r","Desliza derecha"],["zoom","Zoom"],["blur","Desenfoque"],["lenta","Suave y lenta"],["off","Sin animación"]];
var RUBROS={
tecnologia:{label:"Tecnología / SaaS",packs:[{e:"Construye más rápido, lanza antes",d:"La plataforma que acelera tu equipo con automatizaciones inteligentes y datos en tiempo real.",c1:"Probar gratis",c2:"Ver demo"},{e:"Tu operación, bajo control",d:"Centraliza procesos y decisiones en un solo lugar, sin planillas ni correos perdidos.",c1:"Empezar ahora",c2:"Hablar con ventas"}]},
salud:{label:"Salud y bienestar",packs:[{e:"Cuidarte nunca fue tan simple",d:"Acompañamiento profesional, planes a tu medida y seguimiento continuo desde tu celular.",c1:"Reservar hora",c2:"Conocer planes"},{e:"Bienestar que se nota",d:"Un enfoque integral con especialistas certificados y resultados medibles semana a semana.",c1:"Agendar evaluación",c2:"Ver testimonios"}]},
educacion:{label:"Educación / Cursos",packs:[{e:"Aprende haciendo, no mirando",d:"Clases prácticas, proyectos reales y una comunidad que te empuja a llegar más lejos.",c1:"Inscribirme",c2:"Ver temario"},{e:"Tu próximo nivel empieza aquí",d:"Programas diseñados por expertos de la industria, con certificación y bolsa de trabajo.",c1:"Postular ahora",c2:"Hablar con un asesor"}]},
finanzas:{label:"Finanzas",packs:[{e:"Tu dinero, trabajando por ti",d:"Invierte, ahorra y proyecta con información clara y cero letra chica.",c1:"Abrir cuenta",c2:"Simular inversión"},{e:"Decisiones financieras sin dolor",d:"Ordena tus finanzas con reportes simples y metas que sí se cumplen.",c1:"Empezar gratis",c2:"Ver cómo funciona"}]},
ecom:{label:"E-commerce / Tienda",packs:[{e:"Todo lo que amas, en un solo lugar",d:"Envíos rápidos, cambios sin complicaciones y precios que sorprenden.",c1:"Comprar ahora",c2:"Ver catálogo"},{e:"Compra fácil, recibe rápido",d:"Despacho en 24 horas, pago seguro y garantía de satisfacción total.",c1:"Ver ofertas",c2:"Seguir novedades"}]},
alimentos:{label:"Alimentos / Restaurant",packs:[{e:"Sabores que se comparten",d:"Ingredientes frescos, recetas de casa y una experiencia para volver una y otra vez.",c1:"Reservar mesa",c2:"Ver el menú"},{e:"Cocina honesta, sabor real",d:"Del mercado a tu mesa cada día. Pide online o ven a conocernos.",c1:"Pedir ahora",c2:"Nuestra carta"}]},
servicios:{label:"Servicios profesionales",packs:[{e:"Expertos que responden por ti",d:"Diagnóstico claro, propuesta honesta y resultados garantizados por escrito.",c1:"Cotizar gratis",c2:"Ver servicios"},{e:"Tranquilidad, bien hecha",d:"Más de 10 años resolviendo lo que otros complican. Presupuesto en 24 horas.",c1:"Pedir presupuesto",c2:"Casos reales"}]},
inmobiliaria:{label:"Inmobiliaria",packs:[{e:"El hogar que buscas existe",d:"Propiedades seleccionadas, asesoría completa y acompañamiento hasta la firma.",c1:"Ver propiedades",c2:"Agendar visita"},{e:"Tu próxima dirección empieza aquí",d:"Compra, venta y arriendo con tasación gratuita y cero sorpresas.",c1:"Cotizar ahora",c2:"Hablar con un agente"}]},
turismo:{label:"Turismo / Viajes",packs:[{e:"Lugares que se quedan contigo",d:"Experiencias diseñadas al detalle, guías locales y grupos pequeños.",c1:"Reservar cupo",c2:"Ver destinos"},{e:"Viaja distinto, vuelve cambiado",d:"Itinerarios únicos con todo incluido y soporte 24/7 durante el viaje.",c1:"Cotizar viaje",c2:"Próximas salidas"}]},
agencia:{label:"Agencia / Creativo",packs:[{e:"Ideas que mueven marcas",d:"Estrategia, diseño y contenido con resultados medibles desde el primer mes.",c1:"Agendar reunión",c2:"Ver portfolio"},{e:"Hacemos que te recuerden",d:"Branding y campañas con sello propio para marcas que quieren destacar.",c1:"Empezar proyecto",c2:"Nuestro proceso"}]},
fitness:{label:"Fitness / Deporte",packs:[{e:"Más fuerte que ayer",d:"Entrenamientos personalizados, seguimiento real y una comunidad que no te suelta.",c1:"Clase gratis",c2:"Ver planes"},{e:"Tu mejor versión, sin excusas",d:"Planes para todos los niveles, horarios flexibles y coaches certificados.",c1:"Inscribirme hoy",c2:"Conocer el gym"}]},
legal:{label:"Legal / Abogados",packs:[{e:"Defensa clara, sin tecnicismos",d:"Te explicamos tu caso en simple y peleamos por el mejor resultado.",c1:"Primera consulta gratis",c2:"Áreas de práctica"},{e:"Tu tranquilidad, nuestra causa",d:"Más de 15 años de experiencia y miles de casos resueltos con éxito.",c1:"Contactar abogado",c2:"Ver casos"}]}
};
var PALETTES=[["Violeta marino","#6E56F8","#37D4C0"],["Ámbar coral","#F5A524","#FF6B4A"],["Rosa dorado","#FF4D8D","#FFB224"],["Azul hielo","#2AA6FF","#38E1C6"],["Verde neón","#3DFF8B","#37F3FF"],["Ciber fucsia","#B44CFF","#FF4ECD"],["Oro oliva","#A67C2E","#1E2A44"],["Atardecer","#FF8A3D","#FF4D8D"],["Bosque lima","#4CC38A","#D9E86B"],["Tinta naranja","#16181D","#FF4D00"],["Cielo rosa","#0EA5E9","#F472B6"],["Rubí ámbar","#E11D48","#F59E0B"]];
var ICONS={bolt:"M13 2 3 14h7l-1 8 10-12h-7l1-8z",shield:"M12 22s8-3.6 8-10V5l-8-3-8 3v7c0 6.4 8 10 8 10z",layers:"M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",chart:"M3 3v18h18M7 16v-5m5 5V8m5 8v-3",spark:"M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9 4.9 19.1",heart:"M20.8 6.6a5 5 0 0 0-8.8-2.2A5 5 0 0 0 3.2 6.6c0 5 8.8 10.5 8.8 10.5s8.8-5.5 8.8-10.5z",pen:"M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z",lock:"M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4",check:"M20 6 9 17l-5-5",arrow:"M5 12h14m-6-6 6 6-6 6",star:"m12 2 3 6.6 7 .9-5.2 4.8L18.2 21 12 17.4 5.8 21l1.4-6.7L2 9.5l7-.9L12 2z"};
function ico(n,s){s=s||22;return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'+ICONS[n]+'"/></svg>'}
var ANCH={features:"caracteristicas",stats:"metricas",showcase:"plataforma",faq:"preguntas",pricing:"precios",testi:"testimonios",steps:"proceso",team:"equipo",form:"contacto",gallery:"trabajos",blog:"articulos",newsletter:"boletin",cta:"cta"};
var LBL={features:"Características",stats:"Métricas",showcase:"Plataforma",faq:"FAQ",pricing:"Precios",testi:"Testimonios",steps:"Proceso",team:"Equipo",form:"Contacto",gallery:"Trabajos",blog:"Artículos",newsletter:"Boletín",cta:"Empezar"};
function defaultsFor(type){
var D={nav:{},footer:{},
hero:{t:"",sub:"",b1:"",b2:"",badge:"Nuevo · v2.0 disponible"},
logos:{h:"Equipos que ya confían en nosotros"},
features:{h:"Todo lo que necesitas para avanzar",sub:"Menos herramientas sueltas, más flujo de trabajo.",items:[
{t:"Rendimiento real",d:"Carga instantánea y respuesta inmediata en cada acción.",i:"bolt"},
{t:"Seguridad primero",d:"Cifrado extremo a extremo y respaldos automáticos.",i:"shield"},
{t:"Modular por diseño",d:"Activa solo las piezas que tu proyecto necesita.",i:"layers"},
{t:"Métricas claras",d:"Paneles simples para decidir con datos, no corazonadas.",i:"chart"},
{t:"Integraciones abiertas",d:"Conecta tus herramientas favoritas en un par de clics.",i:"spark"},
{t:"Soporte humano",d:"Personas reales respondiendo en menos de 24 horas.",i:"heart"}]},
stats:{items:[{n:"12k+",l:"clientes activos"},{n:"99.9%",l:"disponibilidad"},{n:"4.9★",l:"calificación promedio"},{n:"38%",l:"más productividad"}]},
showcase:{k:"Plataforma",h:"Una sola fuente de verdad para tu operación",sub:"Centraliza proyectos, tareas y reportes sin fricción. Todo tu equipo trabajando sobre la misma información, siempre actualizada.",points:[{t:"Configuración en minutos, sin código"},{t:"Se adapta a tu flujo, no al revés"},{t:"Dashboards en tiempo real"}],b:"Conocer más"},
steps:{h:"Cómo funciona",sub:"Tres pasos y estás operando.",items:[{t:"Crea tu cuenta",d:"Registro en menos de un minuto, sin tarjeta."},{t:"Configura tu flujo",d:"Importa tus datos y ajusta las vistas a tu equipo."},{t:"Escala sin fricción",d:"Invita a tu equipo y mide resultados desde el panel."}]},
testi:{h:"Lo que dicen nuestros clientes",sub:"Historias reales de equipos que ya dieron el salto.",items:[
{q:"Reducimos a la mitad el tiempo de coordinación. Hoy todo el equipo sabe qué hacer y cuándo.",a:"Carla Méndez",r:"Directora de Operaciones · Nébula"},
{q:"La curva de aprendizaje es casi nula. En una semana ya estaba todo el equipo a bordo.",a:"Diego Fuentes",r:"CTO · Andes Labs"},
{q:"Por fin una herramienta que se siente diseñada para personas y no para ingenieros.",a:"María José Ruiz",r:"Fundadora · Taller Sur"}]},
pricing:{h:"Planes simples y transparentes",sub:"Empieza gratis y escala cuando lo necesites.",
p1:{n:"Inicial",pr:"$0",per:"/mes",d:"Para partir sin compromiso.",f:["1 proyecto","Hasta 3 usuarios","Reportes básicos","Soporte por correo"],b:"Empezar gratis"},
p2:{n:"Pro",pr:"$19",per:"/mes",d:"Para equipos en crecimiento.",f:["Proyectos ilimitados","Hasta 15 usuarios","Automatizaciones","Integraciones API","Soporte prioritario"],b:"Elegir Pro"},
p3:{n:"Empresa",pr:"$49",per:"/mes",d:"Para operaciones exigentes.",f:["Usuarios ilimitados","SSO y auditoría","SLA garantizado","Gestor dedicado"],b:"Hablar con ventas"}},
faq:{h:"Preguntas frecuentes",sub:"Si falta algo, escríbenos por WhatsApp.",items:[
{q:"¿Puedo probar antes de pagar?",d:"Sí. El plan Inicial es gratis para siempre y los planes de pago tienen 14 días de prueba sin tarjeta."},
{q:"¿Cómo funciona la facturación?",d:"Emitimos boleta o factura cada mes. Puedes cancelar o cambiar de plan cuando quieras."},
{q:"¿Mis datos están seguros?",d:"Usamos cifrado en tránsito y en reposo, con respaldos diarios y control de acceso por roles."},
{q:"¿Ofrecen soporte en español?",d:"Sí, todo nuestro soporte es en español, por correo, chat y WhatsApp."},
{q:"¿Puedo cancelar cuando quiera?",d:"Claro. No hay permanencia: si cancelas, mantienes acceso hasta el fin del período pagado."}]},
cta:{h:"¿Listo para dar el siguiente paso?",sub:"Únete hoy y nota la diferencia desde la primera semana. Sin tarjeta, sin permanencia.",b:"Empezar ahora",b2:"Hablar con ventas"},
form:{h:"Hablemos de tu proyecto",sub:"Te respondemos dentro de 24 horas hábiles.",b:"Enviar mensaje"},
newsletter:{h:"Recibe novedades y guías prácticas",sub:"Un correo al mes. Cero spam, date de baja cuando quieras.",ph:"tu@correo.com",b:"Suscribirme"},
gallery:{h:"Trabajo seleccionado",sub:"Una muestra de proyectos recientes.",items:[
{t:"Aurora Finance",c:"Producto · Fintech"},{t:"Ruta Andina",c:"Branding · Turismo"},{t:"Kima Health",c:"App · Salud"},
{t:"Puerto Verde",c:"Web · Energía"},{t:"Norte Estudio",c:"E-commerce · Retail"},{t:"Faro Editorial",c:"Plataforma · Media"}]},
team:{h:"Quienes lo hacen posible",sub:"Un equipo senior, disponible y sin intermediarios.",items:[
{n:"Camila Rojas",r:"Dirección de arte"},{n:"Andrés Vidal",r:"Ingeniería"},{n:"Fernanda Cruz",r:"Producto"},{n:"Nicolás Pino",r:"Data & BI"}]},
blog:{h:"Últimos artículos",sub:"Ideas y guías escritas por el equipo.",feat:{k:"Destacado",t:"Guía 2026: cómo lanzar tu producto en 30 días",d:"Un plan semana a semana para pasar de idea a lanzamiento con validación real.",m:"12 min de lectura",b:"Leer artículo"},
posts:[{t:"5 métricas que tu landing debería medir",m:"6 min"},{t:"Diseño de precios: psicología aplicada",m:"8 min"},{t:"Checklist SEO antes de publicar",m:"5 min"}]}};
return D[type]||{}
}
var FIELD_DEFS={
hero:[{k:"badge",l:"Etiqueta superior"},{k:"t",l:"Título (vacío = tu eslogan)"},{k:"sub",l:"Bajada (vacío = tu descripción)"},{k:"b1",l:"Botón 1"},{k:"b2",l:"Botón 2"}],
logos:[{k:"h",l:"Texto introductorio"}],
features:[{k:"h",l:"Título"},{k:"sub",l:"Bajada"},{k:"items",l:"Características",ik:["t","d"],l2:["Nombre","Descripción"]}],
stats:[{k:"items",l:"Métricas",ik:["n","l"],l2:["Número","Etiqueta"]}],
showcase:[{k:"k",l:"Etiqueta"},{k:"h",l:"Título"},{k:"sub",l:"Texto"},{k:"points",l:"Puntos del listado",ik:["t"],l2:["Texto"]},{k:"b",l:"Botón"}],
steps:[{k:"h",l:"Título"},{k:"sub",l:"Bajada"},{k:"items",l:"Pasos",ik:["t","d"],l2:["Título","Descripción"]}],
testi:[{k:"h",l:"Título"},{k:"sub",l:"Bajada"},{k:"items",l:"Testimonios",ik:["q","a","r"],l2:["Cita","Nombre","Cargo"]}],
pricing:[{k:"h",l:"Título"},{k:"sub",l:"Bajada"},{k:"p2pr",l:"Precio plan destacado"},{k:"p2b",l:"Botón plan destacado"}],
faq:[{k:"h",l:"Título"},{k:"sub",l:"Bajada"},{k:"items",l:"Preguntas",ik:["q","d"],l2:["Pregunta","Respuesta"]}],
cta:[{k:"h",l:"Título"},{k:"sub",l:"Bajada"},{k:"b",l:"Botón 1"},{k:"b2",l:"Botón 2"}],
form:[{k:"h",l:"Título"},{k:"sub",l:"Bajada"},{k:"b",l:"Botón"}],
newsletter:[{k:"h",l:"Título"},{k:"sub",l:"Bajada"},{k:"b",l:"Botón"}],
gallery:[{k:"h",l:"Título"},{k:"sub",l:"Bajada"},{k:"items",l:"Piezas",ik:["t","c"],l2:["Nombre","Categoría"]}],
team:[{k:"h",l:"Título"},{k:"sub",l:"Bajada"},{k:"items",l:"Personas",ik:["n","r"],l2:["Nombre","Rol"]}],
blog:[{k:"h",l:"Título"},{k:"sub",l:"Bajada"},{k:"featt",l:"Título destacado"},{k:"featd",l:"Resumen destacado"}],
nav:[],footer:[]
};
var SEC_META={nav:"Barra de navegación",hero:"Hero / Portada",logos:"Clientes / Logos",features:"Características",stats:"Métricas",showcase:"Bloque destacado",steps:"Pasos / Proceso",testi:"Testimonios",pricing:"Precios",faq:"Preguntas frecuentes",cta:"Llamado a la acción",form:"Formulario de contacto",newsletter:"Suscripción",gallery:"Galería",team:"Equipo",blog:"Artículos",footer:"Pie de página"};
var SEC_ICON={nav:"layers",hero:"spark",logos:"heart",features:"bolt",stats:"chart",showcase:"star",steps:"arrow",testi:"shield",pricing:"lock",faq:"spark",cta:"arrow",form:"pen",newsletter:"heart",gallery:"layers",team:"star",blog:"pen",footer:"layers"};
/* ═══ estado ═══ */
var STORE_KEY="codekat-genpro-v53";
function freshBrand(){return{nombre:"Lumen",eslogan:"Ilumina la forma en que trabajas",desc:"Lumen es la plataforma que centraliza tus proyectos, automatiza lo repetible y le da a tu equipo claridad en tiempo real.",cta:"Empezar gratis",cta2:"Ver demo",logo:"",rubro:"tecnologia"}}
var UID=0;function nid(){return++UID}
function buildSecs(tid){return (TYPES[tid]||TYPES["clasica-or"]).secs.map(function(t){return{id:nid(),type:t,data:{}}})}
function defaultState(){return{alloy:"moderno",landingType:"clasica-or",bg:"gradiente-oscuro",primary:"#6E56F8",accent:"#37D4C0",
fontHead:"Geist",fontBody:"Manrope",headScale:2,radius:16,btnStyle:"redondeado",shadow:"media",density:"normal",
effects:{glow:true,grain:false,glass:true},brand:freshBrand(),sections:buildSecs("clasica-or"),
navV:"clasica",cardV:"vidrio",btnV:"solido",anim:"fade-up",
layout:{align:"auto",container:"normal",alt:false,btnSize:"normal",navSticky:true},
device:"movil",format:"full"}}
var state=defaultState();
function inList(list,v){for(var i=0;i<list.length;i++)if(list[i][0]===v)return true;return false}
try{
var _sv=JSON.parse(localStorage.getItem(STORE_KEY)||localStorage.getItem("codekat-genpro-v52")||"null");
if(_sv&&_sv.sections&&TYPES[_sv.landingType]){
state=Object.assign(defaultState(),_sv);
state.brand=Object.assign(freshBrand(),_sv.brand||{});
state.effects=Object.assign({glow:true,grain:false,glass:true},_sv.effects||{});
state.layout=Object.assign({align:"auto",container:"normal",alt:false,btnSize:"normal",navSticky:true},_sv.layout||{});
UID=_sv.sections.reduce(function(m,s){return Math.max(m,s.id||0)},0)+100;
var _okA=false;for(var _i=0;_i<ALLOYS.length;_i++)if(ALLOYS[_i].id===state.alloy)_okA=true;
if(!_okA)state.alloy="moderno";
if(!bgById(state.bg)||BGS.indexOf(bgById(state.bg))===-1||state.bg!==bgById(state.bg).id)state.bg=defaultState().bg;
if(!inList(NAVS,state.navV))state.navV="clasica";
if(!inList(CARDS,state.cardV))state.cardV="vidrio";
if(!inList(BTNS,state.btnV))state.btnV="solido";
if(!inList(ANIMS,state.anim))state.anim="fade-up";
if(["full","html","css","js","img"].indexOf(state.format)<0)state.format="full";
}
}catch(e){state=defaultState()}
var saveT=null;
function save(){clearTimeout(saveT);saveT=setTimeout(function(){try{localStorage.setItem(STORE_KEY,JSON.stringify(state))}catch(e){}updateCodeLabel()},250)}
/* ═══ motor de la página generada ═══ */
var SHADOWS={ninguna:"none",sutil:"0 1px 2px rgba(0,0,0,.06),0 8px 24px -14px rgba(0,0,0,.18)",media:"0 2px 6px rgba(0,0,0,.10),0 18px 44px -16px rgba(0,0,0,.32)",alta:"0 4px 12px rgba(0,0,0,.14),0 30px 70px -20px rgba(0,0,0,.5)"};
function ctx(){
var s=state,p=s.primary,a=s.accent;
var bd=bgById(s.bg),spec=bd.make(p,a);
var dark=bd.dark,bgc=spec.bgc||"#0C0F15",bgi=spec.bgi||"none",bgs=spec.bgs||"auto";
if(s.effects.glow){var g="radial-gradient(640px 440px at 12% -6%,"+hexA(p,dark?.22:.14)+",transparent 62%),radial-gradient(540px 400px at 90% 2%,"+hexA(a,dark?.16:.10)+",transparent 62%)";bgi=bgi==="none"?g:g+", "+g}
var text=dark?"#EDEFF5":"#171A21",muted=dark?"#A6ADC2":"#5C6270";
return{dark:dark,bgc:bgc,bgi:bgi,bgs:bgs,text:text,muted:muted,p:p,a:a,
line:dark?"rgba(255,255,255,.10)":"rgba(23,26,33,.12)",
card:dark?"#12161F":"#FFFFFF",cardRGB:dark?"18,22,31":"255,255,255",bgRGB:dark?"12,15,21":(bd.id==="solido-crema"?"244,239,227":"247,246,242"),
fh:s.fontHead,fb:s.fontBody,radius:s.radius,rBtn:s.btnStyle==="pildora"?999:(s.btnStyle==="recto"?0:Math.max(8,s.radius-4)),
pad:({compacto:"60px",normal:"88px",amplio:"120px"})[s.density],gap:({compacto:"14px",normal:"22px",amplio:"30px"})[s.density],
wrap:({estrecho:"980px",normal:"1120px",ancho:"1320px"})[s.layout.container],
shadow:SHADOWS[s.shadow],glow:s.effects.glow,grain:s.effects.grain,glass:s.effects.glass,
brand:s.brand,sections:s.sections,navV:s.navV,cardV:s.cardV,btnV:s.btnV,anim:s.anim,layout:s.layout,
h1:({1:"clamp(2rem,4.8vw,3rem)",2:"clamp(2.3rem,5.6vw,3.9rem)",3:"clamp(2.7rem,7vw,4.9rem)"})[s.headScale],
h2:({1:"clamp(1.55rem,3.2vw,2rem)",2:"clamp(1.75rem,3.6vw,2.45rem)",3:"clamp(2rem,4.2vw,3rem)"})[s.headScale]}
}
function fontsHref(c){
var fams=[],seen={};
[c.fh,c.fb].forEach(function(f){if(SYS_FONTS.indexOf(f)<0&&!seen[f]){seen[f]=1;fams.push(f)}});
if(!fams.length)return"";
return '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="https://fonts.googleapis.com/css2?'+fams.map(function(f){return "family="+f.replace(/ /g,"+")+":wght@400;500;600;700;800"}).join("&")+'&display=swap" rel="stylesheet">'
}
var GRAIN='url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'140\' height=\'140\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'2\'/%3E%3C/filter%3E%3Crect width=\'140\' height=\'140\' filter=\'url(%23n)\' opacity=\'0.4\'/%3E%3C/svg%3E")';
function rootCls(c){return "lp an-"+c.anim+" cv-"+c.cardV+" bv-"+c.btnV+(c.layout.alt?" alt":"")+" bsz-"+c.layout.btnSize+(c.layout.navSticky?"":" nst")+(c.layout.align==="izq"?" hal-l":c.layout.align==="centro"?" hal-c":"")}
function buttonsCssBlock(c){
var v=c.btnV;
if(v==="contorno")return ".b-p{background:transparent;color:"+(c.dark?"var(--text)":mix(c.p,"#000",.2))+";border:1.5px solid var(--primary);box-shadow:none}\n.b-p:hover{background:var(--primary);color:"+onColor(c.p)+"}";
if(v==="suave")return ".b-p{background:"+hexA(c.p,.16)+";color:"+(c.dark?"var(--text)":mix(c.p,"#000",.25))+";box-shadow:none}";
if(v==="degradado")return ".b-p{background:linear-gradient(100deg,var(--primary),var(--accent));color:"+onColor(mix(c.p,c.a,.5))+"}";
if(v==="resplandor")return ".b-p{box-shadow:0 0 24px "+hexA(c.p,.55)+",0 12px 28px -10px "+hexA(c.p,.6)+"}\n.b-p:hover{box-shadow:0 0 38px "+hexA(c.p,.7)+",0 16px 34px -10px "+hexA(c.p,.7)+"}";
if(v==="3d")return ".b-p{border-bottom:3px solid "+mix(c.p,"#000",.4)+"}\n.b-p:active{transform:translateY(2px);border-bottom-width:1px}";
if(v==="doble")return ".b-p{box-shadow:0 0 0 3px "+(c.dark?"#0C0F15":"#FFFFFF")+",0 0 0 4.5px var(--primary)}";
if(v==="minimal")return ".b-p{background:none;color:var(--text);box-shadow:none;border-radius:0;border-bottom:2px solid var(--accent);padding-inline:.4em}";
if(v==="viva")return ".b-p{box-shadow:5px 5px 0 "+hexA(c.a,.9)+";border:1.5px solid "+(c.dark?"rgba(255,255,255,.35)":"rgba(20,22,30,.55)")+"}\n.b-p:hover{transform:translate(-2px,-2px);box-shadow:8px 8px 0 "+hexA(c.a,.9)+"}";
if(v==="neon")return ".b-p{background:transparent;border:1.5px solid var(--primary);color:var(--primary);box-shadow:0 0 18px "+hexA(c.p,.4)+",inset 0 0 12px "+hexA(c.p,.15)+";text-shadow:0 0 10px "+hexA(c.p,.6)+"}";
return ""
}
function baseCss(c){
var looks={borde:{bg:"var(--card)",bd:"var(--line)",sh:"none"},sombra:{bg:"var(--card)",bd:"transparent",sh:"var(--shadow)"},
vidrio:{bg:"rgba("+c.cardRGB+",.62)",bd:"rgba("+c.cardRGB+",.9)",sh:"var(--shadow)"},degradado:{bg:"linear-gradient(160deg,"+hexA(c.p,.16)+",rgba("+c.cardRGB+",.55))",bd:hexA(c.p,.28),sh:"var(--shadow)"},
elevada:{bg:"var(--card)",bd:"transparent",sh:c.shadow==="ninguna"?SHADOWS.media:c.shadow},plana:{bg:"transparent",bd:"transparent",sh:"none"},
acento:{bg:"var(--card)",bd:"var(--line)",sh:"none"},lado:{bg:"var(--card)",bd:"var(--line)",sh:"none"},numerada:{bg:"var(--card)",bd:"var(--line)",sh:"none"},centrada:{bg:"var(--card)",bd:"transparent",sh:"var(--shadow)"}};
var L=looks[c.cardV]||looks.borde;
var anims={"fade-up":".rv{opacity:0;transform:translateY(26px)}","fade":".rv{opacity:0}","slide-l":".rv{opacity:0;transform:translateX(-34px)}","slide-r":".rv{opacity:0;transform:translateX(34px)}","zoom":".rv{opacity:0;transform:scale(.92)}","blur":".rv{opacity:0;filter:blur(8px)}","lenta":".rv{opacity:0;transform:translateY(26px);transition-duration:1.3s!important}"};
var rvBase=c.anim==="off"?"":".rv{transition:opacity .7s ease,transform .7s cubic-bezier(.2,.7,.2,1),filter .7s ease}\n.rv.in{opacity:1;transform:none;filter:none}\n"+(anims[c.anim]||"");
return [
"/* Generado con CodeKat · Generador Pro · "+new Date().toLocaleDateString("es-CL")+" */",
":root{--text:"+c.text+";--muted:"+c.muted+";--primary:"+c.p+";--accent:"+c.a+";--line:"+c.line+";--card:"+c.card+";--radius:"+c.radius+"px;--pad:"+c.pad+";--gap:"+c.gap+";--shadow:"+c.shadow+";--wrap:"+c.wrap+";--fh:"+(SYS_FONTS.indexOf(c.fh)<0?"'"+c.fh+"', ":"")+FONT_STACK+";--fb:"+(SYS_FONTS.indexOf(c.fb)<0?"'"+c.fb+"', ":"")+FONT_STACK+"}",
"*,*::before,*::after{box-sizing:border-box;margin:0}","html{scroll-behavior:smooth}","body{background:#0B0D12}",
".lp{background:"+c.bgc+";color:var(--text);font-family:var(--fb);line-height:1.6;position:relative;overflow-x:clip;font-size:16px}",
".lp ::selection{background:"+hexA(c.p,.35)+"}",
".lp::before{content:\"\";position:absolute;inset:0;background-image:"+c.bgi+";background-size:"+c.bgs+";pointer-events:none}",
".lp>*{position:relative}",
(c.grain?".lp::after{content:\"\";position:fixed;inset:0;background:"+GRAIN+";opacity:.05;pointer-events:none;z-index:99}":""),
".wrap{max-width:var(--wrap);margin-inline:auto;padding-inline:24px}",".sec{padding-block:var(--pad)}",
".kicker{display:inline-block;font-size:.72rem;letter-spacing:.16em;text-transform:uppercase;font-weight:700;color:"+(c.dark?"var(--accent)":"var(--primary)")+";border:1px solid "+hexA(c.p,.4)+";background:"+hexA(c.p,.10)+";padding:.42em 1em;border-radius:999px}",
".shead{max-width:680px;margin-bottom:calc(var(--pad)*.55)}",".shead.center{margin-inline:auto;text-align:center}",".shead .kicker{margin-bottom:16px}",
".shead h2{font-family:var(--fh);font-size:"+c.h2+";line-height:1.12;letter-spacing:-.015em;font-weight:700}",".shead p{color:var(--muted);margin-top:14px;font-size:1.05rem}",
".b{display:inline-flex;align-items:center;justify-content:center;gap:.55em;font-weight:700;font-family:var(--fb);font-size:1rem;padding:.9em 1.7em;border-radius:"+(c.rBtn===999?"999px":"calc(var(--radius)*.72 + 4px)")+";border:1px solid transparent;cursor:pointer;text-decoration:none;transition:transform .2s,box-shadow .25s,background .25s,border-color .25s,color .25s}",
".b:active{transform:scale(.97)}",".b-p{background:var(--primary);color:"+onColor(c.p)+";box-shadow:0 12px 28px -12px "+hexA(c.p,.6)+"}",
".b-p:hover{transform:translateY(-2px);box-shadow:0 18px 36px -12px "+hexA(c.p,.7)+";background:"+mix(c.p,c.dark?"#FFFFFF":"#000000",.09)+"}",
".b-s{background:"+(c.dark?"rgba(255,255,255,.08)":"rgba(23,26,33,.06)")+";border-color:var(--line);color:var(--text)}",".b-s:hover{border-color:"+hexA(c.p,.55)+";transform:translateY(-2px)}",
".b-g{color:var(--muted);padding-inline:.6em}",".b-g:hover{color:var(--text)}",
buttonsCssBlock(c),
".bsz-compacto .b{padding:.68em 1.3em;font-size:.9rem}",".bsz-grande .b{padding:1.05em 2.1em;font-size:1.06rem}",
".card,.fcard,.tcard,.qcard,.art,.step-in,.nl-box,.form-card,.hero-mock,.gcard{background:"+L.bg+";border:1px solid "+L.bd+";box-shadow:"+L.sh+";border-radius:calc(var(--radius) + 4px)}",
(c.cardV==="vidrio"?".card,.fcard,.tcard,.qcard,.art,.step-in,.nl-box,.form-card,.hero-mock,.gcard{backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}":""),
".cv-elevada .fcard:hover{transform:translateY(-6px)}",".cv-acento .fcard{border-top:3px solid var(--primary)}",
".cv-lado .fcard{display:grid;grid-template-columns:auto 1fr;gap:16px;align-items:start}",".cv-lado .fcard .fi{margin:0}",
".cv-centrada .fcard{text-align:center}",".cv-centrada .fcard .fi{margin-inline:auto}",
".cv-plana .fcard{background:transparent;border:none;box-shadow:none;padding-inline:6px}",
".cv-numerada .fgrid{counter-reset:fc}",".cv-numerada .fcard{counter-increment:fc}",".cv-numerada .fcard .fi{display:none}",
".cv-numerada .fcard::before{content:\"0\" counter(fc);font-family:var(--fh);font-weight:700;font-size:2rem;display:block;background:linear-gradient(120deg,var(--primary),var(--accent));-webkit-background-clip:text;background-clip:text;color:transparent;margin-bottom:12px}",
".hal-l .hero .wrap,.hal-l .hero .hero-copy{text-align:left;align-items:flex-start}",".hal-l .hero p{margin-inline:0}",".hal-l .hero-cta,.hal-l .hero-trust{justify-content:flex-start}",
".hal-c .hero .wrap{text-align:center;display:flex;flex-direction:column;align-items:center}",".hal-c .hero p{margin-inline:auto}",".hal-c .hero-cta,.hal-c .hero-trust{justify-content:center}",
".nst .nav{position:static}",".alt .sp-grid>.art-panel{order:2}",
rvBase,
"@media (prefers-reduced-motion:reduce){.rv{opacity:1!important;transform:none!important;filter:none!important;transition:none!important}.lp{scroll-behavior:auto}.mq{animation:none!important}.float{animation:none!important}.art-ring{animation:none!important}}"
].filter(function(x){return x}).join("\n")
}
function gd(sec,k){return sec.data[k]!==undefined&&sec.data[k]!==""?sec.data[k]:defaultsFor(sec.type)[k]}
var SEC={
nav:{
html:function(c,d,all){
var b=c.brand,links=all.filter(function(s){return ANCH[s.type]}).slice(0,4).map(function(s){return '<a href="#'+ANCH[s.type]+'">'+LBL[s.type]+'</a>'}).join("");
var logo=b.logo?'<img class="brand-logo" src="'+b.logo+'" alt="logo">':'<span class="brand-mark">'+esc((b.nombre||"C").trim().charAt(0).toUpperCase())+'</span>';
var top=c.navV==="doble"?'<div class="nav-top"><div class="wrap nav-top-in"><span>📧 crisdev.chile@gmail.com</span><span>📱 +56 9 3346 5843</span></div></div>':"";
return top+'<header class="nav nv-'+c.navV+'"><div class="wrap nav-in"><a class="brand" href="#top">'+logo+esc(b.nombre)+'</a><input type="checkbox" id="nm" class="nm"><label for="nm" class="burger" aria-label="Abrir menú"><span></span><span></span><span></span></label><nav class="menu">'+links+'<a class="b b-p nav-cta" href="#cta">'+esc(b.cta)+'</a></nav></div></header>'},
css:function(c){return [
".nav{position:sticky;top:0;z-index:50;background:"+(c.glass?"rgba("+c.bgRGB+",.72)":"rgba("+c.bgRGB+",.94)")+";"+(c.glass?"backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);":"")+"border-bottom:1px solid var(--line)}",
".nav-in{display:flex;align-items:center;gap:26px;min-height:"+(c.navV==="compacta"?"54px":"66px")+";position:relative}",
".brand{display:flex;align-items:center;gap:10px;font-family:var(--fh);font-weight:700;font-size:"+(c.navV==="compacta"?".95rem":"1.06rem")+";color:var(--text);text-decoration:none}",
".brand-mark{width:32px;height:32px;border-radius:"+Math.max(6,c.radius-6)+"px;background:linear-gradient(135deg,var(--primary),var(--accent));color:"+onColor(c.p)+";display:grid;place-items:center;font-size:.95rem}",
".brand-logo{height:32px;width:auto;border-radius:6px}",
".menu{margin-left:auto;display:flex;align-items:center;gap:24px}",
".menu>a:not(.b){color:var(--muted);text-decoration:none;font-size:.93rem;font-weight:600;transition:color .2s}",
".menu>a:not(.b):hover{color:var(--text)}",
".nav-cta{padding:.62em 1.3em;font-size:.9rem}",
".nm{display:none}.burger{display:none;flex-direction:column;gap:5px;margin-left:auto;cursor:pointer;padding:6px}",
".burger span{width:22px;height:2px;background:var(--text);border-radius:2px;transition:.25s}",
".nv-minimal{background:transparent;border-bottom-color:transparent;backdrop-filter:none}",
".nv-centrada .menu{margin:0 auto}",
".nv-invertida .nav-in{flex-direction:row-reverse}",
".nv-invertida .menu{margin-right:auto;margin-left:0}",
".nv-invertida .burger{margin-left:0;margin-right:auto}",
".nv-acento{border-bottom:2px solid var(--primary)}",
".nv-pildora{top:12px;margin:12px auto 0;max-width:calc(var(--wrap) - 32px);border-radius:999px;border:1px solid var(--line);background:"+(c.dark?"rgba(18,22,31,.92)":"rgba(255,255,255,.92)")+";box-shadow:var(--shadow)}",
".nv-doble .nav-in{min-height:58px}",
".nav-top{border-bottom:1px solid var(--line);background:rgba("+c.bgRGB+",.6)}",
".nav-top-in{display:flex;justify-content:flex-end;gap:22px;font-size:.78rem;color:var(--muted);padding-block:7px}",
"@media(max-width:860px){.burger{display:flex}",
".menu{position:absolute;top:calc(100% + 10px);left:16px;right:16px;flex-direction:column;align-items:stretch;gap:4px;background:var(--card);border:1px solid var(--line);border-radius:calc(var(--radius) + 2px);padding:14px;box-shadow:var(--shadow);display:none}",
".menu>a:not(.b){padding:10px 8px;border-radius:8px}",
".nav-cta{margin-top:8px;justify-content:center}",
".nm:checked~.menu{display:flex}",
".nm:checked~.burger span:nth-child(1){transform:translateY(7px) rotate(45deg)}",
".nm:checked~.burger span:nth-child(2){opacity:0}",
".nm:checked~.burger span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}}"
].join("\n")}
},
hero:{
html:function(c,d,all,variant){
var b=c.brand,s={type:"hero",data:d},t=gd(s,"t")||b.eslogan,sub=gd(s,"sub")||b.desc,b1=gd(s,"b1")||b.cta,b2=gd(s,"b2")||b.cta2,badge=gd(s,"badge");
var kw=t.split(" "),mid=Math.floor(kw.length/2);
var hl=kw.length>2?esc(kw.slice(0,mid).join(" "))+' <span class="hl">'+esc(kw.slice(mid).join(" "))+'</span>':esc(t);
var trust='<div class="hero-trust"><span class="avs"><i>A</i><i>J</i><i>M</i><i>R</i></span><span class="stars">★★★★★</span><em>+2.000 equipos ya trabajan así</em></div>';
var mock='<div class="hero-visual"><div class="hero-mock"><div class="hm-bar"><i></i><i></i><i></i><u></u></div><div class="hm-body"><div class="hm-side"><i></i><i></i><i></i><i></i></div><div class="hm-main"><div class="hm-hero"></div><div class="hm-cards"><i></i><i></i><i></i></div></div></div></div><div class="float f1"><div class="fnum">+128%</div><div class="flab">de conversión</div></div><div class="float f2"><div class="fnum">★ 4.9</div><div class="flab">satisfacción</div></div></div>';
var kick=badge?'<span class="kicker">'+esc(badge)+"</span>":"";
if(variant==="minimal")return '<section class="sec hero" id="top"><div class="wrap">'+kick+"<h1>"+esc(t)+"</h1><p>"+esc(sub)+'</p><div class="hero-cta"><a class="b b-p" href="#cta">'+esc(b1)+'</a><a class="b b-s" href="#caracteristicas">'+esc(b2)+"</a></div></div></section>";
if(variant==="big")return '<section class="sec hero" id="top"><div class="wrap">'+kick+"<h1>"+hl+"</h1><p>"+esc(sub)+'</p><div class="hero-cta"><a class="b b-p" href="#cta">'+esc(b1)+' <span class="arr">→</span></a><a class="b b-g" href="#trabajos">'+esc(b2)+" →</a></div>"+trust+"</div></section>";
if(variant==="evento")return '<section class="sec hero hero-center" id="top"><div class="wrap"><span class="kicker">📍 Santiago · 12 de noviembre</span><h1>'+hl+"</h1><p>"+esc(sub)+'</p><div class="hero-cta"><a class="b b-p" href="#precios">'+esc(b1)+'</a><a class="b b-s" href="#proceso">'+esc(b2)+'</a></div><div class="event-meta"><span>🗓 12 NOV 2026</span><span>⏰ 09:00 – 19:00</span><span>🎤 8 charlas</span></div></div></section>';
if(variant==="blog")return '<section class="sec hero" id="top"><div class="wrap"><span class="kicker">Blog de '+esc(b.nombre)+"</span><h1>Ideas para construir mejores productos</h1><p>"+esc(sub)+"</p></div></section>";
if(variant==="split")return '<section class="sec hero" id="top"><div class="wrap hero-grid"><div class="hero-copy">'+kick+"<h1>"+hl+"</h1><p>"+esc(sub)+'</p><div class="hero-cta"><a class="b b-p" href="#cta">'+esc(b1)+'</a><a class="b b-s" href="#caracteristicas">'+esc(b2)+"</a></div>"+trust+"</div>"+mock+"</div></section>";
return '<section class="sec hero hero-center" id="top"><div class="wrap">'+kick+"<h1>"+hl+"</h1><p>"+esc(sub)+'</p><div class="hero-cta"><a class="b b-p" href="#cta">'+esc(b1)+'</a><a class="b b-s" href="#caracteristicas">'+esc(b2)+"</a></div>"+trust+'<div class="hero-visual wide">'+mock+"</div></div></section>"},
css:function(c){return [
".hero{padding-top:calc(var(--pad)*.9);padding-bottom:calc(var(--pad)*.9)}",
".hero .kicker{margin-bottom:22px}",
".hero h1{font-family:var(--fh);font-size:"+c.h1+";line-height:1.05;letter-spacing:-.025em;font-weight:700}",
".hero p{color:var(--muted);font-size:1.12rem;max-width:56ch;margin-top:20px}",
".hl{background:linear-gradient(100deg,var(--primary),var(--accent));-webkit-background-clip:text;background-clip:text;color:transparent}",
".hero-cta{display:flex;gap:14px;flex-wrap:wrap;margin-top:30px}",
".hero-trust{display:flex;align-items:center;gap:14px;margin-top:30px;flex-wrap:wrap}",
".avs{display:flex}.avs i{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;font-style:normal;font-size:.68rem;font-weight:800;color:"+onColor(c.p)+";background:linear-gradient(135deg,"+mix(c.p,"#000",.15)+","+mix(c.a,"#000",.2)+");border:2px solid rgba("+c.bgRGB+",.9);margin-left:-8px}",
".avs i:first-child{margin-left:0}",
".stars{color:var(--accent);letter-spacing:2px;font-size:.9rem}",
".hero-trust em{color:var(--muted);font-style:normal;font-size:.85rem}",
".hero-center .wrap{text-align:center;display:flex;flex-direction:column;align-items:center}",
".hero-center p{margin-inline:auto}",
".hero-center .hero-cta,.hero-center .hero-trust{justify-content:center}",
".hero .arr{transition:transform .2s}.hero .b:hover .arr{transform:translateX(4px)}",
".event-meta{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;margin-top:26px}",
".event-meta span{border:1px solid var(--line);border-radius:999px;padding:.5em 1.1em;font-size:.85rem;color:var(--muted);background:rgba("+c.cardRGB+",.5)}",
".hero-grid{display:grid;gap:48px;align-items:center}",
"@media(min-width:920px){.hero-grid{grid-template-columns:1.05fr .95fr}}",
".hero-visual{position:relative;max-width:520px;margin:44px auto 0}",
".hero-visual.wide{max-width:840px}",
".hero-grid>.hero-visual{margin:0;justify-self:end;width:100%}",
".hero-mock{overflow:hidden}",
".hm-bar{display:flex;align-items:center;gap:7px;padding:13px 16px;border-bottom:1px solid var(--line)}",
".hm-bar i{width:10px;height:10px;border-radius:50%;background:"+hexA(c.p,.45)+"}",
".hm-bar i:nth-child(2){background:"+hexA(c.a,.45)+"}.hm-bar i:nth-child(3){background:rgba(136,136,136,.4)}",
".hm-bar u{flex:1;height:8px;border-radius:4px;background:"+hexA(c.dark?"#FFFFFF":"#14161E",.07)+";margin-left:10px}",
".hm-body{display:flex;min-height:280px}",
".hm-side{width:88px;border-right:1px solid var(--line);padding:18px 14px;display:flex;flex-direction:column;gap:12px}",
".hm-side i{height:9px;border-radius:5px;background:"+hexA(c.dark?"#FFFFFF":"#14161E",.09)+"}",
".hm-side i:first-child{background:linear-gradient(90deg,var(--primary),var(--accent));opacity:.85}",
".hm-main{flex:1;padding:18px}",
".hm-hero{height:104px;border-radius:calc(var(--radius)*.7);background:linear-gradient(120deg,"+hexA(c.p,.6)+","+hexA(c.a,.45)+");margin-bottom:16px;position:relative;overflow:hidden}",
".hm-hero::after{content:\"\";position:absolute;inset:0;background:repeating-linear-gradient(115deg,rgba(255,255,255,.12) 0 2px,transparent 2px 26px)}",
".hm-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}",
".hm-cards i{height:86px;border-radius:calc(var(--radius)*.6);border:1px solid var(--line);background:rgba("+c.cardRGB+",.65)}",
".float{position:absolute;background:var(--card);border:1px solid var(--line);border-radius:calc(var(--radius)*.7);padding:12px 16px;box-shadow:var(--shadow);animation:fl 6s ease-in-out infinite}",
".f1{top:-16px;right:-8px}.f2{bottom:-14px;left:-10px;animation-delay:-3s}",
".fnum{font-family:var(--fh);font-weight:700;font-size:1.15rem}.flab{font-size:.72rem;color:var(--muted)}",
"@keyframes fl{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}",
"@media(max-width:560px){.hm-side{display:none}.f1{right:2px}.f2{left:2px}}"
].join("\n")}
},
logos:{html:function(c,d){return '<section class="sec logos"><div class="wrap"><p class="logos-h">'+esc(gd({type:"logos",data:d},"h"))+'</p><div class="mq"><div class="mq-track"><span>AURORA</span><span>VERTEX</span><span>NIMBUS</span><span>KOA</span><span>ATLAS</span><span>PULSAR</span><span>AURORA</span><span>VERTEX</span><span>NIMBUS</span><span>KOA</span><span>ATLAS</span><span>PULSAR</span></div></div></div></section>'},
css:function(){return [
".logos{padding-block:calc(var(--pad)*.5)}",
".logos-h{text-align:center;font-size:.8rem;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-bottom:26px}",
".mq{overflow:hidden;mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent);-webkit-mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)}",
".mq-track{display:flex;gap:56px;width:max-content;animation:mq 28s linear infinite}",
".mq-track span{font-family:var(--fh);font-weight:700;font-size:1.15rem;letter-spacing:.14em;color:var(--muted);opacity:.6}",
"@keyframes mq{to{transform:translateX(-50%)}}"
].join("\n")}},
features:{html:function(c,d){var s={type:"features",data:d},items=gd(s,"items");
return '<section class="sec features" id="caracteristicas"><div class="wrap"><div class="shead rv"><span class="kicker">Características</span><h2>'+esc(gd(s,"h"))+"</h2><p>"+esc(gd(s,"sub"))+'</p></div><div class="fgrid">'+items.map(function(it,i){return '<div class="fcard rv" style="transition-delay:'+i*60+'ms"><div class="fi">'+ico(it.i||"spark",22)+"</div><h3>"+esc(it.t)+"</h3><p>"+esc(it.d)+"</p></div>"}).join("")+"</div></div></section>"},
css:function(c){return [
".fgrid{display:grid;gap:var(--gap);grid-template-columns:1fr}",
"@media(min-width:620px){.fgrid{grid-template-columns:repeat(2,1fr)}}",
"@media(min-width:960px){.fgrid{grid-template-columns:repeat(3,1fr)}}",
".fcard{padding:26px;transition:transform .25s,border-color .25s,box-shadow .25s}",
".fcard:hover{border-color:"+hexA(c.p,.5)+"}",
".fi{width:44px;height:44px;border-radius:"+Math.max(8,c.radius-4)+"px;background:"+hexA(c.p,.14)+";color:"+(c.dark?"var(--primary)":mix(c.p,"#000",.15))+";display:grid;place-items:center;margin-bottom:18px}",
".fcard h3{font-family:var(--fh);font-size:1.12rem;margin-bottom:8px}",
".fcard p{color:var(--muted);font-size:.94rem}"
].join("\n")}},
stats:{html:function(c,d){var items=gd({type:"stats",data:d},"items");
return '<section class="sec stats" id="metricas"><div class="wrap"><div class="sgrid rv">'+items.map(function(it){return '<div class="stat"><span class="num">'+esc(it.n)+'</span><span class="lab">'+esc(it.l)+"</span></div>"}).join("")+"</div></div></section>"},
css:function(c){return [
".sgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:26px;border-block:1px solid var(--line);padding-block:calc(var(--pad)*.45)}",
"@media(min-width:760px){.sgrid{grid-template-columns:repeat(4,1fr)}}",
".stat{display:flex;flex-direction:column;gap:4px;text-align:center}",
".stat .num{font-family:var(--fh);font-weight:700;font-size:clamp(1.9rem,4vw,2.6rem);letter-spacing:-.02em;background:linear-gradient(120deg,var(--text),"+(c.dark?"#9AA2B8":"#4A4F5C")+");-webkit-background-clip:text;background-clip:text;color:transparent}",
".stat .lab{color:var(--muted);font-size:.85rem}"
].join("\n")}},
showcase:{html:function(c,d){var s={type:"showcase",data:d},pts=gd(s,"points");
return '<section class="sec showcase" id="plataforma"><div class="wrap sp-grid"><div class="art-panel rv" aria-hidden="true"><div class="art-glow"></div><div class="art-ring"></div><div class="art-chip">▲ +24% este mes</div></div><div class="sp-copy"><span class="kicker">'+esc(gd(s,"k"))+"</span><h2>"+esc(gd(s,"h"))+"</h2><p>"+esc(gd(s,"sub"))+'</p><ul class="check">'+pts.map(function(p){return "<li>"+ico("check",18)+" "+esc(p.t)+"</li>"}).join("")+'</ul><a class="b b-s" href="#cta">'+esc(gd(s,"b"))+" →</a></div></div></section>"},
css:function(c){return [
".sp-grid{display:grid;gap:44px;align-items:center}",
"@media(min-width:920px){.sp-grid{grid-template-columns:.9fr 1.1fr}}",
".art-panel{position:relative;min-height:340px;border-radius:calc(var(--radius) + 8px);border:1px solid var(--line);background:linear-gradient(160deg,"+hexA(c.p,.30)+",rgba("+c.cardRGB+",.4) 60%,"+hexA(c.a,.22)+");overflow:hidden}",
".art-glow{position:absolute;inset:auto -20% -30% -20%;height:80%;background:radial-gradient(closest-side,"+hexA(c.a,.35)+",transparent)}",
".art-ring{position:absolute;width:220px;height:220px;border-radius:50%;border:1.5px dashed "+hexA(c.dark?"#FFFFFF":"#14161E",.3)+";top:14%;left:12%;animation:spin 26s linear infinite}",
"@keyframes spin{to{transform:rotate(360deg)}}",
".art-chip{position:absolute;bottom:22px;left:22px;background:var(--card);border:1px solid var(--line);border-radius:999px;padding:.5em 1.1em;font-size:.8rem;font-weight:700;box-shadow:var(--shadow)}",
".sp-copy .kicker{margin-bottom:16px}",
".sp-copy h2{font-family:var(--fh);font-size:"+c.h2+";line-height:1.12;letter-spacing:-.015em}",
".sp-copy>p{color:var(--muted);margin-top:14px}",
".check{list-style:none;display:flex;flex-direction:column;gap:12px;margin:24px 0 28px}",
".check li{display:flex;gap:11px;align-items:center;font-weight:600;font-size:.97rem}",
".check svg{color:"+(c.dark?"var(--accent)":mix(c.a,"#000",.15))+";flex:none}"
].join("\n")}},
steps:{html:function(c,d){var s={type:"steps",data:d},items=gd(s,"items");
return '<section class="sec steps" id="proceso"><div class="wrap"><div class="shead center rv"><span class="kicker">Proceso</span><h2>'+esc(gd(s,"h"))+"</h2><p>"+esc(gd(s,"sub"))+'</p></div><div class="steps-grid">'+items.map(function(it,i){return '<div class="step rv" style="transition-delay:'+i*80+'ms"><div class="step-num">0'+(i+1)+'</div><div class="step-in"><h3>'+esc(it.t)+"</h3><p>"+esc(it.d)+"</p></div></div>"}).join("")+"</div></div></section>"},
css:function(){return [
".steps-grid{display:grid;gap:var(--gap)}",
"@media(min-width:820px){.steps-grid{grid-template-columns:repeat(3,1fr)}}",
".step-num{font-family:var(--fh);font-weight:700;font-size:2.5rem;line-height:1;background:linear-gradient(120deg,var(--primary),var(--accent));-webkit-background-clip:text;background-clip:text;color:transparent;margin-bottom:14px}",
".step-in{padding:22px}",
".step-in h3{font-family:var(--fh);font-size:1.1rem;margin-bottom:8px}",
".step-in p{color:var(--muted);font-size:.93rem}"
].join("\n")}},
testi:{html:function(c,d){var s={type:"testi",data:d},items=gd(s,"items");
return '<section class="sec testi" id="testimonios"><div class="wrap"><div class="shead rv"><span class="kicker">Testimonios</span><h2>'+esc(gd(s,"h"))+"</h2><p>"+esc(gd(s,"sub"))+'</p></div><div class="tgrid">'+items.map(function(it,i){return '<figure class="tcard rv" style="transition-delay:'+i*70+'ms"><div class="stars">★★★★★</div><blockquote>“'+esc(it.q)+'”</blockquote><figcaption><span class="ava">'+esc((it.a||"A").charAt(0))+"</span><span><b>"+esc(it.a)+"</b><small>"+esc(it.r)+"</small></span></figcaption></figure>"}).join("")+"</div></div></section>"},
css:function(c){return [
".tgrid{display:grid;gap:var(--gap);grid-template-columns:1fr}",
"@media(min-width:640px){.tgrid{grid-template-columns:repeat(3,1fr)}}",
"@media(max-width:639px){.tgrid{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:10px;gap:14px;margin-inline:-24px;padding-inline:24px}",
".tcard{min-width:82%;scroll-snap-align:center}}",
".tcard{padding:24px;display:flex;flex-direction:column;gap:14px}",
".tcard .stars{color:var(--accent);letter-spacing:3px;font-size:.85rem}",
".tcard blockquote{font-size:.98rem;line-height:1.6;color:var(--text)}",
".tcard figcaption{display:flex;align-items:center;gap:11px;margin-top:auto}",
".ava{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;font-weight:800;font-size:.85rem;color:"+onColor(c.p)+";background:linear-gradient(135deg,var(--primary),var(--accent))}",
".tcard figcaption b{display:block;font-size:.9rem}",
".tcard figcaption small{color:var(--muted);font-size:.78rem}"
].join("\n")}},
pricing:{html:function(c,d){var s={type:"pricing",data:d},D=defaultsFor("pricing");
var p1=D.p1,p3=D.p3,p2=Object.assign({},D.p2,{pr:d.p2pr||D.p2.pr,b:d.p2b||D.p2.b});
function card(p,feat){return '<div class="qcard'+(feat?" feat":"")+' rv">'+(feat?'<span class="qpop">Más popular</span>':"")+"<h3>"+p.n+'</h3><p class="qd">'+p.d+'</p><div class="qprice"><span class="qp">'+esc(p.pr)+'</span><span class="qper">'+p.per+'</span></div><ul class="qf">'+p.f.map(function(f){return "<li>"+ico("check",16)+" "+esc(f)+"</li>"}).join("")+'</ul><a class="b '+(feat?"b-p":"b-s")+' qbtn" href="#cta">'+esc(p.b)+"</a></div>"}
return '<section class="sec pricing" id="precios"><div class="wrap"><div class="shead center rv"><span class="kicker">Precios</span><h2>'+esc(gd(s,"h"))+"</h2><p>"+esc(gd(s,"sub"))+'</p></div><div class="qgrid">'+card(p1,false)+card(p2,true)+card(p3,false)+"</div></div></section>"},
css:function(c){return [
".qgrid{display:grid;gap:var(--gap);grid-template-columns:1fr;max-width:1000px;margin-inline:auto}",
"@media(min-width:860px){.qgrid{grid-template-columns:repeat(3,1fr);align-items:stretch}}",
".qcard{padding:30px 26px;display:flex;flex-direction:column;position:relative}",
".qcard.feat{border-color:"+hexA(c.p,.65)+";box-shadow:0 24px 60px -22px "+hexA(c.p,.55)+"}",
"@media(min-width:860px){.qcard.feat{transform:scale(1.035)}}",
".qpop{position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:linear-gradient(90deg,var(--primary),var(--accent));color:"+onColor(c.p)+";font-size:.72rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase;padding:.45em 1.2em;border-radius:999px;white-space:nowrap}",
".qcard h3{font-family:var(--fh);font-size:1.15rem}",
".qd{color:var(--muted);font-size:.85rem;margin-top:4px}",
".qprice{display:flex;align-items:baseline;gap:6px;margin:20px 0}",
".qp{font-family:var(--fh);font-weight:700;font-size:2.5rem;letter-spacing:-.03em}",
".qper{color:var(--muted);font-size:.85rem}",
".qf{list-style:none;display:flex;flex-direction:column;gap:10px;margin-bottom:26px}",
".qf li{display:flex;gap:10px;align-items:center;font-size:.9rem;color:var(--muted)}",
".qf svg{color:"+(c.dark?"var(--accent)":mix(c.a,"#000",.12))+";flex:none}",
".qbtn{margin-top:auto;justify-content:center}"
].join("\n")}},
faq:{html:function(c,d){var s={type:"faq",data:d},items=gd(s,"items");
return '<section class="sec faq" id="preguntas"><div class="wrap"><div class="shead center rv"><span class="kicker">FAQ</span><h2>'+esc(gd(s,"h"))+"</h2><p>"+esc(gd(s,"sub"))+'</p></div><div class="flist">'+items.map(function(it){return '<details class="fitem"><summary>'+esc(it.q)+"</summary><p>"+esc(it.d)+"</p></details>"}).join("")+"</div></div></section>"},
css:function(c){return [
".flist{max-width:760px;margin-inline:auto;display:flex;flex-direction:column;gap:12px}",
".fitem{border:1px solid var(--line);border-radius:calc(var(--radius)*.8 + 4px);background:rgba("+c.cardRGB+",.5);padding:18px 20px;transition:border-color .2s}",
".fitem:hover,.fitem[open]{border-color:"+hexA(c.p,.5)+"}",
".fitem summary{cursor:pointer;font-weight:700;font-size:.99rem;list-style:none;display:flex;justify-content:space-between;gap:16px;align-items:center}",
".fitem summary::-webkit-details-marker{display:none}",
".fitem summary::after{content:\"+\";font-size:1.35rem;line-height:1;color:var(--primary);transition:transform .25s;flex:none}",
".fitem[open] summary::after{transform:rotate(45deg)}",
".fitem p{margin-top:12px;color:var(--muted);font-size:.93rem}"
].join("\n")}},
cta:{html:function(c,d){var s={type:"cta",data:d};
return '<section class="sec cta" id="cta"><div class="wrap"><div class="cta-box rv"><h2>'+esc(gd(s,"h"))+"</h2><p>"+esc(gd(s,"sub"))+'</p><div class="cta-actions"><a class="b cta-p" href="#contacto">'+esc(gd(s,"b"))+'</a><a class="b cta-s" href="https://wa.me/56933465843">'+esc(gd(s,"b2"))+"</a></div></div></div></section>"},
css:function(c){var ink=onColor(c.p);return [
".cta-box{background:linear-gradient(135deg,var(--primary),"+mix(c.a,c.p,.45)+");color:"+ink+";border-radius:calc(var(--radius) + 10px);padding:clamp(36px,6vw,68px);text-align:center;position:relative;overflow:hidden;box-shadow:0 30px 70px -24px "+hexA(c.p,.6)+"}",
".cta-box::after{content:\"\";position:absolute;inset:0;background:radial-gradient(420px 200px at 82% -10%,rgba(255,255,255,.28),transparent)}",
".cta-box h2{font-family:var(--fh);font-size:clamp(1.7rem,4vw,2.6rem);letter-spacing:-.02em;position:relative;z-index:1}",
".cta-box p{opacity:.85;max-width:52ch;margin:14px auto 0;position:relative;z-index:1}",
".cta-actions{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-top:30px;position:relative;z-index:1}",
".cta-p{background:"+(ink==="#FFFFFF"?"rgba(10,12,16,.88)":"#FFFFFF")+";color:"+(ink==="#FFFFFF"?"#FFFFFF":"#14161C")+";border-radius:"+(c.rBtn===999?"999px":"calc(var(--radius)*.72 + 4px)")+";padding:.9em 1.7em;font-weight:700;text-decoration:none;display:inline-flex;align-items:center;transition:transform .2s}",
".cta-p:hover{transform:translateY(-2px)}",
".cta-s{border:1.5px solid "+(ink==="#FFFFFF"?"rgba(255,255,255,.5)":"rgba(20,22,28,.4)")+";color:inherit;border-radius:"+(c.rBtn===999?"999px":"calc(var(--radius)*.72 + 4px)")+";padding:.9em 1.7em;font-weight:700;text-decoration:none;display:inline-flex;align-items:center;transition:background .2s}",
".cta-s:hover{background:rgba(255,255,255,.12)}"
].join("\n")}},
form:{html:function(c,d){var s={type:"form",data:d};
return '<section class="sec form" id="contacto"><div class="wrap form-grid"><div><div class="shead"><span class="kicker">Contacto</span><h2>'+esc(gd(s,"h"))+"</h2><p>"+esc(gd(s,"sub"))+'</p></div><ul class="fcontact"><li>📧 crisdev.chile@gmail.com</li><li>📱 +56 9 3346 5843</li><li>📍 Santiago, Chile</li></ul></div><form class="form-card rv" onsubmit="return false"><div class="frow"><label><span>Nombre</span><input type="text" placeholder="Tu nombre"></label><label><span>Correo</span><input type="email" placeholder="tu@correo.com"></label></div><label><span>Mensaje</span><textarea rows="4" placeholder="Cuéntanos qué necesitas…"></textarea></label><button class="b b-p fbtn" type="submit">'+esc(gd(s,"b"))+"</button></form></div></section>"},
css:function(c){return [
".form-grid{display:grid;gap:44px;align-items:start}",
"@media(min-width:920px){.form-grid{grid-template-columns:.9fr 1.1fr}}",
".fcontact{list-style:none;display:flex;flex-direction:column;gap:10px;color:var(--muted);font-size:.95rem}",
".form-card{padding:28px;display:flex;flex-direction:column;gap:16px}",
".frow{display:grid;gap:16px}",
"@media(min-width:560px){.frow{grid-template-columns:1fr 1fr}}",
".form-card label{display:flex;flex-direction:column;gap:7px}",
".form-card span{font-size:.78rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}",
".form-card input,.form-card textarea{background:rgba("+c.bgRGB+",.5);border:1px solid var(--line);border-radius:calc(var(--radius)*.6 + 4px);padding:12px 14px;color:var(--text);font-family:var(--fb);font-size:.95rem;resize:vertical}",
".form-card input:focus,.form-card textarea:focus{outline:none;border-color:"+hexA(c.p,.7)+";box-shadow:0 0 0 3px "+hexA(c.p,.18)+"}",
".fbtn{align-self:flex-start}"
].join("\n")}},
newsletter:{html:function(c,d){var s={type:"newsletter",data:d};
return '<section class="sec nl"><div class="wrap"><div class="nl-box rv"><div><h2>'+esc(gd(s,"h"))+"</h2><p>"+esc(gd(s,"sub"))+'</p></div><form class="nl-form" onsubmit="return false"><input type="email" placeholder="'+esc(gd(s,"ph"))+'"><button class="b b-p" type="submit">'+esc(gd(s,"b"))+"</button></form></div></div></section>"},
css:function(c){return [
".nl-box{display:flex;flex-direction:column;gap:22px;padding:34px 28px;align-items:flex-start}",
"@media(min-width:820px){.nl-box{flex-direction:row;align-items:center;justify-content:space-between}}",
".nl-box h2{font-family:var(--fh);font-size:1.5rem;letter-spacing:-.01em}",
".nl-box p{color:var(--muted);font-size:.93rem;margin-top:6px}",
".nl-form{display:flex;gap:10px;flex-wrap:wrap}",
".nl-form input{flex:1;min-width:220px;background:rgba("+c.bgRGB+",.5);border:1px solid var(--line);border-radius:"+(c.rBtn===999?"999px":"calc(var(--radius)*.72 + 4px)")+";padding:13px 18px;color:var(--text);font-family:var(--fb)}",
".nl-form input:focus{outline:none;border-color:"+hexA(c.p,.7)+"}"
].join("\n")}},
gallery:{html:function(c,d){var s={type:"gallery",data:d},items=gd(s,"items");
return '<section class="sec gallery" id="trabajos"><div class="wrap"><div class="shead rv"><span class="kicker">Portfolio</span><h2>'+esc(gd(s,"h"))+"</h2><p>"+esc(gd(s,"sub"))+'</p></div><div class="ggrid">'+items.map(function(it,i){return '<figure class="gcard rv" style="transition-delay:'+i*60+'ms"><div class="gthumb g'+(i%3+1)+'">'+ico(["spark","layers","bolt"][i%3],26)+"</div><figcaption><b>"+esc(it.t)+"</b><small>"+esc(it.c)+"</small></figcaption></figure>"}).join("")+"</div></div></section>"},
css:function(c){return [
".ggrid{display:grid;gap:var(--gap);grid-template-columns:1fr}",
"@media(min-width:600px){.ggrid{grid-template-columns:repeat(2,1fr)}}",
"@media(min-width:940px){.ggrid{grid-template-columns:repeat(3,1fr)}}",
".gcard{overflow:hidden;padding:0;transition:transform .25s,border-color .25s,box-shadow .25s}",
".gcard:hover{transform:translateY(-4px)}",
".gthumb{height:190px;display:grid;place-items:center;color:rgba(255,255,255,.85);position:relative;overflow:hidden}",
".gthumb::after{content:\"\";position:absolute;inset:0;background:repeating-linear-gradient(115deg,rgba(255,255,255,.08) 0 2px,transparent 2px 24px)}",
".g1{background:linear-gradient(135deg,"+c.p+","+mix(c.a,c.p,.3)+")}",
".g2{background:linear-gradient(135deg,"+mix(c.a,"#000",.25)+","+c.p+")}",
".g3{background:linear-gradient(135deg,"+mix(c.p,"#000",.35)+","+c.a+")}",
".gcard figcaption{padding:16px 18px;border-top:1px solid var(--line)}",
".gcard b{display:block;font-size:.98rem}",
".gcard small{color:var(--muted);font-size:.8rem}"
].join("\n")}},
team:{html:function(c,d){var s={type:"team",data:d},items=gd(s,"items");
return '<section class="sec team" id="equipo"><div class="wrap"><div class="shead center rv"><span class="kicker">Equipo</span><h2>'+esc(gd(s,"h"))+"</h2><p>"+esc(gd(s,"sub"))+'</p></div><div class="tmgrid">'+items.map(function(it,i){return '<div class="tcard tm rv" style="transition-delay:'+i*60+'ms"><span class="ava big">'+esc((it.n||"A").split(" ").map(function(w){return w[0]}).slice(0,2).join(""))+"</span><b>"+esc(it.n)+"</b><small>"+esc(it.r)+"</small></div>"}).join("")+"</div></div></section>"},
css:function(){return [
".tmgrid{display:grid;gap:var(--gap);grid-template-columns:repeat(2,1fr)}",
"@media(min-width:820px){.tmgrid{grid-template-columns:repeat(4,1fr)}}",
".tm{padding:26px 18px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:6px}",
".ava.big{width:64px;height:64px;font-size:1.2rem;margin-bottom:10px;border-radius:22px}",
".tm b{font-size:.98rem}.tm small{color:var(--muted);font-size:.8rem}"
].join("\n")}},
blog:{html:function(c,d){var s={type:"blog",data:d},D=defaultsFor("blog"),ft=Object.assign({},D.feat,{t:d.featt||D.feat.t,d:d.featd||D.feat.d}),posts=gd(s,"posts");
return '<section class="sec blog" id="articulos"><div class="wrap"><div class="shead rv"><span class="kicker">Blog</span><h2>'+esc(gd(s,"h"))+"</h2><p>"+esc(gd(s,"sub"))+'</p></div><a class="art feat rv" href="#articulos"><span class="kicker">'+esc(ft.k)+"</span><h3>"+esc(ft.t)+"</h3><p>"+esc(ft.d)+'</p><span class="ameta">'+esc(ft.m)+' · <b>Leer →</b></span></a><div class="bgrid">'+posts.map(function(p,i){return '<a class="art rv" href="#articulos" style="transition-delay:'+i*70+'ms"><h3>'+esc(p.t)+'</h3><span class="ameta">'+esc(p.m)+' · <b>Leer →</b></span></a>'}).join("")+"</div></div></section>"},
css:function(c){return [
".art{display:block;padding:28px;text-decoration:none;color:inherit;transition:transform .25s,border-color .25s,box-shadow .25s}",
".art:hover{transform:translateY(-3px);border-color:"+hexA(c.p,.5)+"}",
".art.feat{margin-bottom:var(--gap)}",
".art.feat h3{font-family:var(--fh);font-size:clamp(1.4rem,3vw,2rem);margin:14px 0 10px;letter-spacing:-.015em}",
".art h3{font-family:var(--fh);font-size:1.15rem;margin-bottom:12px}",
".art p{color:var(--muted);font-size:.95rem;margin-bottom:16px}",
".ameta{color:var(--muted);font-size:.8rem}.ameta b{color:"+(c.dark?"var(--accent)":"var(--primary)")+"}",
".bgrid{display:grid;gap:var(--gap);grid-template-columns:1fr}",
"@media(min-width:760px){.bgrid{grid-template-columns:repeat(3,1fr)}}"
].join("\n")}},
footer:{html:function(c){var b=c.brand,y=new Date().getFullYear();
var logo=b.logo?'<img class="brand-logo" src="'+b.logo+'" alt="logo">':'<span class="brand-mark">'+esc((b.nombre||"C").charAt(0).toUpperCase())+'</span>';
var cols=["features","showcase","steps","gallery","blog","pricing","faq"].map(function(t){var s=null;for(var i=0;i<c.sections.length;i++)if(c.sections[i].type===t){s=c.sections[i];break}return s&&ANCH[t]?'<a href="#'+ANCH[t]+'">'+LBL[t]+"</a>":""}).join("");
return '<footer class="foot"><div class="wrap"><div class="foot-grid"><div class="foot-brand"><a class="brand" href="#top">'+logo+esc(b.nombre)+"</a><p>"+esc(b.desc)+'</p></div><nav class="foot-col"><h4>Explorar</h4>'+cols+'</nav><div class="foot-col"><h4>Contacto</h4><a href="mailto:crisdev.chile@gmail.com">crisdev.chile@gmail.com</a><a href="https://wa.me/56933465843">+56 9 3346 5843</a><a href="#cta">'+esc(b.cta)+"</a></div></div><div class=\"foot-bot\"><span>© "+y+" "+esc(b.nombre)+". Todos los derechos reservados.</span><span>Creado con CodeKat · Generador Pro</span></div></div></footer>"},
css:function(){return [
".foot{border-top:1px solid var(--line);padding:calc(var(--pad)*.7) 0 34px;background:rgba(0,0,0,.12)}",
".foot-grid{display:grid;gap:36px;margin-bottom:40px}",
"@media(min-width:760px){.foot-grid{grid-template-columns:1.4fr .8fr .8fr}}",
".foot-brand p{color:var(--muted);font-size:.9rem;margin-top:14px;max-width:36ch}",
".foot-col{display:flex;flex-direction:column;gap:10px}",
".foot-col h4{font-family:var(--fh);font-size:.85rem;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-bottom:6px}",
".foot-col a{color:var(--muted);text-decoration:none;font-size:.92rem;transition:color .2s}",
".foot-col a:hover{color:var(--text)}",
".foot-bot{border-top:1px solid var(--line);padding-top:22px;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;color:var(--muted);font-size:.8rem}"
].join("\n")}}
};
var REVEAL_JS='(function(){if(!(\'IntersectionObserver\'in window)||matchMedia(\'(prefers-reduced-motion: reduce)\').matches){document.querySelectorAll(\'.rv\').forEach(function(e){e.classList.add(\'in\')});return}\nvar io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add(\'in\');io.unobserve(e.target)}})},{threshold:.14});\ndocument.querySelectorAll(\'.rv\').forEach(function(e){io.observe(e)})})();';
var revealJs='<script>'+REVEAL_JS+'<\/script>';
function cssFor(types,c){var parts=[baseCss(c)];types.forEach(function(t){if(SEC[t]&&SEC[t].css)parts.push(SEC[t].css(c))});return parts.join("\n")}
function buildLandingDoc(){
var c=ctx(),T=TYPES[state.landingType]||TYPES["clasica-or"];
var body=state.sections.map(function(s){
if(s.type==="hero")return SEC.hero.html(c,s.data,state.sections,T.hero);
return SEC[s.type]?SEC[s.type].html(c,s.data,state.sections):""
}).join("\n");
var types=[];state.sections.forEach(function(s){if(types.indexOf(s.type)<0)types.push(s.type)});
return '<!doctype html>\n<html lang="es">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>'+esc(c.brand.nombre)+" — "+esc(c.brand.eslogan)+'</title>\n<meta name="description" content="'+esc(c.brand.desc)+'">\n'+fontsHref(c)+'\n<style>\n'+cssFor(types,c)+'\n</style>\n</head>\n<body>\n<div class="'+rootCls(c)+'">'+body+'\n</div>\n'+(c.anim!=="off"?revealJs:"")+'\n</body>\n</html>'
}
function extractParts(doc){
var hm=doc.match(/<div class="[^"]*">([\s\S]*?)<\/div>\s*(<script|<\/body)/);
var cm=doc.match(/<style>([\s\S]*?)<\/style>/);
var cl=doc.match(/<div class="([^"]*)">/);
return{html:hm?hm[1].trim():"",css:cm?cm[1].trim():"",cls:cl?cl[1]:"lp"}
}
function genHTMLPart(){var c=ctx(),T=TYPES[state.landingType]||TYPES["clasica-or"];var body=state.sections.map(function(s){if(s.type==="hero")return SEC.hero.html(c,s.data,state.sections,T.hero);return SEC[s.type]?SEC[s.type].html(c,s.data,state.sections):""}).join("\n");return '<div class="'+rootCls(c)+'">\n'+body+'\n</div>'}
function genCSSPart(){var c=ctx();var types=[];state.sections.forEach(function(s){if(types.indexOf(s.type)<0)types.push(s.type)});return cssFor(types,c)}
function genJSPart(){return REVEAL_JS}
function genCode(fmt){
if(fmt==="full")return buildLandingDoc();
if(fmt==="html")return genHTMLPart();
if(fmt==="css")return genCSSPart();
if(fmt==="js")return genJSPart();
if(fmt==="img")return "Formato IMAGEN: usa el botón «Descargar» para generar el PNG de la landing.";
return buildLandingDoc()
}
var FILE_NAMES={full:"index.html",html:"landing.html",css:"landing.css",js:"landing.js",img:"landing.png"};
var FORMAT_NOTES={full:"Documento autónomo: guárdalo y ábrelo en cualquier navegador, o súbelo a tu hosting.",html:"Solo la estructura HTML de la landing. Pégala dentro del <body> de tu página.",css:"Solo los estilos CSS de la landing. Pégalos en un <style> o archivo .css.",js:"Solo el JavaScript (animaciones de aparición). Pégalo antes del </body>.",img:"Captura PNG de la landing. Pulsa «Descargar» para generarla."};
/* ═══ código de diseño ═══ */
function b64e(s){return btoa(unescape(encodeURIComponent(s))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}
function b64d(s){return decodeURIComponent(escape(atob(s.replace(/-/g,"+").replace(/_/g,"/"))))}
function packState(){return{v:5,a:state.alloy,t:state.landingType,bg:state.bg,p:state.primary,ac:state.accent,fh:state.fontHead,fb:state.fontBody,hs:state.headScale,r:state.radius,bs:state.btnStyle,sh:state.shadow,dn:state.density,fx:state.effects,br:state.brand,sc:state.sections.map(function(s){return[s.type,s.data]}),nv:state.navV,cv:state.cardV,bv:state.btnV,an:state.anim,lo:state.layout}}
function encodeDesign(){return "CK-"+b64e(JSON.stringify(packState()))}
var currentCode="";
function updateCodeLabel(){currentCode=encodeDesign();var el=$("#dcVal");if(el){el.textContent=currentCode;el.title=currentCode}syncWa()}
function applyPack(pk){
if(!pk)throw new Error("inválido");
var okA=false;for(var i=0;i<ALLOYS.length;i++)if(ALLOYS[i].id===pk.a)okA=true;
if(!okA||!TYPES[pk.t])throw new Error("inválido");
state.alloy=pk.a;state.landingType=pk.t;state.bg=pk.bg;state.primary=pk.p;state.accent=pk.ac;
state.fontHead=pk.fh;state.fontBody=pk.fb;state.headScale=pk.hs||2;state.radius=pk.r;state.btnStyle=pk.bs||"redondeado";
state.shadow=pk.sh||"media";state.density=pk.dn||"normal";
state.effects=Object.assign({glow:true,grain:false,glass:true},pk.fx||{});
state.brand=Object.assign(freshBrand(),pk.br||{});
state.sections=(pk.sc||[]).filter(function(s){return SEC_META[s[0]]}).map(function(s){return{id:nid(),type:s[0],data:s[1]||{}}});
if(!state.sections.length)state.sections=buildSecs(pk.t);
state.navV=pk.nv||"clasica";state.cardV=pk.cv||"borde";state.btnV=pk.bv||"solido";state.anim=pk.an||"fade-up";
state.layout=Object.assign({align:"auto",container:"normal",alt:false,btnSize:"normal",navSticky:true},pk.lo||{});
renderAll();refresh();save();updateCodeLabel()
}
/* ═══ Bancos para el generador aleatorio ═══ */
var RN_PRE=["Lumen","Nova","Vertex","Aurora","Kima","Nexo","Senda","Pulso","Alba","Orbe","Faro","Norte","Zelta","Mango","Punta","Cima","Brava","Ritmo","Vega","Torno","Lúa","Milko","Aero","Brio","Fen","Halo"];
var RN_SUF=["Lab","Studios","& Co","Club","Space","Soft","House","Group","Tech","Colectivo","Móvil","App","360","Directo","Nube","Kit","Pro","Base","Forge","Bridge","Works"];
var RN_DOM=Object.keys(RUBROS);
var RN_FONT_PAIRS=[["Geist","Outfit"],["Sora","Manrope"],["Outfit","Manrope"],["Syne","Outfit"],["Fraunces","Sora"],["Playfair Display","Manrope"],["DM Serif Display","Outfit"],["Syne","Outfit"],["Fraunces","Outfit"],["Geist","Sora"],["Outfit","Outfit"],["Playfair Display","Sora"],["DM Serif Display","Fraunces"],["Sora","Outfit"],["Syne","Manrope"]];
function randomPack(){
var A=pick(ALLOYS),tid=pick(Object.keys(TYPES));
/* Paleta de color aleatoria (máxima variedad) */
var pal=pick(PALETTES);
var mixPalette=Math.random()>.3;
var primary=mixPalette?pal[1]:(Math.random()>.5?A.primary:pick(PALETTES)[1]);
var accent=mixPalette?pal[2]:(Math.random()>.6?A.accent:pick(PALETTES)[2]);
/* Marca: rubro + pack de textos + nombre aleatorio */
var rubro=pick(RN_DOM),rub=RUBROS[rubro],pkt=pick(rub.packs);
var nombre=pick(RN_PRE)+(Math.random()>.45?" "+pick(RN_SUF):"");
/* Fondo coherente con un tema claro/oscuro elegido al azar */
var dark=Math.random()>.45;
var bgs2=BGS.filter(function(b){return b.dark===dark});if(!bgs2.length)bgs2=BGS;
var fp=pick(RN_FONT_PAIRS);
/* Secciones del tipo, con contenido real por defecto (para que no salgan vacías/repetidas) */
var scs=TYPES[tid].secs.map(function(t){var d=Object.assign({},defaultsFor(t));if(t==="hero"){d.t=pkt.e;d.sub=pkt.d;d.b1=pkt.c1;d.b2=pkt.c2;}return[t,d]});
return{v:5,a:A.id,t:tid,bg:pick(bgs2).id,p:primary,ac:accent,fh:fp[0],fb:fp[1],hs:pick([1,2,2,3]),r:pick([8,12,16,20,24,28]),
bs:pick(["recto","redondeado","pildora"]),sh:pick(["ninguna","sutil","media","alta"]),dn:pick(["compacto","normal","amplio"]),
fx:{glow:Math.random()>.3,grain:Math.random()>.75,glass:Math.random()>.35},
br:{nombre:nombre,eslogan:pkt.e,desc:pkt.d,cta:pkt.c1,cta2:pkt.c2,logo:"",rubro:rubro},
sc:scs,
nv:pick(NAVS)[0],cv:pick(CARDS)[0],bv:pick(BTNS)[0],an:pick(ANIMS)[0],
lo:{align:pick(["auto","izq","centro"]),container:pick(["estrecho","normal","ancho"]),alt:Math.random()>.5,btnSize:pick(["compacto","normal","normal","grande"]),navSticky:Math.random()>.25}}
}
/* ═══ UI ═══ */
var pvT=null,alloyFilter="Todas",alloyQ="",bgFilter="Todos",typeFam="Todas";
function toast(msg,icon){var t=$("#toast");if(!t)return;t.innerHTML='<span class="tk">'+(icon||"✓")+"</span> "+esc(msg);t.classList.add("show");clearTimeout(t._x);t._x=setTimeout(function(){t.classList.remove("show")},2400)}
function renderAlloyFilters(){
$("#alloyFilters").innerHTML=CATS.map(function(c){return '<button class="fchip'+(c===alloyFilter?" on":"")+'" data-cat="'+c+'">'+c+"</button>"}).join("")+'<span class="fchip count" id="alloyCount">'+ALLOYS.length+"/"+ALLOYS.length+"</span>";
$$("#alloyFilters [data-cat]").forEach(function(b){b.addEventListener("click",function(){alloyFilter=b.getAttribute("data-cat");renderAlloyFilters();renderAlloys()})})
}
function renderAlloys(){
var list=ALLOYS.filter(function(a){return alloyFilter==="Todas"||a.tag===alloyFilter});
if(alloyQ)list=list.filter(function(a){return(a.name+" "+a.tag).toLowerCase().indexOf(alloyQ)>=0});
$("#alloyRail").innerHTML=list.map(function(a){return '<button class="achip'+(a.id===state.alloy?" on":"")+'" data-alloy="'+a.id+'"><span class="sw"><i style="background:'+(a.dark?"#0C0F15":"#F7F6F2")+'"></i><i style="background:'+a.primary+'"></i><i style="background:'+a.accent+'"></i><i style="background:'+(a.dark?"#EDEFF5":"#171A21")+'"></i></span><span class="nm">'+a.name+'</span><span class="tg">'+a.tag+"</span></button>"}).join("")||'<p style="color:var(--faint);font-size:12px;padding:10px">Sin resultados.</p>';
var cnt=$("#alloyCount");if(cnt)cnt.textContent=list.length+"/"+ALLOYS.length;
$$("#alloyRail [data-alloy]").forEach(function(b){b.addEventListener("click",function(){applyAlloy(b.getAttribute("data-alloy"))})})
}
function applyAlloy(id){
var a=null;for(var i=0;i<ALLOYS.length;i++)if(ALLOYS[i].id===id)a=ALLOYS[i];
if(!a)return;
state.alloy=id;state.bg=a.bg;state.primary=a.primary;state.accent=a.accent;
state.fontHead=a.fh;state.fontBody=a.fb;state.radius=a.radius;state.btnStyle=a.btn;state.cardV=a.card;
state.shadow=a.shadow;state.headScale=a.headScale;
state.effects={glow:a.glow,grain:a.grain,glass:a.glass};
renderAll();refresh();save();toast("Aleación «"+a.name+"» aplicada","◆")
}
function wireFor(t){
var r=t.hero;
if(t.secs.indexOf("gallery")>=0)return '<rect x="6" y="6" width="24" height="18" rx="2"/><rect x="34" y="6" width="24" height="18" rx="2"/><rect x="6" y="28" width="24" height="18" rx="2"/><rect x="34" y="28" width="24" height="18" rx="2"/>';
if(r==="split")return '<rect x="6" y="8" width="24" height="30" rx="2"/><rect x="34" y="8" width="24" height="14" rx="2"/><rect x="34" y="26" width="24" height="12" rx="2"/>';
if(r==="minimal")return '<rect x="14" y="12" width="36" height="6" rx="2"/><rect x="20" y="24" width="24" height="3" rx="1.5"/><rect x="14" y="34" width="36" height="10" rx="2"/>';
if(r==="big")return '<rect x="6" y="8" width="46" height="14" rx="2"/><rect x="6" y="26" width="30" height="4" rx="2"/><rect x="6" y="36" width="22" height="8" rx="4"/>';
return '<rect x="16" y="6" width="32" height="8" rx="2"/><rect x="10" y="18" width="44" height="6" rx="2"/><rect x="6" y="30" width="16" height="12" rx="2"/><rect x="24" y="30" width="16" height="12" rx="2"/><rect x="42" y="30" width="16" height="12" rx="2"/>'
}
function renderTypes(){
$("#typeFamily").innerHTML='<option value="Todas">Todas las familias ('+Object.keys(TYPES).length+')</option>'+ARCH.map(function(a){return '<option value="'+a.name+'">'+a.name+"</option>"}).join("");
$("#typeFamily").value=typeFam;
var list=Object.keys(TYPES).filter(function(k){return typeFam==="Todas"||TYPES[k].arch===typeFam});
$("#typeRail").innerHTML=list.map(function(k){var t=TYPES[k];return '<button class="tcard'+(k===state.landingType?" on":"")+'" data-type="'+k+'"><span class="art"><svg viewBox="0 0 64 52" width="60" height="48" fill="'+(k===state.landingType?"#FFC96A":"#4A5164")+'">'+wireFor(t)+"</svg></span><b>"+t.name+"</b><small>"+t.desc+"</small></button>"}).join("");
$$("#typeRail [data-type]").forEach(function(b){b.addEventListener("click",function(){applyType(b.getAttribute("data-type"))})})
}
function applyType(k){state.landingType=k;state.sections=buildSecs(k);renderTypes();renderSecList();refresh();save();toast("Tipo «"+TYPES[k].name+"» aplicado")}
function renderBgFilters(){
$("#bgFilters").innerHTML=BG_CATS.map(function(c){return '<button class="fchip'+(c===bgFilter?" on":"")+'" data-cat="'+c+'">'+c+"</button>"}).join("");
$$("#bgFilters [data-cat]").forEach(function(b){b.addEventListener("click",function(){bgFilter=b.getAttribute("data-cat");renderBgFilters();renderBgs()})})
}
function paintBgLive(){
var el=$("#bgLive");if(!el)return;
var bd=bgById(state.bg);
try{
var spec=bd.make(state.primary,state.accent);
el.style.backgroundColor="#0C0F15";el.style.backgroundImage="none";el.style.backgroundSize="auto";
if(spec.bgi&&spec.bgi!=="none"){
el.style.backgroundColor=(typeof spec.bgc==="string"&&spec.bgc.charAt(0)==="#")?spec.bgc:"#0C0F15";
el.style.backgroundImage=spec.bgi;
if(spec.bgs)el.style.backgroundSize=spec.bgs;
}else if(spec.bgc){
if(spec.bgc.charAt(0)==="#")el.style.backgroundColor=spec.bgc;
else el.style.backgroundImage=spec.bgc;
}
el.title="Fondo actual: "+bd.label;
}catch(e){}
}
function renderBgs(){
var list=BGS.filter(function(b){return bgFilter==="Todos"||b.cat===bgFilter});
$("#bgRail").innerHTML=list.map(function(b){return '<button class="bgchip'+(b.id===state.bg?" on":"")+'" data-bg="'+b.id+'"><span class="pv" data-pv="'+b.id+'"></span><small>'+b.label+"</small></button>"}).join("");
$$("#bgRail [data-pv]").forEach(function(el){
try{
var spec=bgById(el.getAttribute("data-pv")).make(state.primary,state.accent);
if(spec.bgi&&spec.bgi!=="none"){el.style.backgroundColor=(typeof spec.bgc==="string"&&spec.bgc.charAt(0)==="#")?spec.bgc:"#0C0F15";el.style.backgroundImage=spec.bgi;if(spec.bgs)el.style.backgroundSize=spec.bgs}
else if(spec.bgc){if(spec.bgc.charAt(0)==="#")el.style.backgroundColor=spec.bgc;else el.style.backgroundImage=spec.bgc}
}catch(e){}
});
$$("#bgRail [data-bg]").forEach(function(b){b.addEventListener("click",function(){state.bg=b.getAttribute("data-bg");renderBgs();paintBgLive();refresh();save()})});
paintBgLive()
}
function renderPalettes(){
$("#palettesRail").innerHTML=PALETTES.map(function(p){return '<button class="pchip" data-p="'+p[1]+'" data-a="'+p[2]+'"><span class="pd"><i style="background:'+p[1]+'"></i><i style="background:'+p[2]+'"></i></span><small>'+p[0]+"</small></button>"}).join("");
$$("#palettesRail [data-p]").forEach(function(b){b.addEventListener("click",function(){state.primary=b.getAttribute("data-p");state.accent=b.getAttribute("data-a");syncControls();renderBgs();refresh();save();toast("Paleta «"+b.querySelector("small").textContent+"» aplicada","◆")})})
}
function renderVRails(){
function mk(sel,list,val,key){
$(sel).innerHTML=list.map(function(o){return '<button class="vchip'+(o[0]===val?" on":"")+'" data-v="'+o[0]+'">'+o[1]+"</button>"}).join("");
$$(sel+" [data-v]").forEach(function(b){b.addEventListener("click",function(){state[key]=b.getAttribute("data-v");renderVRails();refresh();save()})})
}
mk("#railNav",NAVS,state.navV,"navV");mk("#railCard",CARDS,state.cardV,"cardV");mk("#railBtn",BTNS,state.btnV,"btnV");mk("#railAnim",ANIMS,state.anim,"anim")
}
function bindSeg(id,apply){var el=$(id);if(!el)return;el.querySelectorAll("button").forEach(function(b){b.addEventListener("click",function(){el.querySelectorAll("button").forEach(function(x){x.classList.toggle("on",x===b)});apply(b.getAttribute("data-v"));save();refresh()})})}
function syncSeg(id,val){var el=$(id);if(!el)return;el.querySelectorAll("button").forEach(function(b){b.classList.toggle("on",b.getAttribute("data-v")===val)})}
function paintRange(r){var pct=(r.value-r.min)/(r.max-r.min)*100;r.style.setProperty("--fill",pct+"%")}
function updateFontPrev(){var fp=$("#fontPrev");fp.querySelector(".fp-h").style.fontFamily="'"+state.fontHead+"', "+FONT_STACK;fp.querySelector(".fp-b").style.fontFamily="'"+state.fontBody+"', "+FONT_STACK;fp.querySelector(".fp-h").textContent=state.brand.eslogan||"Convierte visitas en clientes"}
function renderLogoPrev(){$("#logoPrev").innerHTML=state.brand.logo?'<img src="'+state.brand.logo+'" alt="logo">':"✦";$("#logoUrl").value=(state.brand.logo&&state.brand.logo.indexOf("data:")!==0)?state.brand.logo:""}
function renderRubro(){$("#selRubro").innerHTML=Object.keys(RUBROS).map(function(k){return '<option value="'+k+'">'+RUBROS[k].label+"</option>"}).join("");$("#selRubro").value=state.brand.rubro||"tecnologia";renderPacks()}
function renderPacks(){
var r=RUBROS[state.brand.rubro]||RUBROS.tecnologia;
$("#rubroPacks").innerHTML=r.packs.map(function(p,i){return '<button class="pack" data-pack="'+i+'"><b>“'+p.e+'”</b><small>'+p.d+'</small><span class="use">Toca para usar esta idea →</span></button>'}).join("");
$$("#rubroPacks [data-pack]").forEach(function(b){b.addEventListener("click",function(){var p=r.packs[+b.getAttribute("data-pack")];state.brand.eslogan=p.e;state.brand.desc=p.d;state.brand.cta=p.c1;state.brand.cta2=p.c2;syncControls();refresh();save();toast("Textos sugeridos aplicados","✎")})})
}
function syncControls(){
$("#colPrimary").value=state.primary;$("#colAccent").value=state.accent;
$("#hexP").textContent=state.primary.toUpperCase();$("#hexA").textContent=state.accent.toUpperCase();
$("#selFontH").value=state.fontHead;$("#selFontB").value=state.fontBody;
$("#rngHead").value=state.headScale;$("#outHead").textContent=({1:"Compacta",2:"Grande",3:"Heroica"})[state.headScale];
$("#rngRadius").value=state.radius;$("#outRadius").textContent=state.radius+"px";
paintRange($("#rngHead"));paintRange($("#rngRadius"));
syncSeg("#segBtn",state.btnStyle);syncSeg("#segShadow",state.shadow);syncSeg("#segDensity",state.density);
syncSeg("#segAlign",state.layout.align);syncSeg("#segContainer",state.layout.container);syncSeg("#segBtnSize",state.layout.btnSize);
$("#tglAlt").checked=state.layout.alt;$("#tglNavSticky").checked=state.layout.navSticky;
$("#tglGlow").checked=state.effects.glow;$("#tglGrain").checked=state.effects.grain;$("#tglGlass").checked=state.effects.glass;
$("#inBrand").value=state.brand.nombre;$("#inSlogan").value=state.brand.eslogan;$("#inDesc").value=state.brand.desc;
$("#inCta1").value=state.brand.cta;$("#inCta2").value=state.brand.cta2;
renderLogoPrev();updateFontPrev()
}
function itemBlock(f,it){var ik=f.ik,l2=f.l2||f.ik;
return '<div class="item-block"><button class="mini-btn danger rm-item" aria-label="Quitar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button>'+ik.map(function(k,j){return '<label class="fld" style="margin-bottom:8px"><span>'+(l2[j]||k)+'</span><input type="text" data-ik="'+k+'" value="'+esc(it[k]||"")+'"></label>'}).join("")+"</div>"}
function fieldsHTML(fields,D,data){
return fields.map(function(f){
if(Array.isArray(D[f.k])){var items=data[f.k]||D[f.k]||[];
return '<div class="fld"><span>'+f.l+'</span><div class="list-edit" data-key="'+f.k+'" data-ik=\''+JSON.stringify(f.ik)+'\'>'+items.map(function(it){return itemBlock(f,it)}).join("")+'</div><button class="link-btn add-item" data-key="'+f.k+'">+ Añadir elemento</button></div>'}
var v=data[f.k]!==undefined?data[f.k]:(D[f.k]||""),ph=typeof D[f.k]==="string"?D[f.k]:"";
return String(v).length>70?'<label class="fld"><span>'+f.l+'</span><textarea rows="2" data-key="'+f.k+'" placeholder="'+esc(ph)+'">'+esc(v)+"</textarea></label>"
:'<label class="fld"><span>'+f.l+'</span><input type="text" data-key="'+f.k+'" value="'+esc(v)+'" placeholder="'+esc(ph)+'"></label>'}).join("")
}
function bindFields(root,fields,D,data,onChange){
function collectLists(){root.querySelectorAll(".list-edit").forEach(function(ed){var key=ed.getAttribute("data-key"),ik=JSON.parse(ed.getAttribute("data-ik")),items=[];
ed.querySelectorAll(".item-block").forEach(function(blk){var it={};ik.forEach(function(k){var el=blk.querySelector('[data-ik="'+k+'"]');if(el)it[k]=el.value});if(Object.values(it).some(function(v){return v&&v.trim()}))items.push(it)});
if(items.length)data[key]=items;else delete data[key]})}
root.querySelectorAll("input[data-key],textarea[data-key]").forEach(function(inp){inp.addEventListener("input",function(){var v=inp.value.trim();if(v==="")delete data[inp.getAttribute("data-key")];else data[inp.getAttribute("data-key")]=inp.value;onChange()})});
root.querySelectorAll(".list-edit input").forEach(function(inp){inp.addEventListener("input",function(){collectLists();onChange()})});
root.querySelectorAll(".rm-item").forEach(function(b){b.addEventListener("click",function(){b.closest(".item-block").remove();collectLists();onChange()})});
root.querySelectorAll(".add-item").forEach(function(b){b.addEventListener("click",function(){var ed=root.querySelector('.list-edit[data-key="'+b.getAttribute("data-key")+'"]');var f=null;for(var i=0;i<fields.length;i++)if(fields[i].k===b.getAttribute("data-key"))f=fields[i];
ed.insertAdjacentHTML("beforeend",itemBlock(f,{}));var blk=ed.lastElementChild;
blk.querySelector(".rm-item").addEventListener("click",function(){blk.remove();collectLists();onChange()});
blk.querySelectorAll("input").forEach(function(i){i.addEventListener("input",function(){collectLists();onChange()})})})})
}
function secSummary(s){var d=Object.assign({},defaultsFor(s.type),s.data);return d.t||d.h||d.k||(s.type==="hero"?state.brand.eslogan:s.type==="nav"?"Logo + menú + CTA":s.type==="footer"?"Columnas y créditos":"")}
function renderSecList(){
$("#secList").innerHTML=state.sections.map(function(s,i){return '<div class="sec-item" data-id="'+s.id+'"><span class="idx">'+String(i+1).padStart(2,"0")+'</span><span class="si-t"><b>'+(SEC_META[s.type]||s.type)+"</b><small>"+esc(secSummary(s))+'</small></span><span style="display:flex;gap:5px"><button class="mini-btn" data-act="up"'+(i===0?' disabled style="opacity:.3"':"")+'><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 19V5m-6 6 6-6 6 6"/></svg></button><button class="mini-btn" data-act="down"'+(i===state.sections.length-1?' disabled style="opacity:.3"':"")+'><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14m6-6-6 6-6-6"/></svg></button><button class="mini-btn" data-act="edit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="'+ICONS.pen+'"/></svg></button><button class="mini-btn danger" data-act="del"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button></span></div>'}).join("")
}
function openSheet(html){$("#sheetBody").innerHTML=html;$("#sheet").classList.add("open");$("#sheetBd").classList.add("open");document.body.style.overflow="hidden"}
function closeSheet(){$("#sheet").classList.remove("open");$("#sheetBd").classList.remove("open");document.body.style.overflow=""}
function addSecSheet(){
var groups=[["Estructura",["logos","stats","steps","team"]],["Contenido",["features","showcase","gallery","blog","testi"]],["Conversión",["pricing","faq","cta","form","newsletter"]]];
openSheet('<h3>Agregar sección</h3><p class="sh-sub">Se añadirá al final de tu landing.</p>'+groups.map(function(g){return '<p class="mono-label" style="margin:14px 0 8px">'+g[0]+'</p><div class="opt-list">'+g[1].map(function(id){return '<button class="opt-btn" data-add="'+id+'"><span class="oi"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="'+ICONS[SEC_ICON[id]]+'"/></svg></span><span><b>'+SEC_META[id]+"</b><small>"+esc(secSummary({type:id,data:{}}))+"</small></span></button>"}).join("")+"</div>"}).join(""));
$$("#sheetBody [data-add]").forEach(function(b){b.addEventListener("click",function(){state.sections.push({id:nid(),type:b.getAttribute("data-add"),data:{}});closeSheet();renderSecList();refresh();save();toast("Sección agregada")})})
}
/* ═══ FIX SECCIÓN 03: comparación de ids como string para que la ventana de edición siempre se abra ═══ */
function editSecSheet(id){
var s=null;for(var i=0;i<state.sections.length;i++)if(String(state.sections[i].id)===String(id))s=state.sections[i];
if(!s)return;
var fields=FIELD_DEFS[s.type]||[];
if(!fields.length){toast("Esta sección no tiene textos editables","i");return}
var D=defaultsFor(s.type),copy=Object.assign({},s.data);
openSheet("<h3>Editar · "+SEC_META[s.type]+'</h3><p class="sh-sub">Lo vacío usa el contenido sugerido.</p><div id="sheetFields">'+fieldsHTML(fields,D,copy)+'</div><div class="sh-actions"><button class="btn-app ghost" id="shCancel">Cancelar</button><button class="btn-app pri" id="shSave">Guardar cambios</button></div>');
bindFields($("#sheetFields"),fields,D,copy,function(){});
$("#shCancel").addEventListener("click",closeSheet);
$("#shSave").addEventListener("click",function(){s.data=copy;closeSheet();renderSecList();refresh();save();toast("Sección actualizada")})
}
var WIDTHS={movil:390,tablet:768,escritorio:1280};
function renderPreview(){
var iframe=$("#pvIframe"),frame=$("#pvFrame"),stageEl=$(".pv-stage");
if(!iframe||!frame||!stageEl)return;
var dw=WIDTHS[state.device],cw=stageEl.clientWidth-22;
var scale=Math.min(1,cw/dw),H=Math.max(480,Math.round(Math.min(680,window.innerHeight*.62)/scale));
frame.style.width=(dw*scale)+"px";frame.style.height=(H*scale)+"px";
iframe.style.width=dw+"px";iframe.style.height=H+"px";iframe.style.transform="scale("+scale+")";
iframe.srcdoc=buildLandingDoc();
$("#pvSize").textContent=dw+" px · "+TYPES[state.landingType].name;
$("#pvScale").textContent="escala "+Math.round(scale*100)+"%"
}
var eyeDevice="movil";
function renderEyePreview(){
var ov=$("#eyeOverlay");if(!ov||!ov.classList.contains("open"))return;
var iframe=$("#eyeIframe"),frame=$("#eyeFrame"),wrap=$("#eyeFrameWrap");
if(!iframe||!frame||!wrap)return;
var dw=WIDTHS[eyeDevice];
var availW=wrap.clientWidth-8;
var availH=wrap.clientHeight-8;
var scale=Math.min(1,availW/dw);
var H=Math.max(420,Math.min(800,Math.floor(availH/scale)));
frame.style.width=(dw*scale)+"px";
frame.style.height=(H*scale)+"px";
iframe.style.width=dw+"px";
iframe.style.height=H+"px";
iframe.style.transform="scale("+scale+")";
iframe.srcdoc=buildLandingDoc()
}
function openEye(){$("#eyeOverlay").classList.add("open");$("#eyeOverlay").setAttribute("aria-hidden","false");renderEyePreview()}
function closeEye(){$("#eyeOverlay").classList.remove("open");$("#eyeOverlay").setAttribute("aria-hidden","true")}
function schedulePreview(){clearTimeout(pvT);pvT=setTimeout(renderPreview,180)}
function refresh(){schedulePreview();renderCode();syncWa();paintBgLive();if($("#eyeOverlay").classList.contains("open"))renderEyePreview()}
function renderCode(){
var fmt=state.format;
if(fmt==="img"){
$("#codeOut").textContent="Formato IMAGEN seleccionado.\nPulsa «Descargar» para generar el PNG de la landing.";
$("#codeName").textContent=FILE_NAMES.img;
$("#codeMeta").textContent="PNG";
$("#codeNote").textContent=FORMAT_NOTES.img;
$("#codeBoxWrap").style.display="block";
return
}
var code=genCode(fmt);
$("#codeOut").textContent=code;
$("#codeName").textContent=FILE_NAMES[fmt];
$("#codeMeta").textContent=(new Blob([code]).size/1024).toFixed(1)+" KB · "+code.split("\n").length+" líneas";
$("#codeNote").textContent=FORMAT_NOTES[fmt]
}
function copyText(txt,msg){function done(){toast(msg||"Copiado al portapapeles")}
if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(txt).then(done).catch(function(){fbCopy(txt,done)});else fbCopy(txt,done)}
function fbCopy(txt,done){var ta=document.createElement("textarea");ta.value=txt;ta.style.position="fixed";ta.style.opacity="0";document.body.appendChild(ta);ta.select();try{document.execCommand("copy");done()}catch(e){toast("No se pudo copiar","✕")}ta.remove()}
function downloadFile(name,content,type){var blob=new Blob([content],{type:(type||"text/html")+";charset=utf-8"});var a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},400);toast("Descargando "+name,"⬇")}
function downloadImage(){
if(typeof html2canvas!=="function"){toast("No se pudo cargar el generador de imagen","✕");return}
toast("Generando imagen…","⏳");
var holder=document.createElement("div");
holder.style.cssText="position:fixed;left:-99999px;top:0;width:1280px;height:900px;overflow:hidden;";
var iframe=document.createElement("iframe");
iframe.style.cssText="width:1280px;height:900px;border:none;";
holder.appendChild(iframe);
document.body.appendChild(holder);
iframe.srcdoc=buildLandingDoc();
iframe.onload=function(){
setTimeout(function(){
try{
html2canvas(iframe.contentDocument.body,{useCORS:true,scale:1,backgroundColor:null,width:1280,windowWidth:1280}).then(function(canvas){
canvas.toBlob(function(blob){
if(!blob){toast("No se pudo generar la imagen","✕");holder.remove();return}
var a=document.createElement("a");
a.href=URL.createObjectURL(blob);
a.download=FILE_NAMES.img;
document.body.appendChild(a);a.click();
setTimeout(function(){URL.revokeObjectURL(a.href);a.remove();holder.remove()},400);
toast("Imagen descargada","⬇")
},"image/png")
}).catch(function(){holder.remove();toast("No se pudo generar la imagen","✕")})
}catch(e){holder.remove();toast("No se pudo generar la imagen","✕")}
},600)
}
}
function syncWa(){
var el=$("#waRequestCode");if(!el)return;
var A=null;for(var i=0;i<ALLOYS.length;i++)if(ALLOYS[i].id===state.alloy)A=ALLOYS[i];
var T=TYPES[state.landingType];
var msg="¡Hola CodeKat! Quiero que hagan por mí esta landing del Generador Pro.\n• Marca: "+state.brand.nombre+"\n• Tipo: "+(T?T.name:"")+"\n• Aleación: "+(A?A.name:"")+"\n• Mi código de diseño: "+currentCode;
el.href="https://wa.me/56933465843?text="+encodeURIComponent(msg)
}
function setTheme(t){
var root=document.documentElement,themeIconMini=$("#themeIconMini");
if(t==="light"){root.setAttribute("data-theme","light");if(themeIconMini)themeIconMini.className="fa-solid fa-sun";}
else{root.removeAttribute("data-theme");if(themeIconMini)themeIconMini.className="fa-solid fa-moon";}
$$(".theme-btn").forEach(function(b){b.classList.toggle("active",b.getAttribute("data-theme-set")===t)});
try{localStorage.setItem("ckpro-theme",t)}catch(e){}}
function scramble(){var el=$("#appTitle"),final=el.getAttribute("data-text");
if(matchMedia("(prefers-reduced-motion: reduce)").matches){el.textContent=final;return}
var glyphs="#</>*{}=+·",f=0;
function tick(){f++;el.innerHTML=final.split("").map(function(ch,i){return ch===" "?" ":(i<f/2-2?ch:'<span style="color:var(--faint)">'+glyphs[Math.floor(Math.random()*glyphs.length)]+"</span>")}).join("");
if(f/2-2<final.length)requestAnimationFrame(tick);else el.textContent=final}
tick()}
function renderAll(){renderAlloyFilters();renderAlloys();renderTypes();renderBgFilters();renderBgs();renderPalettes();renderVRails();renderSecList();renderRubro();syncControls();paintBgLive()}
function init(){
setTheme((function(){try{return localStorage.getItem("ckpro-theme")||"dark"}catch(e){return "dark"}})());
renderAll();updateCodeLabel();
var burger=$("#burger"),navMenu=$("#navMenu"),menuBack=$("#menuBack"),themeMini=$("#themeToggleMini");
function isMenuOpen(){return navMenu&&navMenu.classList.contains("open")}
function openMenu(){if(!navMenu)return;navMenu.classList.add("open");burger.classList.add("active");burger.setAttribute("aria-expanded","true");navMenu.setAttribute("aria-hidden","false")}
function closeMenu(){if(!navMenu)return;navMenu.classList.remove("open");burger.classList.remove("active");burger.setAttribute("aria-expanded","false");navMenu.setAttribute("aria-hidden","true")}
if(burger)burger.addEventListener("click",function(e){e.stopPropagation();isMenuOpen()?closeMenu():openMenu()});
if(menuBack)menuBack.addEventListener("click",closeMenu);
document.addEventListener("click",function(e){if(isMenuOpen()&&navMenu&&!navMenu.contains(e.target)&&!burger.contains(e.target))closeMenu()});
if(themeMini)themeMini.addEventListener("click",function(){setTheme(document.documentElement.getAttribute("data-theme")==="light"?"dark":"light")});
$$(".theme-btn").forEach(function(b){b.addEventListener("click",function(){setTheme(b.getAttribute("data-theme-set"))})});
$("#eyeFab").addEventListener("click",openEye);
$("#eyeClose").addEventListener("click",closeEye);
$$("#eyeDevice button").forEach(function(b){b.addEventListener("click",function(){
$$("#eyeDevice button").forEach(function(x){x.classList.toggle("on",x===b)});
eyeDevice=b.getAttribute("data-v");
renderEyePreview()
})});
document.addEventListener("keydown",function(e){
if(e.key==="Escape"){
if($("#eyeOverlay").classList.contains("open"))closeEye();
else if($("#sheet").classList.contains("open"))closeSheet();
else if(isMenuOpen())closeMenu();
}
});
$("#alloySearch").addEventListener("input",function(e){alloyQ=e.target.value.trim().toLowerCase();renderAlloys()});
$("#typeFamily").addEventListener("change",function(e){typeFam=e.target.value;renderTypes()});
/* ═══ FIX SECCIÓN 03: id del atributo data-id es string; se compara como string ═══ */
$("#secList").addEventListener("click",function(e){
var item=e.target.closest(".sec-item"),btn=e.target.closest("[data-act]");
if(!item||!btn)return;
var id=item.getAttribute("data-id"),i=-1;
for(var k=0;k<state.sections.length;k++)if(String(state.sections[k].id)===String(id))i=k;
if(i<0)return;
var act=btn.getAttribute("data-act");
if(act==="edit")editSecSheet(id);
else if(act==="del"){var nm=SEC_META[state.sections[i].type];state.sections.splice(i,1);renderSecList();refresh();save();toast("«"+nm+"» eliminada","✕")}
else if(act==="up"&&i>0){var t1=state.sections[i-1];state.sections[i-1]=state.sections[i];state.sections[i]=t1;renderSecList();refresh();save()}
else if(act==="down"&&i<state.sections.length-1){var t2=state.sections[i+1];state.sections[i+1]=state.sections[i];state.sections[i]=t2;renderSecList();refresh();save()}
});
$("#btnAddSec").addEventListener("click",addSecSheet);
$("#btnRestoreType").addEventListener("click",function(){state.sections=buildSecs(state.landingType);renderSecList();refresh();save();toast("Secciones restauradas del tipo")});
$("#colPrimary").addEventListener("input",function(e){state.primary=e.target.value;$("#hexP").textContent=state.primary.toUpperCase();renderBgs();refresh();save()});
$("#colAccent").addEventListener("input",function(e){state.accent=e.target.value;$("#hexA").textContent=state.accent.toUpperCase();renderBgs();refresh();save()});
$("#btnSwapColors").addEventListener("click",function(){var t=state.primary;state.primary=state.accent;state.accent=t;syncControls();renderBgs();refresh();save();toast("Colores intercambiados","⇄")});
$("#btnResetColors").addEventListener("click",function(){var a=null;for(var i=0;i<ALLOYS.length;i++)if(ALLOYS[i].id===state.alloy)a=ALLOYS[i];if(a){state.primary=a.primary;state.accent=a.accent;syncControls();renderBgs();refresh();save();toast("Colores restaurados")}});
var opts=FONT_LIST.map(function(f){return "<option>"+f+"</option>"}).join("");
$("#selFontH").innerHTML=opts;$("#selFontB").innerHTML=opts;
$("#selFontH").addEventListener("change",function(e){state.fontHead=e.target.value;updateFontPrev();refresh();save()});
$("#selFontB").addEventListener("change",function(e){state.fontBody=e.target.value;updateFontPrev();refresh();save()});
$("#rngHead").addEventListener("input",function(e){state.headScale=+e.target.value;$("#outHead").textContent=({1:"Compacta",2:"Grande",3:"Heroica"})[state.headScale];paintRange(e.target);refresh();save()});
$("#rngRadius").addEventListener("input",function(e){state.radius=+e.target.value;$("#outRadius").textContent=state.radius+"px";paintRange(e.target);refresh();save()});
bindSeg("#segBtn",function(v){state.btnStyle=v});
bindSeg("#segShadow",function(v){state.shadow=v});
bindSeg("#segDensity",function(v){state.density=v});
bindSeg("#segAlign",function(v){state.layout.align=v});
bindSeg("#segContainer",function(v){state.layout.container=v});
bindSeg("#segBtnSize",function(v){state.layout.btnSize=v});
$("#tglAlt").addEventListener("change",function(e){state.layout.alt=e.target.checked;refresh();save()});
$("#tglNavSticky").addEventListener("change",function(e){state.layout.navSticky=e.target.checked;refresh();save()});
[["#tglGlow","glow"],["#tglGrain","grain"],["#tglGlass","glass"]].forEach(function(pair){$(pair[0]).addEventListener("change",function(e){state.effects[pair[1]]=e.target.checked;refresh();save()})});
[["#inBrand","nombre"],["#inSlogan","eslogan"],["#inDesc","desc"],["#inCta1","cta"],["#inCta2","cta2"]].forEach(function(pair){$(pair[0]).addEventListener("input",function(e){state.brand[pair[1]]=e.target.value;updateFontPrev();renderSecList();refresh();save()})});
$("#selRubro").addEventListener("change",function(e){state.brand.rubro=e.target.value;renderPacks();save()});
$("#btnLogoFile").addEventListener("click",function(){$("#logoFile").click()});
$("#logoFile").addEventListener("change",function(e){
var f=e.target.files[0];if(!f)return;
var img=new Image(),url=URL.createObjectURL(f);
img.onload=function(){var max=180,r=Math.min(1,max/Math.max(img.width,img.height));var cv=document.createElement("canvas");cv.width=Math.round(img.width*r);cv.height=Math.round(img.height*r);cv.getContext("2d").drawImage(img,0,0,cv.width,cv.height);URL.revokeObjectURL(url);state.brand.logo=cv.toDataURL("image/jpeg",.85);renderLogoPrev();refresh();save();toast("Logo aplicado","✦")};
img.src=url
});
$("#logoUrl").addEventListener("change",function(e){state.brand.logo=e.target.value.trim();renderLogoPrev();refresh();save()});
$("#btnLogoDel").addEventListener("click",function(){state.brand.logo="";renderLogoPrev();refresh();save();toast("Logo quitado","✕")});
bindSeg("#segDevice",function(v){state.device=v;renderPreview()});
bindSeg("#segFormat",function(v){state.format=v;renderCode()});
$("#btnOpenTab").addEventListener("click",function(){var url=URL.createObjectURL(new Blob([buildLandingDoc()],{type:"text/html"}));window.open(url,"_blank");setTimeout(function(){URL.revokeObjectURL(url)},60000)});
$("#btnReload").addEventListener("click",function(){renderPreview();toast("Vista actualizada")});
$("#btnCopy").addEventListener("click",function(){
if(state.format==="img"){toast("La imagen se descarga con el botón Descargar","i");return}
copyText(genCode(state.format),"Código copiado al portapapeles")
});
$("#btnDownloadCode").addEventListener("click",function(){
if(state.format==="img"){downloadImage();return}
var mt=state.format==="full"?"text/html":(state.format==="css"?"text/css":(state.format==="js"?"text/javascript":"text/html"));
downloadFile(FILE_NAMES[state.format],genCode(state.format),mt)
});
$("#dcCopy").addEventListener("click",function(){copyText(currentCode,"Código de diseño copiado")});
$("#btnLoadCode").addEventListener("click",function(){
var v=$("#loadCode").value.trim();
if(!v){toast("Pega un código de diseño primero","i");return}
try{applyPack(JSON.parse(b64d(v.replace(/^CK-/,""))));$("#loadCode").value="";toast("Diseño cargado desde el código","◆")}
catch(err){toast("Código inválido o incompleto","✕")}
});
$("#fabRnd").addEventListener("click",function(){
openSheet('<h3>⚠ Diseño al azar</h3><p class="sh-sub">Esto generará un diseño aleatorio con aleaciones, tipos y estilos curados.</p><div class="warn-box">Tu diseño actual <b>será reemplazado</b>. Si quieres conservarlo, copia primero el código actual desde el label flotante (botón «Copiar»).</div><div class="sh-actions"><button class="btn-app ghost" id="rndNo">Cancelar</button><button class="btn-app pri" id="rndYes">Generar al azar</button></div>');
$("#rndNo").addEventListener("click",closeSheet);
$("#rndYes").addEventListener("click",function(){closeSheet();try{applyPack(randomPack());toast("Diseño aleatorio aplicado","🎲")}catch(e){toast("No se pudo generar","✕")}})
});
$$("#wsSwitch button").forEach(function(b){b.addEventListener("click",function(){
document.body.setAttribute("data-ws",b.getAttribute("data-w"));
$$("#wsSwitch button").forEach(function(x){x.classList.toggle("on",x===b)});
if(b.getAttribute("data-w")==="vista")renderPreview()
})});
var footIO=new IntersectionObserver(function(es){es.forEach(function(e){var off=e.isIntersecting;$("#dcode").classList.toggle("off",off);$("#fabRnd").classList.toggle("off",off);$("#eyeFab").classList.toggle("off",off)})},{threshold:.05});
var _appFooter=document.querySelector(".footer");if(_appFooter)footIO.observe(_appFooter);
window.addEventListener("resize",function(){renderPreview();if($("#eyeOverlay").classList.contains("open"))renderEyePreview()});
renderPreview();renderCode();scramble()
}
/* ═══ TABS del panel de controles ═══ */
$$(".tab-btn").forEach(function(b){b.addEventListener("click",function(){
  var t=b.getAttribute("data-tab");
  $$(".tab-btn").forEach(function(x){x.classList.toggle("on",x===b)});
  $$(".tabpanel").forEach(function(p){p.classList.toggle("on",p.getAttribute("data-panel")===t)});
})});
try{init()}catch(err){var _t=document.getElementById("toast");if(_t){_t.innerHTML='<span class="tk" style="color:#FF6B6B">✕</span> Error de inicio: '+esc(String(err.message||err));_t.classList.add("show")}}
