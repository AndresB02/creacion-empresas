/*==================================================
                SERVICIOS HOGAR
            ==================================================*/

const servicios = {
  solar: {
    badge: "Sistema Solar",

    titulo: "Sistema Solar Fotovoltaico",

    descripcion:
      "Diseñamos e instalamos sistemas solares personalizados para que tu hogar produzca su propia energía, reduzca el consumo proveniente de la red eléctrica y aproveche al máximo el recurso solar.",

    incluye: [
      "Ingeniería especializada",

      "Paneles solares Tier 1",

      "Inversor inteligente",

      "Estructura certificada",

      "Instalación profesional",

      "Puesta en marcha",
    ],

    beneficios: [
      "Reduce tu factura de energía",

      "Mayor independencia energética",

      "Incrementa el valor del inmueble",

      "Generación limpia y sostenible",
    ],
  },

  bess: {
    badge: "Almacenamiento",

    titulo: "Respaldo Energético BESS",

    descripcion:
      "Los sistemas BESS almacenan la energía producida durante el día para utilizarla durante la noche o cuando se presenten cortes del suministro eléctrico.",

    incluye: [
      "Baterías inteligentes",

      "Sistema de respaldo",

      "Protecciones eléctricas",

      "Configuración personalizada",

      "Puesta en marcha",
    ],

    beneficios: [
      "Respaldo ante apagones",

      "Mayor autonomía energética",

      "Mejor aprovechamiento de la energía solar",

      "Protección frente a variaciones de la red",
    ],
  },

  monitor: {
    badge: "Monitoreo",

    titulo: "Monitoreo Inteligente",

    descripcion:
      "Consulta en tiempo real la producción, consumo y desempeño de tu sistema desde cualquier dispositivo mediante plataformas inteligentes.",

    incluye: [
      "Aplicación móvil",

      "Portal web",

      "Alertas automáticas",

      "Histórico energético",
    ],

    beneficios: [
      "Control total del sistema",

      "Información en tiempo real",

      "Detección temprana de fallas",

      "Mayor eficiencia energética",
    ],
  },

  maintenance: {
    badge: "Mantenimiento",

    titulo: "Acompañamiento y Mantenimiento",

    descripcion:
      "Nuestro equipo realiza mantenimiento preventivo y correctivo para garantizar que el sistema opere siempre con el máximo rendimiento.",

    incluye: [
      "Mantenimiento preventivo",

      "Mantenimiento correctivo",

      "Soporte técnico",

      "Optimización del sistema",
    ],

    beneficios: [
      "Mayor vida útil",

      "Máximo rendimiento",

      "Respaldo especializado",

      "Menor riesgo de fallas",
    ],
  },
};

/*==================================================
                ELEMENTOS
            ==================================================*/

const modal = document.getElementById("hogarModal");

const overlay = modal.querySelector(".hogar-modal-overlay");

const closeBtn = modal.querySelector(".hogar-close");

const modalBadge = document.getElementById("modalBadge");

const modalTitle = document.getElementById("modalTitle");

const modalDescription = document.getElementById("modalDescription");

const modalIncludes = document.getElementById("modalIncludes");

const modalBenefits = document.getElementById("modalBenefits");

/*==================================================
                ABRIR MODAL
            ==================================================*/

document.querySelectorAll(".hogar-card").forEach((card) => {
  card.querySelector(".hogar-btn").addEventListener("click", () => {
    const service = servicios[card.dataset.service];

    if (!service) return;

    modalBadge.textContent = service.badge;

    modalTitle.textContent = service.titulo;

    modalDescription.textContent = service.descripcion;

    modalIncludes.innerHTML = "";

    service.incluye.forEach((item) => {
      modalIncludes.innerHTML += `<li>${item}</li>`;
    });

    modalBenefits.innerHTML = "";

    service.beneficios.forEach((item) => {
      modalBenefits.innerHTML += `<li>${item}</li>`;
    });

    modal.classList.add("active");

    document.body.style.overflow = "hidden";
  });
});

/*==================================================
                CERRAR
            ==================================================*/

function cerrarModal() {
  modal.classList.remove("active");

  document.body.style.overflow = "";
}

closeBtn.addEventListener("click", cerrarModal);

overlay.addEventListener("click", cerrarModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    cerrarModal();
  }
});
