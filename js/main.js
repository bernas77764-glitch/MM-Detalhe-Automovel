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
        "<p></p><footer></footer>";
      card.querySelector("p").textContent = "“" + r.texto + "”";
      card.querySelector("footer").textContent = "— " + (r.nome || "Cliente");
      reviews.appendChild(card);
    });
  }

  /* ---------- Preços ---------- */
  const prices = $("#prices");
  if (prices && (cfg.precos || []).length) {
    $("#precos").hidden = false;
    $("#precosNota").textContent = cfg.precosNota || "";
    cfg.precos.forEach((item) => {
      const card = document.createElement("article");
      card.className = "card price";
      card.innerHTML = '<div class="price-top"><h3></h3><span class="price-tag"></span></div><p></p><a href="#contactos" class="price-link">Marcar →</a>';
      card.querySelector("h3").textContent = item.nome;
      card.querySelector(".price-tag").textContent = item.preco;
      card.querySelector("p").textContent = item.desc || "";
      prices.appendChild(card);
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
    $$(".card, .price, .step, .gallery-item, .section-head, .about-copy, .about-media, .contact-info, .contact-form").forEach((el) => {
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
