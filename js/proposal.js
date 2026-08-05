/*=========================================================
NOVA ENERGÍA
PROPOSAL.JS 2.0

Módulo encargado de:

✔ Recibir los datos del diagnóstico
✔ Mostrar el modal
✔ Construir la propuesta comercial
✔ Generar el PDF
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {
  console.log("📄 Proposal.js inicializado.");

  /*=====================================================
    ESTADO GENERAL
    =====================================================*/

  const proposal = {
    ready: false,

    dataLoaded: false,

    generated: false,
  };

  /*=====================================================
    OBJETO PRINCIPAL
    =====================================================*/

  const proposalData = {
    fecha: "",

    codigo: "",

    cliente: {},

    vivienda: {},

    sistema: {},

    presupuesto: {},

    beneficios: {},
  };

  /*=====================================================
    REFERENCIAS DEL DOM
    =====================================================*/

  const modal = document.getElementById("proposalModal");

  const form = document.getElementById("proposalForm");

  const btnOpen = document.getElementById("btnPDF");

  const btnClose = document.getElementById("btnCloseProposal");

  const btnCancel = document.getElementById("btnCancelProposal");

  const txtNombre = document.getElementById("clientName");

  const txtCorreo = document.getElementById("clientEmail");

  const txtTelefono = document.getElementById("clientPhone");

  const proposalHTML = document.getElementById("proposal");

  /*=====================================================
    UTILIDADES
    =====================================================*/

  function money(value) {
    return new Intl.NumberFormat(
      "es-CO",

      {
        style: "currency",

        currency: "COP",

        maximumFractionDigits: 0,
      },
    ).format(value);
  }

  function today() {
    return new Date().toLocaleDateString(
      "es-CO",

      {
        day: "2-digit",

        month: "long",

        year: "numeric",
      },
    );
  }

  function generateCode() {
    const d = new Date();

    return (
      "NOVA-" +
      d.getFullYear() +
      String(d.getMonth() + 1).padStart(2, "0") +
      String(d.getDate()).padStart(2, "0") +
      "-" +
      Math.floor(Math.random() * 900 + 100)
    );
  }

  proposalData.fecha = today();

  proposalData.codigo = generateCode();

  proposal.ready = true;

  console.log("✅ Proposal lista.");
  /*=====================================================
    CAPÍTULO 2
    MODAL MANAGER
    =====================================================*/

  /*=====================================================
    ABRIR MODAL
    =====================================================*/

  function openModal() {
    if (!modal) return;

    modal.classList.add("active");

    document.body.style.overflow = "hidden";

    if (txtNombre) {
      txtNombre.focus();
    }
  }

  /*=====================================================
    CERRAR MODAL
    =====================================================*/

  function closeModal() {
    if (!modal) return;

    modal.classList.remove("active");

    document.body.style.overflow = "";
  }

  /*=====================================================
    LIMPIAR FORMULARIO
    =====================================================*/

  function resetForm() {
    if (!form) return;

    form.reset();
  }

  /*=====================================================
    VALIDAR
    =====================================================*/

  function validateForm() {
    if (!txtNombre.value.trim()) {
      alert("Ingresa tu nombre.");

      txtNombre.focus();

      return false;
    }

    if (!txtCorreo.value.trim()) {
      alert("Ingresa tu correo electrónico.");

      txtCorreo.focus();

      return false;
    }

    if (!txtTelefono.value.trim()) {
      alert("Ingresa tu teléfono.");

      txtTelefono.focus();

      return false;
    }

    return true;
  }

  /*=====================================================
    GUARDAR CLIENTE
    =====================================================*/

  function saveClient() {
    proposalData.cliente = {
      nombre: txtNombre.value.trim(),

      correo: txtCorreo.value.trim(),

      telefono: txtTelefono.value.trim(),
    };
  }

  /*=====================================================
    EVENTOS
    =====================================================*/

  if (btnOpen) {
    btnOpen.addEventListener(
      "click",

      openModal,
    );
  }

  if (btnClose) {
    btnClose.addEventListener(
      "click",

      closeModal,
    );
  }

  if (btnCancel) {
    btnCancel.addEventListener(
      "click",

      closeModal,
    );
  }

  /*=====================================================
    CERRAR CON ESC
    =====================================================*/

  document.addEventListener(
    "keydown",

    (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    },
  );

  /*=====================================================
    CLICK FUERA
    =====================================================*/

  if (modal) {
    modal.addEventListener(
      "click",

      (e) => {
        if (e.target === modal) {
          closeModal();
        }
      },
    );
  }

  console.log("✅ Modal Manager listo.");
  /*=====================================================
    CAPÍTULO 3
    DATA MANAGER
    =====================================================*/

  /*=====================================================
    CARGAR INFORMACIÓN DEL DIAGNÓSTICO
    =====================================================*/

  function loadProposalData(data) {
    if (!data) {
      console.warn("No llegaron datos del diagnóstico.");

      return;
    }

    proposalData.fecha = data.fecha || proposalData.fecha;

    proposalData.codigo = data.codigo || proposalData.codigo;

    proposalData.vivienda = {
      ...data.vivienda,
    };

    proposalData.sistema = {
      ...data.sistema,
    };

    proposalData.presupuesto = {
      ...data.presupuesto,
    };

    proposalData.beneficios = {
      ...data.beneficios,
    };

    proposal.dataLoaded = true;

    console.log("📄 Información del diagnóstico recibida.");

    console.table(proposalData);
  }

  /*=====================================================
    DISPONIBLE PARA EL DIAGNÓSTICO
    =====================================================*/

  window.loadProposalData = loadProposalData;

  /*=====================================================
    VERIFICAR DATOS
    =====================================================*/

  function proposalReady() {
    return proposal.dataLoaded;
  }

  /*=====================================================
    MOSTRAR ERROR
    =====================================================*/

  function checkProposal() {
    if (!proposalReady()) {
      alert("Primero debes finalizar el diagnóstico.");

      return false;
    }

    return true;
  }

  /*=====================================================
    FORMULARIO
    =====================================================*/

  if (form) {
    form.addEventListener(
      "submit",

      async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        if (!checkProposal()) return;

        saveClient();

        console.log("Cliente guardado.");

        console.log(proposalData);

        /*
                    Capítulo 4

                    fillProposal();

                */
      },
    );
  }

  console.log("✅ Data Manager listo.");
  /*=====================================================
    CAPÍTULO 4
    TEMPLATE ENGINE
    =====================================================*/

  /*=====================================================
    ESCRIBIR TEXTO EN UN ELEMENTO
    =====================================================*/

  function setValue(id, value) {
    const element = document.getElementById(id);

    if (!element) return;

    element.textContent = value;
  }

  /*=====================================================
    FORMATO DE NÚMEROS
    =====================================================*/

  function number(value) {
    return new Intl.NumberFormat("es-CO").format(value);
  }

  /*=====================================================
    LLENAR PROPUESTA
    =====================================================*/

  function fillProposal() {
    /*==========================
        GENERALES
        ==========================*/

    setValue("pdfFecha", proposalData.fecha);

    setValue("pdfCodigo", proposalData.codigo);

    /*==========================
        CLIENTE
        ==========================*/

    setValue("pdfCliente", proposalData.cliente.nombre);

    setValue("pdfCorreo", proposalData.cliente.correo);

    setValue("pdfTelefono", proposalData.cliente.telefono);

    /*==========================
        VIVIENDA
        ==========================*/

    setValue("pdfCiudad", proposalData.vivienda.ciudad);

    setValue("pdfTipo", proposalData.vivienda.tipo);

    setValue(
      "pdfArea",

      proposalData.vivienda.area + " m²",
    );

    setValue(
      "pdfPisos",

      proposalData.vivienda.pisos,
    );

    setValue(
      "pdfHabitantes",

      proposalData.vivienda.habitantes,
    );

    setValue(
      "pdfFactura",

      money(proposalData.vivienda.factura),
    );

    setValue(
      "pdfConsumo",

      number(proposalData.vivienda.consumo) + " kWh",
    );

    setValue(
      "pdfObjetivo",

      proposalData.vivienda.objetivo,
    );

    /*==========================
        SISTEMA
        ==========================*/

    setValue(
      "pdfCategoria",

      proposalData.sistema.categoria,
    );

    setValue(
      "pdfDescripcion",

      proposalData.sistema.descripcion,
    );

    setValue(
      "pdfPaneles",

      proposalData.sistema.paneles,
    );

    setValue(
      "pdfModeloPanel",

      proposalData.sistema.panelModelo,
    );

    setValue(
      "pdfPotencia",

      proposalData.sistema.potencia,
    );

    setValue(
      "pdfInversor",

      proposalData.sistema.inversor,
    );

    setValue(
      "pdfProduccionMensual",

      number(proposalData.sistema.produccionMensual) + " kWh",
    );

    setValue(
      "pdfProduccionAnual",

      number(proposalData.sistema.produccionAnual) + " kWh",
    );

    /*==========================
        PRESUPUESTO
        ==========================*/

    setValue(
      "pdfPanelesValor",

      money(proposalData.presupuesto.paneles),
    );

    setValue(
      "pdfInversorValor",

      money(proposalData.presupuesto.inversor),
    );

    setValue(
      "pdfEstructuraValor",

      money(proposalData.presupuesto.estructura),
    );

    setValue(
      "pdfProteccionesValor",

      money(proposalData.presupuesto.protecciones),
    );

    setValue(
      "pdfCableadoValor",

      money(proposalData.presupuesto.cableado),
    );

    setValue(
      "pdfIngenieriaValor",

      money(proposalData.presupuesto.ingenieria),
    );

    setValue(
      "pdfInstalacionValor",

      money(proposalData.presupuesto.instalacion),
    );

    setValue(
      "pdfLegalizacionValor",

      money(proposalData.presupuesto.legalizacion),
    );

    setValue(
      "pdfTotal",

      money(proposalData.presupuesto.total),
    );

    /*==========================
        BENEFICIOS
        ==========================*/

    setValue(
      "pdfAhorroMensual",

      money(proposalData.beneficios.ahorroMensual),
    );

    setValue(
      "pdfAhorroAnual",

      money(proposalData.beneficios.ahorroAnual),
    );

    setValue(
      "pdfRetorno",

      proposalData.beneficios.retorno + " años",
    );

    setValue(
      "pdfCO2",

      number(proposalData.beneficios.co2) + " kg",
    );

    setValue(
      "pdfArboles",

      proposalData.beneficios.arboles + " árboles",
    );

    console.log("✅ Plantilla cargada correctamente.");
  }

  console.log("✅ Template Engine listo.");
  /*=====================================================
    CAPÍTULO 5
    GENERAR PDF
    =====================================================*/

  async function generatePDF() {
    if (!proposalHTML) {
      alert("No se encontró la plantilla de la propuesta.");

      return;
    }

    try {
      proposalHTML.style.display = "block";

      await new Promise((resolve) => setTimeout(resolve, 300));

      const canvas = await html2canvas(
        proposalHTML,

        {
          scale: 2,

          useCORS: true,

          backgroundColor: "#ffffff",

          scrollY: 0,
        },
      );

      const { jsPDF } = window.jspdf;

      const pdf = new jsPDF(
        "p",

        "mm",

        "a4",
      );

      const pageWidth = 210;

      const pageHeight = 297;

      const imgWidth = pageWidth;

      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;

      let position = 0;

      const imgData = canvas.toDataURL("image/png");

      pdf.addImage(
        imgData,

        "PNG",

        0,

        position,

        imgWidth,

        imgHeight,
      );

      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;

        pdf.addPage();

        pdf.addImage(
          imgData,

          "PNG",

          0,

          position,

          imgWidth,

          imgHeight,
        );

        heightLeft -= pageHeight;
      }

      let fileName = "Propuesta_NovaEnergia.pdf";

      if (proposalData.cliente.nombre) {
        fileName =
          "Propuesta_" +
          proposalData.cliente.nombre.replace(/\s+/g, "_") +
          ".pdf";
      }

      pdf.save(fileName);

      proposal.generated = true;

      console.log("✅ PDF generado correctamente.");
    } catch (error) {
      console.error(error);

      alert("Ocurrió un error al generar el PDF.");
    }
  }

  /*=====================================================
    SUBMIT DEL FORMULARIO
    =====================================================*/

  if (form) {
    form.addEventListener(
      "submit",

      async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        if (!checkProposal()) return;

        saveClient();

        fillProposal();

        closeModal();

        await generatePDF();

        resetForm();
      },
    );
  }

  console.log("🚀 Proposal.js 2.0 listo.");
}); // ===== FIN DEL DOMContentLoaded =====
