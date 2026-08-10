/*====================================================
                MENU RESPONSIVE
            ====================================================*/

const menu = document.getElementById("navbarMenu");
const button = document.getElementById("menuToggle");

button.addEventListener("click", () => {
  menu.classList.toggle("active");
  button.textContent = menu.classList.contains("active") ? "✕" : "☰";
});

/* =========================================================
   MODAL ECOSISTEMA NOVAENERGIA
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =======================================================
     ELEMENTOS DEL MODAL
  ======================================================= */

  const ecosistemaModal = document.getElementById("ecosistemaModal");

  const ecosistemaModalOverlay = document.getElementById(
    "ecosistemaModalOverlay",
  );

  const ecosistemaModalClose = document.getElementById("ecosistemaModalClose");

  const ecosistemaModalNumber = document.getElementById(
    "ecosistemaModalNumber",
  );

  const ecosistemaModalTitle = document.getElementById("ecosistemaModalTitle");

  const ecosistemaModalDescription = document.getElementById(
    "ecosistemaModalDescription",
  );

  const ecosistemaModalActions = document.getElementById(
    "ecosistemaModalActions",
  );

  const ecosistemaModalBenefits = document.getElementById(
    "ecosistemaModalBenefits",
  );

  const ecosistemaModalCTA = document.getElementById("ecosistemaModalCTA");

  /* =======================================================
     DATOS DE LAS 7 ETAPAS
  ======================================================= */

  const ecosistemaData = [
    {
      number: "01",

      title: "Diagnóstico Energético",

      description:
        "Analizamos el comportamiento energético de tu vivienda para identificar oportunidades de ahorro y definir la estrategia adecuada para tu proyecto.",

      actions: [
        "Analizamos el consumo energético de la vivienda.",
        "Identificamos los principales equipos y hábitos de consumo.",
        "Evaluamos oportunidades de generación y ahorro.",
        "Establecemos las variables técnicas iniciales del proyecto.",
      ],

      benefits: [
        "Mayor claridad sobre tu consumo energético.",
        "Identificación de oportunidades de ahorro.",
        "Base técnica para diseñar una solución personalizada.",
        "Decisiones basadas en información real.",
      ],
    },

    {
      number: "02",

      title: "Diseño de la Solución",

      description:
        "Diseñamos una solución energética personalizada integrando generación solar, almacenamiento y tecnologías inteligentes según las necesidades de cada vivienda.",

      actions: [
        "Dimensionamos el sistema solar.",
        "Evaluamos las necesidades de almacenamiento energético.",
        "Definimos los componentes principales del sistema.",
        "Diseñamos la arquitectura energética del proyecto.",
      ],

      benefits: [
        "Una solución adaptada a tu vivienda.",
        "Mejor aprovechamiento del recurso solar.",
        "Sistema preparado para futuras necesidades.",
        "Integración de diferentes tecnologías energéticas.",
      ],
    },

    {
      number: "03",

      title: "Implementación",

      description:
        "Llevamos el diseño a la realidad mediante una instalación profesional enfocada en seguridad, calidad y correcto funcionamiento del sistema.",

      actions: [
        "Instalamos los equipos y componentes.",
        "Realizamos las conexiones eléctricas necesarias.",
        "Configuramos los sistemas de control.",
        "Realizamos pruebas de funcionamiento.",
      ],

      benefits: [
        "Instalación profesional.",
        "Mayor seguridad del sistema.",
        "Equipos correctamente configurados.",
        "Puesta en funcionamiento controlada.",
      ],
    },

    {
      number: "04",

      title: "Monitoreo Inteligente",

      description:
        "Supervisamos el comportamiento energético mediante herramientas digitales que permiten visualizar la producción, el consumo y el rendimiento del sistema.",

      actions: [
        "Monitorizamos la producción energética.",
        "Visualizamos el consumo de la vivienda.",
        "Seguimos el rendimiento del sistema.",
        "Detectamos posibles comportamientos anómalos.",
      ],

      benefits: [
        "Información energética en tiempo real.",
        "Mayor control sobre el sistema.",
        "Detección temprana de posibles problemas.",
        "Información para tomar mejores decisiones.",
      ],
    },

    {
      number: "05",

      title: "Optimización Continua",

      description:
        "Analizamos el comportamiento del sistema para identificar oportunidades de mejora y mantener el rendimiento energético en el tiempo.",

      actions: [
        "Analizamos indicadores de rendimiento.",
        "Revisamos el comportamiento energético.",
        "Identificamos oportunidades de optimización.",
        "Proponemos mejoras cuando sean necesarias.",
      ],

      benefits: [
        "Mejor aprovechamiento de la energía.",
        "Rendimiento más consistente.",
        "Identificación de oportunidades de mejora.",
        "Sistema preparado para evolucionar.",
      ],
    },

    {
      number: "06",

      title: "Mantenimiento",

      description:
        "Acompañamos el sistema durante su vida útil mediante mantenimiento preventivo y soporte para mantener su disponibilidad y rendimiento.",

      actions: [
        "Realizamos revisiones periódicas.",
        "Detectamos posibles fallas o desgastes.",
        "Ejecutamos mantenimiento preventivo.",
        "Atendemos necesidades de soporte técnico.",
      ],

      benefits: [
        "Mayor disponibilidad del sistema.",
        "Prevención de fallas.",
        "Mayor vida útil de los componentes.",
        "Acompañamiento técnico continuo.",
      ],
    },

    {
      number: "07",

      title: "Escalabilidad",

      description:
        "El ecosistema NovaEnergia está diseñado para crecer junto con tu hogar, permitiendo incorporar nuevas tecnologías y capacidades cuando sean necesarias.",

      actions: [
        "Evaluamos nuevas necesidades energéticas.",
        "Analizamos posibilidades de ampliación.",
        "Integramos nuevas tecnologías cuando aporten valor.",
        "Adaptamos la solución a la evolución del proyecto.",
      ],

      benefits: [
        "Sistema preparado para crecer.",
        "Mayor flexibilidad a futuro.",
        "Incorporación progresiva de nuevas tecnologías.",
        "Inversión preparada para futuras necesidades.",
      ],
    },
  ];

  /* =======================================================
     ABRIR MODAL
  ======================================================= */

  function openEcosistemaModal(index) {
    const data = ecosistemaData[index];

    if (!data) {
      return;
    }

    /* Número */

    ecosistemaModalNumber.textContent = data.number;

    /* Título */

    ecosistemaModalTitle.textContent = data.title;

    /* Descripción */

    ecosistemaModalDescription.textContent = data.description;

    /* =====================================================
       LISTA ¿QUÉ HACEMOS?
    ===================================================== */

    ecosistemaModalActions.innerHTML = "";

    data.actions.forEach((action) => {
      const li = document.createElement("li");

      li.textContent = action;

      ecosistemaModalActions.appendChild(li);
    });

    /* =====================================================
       LISTA ¿QUÉ OBTIENES?
    ===================================================== */

    ecosistemaModalBenefits.innerHTML = "";

    data.benefits.forEach((benefit) => {
      const li = document.createElement("li");

      li.textContent = benefit;

      ecosistemaModalBenefits.appendChild(li);
    });

    /* =====================================================
       CTA
    ===================================================== */

    ecosistemaModalCTA.href = "#contacto";

    /* =====================================================
       MOSTRAR MODAL
    ===================================================== */

    ecosistemaModal.classList.add("active");

    document.body.classList.add("ecosistema-modal-open");
  }

  /* =======================================================
     CERRAR MODAL
  ======================================================= */

  function closeEcosistemaModal() {
    ecosistemaModal.classList.remove("active");

    document.body.classList.remove("ecosistema-modal-open");
  }

  /* =======================================================
     BOTONES "CONOCER ETAPA"
  ======================================================= */

  const ecosistemaButtons = document.querySelectorAll(".ecosistema-content a");

  ecosistemaButtons.forEach((button, index) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      openEcosistemaModal(index);
    });
  });

  /* =======================================================
     CERRAR CON X
  ======================================================= */

  if (ecosistemaModalClose) {
    ecosistemaModalClose.addEventListener("click", closeEcosistemaModal);
  }
  if (ecosistemaModalCTA) {
    ecosistemaModalCTA.addEventListener("click", () => {
      const etapa = ecosistemaModalCTA.dataset.etapa;

      closeEcosistemaModal();

      setTimeout(() => {
        const contacto = document.getElementById("contacto");

        if (contacto) {
          contacto.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }

        const etapaInput = document.getElementById("contactoEtapa");

        if (etapaInput && etapa) {
          etapaInput.value = etapa;
        }
      }, 200);
    });
  }

  /* =======================================================
     CERRAR HACIENDO CLICK EN EL FONDO
  ======================================================= */

  if (ecosistemaModalOverlay) {
    ecosistemaModalOverlay.addEventListener("click", closeEcosistemaModal);
  }

  /* =======================================================
     CERRAR CON ESC
  ======================================================= */

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      ecosistemaModal.classList.contains("active")
    ) {
      closeEcosistemaModal();
    }
  });

  /* =======================================================
     EVITAR SCROLL DE LA PÁGINA
     MIENTRAS EL MODAL ESTÁ ABIERTO
  ======================================================= */

  const style = document.createElement("style");

  style.textContent = `
    body.ecosistema-modal-open {
      overflow: hidden;
    }
  `;

  document.head.appendChild(style);
});
