// ---- Sidebar dinâmico via JSON ----
let NAV_CONFIG = [];
(function() {
  fetch('sidebar.json').then(r=>r.json()).then(nav => {
    NAV_CONFIG = nav;
    renderSidebar();
    renderBreadcrumbs();
  });

  function renderSidebar() {
    function createList(nav, currentHref) {
      let ul = document.createElement('ul');
      nav.forEach(item => {
        let li = document.createElement('li');
        let link = document.createElement('a');
        link.href = item.href;
        link.textContent = item.label;
        if (item.href === currentHref) {
          link.classList.add('active');
          link.setAttribute('aria-current', 'page');
        }
        li.appendChild(link);
        if (item.children && item.children.length) {
          let btn = document.createElement('button');
          btn.className = 'expand-btn';
          btn.setAttribute('aria-expanded', 'false');
          btn.innerHTML = '<span aria-hidden="true">▶</span>';
          li.insertBefore(btn, link);
          let sub = createList(item.children, currentHref);
          sub.className = 'submenu';
          sub.style.display = 'none';
          li.appendChild(sub);
          btn.onclick = function() {
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', String(!expanded));
            sub.style.display = expanded ? 'none' : 'block';
            btn.innerHTML = expanded
              ? '<span aria-hidden="true">▶</span>' : '<span aria-hidden="true">▼</span>';
            localStorage.setItem('sidebar-' + item.href, !expanded ? 'open' : 'closed');
          };
          const state = localStorage.getItem('sidebar-' + item.href);
          if (state === 'open' || (item.children.some(child => child.href === currentHref))) {
            btn.setAttribute('aria-expanded', 'true');
            btn.innerHTML = '<span aria-hidden="true">▼</span>';
            sub.style.display = 'block';
          }
        }
        ul.appendChild(li);
      });
      return ul;
    }
    const sidebar = document.querySelector('.sidebar ul');
    if (!sidebar) return;
    const loc = window.location.pathname.split('/').pop() || "index.html";
    sidebar.innerHTML = '';
    sidebar.appendChild(createList(NAV_CONFIG, loc));
  }

  window.renderSidebar = renderSidebar; // para recarregar se necessário
})();

// ---- Breadcrumbs automáticos baseados na sidebar ----
function renderBreadcrumbs() {
  function findTrail(nav, href, trail = []) {
    for (const item of nav) {
      if (item.href === href) return [...trail, item];
      if (item.children) {
        const found = findTrail(item.children, href, [...trail, item]);
        if (found.length) return found;
      }
    }
    return [];
  }
  const nav = document.querySelector('.breadcrumbs');
  if (!nav) return;
  const loc = window.location.pathname.split('/').pop() || "index.html";
  let trail = [{ label: "Início", href: "index.html" }];
  if (loc !== "index.html" && NAV_CONFIG.length) {
    const navTrail = findTrail(NAV_CONFIG, loc);
    if (navTrail.length) trail = [{ label: "Início", href: "index.html" }, ...navTrail];
  }
  nav.innerHTML = '';
  trail.forEach((item, i) => {
    if (i > 0) nav.innerHTML += `<span>/</span>`;
    nav.innerHTML += `<a href="${item.href}"${i === trail.length-1 ? ' aria-current="page"' : ''}>${item.label}</a>`;
  });
}

// ---- TOC dinâmico & Scrollspy inteligente ----
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const toc = document.getElementById('toc');
    if (!toc) return;
    toc.innerHTML = '';
    const headers = Array.from(document.querySelectorAll('.docs-content h1, .docs-content h2, .docs-content h3'));
    if (headers.length < 2) { toc.style.display = "none"; return; }
    let ul = document.createElement('ul');
    headers.forEach(h => {
      if (!h.id) return;
      let li = document.createElement('li');
      let a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.textContent;
      a.setAttribute('data-scrollspy', h.id);
      li.appendChild(a);
      ul.appendChild(li);
    });
    toc.appendChild(ul);
    toc.style.display = "block";
    // Scrollspy
    window.addEventListener('scroll', function() {
      let activeId = headers[0].id;
      for (const h of headers) {
        const rect = h.getBoundingClientRect();
        if (rect.top < 110) activeId = h.id;
      }
      toc.querySelectorAll('a[data-scrollspy]').forEach(a => {
        if (a.getAttribute('data-scrollspy') === activeId) a.classList.add('active');
        else a.classList.remove('active');
      });
    });
  });
})();

// ---- Busca instantânea (mock) ----
(function() {
  function flatNav(nav) {
    let arr = [];
    for (const item of nav) {
      arr.push({ title: item.label, href: item.href });
      if (item.children) arr = arr.concat(flatNav(item.children));
    }
    return arr;
  }
  let docsIndex = [];
  fetch('sidebar.json').then(r=>r.json()).then(nav => {
    docsIndex = [
      ...flatNav(nav),
      { title: "Bem-vindo à documentação", href: "index.html", content: "Documentação estilo GitHub Docs, HTML/JS/CSS puro." },
      { title: "Props do Botão", href: "componentes-botao.html", content: "Detalhes do componente botão." }
    ];
  });
  const searchBox = document.getElementById('search-box');
  const results = document.getElementById('search-results');
  if (!searchBox || !results) return;

  function showResults(q) {
    results.innerHTML = '';
    if (!q || q.length < 2) {
      results.classList.remove('show');
      return;
    }
    q = q.toLowerCase();
    const found = docsIndex.filter(d =>
      d.title.toLowerCase().includes(q) || (d.content && d.content.toLowerCase().includes(q))
    );
    if (found.length === 0) {
      results.innerHTML = '<span style="padding:1em;display:block;color:var(--color-muted)">Nenhum resultado encontrado.</span>';
    } else {
      found.forEach(doc => {
        let a = document.createElement('a');
        a.href = doc.href;
        a.innerHTML = `<strong>${doc.title}</strong>` + (doc.content ? `<br><span style="font-size:0.92em;color:var(--color-muted)">${doc.content}</span>` : '');
        results.appendChild(a);
      });
    }
    results.classList.add('show');
  }
  searchBox.addEventListener('input', e => showResults(searchBox.value));
  document.addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement !== searchBox) {
      e.preventDefault();
      searchBox.focus();
    }
    // Navegação por teclado nos resultados
    if (results.classList.contains('show') && ['ArrowDown','ArrowUp','Enter'].includes(e.key)) {
      let links = Array.from(results.querySelectorAll('a'));
      let active = links.findIndex(a => a === document.activeElement);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        (links[active+1] || links[0])?.focus();
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        (links[active-1] || links[links.length-1])?.focus();
      }
      if (e.key === 'Enter' && document.activeElement.tagName === 'A') {
        window.location = document.activeElement.getAttribute('href');
      }
    }
  });
  document.addEventListener('click', e => {
    if (!results.contains(e.target) && e.target !== searchBox) {
      results.classList.remove('show');
    }
  });
})();

// ---- Tema claro/escuro persistente ----
(function() {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  let theme = localStorage.getItem("theme") || (prefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);

  function setIcon() {
    btn.innerHTML = theme === "dark"
      ? '<svg width="22" height="22" aria-hidden="true"><circle cx="11" cy="11" r="5" stroke="currentColor" stroke-width="2"/><path d="M11 2v2m0 14v2m9-9h-2M4 11H2m15.07-6.07l-1.42 1.42M6.35 17.66l-1.42 1.42m12.02 0l-1.42-1.42M6.35 4.34L4.93 2.92" stroke="currentColor" stroke-width="2"/></svg>'
      : '<svg width="22" height="22" aria-hidden="true"><path d="M19 13A8 8 0 0 1 9 3a8 8 0 1 0 10 10z" fill="currentColor"/></svg>';
  }
  setIcon();
  btn.onclick = function() {
    theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    setIcon();
  };
})();