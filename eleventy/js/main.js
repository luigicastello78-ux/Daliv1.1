(function () {
  'use strict';

  var LANGS = [
    { code: 'en', name: 'English' },
    { code: 'de', name: 'Deutsch' },
    { code: 'fr', name: 'Français' },
    { code: 'es', name: 'Español' },
    { code: 'sr', name: 'Srpski' },
    { code: 'bs', name: 'Bosanski' },
    { code: 'hr', name: 'Hrvatski' },
    { code: 'mk', name: 'Македонски' },
    { code: 'bg', name: 'Български' },
    { code: 'tr', name: 'Türkçe' }
  ];

  var LS_KEY = 'daliSoundLang';

  function lsGet() { try { return localStorage.getItem(LS_KEY); } catch (e) { return null; } }
  function lsSet(v) { try { localStorage.setItem(LS_KEY, v); } catch (e) {} }

  var stored = lsGet();
  var overlay = document.getElementById('lang-overlay');
  var langGrid = document.getElementById('lang-grid');
  var langToggle = document.getElementById('lang-toggle');
  var langMenu = document.getElementById('lang-menu');
  var langCodeEl = document.getElementById('lang-code');
  var logoLink = document.getElementById('logo-link');

  /* ── Language overlay ── */
  if (overlay) {
    overlay.style.display = stored ? 'none' : 'flex';
  }

  function setLang(code) {
    lsSet(code);
    if (langCodeEl) langCodeEl.textContent = code.toUpperCase();
    if (overlay) overlay.style.display = 'none';
    if (langMenu) langMenu.hidden = true;
  }

  if (stored && langCodeEl) langCodeEl.textContent = stored.toUpperCase();

  /* Populate overlay grid */
  if (langGrid) {
    langGrid.innerHTML = LANGS.map(function (l) {
      return '<button class="lang-card" data-code="' + l.code + '" type="button">'
        + '<span style="font-family:\'Sora\',sans-serif;font-weight:700;font-size:16px;">' + l.name + '</span>'
        + '<span style="font-size:11px;letter-spacing:.14em;color:#86868d;font-weight:600;">' + l.code.toUpperCase() + ' \u2192</span>'
        + '</button>';
    }).join('');

    langGrid.querySelectorAll('.lang-card').forEach(function (btn) {
      btn.addEventListener('click', function () { setLang(btn.dataset.code); });
    });
  }

  /* Populate nav dropdown */
  if (langMenu) {
    langMenu.innerHTML = LANGS.map(function (l) {
      return '<button class="lang-dropdown-btn" data-code="' + l.code + '" type="button">'
        + '<span>' + l.name + '</span>'
        + '<span style="font-size:11px;color:#86868d;letter-spacing:.1em;">' + l.code.toUpperCase() + '</span>'
        + '</button>';
    }).join('');

    langMenu.querySelectorAll('.lang-dropdown-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { setLang(btn.dataset.code); });
    });
  }

  if (langToggle && langMenu) {
    langToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      langMenu.hidden = !langMenu.hidden;
    });
    document.addEventListener('click', function () {
      if (langMenu) langMenu.hidden = true;
    });
  }

  /* Logo → reopen overlay */
  if (logoLink) {
    logoLink.addEventListener('click', function (e) {
      e.preventDefault();
      if (overlay) overlay.style.display = 'flex';
    });
  }

  /* ── Subcategory filter (category pages) ── */
  var filterBtns = document.querySelectorAll('[data-filter]');
  if (filterBtns.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var sub = btn.dataset.filter;
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        document.querySelectorAll('[data-subcat]').forEach(function (item) {
          item.style.display = (sub === 'all' || item.dataset.subcat === sub) ? '' : 'none';
        });
      });
    });
  }

})();
