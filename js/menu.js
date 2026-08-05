/*====================================================
                MENU RESPONSIVE
            ====================================================*/

const menu = document.getElementById("navbarMenu");
const button = document.getElementById("menuToggle");

button.addEventListener("click", () => {
  menu.classList.toggle("active");
  button.textContent = menu.classList.contains("active") ? "✕" : "☰";
});
