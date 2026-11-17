// Code only: builds the Work section from content/projects.js. Edit content/projects.js, not this file.
(function () {
  var D = window.PROJECTS, root = document.getElementById('projects');
  var dlg = document.getElementById('detail'), body = document.getElementById('detail-body');
  if (!D || !root) return;
  var P = {};
  var SPROUT = '<svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M40 66V34M40 50C28 50 20 42 18 30c12 0 20 6 22 20M40 42C52 42 60 34 62 22c-12 0-20 6-22 20M22 66h36"/></svg>';
  var ICON = {
    games: '<rect x="2" y="7" width="20" height="11" rx="4"/><path d="M7 10v5M4.5 12.5h5M16 11.5h.01M18.5 14h.01"/>',
    software: '<path d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 5l-4 14"/>',
    websites: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
    videos: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 9l5 3-5 3z"/>',
    other: '<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>'
  };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function pic(src, alt, cls) {
    return src ? '<img class="' + cls + '" src="' + esc(src) + '" alt="' + esc(alt) + '" loading="lazy">'
               : '<div class="' + cls + ' ph" aria-hidden="true">' + SPROUT + '</div>';
  }
  function links(list) {
    return (list || []).map(function (l, i) {
      var ext = /^https?:/.test(l.url);
      return '<a class="btn ' + (i === 0 ? 'btn-primary' : 'btn-ghost') + '" href="' + esc(l.url) + '"' + (ext ? ' target="_blank" rel="noopener"' : '') + '>' + esc(l.label) + '</a>';
    }).join('');
  }
  function featured(p) {
    P[p.id] = p;
    return '<article class="feature"><div class="art">' + pic(p.image, p.imageAlt || p.title, 'artimg') + '</div><div class="info">' +
      '<p class="tag">Featured · ' + esc(p.status) + ' · ' + esc(p.meta) + '</p><h3>' + esc(p.title) + '</h3><p>' + esc(p.summary) + '</p>' +
      '<div class="links"><button class="btn btn-primary" data-project="' + esc(p.id) + '">Read more</button></div></div></article>';
  }
  function card(p) {
    P[p.id] = p;
    return '<article class="item">' + pic(p.image, p.imageAlt || p.title, 'cover') +
      '<div class="item-head"><h3>' + esc(p.title) + '</h3><span class="status">' + esc(p.status) + '</span></div><p>' + esc(p.summary) + '</p>' +
      '<div class="links"><button class="btn btn-primary" data-project="' + esc(p.id) + '">View details</button><span class="platform">' + esc(p.meta) + '</span></div></article>';
  }
  function group(g) {
    if (!g.projects || !g.projects.length) return '';
    return '<div class="group" id="' + esc(g.id) + '"><h3 class="sub"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      (ICON[g.id] || ICON.other) + '</svg>' + esc(g.title) + '</h3><div class="grid">' + g.projects.map(card).join('') + '</div></div>';
  }
  function shots(p) { return (p.screenshots && p.screenshots.length) ? p.screenshots : (p.image ? [p.image] : []); }
  var EXPAND = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>';
  function gallery(p) {
    var list = shots(p);
    if (!list.length) return '<div class="gallery"><div class="main">' + pic('', '', 'bigshot') + '</div></div>';
    var h = '<div class="gallery"><button type="button" class="main" data-open="0" aria-label="View larger"><img class="bigshot" src="' + esc(list[0]) + '" alt="' + esc(p.title) + ' screenshot 1"><span class="zoom">' + EXPAND + '</span></button>';
    if (list.length > 1) h += '<div class="thumbs">' + list.map(function (src, i) {
      return '<button type="button" class="' + (i ? '' : 'on') + '" data-thumb="' + i + '" aria-label="Show image ' + (i + 1) + '"><img src="' + esc(src) + '" alt="" loading="lazy"></button>';
    }).join('') + '</div>';
    return h + '</div>';
  }
  function detail(p) {
    var h = '<h3 class="dtitle">' + esc(p.title) + '</h3><p class="tag">' + esc(p.status) + ' · ' + esc(p.meta) + '</p>';
    if (p.video) h += '<iframe class="video" src="https://www.youtube-nocookie.com/embed/' + esc(p.video) + '" title="' + esc(p.title) + ' video" allowfullscreen loading="lazy"></iframe>';
    if (!p.video || shots(p).length) h += gallery(p);
    (p.description && p.description.length ? p.description : [p.summary]).forEach(function (t) { h += '<p>' + esc(t) + '</p>'; });
    if (p.features && p.features.length) h += '<ul class="muted">' + p.features.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul>';
    return h + '<div class="links" style="margin-top:1.25rem">' + links(p.links) + '</div>';
  }
  // Full-screen image viewer
  var cur = null, lb = document.getElementById('lightbox'), lbImg = lb.querySelector('img'), lbCap = lb.querySelector('figcaption'), lbList = [], lbI = 0, tx = 0;
  function showLB(i) {
    lbI = (i + lbList.length) % lbList.length; lbImg.src = lbList[lbI]; lbImg.alt = cur.title + ' image ' + (lbI + 1);
    lbCap.textContent = cur.title + ' · ' + (lbI + 1) + ' / ' + lbList.length; lb.classList.toggle('single', lbList.length < 2);
  }
  lb.addEventListener('click', function (e) {
    if (e.target.closest('.lb-prev')) showLB(lbI - 1);
    else if (e.target.closest('.lb-next')) showLB(lbI + 1);
    else if (e.target.closest('.lb-close') || e.target === lb || e.target.tagName === 'FIGURE') lb.close();
  });
  lb.addEventListener('keydown', function (e) { if (e.key === 'ArrowLeft') showLB(lbI - 1); if (e.key === 'ArrowRight') showLB(lbI + 1); });
  lb.addEventListener('touchstart', function (e) { tx = e.changedTouches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) { var dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 50) showLB(lbI + (dx < 0 ? 1 : -1)); }, { passive: true });

  root.innerHTML = (D.featured ? featured(D.featured) : '') + (D.groups || []).map(group).join('');
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-thumb]'), o = e.target.closest('[data-open]'), b = e.target.closest('[data-project]');
    if (t && cur) {
      var g = t.closest('.gallery'), i = +t.dataset.thumb, m = g.querySelector('.main');
      m.dataset.open = i; m.querySelector('img').src = shots(cur)[i];
      g.querySelectorAll('.thumbs button').forEach(function (x) { x.classList.toggle('on', x === t); }); return;
    }
    if (o && cur) { lbList = shots(cur); showLB(+o.dataset.open); lb.showModal(); return; }
    if (!b || !P[b.dataset.project]) return;
    cur = P[b.dataset.project]; body.innerHTML = detail(cur); dlg.showModal();
  });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('close', function () { if (!dlg.open) body.innerHTML = ''; });
})();
