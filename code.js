// ======================================
// DESPLEGAR MENÚS
// ======================================

function toggleMenu(id, elemento) {
  const submenu = document.getElementById(id);

  submenu.classList.toggle("active");

  elemento.classList.toggle("open");
}

// ======================================
// CARGAR CSS DINÁMICO
// ======================================

function cargarCSS(nombreCSS) {
  // eliminar css dinámicos anteriores

  document.querySelectorAll(".dynamic-css").forEach((css) => css.remove());

  if (!nombreCSS) return;

  const link = document.createElement("link");

  link.rel = "stylesheet";
  link.href = `css/${nombreCSS}`;
  link.classList.add("dynamic-css");

  document.head.appendChild(link);
}

// ======================================
// CARGAR PÁGINA
// ======================================

function cargarPagina(ruta, css = null, elemento = null) {
  fetch(ruta)
    .then((response) => {
      // Si el archivo no existe (error 404), lanzamos un error para ir al catch
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
      // Si hay error, cargamos la página de "proximamente"
      console.warn("Ruta no encontrada, cargando aviso...", error);
      fetch("pages/proximamente.html")
        .then((res) => res.text())
        .then((html) => {
          document.getElementById("contenido").innerHTML = html;
          // Cargamos un CSS genérico para el aviso si lo tienes
          cargarCSS("proximamente.css");
        });
    })
    .finally(() => {
      // Limpieza de clases activas
      document.querySelectorAll(".menu-link").forEach((link) => {
        link.classList.remove("active");
      });
      if (elemento) {
        elemento.classList.add("active");
      }
    });
}

// ======================================
// INICIO
// ======================================

document.addEventListener("DOMContentLoaded", () => {
  cargarPagina("pages/inicio.html", "inicio.css");
});

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
document.querySelectorAll(".factor-card").forEach((card) => {
  card.addEventListener("click", () => {
    card.querySelector(".card-inner").classList.toggle("is-flipped");
  });
});
