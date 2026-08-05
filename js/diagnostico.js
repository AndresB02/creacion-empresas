/*=========================================================
    NOVA ENERGÍA
    DIAGNÓSTICO SOLAR
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {
  /*=====================================================
        PANTALLAS
    =====================================================*/

  const screens = [...document.querySelectorAll(".nova-screen")];

  const progressBar = document.getElementById("novaProgressBar");

  const currentStep = document.getElementById("novaCurrentStep");

  const totalSteps = document.getElementById("novaTotalSteps");

  const btnStart = document.getElementById("novaStart");

  const TOTAL = 10;

  let current = 0;

  /*=====================================================
        RESPUESTAS
    =====================================================*/

  const answers = {
    tipoVivienda: "",

    ciudad: "",

    area: "",

    pisos: "",

    cubierta: "",

    estadoTecho: "",

    sombras: "",

    habitantes: "",

    factura: "",

    equipos: [],

    objetivo: "",
  };

  /*=====================================================
        MOSTRAR PANTALLA
    =====================================================*/

  function show(step) {
    screens.forEach((screen) => {
      screen.classList.remove("active");
    });

    const active = document.querySelector(`.nova-screen[data-step="${step}"]`);

    if (active) {
      active.classList.add("active");
    }

    current = step;

    updateProgress();
  }

  /*=====================================================
        PROGRESO
    =====================================================*/

  function updateProgress() {
    if (current === "loading") {
      progressBar.style.width = "100%";

      currentStep.textContent = "Analizando";

      return;
    }

    if (current === "result") {
      progressBar.style.width = "100%";

      currentStep.textContent = "Resultado";

      return;
    }

    const percent = (current / TOTAL) * 100;

    progressBar.style.width = percent + "%";

    currentStep.textContent = `Paso ${current}`;

    totalSteps.textContent = `de ${TOTAL}`;
  }

  /*=====================================================
        INICIO
    =====================================================*/

  btnStart.addEventListener("click", () => {
    show(1);
  });

  /*=====================================================
        BOTONES
    =====================================================*/

  document.addEventListener("click", (e) => {
    /*--------------------------
            SIGUIENTE
        --------------------------*/

    if (e.target.closest(".nova-next")) {
      if (!validate(current)) {
        alert("Debes responder esta pregunta.");

        return;
      }

      saveAnswers();

      if (current < TOTAL) {
        show(current + 1);
      } else {
        processDiagnosis();
      }
    }

    /*--------------------------
            ANTERIOR
        --------------------------*/

    if (e.target.closest(".nova-prev")) {
      if (current > 1) {
        show(current - 1);
      }
    }
  });

  /*=====================================================
        VALIDACIÓN
    =====================================================*/

  function validate(step) {
    switch (step) {
      case 1:
        return document.querySelector('input[name="tipoVivienda"]:checked');

      case 2:
        return document.getElementById("ciudad").value !== "";

      case 3:
        return document.querySelector('input[name="area"]:checked');

      case 4:
        return document.querySelector('input[name="pisos"]:checked');

      case 5:
        return document.querySelector('input[name="cubierta"]:checked');

      case 6:
        return document.querySelector('input[name="estadoTecho"]:checked');

      case 7:
        return document.querySelector('input[name="sombras"]:checked');

      case 8:
        return document.querySelector('input[name="habitantes"]:checked');

      case 9:
        return document.querySelector('input[name="factura"]:checked');

      case 10:
        return document.querySelector('input[name="objetivo"]:checked');

      default:
        return true;
    }
  }

  /*=====================================================
        GUARDAR RESPUESTAS
    =====================================================*/

  function saveAnswers() {
    answers.tipoVivienda =
      document.querySelector('input[name="tipoVivienda"]:checked')?.value || "";

    answers.ciudad = document.getElementById("ciudad").value;

    answers.area =
      document.querySelector('input[name="area"]:checked')?.value || "";

    answers.pisos =
      document.querySelector('input[name="pisos"]:checked')?.value || "";

    answers.cubierta =
      document.querySelector('input[name="cubierta"]:checked')?.value || "";

    answers.estadoTecho =
      document.querySelector('input[name="estadoTecho"]:checked')?.value || "";

    answers.sombras =
      document.querySelector('input[name="sombras"]:checked')?.value || "";

    answers.habitantes =
      document.querySelector('input[name="habitantes"]:checked')?.value || "";

    answers.factura =
      document.querySelector('input[name="factura"]:checked')?.value || "";

    answers.objetivo =
      document.querySelector('input[name="objetivo"]:checked')?.value || "";

    answers.equipos = [];

    document
      .querySelectorAll(".nova-check input:checked")

      .forEach((item) => {
        answers.equipos.push(item.value);
      });
  }

  /*=====================================================
        DEBUG
    =====================================================*/

  window.answersNova = answers;
  /*=========================================================
    PROCESAR DIAGNÓSTICO
=========================================================*/

  function processDiagnosis() {
    saveAnswers();

    show("loading");

    setTimeout(() => {
      const profile = buildProfile();

      window.novaProfile = profile;

      renderResults(profile);

      show("result");
    }, 2500);
  }

  /*=========================================================
    CONSTRUIR PERFIL
=========================================================*/

  function buildProfile() {
    const profile = {
      categoria: "",
      potencia: 0,
      paneles: 0,
      inversor: 0,
      produccion: 0,
      ahorro: 0,
      retorno: 0,
      descripcion: "",
      eficiencia: 1,
    };

    /*==========================================
        FACTURA
    ==========================================*/

    const factura = parseInt(answers.factura);

    if (factura <= 150000) {
      profile.categoria = "Residencial Básico";
      profile.paneles = 4;
      profile.potencia = 2.46;
      profile.inversor = 3;
    } else if (factura <= 300000) {
      profile.categoria = "Residencial Estándar";
      profile.paneles = 6;
      profile.potencia = 3.69;
      profile.inversor = 4;
    } else if (factura <= 500000) {
      profile.categoria = "Residencial Plus";
      profile.paneles = 8;
      profile.potencia = 4.92;
      profile.inversor = 5;
    } else if (factura <= 800000) {
      profile.categoria = "Residencial Premium";
      profile.paneles = 10;
      profile.potencia = 6.15;
      profile.inversor = 6;
    } else {
      profile.categoria = "Residencial Alto Consumo";
      profile.paneles = 14;
      profile.potencia = 8.61;
      profile.inversor = 8;
    }

    /*==========================================
        ÁREA CONSTRUIDA
    ==========================================*/

    switch (answers.area) {
      case "40-70":
        profile.potencia *= 0.9;
        break;

      case "70-120":
        profile.potencia *= 1;
        break;

      case "120-180":
        profile.potencia *= 1.05;
        break;

      case "180-250":
        profile.potencia *= 1.1;
        break;

      case "250-350":
        profile.potencia *= 1.15;
        break;

      case "350+":
        profile.potencia *= 1.25;
        break;
    }

    /*==========================================
        PISOS
    ==========================================*/

    switch (answers.pisos) {
      case "2":
        profile.potencia *= 1.03;
        break;

      case "3":
        profile.potencia *= 1.06;
        break;

      case "4+":
        profile.potencia *= 1.1;
        break;
    }

    /*==========================================
        HABITANTES
    ==========================================*/

    const personas = parseInt(answers.habitantes);

    if (personas >= 5) {
      profile.potencia *= 1.05;
    }

    if (personas >= 7) {
      profile.potencia *= 1.1;
    }

    /*==========================================
        SOMBRAS
    ==========================================*/

    if (answers.sombras === "parcial") {
      profile.eficiencia = 0.92;
    }

    if (answers.sombras === "si") {
      profile.eficiencia = 0.82;
    }

    /*==========================================
        RADIACIÓN SOLAR
    ==========================================*/

    const radiacion = {
      Bogotá: 4.3,
      Medellín: 4.8,
      Cali: 5.2,
      Barranquilla: 5.8,
      Cartagena: 5.8,
      "Santa Marta": 5.9,
      Bucaramanga: 5.1,
      Pereira: 4.8,
      Manizales: 4.7,
      Armenia: 4.8,
      Ibagué: 5.2,
      Villavicencio: 5.3,
      Neiva: 5.8,
      Cúcuta: 5.5,
      Montería: 5.6,
      Sincelejo: 5.5,
      Valledupar: 5.9,
    };

    const HSP = radiacion[answers.ciudad] || 5;

    profile.produccion = Math.round(
      profile.potencia * HSP * 30 * 0.8 * profile.eficiencia,
    );

    /*==========================================
        EQUIPOS ESPECIALES
    ==========================================*/

    if (answers.equipos.includes("aire")) profile.produccion += 180;

    if (answers.equipos.includes("carro")) profile.produccion += 260;

    if (answers.equipos.includes("jacuzzi")) profile.produccion += 150;

    if (answers.equipos.includes("piscina")) profile.produccion += 220;

    if (answers.equipos.includes("bomba")) profile.produccion += 90;

    if (answers.equipos.includes("calentador")) profile.produccion += 120;

    if (answers.equipos.includes("riego")) profile.produccion += 100;

    /*==========================================
        AHORRO
    ==========================================*/

    profile.ahorro = Math.round(factura * 0.88);

    profile.retorno = 8;

    if (factura > 500000) profile.retorno = 6;

    if (factura > 800000) profile.retorno = 5;

    /*==========================================
        DESCRIPCIÓN
    ==========================================*/

    profile.descripcion = `Con la información suministrada se recomienda un sistema ${profile.categoria}, optimizado para las condiciones de ${answers.ciudad}. La propuesta busca maximizar la generación de energía, reducir significativamente el costo mensual de electricidad y ofrecer un excelente retorno de inversión.`;

    return profile;
  } /*=========================================================
    CATÁLOGO DE PRECIOS NOVA ENERGÍA
=========================================================*/

  const CATALOGO = {
    panel615: 650000,

    inversor: {
      3: 2600000,

      4: 3200000,

      5: 3700000,

      6: 4100000,

      8: 5600000,
    },

    estructuraPanel: 125000,

    protecciones: 950000,

    cableado: 780000,

    ingenieria: 1300000,

    instalacionPanel: 240000,

    legalizacion: 950000,
  };

  /*=========================================================
    FORMATO MONEDA
=========================================================*/

  function money(valor) {
    return valor.toLocaleString("es-CO", {
      style: "currency",

      currency: "COP",

      maximumFractionDigits: 0,
    });
  }

  /*=========================================================
    CONSTRUIR PRESUPUESTO
=========================================================*/

  function buildBudget(profile) {
    const items = [];

    items.push({
      nombre: `${profile.paneles} Paneles 615W`,

      valor: profile.paneles * CATALOGO.panel615,
    });

    items.push({
      nombre: `Inversor On Grid ${profile.inversor} kW`,

      valor: CATALOGO.inversor[profile.inversor],
    });

    items.push({
      nombre: "Estructura Certificada",

      valor: profile.paneles * CATALOGO.estructuraPanel,
    });

    items.push({
      nombre: "Protecciones Eléctricas",

      valor: CATALOGO.protecciones,
    });

    items.push({
      nombre: "Cableado Fotovoltaico",

      valor: CATALOGO.cableado,
    });

    items.push({
      nombre: "Ingeniería",

      valor: CATALOGO.ingenieria,
    });

    items.push({
      nombre: "Instalación Especializada",

      valor: profile.paneles * CATALOGO.instalacionPanel,
    });

    items.push({
      nombre: "Legalización",

      valor: CATALOGO.legalizacion,
    });

    let total = 0;

    items.forEach((item) => {
      total += item.valor;
    });

    profile.presupuesto = total;

    return {
      items,

      total,
    };
  }

  /*=========================================================
    RENDER RESULTADOS
=========================================================*/

  function renderResults(profile) {
    const presupuesto = buildBudget(profile);

    /*----------------------------------
        PERFIL
    ----------------------------------*/

    document.getElementById("resultadoPerfil").textContent = profile.categoria;

    document.getElementById("resultadoDescripcion").textContent =
      profile.descripcion;

    /*----------------------------------
        RESUMEN
    ----------------------------------*/

    document.getElementById("resultadoSistema").textContent =
      `${profile.paneles} Paneles + Inversor ${profile.inversor}kW`;

    document.getElementById("resultadoPotencia").textContent =
      `${profile.potencia.toFixed(2)} kWp`;

    document.getElementById("resultadoProduccion").textContent =
      `${profile.produccion} kWh / mes`;

    document.getElementById("resultadoAhorro").textContent = money(
      profile.ahorro,
    );

    document.getElementById("resultadoRetorno").textContent =
      `${profile.retorno} años`;

    document.getElementById("resultadoTotal").textContent = money(
      profile.presupuesto,
    );

    /*----------------------------------
        IMPACTO AMBIENTAL
    ----------------------------------*/

    document.getElementById("resultadoCO2").textContent =
      `${Math.round(profile.produccion * 0.58)} kg/año`;

    document.getElementById("resultadoArboles").textContent =
      `${Math.round(profile.produccion / 120)} árboles`;

    /*----------------------------------
        PRESUPUESTO
    ----------------------------------*/

    const detalle = document.getElementById("detallePresupuesto");

    detalle.innerHTML = "";

    presupuesto.items.forEach((item) => {
      detalle.innerHTML += `

        <div class="nova-budget-row">

            <span>${item.nombre}</span>

            <strong>${money(item.valor)}</strong>

        </div>

        `;
    });

    /*=========================================================
CAPÍTULO D2.2
ENVIAR INFORMACIÓN A proposal.js
=========================================================*/

    if (window.loadProposalData) {
      window.loadProposalData({
        fecha: new Date().toLocaleDateString("es-CO"),

        codigo: "NOVA-" + Date.now(),

        cliente: {
          nombre: "",
          correo: "",
          telefono: "",
        },

        vivienda: {
          ciudad: answers.ciudad,

          tipo: answers.tipo,

          area: answers.area,

          pisos: answers.pisos,

          habitantes: answers.habitantes,

          factura: answers.factura,

          consumo: profile.produccion,

          objetivo: answers.objetivo,
        },

        sistema: {
          categoria: profile.categoria,

          descripcion: profile.descripcion,

          paneles: profile.paneles,

          panelModelo: "Panel Monocristalino 615W",

          potencia: profile.potencia.toFixed(2) + " kWp",

          inversor: profile.inversor + " kW",

          produccionMensual: profile.produccion,

          produccionAnual: profile.produccion * 12,
        },

        presupuesto: {
          paneles: presupuesto.items[0].valor,

          inversor: presupuesto.items[1].valor,

          estructura: presupuesto.items[2].valor,

          protecciones: presupuesto.items[3].valor,

          cableado: presupuesto.items[4].valor,

          ingenieria: presupuesto.items[5].valor,

          instalacion: presupuesto.items[6].valor,

          legalizacion: presupuesto.items[7].valor,

          total: presupuesto.total,
        },

        beneficios: {
          ahorroMensual: profile.ahorro,

          ahorroAnual: profile.ahorro * 12,

          retorno: profile.retorno,

          co2: Math.round(profile.produccion * 0.58),

          arboles: Math.round(profile.produccion / 120),
        },
      });
    }
  } /*=========================================================
    REINICIAR DIAGNÓSTICO
=========================================================*/

  function restartDiagnosis() {
    Object.keys(answers).forEach((key) => {
      if (Array.isArray(answers[key])) {
        answers[key] = [];
      } else {
        answers[key] = "";
      }
    });

    document.querySelectorAll("input").forEach((input) => {
      if (input.type === "radio" || input.type === "checkbox") {
        input.checked = false;
      }
    });

    const ciudad = document.getElementById("ciudad");

    if (ciudad) {
      ciudad.selectedIndex = 0;
    }

    const detalle = document.getElementById("detallePresupuesto");

    if (detalle) {
      detalle.innerHTML = "";
    }

    show(0);
  }

  /*=========================================================
    BOTÓN REINICIAR
=========================================================*/

  const restartBtn = document.getElementById("novaRestart");

  if (restartBtn) {
    restartBtn.addEventListener("click", restartDiagnosis);
  }

  /*=========================================================
    BOTÓN PDF
=========================================================*/



  /*=========================================================
    BOTÓN CONTACTAR ASESOR
=========================================================*/

  const asesorBtn = document.getElementById("btnAsesoria");

  if (asesorBtn) {
    asesorBtn.addEventListener("click", () => {
      document.querySelector("#contacto")?.scrollIntoView({
        behavior: "smooth",
      });
    });
  }

  /*=========================================================
    ATAJOS
=========================================================*/

  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const next = document.querySelector(".nova-screen.active .nova-next");

      if (next) {
        next.click();
      }
    }
  });

  /*=========================================================
    VARIABLES GLOBALES (DEBUG)
=========================================================*/

  window.novaAnswers = answers;

  window.novaRestart = restartDiagnosis;

  /*=========================================================
    PANTALLA INICIAL
=========================================================*/

  show(0);
}); // ← CIERRE DEFINITIVO DEL DOMContentLoaded
