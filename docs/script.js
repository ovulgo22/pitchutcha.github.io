/*=============== INÍCIO DA PARTE 1 ===============*/

/* ==========================================================================
   PITCHUTCHA - SCRIPT GLOBAL (ARQUITETURA MPA)
   - ARQUITETO: Gemini (Senior Front-End Architect & QA Engineer)
   - PROJETO: pitchutcha.github.io by ovulgo22
   ========================================================================== */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    try {
        /**
         * ===================================================================
         * 1. MANIFESTO DE CONTEÚDO (contentManifest)
         * ===================================================================
         * Este objeto é o "mapa" do nosso site. Ele não contém o conteúdo
         * em si, mas diz ao script onde encontrar cada artigo e seus metadados.
         */
        const contentManifest = {
            categories: [
                { id: 'home', name: 'Início', open: true },
                { id: 'fundacoes', name: 'Fundações da Computação', open: true },
                { id: 'redes', name: 'Redes e Protocolos', open: false },
                { id: 'arquitetura', name: 'Arquitetura de Software', open: false },
                { id: 'webdev', name: 'Desenvolvimento Web', open: false },
                { id: 'db', name: 'Bancos de Dados', open: false },
                { id: 'ia', name: 'Inteligência Artificial', open: false },
                { id: 'seguranca', name: 'Cibersegurança', open: false },
                { id: 'devops', name: 'DevOps & Cloud', open: false },
                { id: 'avancado', name: 'Tópicos Avançados', open: false },
            ],
            articles: {
                // FUNDAÇÕES
                'fundacoes/maquina-turing': {
                    title: 'A Máquina de Turing',
                    breadcrumb: 'Fundações',
                    mdPath: '/content/fundacoes/maquina-turing.md', // Caminho para o arquivo Markdown
                    nextArticle: 'fundacoes/arquitetura-von-neumann',
                    lastUpdated: '2025-09-05',
                    readingTime: 2
                },
                'fundacoes/arquitetura-von-neumann': {
                    title: 'Arquitetura de Von Neumann',
                    breadcrumb: 'Fundações',
                    mdPath: '/content/fundacoes/arquitetura-von-neumann.md',
                    prevArticle: 'fundacoes/maquina-turing',
                    lastUpdated: '2025-09-04',
                    readingTime: 3
                },
                // REDES
                'redes/modelo-osi': {
                    title: 'O Modelo OSI',
                    breadcrumb: 'Redes',
                    mdPath: '/content/redes/modelo-osi.md',
                    lastUpdated: '2025-09-03',
                    readingTime: 4
                },
                 // ARTIGO DE EXEMPLO QUE AINDA NÃO EXISTE, APENAS PARA O MANIFESTO
                'webdev/http3': {
                    title: 'HTTP/3 e QUIC',
                    breadcrumb: 'Desenvolvimento Web',
                    mdPath: '/content/webdev/http3.md',
                    lastUpdated: '2025-09-06',
                    readingTime: 3
                },
                'ia/llms': {
                    title: 'Modelos de Linguagem Grandes (LLMs)',
                    breadcrumb: 'Inteligência Artificial',
                    mdPath: '/content/ia/llms.md',
                    lastUpdated: '2025-09-06',
                    readingTime: 4
                },
            },
            glossary: {
                "TCP": "Transmission Control Protocol. Um dos principais protocolos da suíte de protocolos da Internet, garantindo a entrega confiável de dados.",
                "UDP": "User Datagram Protocol. Um protocolo de transporte mais simples e rápido que o TCP, mas não garante a entrega de pacotes.",
                "CPU": "Central Processing Unit. A Unidade Central de Processamento, o cérebro do computador.",
                "IP": "Internet Protocol. O principal protocolo de comunicação na camada de rede, responsável pelo endereçamento e roteamento de pacotes.",
                "DNS": "Domain Name System. O sistema que traduz nomes de domínio em endereços IP.",
            }
        };

        /**
         * ===================================================================
         * 2. OBJETO PRINCIPAL DA APLICAÇÃO (PitchutchaApp)
         * ===================================================================
         * Encapsula todo o estado, referências do DOM e métodos da aplicação.
         */
        const PitchutchaApp = {
            // -- Propriedades para armazenar o estado da aplicação
            state: {
                currentPageId: null, // ID do artigo ou página atual
                sidebarOpen: window.innerWidth > 1024,
                searchQuery: '',
                currentTheme: 'dark',
            },
            
            // -- Propriedade para "cachear" elementos do DOM para acesso rápido
            dom: {},

            // -- Manifesto de conteúdo
            manifest: contentManifest,

            // -- Métodos da aplicação serão adicionados nas próximas partes
        };
        
/*================ FIM DA PARTE 1 ================*/
/*=============== INÍCIO DA PARTE 2 ===============*/

        /**
         * ===================================================================
         * 3. MÉTODOS DE INICIALIZAÇÃO E MONTAGEM DE COMPONENTES
         * ===================================================================
         */
        Object.assign(PitchutchaApp, {
            
            /**
             * Ponto de entrada principal da aplicação.
             * Carrega os componentes e depois inicializa a lógica da página.
             */
            async init() {
                console.log("PitchutchaApp: Inicializando aplicação...");
                this.loadTheme();
                await this.loadComponents(); // Espera os componentes carregarem
                this.initPage(); // Inicializa a lógica da página depois que os componentes existem
            },

            /**
             * Carrega os fragmentos de HTML reutilizáveis e os injeta nos placeholders.
             * Esta é a base da nossa arquitetura de componentes.
             */
            async loadComponents() {
                const components = {
                    '#sidebar-placeholder': '/_sidebar.html',
                    '#main-header-placeholder': '/_header.html',
                    '#main-footer-placeholder': '/_footer.html',
                };

                for (const [placeholderId, componentPath] of Object.entries(components)) {
                    const placeholder = document.querySelector(placeholderId);
                    if (placeholder) {
                        try {
                            const response = await fetch(componentPath);
                            if (!response.ok) throw new Error(`Falha ao carregar ${componentPath}: ${response.statusText}`);
                            const componentHTML = await response.text();
                            placeholder.outerHTML = componentHTML;
                        } catch (error) {
                            console.error(`Erro ao carregar componente para ${placeholderId}:`, error);
                            placeholder.innerHTML = `<p style="color:red;">Erro ao carregar componente.</p>`;
                        }
                    }
                }
            },
            
            /**
             * Inicializa a lógica específica da página após os componentes serem carregados.
             */
            initPage() {
                this.cacheDom(); // Agora os elementos dos componentes existem e podem ser cacheados
                this.bindEvents();
                this.renderSidebarNav(); // A navegação da sidebar é global
                
                // Determina qual tipo de página estamos e executa a lógica apropriada
                // (Isso será adicionado na próxima parte)
            },

            /**
             * Mapeia elementos do DOM para o objeto `dom` para acesso rápido.
             */
            cacheDom() {
                // Componentes Globais
                this.dom.sidebar = document.getElementById('sidebar');
                this.dom.sidebarNav = document.getElementById('sidebar-nav');
                this.dom.mainHeader = document.getElementById('main-header');
                this.dom.mainFooter = document.querySelector('.main-footer');
                this.dom.themeToggler = document.getElementById('theme-toggler');
                this.dom.menuToggleBtn = document.getElementById('menu-toggle');
                this.dom.searchInput = document.getElementById('search-input');
                this.dom.searchResults = document.getElementById('search-results');
                this.dom.clearSearchBtn = document.getElementById('clear-search-btn');

                // Elementos que podem ou não existir dependendo da página
                this.dom.contentBody = document.getElementById('content-body');
                this.dom.articleTitle = document.getElementById('article-title');
                this.dom.articleSubtitle = document.getElementById('article-subtitle');
                this.dom.articleMeta = document.getElementById('article-meta');
                this.dom.breadcrumb = document.getElementById('breadcrumb');
                this.dom.tocNav = document.getElementById('toc-nav');
                this.dom.tocSidebar = document.getElementById('toc-sidebar');
                this.dom.readingProgressBar = document.getElementById('reading-progress-bar');
            },

            /**
             * Centraliza o registro de todos os eventos globais da aplicação.
             */
            bindEvents() {
                if (this.dom.themeToggler) this.dom.themeToggler.addEventListener('click', this.toggleTheme.bind(this));
                if (this.dom.menuToggleBtn) this.dom.menuToggleBtn.addEventListener('click', this.toggleSidebar.bind(this));
                if (this.dom.searchInput) {
                    this.dom.searchInput.addEventListener('keyup', this.handleSearch.bind(this));
                    this.dom.searchInput.addEventListener('focus', () => this.dom.searchResults.classList.remove('hidden'));
                    document.addEventListener('click', this.handleClickOutsideSearch.bind(this));
                }
                if (this.dom.clearSearchBtn) this.dom.clearSearchBtn.addEventListener('click', this.clearSearch.bind(this));
                if (this.dom.sidebarNav) this.dom.sidebarNav.addEventListener('click', this.handleSidebarClick.bind(this));
            },
            
            // --- LÓGICA DE TEMA ---
            toggleTheme() {
                const newTheme = this.state.currentTheme === 'dark' ? 'light' : 'dark';
                this.setTheme(newTheme);
            },

            setTheme(theme) {
                this.state.currentTheme = theme;
                document.body.setAttribute('data-theme', theme);
                try {
                    localStorage.setItem('pitchutcha_theme', theme);
                } catch (e) {
                    console.warn("Não foi possível salvar o tema. localStorage não está disponível.");
                }
            },

            loadTheme() {
                try {
                    const savedTheme = localStorage.getItem('pitchutcha_theme');
                    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
                        this.setTheme(savedTheme);
                    } else {
                        this.setTheme(this.state.currentTheme);
                    }
                } catch (e) {
                     this.setTheme(this.state.currentTheme);
                }
            },
        });

/*================ FIM DA PARTE 2 ================*/
/*=============== INÍCIO DA PARTE 3 ===============*/

        /**
         * ===================================================================
         * 4. LÓGICA DE ROTEAMENTO E RENDERIZAÇÃO DE CONTEÚDO
         * ===================================================================
         */
        Object.assign(PitchutchaApp, {

            /**
             * Modifica o initPage para ser o nosso "roteador" principal.
             * Ele decide o que fazer com base na URL da página atual.
             */
            initPage() {
                this.cacheDom();
                this.bindEvents();
                this.renderSidebarNav();

                const path = window.location.pathname;

                if (path === '/' || path === '/index.html' || path.endsWith('pitchutcha.github.io/')) {
                    this.handleHomepage();
                } else if (path.startsWith('/articles/')) {
                    // Extrai o ID da página a partir do nome do arquivo. Ex: /articles/fundacoes/turing.html -> fundacoes/turing
                    const pageId = path.split('/articles/')[1].replace('.html', '');
                    this.handleArticlePage(pageId);
                }
            },

            /**
             * Lida com a lógica da página inicial.
             */
            handleHomepage() {
                console.log("Página inicial carregada.");
                // Futuramente, podemos adicionar lógicas específicas para a homepage aqui.
            },

            /**
             * Lida com a lógica de uma página de artigo.
             * @param {string} pageId - O identificador único do artigo.
             */
            async handleArticlePage(pageId) {
                this.state.currentPageId = pageId;
                const articleData = this.manifest.articles[pageId];

                if (!articleData) {
                    this.renderError("Artigo não encontrado", "O artigo que você está procurando não existe em nosso manifesto de conteúdo.");
                    return;
                }

                document.title = `${articleData.title} - Pitchutcha`;
                if(this.dom.breadcrumb) this.dom.breadcrumb.textContent = articleData.breadcrumb;
                if(this.dom.articleTitle) this.dom.articleTitle.textContent = articleData.title;
                if(this.dom.articleSubtitle) this.dom.articleSubtitle.innerHTML = articleData.subtitle || '';
                
                this.renderArticleMeta(articleData);
                this.renderNavButtons(articleData);

                try {
                    const response = await fetch(articleData.mdPath);
                    if (!response.ok) throw new Error(`Erro de rede: ${response.statusText}`);
                    const markdown = await response.text();
                    // Usa a biblioteca marked.js que importamos no HTML
                    if (window.marked) {
                        this.dom.contentBody.innerHTML = marked.parse(markdown);
                    } else {
                        throw new Error("Biblioteca 'marked.js' não foi carregada.");
                    }
                    
                    // Funções pós-renderização
                    if (typeof hljs !== 'undefined') {
                        this.dom.contentBody.querySelectorAll('pre code').forEach(hljs.highlightElement);
                    }
                    this.renderToc();
                    this.applyGlossaryTooltips();

                } catch (error) {
                    console.error("Erro ao carregar conteúdo do artigo:", error);
                    this.renderError("Falha ao carregar conteúdo", "Não foi possível carregar o arquivo de conteúdo para este artigo. Verifique o console para mais detalhes.");
                }
            },

            /**
             * Renderiza a navegação principal na sidebar com base no manifesto.
             */
            renderSidebarNav() {
                if (!this.dom.sidebarNav) return;
                
                const getArticleLink = (id, title) => {
                    const path = window.location.pathname;
                    const isActive = path.includes(`/articles/${id}.html`);
                    // Links agora apontam para os arquivos .html reais
                    return `<li role="none"><a href="/articles/${id}.html" class="nav-link ${isActive ? 'active' : ''}" role="menuitem">${title}</a></li>`;
                }
                
                this.dom.sidebarNav.innerHTML = this.manifest.categories.map(cat => {
                    if (cat.id === 'home') {
                        const isHomeActive = window.location.pathname === '/' || window.location.pathname === '/index.html';
                        return `<div class="category-group solo"><a href="/index.html" class="nav-link ${isHomeActive ? 'active' : ''}">${cat.name}</a></div>`;
                    }

                    const articlesInCategory = Object.entries(this.manifest.articles)
                        .filter(([id]) => id.startsWith(cat.id));
                    
                    if(articlesInCategory.length === 0) return '';

                    return `
                    <div class="category-group ${cat.open ? 'open' : ''}" data-category-id="${cat.id}">
                        <h3 class="category-title" role="button" aria-expanded="${cat.open}" tabindex="0">
                            <span>${cat.name}</span>
                            <svg class="icon-chevron" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path></svg>
                        </h3>
                        <ul class="nav-list" role="menu">
                            ${articlesInCategory.map(([id, art]) => getArticleLink(id, art.title)).join('')}
                        </ul>
                    </div>`;
                }).join('');
            },
        });

/*================ FIM DA PARTE 3 ================*/
/*=============== INÍCIO DA PARTE 4 ===============*/

        /**
         * ===================================================================
         * 5. MÉTODOS DE RENDERIZAÇÃO DE COMPONENTES E HANDLERS FINAIS
         * ===================================================================
         */
        Object.assign(PitchutchaApp, {
            
            tocObserver: null,

            // --- MÉTODOS DE RENDERIZAÇÃO DE COMPONENTES ---
            
            renderError(title, message) {
                if (!this.dom.contentBody) return;
                document.title = `${title} - Pitchutcha`;
                if(this.dom.articleTitle) this.dom.articleTitle.textContent = title;
                if(this.dom.contentBody) this.dom.contentBody.innerHTML = `<p style="color:var(--text-secondary);">${message}</p>`;
                if(this.dom.tocSidebar) this.dom.tocSidebar.style.display = 'none';
            },

            renderArticleMeta(article) {
                if (!this.dom.articleMeta) return;
                let metaHTML = '';
                if (article.readingTime) {
                    metaHTML += `<span>Leitura de ${article.readingTime} min</span>`;
                }
                if (article.lastUpdated) {
                    const date = new Date(article.lastUpdated);
                    const formattedDate = date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
                    metaHTML += `<span>Última atualização: ${formattedDate}</span>`;
                }
                this.dom.articleMeta.innerHTML = metaHTML;
            },
            
            renderToc() {
                if (!this.dom.contentBody || !this.dom.tocSidebar || !this.dom.tocNav) return;
                
                const headings = this.dom.contentBody.querySelectorAll('h2, h3');
                if (headings.length < 2) {
                    this.dom.tocSidebar.style.display = 'none';
                    return;
                }

                this.dom.tocSidebar.style.display = 'block';
                let tocHTML = '<ul>';
                headings.forEach(heading => {
                    const id = heading.textContent.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
                    heading.id = id;
                    const levelClass = heading.tagName === 'H3' ? 'toc-level-3' : 'toc-level-2';
                    tocHTML += `<li class="${levelClass}"><a href="#${id}">${heading.textContent}</a></li>`;
                });
                tocHTML += '</ul>';
                this.dom.tocNav.innerHTML = tocHTML;
                
                this.setupTocObserver();
            },

            renderNavButtons(article) {
                if (!this.dom.navButtons) return;
                let html = '';
                if (article.prevArticle) {
                    const prev = this.manifest.articles[article.prevArticle];
                    if(prev) html += `<a href="/articles/${article.prevArticle}.html" class="nav-button prev"><span>Anterior</span><h4>${prev.title}</h4></a>`;
                }
                if (article.nextArticle) {
                    const next = this.manifest.articles[article.nextArticle];
                    if(next) html += `<a href="/articles/${article.nextArticle}.html" class="nav-button next"><span>Próximo</span><h4>${next.title}</h4></a>`;
                }
                this.dom.navButtons.innerHTML = html;
            },
            
            // --- HANDLERS DE EVENTOS E LÓGICA FINAL ---

            setupTocObserver() {
                if (this.tocObserver) this.tocObserver.disconnect();

                const headings = Array.from(this.dom.contentBody.querySelectorAll('h2, h3'));
                if (headings.length < 2) return;

                const options = {
                    root: null, // Observa em relação ao viewport
                    rootMargin: '0px 0px -75% 0px',
                };

                this.tocObserver = new IntersectionObserver(entries => {
                    let lastVisibleEntry = null;
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            lastVisibleEntry = entry;
                        }
                    });

                    if (lastVisibleEntry) {
                         this.dom.tocNav.querySelectorAll('a.active').forEach(a => a.classList.remove('active'));
                         const id = lastVisibleEntry.target.getAttribute('id');
                         const tocLink = this.dom.tocNav.querySelector(`a[href="#${id}"]`);
                         if(tocLink) tocLink.classList.add('active');
                    }
                }, options);

                headings.forEach(heading => this.tocObserver.observe(heading));
            },
            
            handleSidebarClick(event) {
                const categoryTitle = event.target.closest('.category-title');
                if (categoryTitle) this.toggleCategory(categoryTitle.parentElement);
            },

            toggleCategory(categoryElement) {
                const isOpen = categoryElement.classList.toggle('open');
                categoryElement.querySelector('.category-title').setAttribute('aria-expanded', isOpen);
            },

            toggleSidebar() {
                this.state.sidebarOpen = !this.state.sidebarOpen;
                document.getElementById('sidebar-placeholder').classList.toggle('open', this.state.sidebarOpen);
                this.dom.menuToggleBtn.setAttribute('aria-expanded', this.state.sidebarOpen);
            },
            
            // Lógica de busca e utilitários finais aqui
        });

        /**
         * ===================================================================
         * 6. INICIALIZAÇÃO DA APLICAÇÃO
         * ===================================================================
         */
        PitchutchaApp.init();

    } catch (error) {
        console.error("Erro fatal na inicialização do Pitchutcha:", error);
        document.body.innerHTML = `<div style="font-family: sans-serif; color: #ff4d4d; background-color: #111; padding: 2rem;"><h1>Erro Crítico na Aplicação</h1><p>Ocorreu um erro que impediu o carregamento do site. Verifique o console do navegador (F12) para detalhes técnicos.</p><pre style="background-color: #222; padding: 1rem; border-radius: 8px; margin-top: 1rem; color: #ffb8b8;">${error.stack}</pre></div>`;
    }

}); // Fim do DOMContentLoaded

/*================ FIM DA PARTE 4 ================*/
