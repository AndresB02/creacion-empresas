// ======================================
// DESPLEGAR MENÚS ANIDADOS
// ======================================

function toggleMenu(id, elemento) {
  const submenu = document.getElementById(id);

  if (!submenu) return;

  const padre = submenu.parentElement.parentElement;

  // Cerrar únicamente los hermanos
  padre
    .querySelectorAll(":scope > .menu-item > .submenu.active")
    .forEach((item) => {
      if (item !== submenu) {
        item.classList.remove("active");

        const header = item.previousElementSibling;

        if (header) {
          header.classList.remove("open");
        }
      }
    });

  submenu.classList.toggle("active");
  elemento.classList.toggle("open");
}

// ======================================
// CARGAR CSS DINÁMICO
// ======================================

function cargarCSS(rutaCSS) {
  document.querySelectorAll(".dynamic-css").forEach((css) => css.remove());

  if (!rutaCSS) return;

  const link = document.createElement("link");

  link.rel = "stylesheet";
  link.href = rutaCSS;
  link.classList.add("dynamic-css");

  document.head.appendChild(link);
}

// ======================================
// CARGAR PÁGINA
// ======================================

function cargarPagina(ruta, css = null, elemento = null) {
  fetch(ruta)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Página no encontrada");
      }

      return response.text();
    })
    .then((html) => {
      document.getElementById("contenido").innerHTML = html;

      if (css) {
        cargarCSS(css);
      }

      document.querySelectorAll(".menu-link").forEach((link) => {
        link.classList.remove("active");
      });

      if (elemento) {
        elemento.classList.add("active");
      }
    })
    .catch((error) => {
      console.warn("Ruta no encontrada, cargando aviso...", error);

      fetch("pages/proximamente.html")
        .then((res) => res.text())
        .then((html) => {
          document.getElementById("contenido").innerHTML = html;

          cargarCSS("css/proximamente.css");
        });
    })
    .finally(() => {
      document.querySelectorAll(".menu-link").forEach((link) => {
        link.classList.remove("active");
      });

      if (elemento) {
        elemento.classList.add("active");
      }
    });
}

// ======================================
// CARGA INICIAL
// ======================================

document.addEventListener("DOMContentLoaded", () => {
  cargarPagina("pages/inicio.html", "css/inicio.css");
});

// ======================================
// ACORDEONES
// ODS + HALLAZGOS + PESTEL
// ======================================

document.addEventListener("click", (e) => {
  const header = e.target.closest(
    ".desafio-header, .hallazgo-header, .pestel-header, .producto-header",
  );

  if (!header) return;

  const item = header.parentElement;

  const contenedor = item.parentElement;

  const estabaAbierto = item.classList.contains("active");

  contenedor.querySelectorAll(".active").forEach((el) => {
    el.classList.remove("active");
  });

  if (!estabaAbierto) {
    item.classList.add("active");
  }
});

// ======================================
// MAPA DE EMPATÍA
// FLIP CARDS
// ======================================

document.addEventListener("click", (e) => {
  const card = e.target.closest(".empatia-card");

  if (!card) return;

  const inner = card.querySelector(".card-inner");

  document.querySelectorAll(".empatia-card .card-inner").forEach((item) => {
    if (item !== inner) {
      item.classList.remove("is-flipped");
    }
  });

  inner.classList.toggle("is-flipped");
});
// ======================================
// ESTRATEGIA AIDA (B2C) — MODAL DINÁMICO
// ======================================

const aidaData = {
  atencion: {
    step: "A — Atención (Tu Escudo Energético)",
    title: "Independencia Total frente al Alza de Tarifas",
    img: "/assets/atencion-nova.jpg",
    usePlaceholder: false,
    placeholderText: "",
    text: `
        <p><strong>¿Sabías que el costo de tu energía tradicional depende de que llueva todos los días?</strong></p>
        <p>En Colombia, la alta dependencia de las centrales hidroeléctricas hace que nuestra red eléctrica sea vulnerable frente al clima. De acuerdo con los reportes oficiales de <strong>XM</strong> (el operador del sistema energético nacional), cuando las sequías golpean al país, los <strong>caudales afluentes que alimentan los embalses caen a apenas el 53.9% de su promedio histórico</strong>.</p>
        <p>Puedes auditar y verificar este comportamiento hídrico diario en tiempo real ingresando directamente al portal oficial de <a href="https://sinergox.xm.com.co/hdrlg/Paginas/Informes/DetalleAportesHidricos.aspx" target="_blank" rel="noopener" style="color: #2563eb; text-decoration: underline; font-weight: 700;">XM Sinergox</a>. Como consecuencia de este estrés en la demanda, las tarifas de energía convencional se disparan de forma descontrolada, afectando directamente las finanzas de tu hogar.</p>
        <p><strong>NovaEnergia es tu escudo definitivo:</strong></p>
        <ul>
          <li><strong>Autonomía en tu hogar:</strong> Convertimos la radiación solar en electricidad limpia y constante, protegiendo tu bolsillo de la inestabilidad de la red nacional y de las alzas tarifarias.</li>
          <li><strong>Ecosistema solar inteligente:</strong> No instalamos simples paneles; integramos tecnología avanzada de almacenamiento BESS y monitoreo digital en tiempo real para que seas el único dueño de tu consumo.</li>
        </ul>
      `,
    actionText: "Saber más",
    actionLink:
      "https://creacion-empresas-uno.netlify.app/pages/prototipo/landingpage",
  },
  interes: {
    step: "I — Interés (Educación y Adaptabilidad)",
    title: "Tecnología que se adapta a tu Realidad",
    img: "/assets/interes-nova.jpg",
    usePlaceholder: false,
    placeholderText: "",
    text: `
        <p><strong>La energía solar no es compleja cuando cuentas con la pedagogía correcta.</strong></p>
        <p>Sabemos que la tecnología fotovoltaica es un tema nuevo en el país y que existen dudas sobre su funcionamiento en el día a día. Por eso, nos enfocamos en demostrarte con total transparencia cómo el sol y el almacenamiento inteligente en baterías se convierten en tu mejor respaldo.</p>
        <p><strong>Una solución diseñada para tu tipo de vivienda:</strong></p>
        <ul>
          <li><strong>Casas y Fincas Campestres:</strong> Aprovecha al máximo el área de tu cubierta unifamiliar para generar e inyectar energía limpia, reduciendo tu dependencia de la red tradicional desde el primer día.</li>
          <li><strong>Edificios de Apartamentos:</strong> ¿Vives en propiedad horizontal? Te enseñamos cómo optimizar áreas comunes y terrazas bajo la normativa vigente de copropiedades, haciendo que la transición energética sea una realidad viable y legal para ti y tus vecinos.</li>
        </ul>
      `,
    actionText: "Realizar Diagnóstico",
    actionLink:
      "https://creacion-empresas-uno.netlify.app/pages/prototipo/landingpage#diagnostico",
  },
  deseo: {
    step: "D — Deseo (Seguridad Financiera y Legal)",
    title: "Tranquilidad a Largo Plazo y Beneficios de Ley",
    img: "/assets/deseo-nova.jpg",
    usePlaceholder: false,
    placeholderText: "",
    text: `
        <p><strong>Olvídate del miedo a la inversión inicial. Tu sistema solar se paga solo.</strong></p>
        <p>Mitigamos el impacto del costo de instalación demostrándote la rentabilidad real de un activo que revaloriza tu propiedad y te genera retornos financieros inmediatos.</p>
        <p><strong>¿Por qué NovaEnergia es la decisión de inversión más inteligente?</strong></p>
        <ul>
          <li><strong>Beneficios Tributarios Nacionales:</strong> Tu proyecto aplica a importantes incentivos fiscales para energías limpias en Colombia (exenciones de IVA, deducciones de renta y aranceles preferenciales), reduciendo drásticamente el tiempo de retorno de tu inversión.</li>
          <li><strong>Acompañamiento Integral de Principio a Fin:</strong> Nosotros nos encargamos de todo. Desde el diseño de ingeniería especializada y la instalación técnica con equipos premium (paneles monocristalinos de 615W), hasta los complejos trámites de legalización ante el operador de red.</li>
          <li><strong>Garantía y Cobertura Jurídica:</strong> Duerme tranquilo con contratos transparentes y una sólida cobertura regulada de hasta 25 años en la vida útil de tus paneles solares.</li>
        </ul>
      `,
    actionText: "Solicitar asesoría",
    actionLink:
      "https://creacion-empresas-uno.netlify.app/pages/prototipo/landingpage#contacto",
  },
  accion: {
    step: "A — Acción (Acompañamiento Experto)",
    title: "Tu Propuesta de Ingeniería al Instante",
    img: "/assets/accion-nova.jpg",
    usePlaceholder: false,
    placeholderText: "",
    text: `
        <p><strong>El camino hacia tu independencia energética requiere el respaldo de un equipo experto.</strong></p>
        <p>Para tomar una decisión inteligente no necesitas presiones ni procesos complejos; requieres una <strong>buena y transparente asesoría profesional</strong> que te guíe en cada etapa técnica y legal.</p>
        <p><strong>Cómo dar el primer paso hoy mismo de forma gratuita:</strong></p>
        <ul>
          <li><strong>Descarga tu Propuesta Personalizada en PDF:</strong> Al finalizar tu autodiagnóstico, haz clic en "Descargar propuesta". Al ingresar tus datos de contacto básicos en el formulario rápido, el sistema vinculará automáticamente toda la información técnica de tu vivienda calculada previamente por el simulador.</li>
          <li><strong>Asesoría Consultiva Premium:</strong> Con este reporte listo, nuestro equipo de ingenieros diseñará un estudio de viabilidad personalizado sin costo alguno, brindándote la asesoría hiper-especializada que mereces para concretar tu proyecto con total seguridad.</li>
        </ul>
      `,
    actionText: "Simula tu inversión",
    actionLink:
      "https://creacion-empresas-uno.netlify.app/pages/prototipo/landingpage#diagnostico",
  },
};

// Función auxiliar para cerrar el modal de forma segura
function cerrarAidaModal() {
  const modal = document.getElementById("aidaModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

// Escuchador de eventos global (Delegación de eventos sobre document)
document.addEventListener("click", (e) => {
  // 1. ABRIR MODAL AL HACER CLIC EN CUALQUIER BOTÓN CON CLASE .btn-aida
  const btnAida = e.target.closest(".btn-aida");
  if (btnAida) {
    const sectionKey = btnAida.getAttribute("data-aida");
    const data = aidaData[sectionKey];

    const modal = document.getElementById("aidaModal");
    const modalImg = document.getElementById("modalFlyerImg");
    const modalPlaceholder = document.getElementById("modalFlyerPlaceholder");
    const modalStep = document.getElementById("modalStep");
    const modalTitle = document.getElementById("modalTitle");
    const modalText = document.getElementById("modalText");
    const modalActionBtn = document.getElementById("modalActionBtn");

    if (data && modal) {
      // Manejar el renderizado de la imagen vs. el placeholder
      if (data.usePlaceholder) {
        if (modalImg) modalImg.style.display = "none";
        if (modalPlaceholder) {
          modalPlaceholder.style.display = "flex";
          modalPlaceholder.textContent = data.placeholderText;
        }
      } else {
        if (modalPlaceholder) modalPlaceholder.style.display = "none";
        if (modalImg) {
          modalImg.style.display = "block";
          modalImg.src = data.img;
          modalImg.alt = data.title;
        }
      }

      // Inyectar el contenido dinámico en el modal
      if (modalStep) modalStep.textContent = data.step;
      if (modalTitle) modalTitle.textContent = data.title;
      if (modalText) modalText.innerHTML = data.text;
      if (modalActionBtn) {
        modalActionBtn.textContent = data.actionText;
        modalActionBtn.href = data.actionLink;
      }

      // Mostrar el modal y bloquear el scroll del fondo
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
    return;
  }

  // 2. CERRAR MODAL (Si se hace clic en la 'X' o en el overlay oscuro)
  if (
    e.target.closest("#closeAidaModal") ||
    e.target.classList.contains("aida-modal-overlay")
  ) {
    cerrarAidaModal();
  }
});

// Cerrar el modal al presionar la tecla ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    cerrarAidaModal();
  }
});
