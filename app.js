// app.js — versión segura para todas las páginas
(() => {
  // Evita ejecutar 2 veces si el script se inyecta más de una vez
  if (window.__ANA_APP_INIT__) return;
  window.__ANA_APP_INIT__ = true;

  // ----- Utilidades -----
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // Año en footer (si existe)
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ----- Navbar shrink + parallax (solo si hay navbar) -----
  const nav = $('.navbar'); // puede ser null en páginas internas
  const onScroll = () => {
    if (nav) {
      if (window.scrollY > 16) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    }
    // parallax sutil en blobs del hero (si existen)
    const parallaxEls = $$('.hero-float');
    if (parallaxEls.length) {
      const offset = window.scrollY * 0.02;
      parallaxEls.forEach((el, i) => {
        el.style.transform =
          `translateY(${Math.sin(offset + i) * 8}px) translateX(${Math.cos(offset + i) * 6}px)`;
      });
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ----- Reveal on scroll (no rompe si no hay .reveal) -----
  const revealEls = $$('.reveal');
  if (revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });
    revealEls.forEach((el) => io.observe(el));
  }

  // ----- i18n (compartido entre páginas) -----
  // Usa un único diccionario global para todas las páginas
  if (!window.dict) {
    window.dict = {
      es: {
        brand: "AnaXrdonez",
        "nav.about": "Sobre Mí",
        "nav.projects": "Proyectos",
        "nav.contact": "Contacto",
        "hero.title": "AnaXrdonez",
        "hero.subtitle": "Conoce mis proyectos y habilidades",
        "hero.cta": "Ver proyectos",
        "about.title": "Sobre Mí",
        "about.body": "Soy <strong>Ana Ordóñez Gragera</strong>, tengo <strong>23 años</strong> y he completado el grado en <strong>Diseño y Desarrollo de Videojuegos</strong> en la Universidad Rey Juan Carlos. Actualmente estoy cursando un <strong>Máster en Inteligencia Artificial</strong> en la Universidad Politécnica de Madrid. Mi interés principal se centra en el desarrollo de <strong>soluciones basadas en inteligencia artificial</strong>, la experimentación con modelos y la creación de herramientas utilizando <strong>Python</strong>. Disfruto combinando programación, creatividad y resolución de problemas para construir proyectos que van desde <strong>videojuegos y prototipos interactivos</strong> hasta aplicaciones y sistemas experimentales de inteligencia artificial. Me interesa especialmente explorar áreas como <strong>machine learning, procesamiento de datos y desarrollo de aplicaciones inteligentes</strong>, aplicando la programación y el pensamiento computacional para crear soluciones innovadoras.",        "projects.title": "Proyectos Destacados",
        "projects.items.blr.title": "Big Little Ranch",
        "projects.items.blr.desc": "Clicker ilustrado e implementado en Adobe Animate.",
        "projects.items.lucian.title": "Lucian",
        "projects.items.lucian.desc": "Aventura gráfica con modelado y animación en Blender y Unity.",
        "projects.items.ttt.title": "Tiny Troops Tactics",
        "projects.items.ttt.desc": "Multijugador local en tiempo real con conquista de mapas.",
        "projects.items.bouba.title": "Bouba District",
        "projects.items.bouba.desc": "Juego de ritmo tipo tower defense… ¡divertidísimo!",
        "projects.items.tile.title": "Merge Down",
        "projects.items.tile.desc": "Juego de velocidad y lógica basado en combinación de tiles. Realizado con Flutter, para Android.",
        "projects.items.trivia.title": "Trivia",
        "projects.items.trivia.desc": "Juego interactivo de preguntas y respuestas con puntuación para Android.",
        "projects.items.burbun.desc": "Juego pixel art de cartas donde debes apilar y vencer a la IA lo más rápido posible.",
        "arkanoid.title": "Mini Juego: Arkanoid",
        "arkanoid.desc": "Un pequeño ejemplo del juego que más veces he recreado en diferentes lenguajes durante la carrera. ¡Disfruta este clásico que nunca pasa de moda!",
        "arkanoid.start": "¡Comenzar Juego!",
        "arkanoid.restart": "Volver a Jugar",
        "arkanoid.score": "Puntuación: ",
        "arkanoid.donateBtn": "Donar 50 céntimos",
        "arkanoid.tip": "¿Te divirtió el juego? Ayúdame a mantener el tanque de cafeína lleno. ¡Los desarrolladores también necesitamos combustible! ☕🔋🕹️",
        "contact.title": "Contáctame",
        "contact.text": "¿Te gustaría colaborar o saber más? Escríbeme:",
        "contact.name": "Nombre",
        "contact.email": "Email",
        "contact.message": "Mensaje",
        "contact.send": "Enviar",
        "footer.rights": "Todos los derechos reservados.",
        "hero.words.1": "Diseño.",
        "hero.words.2": "Desarrollo.",
        "hero.words.3": "Creatividad.",
        "hero.words.4": "Automatización.",
        "skills.title": "Tecnologías y Lenguajes",
        "skills.subtitle": "Lenguajes, motores y herramientas que utilizo habitualmente",
        "timeline.title": "Mi recorrido",
        "timeline.1.title": "2018–2020 · Bachillerato Tecnológico",
        "timeline.1.desc": "IES Rodríguez Moñino, Badajoz (ES).",
        "timeline.2.title": "2021–2025 · Grado en Diseño y Desarrollo de Videojuegos",
        "timeline.2.desc": "Universidad Rey Juan Carlos (URJC). Carrera finalizada.",
        "timeline.3.title": "2025 · Máster en Inteligencia Artificial",
        "timeline.3.desc": "Universidad Politécnica de Madrid (UPM).",
        "timeline.4.title": "2025 · Workplace Engineering Intern",
        "timeline.4.desc": "Avanade Spain — soporte a usuarios, DX y flujos."
      },
      en: {
        brand: "AnaXrdonez",
        "nav.about": "About",
        "nav.projects": "Projects",
        "nav.contact": "Contact",
        "hero.title": "AnaXrdonez",
        "hero.subtitle": "Explore my projects and skills",
        "hero.cta": "View projects",
        "about.title": "About Me",
        "about.body": "I'm <strong>Ana Ordóñez Gragera</strong>, <strong>23 years old</strong>, and I completed a degree in <strong>Game Design and Development</strong> at Universidad Rey Juan Carlos. I am currently pursuing a <strong>Master’s degree in Artificial Intelligence</strong> at Universidad Politécnica de Madrid. My main interests focus on developing <strong>AI-based solutions</strong>, experimenting with models, and building tools using <strong>Python</strong>. I enjoy combining programming, creativity, and problem solving to build projects ranging from <strong>video games and interactive prototypes</strong> to experimental artificial intelligence applications and systems. I am particularly interested in areas such as <strong>machine learning, data processing, and intelligent application development</strong>, applying programming and computational thinking to create innovative solutions.",        "projects.title": "Featured Projects",
        "projects.items.blr.title": "Big Little Ranch",
        "projects.items.blr.desc": "Illustrated clicker implemented with Adobe Animate.",
        "projects.items.lucian.title": "Lucian",
        "projects.items.lucian.desc": "Graphic adventure with modeling and animation in Blender and Unity.",
        "projects.items.ttt.title": "Tiny Troops Tactics",
        "projects.items.ttt.desc": "Local real-time multiplayer with territory control.",
        "projects.items.bouba.title": "Bouba District",
        "projects.items.bouba.desc": "Rhythm-based, tower-defense style game — super fun!",
        "projects.items.tile.title": "Merge Down",
        "projects.items.tile.desc": "Fast-paced, logic-based tile merging game. Built with Flutter for Android.",
        "projects.items.trivia.title": "Trivia",
        "projects.items.trivia.desc": "Interactive quiz game with scoring for Android.",
        "projects.items.burbun.desc": "Pixel-art card game where you stack cards and beat the AI as fast as possible.",
        "arkanoid.title": "Mini Game: Arkanoid",
        "arkanoid.desc": "A small sample of the game I’ve recreated the most in different languages during my degree. Enjoy this timeless classic!",
        "arkanoid.start": "Start Game",
        "arkanoid.restart": "Play Again",
        "arkanoid.score": "Score: ",
        "arkanoid.donateBtn": "Donate €0.50",
        "arkanoid.tip": "Had fun? Help me keep the caffeine tank full. Developers need fuel too! ☕🔋🕹️",
        "contact.title": "Contact Me",
        "contact.text": "Would you like to collaborate or learn more? Write to me:",
        "contact.name": "Name",
        "contact.email": "Email",
        "contact.message": "Message",
        "contact.send": "Send",
        "footer.rights": "All rights reserved.",
        "hero.words.1": "Design.",
        "hero.words.2": "Development.",
        "hero.words.3": "Creativity.",
        "hero.words.4": "Automation.",
        "skills.title": "Technologies & Languages",
        "skills.subtitle": "Languages, engines and tools I use regularly",
        "timeline.title": "My journey",
        "timeline.1.title": "2018–2020 · Technological Baccalaureate",
        "timeline.1.desc": "IES Rodríguez Moñino, Badajoz (ES).",
        "timeline.2.title": "2021–2025 · BSc in Game Design & Development",
        "timeline.2.desc": "Universidad Rey Juan Carlos (URJC). Degree completed.",
        "timeline.3.title": "2025 · Master's in Artificial Intelligence",
        "timeline.3.desc": "Universidad Politécnica de Madrid (UPM).",
        "timeline.4.title": "2025 · Workplace Engineering Intern",
        "timeline.4.desc": "Avanade Spain — user support, DX and workflows."
      }
    };
  }

  // `applyLang` global única
  if (!window.applyLang) {
    window.applyLang = (lang) => {
      const dict = window.dict;
      const strings = dict[lang] || dict.es;

      // data-i18n (permite HTML)
      $$('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        if (strings[key] !== undefined) el.innerHTML = strings[key];
      });

      // data-i18n-static (texto plano con prefijo, útil para score)
      $$('[data-i18n-static]').forEach((el) => {
        const key = el.getAttribute('data-i18n-static');
        if (strings[key] !== undefined) {
          const prefix = strings[key];
          const number = (el.textContent.match(/\d+/) || [null])[0];
          el.textContent = prefix + (number ? ` ${number}` : '');
        }
      });

      document.documentElement.setAttribute('lang', lang);

      $$('.lang-switch .btn').forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
      });

      localStorage.setItem('lang', lang);
    };
  }

  // idioma inicial
  const savedLang = (localStorage.getItem('lang') || (navigator.language || 'es')).slice(0, 2);
  window.applyLang(savedLang === 'en' ? 'en' : 'es');

  // listeners del switch (delegación por si no existen aún)
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.lang-switch .btn');
    if (!btn) return;
    const lang = btn.dataset.lang;
    if (lang) window.applyLang(lang);
  });
})();


/* Timeline reveal on scroll */
(function() {
  try {
    var items = document.querySelectorAll('.timeline-item');
    if (!('IntersectionObserver' in window) || !items.length) {
      // Fallback: mostrar todos si no hay soporte
      items.forEach(function(el){ el.classList.add('in-view'); });
      return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target); // performance
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });
    items.forEach(function(el){ io.observe(el); });
  } catch(e) {
    var els = document.querySelectorAll('.timeline-item');
    els.forEach(function(el){ el.classList.add('in-view'); });
  }
})();

/* Timeline reveal on scroll */
(function() {
  try {
    var items = document.querySelectorAll('.tl-row'); // <-- antes: .timeline-item
    if (!('IntersectionObserver' in window) || !items.length) {
      items.forEach(function(el){ el.classList.add('in-view'); });
      return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });
    items.forEach(function(el){ io.observe(el); });
  } catch(e) {
    document.querySelectorAll('.tl-row').forEach(function(el){ el.classList.add('in-view'); });
  }
})();
