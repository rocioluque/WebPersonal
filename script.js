// Navegación suave y efectos de scroll
document.addEventListener("DOMContentLoaded", () => {
  // Elementos del DOM
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const skillBars = document.querySelectorAll(".skill-progress");
  const sections = document.querySelectorAll(".section");

  // Mostrar/ocultar navbar al hacer scroll
  let lastScrollTop = 0;
  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      navbar.classList.add("visible"); 
    } else {
      navbar.classList.remove("visible");
    }

    lastScrollTop = scrollTop;

    // Animar barras de habilidades cuando entren en viewport
    animateSkillBars();

    // Animar elementos al entrar en viewport
    animateOnScroll();

    // Actualizar enlace activo en navegación
    updateActiveNavLink();
  });

  // Navegación suave al hacer clic en enlaces
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Ajuste para navbar fijo
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Animar barras de habilidades
  function animateSkillBars() {
    skillBars.forEach((bar) => {
      const rect = bar.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible && !bar.classList.contains("animated")) {
        const width = bar.getAttribute("data-width");
        bar.style.width = width + "%";
        bar.classList.add("animated");
      }
    });
  }

  // Animar elementos al hacer scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll(
      ".experience-item, .project-card, .skill-category"
    );

    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight - 100;

      if (isVisible && !element.classList.contains("fade-in-up")) {
        element.classList.add("fade-in-up");
      }
    });
  }

  // Actualizar enlace activo en navegación
  function updateActiveNavLink() {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;

      if (
        window.pageYOffset >= sectionTop &&
        window.pageYOffset < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  }

  // Efecto de escritura para el título
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = "";

    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }

    type();
  }

  // Inicializar efecto de escritura para el nombre
  const nameElement = document.querySelector(".name");
  if (nameElement) {
    const originalText = nameElement.textContent;
    setTimeout(() => {
      typeWriter(nameElement, originalText, 150);
    }, 1000);
  }

  // Parallax suave para el header
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const header = document.querySelector(".header");
    const rate = scrolled * -0.5;

    if (header) {
      header.style.transform = `translateY(${rate}px)`;
    }
  });

  // Contador animado para estadísticas (si decides agregar)
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
      start += increment;
      element.textContent = Math.floor(start);

      if (start < target) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    }

    updateCounter();
  }

  // Lazy loading para imágenes
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));

  // Efecto de hover para las tarjetas de proyecto
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Validación y envío de formulario de contacto (si decides agregar uno)
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Modo oscuro toggle (opcional)
  function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem(
      "darkMode",
      document.body.classList.contains("dark-mode")
    );
  }

  // Cargar preferencia de modo oscuro
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }

  // Inicializar animaciones al cargar la página
  setTimeout(() => {
    animateSkillBars();
    animateOnScroll();
  }, 500);

  // Preloader (opcional)
  window.addEventListener("load", () => {
    const preloader = document.querySelector(".preloader");
    if (preloader) {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500);
    }
  });

  // Smooth reveal para elementos
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
      }
    });
  }, observerOptions);

  // Observar elementos para animación
  document
    .querySelectorAll(".experience-item, .project-card, .skill-category")
    .forEach((el) => {
      observer.observe(el);
    });
});

// Funciones utilitarias
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optimizar eventos de scroll
const optimizedScroll = debounce(() => {
  // Código de scroll optimizado aquí
}, 10);

window.addEventListener("scroll", optimizedScroll);

// Detectar dispositivo móvil
function isMobile() {
  return window.innerWidth <= 768;
}

// Ajustar comportamiento según dispositivo
if (isMobile()) {
  // Comportamientos específicos para móvil
  document.body.classList.add("mobile");
} else {
  document.body.classList.add("desktop");
}

// Manejar cambios de orientación
window.addEventListener("orientationchange", () => {
  setTimeout(() => {
    window.location.reload();
  }, 500);
});

// Performance monitoring
const perfObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.entryType === "measure") {
      console.log(`${entry.name}: ${entry.duration}ms`);
    }
  }
});

perfObserver.observe({ entryTypes: ["measure"] });

// Marcar inicio de carga
performance.mark("page-load-start");

window.addEventListener("load", () => {
  performance.mark("page-load-end");
  performance.measure("page-load-time", "page-load-start", "page-load-end");
});
