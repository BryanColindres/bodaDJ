// ═══════════════════════════════════════════════════════
//  MAIN.JS — Boda Bryan & Stefany v2 PREMIUM
// ═══════════════════════════════════════════════════════
const C = window.BODA_CONFIG;

// ── Leer nombre del invitado desde URL ─────────────────
function getGuestName() {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get('i') || params.get('inv') || '';
  if (!raw) return '';
  return raw.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}
const GUEST_NAME = getGuestName();

// ── Aplicar config al DOM ─────────────────────────────
function applyConfig() {
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  const setHref = (id, url) => { const el = document.getElementById(id); if (el) el.href = url; };

  set('novioNombre', C.novio.nombre);
  set('noviaNombre', C.novia.nombre);
  set('heroApellidos', C.novio.apellidos + ' · ' + C.novia.apellidos);
  set('footerNovio', C.novio.nombre.split(' ')[0]);
  set('footerNovia', C.novia.nombre.split(' ')[0]);
  set('eventDate', C.evento.fechaTexto);
  set('eventTime', C.evento.hora);
  set('eventVenue', C.evento.lugar);
  set('venueName', C.evento.lugar);
  set('rsvpDescription', C.rsvp.descripcion);
  set('footerPhrase', C.footer.frase);

  // Versículo
  const bq = document.getElementById('verseText');
  if (bq) bq.textContent = C.versiculo.texto;
  set('verseCite', '— ' + C.versiculo.cita);

  setHref('mapsBtn', C.evento.mapsUrl);
  setHref('wazeBtn', C.evento.wazeUrl);

  // Historia textos
  ['story1Text','story2Text','story3Text'].forEach((id, i) => set(id, C.historiaTextos[i] || ''));

  // Instrucciones
  const grid = document.getElementById('instructionsGrid');
  if (grid) {
    grid.innerHTML = C.instrucciones.map(instr => `
      <div class="instr-card reveal">
        <div class="instr-card__icon">${instr.icono}</div>
        <h3>${instr.titulo}</h3>
        <p>${instr.texto}</p>
      </div>`).join('');
  }

  // Galería
  const gallGrid = document.getElementById('galleryGrid');
  if (gallGrid) {
    gallGrid.innerHTML = C.fotos.galeria.map((src, i) => `
      <div class="gallery-item reveal" data-index="${i}">
        <img src="${src}" alt="Preboda ${i+1}" onerror="this.parentElement.style.display='none'"/>
      </div>`).join('');
  }

  // Línea de tiempo
  buildTimeline();

  // WhatsApp con nombre
  const nombre = GUEST_NAME || 'Invitado';
  const msg = C.whatsapp.mensaje.replace('{nombre}', nombre);
  const waUrl = `https://wa.me/${C.whatsapp.numero}?text=${encodeURIComponent(msg)}`;
  setHref('whatsappBtn', waUrl);

  // Audio
  const bgMusic = document.getElementById('bgMusic');
  const voiceMsg = document.getElementById('voiceMsg');
  if (bgMusic) bgMusic.src = C.audio.musica;
  if (voiceMsg) voiceMsg.src = C.audio.mensajeVoz;

  // Nombre del invitado en varios lugares
  if (GUEST_NAME) {
    set('guestNameEnv', GUEST_NAME);
    const welcome = document.getElementById('heroGuestWelcome');
    if (welcome) welcome.style.display = 'block';
    set('heroGuestName', GUEST_NAME);
    set('voiceGuestName', GUEST_NAME);
    set('gbNameDisplay', 'Firmando como: ' + GUEST_NAME);
  }

  // Colores
  const r = document.documentElement.style;
  r.setProperty('--rose-deep', C.colores.roseProfundo);
  r.setProperty('--rose-mid',  C.colores.roseMedio);
  r.setProperty('--rose-soft', C.colores.roseSuave);
  r.setProperty('--blush',     C.colores.blush);
  r.setProperty('--cream',     C.colores.crema);
  r.setProperty('--gold',      C.colores.dorado);
}

// ── Línea de tiempo ────────────────────────────────────
function buildTimeline() {
  const el = document.getElementById('timelineEl');
  if (!el) return;
  el.innerHTML = C.timeline.map((item, i) => `
    <div class="timeline-item" data-index="${i}">
      ${i % 2 === 0 ? `
        <div class="tl-content">
          <span class="tl-fecha">${item.fecha}</span>
          <h3 class="tl-titulo">${item.titulo}</h3>
          <p class="tl-texto">${item.texto}</p>
        </div>
        <div class="tl-dot"><div class="tl-dot__icon">${item.icono}</div></div>
        <div class="tl-empty"></div>
      ` : `
        <div class="tl-empty"></div>
        <div class="tl-dot"><div class="tl-dot__icon">${item.icono}</div></div>
        <div class="tl-content">
          <span class="tl-fecha">${item.fecha}</span>
          <h3 class="tl-titulo">${item.titulo}</h3>
          <p class="tl-texto">${item.texto}</p>
        </div>
      `}
    </div>`).join('');
}

// ── Pétalos cayendo ────────────────────────────────────
function createPetals(containerId, count = 12) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const colors = ['#EDD5C5','#D4A99A','#C4907A','#E8C4B4','#F0D8CC'];
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = containerId === 'petalsBg' ? 'petal-bg-item' : 'petal';
    const size = Math.random() * 14 + 8;
    p.style.cssText = `
      left:${Math.random()*100}%;
      width:${size}px; height:${size*1.3}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      animation-duration:${Math.random()*6+6}s;
      animation-delay:${Math.random()*8}s;
    `;
    container.appendChild(p);
  }
}

// ── Countdown ──────────────────────────────────────────
function startCountdown() {
  const target = new Date(C.evento.fecha).getTime();
  const tick = () => {
    const diff = target - Date.now();
    if (diff <= 0) { document.getElementById('countdownLabel').textContent = '¡Es hoy! 🌹'; return; }
    const pad = n => String(Math.floor(n)).padStart(2,'0');
    document.getElementById('cd-days').textContent  = pad(diff/86400000);
    document.getElementById('cd-hours').textContent = pad((diff%86400000)/3600000);
    document.getElementById('cd-mins').textContent  = pad((diff%3600000)/60000);
    document.getElementById('cd-secs').textContent  = pad((diff%60000)/1000);
  };
  tick(); setInterval(tick, 1000);
}

// ── Scroll Reveal ──────────────────────────────────────
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => obs.observe(el));

  // Timeline observer
  const tlObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); tlObs.unobserve(e.target); }});
  }, { threshold: 0.2 });
  document.querySelectorAll('.timeline-item').forEach(el => tlObs.observe(el));
}

// ── Música de fondo ────────────────────────────────────
let musicPlaying = false;
function initMusic() {
  const btn = document.getElementById('musicBtn');
  const audio = document.getElementById('bgMusic');
  if (!audio) return;
  audio.volume = 0;

  btn.addEventListener('click', () => {
    if (musicPlaying) {
      audio.pause(); musicPlaying = false;
      document.getElementById('musicIconOn').style.display  = 'none';
      document.getElementById('musicIconOff').style.display = 'block';
    } else {
      audio.play().catch(()=>{});
      fadeInMusic(audio, 0, 0.35, 3000);
      musicPlaying = true;
      document.getElementById('musicIconOn').style.display  = 'block';
      document.getElementById('musicIconOff').style.display = 'none';
    }
  });
}

function playMusicGently() {
  const audio = document.getElementById('bgMusic');
  if (!audio || musicPlaying) return;
  audio.volume = 0;
  audio.play().then(() => {
    musicPlaying = true;
    document.getElementById('musicIconOn').style.display  = 'block';
    document.getElementById('musicIconOff').style.display = 'none';
    fadeInMusic(audio, 0, 0.3, 4000);
  }).catch(() => {});
}

function fadeInMusic(audio, from, to, duration) {
  audio.volume = from;
  const steps = 60;
  const step = (to - from) / steps;
  let current = from;
  const interval = setInterval(() => {
    current += step;
    audio.volume = Math.min(Math.max(current, 0), 1);
    if ((step > 0 && current >= to) || (step < 0 && current <= to)) clearInterval(interval);
  }, duration / steps);
}

// ── Mensaje de voz ─────────────────────────────────────
function initVoiceMessage() {
  const btn = document.getElementById('voicePlayBtn');
  const audio = document.getElementById('voiceMsg');
  const progress = document.getElementById('voiceProgress');
  const bar = document.getElementById('voiceProgressBar');
  const label = document.getElementById('voicePlayLabel');
  const icon = document.getElementById('voicePlayIcon');
  if (!btn || !audio) return;

  let playing = false;
  btn.addEventListener('click', () => {
    if (!playing) {
      audio.play().catch(() => {
        label.textContent = 'Audio no disponible aún';
        return;
      });
      playing = true; icon.textContent = '⏸'; label.textContent = 'Pausar';
      progress.classList.add('active');
      // Bajar música de fondo si está sonando
      const bg = document.getElementById('bgMusic');
      if (bg && musicPlaying) fadeInMusic(bg, bg.volume, 0.08, 1500);
    } else {
      audio.pause(); playing = false; icon.textContent = '▶'; label.textContent = 'Escuchar mensaje';
      const bg = document.getElementById('bgMusic');
      if (bg && musicPlaying) fadeInMusic(bg, bg.volume, 0.3, 1500);
    }
  });

  audio.addEventListener('timeupdate', () => {
    if (audio.duration) bar.style.width = (audio.currentTime/audio.duration*100) + '%';
  });
  audio.addEventListener('ended', () => {
    playing = false; icon.textContent = '▶'; label.textContent = 'Escuchar de nuevo';
    bar.style.width = '0%';
    const bg = document.getElementById('bgMusic');
    if (bg && musicPlaying) fadeInMusic(bg, bg.volume, 0.3, 2000);
  });
}

// ── Lightbox ───────────────────────────────────────────
let lbImages = [], lbIndex = 0;
function initLightbox() {
  document.getElementById('lightboxClose').onclick = () => { document.getElementById('lightbox').classList.remove('open'); document.body.style.overflow=''; };
  document.getElementById('lightboxPrev').onclick  = () => { lbIndex=(lbIndex-1+lbImages.length)%lbImages.length; document.getElementById('lightboxImg').src=lbImages[lbIndex]; };
  document.getElementById('lightboxNext').onclick  = () => { lbIndex=(lbIndex+1)%lbImages.length; document.getElementById('lightboxImg').src=lbImages[lbIndex]; };
  document.getElementById('lightbox').onclick = (e) => { if(e.target===document.getElementById('lightbox')){document.getElementById('lightbox').classList.remove('open');document.body.style.overflow='';} };
  document.addEventListener('keydown', e => {
    const lb = document.getElementById('lightbox');
    if(!lb.classList.contains('open')) return;
    if(e.key==='Escape') { lb.classList.remove('open'); document.body.style.overflow=''; }
    if(e.key==='ArrowLeft')  { lbIndex=(lbIndex-1+lbImages.length)%lbImages.length; document.getElementById('lightboxImg').src=lbImages[lbIndex]; }
    if(e.key==='ArrowRight') { lbIndex=(lbIndex+1)%lbImages.length; document.getElementById('lightboxImg').src=lbImages[lbIndex]; }
  });
  document.getElementById('galleryGrid').addEventListener('click', e => {
    const item = e.target.closest('.gallery-item');
    if (!item) return;
    lbImages = Array.from(document.querySelectorAll('.gallery-grid .gallery-item img')).map(i=>i.src);
    lbIndex = parseInt(item.dataset.index) || 0;
    document.getElementById('lightboxImg').src = lbImages[lbIndex];
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
  });
}

// ── Libro de firmas ────────────────────────────────────
let selectedEmoji = '❤️';
const LOCAL_KEY = 'boda_firmas_v2';

function initGuestbook() {
  // Reacciones
  document.querySelectorAll('.gb-react').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.gb-react').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedEmoji = btn.dataset.emoji;
    });
  });
  document.querySelectorAll('.gb-react')[0]?.classList.add('selected');

  // Contador de caracteres
  const textarea = document.getElementById('gbMessage');
  textarea.addEventListener('input', () => {
    document.getElementById('gbCharCount').textContent = 300 - textarea.value.length;
  });

  // Enviar
  document.getElementById('gbSubmitBtn').addEventListener('click', submitFirma);

  // Cargar firmas existentes
  loadFirmas();
}

function submitFirma() {
  const msg = document.getElementById('gbMessage').value.trim();
  if (!msg) { alert('Por favor escribe un mensaje.'); return; }
  const nombre = GUEST_NAME || 'Invitado';
  const firma = { nombre, mensaje: msg, emoji: selectedEmoji, fecha: new Date().toLocaleDateString('es-HN', { day:'numeric', month:'long', year:'numeric' }) };

  // Guardar localmente
  const firmas = getFirmasLocal();
  firmas.unshift(firma);
  localStorage.setItem(LOCAL_KEY, JSON.stringify(firmas));

  // Intentar guardar en Airtable si está configurado
  if (C.airtable.apiKey !== 'TU_API_KEY_AQUI') {
    saveToAirtable(firma);
  }

  document.getElementById('gbMessage').value = '';
  document.getElementById('gbCharCount').textContent = '300';
  loadFirmas();
  showToast('💌 ¡Tu mensaje fue enviado con mucho amor!');
}

function getFirmasLocal() {
  try { return JSON.parse(localStorage.getItem(LOCAL_KEY)) || []; } catch { return []; }
}

function loadFirmas() {
  const firmas = getFirmasLocal();
  const container = document.getElementById('guestbookEntries');
  if (!container) return;
  if (!firmas.length) {
    container.innerHTML = '<p class="gb-empty">Sé el primero en dejar un mensaje 🌹</p>';
    return;
  }
  container.innerHTML = firmas.map(f => `
    <div class="gb-entry">
      <div class="gb-entry__header">
        <span class="gb-entry__name">${f.nombre}</span>
        <span class="gb-entry__emoji">${f.emoji}</span>
      </div>
      <p class="gb-entry__msg">"${f.mensaje}"</p>
      <p class="gb-entry__date">${f.fecha}</p>
    </div>`).join('');
}

async function saveToAirtable(firma) {
  try {
    const { apiKey, baseId, tableId } = C.airtable;
    await fetch(`https://api.airtable.com/v0/${baseId}/${tableId}`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ fields: { Nombre: firma.nombre, Mensaje: firma.mensaje, Emoji: firma.emoji, Fecha: firma.fecha } })
    });
  } catch(e) { console.warn('Airtable no disponible:', e); }
}

// ── SOBRE — Animación de apertura ─────────────────────
function initEnvelope() {
  const seal = document.getElementById('waxSeal');
  const flap = document.getElementById('envelopeFlap');
  const sheet = document.getElementById('letterSheet');
  const openBtn = document.getElementById('envOpenBtn');
  const screen = document.getElementById('envelopeScreen');
  const main = document.getElementById('invitationMain');

  let opened = false;

  seal.addEventListener('click', () => {
    if (opened) return;
    opened = true;

    // 1. Romper el sello (escala + fade)
    seal.style.transition = 'transform .4s var(--ease-bounce), opacity .3s';
    seal.style.transform = 'scale(1.3) rotate(15deg)';
    seal.style.opacity = '0';

    setTimeout(() => {
      // 2. Abrir el flap
      flap.classList.add('open');
    }, 300);

    setTimeout(() => {
      // 3. Hoja sube del sobre
      sheet.classList.add('rising');
    }, 700);

    setTimeout(() => {
      // 4. Mostrar botón
      openBtn.classList.add('visible');
    }, 1100);
  });

  openBtn.addEventListener('click', () => {
    // Transición elegante de sobre a invitación
    screen.classList.add('hiding');

    setTimeout(() => {
      screen.classList.add('hidden');
      main.classList.add('visible');
      // Iniciar música suavemente
      playMusicGently();
      // Iniciar reveal
      setTimeout(initReveal, 100);
    }, 800);
  });
}

// ── Toast ──────────────────────────────────────────────
function showToast(msg) {
  const t = document.createElement('div');
  t.style.cssText = `position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);background:var(--rose-deep);color:white;padding:.85rem 2rem;border-radius:50px;font-family:var(--font-body);font-size:.85rem;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,.2);animation:fadeUp .4s both`;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 4000);
}

// ── Admin (3 clics en esquina) ─────────────────────────
let adminClicks = 0, adminTimer;
document.getElementById('adminTrigger').addEventListener('click', () => {
  adminClicks++;
  clearTimeout(adminTimer);
  adminTimer = setTimeout(() => adminClicks = 0, 800);
  if (adminClicks >= 3) { adminClicks = 0; openAdminLogin(); }
});

function openAdminLogin() {
  const ov = makeOverlay();
  ov.innerHTML = `<div style="background:white;border-radius:24px;padding:2.5rem;max-width:380px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,.25)">
    <h2 style="font-family:var(--font-display);font-size:2rem;color:var(--rose-deep);margin-bottom:.5rem">Panel de edición</h2>
    <p style="font-size:.85rem;color:var(--text-light);margin-bottom:1.5rem">Ingresa la contraseña</p>
    <input type="password" id="adminPass" placeholder="Contraseña" style="width:100%;padding:.65rem .9rem;border:1.5px solid var(--blush);border-radius:10px;font-family:var(--font-body);font-size:.88rem;outline:none;box-sizing:border-box"/>
    <div style="display:flex;gap:.75rem;margin-top:1.25rem">
      <button onclick="checkPass()" style="padding:.7rem 1.5rem;background:var(--rose-deep);color:white;border:none;border-radius:50px;font-family:var(--font-body);cursor:pointer">Entrar</button>
      <button onclick="closeOv()" style="padding:.7rem 1.5rem;background:none;border:1.5px solid var(--rose-deep);color:var(--rose-deep);border-radius:50px;font-family:var(--font-body);cursor:pointer">Cancelar</button>
    </div>
  </div>`;
  document.body.appendChild(ov);
  document.getElementById('adminPass').addEventListener('keydown', e => { if(e.key==='Enter') window.checkPass(); });
  setTimeout(() => ov.style.opacity='1', 10);
}

window.checkPass = function() {
  if (document.getElementById('adminPass').value === 'bodadanieljissel') {
    window.closeOv(); showToast('✅ Panel admin — próximamente versión completa de edición.');
  } else {
    document.getElementById('adminPass').style.borderColor='#e55';
    document.getElementById('adminPass').value='';
    document.getElementById('adminPass').placeholder='Contraseña incorrecta';
  }
};

function makeOverlay() {
  window.closeOv();
  const ov = document.createElement('div');
  ov.id = 'adm-ov';
  ov.style.cssText = 'position:fixed;inset:0;background:rgba(20,10,10,.6);backdrop-filter:blur(6px);z-index:2000;display:flex;align-items:center;justify-content:center;padding:1rem;opacity:0;transition:opacity .3s';
  return ov;
}
window.closeOv = function() { const e=document.getElementById('adm-ov'); if(e){e.style.opacity='0';setTimeout(()=>e.remove(),300);} };

// ── Init ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  applyConfig();
  startCountdown();
  createPetals('petalsBg', 15);
  createPetals('petalsHero', 10);
  initEnvelope();
  initMusic();
  initVoiceMessage();
  initLightbox();
  initGuestbook();
});
