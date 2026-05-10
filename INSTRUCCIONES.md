# 💍 Invitación de Boda v2 — Bryan & Stefany
## Guía completa paso a paso

---

## 📁 ESTRUCTURA DE ARCHIVOS

```
boda/
├── index.html                  ← La invitación principal
├── generador-invitaciones.html ← Herramienta para generar enlaces por invitado
├── css/
│   ├── style.css               ← Diseño general
│   ├── envelope.css            ← Animación del sobre
│   ├── timeline.css            ← Línea de tiempo + libro de firmas
│   └── guestbook.css           ← (archivo extra, ya incluido en timeline.css)
├── js/
│   ├── config.js               ← ✅ TODOS los textos editables aquí
│   ├── envelope.js             ← Animación de apertura del sobre
│   ├── main.js                 ← Countdown, galería, música, reproductor de voz
│   ├── guestbook.js            ← Libro de firmas (Airtable)
│   └── admin.js                ← Panel de edición visual
├── img/                        ← ✅ TUS FOTOS VAN AQUÍ
│   ├── hero.jpg                → Foto principal del inicio (la mejor)
│   ├── preboda1.jpg            → Foto junto al mensaje de voz
│   ├── preboda2.jpg            → Foto junto al versículo
│   ├── preboda3.jpg            → Foto junto al lugar del evento
│   ├── preboda4.jpg            → Historia bloque 1
│   ├── preboda5.jpg            → Historia bloque 2
│   ├── preboda6.jpg            → Historia bloque 3
│   ├── preboda7.jpg            → Foto junto a confirmación
│   ├── preboda8.jpg  hasta preboda13.jpg → Galería (6 fotos)
│   └── footer.jpg              → Foto del pie de página
└── audio/
    ├── musica.mp3              ← ✅ Tu música de fondo va aquí
    └── mensaje.mp3             ← ✅ Tu mensaje de voz va aquí
```

---

## 🎵 ARCHIVOS DE AUDIO

Cuando tengas los audios listos:
1. Renombra tu música de fondo como **`musica.mp3`**
2. Renombra tu mensaje de voz como **`mensaje.mp3`**
3. Ponlos dentro de la carpeta **`audio/`**
4. Súbelos a GitHub igual que las fotos

**Recomendaciones:**
- La música debe ser un archivo MP3, idealmente menor a 5MB
- El mensaje de voz también en MP3
- Buenas opciones de música: "Can't Help Falling in Love" instrumental, "A Thousand Years" instrumental, etc.

---

## 🚀 PARTE 1 — SUBIR A GITHUB PAGES
### (Solo se hace una vez)

### Paso 1 — Preparar tus fotos y audio
1. Abre la carpeta `img/` del ZIP
2. Copia tus fotos renombradas exactamente como muestra la lista de arriba
3. Si tienes audio, ponlo en la carpeta `audio/`

### Paso 2 — Entrar a GitHub
1. Ve a **github.com** e inicia sesión
2. Haz clic en el ícono de tu perfil (arriba derecha) → **"Your repositories"**
3. Busca el repositorio `boda` que creaste antes, o crea uno nuevo

### Paso 3 — Subir los archivos
**Desde el navegador (más fácil):**
1. Entra a tu repositorio `boda` en GitHub
2. Haz clic en **"Add file"** → **"Upload files"**
3. Arrastra TODA la carpeta de archivos al área de carga
4. Espera que suban todos
5. Escribe en el cuadro de abajo: `Versión 2 con sobre animado`
6. Haz clic en **"Commit changes"**

### Paso 4 — Activar GitHub Pages (si no lo hiciste antes)
1. En tu repositorio, haz clic en **"Settings"**
2. En el menú izquierdo busca **"Pages"**
3. En "Source" selecciona **"Deploy from a branch"**
4. Selecciona **"main"** y **"/ (root)"**
5. Clic en **"Save"**
6. Espera 2-3 minutos
7. Tu URL será: **`https://b.colindres.github.io/boda/`**

---

## 📧 PARTE 2 — CONFIGURAR AIRTABLE (libro de firmas)

El libro de firmas necesita Airtable para guardar los mensajes. Es gratis.

### Paso 1 — Crear cuenta
1. Ve a **airtable.com**
2. Inicia sesión con tu correo: **bryan300d@gmail.com**
3. O crea cuenta nueva si aún no tienes

### Paso 2 — Crear la base de datos
1. Haz clic en **"Add a base"** (o **"+ Add a base"**)
2. Ponle el nombre: **Boda Bryan & Stefany**
3. Entra a la base que creaste

### Paso 3 — Crear la tabla
1. La tabla que se crea por defecto se llama "Table 1" — renómbrala como **"Firmas"**
2. Crea estas columnas (haz clic en el **+** para agregar):
   - `Nombre` → tipo **Single line text**
   - `Mensaje` → tipo **Long text**
   - `Reaccion` → tipo **Single line text**
   - `Fecha` → tipo **Date** (activa "Include a time field")
3. Elimina las columnas que venían por defecto si no coinciden

### Paso 4 — Obtener el API Key
1. Haz clic en tu foto/avatar (arriba derecha) → **"Account"**
2. Busca **"API"** o ve a: **airtable.com/create/tokens**
3. Haz clic en **"Create new token"**
4. Dale un nombre: `boda-token`
5. En "Scopes" selecciona:
   - `data.records:read`
   - `data.records:write`
6. En "Access" agrega tu base **Boda Bryan & Stefany**
7. Haz clic en **"Create token"**
8. **COPIA el token** — solo aparece una vez (es muy largo, algo como `patXXXXXXXXXXXXXX`)

### Paso 5 — Obtener el Base ID
1. Entra a **airtable.com/api**
2. Selecciona tu base **Boda Bryan & Stefany**
3. En la página que abre, busca algo como: `The ID of this base is appXXXXXXXXXXXXXX`
4. Copia ese ID (empieza con `app`)

### Paso 6 — Actualizar config.js
1. Abre el archivo `js/config.js` con el Bloc de Notas
2. Busca esta sección:
```
airtable: {
  apiKey:  "TU_API_KEY_AQUI",
  baseId:  "TU_BASE_ID_AQUI",
  tableId: "Firmas"
},
```
3. Reemplaza `TU_API_KEY_AQUI` con tu token de Airtable
4. Reemplaza `TU_BASE_ID_AQUI` con tu Base ID
5. Guarda el archivo y súbelo a GitHub

---

## 💌 PARTE 3 — ENVIAR INVITACIONES PERSONALIZADAS

### Cómo usar el generador
1. Abre el archivo **`generador-invitaciones.html`** en tu navegador (doble clic)
2. Cambia la URL base por la tuya: `https://b.colindres.github.io/boda/`
3. En el cuadro grande escribe los nombres, uno por línea:
   ```
   María López
   Carlos y Ana Rodríguez
   Familia Hernández
   Jorge Mejía
   ```
4. Haz clic en **"Generar enlaces"**
5. Para cada invitado aparece un botón **"Abrir WhatsApp"**
6. Haz clic → se abre WhatsApp con el mensaje ya escrito
7. Solo toca Enviar

### ¿Cómo se ve la URL de cada invitado?
- María López → `tusite.github.io/boda/?i=maria-lopez`
- Carlos y Ana → `tusite.github.io/boda/?i=carlos-y-ana`
- Al abrir, aparece su nombre después del sobre

---

## ✏️ PARTE 4 — PANEL DE EDICIÓN PARA STEFANY

### Cómo abrir el panel:
1. Abre la invitación en el navegador
2. Llega hasta el final de la página
3. Haz clic **3 veces seguidas** en la **esquina inferior derecha** (la esquina misma, no botones)
4. Aparece el campo de contraseña
5. Escribe: **bodadanieljissel**
6. Se abre el panel de edición

### Qué puede cambiar Stefany:
- ✅ Nombres completos de los dos
- ✅ Fecha, hora, lugar y enlaces
- ✅ El versículo o frase bíblica
- ✅ Todas las tarjetas de instrucciones (vestimenta, horario, niños, etc.)
- ✅ Los textos de historia entre las fotos
- ✅ Los 10 eventos de la línea de tiempo (fechas, títulos, descripciones)
- ✅ El texto de confirmación
- ✅ La frase final del pie de página
- ✅ Los 6 colores de la paleta

### Para guardar los cambios permanentemente:
1. Hacer los cambios en el panel
2. Clic en **"✅ Aplicar cambios"** (los verá al instante en la página)
3. Clic en **"📥 Descargar config.js"**
4. Enviarle el archivo a Bryan
5. Bryan entra a GitHub, va a la carpeta `js/`, hace clic en `config.js`
6. Clic en el ícono de lápiz ✏️
7. Selecciona todo (Ctrl+A) y borra
8. Abre el config.js descargado con Bloc de Notas, copia todo (Ctrl+A, Ctrl+C)
9. Pégalo en GitHub (Ctrl+V)
10. Clic en **"Commit changes"**
11. En 1-2 minutos la invitación se actualiza en internet

---

## 📸 PARTE 5 — CAMBIAR FOTOS

### Para reemplazar una foto:
1. Entra a **github.com/B.colindres/boda**
2. Haz clic en la carpeta **`img/`**
3. Haz clic en **"Add file"** → **"Upload files"**
4. Sube la foto nueva con el **mismo nombre** que quieres reemplazar
5. GitHub la reemplaza automáticamente
6. Clic en **"Commit changes"**

### Si quieres cambiar el orden de las fotos:
Edita el `config.js` desde el panel de administración o directamente en GitHub, cambiando los nombres en la sección `fotos: { ... }`.

---

## 🔑 DATOS IMPORTANTES

| Dato | Valor |
|------|-------|
| URL de la invitación | `https://b.colindres.github.io/boda/` |
| Contraseña del panel | `bodadanieljissel` |
| WhatsApp confirmaciones | +504 3162-6792 |
| Correo Airtable | bryan300d@gmail.com |

---

## ❓ PREGUNTAS FRECUENTES

**¿La música funciona en todos los celulares?**
La música empieza sola cuando se abre el sobre. En algunos iPhones puede no iniciar automáticamente (restricción de Apple). El botón de música en la esquina inferior derecha siempre funciona.

**¿Qué pasa si alguien abre el enlace sin el nombre personalizado?**
Ve la invitación normalmente con el texto "Invitado Especial".

**¿El libro de firmas funciona sin Airtable?**
Sí, muestra mensajes de ejemplo. Para guardar mensajes reales necesitas configurar Airtable.

**¿Puedo agregar más eventos a la línea de tiempo?**
Sí, desde el panel de administración o editando la sección `timeline: [...]` en `config.js`.

**¿Puedo cambiar la contraseña del panel?**
Sí. En el archivo `js/admin.js` busca la línea:
`if (pass === 'bodadanieljissel')`
Y cambia `bodadanieljissel` por la contraseña que quieras.
