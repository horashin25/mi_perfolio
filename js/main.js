// ===== Configuración: cambia estos datos por los tuyos =====
const CONFIG = { email: "tuemail@ejemplo.com" };

// ===== Proyectos realizados =====
const PROJECTS = [
  { title: "Control de acceso con QR", drive: "", shots: ["img/control-qr-1.png", "img/control-qr-2.png"], cat: "Escritorio", tags: ["Python", "Tkinter", "Excel"], icon: "fa-qrcode", color: "blue",
    desc: "Sistema de escritorio para controlar el ingreso a eventos: verifica invitados leyendo códigos QR con la cámara contra una lista en Excel.",
    features: ["Lectura de QR con cámara y verificación contra Excel", "Generador de QR o códigos de barras sobre imagen de fondo", "Envío automático del QR por Gmail a cada invitado", "Generador de licencias firmadas para vender el sistema"] },
  { title: "Verificador QR", drive: "https://drive.google.com/drive/folders/10-jEm74QnzgqsvdrPa_aL3dlXASSwTQA?usp=sharing", store: "", shots: ["img/verificador-qr-1.png", "img/verificador-qr-2.png"], cat: "Móvil", tags: ["Kotlin", "Android"], icon: "fa-mobile-screen-button", color: "orange",
    desc: "App Android que escanea códigos QR o de barras y verifica el ID contra una base cargada desde Excel.",
    features: ["Escaneo de QR y códigos de barras", "Base de datos cargada desde Excel", "Conexión de varios celulares por red WiFi local", "Control de acceso con licencia", "Descargalo en APK, y pruébalo !!!"] },
  { title: "Sistema de formulación química", drive: "", shots: ["img/quimica-1.png", "img/quimica-2.png"], cat: "Educación", tags: ["Python", "Tkinter", "SQLite"], icon: "fa-flask", color: "purple",
    desc: "Herramienta educativa para formular y nombrar compuestos inorgánicos, con juegos para practicar.",
    features: ["Óxidos, hidruros, hidróxidos, ácidos y sales", "Nomenclatura tradicional, Stock y sistemática", "Iones y ecuaciones con balanceo automático", "Juegos, retos y modo estudiante con puntaje"] },
  { title: "Calculadora trigonométrica", drive: "https://drive.google.com/file/d/1aQUjLl7uqkP4VmS5yNkzFdcMKrgiQwcn/view?usp=sharing", shots: ["img/trigonometria-1.png", "img/trigonometria-2.png"], cat: "Educación", tags: ["Python", "Tkinter"], icon: "fa-square-root-variable", color: "green",
    desc: "Programa con interfaz gráfica que calcula ángulos del triángulo rectángulo y dibuja el triángulo con sus medidas.",
    features: ["Cálculo de ángulos con seno, coseno y tangente", "Dibujo del triángulo según sus medidas reales", "Selección del ángulo a analizar","Descargalo ya !!!"] },
  { title: "Punto de venta Corralón FLIA", drive: "", shots: ["img/corralon-1.png", "img/corralon-2.png"], cat: "Escritorio", tags: ["Python", "Tkinter"], icon: "fa-cash-register", color: "teal",
    desc: "Sistema de punto de venta para un corralón, con interfaz adaptable al tamaño de la pantalla.",
    features: ["Inicio de sesión y administración", "Ventas, inventario con tarjetas de productos y clientes", "Facturas y datos del negocio"] },
  { title: "Preguntas en vivo", drive: "", shots: ["img/preguntas-1.png", "img/preguntas-2.png"], cat: "Web", tags: ["Flask", "Socket.IO", "Tkinter"], icon: "fa-circle-question", color: "pink",
    desc: "Sistema de preguntas y respuestas en tiempo real: el administrador controla la sala desde escritorio y los jugadores responden desde el navegador.",
    features: ["Panel de administrador de escritorio con login", "Vista web para jugadores en tiempo real", "Cupo de jugadores y cronómetro por pregunta", "Puntajes y resultados finales"] }
];

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// Botones de descarga: aparecen solo si el proyecto tiene enlace (drive, apk o store)
const dlButtons = (p, cls) => [
  p.drive && `<a class="${cls}" href="${esc(p.drive)}" target="_blank" rel="noopener"><i class="fa-brands fa-google-drive me-1"></i> Descargar app (Drive)</a>`,
  p.apk && `<a class="${cls}" href="${esc(p.apk)}" download><i class="fa-solid fa-download me-1"></i> Descargar APK</a>`
].filter(Boolean).join("");

document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);
  if ($("year")) $("year").textContent = new Date().getFullYear();
  if (window.AOS) AOS.init({ duration: 650, once: true, offset: 70, easing: "ease-out-cubic" });

  // Menú móvil: se cierra al elegir una sección
  document.querySelectorAll("#navLinks .nav-link, #navLinks .btn").forEach((link) => {
    link.addEventListener("click", () => {
      const menu = $("navLinks");
      if (menu && menu.classList.contains("show") && window.bootstrap) bootstrap.Collapse.getOrCreateInstance(menu).hide();
    });
  });

  // Tarjetas de proyectos
  const grid = $("projectGrid");
  const modalEl = $("projectModal");
  const modal = window.bootstrap && modalEl ? new bootstrap.Modal(modalEl) : null;
  const openProject = (p) => {
    $("pmTitle").textContent = p.title;
    $("pmDesc").textContent = p.desc;
    $("pmVisual").className = "project-visual visual-" + p.color;
    $("pmIcon").className = "fa-solid " + p.icon;
    $("pmTags").innerHTML = [p.cat, ...p.tags].map((t) => `<span>${esc(t)}</span>`).join("");
    $("pmShots").innerHTML = (p.shots || []).map((s) => `<img src="${esc(s)}" alt="Captura de ${esc(p.title)}" loading="lazy" onerror="this.remove()">`).join("");
    $("pmList").innerHTML = p.features.map((f) => `<li>${esc(f)}</li>`).join("");
    const acts = [];
    if (p.drive || p.apk) acts.push(dlButtons(p, "btn btn-primary"));
    if (p.store) acts.push(`<a class="btn btn-outline-primary" href="${esc(p.store)}" target="_blank" rel="noopener">Ver en Uptodown <i class="fa-solid fa-arrow-up-right-from-square ms-1"></i></a>`);
    $("pmActions").innerHTML = acts.join("") + ((p.drive || p.apk) && p.cat === "Móvil" ? `<p class="form-note w-100 mb-0">Para instalarla, Android puede pedir que permitas instalar apps de fuentes desconocidas.</p>` : "");
    if (modal) modal.show();
  };
  if (grid) {
    grid.innerHTML = PROJECTS.map((p, i) => `
      <div class="col-md-6 col-lg-4 project-item" data-cat="${esc(p.cat)}">
        <article class="project-card h-100" tabindex="0" role="button" data-i="${i}" aria-label="Ver detalles de ${esc(p.title)}">
          <div class="project-visual visual-${p.color}"><i class="fa-solid ${p.icon}"></i>${p.shots && p.shots[0] ? `<img class="cover" src="${esc(p.shots[0])}" alt="" loading="lazy" onerror="this.remove()">` : ""}<span>${esc(p.cat.toUpperCase())}</span></div>
          <div class="project-body">
            <div class="project-tags">${p.tags.map((t) => `<span>${esc(t)}</span>`).join("")}</div>
            <h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p>
            <span class="project-link">Ver detalles <i class="fa-solid fa-arrow-right ms-1"></i></span>
            ${p.drive || p.apk ? `<div class="d-flex flex-wrap gap-2 mt-3">${dlButtons(p, "btn btn-primary btn-sm")}</div>` : ""}
          </div>
        </article>
      </div>`).join("");
    grid.addEventListener("click", (e) => { if (e.target.closest("a")) return; const c = e.target.closest(".project-card"); if (c) openProject(PROJECTS[c.dataset.i]); });
    grid.addEventListener("keydown", (e) => {
      if (e.target.closest("a") || (e.key !== "Enter" && e.key !== " ")) return;
      const c = e.target.closest(".project-card");
      if (c) { e.preventDefault(); openProject(PROJECTS[c.dataset.i]); }
    });

    // Filtros por categoría
    const bar = $("filterBar");
    const cats = ["Todos", ...new Set(PROJECTS.map((p) => p.cat))];
    bar.innerHTML = cats.map((c, i) => `<button type="button" class="filter-btn${i ? "" : " active"}" data-cat="${esc(c)}">${esc(c)}</button>`).join("");
    bar.addEventListener("click", (e) => {
      const b = e.target.closest(".filter-btn");
      if (!b) return;
      bar.querySelectorAll(".filter-btn").forEach((x) => x.classList.toggle("active", x === b));
      grid.querySelectorAll(".project-item").forEach((it) => { it.hidden = b.dataset.cat !== "Todos" && it.dataset.cat !== b.dataset.cat; });
    });
  }

  // Formulario: abre un borrador en el correo del visitante
  const form = $("contactForm");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = $("name").value.trim(), email = $("email").value.trim(), message = $("message").value.trim();
      const subject = encodeURIComponent(`Consulta desde el portafolio de ${name}`);
      const body = encodeURIComponent(`Nombre: ${name}\nCorreo: ${email}\n\nMensaje:\n${message}`);
      window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
    });
  }
});
