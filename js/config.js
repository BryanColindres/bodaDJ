// ═══════════════════════════════════════════════════════
//  CONFIG.JS — Boda Bryan & Stefany — v2 PREMIUM
// ═══════════════════════════════════════════════════════
window.BODA_CONFIG = {
  novio:  { nombre: "Bryan Daniel",   apellidos: "Colindres Mejia"  },
  novia:  { nombre: "Stefany Jissel", apellidos: "Herrera Flores"   },
  evento: {
    fecha:      "2026-10-03T11:00:00",
    fechaTexto: "Sábado, 03 de octubre de 2026",
    hora:       "11:00 AM",
    lugar:      "Valletal Eventos",
    mapsUrl:    "https://maps.app.goo.gl/5VHu6E56MUNGPrey8?g_st=ac",
    wazeUrl:    "https://waze.com/ul?ll=14.129855588419803,-87.03454760434946&navigate=yes",
    coordenadas:{ lat: 14.129855588419803, lng: -87.03454760434946 }
  },
  whatsapp: {
    numero:  "50431626792",
    mensaje: "Hola {nombre}, confirmamos tu asistencia a la boda de Bryan y Stefany el 03 de octubre de 2026."
  },
  versiculo: {
    texto: "El amor es paciente, es bondadoso. El amor no es envidioso ni jactancioso ni orgulloso.",
    cita:  "1 Corintios 13:4"
  },
  timeline: [
    { fecha:"2020",          titulo:"Nos conocimos",          texto:"Una tarde que ninguno de los dos olvidará. Algo especial comenzó sin que lo planeáramos.",               icono:"✨" },
    { fecha:"2020",          titulo:"Primera conversación",   texto:"Horas hablando sin darnos cuenta. Supimos que había algo diferente en el otro.",                         icono:"💬" },
    { fecha:"2021",          titulo:"Primera cita",           texto:"Los nervios, las risas y la magia de estar juntos por primera vez a solas.",                             icono:"🌹" },
    { fecha:"2021",          titulo:"Nuestro primer viaje",   texto:"Descubrimos que viajar juntos era lo más natural del mundo.",                                            icono:"✈️" },
    { fecha:"2022",          titulo:"Nos hicimos novios",     texto:"El día que lo hicimos oficial. Comenzó una nueva etapa llena de amor.",                                  icono:"💑" },
    { fecha:"2022",          titulo:"Nuestras familias",      texto:"Dos familias que se unieron y que hoy forman una sola.",                                                 icono:"👨‍👩‍👧‍👦" },
    { fecha:"2023",          titulo:"Momentos difíciles",     texto:"Aprendimos que juntos somos más fuertes. Cada obstáculo nos acercó más.",                                icono:"🤝" },
    { fecha:"2024",          titulo:"La propuesta",           texto:"El momento en que todo cambió. La respuesta fue un sí que venía del corazón.",                           icono:"💍" },
    { fecha:"2025",          titulo:"Nuestra preboda",        texto:"Un día de fotos, risas y amor. La antesala del momento más especial.",                                   icono:"📸" },
    { fecha:"03 · 10 · 2026",titulo:"Nos casamos",            texto:"El día que prometemos amarnos, respetarnos y acompañarnos para siempre.",                               icono:"⛪" }
  ],
  instrucciones: [
    { icono:"⏰", titulo:"Hora de llegada",      texto:"Te pedimos llegar 30 minutos antes de la ceremonia para que puedas ubicarte con comodidad." },
    { icono:"👗", titulo:"Código de vestimenta", texto:"Etiqueta formal. Evita el blanco y el negro puro. Preferimos tonos cálidos y elegantes."   },
    { icono:"🚫", titulo:"Solo adultos",         texto:"Este es un evento solo para adultos. Agradecemos tu comprensión."                           },
    { icono:"📱", titulo:"Confirmación",          texto:"Confírmanos tu asistencia antes del 01 de septiembre de 2026."                             }
  ],
  historiaTextos: [
    "Desde el primer momento supimos que algo especial comenzaba. Cada día juntos ha sido un regalo que atesoramos profundamente.",
    "Compartimos sueños, risas y caminos. Hoy queremos que seas parte del día más importante de nuestras vidas.",
    "Porque el amor verdadero no es perfecto, es real. Y el nuestro ha crecido día a día, paso a paso, juntos."
  ],
  rsvp:   { descripcion: "Nos encantaría contar con tu presencia. Por favor confírmanos antes del 01 de septiembre de 2026." },
  footer: { frase: "Con amor, los esperamos." },
  hero:   { pre: "Nos casamos" },
  airtable: { apiKey: "TU_API_KEY_AQUI", baseId: "TU_BASE_ID_AQUI", tableId: "Firmas" },
  fotos: {
    hero:"img/hero.jpg", verso:"img/preboda1.png", evento:"img/preboda2.jpg",
    historia1:"img/preboda3.jpg", historia2:"img/preboda4.jpg", historia3:"img/preboda5.JPG",
    galeria:["img/preboda6.JPG","img/preboda7.JPG","img/preboda2.jpg","img/preboda3.jpg","img/preboda4.jpg","img/preboda5.JPG"],
    rsvp:"img/preboda12.JPG", footer:"img/footer.JPG"
  },
  audio:  { musica:"audio/musica.mp3", mensajeVoz:"audio/mensaje.mp3" },
  colores:{ roseProfundo:"#9B6B6B", roseMedio:"#C4907A", roseSuave:"#D4A99A", blush:"#EDD5C5", crema:"#F7EFE8", dorado:"#C9A84C" }
};
