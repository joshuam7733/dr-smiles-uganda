/* Dr. Smiles Uganda — Phase 1 interactions (presentation only, no data handling) */
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- Hero load sequence ---------- */
  function startHero() {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        root.classList.add("is-loaded");
        // After the headline has slid in, let its letters move freely
        setTimeout(function () { root.classList.add("hero-settled"); }, 1400);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var heroImg = document.querySelector(".hero-photo img");
    if (heroImg && !heroImg.complete) {
      var started = false;
      var go = function () { if (!started) { started = true; startHero(); } };
      heroImg.addEventListener("load", go, { once: true });
      heroImg.addEventListener("error", go, { once: true });
      setTimeout(go, 1200); // never hold the page back on a slow connection
    } else {
      startHero();
    }

    initHeader();
    initMenu();
    initReveal();
    initActiveNav();
    initPointerLights();
    initHeroDoodles();
    initSparkles();
    initTextMotion();
    initServiceIcons();
    initMagnetText();
    initTips();
    initTreatments();

    var year = document.querySelector("[data-year]");
    if (year) year.textContent = String(new Date().getFullYear());
  });

  /* ---------- Header + quick bar state on scroll ---------- */
  function initHeader() {
    var header = document.querySelector("[data-header]");
    var quick = document.querySelector("[data-quickbar]");
    var hero = document.querySelector(".hero");
    var contact = document.getElementById("contact");
    var ticking = false;

    function update() {
      var y = window.scrollY;
      header.classList.toggle("is-scrolled", y > 8);

      if (quick && hero) {
        var pastHero = y > hero.offsetHeight * 0.6;
        var rect = contact ? contact.getBoundingClientRect() : null;
        var atContact = rect ? rect.top < window.innerHeight * 0.6 && rect.bottom > 0 : false;
        quick.classList.toggle("is-shown", pastHero && !atContact);
      }
      ticking = false;
    }

    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ---------- Mobile menu ---------- */
  function initMenu() {
    var toggle = document.querySelector("[data-menu-toggle]");
    var menu = document.querySelector("[data-menu]");
    if (!toggle || !menu) return;

    function open() {
      menu.hidden = false;
      menu.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      var first = menu.querySelector("a");
      if (first) first.focus();
    }
    function close(returnFocus) {
      menu.hidden = true;
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      if (returnFocus) toggle.focus();
    }

    toggle.addEventListener("click", function () {
      toggle.getAttribute("aria-expanded") === "true" ? close(true) : open();
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) close(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !menu.hidden) close(true);
    });
    window.matchMedia("(min-width: 901px)").addEventListener("change", function (mq) {
      if (mq.matches && !menu.hidden) close(false);
    });
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    // Small stagger between siblings that enter together
    items.forEach(function (el) {
      var siblings = Array.prototype.filter.call(el.parentElement.children, function (c) {
        return c.classList.contains("reveal");
      });
      var i = siblings.indexOf(el);
      if (i > 0) el.style.setProperty("--reveal-delay", Math.min(i, 5) * 0.08 + "s");
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Pointer-following light on buttons and cards ---------- */
  var LIT = ".btn, .service, .topic, .fact-link, .g-item";
  var TILT = ".topic, .g-item:not(.g-placeholder)";
  var MAX_TILT = 5; // degrees

  function setPointerVars(el, e) {
    var r = el.getBoundingClientRect();
    var x = e.clientX - r.left, y = e.clientY - r.top;
    el.style.setProperty("--mx", x + "px");
    el.style.setProperty("--my", y + "px");
    if (el.matches(TILT) && !reduceMotion.matches) {
      el.style.setProperty("--ry", ((x / r.width - 0.5) * 2 * MAX_TILT).toFixed(2) + "deg");
      el.style.setProperty("--rx", (-(y / r.height - 0.5) * 2 * MAX_TILT).toFixed(2) + "deg");
    }
  }

  function initPointerLights() {
    var pending = null, lastEvent = null, lastTilted = null;

    document.addEventListener("pointermove", function (e) {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      var el = e.target.closest && e.target.closest(LIT);
      if (lastTilted && lastTilted !== el) {
        lastTilted.style.removeProperty("--rx");
        lastTilted.style.removeProperty("--ry");
        lastTilted = null;
      }
      if (!el) return;
      if (el.matches(TILT)) lastTilted = el;
      pending = el; lastEvent = e;
      if (!initPointerLights.raf) {
        initPointerLights.raf = requestAnimationFrame(function () {
          initPointerLights.raf = 0;
          if (pending) setPointerVars(pending, lastEvent);
        });
      }
    }, { passive: true });

    // Touch: light up the button where the finger lands
    document.addEventListener("pointerdown", function (e) {
      var btn = e.target.closest && e.target.closest(".btn");
      if (!btn) return;
      setPointerVars(btn, e);
      if (e.pointerType === "touch") {
        btn.classList.add("is-tapped");
        setTimeout(function () { btn.classList.remove("is-tapped"); }, 350);
      }
    }, { passive: true });
  }

  /* ---------- Hero doodles: drift with the cursor, hop on tap ---------- */
  function initHeroDoodles() {
    var hero = document.querySelector(".hero");
    if (!hero) return;

    hero.querySelectorAll(".doodle[data-depth]").forEach(function (d) {
      d.style.setProperty("--depth", d.getAttribute("data-depth"));
    });

    if (reduceMotion.matches) return;

    var raf = 0, px = 0, py = 0;
    hero.addEventListener("pointermove", function (e) {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      var r = hero.getBoundingClientRect();
      // -1 … 1 from the centre of the hero; doodles move away from the cursor
      px = -((e.clientX - r.left) / r.width - 0.5) * 2;
      py = -((e.clientY - r.top) / r.height - 0.5) * 2;
      if (!raf) {
        raf = requestAnimationFrame(function () {
          raf = 0;
          hero.style.setProperty("--px", px.toFixed(3));
          hero.style.setProperty("--py", py.toFixed(3));
        });
      }
    }, { passive: true });

    hero.addEventListener("pointerleave", function () {
      hero.style.setProperty("--px", "0");
      hero.style.setProperty("--py", "0");
    });

    // Tapping the photo area (or the headline area) makes the doodles hop and the photo shine
    hero.addEventListener("pointerdown", function (e) {
      if (e.target.closest(".btn")) return;
      var zone = e.target.closest(".hero-media, .hero-copy");
      if (!zone) return;
      zone.classList.remove("is-poked");
      void zone.offsetWidth; // restart the animation
      zone.classList.add("is-poked");
      setTimeout(function () { zone.classList.remove("is-poked"); }, 1100);
      if (zone.classList.contains("hero-media")) burst(e.clientX, e.clientY, 10);
    });
  }

  /* ---------- Sparkle burst on button taps / clicks ---------- */
  var SPARKLE_COLORS = ["#45cc22", "#1b2f57", "#ffffff", "#45cc22", "#9ff07f"];

  function burst(x, y, count) {
    if (reduceMotion.matches || !Element.prototype.animate) return;
    count = count || 8;
    for (var i = 0; i < count; i++) {
      var s = document.createElement("span");
      s.className = "sparkle" + (i % 3 === 2 ? " is-dot" : "");
      s.setAttribute("aria-hidden", "true");
      s.style.left = x + "px";
      s.style.top = y + "px";
      s.style.color = SPARKLE_COLORS[i % SPARKLE_COLORS.length];
      // white sparkles need an outline to show on light backgrounds
      if (i % SPARKLE_COLORS.length === 2) s.style.filter = "drop-shadow(0 0 1px #1b2f57)";
      document.body.appendChild(s);

      var angle = (Math.PI * 2 * i) / count + Math.random() * 0.6;
      var dist = 28 + Math.random() * 34;
      var dx = Math.cos(angle) * dist, dy = Math.sin(angle) * dist;
      var scale = 0.7 + Math.random() * 0.8;
      var anim = s.animate([
        { transform: "translate(0,0) scale(0) rotate(0deg)", opacity: 1 },
        { transform: "translate(" + dx * 0.7 + "px," + dy * 0.7 + "px) scale(" + scale + ") rotate(90deg)", opacity: 1, offset: 0.6 },
        { transform: "translate(" + dx + "px," + (dy + 10) + "px) scale(0) rotate(160deg)", opacity: 0 }
      ], { duration: 650 + Math.random() * 250, easing: "cubic-bezier(.2,.7,.2,1)" });
      anim.onfinish = (function (el) { return function () { el.remove(); }; })(s);
    }
  }

  function initSparkles() {
    document.addEventListener("pointerdown", function (e) {
      var btn = e.target.closest && e.target.closest(".btn, .phones a");
      if (btn) burst(e.clientX, e.clientY, 8);
    }, { passive: true });
  }

  /* ---------- Scroll-in text: section headings, leads, promise, habits ---------- */
  var SMILE_SVG = '<svg class="title-smile" viewBox="0 0 120 22" aria-hidden="true"><path pathLength="1" d="M5 5 C 40 24, 80 24, 115 5"/></svg>';

  function initTextMotion() {
    var titles = document.querySelectorAll(".section-title");

    titles.forEach(function (title) {
      // Split the heading into words so they can rise one after another
      var words = title.textContent.trim().split(/[ \n\t]+/);
      title.textContent = "";
      words.forEach(function (w, i) {
        var span = document.createElement("span");
        span.className = "tw";
        span.style.setProperty("--i", i);
        span.textContent = w;
        title.appendChild(span);
        if (i < words.length - 1) title.appendChild(document.createTextNode(" "));
      });
      title.insertAdjacentHTML("beforeend", SMILE_SVG);
    });

    var targets = document.querySelectorAll(".section-title, .lead[data-fade], .promise");
    if (reduceMotion.matches || !("IntersectionObserver" in window)) {
      targets.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.4 });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Service icons: drawn on scroll, redrawn on hover ---------- */
  function initServiceIcons() {
    document.querySelectorAll(".service-icon svg > *").forEach(function (shape) {
      shape.setAttribute("pathLength", "1");
    });
    if (reduceMotion.matches || !Element.prototype.animate) return;

    document.querySelectorAll(".service").forEach(function (row) {
      row.addEventListener("pointerenter", function (e) {
        if (e.pointerType !== "mouse") return;
        row.querySelectorAll(".service-icon svg > *").forEach(function (shape, i) {
          shape.animate(
            [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }],
            { duration: 700, delay: i * 80, easing: "cubic-bezier(.2,.7,.2,1)", fill: "backwards" }
          );
        });
      });
    });
  }

  /* ---------- Letters that lift toward the cursor (hero headline, phone numbers) ---------- */
  function splitIntoChars(el) {
    var text = el.textContent;
    el.textContent = "";
    var chars = [];
    text.trim().split(/ +/).forEach(function (word, wi, all) {
      var w = document.createElement("span");
      w.className = "word";
      w.setAttribute("aria-hidden", "true");
      Array.from(word).forEach(function (c) {
        var s = document.createElement("span");
        s.className = "ch";
        s.textContent = c;
        w.appendChild(s);
        chars.push(s);
      });
      el.appendChild(w);
      if (wi < all.length - 1) el.appendChild(document.createTextNode(" "));
    });
    return chars;
  }

  function magnet(zone, chars, opts) {
    var rects = null, raf = 0, mx = 0, my = 0;
    var fs = parseFloat(getComputedStyle(zone).fontSize) || 40;
    var radius = fs * (opts.radius || 1.4);
    var lift = fs * (opts.lift || 0.16);

    function measure() {
      rects = chars.map(function (c) {
        var r = c.getBoundingClientRect();
        return [r.left + r.width / 2, r.top + r.height / 2];
      });
    }
    function apply() {
      raf = 0;
      chars.forEach(function (c, i) {
        var dx = rects[i][0] - mx, dy = (rects[i][1] - my) * 1.5;
        var f = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / radius);
        c.style.transform = f > 0.01
          ? "translateY(" + (-f * lift).toFixed(1) + "px) rotate(" + (dx > 0 ? f * 5 : -f * 5).toFixed(1) + "deg)"
          : "";
        c.classList.toggle("is-hot", f > 0.55);
      });
    }
    function reset() {
      rects = null;
      chars.forEach(function (c) { c.style.transform = ""; c.classList.remove("is-hot"); });
    }

    zone.addEventListener("pointermove", function (e) {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      if (opts.ready && !opts.ready()) return;
      if (!rects) measure();
      mx = e.clientX; my = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    }, { passive: true });
    zone.addEventListener("pointerleave", reset);
    window.addEventListener("scroll", function () { rects = null; }, { passive: true });
    window.addEventListener("resize", function () { rects = null; fs = parseFloat(getComputedStyle(zone).fontSize) || fs; radius = fs * (opts.radius || 1.4); lift = fs * (opts.lift || 0.16); });

    // Touch: a quick wave through the letters on tap
    zone.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "touch" || !Element.prototype.animate) return;
      chars.forEach(function (c, i) {
        c.animate(
          [{ transform: "translateY(0)" }, { transform: "translateY(" + (-lift) + "px)" }, { transform: "translateY(0)" }],
          { duration: 450, delay: i * 18, easing: "ease-in-out" }
        );
      });
    });
  }

  function initMagnetText() {
    if (reduceMotion.matches) return;

    var title = document.querySelector(".hero-title");
    if (title) {
      title.setAttribute("aria-label", title.textContent.replace(/\s+/g, " ").trim());
      var heroChars = [];
      title.querySelectorAll(".hero-line > span").forEach(function (line) {
        heroChars = heroChars.concat(splitIntoChars(line));
      });
      magnet(title, heroChars, {
        radius: 1.5, lift: 0.14,
        ready: function () { return root.classList.contains("hero-settled"); }
      });
    }

    document.querySelectorAll(".phones a").forEach(function (a) {
      a.setAttribute("aria-label", "Call " + a.textContent.trim());
      magnet(a, splitIntoChars(a), { radius: 1.6, lift: 0.18 });
    });
  }

  /* ---------- Services: the full treatment menu opens from "See all treatments" ---------- */
  function initTreatments() {
    var btn = document.querySelector("[data-treatments-toggle]");
    var menu = document.querySelector("[data-treatments]");
    if (!btn || !menu) return;
    var label = btn.querySelector("[data-label]");
    var closer = menu.querySelector("[data-treatments-close]");
    var behavior = function () { return reduceMotion.matches ? "auto" : "smooth"; };

    function set(open) {
      btn.setAttribute("aria-expanded", String(open));
      menu.classList.toggle("is-open", open);
      label.textContent = open ? "Hide treatments" : "See all treatments";
    }
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") !== "true";
      set(open);
      if (open) {
        menu.focus({ preventScroll: true });
        menu.scrollIntoView({ behavior: behavior(), block: "start" });
      }
    });
    if (closer) closer.addEventListener("click", function () {
      set(false);
      btn.focus({ preventScroll: true });
      document.getElementById("services").scrollIntoView({ behavior: behavior(), block: "start" });
    });
  }

  /* ---------- Smile school: pick a topic, swipe through its tips ---------- */
  function initTips() {
    var app = document.querySelector("[data-tips]");
    if (!app) return;
    var openPanel = null, opener = null;

    function track(panel) { return panel.querySelector("[data-track]"); }
    function step(t) {
      var c = t.children;
      return c.length > 1 ? c[1].offsetLeft - c[0].offsetLeft : t.clientWidth;
    }
    function index(panel) {
      var t = track(panel), n = t.children.length;
      if (t.scrollLeft + t.clientWidth >= t.scrollWidth - 4) return n - 1;
      return Math.max(0, Math.min(n - 1, Math.round(t.scrollLeft / step(t))));
    }
    function go(panel, i) {
      var t = track(panel), n = t.children.length;
      i = Math.max(0, Math.min(n - 1, i));
      t.scrollTo({ left: t.children[i].offsetLeft - t.children[0].offsetLeft, behavior: reduceMotion.matches ? "auto" : "smooth" });
    }
    function update(panel) {
      var t = track(panel), n = t.children.length, i = index(panel);
      panel.querySelector("[data-current]").textContent = String(i + 1);
      panel.querySelectorAll(".tip-dot").forEach(function (d, k) { d.setAttribute("aria-current", k === i ? "true" : "false"); });
      panel.querySelector("[data-prev]").disabled = i === 0;
      panel.querySelector("[data-next]").disabled = i === n - 1;
      Array.prototype.forEach.call(t.children, function (c, k) { c.classList.toggle("is-active", k === i); });
    }

    function open(btn) {
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      if (!panel) return;
      opener = btn; openPanel = panel;
      app.classList.add("is-viewing");
      panel.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
      var t = track(panel);
      t.style.scrollBehavior = "auto";
      t.scrollLeft = 0;
      t.style.scrollBehavior = "";
      update(panel);
      panel.querySelector("h3").focus({ preventScroll: true });
      var top = app.getBoundingClientRect().top;
      if (top < 60 || top > window.innerHeight * 0.45) {
        app.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "start" });
      }
    }
    function close() {
      if (!openPanel) return;
      openPanel.classList.remove("is-open");
      app.classList.remove("is-viewing");
      opener.setAttribute("aria-expanded", "false");
      opener.focus({ preventScroll: true });
      var top = app.getBoundingClientRect().top;
      if (top < 0) app.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "start" });
      openPanel = null;
    }

    app.querySelectorAll(".topic[aria-controls]").forEach(function (btn) {
      btn.addEventListener("click", function () { open(btn); });
    });

    app.querySelectorAll(".tip-panel").forEach(function (panel) {
      var t = track(panel), cards = Array.prototype.slice.call(t.children);
      var dots = panel.querySelector("[data-dots]");
      cards.forEach(function (card, i) {
        var d = document.createElement("button");
        d.type = "button";
        d.className = "tip-dot";
        d.setAttribute("aria-label", "Go to tip " + (i + 1));
        d.addEventListener("click", function () { go(panel, i); });
        dots.appendChild(d);
      });
      panel.querySelector("[data-prev]").addEventListener("click", function () { go(panel, index(panel) - 1); });
      panel.querySelector("[data-next]").addEventListener("click", function () { go(panel, index(panel) + 1); });
      panel.querySelectorAll("[data-back]").forEach(function (b) { b.addEventListener("click", close); });

      var raf = 0;
      t.addEventListener("scroll", function () {
        if (!raf) raf = requestAnimationFrame(function () { raf = 0; update(panel); });
      }, { passive: true });
      t.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight") { e.preventDefault(); go(panel, index(panel) + 1); }
        if (e.key === "ArrowLeft") { e.preventDefault(); go(panel, index(panel) - 1); }
      });
      panel.addEventListener("keydown", function (e) {
        if (e.key === "Escape") close();
      });
      update(panel);
    });

    window.addEventListener("resize", function () { if (openPanel) update(openPanel); });
  }

  /* ---------- Highlight the nav link for the section in view ---------- */
  function initActiveNav() {
    var links = document.querySelectorAll('.main-nav a[href^="#"]');
    if (!("IntersectionObserver" in window) || !links.length) return;
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = map[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach(function (l) { l.removeAttribute("aria-current"); });
          link.setAttribute("aria-current", "true");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    Object.keys(map).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) io.observe(section);
    });
  }
})();
