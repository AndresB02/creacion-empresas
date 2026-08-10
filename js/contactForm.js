/* =========================================================
   NOVAENERGIA — LÓGICA FORMULARIO DE CONTACTO
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =======================================================
     ELEMENTOS
     ======================================================= */

  const formulario = document.getElementById("novaContactoForm");
  const agradecimiento = document.getElementById("novaContactoGracias");

  /* =======================================================
     COMPROBACIÓN
     ======================================================= */

  if (!formulario || !agradecimiento) {
    console.warn(
      "NovaEnergia: no se encontró el formulario o el mensaje de agradecimiento.",
    );

    return;
  }

  /* =======================================================
     TIEMPO DEL MENSAJE DE AGRADECIMIENTO
     ======================================================= */

  const TIEMPO_AGRADECIMIENTO = 5000;

  let temporizador = null;

  /* =======================================================
     MOSTRAR AGRADECIMIENTO
     ======================================================= */

  function mostrarAgradecimiento() {
    /* Ocultar formulario */

    formulario.style.display = "none";

    /* Mostrar agradecimiento */

    agradecimiento.style.display = "flex";

    agradecimiento.setAttribute("aria-hidden", "false");

    /* Llevar el foco al mensaje */

    agradecimiento.setAttribute("tabindex", "-1");
    agradecimiento.focus();

    /* Limpiar temporizador anterior */

    if (temporizador) {
      clearTimeout(temporizador);
    }

    /* =====================================================
       VOLVER AL FORMULARIO DESPUÉS DE UNOS SEGUNDOS
       ===================================================== */

    temporizador = setTimeout(() => {
      volverAlFormulario();
    }, TIEMPO_AGRADECIMIENTO);
  }

  /* =======================================================
     VOLVER AL FORMULARIO
     ======================================================= */

  function volverAlFormulario() {
    /* Ocultar agradecimiento */

    agradecimiento.style.display = "none";

    agradecimiento.setAttribute("aria-hidden", "true");

    /* Mostrar formulario */

    formulario.style.display = "";

    /* =====================================================
       REINICIAR FORMULARIO
       ===================================================== */

    formulario.reset();

    /* Limpiar campo oculto del ecosistema */

    const etapaEcosistema = document.getElementById("contactoEtapa");

    if (etapaEcosistema) {
      etapaEcosistema.value = "";
    }

    /* Limpiar mensaje de estado */

    const mensajeEstado = document.getElementById("novaContactoMessage");

    if (mensajeEstado) {
      mensajeEstado.textContent = "";
      mensajeEstado.className = "nova-contacto-message";
    }

    /* Llevar al usuario nuevamente al formulario */

    formulario.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  /* =======================================================
     ENVÍO DEL FORMULARIO
     ======================================================= */

  formulario.addEventListener("submit", (event) => {
    /* Evitar recarga de la página */

    event.preventDefault();

    /* =====================================================
       VALIDACIÓN NATIVA
       ===================================================== */

    if (!formulario.checkValidity()) {
      formulario.reportValidity();
      return;
    }

    /* =====================================================
       AQUÍ PODREMOS CONECTAR POSTERIORMENTE:
       - Backend
       - Base de datos
       - WhatsApp
       - Email
       - CRM
       
       Por ahora solamente mostramos confirmación.
       ===================================================== */

    mostrarAgradecimiento();
  });
});
