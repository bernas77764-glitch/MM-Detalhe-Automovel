/* MM Detalhe Automóvel — comportamento do site */
(function () {
  "use strict";

  const cfg = window.MM_CONFIG || {};
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ---------- Preencher contactos a partir de config.js ---------- */
  const telHref = "tel:" + String(cfg.telefone || "").replace(/\s+/g, "");
  const waHref = cfg.whatsapp ? "https://wa.me/" + cfg.whatsapp : "";
  const mailHref = cfg.email ? "mailto:" + cfg.email : "";

  $$(".js-phone").forEach((el) => (el.textContent = cfg.telefone || "—"));
  $$(".js-email").forEach((el) => (el.textContent = cfg.email || "—"));
  $$(".js-address").forEach((el) => (el.textContent = cfg.morada || "—"));
  $$(".js-hours").forEach((el) => {
    el.innerHTML = "";
    (cfg.horario || []).forEach((linha, i) => {
      if (i) el.appendChild(document.createElement("br"));
      el.appendChild(document.createTextNode(linha));
    });
  });

  const setLink = (selector, href) => {
    $$(selector).forEach((a) => {
      if (href) a.href = href;
      else a.hidden = true;
    });
  };
  setLink(".js-phone-link", cfg.telefone ? telHref : "");
  setLink(".js-email-link", mailHref);
  setLink(".js-whatsapp-link", waHref);
  setLink(".js-maps-link", cfg.googleMapsUrl);
  setLink(".js-review-link", cfg.googleReviewUrl || cfg.googleMapsUrl);
  setLink(".js-instagram-link", cfg.instagram);
  setLink(".js-facebook-link", cfg.facebook);

  /* ---------- Fotografia de fundo do topo ---------- */
  if (cfg.fundoHero) {
    const hero = $(".hero");
    const probe = new Image();
    probe.onload = () => {
      hero.style.setProperty("--hero-img", 'url("' + new URL(cfg.fundoHero, location.href).href + '")');
      hero.classList.add("has-photo");
    };
    probe.src = cfg.fundoHero;
  }

  /* ---------- Mapa incorporado ---------- */
  if (cfg.mapEmbedUrl) {
    const map = $("#map");
    map.innerHTML = "";
    const iframe = document.createElement("iframe");
    iframe.src = cfg.mapEmbedUrl;
    iframe.title = "Localização da MM Detalhe Automóvel";
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    iframe.allowFullscreen = true;
    map.appendChild(iframe);
  }

  /* ---------- Avaliações ---------- */
  const reviews = $("#reviews");
  if (reviews) {
    (cfg.avaliacoes || []).forEach((r) => {
      const card = document.createElement("article");
      card.className = "card review";
      const stars = "★".repeat(Math.max(0, Math.min(5, r.estrelas || 5)));
      card.innerHTML =
        '<div class="stars" aria-label="' + stars.length + ' estrelas">' + stars + "</div>" +
        "<p></p><p class=\"review-tr\" hidden></p><footer></footer>";
      card.querySelector("p").textContent = "“" + r.texto + "”";
      if (r.traducao) {
        const tr = card.querySelector(".review-tr");
        tr.textContent = r.traducao;
        tr.hidden = false;
      }
      card.querySelector("footer").textContent = "— " + (r.nome || "Cliente") + " · Google";
      reviews.appendChild(card);
    });
  }

  /* ---------- Serviços e preços ---------- */
  const ICONS = {
    lavagem: '<path d="M3 13l2-5a2 2 0 0 1 1.9-1.3h10.2A2 2 0 0 1 19 8l2 5v5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5zm3-4.5L4.8 12h14.4L17.5 8.5a.5.5 0 0 0-.5-.3H6.5a.5.5 0 0 0-.5.3zM6.5 16a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm11 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>',
    farois: '<path d="M14 5a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm0 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM2 8h8v2H2zm0 3h8v2H2zm0 3h8v2H2z"/>',
    estofos: '<path d="M4 10a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v1h1v6h-2v-1H5v1H3v-6h1v-1zm2 0v1h12v-1a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm-1 3v1h14v-1H5zM7 4h10v2H7z"/>',
    polimento: '<path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 14.3 7.2 16.9l.9-5.4L4.2 7.7l5.4-.8L12 2zm0 4.5l-1.2 2.4-2.6.4 1.9 1.8-.5 2.6L12 12.5l2.4 1.2-.5-2.6 1.9-1.8-2.6-.4L12 6.5zM3 20h18v2H3z"/>',
    selante: '<path d="M12 2l8 3v6c0 5.2-3.4 9.6-8 11-4.6-1.4-8-5.8-8-11V5l8-3zm0 2.2L6 6.4V11c0 4.1 2.5 7.6 6 8.9 3.5-1.3 6-4.8 6-8.9V6.4l-6-2.2zm-1 9.6l-2.3-2.3 1.4-1.4 1 1 3-3 1.4 1.4L11 13.8z"/>',
    ozono: '<path d="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zm0 2a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm-3 4.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm6 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-3 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"/>',
    personalizado: '<path d="M13.5 2l1.2 2.6 2.8.4-2 2 .5 2.8-2.5-1.3-2.5 1.3.5-2.8-2-2 2.8-.4L13.5 2zM4 20l7.6-7.6 1.4 1.4L5.4 21.4 4 20zm11.5-8.5l3-3 1.4 1.4-3 3-1.4-1.4z"/>',
  };
  const services = $("#services");
  if (services) {
    (cfg.servicos || []).forEach((item) => {
      const card = document.createElement("article");
      card.className = "card service";
      card.innerHTML =
        '<div class="service-top"><div class="card-icon" aria-hidden="true"><svg viewBox="0 0 24 24">' +
        (ICONS[item.icone] || ICONS.personalizado) +
        '</svg></div><span class="price-tag"></span></div><h3></h3><p></p>';
      card.querySelector(".price-tag").textContent = item.preco || "";
      card.querySelector("h3").textContent = item.nome;
      card.querySelector("p").textContent = item.desc || "";
      services.appendChild(card);
    });
    const nota = $("#precosNota");
    if (nota) nota.textContent = cfg.precosNota || "";
  }

  /* ---------- Galeria Antes / Depois ---------- */
  const gallery = $("#gallery");
  if (gallery && (cfg.galeria || []).length) {
    gallery.innerHTML = "";
    cfg.galeria.forEach((item, i) => {
      const fig = document.createElement("figure");
      fig.className = "gallery-item compare";
      fig.innerHTML =
        '<img class="cmp-after" alt="" loading="lazy" />' +
        '<img class="cmp-before" alt="" loading="lazy" />' +
        '<span class="cmp-label cmp-label-before">Antes</span>' +
        '<span class="cmp-label cmp-label-after">Depois</span>' +
        '<div class="cmp-handle" aria-hidden="true"></div>' +
        '<input type="range" class="cmp-range" min="0" max="100" value="50" id="cmp-' + i + '" aria-label="Comparar antes e depois" />' +
        "<figcaption></figcaption>";
      const before = fig.querySelector(".cmp-before");
      const after = fig.querySelector(".cmp-after");
      before.src = item.antes;
      before.alt = (item.titulo || "") + " — antes";
      after.src = item.depois;
      after.alt = (item.titulo || "") + " — depois";
      fig.querySelector("figcaption").textContent = item.titulo || "";
      const range = fig.querySelector(".cmp-range");
      const update = () => fig.style.setProperty("--pos", range.value + "%");
      range.addEventListener("input", update);
      update();
      gallery.appendChild(fig);
    });
  }

  /* ---------- Dados estruturados (SEO local) ---------- */
  const ld = $("#ld-json");
  if (ld) {
    const data = {
      "@context": "https://schema.org",
      "@type": "AutoDetailing",
      name: cfg.nome || "MM Detalhe Automóvel",
      image: location.origin + location.pathname.replace(/[^/]*$/, "") + "assets/logo.jpg",
      telephone: cfg.telefone,
      email: cfg.email,
      address: cfg.morada,
      url: location.href.split("#")[0],
      sameAs: [cfg.googleMapsUrl, cfg.instagram, cfg.facebook].filter(Boolean),
      openingHours: cfg.horario,
      priceRange: "€€",
    };
    ld.textContent = JSON.stringify(data);
  }

  /* ---------- Menu móvel ---------- */
  const toggle = $("#navToggle");
  const nav = $("#nav");
  const closeNav = () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  };
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("nav-open", open);
  });
  $$("a", nav).forEach((a) => a.addEventListener("click", closeNav));

  /* ---------- Cabeçalho ao fazer scroll ---------- */
  const header = $(".site-header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Animações de entrada ---------- */
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    $$(".card, .step, .gallery-item, .section-head, .about-copy, .about-media, .contact-info, .contact-form").forEach((el) => {
      el.classList.add("reveal");
      io.observe(el);
    });
  }

  /* ---------- Formulário: envia por WhatsApp ou email ---------- */
  const form = $("#contactForm");
  const note = $("#formNote");
  let via = "whatsapp";
  $$("button[type=submit]", form).forEach((b) =>
    b.addEventListener("click", () => (via = b.dataset.via))
  );

  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const nome = $("#nome").value.trim();
    const tel = $("#telefone").value.trim();
    const viatura = $("#viatura").value.trim();
    const servico = $("#servico").value;
    const msg = $("#mensagem").value.trim();

    if (!nome || !tel) {
      note.textContent = "Por favor indique o seu nome e telemóvel.";
      note.classList.add("error");
      (nome ? $("#telefone") : $("#nome")).focus();
      return;
    }
    note.classList.remove("error");

    const linhas = [
      "Olá! Gostaria de pedir um orçamento.",
      "Nome: " + nome,
      "Telemóvel: " + tel,
      viatura ? "Viatura: " + viatura : "",
      "Serviço: " + servico,
      msg ? "Mensagem: " + msg : "",
    ].filter(Boolean);
    const texto = linhas.join("\n");

    if (via === "email" && mailHref) {
      const subject = encodeURIComponent("Pedido de orçamento — " + servico);
      window.location.href = mailHref + "?subject=" + subject + "&body=" + encodeURIComponent(texto);
      note.textContent = "A abrir o seu programa de email…";
    } else if (waHref) {
      window.open(waHref + "?text=" + encodeURIComponent(texto), "_blank", "noopener");
      note.textContent = "A abrir o WhatsApp…";
    } else {
      note.textContent = "Contacte-nos por telefone: " + (cfg.telefone || "");
    }
  });

  /* ---------- Ano no rodapé ---------- */
  $("#year").textContent = new Date().getFullYear();
})();
