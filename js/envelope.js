// ═══════════════════════════════════════════════════════
//  ENVELOPE.JS — Animación de apertura del sobre
// ═══════════════════════════════════════════════════════

(function() {
  const C = window.BODA_CONFIG;

  // ── Generar partículas flotantes de fondo ─────────────
  function spawnParticles() {
    const container = document.getElementById('envParticles');
    if (!container) return;
    const colors = ['#D4A99A','#C8A96E','#EDD5C5','#C4907A','#F0E0D0'];
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div');
      p.className = 'env-particle';
      const size = Math.random() * 6 + 3;
      p.style.cssText = `
        width:${size}px; height:${size}px;
        left:${Math.random()*100}%;
        background:${colors[Math.floor(Math.random()*colors.length)]};
        animation-duration:${Math.random()*15+10}s;
        animation-delay:${Math.random()*8}s;
      `;
      container.appendChild(p);
    }
  }

  // ── Obtener nombre del invitado desde URL ─────────────
  function getGuestName() {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get('i') || params.get('inv') || '';
    if (!raw) return 'Invitado Especial';
    return raw
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }

  // ── Pétalos en la pantalla de nombre ─────────────────
  function spawnPetals() {
    const container = document.getElementById('guestPetals');
    if (!container) return;
    const petals = ['🌸','🌹','✨','💮','🌺','💕'];
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div');
      p.className = 'petal';
      p.textContent = petals[Math.floor(Math.random()*petals.length)];
      p.style.cssText = `
        left:${Math.random()*100}%;
        font-size:${Math.random()*1.2+0.7}rem;
        animation-duration:${Math.random()*4+3}s;
        animation-delay:${Math.random()*3}s;
      `;
      container.appendChild(p);
    }
  }

  // ── Música: fade in suave ─────────────────────────────
  function startMusicFadeIn() {
    const audio = document.getElementById('bgMusic');
    if (!audio) return;
    audio.volume = 0;
    const tryPlay = audio.play();
    if (tryPlay !== undefined) {
      tryPlay.then(() => {
        let vol = 0;
        const fade = setInterval(() => {
          vol = Math.min(vol + 0.02, 0.4);
          audio.volume = vol;
          if (vol >= 0.4) clearInterval(fade);
        }, 200);
        // Mostrar player
        const player = document.getElementById('musicPlayer');
        if (player) {
          player.classList.add('visible');
          const pauseIcon = player.querySelector('.music-icon--pause');
          const playIcon  = player.querySelector('.music-icon--play');
          if (pauseIcon) pauseIcon.style.display = 'block';
          if (playIcon)  playIcon.style.display  = 'none';
          // Agregar equalizador
          const bar = player.querySelector('.music-player__bar');
          if (bar && !bar.querySelector('.music-equalizer')) {
            const eq = document.createElement('div');
            eq.className = 'music-equalizer';
            eq.innerHTML = '<span></span><span></span><span></span><span></span><span></span>';
            bar.appendChild(eq);
          }
        }
      }).catch(() => {
        // Autoplay bloqueado — mostrar player para que el usuario lo active
        const player = document.getElementById('musicPlayer');
        if (player) player.classList.add('visible');
      });
    }
  }

  // ── Flujo principal ───────────────────────────────────
  function initEnvelope() {
    spawnParticles();

    const envelope   = document.getElementById('envelope');
    const seal       = document.getElementById('envSeal');
    const screen     = document.getElementById('envelopeScreen');
    const guestReveal = document.getElementById('guestReveal');
    const invitation = document.getElementById('invitation');
    const guestNameEl = document.getElementById('guestName');
    const musicPlayer = document.getElementById('musicPlayer');

    // Poner nombre del invitado
    const guestName = getGuestName();
    if (guestNameEl) guestNameEl.textContent = guestName;

    // También actualizar el WhatsApp con el nombre
    updateWhatsAppWithGuest(guestName);

    let opened = false;

    // Clic en el sello o en el sobre
    function openEnvelope() {
      if (opened) return;
      opened = true;

      // 1. Abrir sobre
      envelope.classList.add('opening');

      // 2. Empezar música con fade
      setTimeout(startMusicFadeIn, 400);

      // 3. Después de la animación del sobre → mostrar nombre del invitado
      setTimeout(() => {
        screen.classList.add('hiding');
        spawnPetals();
        guestReveal.classList.add('active');

        setTimeout(() => {
          screen.classList.add('hidden');
        }, 800);
      }, 1800);

      // 4. Al hacer clic/scroll en la pantalla del nombre → mostrar invitación
      function dismissGuest() {
        guestReveal.classList.add('hiding');
        invitation.classList.add('visible');
        if (musicPlayer) musicPlayer.classList.add('visible');

        setTimeout(() => {
          guestReveal.style.display = 'none';
          initRevealObserver();
        }, 600);
        guestReveal.removeEventListener('click', dismissGuest);
        window.removeEventListener('wheel', dismissGuest);
        window.removeEventListener('touchmove', dismissGuest);
      }

      setTimeout(() => {
        guestReveal.addEventListener('click', dismissGuest);
        window.addEventListener('wheel', dismissGuest, { once: true });
        window.addEventListener('touchmove', dismissGuest, { once: true });
      }, 2800);
    }

    if (seal)     seal.addEventListener('click', openEnvelope);
    if (envelope) envelope.addEventListener('click', openEnvelope);
  }

  // ── WhatsApp personalizado ────────────────────────────
  function updateWhatsAppWithGuest(name) {
    const C = window.BODA_CONFIG;
    const msg = `${C.whatsapp.mensaje}${name}`;
    const url = `https://wa.me/${C.whatsapp.numero}?text=${encodeURIComponent(msg)}`;
    const btn = document.getElementById('whatsappBtn');
    if (btn) btn.href = url;
  }

  // ── Scroll Reveal (se activa al abrir invitación) ─────
  function initRevealObserver() {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.timeline-item')
      .forEach(el => obs.observe(el));
  }

  window.initRevealObserver = initRevealObserver;

  document.addEventListener('DOMContentLoaded', initEnvelope);
})();
