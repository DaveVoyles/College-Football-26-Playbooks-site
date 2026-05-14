(() => {
  const root = (document.body?.dataset?.navRoot || '.').replace(/\/$/, '');

  const groups = [
    {
      label: 'Scheme Guides',
      links: [
        { href: `${root}/air-raid.html`, label: 'Air Raid' },
        { href: `${root}/pro-style.html`, label: 'Pro Style' },
        { href: `${root}/spread.html`, label: 'Spread' },
        { href: `${root}/west-coast.html`, label: 'West Coast' },
        { href: `${root}/run-and-shoot.html`, label: 'Run & Shoot' },
        { href: `${root}/veer-and-shoot.html`, label: 'Veer & Shoot' },
        { href: `${root}/option.html`, label: 'Option' },
      ],
    },
    {
      label: 'Reference',
      links: [
        { href: `${root}/teams.html`, label: 'Teams Guide' },
        { href: `${root}/routes.html`, label: 'Route Concepts' },
        { href: `${root}/call-sheet.html`, label: 'Call Sheet' },
      ],
    },
    {
      label: '3D Visualizations',
      links: [
        { href: `${root}/visualizations/webgl-formations.html`, label: 'Formations' },
        { href: `${root}/visualizations/webgl-route-tree.html`, label: 'Route Tree' },
        { href: `${root}/visualizations/webgl-coverage.html`, label: 'Coverage Shells' },
        { href: `${root}/visualizations/webgl-play-concepts.html`, label: 'Play Concepts' },
        { href: `${root}/visualizations/webgl-blitz.html`, label: 'Blitz & Pressure' },
        { href: `${root}/visualizations/webgl-run-plays.html`, label: 'Run Plays' },
        { href: `${root}/visualizations/webgl-pre-snap.html`, label: 'Pre-Snap Trainer' },
      ],
    },
  ];

  const nav = document.createElement('nav');
  nav.className = 'site-nav';
  nav.setAttribute('aria-label', 'Site navigation');

  const groupsHTML = groups
    .map(
      (group) => `
      <div class="site-nav__group">
        <span class="site-nav__group-label">${group.label}</span>
        <div class="site-nav__group-links">
          ${group.links.map((l) => `<a class="site-nav__link" href="${l.href}">${l.label}</a>`).join('')}
        </div>
      </div>`
    )
    .join('');

  nav.innerHTML = `
    <div class="site-nav__inner">
      <a class="site-nav__brand" href="${root}/index.html">
        <span class="site-nav__badge">🏈</span>
        <span>CFB26 Playbook</span>
      </a>
      <button class="site-nav__toggle" aria-expanded="false" aria-controls="site-nav-menu" aria-label="Open menu">
        <span class="site-nav__hamburger"></span>
      </button>
      <div class="site-nav__menu" id="site-nav-menu" hidden>
        ${groupsHTML}
      </div>
    </div>
  `;

  document.body.prepend(nav);

  // Hamburger toggle
  const toggle = nav.querySelector('.site-nav__toggle');
  const menu = nav.querySelector('.site-nav__menu');

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    toggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
    menu.hidden = open;
  });

  // Close menu on link click
  menu.addEventListener('click', (e) => {
    if (e.target.closest('.site-nav__link')) {
      toggle.setAttribute('aria-expanded', 'false');
      menu.hidden = true;
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) {
      toggle.setAttribute('aria-expanded', 'false');
      menu.hidden = true;
      toggle.focus();
    }
  });

  // Close when clicking outside the nav
  document.addEventListener('click', (e) => {
    if (!menu.hidden && !nav.contains(e.target)) {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      menu.hidden = true;
    }
  });

  // Mark current page
  const current = window.location.pathname.split('/').pop();
  nav.querySelectorAll('.site-nav__link').forEach((anchor) => {
    if (anchor.getAttribute('href')?.endsWith(current)) {
      anchor.setAttribute('aria-current', 'page');
    }
  });
})();
