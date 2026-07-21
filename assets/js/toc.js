(function () {
  var cfg = window.TOC_CONFIG;
  if (!cfg) return;

  var sections = [];
  Object.keys(cfg.labels).forEach(function (cls) {
    var el = document.querySelector('.' + cls);
    if (!el) return;
    if (!el.id) el.id = 'sec-' + cls.replace('ly_', '');
    sections.push({ id: el.id, label: cfg.labels[cls], el: el });
  });
  if (!sections.length) return;

  var toc = document.createElement('div');
  toc.className = 'bl_toc';
  toc.innerHTML =
    '<button class="bl_tocToggle" aria-label="' + cfg.title + '">'
    + '<span class="bl_tocToggle__icon" aria-hidden="true"></span>'
    + '<span class="bl_tocToggle__label">' + cfg.title + '</span></button>'
    + '<nav class="bl_tocPanel"><p class="bl_tocPanel__title">' + cfg.title + '</p><ul>'
    + sections.map(function (s) {
        return '<li><a href="#' + s.id + '" data-id="' + s.id + '">' + s.label + '</a></li>';
      }).join('')
    + '</ul></nav>';
  document.body.appendChild(toc);

  var toggle = toc.querySelector('.bl_tocToggle');
  var panel = toc.querySelector('.bl_tocPanel');

  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    toc.classList.toggle('is_open');
  });
  document.addEventListener('click', function () { toc.classList.remove('is_open'); });
  document.addEventListener('touchstart', function (e) {
    if (toc.contains(e.target)) return;
    toc.classList.remove('is_open');
  }, { passive: true });
  panel.addEventListener('click', function (e) { e.stopPropagation(); });

  var links = Array.prototype.slice.call(panel.querySelectorAll('a'));
  var byId = {};
  links.forEach(function (a) {
    byId[a.getAttribute('data-id')] = a;
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.getElementById(a.getAttribute('data-id'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      toc.classList.remove('is_open');
    });
  });

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        links.forEach(function (a) { a.classList.remove('is_active'); });
        var a = byId[en.target.id];
        if (a) a.classList.add('is_active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(function (s) { obs.observe(s.el); });
})();
