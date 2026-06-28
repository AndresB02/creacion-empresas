// ======================================
// DESPLEGAR MENÚS
// ======================================

function toggleMenu(id, elemento) {
  const submenuActual = document.getElementById(id);
  const estabaAbierto = submenuActual.classList.contains("active");

  // Cerrar todos los submenús
  document.querySelectorAll(".submenu").forEach((submenu) => {
    submenu.classList.remove("active");
  });

  // Quitar flechas abiertas
  document.querySelectorAll(".menu-toggle").forEach((toggle) => {
    toggle.classList.remove("open");
  });

  // Si estaba cerrado, abrir únicamente este
  if (!estabaAbierto) {
    submenuActual.classList.add("active");
    elemento.classList.add("open");
  }
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
    ".desafio-header, .hallazgo-header, .pestel-header",
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
