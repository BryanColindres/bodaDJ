// ═══════════════════════════════════════════════════════
//  ADMIN.JS — Panel de edición visual
// ═══════════════════════════════════════════════════════

const inputStyle = `width:100%;padding:.65rem .9rem;border:1.5px solid var(--blush);border-radius:10px;font-family:var(--font-b);font-size:.88rem;color:var(--text-dark);outline:none;transition:border .2s;box-sizing:border-box;background:var(--cream)`;
const btnStyle = (bg,color,border='none') =>
  `padding:.7rem 1.5rem;background:${bg};color:${color};border:${border};border-radius:50px;font-family:var(--font-b);font-size:.8rem;letter-spacing:.08em;cursor:pointer;transition:all .2s;white-space:nowrap`;

function escHtml(s) { return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function admSection(title, content) {
  return `<div style="margin-bottom:2rem">
    <h3 style="font-family:var(--font-d,serif);font-size:1.15rem;color:var(--rose-deep);margin-bottom:1rem;padding-bottom:.5rem;border-bottom:1px solid var(--blush)">${title}</h3>
    ${content}</div>`;
}
function admField(label, id, value) {
  return `<div style="margin-bottom:.75rem">
    <label style="font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;color:var(--text-light);display:block;margin-bottom:.3rem">${label}</label>
    <input type="text" id="${id}" value="${escHtml(value)}" style="${inputStyle}"/></div>`;
}
function admTextarea(label, id, value) {
  return `<div style="margin-bottom:.75rem">
    <label style="font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;color:var(--text-light);display:block;margin-bottom:.3rem">${label}</label>
    <textarea id="${id}" style="${inputStyle};min-height:80px;resize:vertical">${escHtml(value)}</textarea></div>`;
}
function admColor(label, id, value) {
  return `<div>
    <label style="font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;color:var(--text-light);display:block;margin-bottom:.3rem">${label}</label>
    <div style="display:flex;align-items:center;gap:.5rem">
      <input type="color" id="${id}" value="${value}" style="width:2.5rem;height:2.5rem;border:none;padding:0;cursor:pointer;border-radius:8px" oninput="document.getElementById('${id}_txt').value=this.value"/>
      <input type="text" id="${id}_txt" value="${value}" style="${inputStyle};flex:1" oninput="document.getElementById('${id}').value=this.value"/>
    </div></div>`;
}

function createOverlay() {
  const existing = document.getElementById('adm-overlay');
  if (existing) existing.remove();
  const overlay = document.createElement('div');
  overlay.id = 'adm-overlay';
  overlay.style.cssText = `position:fixed;inset:0;background:rgba(20,10,10,.6);backdrop-filter:blur(6px);z-index:2000;display:flex;align-items:center;justify-content:center;padding:1rem;opacity:0;transition:opacity .3s`;
  const style = document.createElement('style');
  style.textContent = `.adm-modal{background:var(--white,#fffaf7);border-radius:24px;padding:2rem;width:100%;box-shadow:0 20px 60px rgba(0,0,0,.25);}`;
  overlay.appendChild(style);
  return overlay;
}

window.closeOverlay = function() {
  const el = document.getElementById('adm-overlay');
  if (el) { el.style.opacity='0'; setTimeout(()=>el.remove(),300); }
};

window.openAdminLogin = function() {
  const overlay = createOverlay();
  overlay.innerHTML += `
    <div class="adm-modal" style="max-width:380px">
      <h2 style="font-family:var(--font-d,serif);font-size:1.8rem;color:var(--rose-deep);margin-bottom:.5rem">🔐 Panel de edición</h2>
      <p style="font-size:.85rem;color:var(--text-light);margin-bottom:1.5rem">Ingresa la contraseña para continuar</p>
      <input type="password" id="adminPass" placeholder="Contraseña" style="${inputStyle}"/>
      <div style="display:flex;gap:.75rem;margin-top:1.25rem">
        <button onclick="checkAdminPass()" style="${btnStyle('var(--rose-deep)','white')}">Entrar</button>
        <button onclick="closeOverlay()" style="${btnStyle('transparent','var(--rose-deep)','1.5px solid var(--rose-deep)')}">Cancelar</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  setTimeout(()=>overlay.style.opacity='1',10);
  document.getElementById('adminPass')?.addEventListener('keydown',e=>{if(e.key==='Enter')checkAdminPass();});
};

window.checkAdminPass = function() {
  const pass = document.getElementById('adminPass')?.value;
  if (pass === 'bodadanieljissel') { closeOverlay(); setTimeout(openAdminPanel, 350); }
  else {
    const inp = document.getElementById('adminPass');
    if (inp) { inp.style.borderColor='#e55'; inp.value=''; inp.placeholder='Contraseña incorrecta'; }
  }
};

function openAdminPanel() {
  const cfg = window.BODA_CONFIG;
  const overlay = createOverlay();

  const tlFields = cfg.timeline.map((ev,i) => `
    <div style="border:1px solid var(--blush);border-radius:12px;padding:1rem;margin-bottom:.75rem">
      <p style="font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;color:var(--rose-mid);margin-bottom:.5rem">Evento ${i+1}${ev.especial?' ⭐':''}</p>
      ${admField('Fecha (ej: 2020 o Marzo 2024)',`adm_tl_fecha${i}`,ev.fecha)}
      ${admField('Título',`adm_tl_titulo${i}`,ev.titulo)}
      ${admTextarea('Descripción',`adm_tl_desc${i}`,ev.descripcion)}
    </div>`).join('');

  overlay.innerHTML += `
  <div class="adm-modal" style="max-width:700px;max-height:90vh;overflow-y:auto">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;position:sticky;top:0;background:var(--white,#fffaf7);padding:.5rem 0;z-index:1;border-bottom:1px solid var(--blush)">
      <h2 style="font-family:var(--font-d,serif);font-size:1.8rem;color:var(--rose-deep)">✏️ Editar invitación</h2>
      <button onclick="closeOverlay()" style="background:none;border:none;font-size:1.5rem;cursor:pointer;color:var(--text-light)">✕</button>
    </div>

    ${admSection('👫 Nombres',`
      ${admField('Nombre del novio','adm_novioNombre',cfg.novio.nombre)}
      ${admField('Apellidos del novio','adm_novioApellidos',cfg.novio.apellidos)}
      ${admField('Nombre de la novia','adm_noviaNombre',cfg.novia.nombre)}
      ${admField('Apellidos de la novia','adm_noviaApellidos',cfg.novia.apellidos)}
    `)}

    ${admSection('📅 Evento',`
      ${admField('Fecha contador (YYYY-MM-DDTHH:MM:SS)','adm_fecha',cfg.evento.fecha)}
      ${admField('Fecha en texto','adm_fechaTexto',cfg.evento.fechaTexto)}
      ${admField('Hora','adm_hora',cfg.evento.hora)}
      ${admField('Nombre del lugar','adm_lugar',cfg.evento.lugar)}
      ${admField('Enlace Google Maps','adm_maps',cfg.evento.mapsUrl)}
      ${admField('Enlace Waze','adm_waze',cfg.evento.wazeUrl)}
    `)}

    ${admSection('📖 Versículo',`
      ${admTextarea('Texto','adm_versText',cfg.versiculo.texto)}
      ${admField('Cita','adm_versCita',cfg.versiculo.cita)}
    `)}

    ${admSection('📝 Instrucciones',
      cfg.instrucciones.map((ins,i)=>`
        <div style="border:1px solid var(--blush);border-radius:12px;padding:1rem;margin-bottom:.75rem">
          <p style="font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;color:var(--rose-mid);margin-bottom:.5rem">Tarjeta ${i+1}</p>
          ${admField('Título',`adm_iTitle${i}`,ins.titulo)}
          ${admTextarea('Texto',`adm_iText${i}`,ins.texto)}
        </div>`).join('')
    )}

    ${admSection('📸 Historia (textos)',
      cfg.historiaTextos.map((t,i)=>admTextarea(`Párrafo ${i+1}`,`adm_histText${i}`,t)).join('')
    )}

    ${admSection('⏳ Línea de tiempo', tlFields)}

    ${admSection('💌 Confirmación',admTextarea('Descripción','adm_rsvpDesc',cfg.rsvp.descripcion))}

    ${admSection('🌸 Frase final',admField('Frase','adm_footerFrase',cfg.footer.frase))}

    ${admSection('🎨 Colores',`
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem">
        ${admColor('Rosa profundo','adm_c1',cfg.colores.roseProfundo)}
        ${admColor('Rosa medio','adm_c2',cfg.colores.roseMedio)}
        ${admColor('Rosa suave','adm_c3',cfg.colores.roseSuave)}
        ${admColor('Blush','adm_c4',cfg.colores.blush)}
        ${admColor('Crema','adm_c5',cfg.colores.crema)}
        ${admColor('Dorado','adm_c6',cfg.colores.dorado)}
      </div>`
    )}

    <div style="display:flex;gap:1rem;margin-top:2rem;flex-wrap:wrap;position:sticky;bottom:0;background:var(--white,#fffaf7);padding:1rem 0;border-top:1px solid var(--blush)">
      <button onclick="applyAdminChanges()" style="${btnStyle('var(--rose-deep)','white')}">✅ Aplicar cambios</button>
      <button onclick="exportConfig()" style="${btnStyle('white','var(--rose-deep)','1.5px solid var(--rose-deep)')}">📥 Descargar config.js</button>
      <button onclick="closeOverlay()" style="background:none;border:none;color:var(--text-light);cursor:pointer;font-size:.85rem">Cancelar</button>
    </div>
    <p style="font-size:.72rem;color:var(--text-light);margin-top:.75rem;line-height:1.6">
      Aplica los cambios para verlos al instante. Descarga <code>config.js</code> y súbelo a GitHub para hacerlos permanentes.
    </p>
  </div>`;

  document.body.appendChild(overlay);
  setTimeout(()=>overlay.style.opacity='1',10);
}

window.applyAdminChanges = function() {
  const get = id => { const e=document.getElementById(id); return e?e.value:''; };
  const cfg = window.BODA_CONFIG;

  cfg.novio.nombre        = get('adm_novioNombre');
  cfg.novio.apellidos     = get('adm_novioApellidos');
  cfg.novia.nombre        = get('adm_noviaNombre');
  cfg.novia.apellidos     = get('adm_noviaApellidos');
  cfg.evento.fecha        = get('adm_fecha');
  cfg.evento.fechaTexto   = get('adm_fechaTexto');
  cfg.evento.hora         = get('adm_hora');
  cfg.evento.lugar        = get('adm_lugar');
  cfg.evento.mapsUrl      = get('adm_maps');
  cfg.evento.wazeUrl      = get('adm_waze');
  cfg.versiculo.texto     = get('adm_versText');
  cfg.versiculo.cita      = get('adm_versCita');
  cfg.instrucciones       = cfg.instrucciones.map((ins,i)=>({...ins,titulo:get(`adm_iTitle${i}`),texto:get(`adm_iText${i}`)}));
  cfg.historiaTextos      = cfg.historiaTextos.map((_,i)=>get(`adm_histText${i}`));
  cfg.timeline            = cfg.timeline.map((ev,i)=>({...ev,fecha:get(`adm_tl_fecha${i}`),titulo:get(`adm_tl_titulo${i}`),descripcion:get(`adm_tl_desc${i}`)}));
  cfg.rsvp.descripcion    = get('adm_rsvpDesc');
  cfg.footer.frase        = get('adm_footerFrase');
  cfg.colores.roseProfundo= get('adm_c1_txt')||get('adm_c1');
  cfg.colores.roseMedio   = get('adm_c2_txt')||get('adm_c2');
  cfg.colores.roseSuave   = get('adm_c3_txt')||get('adm_c3');
  cfg.colores.blush       = get('adm_c4_txt')||get('adm_c4');
  cfg.colores.crema       = get('adm_c5_txt')||get('adm_c5');
  cfg.colores.dorado      = get('adm_c6_txt')||get('adm_c6');

  closeOverlay();
  if (window.applyConfig) applyConfig();
  if (window.initRevealObserver) initRevealObserver();

  const toast = document.createElement('div');
  toast.style.cssText = `position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);background:var(--rose-deep);color:white;padding:.85rem 2rem;border-radius:50px;font-family:var(--font-b);font-size:.85rem;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,.2);animation:fadeUp .4s both;white-space:nowrap`;
  toast.textContent = '✅ Cambios aplicados. Descarga config.js para hacerlos permanentes.';
  document.body.appendChild(toast);
  setTimeout(()=>toast.remove(),4000);
};

window.exportConfig = function() {
  const content = `// CONFIGURACIÓN — BODA BRYAN & STEFANY\nwindow.BODA_CONFIG = ${JSON.stringify(window.BODA_CONFIG, null, 2)};\n`;
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([content],{type:'text/javascript'}));
  a.download = 'config.js';
  a.click();
};
