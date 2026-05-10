// ═══════════════════════════════════════════════════════
//  GUESTBOOK.JS — Libro de firmas con Airtable
// ═══════════════════════════════════════════════════════

(function() {
  const C = window.BODA_CONFIG;

  function getGuestName() {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get('i') || params.get('inv') || '';
    if (!raw) return 'Invitado';
    return raw.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }

  function formatDate(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString('es-HN', { day:'numeric', month:'long', year:'numeric' });
  }

  // ── Cargar mensajes desde Airtable ───────────────────
  async function loadMessages() {
    const container = document.getElementById('guestbookMessages');
    if (!container) return;

    const { apiKey, baseId, tableId } = C.airtable;

    // Si no está configurado aún, mostrar demo
    if (!apiKey || apiKey === 'TU_API_KEY_AQUI') {
      container.innerHTML = `
        <div class="gb-msg-card">
          <div class="gb-msg-header">
            <span class="gb-msg-name">María López</span>
            <span class="gb-msg-emoji">❤️</span>
          </div>
          <p class="gb-msg-text">¡Los queremos muchísimo! Que su unión sea llena de amor, alegría y bendiciones. No puedo esperar para celebrar con ustedes.</p>
          <p class="gb-msg-date">Mensaje de ejemplo — configura Airtable para ver mensajes reales</p>
        </div>
        <div class="gb-msg-card">
          <div class="gb-msg-header">
            <span class="gb-msg-name">Carlos y Ana</span>
            <span class="gb-msg-emoji">🥂</span>
          </div>
          <p class="gb-msg-text">Que Dios los llene de gracia y que este matrimonio sea un testimonio de su amor. ¡Salud!</p>
          <p class="gb-msg-date">Mensaje de ejemplo</p>
        </div>`;
      return;
    }

    try {
      const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableId)}?sort[0][field]=Fecha&sort[0][direction]=desc&maxRecords=50`;
      const res = await fetch(url, { headers: { 'Authorization': `Bearer ${apiKey}` }});
      if (!res.ok) throw new Error('Error al cargar');
      const data = await res.json();

      if (!data.records || data.records.length === 0) {
        container.innerHTML = '<p class="gb-empty">Sé el primero en dejar tu mensaje 💕</p>';
        return;
      }

      container.innerHTML = '';
      data.records.forEach(rec => {
        const f = rec.fields;
        const card = document.createElement('div');
        card.className = 'gb-msg-card';
        card.innerHTML = `
          <div class="gb-msg-header">
            <span class="gb-msg-name">${f.Nombre || 'Anónimo'}</span>
            <span class="gb-msg-emoji">${f.Reaccion || '❤️'}</span>
          </div>
          <p class="gb-msg-text">${f.Mensaje || ''}</p>
          <p class="gb-msg-date">${f.Fecha ? formatDate(f.Fecha) : ''}</p>`;
        container.appendChild(card);
      });
    } catch (e) {
      container.innerHTML = '<p class="gb-empty">No se pudieron cargar los mensajes. Intenta de nuevo.</p>';
    }
  }

  // ── Enviar mensaje a Airtable ─────────────────────────
  async function submitMessage(nombre, mensaje, reaccion) {
    const { apiKey, baseId, tableId } = C.airtable;

    if (!apiKey || apiKey === 'TU_API_KEY_AQUI') {
      // Modo demo: simular envío
      return { ok: true, demo: true };
    }

    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableId)}`;
    const body = {
      fields: {
        Nombre:   nombre,
        Mensaje:  mensaje,
        Reaccion: reaccion,
        Fecha:    new Date().toISOString()
      }
    };

    const res = await fetch(url, {
      method:  'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type':  'application/json'
      },
      body: JSON.stringify(body)
    });

    return { ok: res.ok };
  }

  // ── UI del formulario ─────────────────────────────────
  function initGuestbook() {
    const guestName = getGuestName();
    const nameEl    = document.getElementById('gbSignerName');
    if (nameEl) nameEl.textContent = guestName;

    // Contador de caracteres
    const textarea  = document.getElementById('gbMessage');
    const charCount = document.getElementById('gbCharCount');
    textarea?.addEventListener('input', () => {
      if (charCount) charCount.textContent = textarea.value.length;
    });

    // Selección de emoji
    let selectedEmoji = '❤️';
    document.querySelectorAll('.gb-emoji').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.gb-emoji').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedEmoji = btn.dataset.emoji;
      });
    });
    // Seleccionar el primero por defecto
    document.querySelector('.gb-emoji')?.classList.add('selected');

    // Enviar
    const submitBtn = document.getElementById('gbSubmit');
    submitBtn?.addEventListener('click', async () => {
      const msg = textarea?.value.trim();
      if (!msg) {
        textarea?.focus();
        textarea?.style.setProperty('border-color', 'var(--rose-mid)');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';

      try {
        const result = await submitMessage(guestName, msg, selectedEmoji);

        if (result.ok) {
          // Limpiar formulario
          if (textarea) textarea.value = '';
          if (charCount) charCount.textContent = '0';

          // Mostrar mensaje de éxito
          showToast(result.demo
            ? '✅ ¡Mensaje recibido! (Configura Airtable para guardarlo permanentemente)'
            : '✅ ¡Tu mensaje fue enviado con mucho amor!'
          );

          // Agregar al DOM sin recargar
          const container = document.getElementById('guestbookMessages');
          const card = document.createElement('div');
          card.className = 'gb-msg-card';
          card.innerHTML = `
            <div class="gb-msg-header">
              <span class="gb-msg-name">${guestName}</span>
              <span class="gb-msg-emoji">${selectedEmoji}</span>
            </div>
            <p class="gb-msg-text">${msg}</p>
            <p class="gb-msg-date">Ahora mismo</p>`;
          if (container) container.insertBefore(card, container.firstChild);

        } else {
          showToast('Ocurrió un error. Intenta de nuevo.', true);
        }
      } catch(e) {
        showToast('Ocurrió un error. Intenta de nuevo.', true);
      }

      submitBtn.disabled = false;
      submitBtn.textContent = '✉️ Dejar mi mensaje';
    });

    // Cargar mensajes existentes
    loadMessages();
  }

  function showToast(msg, isError = false) {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position:fixed; bottom:2rem; left:50%; transform:translateX(-50%);
      background:${isError ? '#c0392b' : 'var(--rose-deep)'};
      color:white; padding:.85rem 2rem; border-radius:50px;
      font-family:var(--font-b); font-size:.85rem;
      z-index:9999; box-shadow:0 4px 20px rgba(0,0,0,.2);
      animation:fadeUp .4s both; white-space:nowrap;
    `;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 4500);
  }

  document.addEventListener('DOMContentLoaded', initGuestbook);
})();
