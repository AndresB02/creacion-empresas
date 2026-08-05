/*====================================================
                WHY NOVAENERGIA
            ====================================================*/

const whyData = [
  {
    number: "01",
    title: "Ingeniería Especializada",
    description:
      "Cada proyecto comienza con un estudio técnico que permite diseñar soluciones energéticas personalizadas según las necesidades de cada cliente.",

    button: "Hablar con un ingeniero →",

    image: "/assets/porquenova/Nova_1.jpg",
  },

  {
    number: "02",

    title: "Ecosistema Integral",

    description:
      "Integramos generación solar, almacenamiento energético, monitoreo y gestión inteligente en un solo ecosistema tecnológico.",

    button: "Conocer el ecosistema →",

    image: "/assets/porquenova/Nova_2.jpg",
  },

  {
    number: "03",

    title: "Tecnología Inteligente",

    description:
      "Utilizamos plataformas digitales para supervisar, analizar y optimizar el comportamiento energético en tiempo real.",

    button: "Ver tecnología →",

    image: "/assets/porquenova/Nova_3.jpg",
  },

  {
    number: "04",

    title: "Monitoreo Continuo",

    description:
      "Nuestros sistemas permiten visualizar indicadores, consumos y rendimiento desde cualquier lugar.",

    button: "Explorar monitoreo →",

    image: "/assets/porquenova/Nova_4.jpg",
  },

  {
    number: "05",

    title: "Escalabilidad",

    description:
      "Cada solución está preparada para crecer junto con las necesidades energéticas de la empresa.",

    button: "Ver crecimiento →",

    image: "/assets/porquenova/Nova_5.jpg",
  },

  {
    number: "06",

    title: "Acompañamiento Permanente",

    description:
      "Desde el diagnóstico inicial hasta el mantenimiento, acompañamos cada etapa del proyecto energético.",

    button: "Contactar asesor →",

    image: "/assets/porquenova/Nova_6.jpg",
  },
];

const whyCards = document.querySelectorAll(".why-card");

const whyImage = document.getElementById("whyImage");

const whyNumber = document.getElementById("whyNumber");

const whyTitle = document.getElementById("whyTitle");

const whyDescription = document.getElementById("whyDescription");

const whyButton = document.getElementById("whyButton");

whyCards.forEach((card, index) => {
  card.addEventListener("click", () => {
    whyCards.forEach((c) => c.classList.remove("active"));

    card.classList.add("active");

    whyImage.classList.add("animating");

    whyTitle.style.opacity = 0;

    whyDescription.style.opacity = 0;

    whyNumber.style.opacity = 0;

    setTimeout(() => {
      whyImage.src = whyData[index].image;

      whyNumber.textContent = whyData[index].number;

      whyTitle.textContent = whyData[index].title;

      whyDescription.textContent = whyData[index].description;

      whyButton.textContent = whyData[index].button;
      whyImage.classList.remove("animating");

      whyTitle.style.opacity = 1;

      whyDescription.style.opacity = 1;

      whyNumber.style.opacity = 1;
    }, 250);
  });
});
