/*=========================================================
PROPOSAL.JS 3.0
Nova Energía

Gestor de propuestas comerciales
=========================================================*/

"use strict";

console.log("📄 Proposal.js 3.0 inicializado.");

/*=========================================================
CONFIGURACIÓN
=========================================================*/

const ProposalConfig = {
  templatePath: "propuesta.html",

  pdfFileName: "Propuesta_NovaEnergia.pdf",

  animationDuration: 300,
};

/*=========================================================
ESTADO GLOBAL
=========================================================*/

const ProposalState = {
  initialized: false,

  dataLoaded: false,

  templateLoaded: false,

  proposalData: null,

  templateElement: null,
};

/*=========================================================
REFERENCIAS DEL DOM
=========================================================*/

const ProposalDOM = {
  modal: null,

  form: null,

  btnOpen: null,

  btnClose: null,

  btnCancel: null,

  inputName: null,

  inputEmail: null,

  inputPhone: null,
};

console.log("✅ Configuración cargada.");
/*=========================================================
PROPOSAL MANAGER
=========================================================*/

class ProposalManager {
  constructor() {
    this.state = ProposalState;
    this.dom = ProposalDOM;
    this.config = ProposalConfig;
  }

  /*==========================================
    INICIALIZAR
    ==========================================*/

  init() {
    if (this.state.initialized) return;

    this.cacheDOM();

    this.bindEvents();

    this.state.initialized = true;

    console.log("✅ ProposalManager inicializado.");
  }

  /*==========================================
    CACHE DEL DOM
    ==========================================*/

  cacheDOM() {
    this.dom.modal = document.getElementById("proposalModal");

    this.dom.form = document.getElementById("proposalForm");

    this.dom.btnOpen =
      document.getElementById("btnOpenProposal") ||
      document.getElementById("btnPDF");

    this.dom.btnClose = document.getElementById("btnCloseProposal");

    this.dom.btnCancel = document.getElementById("btnCancelProposal");

    this.dom.inputName = document.getElementById("clientName");

    this.dom.inputEmail = document.getElementById("clientEmail");

    this.dom.inputPhone = document.getElementById("clientPhone");

    console.log("📦 DOM cacheado.");
  }

  /*==========================================
    EVENTOS
    ==========================================*/

  bindEvents() {
    console.log("🔗 Eventos registrados.");
  }
}

/*=========================================================
INSTANCIA ÚNICA
=========================================================*/

const proposalManager = new ProposalManager();
/*=========================================================
MODAL
=========================================================*/

ProposalManager.prototype.openModal = function () {
  if (!this.dom.modal) return;

  this.dom.modal.classList.add("active");

  document.body.style.overflow = "hidden";

  if (this.dom.inputName) {
    setTimeout(() => {
      this.dom.inputName.focus();
    }, 200);
  }
};

/*=========================================================
CERRAR MODAL
=========================================================*/

ProposalManager.prototype.closeModal = function () {
  if (!this.dom.modal) return;

  this.dom.modal.classList.remove("active");

  document.body.style.overflow = "";
};

/*=========================================================
EVENTOS
=========================================================*/

ProposalManager.prototype.bindEvents = function () {
  console.log("🔗 Eventos registrados.");

  /*--------------------------------------
    Abrir
    --------------------------------------*/

  if (this.dom.btnOpen) {
    this.dom.btnOpen.addEventListener(
      "click",

      () => {
        this.openModal();
      },
    );
  }

  /*--------------------------------------
    Botón X
    --------------------------------------*/

  if (this.dom.btnClose) {
    this.dom.btnClose.addEventListener(
      "click",

      () => {
        this.closeModal();
      },
    );
  }

  /*--------------------------------------
    Cancelar
    --------------------------------------*/

  if (this.dom.btnCancel) {
    this.dom.btnCancel.addEventListener(
      "click",

      () => {
        this.closeModal();
      },
    );
  }

  /*--------------------------------------
    Cerrar al hacer clic afuera
    --------------------------------------*/

  if (this.dom.modal) {
    this.dom.modal.addEventListener(
      "click",

      (e) => {
        if (e.target === this.dom.modal) {
          this.closeModal();
        }
      },
    );
  }
};

/*=========================================================
INICIALIZACIÓN
=========================================================*/

document.addEventListener(
  "DOMContentLoaded",

  () => {
    proposalManager.init();
  },
); /*=========================================================
RECEPCIÓN DE DATOS
=========================================================*/

ProposalManager.prototype.loadData = function (data) {
  if (!data) {
    console.warn("⚠ No se recibieron datos del diagnóstico.");

    return;
  }

  this.state.proposalData = structuredClone(data);

  this.state.dataLoaded = true;

  console.log("📊 Datos del diagnóstico recibidos.");

  console.table(this.state.proposalData);
};

/*=========================================================
VERIFICAR DISPONIBILIDAD
=========================================================*/

ProposalManager.prototype.hasData = function () {
  return this.state.dataLoaded;
};

/*=========================================================
ACCESO GLOBAL
=========================================================*/

window.loadProposalData = (data) => {
  proposalManager.loadData(data);
};
/*=========================================================
CARGAR PLANTILLA HTML
=========================================================*/

ProposalManager.prototype.loadTemplate = async function () {
  /*--------------------------------------
    Ya fue cargada
    --------------------------------------*/

  if (this.state.templateLoaded && this.state.templateElement) {
    return this.state.templateElement;
  }

  try {
    console.log("📥 Cargando propuesta.html...");

    const response = await fetch("propuesta.html");

    if (!response.ok) {
      throw new Error("No fue posible cargar propuesta.html");
    }

    const html = await response.text();

    /*--------------------------------------
        Crear contenedor oculto
        --------------------------------------*/

    const wrapper = document.createElement("div");

    wrapper.id = "proposalWrapper";

    wrapper.style.position = "absolute";
    wrapper.style.left = "-99999px";
    wrapper.style.top = "0";
    wrapper.style.width = "210mm";
    wrapper.style.background = "#ffffff";
    wrapper.style.zIndex = "-1";

    wrapper.innerHTML = html;

    document.body.appendChild(wrapper);

    /*--------------------------------------
        Buscar plantilla
        --------------------------------------*/

    const proposal = wrapper.querySelector("#proposal");

    if (!proposal) {
      throw new Error("La plantilla no contiene #proposal");
    }

    this.state.templateLoaded = true;

    this.state.templateElement = proposal;

    console.log("✅ Plantilla cargada correctamente.");

    return proposal;
  } catch (error) {
    console.error(error);

    alert("No fue posible cargar la plantilla de la propuesta.");

    return null;
  }
};

/*=========================================================
OBTENER PLANTILLA
=========================================================*/

ProposalManager.prototype.getTemplate = function () {
  return this.state.templateElement;
};
/*=========================================================
REEMPLAZAR TEXTO
=========================================================*/

ProposalManager.prototype.setText = function (selector, value) {
  const proposal = this.getTemplate();

  if (!proposal) return;

  const element = proposal.querySelector(selector);

  if (!element) {
    console.warn(`No existe el selector: ${selector}`);

    return;
  }

  element.textContent = value;
};

/*=========================================================
REEMPLAZAR HTML
=========================================================*/

ProposalManager.prototype.setHTML = function (selector, value) {
  const proposal = this.getTemplate();

  if (!proposal) return;

  const element = proposal.querySelector(selector);

  if (!element) return;

  element.innerHTML = value;
};

/*=========================================================
FORMATEAR MONEDA
=========================================================*/

ProposalManager.prototype.money = function (value) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
};

/*=========================================================
FORMATEAR NÚMERO
=========================================================*/

ProposalManager.prototype.number = function (value) {
  return new Intl.NumberFormat("es-CO").format(value);
};
/*=========================================================
LLENAR PLANTILLA
=========================================================*/

ProposalManager.prototype.fillTemplate = function (client) {
  const data = this.state.proposalData;

  if (!data) {
    console.warn("⚠ No existen datos del diagnóstico.");

    return;
  }

  /*=====================================================
    CLIENTE
    =====================================================*/

  this.setText("#pdfNombre", client.nombre);

  this.setText("#pdfFecha", data.cliente.fecha);

  this.setText("#pdfCodigo", data.cliente.codigo);

  /*=====================================================
    PERFIL VIVIENDA
    =====================================================*/

  this.setText("#pdfCiudad", data.vivienda.ciudad);

  this.setText("#pdfTipo", data.vivienda.tipo);

  this.setText("#pdfArea", data.vivienda.area);

  this.setText("#pdfPisos", data.vivienda.pisos);

  this.setText("#pdfHabitantes", data.vivienda.habitantes);

  /*=====================================================
    PERFIL ENERGÉTICO
    =====================================================*/

  this.setText("#pdfFactura", this.money(data.vivienda.factura));

  this.setText(
    "#pdfConsumo",
    `${this.number(data.sistema.produccion)} kWh/mes`,
  );

  this.setText("#pdfObjetivo", "Reducir el consumo de energía convencional.");

  /*=====================================================
    SISTEMA
    =====================================================*/

  this.setText("#pdfCategoria", data.sistema.categoria);

  this.setText("#pdfDescripcion", data.sistema.descripcion);

  this.setText("#pdfPaneles", data.sistema.paneles);

  this.setText("#pdfPotencia", `${data.sistema.potencia} kWp`);

  this.setText("#pdfInversor", `${data.sistema.inversor} kW`);

  this.setText(
    "#pdfProduccion",
    `${this.number(data.sistema.produccion)} kWh/mes`,
  );

  /*=====================================================
    DIAGRAMA
    =====================================================*/

  this.setText(
    "#pdfFlowPaneles",
    `${data.sistema.paneles} Paneles JA Solar 615W`,
  );

  this.setText("#pdfFlowInversor", `Inversor ${data.sistema.inversor} kW`);

  /*=====================================================
    RESUMEN TÉCNICO
    =====================================================*/

  this.setText("#pdfPotenciaTabla", `${data.sistema.potencia} kWp`);

  this.setText(
    "#pdfProduccionTabla",
    `${this.number(data.sistema.produccion)} kWh / mes`,
  );

  /*=====================================================
    PRESUPUESTO
    =====================================================*/

  this.setText("#pdfCantidadPaneles", data.sistema.paneles);

  this.setText("#pdfValorPaneles", this.money(data.presupuesto.paneles));

  this.setText("#pdfValorInversor", this.money(data.presupuesto.inversor));

  this.setText("#pdfValorEstructura", this.money(data.presupuesto.estructura));

  this.setText(
    "#pdfValorProtecciones",
    this.money(data.presupuesto.protecciones),
  );

  this.setText("#pdfValorCableado", this.money(data.presupuesto.cableado));

  this.setText("#pdfValorIngenieria", this.money(data.presupuesto.ingenieria));

  this.setText(
    "#pdfValorInstalacion",
    this.money(data.presupuesto.instalacion),
  );

  this.setText(
    "#pdfValorLegalizacion",
    this.money(data.presupuesto.legalizacion),
  );

  this.setText("#pdfTotal", this.money(data.presupuesto.total));

  /*=====================================================
    BENEFICIOS
    =====================================================*/

  this.setText("#pdfAhorroMensual", this.money(data.beneficios.ahorroMensual));

  this.setText("#pdfAhorroAnual", this.money(data.beneficios.ahorroAnual));

  this.setText("#pdfRetorno", `${data.beneficios.retorno} años`);

  this.setText(
    "#pdfProduccionAnual",
    `${this.number(data.sistema.produccion * 12)} kWh`,
  );

  this.setText("#pdfCO2", `${this.number(data.beneficios.co2)} kg`);

  this.setText("#pdfArboles", `${data.beneficios.arboles} árboles`);

  console.log("✅ Propuesta rellenada correctamente.");
};
/*=========================================================
GENERAR PDF
=========================================================*/

ProposalManager.prototype.generatePDF = async function (client) {
  try {
    /*==========================================
        Cargar plantilla
        ==========================================*/

    const proposal = await this.loadTemplate();

    if (!proposal) return;

    /*==========================================
        Llenar datos
        ==========================================*/

    this.fillTemplate(client);

    console.log("🖨 Generando PDF...");

    await new Promise((resolve) => setTimeout(resolve, 300));

    /*==========================================
        Crear PDF
        ==========================================*/

    const pdf = new jspdf.jsPDF({
      orientation: "portrait",

      unit: "mm",

      format: "a4",
    });

    const pageWidth = 210;

    let firstPage = true;

    /*==========================================
        Capturar cada sección
        ==========================================*/

    const sections = proposal.querySelectorAll("section");

    for (const section of sections) {
      const canvas = await html2canvas(section, {
        scale: 2,

        useCORS: true,

        backgroundColor: "#ffffff",

        scrollX: 0,

        scrollY: 0,
      });

      const imgData = canvas.toDataURL("image/png");

      const imgWidth = pageWidth;

      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (!firstPage) {
        pdf.addPage();
      }

      pdf.addImage(
        imgData,

        "PNG",

        0,

        0,

        imgWidth,

        imgHeight,
      );

      firstPage = false;
    }

    /*==========================================
        Guardar PDF
        ==========================================*/

    const safeName = client.nombre
      .trim()
      .replace(/\s+/g, "_")
      .replace(/[^\w]/g, "");

    pdf.save(`Propuesta_NovaEnergia_${safeName}.pdf`);

    console.log("✅ PDF generado correctamente.");
  } catch (error) {
    console.error(error);

    alert("No fue posible generar la propuesta.");
  }
};
/*=========================================================
FORMULARIO
=========================================================*/

ProposalManager.prototype.getClientData = function () {
  return {
    nombre: this.dom.inputName.value.trim(),

    correo: this.dom.inputEmail.value.trim(),

    telefono: this.dom.inputPhone.value.trim(),
  };
};

/*=========================================================
VALIDACIÓN
=========================================================*/

ProposalManager.prototype.validateClient = function (client) {
  if (!client.nombre) {
    alert("Ingresa el nombre del cliente.");

    this.dom.inputName.focus();

    return false;
  }

  if (!client.correo) {
    alert("Ingresa un correo electrónico.");

    this.dom.inputEmail.focus();

    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(client.correo)) {
    alert("El correo electrónico no es válido.");

    this.dom.inputEmail.focus();

    return false;
  }

  if (!client.telefono) {
    alert("Ingresa un número de teléfono.");

    this.dom.inputPhone.focus();

    return false;
  }

  return true;
};

/*=========================================================
LIMPIAR FORMULARIO
=========================================================*/

ProposalManager.prototype.resetForm = function () {
  if (this.dom.form) {
    this.dom.form.reset();
  }
};

/*=========================================================
EVENTO SUBMIT
=========================================================*/

ProposalManager.prototype.bindForm = function () {
  if (!this.dom.form) return;

  this.dom.form.addEventListener(
    "submit",

    async (e) => {
      e.preventDefault();

      if (!this.hasData()) {
        alert("Primero debes finalizar el diagnóstico.");

        return;
      }

      const client = this.getClientData();

      if (!this.validateClient(client)) {
        return;
      }

      await this.generatePDF(client);

      this.closeModal();

      this.resetForm();
    },
  );
};

/*=========================================================
AMPLIAR INIT
=========================================================*/

const originalInit = ProposalManager.prototype.init;

ProposalManager.prototype.init = function () {
  originalInit.call(this);

  this.bindForm();

  console.log("✅ Proposal.js 3.0 listo.");
};
