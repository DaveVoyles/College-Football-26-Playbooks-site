(() => {
  const root = (document.body?.dataset?.navRoot || '.').replace(/\/$/, '');
  const links = [
    { href: `${root}/visualizations/webgl-coverage.html`, label: 'Coverage Shell Viewer' },
    { href: `${root}/visualizations/webgl-team-map.html`, label: 'Team Conference Map' },
  ];

  const nav = document.createElement('nav');
  nav.className = 'site-nav';
  nav.innerHTML = `
    <div class="site-nav__inner">
      <a class="site-nav__brand" href="${root}/visualizations/webgl-coverage.html">
        <span class="site-nav__badge">🏈</span>
        <span>CFB26 Visualizations</span>
      </a>
      <div class="site-nav__links">
        ${links
          .map(
            (link) =>
              `<a class="site-nav__link" href="${link.href}" data-nav-link="${link.label}">${link.label}</a>`,
          )
          .join('')}
      </div>
    </div>
  `;

  document.body.prepend(nav);
  const current = window.location.pathname.split('/').pop();
  nav.querySelectorAll('[data-nav-link]').forEach((anchor) => {
    if (anchor.getAttribute('href')?.endsWith(current)) {
      anchor.setAttribute('aria-current', 'page');
    }
  });
})();
