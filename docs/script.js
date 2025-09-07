// Alternância de tema
const themeToggle = document.getElementById('themeToggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function setTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.textContent = '🌙';
    }
    localStorage.setItem('docs-theme', theme);
}

themeToggle.onclick = () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
};

window.onload = () => {
    const saved = localStorage.getItem('docs-theme');
    if (saved) {
        setTheme(saved);
    } else {
        setTheme(prefersDark ? 'dark' : 'light');
    }
    // Carregar página inicial
    loadPage(window.location.hash || "#home");
};

// Sidebar responsiva (mobile)
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('sidebar');
sidebarToggle.onclick = () => {
    sidebar.classList.toggle('open');
};

// SPA simples: carrega conteúdo de /pages/*.html
const mainContent = document.getElementById('main-content');
function loadPage(hash) {
    let page = hash.replace("#", "") || "home";
    fetch(`pages/${page}.html`)
        .then(resp => {
            if (!resp.ok) throw new Error("404");
            return resp.text();
        })
        .then(html => {
            mainContent.innerHTML = html;
            // Atualiza ativo na sidebar
            document.querySelectorAll('aside a').forEach(a => a.classList.remove('active'));
            let nav = document.getElementById('nav-' + page);
            if (nav) nav.classList.add('active');
            window.scrollTo(0,0);
        })
        .catch(() => {
            mainContent.innerHTML = `<h1>404</h1><p>Página não encontrada.</p>`;
        });
}

// Navegação SPA
window.addEventListener("hashchange", () => loadPage(window.location.hash));

// Fecha sidebar ao navegar em mobile
document.querySelectorAll('aside a').forEach(a => {
    a.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });
});
