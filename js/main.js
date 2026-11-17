// Nav highlight
var links = document.querySelectorAll('.site-header nav a');
var io = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id); });
  });
}, { rootMargin: '-40% 0px -55% 0px' });
document.querySelectorAll('section.block, .hero-scroll').forEach(function (s) { io.observe(s); });

// Growing plant: scroll drives how much of each line is drawn
var clamp = function (n) { return Math.min(1, Math.max(0, n)); };
var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
var hero = document.querySelector('.hero-scroll'), gl = document.querySelector('.gl');
var parts = document.querySelectorAll('.plant .g'), bar = document.querySelector('.progress');
var header = document.querySelector('.site-header'), intro = reduced ? 1 : 0;
var bloom = document.querySelectorAll('.bloom .g2'), bc = document.querySelector('.bloom .c'), contact = document.getElementById('contact');
function setDash(el, p) {
  var k = clamp((p - el.dataset.s) / (el.dataset.e - el.dataset.s));
  el.style.strokeDashoffset = 1 - k; el.style.opacity = k > 0 ? 1 : 0;
}
function draw() {
  var r = hero.getBoundingClientRect();
  var p = reduced ? 1 : Math.max(clamp(-r.top / (r.height - innerHeight)), intro);
  gl.style.transform = 'scaleX(' + clamp(p / 0.1) + ')';
  parts.forEach(function (el) {
    var k = clamp((p - el.dataset.s) / (el.dataset.e - el.dataset.s));
    el.style.strokeDashoffset = 1 - k;
    el.style.opacity = k > 0 ? 1 : 0;
  });
  var q = reduced ? 1 : clamp((innerHeight - contact.getBoundingClientRect().top) / (innerHeight * 0.5));
  bloom.forEach(function (el) { setDash(el, q); });
  bc.style.opacity = clamp((q - 0.9) / 0.1);
  var sb = document.querySelector('.story-body'), vi = document.querySelector('.vine i');
  var sr = sb.getBoundingClientRect();
  vi.style.height = (reduced ? 100 : clamp((innerHeight * 0.65 - sr.top) / sr.height) * 100) + '%';
  bar.style.transform = 'scaleX(' + clamp(scrollY / (document.documentElement.scrollHeight - innerHeight)) + ')';
  header.classList.toggle('small', scrollY > 60);
}
addEventListener('scroll', function () { requestAnimationFrame(draw); }, { passive: true });
addEventListener('resize', draw);
draw();
if (!reduced) { var t0 = performance.now(); (function tick(t) {
  var k = clamp((t - t0) / 1600); intro = 0.2 * (1 - Math.pow(1 - k, 3)); draw(); if (k < 1) requestAnimationFrame(tick);
})(t0); }

// Plant leans gently toward the pointer (desktop only)
var sway = document.querySelector('.sway');
if (!reduced && matchMedia('(hover: hover)').matches) {
  addEventListener('pointermove', function (e) {
    sway.style.transform = 'rotate(' + ((e.clientX / innerWidth - 0.5) * 5).toFixed(2) + 'deg)';
  });
}
