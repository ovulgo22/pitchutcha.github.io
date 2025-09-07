// Tema light/dark
(function() {
  const btn = document.getElementById("theme-toggle");
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

// Ativa highlight na sidebar/nav do link atual
(function() {
  function setActiveLinks() {
    const loc = window.location.pathname.split('/').pop() || "index.html";
    document.querySelectorAll('.sidebar a, .header-nav a').forEach(a => {
      if (a.getAttribute('href') === loc) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'page');
      } else {
        a.classList.remove('active');
        a.removeAttribute('aria-current');
      }
    });
  }
  setActiveLinks();
})();

// Scrollspy e TOC
(function() {
  function buildTOC() {
    const toc = document.getElementById('toc');
    if (!toc) return;
    const headers = Array.from(document.querySelectorAll('.docs-content h1, .docs-content h2'));
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
  }
  document.addEventListener('DOMContentLoaded', buildTOC);
})();

// Busca instantânea (mock)
(function() {
  const docsIndex = [
    { title: "Bem-vindo à documentação", href: "index.html", content: "Documentação estilo GitHub Docs, HTML/JS/CSS puro." },
    { title: "Introdução", href: "introducao.html", content: "Visão geral e motivações do projeto." },
    { title: "Primeiros Passos", href: "primeiros-passos.html", content: "Como começar rapidamente." },
    { title: "Componentes", href: "componentes.html", content: "Catálogo de componentes reutilizáveis." },
    { title: "Botão", href: "componentes-botao.html", content: "Detalhes do componente botão." }
  ];
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
      d.title.toLowerCase().includes(q) || d.content.toLowerCase().includes(q)
    );
    if (found.length === 0) {
      results.innerHTML = '<span style="padding:1em;display:block;color:var(--color-muted)">Nenhum resultado encontrado.</span>';
    } else {
      found.forEach(doc => {
        let a = document.createElement('a');
        a.href = doc.href;
        a.innerHTML = `<strong>${doc.title}</strong><br><span style="font-size:0.92em;color:var(--color-muted)">${doc.content}</span>`;
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
  });
  document.addEventListener('click', e => {
    if (!results.contains(e.target) && e.target !== searchBox) {
      results.classList.remove('show');
    }
  });
})();