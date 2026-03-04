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
        "about.body":
          "Soy <strong>Ana Ordóñez Gragera</strong>, tengo <strong>23 años</strong> y he completado el grado en <strong>Diseño y Desarrollo de Videojuegos</strong> en la Universidad Rey Juan Carlos. Actualmente estoy cursando un <strong>Máster en Inteligencia Artificial</strong> en la Universidad Politécnica de Madrid. Mi interés principal se centra en el desarrollo de <strong>soluciones basadas en inteligencia artificial</strong>, la experimentación con modelos y la creación de herramientas utilizando <strong>Python</strong>. Disfruto combinando programación, creatividad y resolución de problemas para construir proyectos que van desde <strong>videojuegos y prototipos interactivos</strong> hasta aplicaciones y sistemas experimentales de inteligencia artificial. Me interesa especialmente explorar áreas como <strong>machine learning, procesamiento de datos y desarrollo de aplicaciones inteligentes</strong>, aplicando la programación y el pensamiento computacional para crear soluciones innovadoras.",

        "projects.title": "Proyectos Destacados",
        "projects.items.blr.title": "Big Little Ranch",
        "projects.items.blr.desc": "Clicker ilustrado e implementado en Adobe Animate.",
        "projects.items.lucian.title": "Lucian",
        "projects.items.lucian.desc": "Aventura gráfica con modelado y animación en Blender y Unity.",
        "projects.items.ttt.title": "Tiny Troops Tactics",
        "projects.items.ttt.desc": "Multijugador local en tiempo real con conquista de mapas.",
        "projects.items.bouba.title": "Bouba District",
        "projects.items.bouba.desc": "Juego de ritmo tipo tower defense… ¡divertidísimo!",
        "projects.items.tile.title": "Merge Down",
        "projects.items.tile.desc":
          "Juego de velocidad y lógica basado en combinación de tiles. Realizado con Flutter, para Android.",
        "projects.items.trivia.title": "Trivia",
        "projects.items.trivia.desc":
          "Juego interactivo de preguntas y respuestas con puntuación para Android.",
        "projects.items.burbun.desc":
          "Juego pixel art de cartas donde debes apilar y vencer a la IA lo más rápido posible.",

        "arkanoid.title": "Mini Juego: Arkanoid",
        "arkanoid.desc":
          "Un pequeño ejemplo del juego que más veces he recreado en diferentes lenguajes durante la carrera. ¡Disfruta este clásico que nunca pasa de moda!",
        "arkanoid.start": "¡Comenzar Juego!",
        "arkanoid.restart": "Volver a Jugar",
        "arkanoid.score": "Puntuación: ",
        "arkanoid.donateBtn": "Donar 50 céntimos",
        "arkanoid.tip":
          "¿Te divirtió el juego? Ayúdame a mantener el tanque de cafeína lleno. ¡Los desarrolladores también necesitamos combustible! ☕🔋🕹️",

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
        "timeline.4.desc": "Avanade Spain — soporte a usuarios, DX y flujos.",

        /* =========================
           NUEVO: IA (index + páginas)
           ========================= */

        // Index (cards IA)
        "ai.section.title": "IA",
        "ai.card.um.title": "Lab: Métricas de Incertidumbre",
        "ai.card.um.desc":
          "Estudio práctico de señales de incertidumbre en clasificación multiclase: confidence, entropía y desacuerdo de ensemble.",
        "ai.card.mm.title": "Generador de Actas de Reunión",
        "ai.card.mm.desc":
          "Pipeline con LangGraph que convierte transcripciones en actas estructuradas: participantes, temas, tareas y resumen ejecutivo.",
        "ai.card.cv.title": "Evaluador de CV (LLM)",
        "ai.card.cv.desc":
          "Evaluación de CV con LLM: scoring, puntos fuertes, gaps y recomendaciones con salida estructurada.",

        // Común a páginas de proyecto
        "project.back": "← Volver",
        "project.repo": "Repositorio",
        "project.notebook": "Abrir Notebook",
        "project.demo": "Demo",

        // Uncertainty Metrics (uncertainty-metrics.html)
        "um.page.title": "Lab: Métricas de Incertidumbre",
        "um.hero.title.prefix": "Incertidumbre",
        "um.hero.title.accent": "Métricas",
        "um.hero.title.suffix": "Lab",
        "um.hero.subtitle":
          "Lab práctico para explorar señales de incertidumbre en clasificación multiclase: confidence, entropía y desacuerdo de ensemble — más una política operativa de decisión.",
        "um.overview.title": "Resumen",
        "um.overview.body":
          "El objetivo es entender cómo se comporta la incertidumbre en las predicciones y cómo convertirla en decisiones simples: automatizar, guiar al usuario o escalar a revisión humana.",
        "um.inside.title": "Qué incluye",
        "um.inside.li1": "<strong>Top-1 confidence</strong> y sus fallos típicos.",
        "um.inside.li2": "<strong>Entropía de Shannon normalizada</strong> en <code>[0,1]</code>.",
        "um.inside.li3": "<strong>Variabilidad de ensemble</strong> (desacuerdo / desviación).",
        "um.inside.li4": "<strong>Política</strong>: AUTO / GRAY_ZONE / ESCALATE / GUIDE.",
        "um.policy.title": "Política de decisión (operativa)",
        "um.policy.auto.title": "AUTO",
        "um.policy.auto.desc":
          "Alta confidence + baja entropía + ensemble estable → automatizar.",
        "um.policy.gray.title": "ZONA GRIS",
        "um.policy.gray.desc":
          "Incertidumbre media → mostrar opciones, pedir aclaraciones y monitorizar.",
        "um.policy.escalate.title": "ESCALAR",
        "um.policy.escalate.desc":
          "Entropía alta o desacuerdo alto → revisión humana.",
        "um.policy.guide.title": "GUIAR",
        "um.policy.guide.desc":
          "Confidence baja pero patrón consistente → preguntas dirigidas para desambiguar.",
        "um.next.title": "Mejoras futuras",
        "um.next.li1": "Añadir calibración (ECE / reliability diagrams).",
        "um.next.li2": "Evaluar con ruido y muestras OOD.",
        "um.next.li3": "Convertir la política en una función reutilizable (mini librería).",

        // CV Evaluator (cv-evaluator-llm.html)
        "cv.page.title": "Evaluador de CV (LLM)",
        "cv.hero.title.prefix": "Evaluador de",
        "cv.hero.title.accent": "CV",
        "cv.hero.title.suffix": "LLM",
        "cv.hero.subtitle":
          "Pipeline con LLM que evalúa CVs contra un rol, genera feedback estructurado, detecta señales faltantes y sugiere mejoras con un scoring consistente.",
        "cv.overview.title": "Resumen",
        "cv.overview.body":
          "Este proyecto se centra en producir resultados accionables y estructurados (no “feedback vago”). Está pensado para ampliarse a una herramienta web o asistente interno.",
        "cv.outputs.title": "Salidas clave",
        "cv.outputs.li1": "<strong>Fit score</strong> y justificación alineada al rol.",
        "cv.outputs.li2": "<strong>Puntos fuertes</strong> y <strong>gaps</strong> (señales faltantes).",
        "cv.outputs.li3": "<strong>Recomendaciones</strong> para mejorar el CV según el puesto.",
        "cv.outputs.li4": "<strong>JSON estructurado</strong> para integrarlo en apps.",
        "cv.how.title": "Cómo funciona",
        "cv.how.li1": "Entrada: texto del CV + descripción del puesto (o requisitos).",
        "cv.how.li2": "Normalización: extrae secciones y entidades (skills, experiencia, educación).",
        "cv.how.li3": "Evaluación: scoring por criterios con explicaciones calibradas.",
        "cv.how.li4": "Salida: reporte formateado + esquema JSON para automatización.",
        "cv.next.title": "Mejoras futuras",
        "cv.next.li1": "Ajuste de rúbrica por industria (SWE, Data, Product, etc.).",
        "cv.next.li2":
          "Capa de seguridad: evitar inferencias sensibles; centrarse en señales relevantes al puesto.",
        "cv.next.li3":
          "Opcional: RAG con estándares por rol (frameworks de competencias).",
        "cv.next.li4": "Deploy de una demo web mínima (Streamlit / FastAPI).",

        // Meeting Minutes (meeting-minutes-generator.html)
        "mm.page.title": "Generador de Actas (LangGraph)",
        "mm.hero.title.prefix": "Generador de",
        "mm.hero.title.accent": "Actas",
        "mm.hero.title.suffix": "de Reunión",
        "mm.hero.subtitle":
          "Workflow con LangGraph que convierte transcripciones (o audio/video tras transcribir) en actas estructuradas: participantes, agenda, temas, tareas, acta y resumen ejecutivo.",
        "mm.overview.title": "Resumen",
        "mm.overview.body":
          "El foco está en estructura y utilidad: en lugar de un “resumen genérico”, extrae artefactos accionables como tareas, decisiones y puntos clave.",
        "mm.outputs.title": "Salidas clave",
        "mm.outputs.li1": "<strong>Participantes</strong> y roles (si aparecen).",
        "mm.outputs.li2": "<strong>Agenda</strong> y estructura de la reunión.",
        "mm.outputs.li3": "<strong>Temas</strong> y puntos principales.",
        "mm.outputs.li4":
          "<strong>Tareas</strong> (responsable + fecha límite si está disponible).",
        "mm.outputs.li5": "<strong>Acta</strong> + <strong>resumen ejecutivo</strong>.",
        "mm.flow.title": "Flujo",
        "mm.flow.li1": "<strong>Entrada</strong>: transcripción (pegar texto) o audio/video (transcribir antes).",
        "mm.flow.li2": "<strong>Orquestación LangGraph</strong>: nodos por pasos de extracción.",
        "mm.flow.li3": "<strong>Validación</strong>: esquema y formato consistente.",
        "mm.flow.li4":
          "<strong>Export</strong>: listo para documentación, tickets o emails de seguimiento.",
        "mm.why.title": "Por qué LangGraph",
        "mm.why.li1": "Nodos modulares → fácil iterar (añadir “Decisiones”, “Riesgos”, etc.).",
        "mm.why.li2": "Estado y checkpoints → orden predecible e intermedios inspectables.",
        "mm.why.li3": "Más control que un único prompt largo.",
        "mm.next.title": "Mejoras futuras",
        "mm.next.li1": "UI web (Streamlit / FastAPI) para demo pública.",
        "mm.next.li2": "Integraciones (Jira/Trello/Calendar) desde action items.",
        "mm.next.li3": "Diarización de speakers para mejorar participantes.",
        "mm.next.li4": "Optimización de coste/latencia (chunking + caching)."
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
        "about.body":
          "I'm <strong>Ana Ordóñez Gragera</strong>, <strong>23 years old</strong>, and I completed a degree in <strong>Game Design and Development</strong> at Universidad Rey Juan Carlos. I am currently pursuing a <strong>Master’s degree in Artificial Intelligence</strong> at Universidad Politécnica de Madrid. My main interests focus on developing <strong>AI-based solutions</strong>, experimenting with models, and building tools using <strong>Python</strong>. I enjoy combining programming, creativity, and problem solving to build projects ranging from <strong>video games and interactive prototypes</strong> to experimental artificial intelligence applications and systems. I am particularly interested in areas such as <strong>machine learning, data processing, and intelligent application development</strong>, applying programming and computational thinking to create innovative solutions.",

        "projects.title": "Featured Projects",
        "projects.items.blr.title": "Big Little Ranch",
        "projects.items.blr.desc": "Illustrated clicker implemented with Adobe Animate.",
        "projects.items.lucian.title": "Lucian",
        "projects.items.lucian.desc":
          "Graphic adventure with modeling and animation in Blender and Unity.",
        "projects.items.ttt.title": "Tiny Troops Tactics",
        "projects.items.ttt.desc":
          "Local real-time multiplayer with territory control.",
        "projects.items.bouba.title": "Bouba District",
        "projects.items.bouba.desc":
          "Rhythm-based, tower-defense style game — super fun!",
        "projects.items.tile.title": "Merge Down",
        "projects.items.tile.desc":
          "Fast-paced, logic-based tile merging game. Built with Flutter for Android.",
        "projects.items.trivia.title": "Trivia",
        "projects.items.trivia.desc":
          "Interactive quiz game with scoring for Android.",
        "projects.items.burbun.desc":
          "Pixel-art card game where you stack cards and beat the AI as fast as possible.",

        "arkanoid.title": "Mini Game: Arkanoid",
        "arkanoid.desc":
          "A small sample of the game I’ve recreated the most in different languages during my degree. Enjoy this timeless classic!",
        "arkanoid.start": "Start Game",
        "arkanoid.restart": "Play Again",
        "arkanoid.score": "Score: ",
        "arkanoid.donateBtn": "Donate €0.50",
        "arkanoid.tip":
          "Had fun? Help me keep the caffeine tank full. Developers need fuel too! ☕🔋🕹️",

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
        "timeline.4.desc":
          "Avanade Spain — user support, DX and workflows.",

        /* =========================
           NEW: AI (index + pages)
           ========================= */

        // Index (AI cards)
        "ai.section.title": "AI",
        "ai.card.um.title": "Lab: Uncertainty Metrics",
        "ai.card.um.desc":
          "Hands-on study of uncertainty signals in multiclass classification: confidence, entropy and ensemble disagreement.",
        "ai.card.mm.title": "Meeting Minutes Generator",
        "ai.card.mm.desc":
          "LangGraph pipeline that turns transcripts into structured minutes: participants, topics, action items and an executive summary.",
        "ai.card.cv.title": "CV Evaluator (LLM)",
        "ai.card.cv.desc":
          "LLM-based CV evaluation: scoring, strengths, gaps and recommendations with structured output.",

        // Common project page
        "project.back": "← Back",
        "project.repo": "GitHub Repo",
        "project.notebook": "Open Notebook",
        "project.demo": "Demo",

        // Uncertainty Metrics (uncertainty-metrics.html)
        "um.page.title": "Lab: Uncertainty Metrics",
        "um.hero.title.prefix": "Uncertainty",
        "um.hero.title.accent": "Metrics",
        "um.hero.title.suffix": "Lab",
        "um.hero.subtitle":
          "Hands-on lab exploring uncertainty signals for multiclass classification: confidence, entropy and ensemble disagreement — plus an operational decision policy.",
        "um.overview.title": "Overview",
        "um.overview.body":
          "The goal is to understand how uncertainty behaves across predictions and convert it into simple decisions: automate, guide the user, or escalate for human review.",
        "um.inside.title": "What’s inside",
        "um.inside.li1": "<strong>Top-1 confidence</strong> analysis and typical failure modes.",
        "um.inside.li2": "<strong>Normalized Shannon entropy</strong> scaled to <code>[0,1]</code>.",
        "um.inside.li3": "<strong>Ensemble variability</strong> via disagreement / std signals.",
        "um.inside.li4": "<strong>Policy</strong>: AUTO / GRAY_ZONE / ESCALATE / GUIDE.",
        "um.policy.title": "Decision policy (operational)",
        "um.policy.auto.title": "AUTO",
        "um.policy.auto.desc":
          "High confidence + low entropy + stable ensemble → automate.",
        "um.policy.gray.title": "GRAY ZONE",
        "um.policy.gray.desc":
          "Medium uncertainty → show options, ask clarifying prompts, monitor.",
        "um.policy.escalate.title": "ESCALATE",
        "um.policy.escalate.desc":
          "High entropy or high disagreement → human review.",
        "um.policy.guide.title": "GUIDE",
        "um.policy.guide.desc":
          "Low confidence but consistent pattern → targeted questions to disambiguate.",
        "um.next.title": "Next improvements",
        "um.next.li1": "Add calibration (ECE / reliability diagrams).",
        "um.next.li2": "Evaluate on noisy / OOD samples.",
        "um.next.li3": "Turn the policy into a reusable function (mini library).",

        // CV Evaluator (cv-evaluator-llm.html)
        "cv.page.title": "CV Evaluator (LLM)",
        "cv.hero.title.prefix": "CV",
        "cv.hero.title.accent": "Evaluator",
        "cv.hero.title.suffix": "LLM",
        "cv.hero.subtitle":
          "An LLM pipeline that evaluates resumes against a role, generates structured feedback, surfaces missing signals, and suggests improvements with consistent scoring.",
        "cv.overview.title": "Overview",
        "cv.overview.body":
          "This project focuses on actionable, structured results (not vague feedback). It’s designed to be extended into a web tool or internal assistant.",
        "cv.outputs.title": "Key outputs",
        "cv.outputs.li1": "<strong>Fit score</strong> and rationale aligned to the role.",
        "cv.outputs.li2": "<strong>Strengths</strong> and <strong>gaps</strong> (missing signals).",
        "cv.outputs.li3": "<strong>Recommendations</strong> to improve the CV for the target job.",
        "cv.outputs.li4": "<strong>Structured JSON</strong> for easy app integration.",
        "cv.how.title": "How it works",
        "cv.how.li1": "Input: CV text + job description (or role requirements).",
        "cv.how.li2": "Normalization: extract key sections and entities (skills, experience, education).",
        "cv.how.li3": "Evaluation: criteria-based scoring with calibrated explanations.",
        "cv.how.li4": "Output: formatted report + JSON schema for automation.",
        "cv.next.title": "Next improvements",
        "cv.next.li1": "Rubric tuning per industry (SWE, Data, Product, etc.).",
        "cv.next.li2":
          "Safety layer: avoid sensitive inference; focus on job-relevant signals.",
        "cv.next.li3":
          "Optional: RAG with role-specific standards (competency frameworks).",
        "cv.next.li4": "Deploy a minimal web demo (Streamlit / FastAPI).",

        // Meeting Minutes (meeting-minutes-generator.html)
        "mm.page.title": "Meeting Minutes Generator (LangGraph)",
        "mm.hero.title.prefix": "Meeting Minutes",
        "mm.hero.title.accent": "Generator",
        "mm.hero.title.suffix": "",
        "mm.hero.subtitle":
          "A LangGraph workflow that converts transcripts (or audio/video after transcription) into structured minutes: participants, agenda, key topics, action items, minutes and an executive summary.",
        "mm.overview.title": "Overview",
        "mm.overview.body":
          "This project focuses on structure and usefulness: instead of a generic summary, it extracts actionable artifacts like tasks, decisions and key points.",
        "mm.outputs.title": "Key outputs",
        "mm.outputs.li1": "<strong>Participants</strong> and roles (when available).",
        "mm.outputs.li2": "<strong>Agenda</strong> and meeting structure.",
        "mm.outputs.li3": "<strong>Topics</strong> and key discussion points.",
        "mm.outputs.li4":
          "<strong>Action items</strong> (owner + deadline when present).",
        "mm.outputs.li5": "<strong>Minutes</strong> + <strong>executive summary</strong>.",
        "mm.flow.title": "Workflow",
        "mm.flow.li1": "<strong>Input</strong>: transcript (paste text) or audio/video (transcribe first).",
        "mm.flow.li2": "<strong>LangGraph orchestration</strong>: step-by-step extraction nodes.",
        "mm.flow.li3": "<strong>Validation</strong>: enforce schema and formatting for consistent outputs.",
        "mm.flow.li4":
          "<strong>Export</strong>: ready for docs, tickets or follow-up emails.",
        "mm.why.title": "Why LangGraph",
        "mm.why.li1": "Modular nodes → easy to iterate (add “Decisions”, “Risks”, etc.).",
        "mm.why.li2": "Stateful workflow → predictable order and inspectable checkpoints.",
        "mm.why.li3": "More control than a single long prompt.",
        "mm.next.title": "Next improvements",
        "mm.next.li1": "Web UI (Streamlit / FastAPI) for a public demo.",
        "mm.next.li2": "Integrations (Jira/Trello/Calendar) from action items.",
        "mm.next.li3": "Speaker diarization support to strengthen participant extraction.",
        "mm.next.li4": "Cost & latency optimizations (chunking + caching)."
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

  // ----- HTML includes (header compartido) -----
  const loadIncludes = async () => {
    const includeEls = $$('[data-include]');
    if (!includeEls.length) return;

    await Promise.all(includeEls.map(async (el) => {
      const url = el.getAttribute('data-include');
      if (!url) return;

      try {
        const res = await fetch(url, { cache: 'no-cache' });
        if (!res.ok) throw new Error(`Failed include: ${url}`);
        el.innerHTML = await res.text();
      } catch (err) {
        console.warn(err);
      }
    }));
  };

  // idioma inicial (después de inyectar header)
  (async () => {
    // Espera a que el DOM exista (importante para includes)
    if (document.readyState === 'loading') {
      await new Promise((res) => document.addEventListener('DOMContentLoaded', res, { once: true }));
    }

    await loadIncludes();

    const savedLang = (localStorage.getItem('lang') || (navigator.language || 'es')).slice(0, 2);
    window.applyLang(savedLang === 'en' ? 'en' : 'es');
  })();

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