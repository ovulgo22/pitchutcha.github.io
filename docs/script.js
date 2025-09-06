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
                    description: 'Entenda o modelo matemático abstrato que define uma máquina teórica capaz de simular qualquer algoritmo de computador.',
                    mdPath: '/content/fundacoes/maquina-turing.md', // Caminho para o arquivo Markdown
                    nextArticle: 'fundacoes/arquitetura-von-neumann',
                    lastUpdated: '2025-09-05',
                    readingTime: 2
                },
                'fundacoes/arquitetura-von-neumann': {
                    title: 'Arquitetura de Von Neumann',
                    breadcrumb: 'Fundações',
                    description: 'Conheça a arquitetura de computador que usa uma única estrutura de armazenamento para instruções e dados, a base dos computadores modernos.',
                    mdPath: '/content/fundacoes/arquitetura-von-neumann.md',
                    prevArticle: 'fundacoes/maquina-turing',
                    lastUpdated: '2025-09-04',
                    readingTime: 3
                },
                // REDES
                'redes/modelo-osi': {
                    title: 'O Modelo OSI',
                    breadcrumb: 'Redes',
                    description: 'Aprenda sobre as sete camadas do modelo conceitual que padroniza as funções de um sistema de comunicação.',
                    mdPath: '/content/redes/modelo-osi.md',
                    lastUpdated: '2025-09-03',
                    readingTime: 4
                },
                 // ARTIGOS DE EXEMPLO QUE AINDA NÃO EXISTEM, APENAS PARA O MANIFESTO
                'webdev/http3': {
                    title: 'HTTP/3 e QUIC',
                    breadcrumb: 'Desenvolvimento Web',
                    description: 'Descubra o futuro dos protocolos da web e por que eles são mais rápidos e resilientes.',
                    mdPath: '/content/webdev/http3.md',
                    lastUpdated: '2025-09-06',
                    readingTime: 3
                },
                'ia/llms': {
                    title: 'Modelos de Linguagem Grandes (LLMs)',
                    breadcrumb: 'Inteligência Artificial',
                    description: 'Uma introdução à tecnologia por trás da IA generativa que alimenta assistentes como GPT e Gemini.',
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
                "Markdown": "Uma linguagem de marcação leve projetada para ser fácil de ler e escrever, frequentemente usada para formatação de texto na web."
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
/*=============== INÍCIO DA PARTE 2 (CORRIGIDA) ===============*/

        /**
         * ===================================================================
         * 3. MÉTODOS DE INICIALIZAÇÃO, DOM E EVENTOS GLOBAIS
         * ===================================================================
         */
        Object.assign(PitchutchaApp, {
            
            /**
             * Ponto de entrada principal da aplicação.
             */
            init() {
                console.log("PitchutchaApp: Inicializando aplicação...");
                this.loadTheme();
                this.cacheDom();
                this.bindEvents();
                this.initPageLogic(); // Roda a lógica específica da página atual
                console.log("PitchutchaApp: Aplicação pronta.");
            },
            
            /**
             * Mapeia elementos do DOM para o objeto `dom` para acesso rápido.
             */
            cacheDom() {
                // Componentes Globais
                this.dom.sidebar = document.getElementById('sidebar');
                this.dom.sidebarPlaceholder = document.getElementById('sidebar-placeholder'); // <-- CORREÇÃO ADICIONADA AQUI
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
                this.dom.mainContentGrid = document.querySelector('.main-content-grid');
            },

            /**
             * Centraliza o registro de todos os eventos globais da aplicação.
             */
            bindEvents() {
                if (this.dom.themeToggler) this.dom.themeToggler.addEventListener('click', this.toggleTheme.bind(this));
                if (this.dom.menuToggleBtn) this.dom.menuToggleBtn.addEventListener('click', this.toggleSidebar.bind(this));
                
                if (this.dom.searchInput) {
                    this.dom.searchInput.addEventListener('keyup', this.handleSearch.bind(this));
                    this.dom.searchInput.addEventListener('focus', () => {
                        if(this.dom.searchResults) this.dom.searchResults.classList.remove('hidden');
                    });
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
                    if (savedTheme && (savedTheme === 'light' || 'dark')) {
                        this.setTheme(savedTheme);
                    } else {
                        this.setTheme(this.state.currentTheme);
                    }
                } catch (e) {
                     this.setTheme(this.state.currentTheme);
                }
            },
        });

/*================ FIM DA PARTE 2 (CORRIGIDA) ================*/
/*=============== INÍCIO DA PARTE 3 ===============*/

        /**
         * ===================================================================
         * 4. LÓGICA DE PÁGINA E RENDERIZAÇÃO DE NAVEGAÇÃO
         * ===================================================================
         */
        Object.assign(PitchutchaApp, {

            /**
             * Roteador principal da aplicação. Determina a lógica a ser executada
             * com base no caminho da URL atual.
             */
            initPageLogic() {
                this.renderSidebarNav(); // A sidebar é renderizada em todas as páginas

                const path = window.location.pathname;
                const pageId = this.getIdFromPath(path);
                
                if (pageId) {
                    this.state.currentPageId = pageId;
                    this.handleArticlePage(pageId);
                } else {
                    this.handleHomepage();
                }
            },

            /**
             * Extrai o ID do artigo do caminho da URL.
             * Ex: /articles/fundacoes/maquina-turing.html -> fundacoes/maquina-turing
             */
            getIdFromPath(path) {
                if (path.startsWith('/articles/')) {
                    return path.split('/articles/')[1].replace('.html', '');
                }
                // Adicionado para funcionar em ambientes de subdiretório como o GitHub Pages
                if (path.includes('/articles/')) {
                    return path.split('/articles/')[1].replace('.html', '');
                }
                return null;
            },

            /**
             * Executa a lógica para a página inicial.
             */
            handleHomepage() {
                console.log("Lógica da Página Inicial executada.");
                // Lógica futura para a busca no "hero" pode ser adicionada aqui.
            },

            /**
             * Orquestra todas as funcionalidades dinâmicas de uma página de artigo.
             */
            handleArticlePage(pageId) {
                console.log(`Lógica da Página de Artigo executada para: ${pageId}`);
                if (!this.manifest.articles[pageId] || !this.dom.contentBody) return;

                const articleData = this.manifest.articles[pageId];

                // Adiciona um listener de scroll SOMENTE em páginas de artigo
                if (this.dom.mainContentGrid) {
                    this.dom.mainContentGrid.addEventListener('scroll', this.updateReadingProgress.bind(this));
                }

                this.renderArticleMeta(articleData);
                this.renderNavButtons(articleData);
                this.renderToc(); // Isso também chama setupTocObserver
                this.applyGlossaryTooltips();
            },

            /**
             * Renderiza a navegação principal na sidebar com base no manifesto.
             */
            renderSidebarNav() {
                if (!this.dom.sidebarNav) return;
                
                const getArticleLink = (id, title) => {
                    const currentId = this.getIdFromPath(window.location.pathname);
                    const isActive = id === currentId;
                    // Links agora apontam para os arquivos .html reais
                    return `<li role="none"><a href="/articles/${id}.html" class="nav-link ${isActive ? 'active' : ''}" role="menuitem">${title}</a></li>`;
                }
                
                this.dom.sidebarNav.innerHTML = this.manifest.categories.map(cat => {
                    const isHome = window.location.pathname === '/' || window.location.pathname.endsWith('/index.html');
                    
                    if (cat.id === 'home') {
                        return `<div class="category-group solo"><a href="/index.html" class="nav-link ${isHome ? 'active' : ''}">${cat.name}</a></div>`;
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
/*=============== INÍCIO DA PARTE 4 (CORRIGIDA) ===============*/

        /**
         * ===================================================================
         * 5. MÉTODOS DE SUPORTE, HANDLERS FINAIS E INICIALIZAÇÃO
         * ===================================================================
         */
        Object.assign(PitchutchaApp, {
            
            tocObserver: null,

            // --- MÉTODOS DE RENDERIZAÇÃO DE COMPONENTES ---
            
            renderArticleMeta(articleData) {
                if (!this.dom.articleMeta) return;
                let metaHTML = '';
                if (articleData.readingTime) {
                    metaHTML += `<span>Leitura de ${articleData.readingTime} min</span>`;
                }
                if (articleData.lastUpdated) {
                    const date = new Date(articleData.lastUpdated);
                    const formattedDate = date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
                    metaHTML += `<span>Última atualização: ${formattedDate}</span>`;
                }
                this.dom.articleMeta.innerHTML = metaHTML;
            },
            
            renderToc() {
                if (!this.dom.contentBody || !this.dom.tocSidebar || !this.dom.tocNav) return;
                
                const headings = this.dom.contentBody.querySelectorAll('h2, h3');
                if (headings.length < 1) {
                    this.dom.tocSidebar.style.display = 'none';
                    return;
                }

                this.dom.tocSidebar.style.display = 'block';
                let tocHTML = '<ul>';
                headings.forEach(heading => {
                    if(!heading.id) {
                       heading.id = heading.textContent.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
                    }
                    const levelClass = heading.tagName === 'H3' ? 'toc-level-3' : 'toc-level-2';
                    tocHTML += `<li class="${levelClass}"><a href="#${heading.id}">${heading.textContent}</a></li>`;
                });
                tocHTML += '</ul>';
                this.dom.tocNav.innerHTML = tocHTML;
                
                this.setupTocObserver();
            },

            renderNavButtons(articleData) {
                if (!this.dom.navButtons) return;
                let html = '';
                if (articleData.prevArticle) {
                    const prev = this.manifest.articles[articleData.prevArticle];
                    if(prev) html += `<a href="/articles/${articleData.prevArticle}.html" class="nav-button prev"><span>Anterior</span><h4>${prev.title}</h4></a>`;
                }
                if (articleData.nextArticle) {
                    const next = this.manifest.articles[articleData.nextArticle];
                    if(next) html += `<a href="/articles/${articleData.nextArticle}.html" class="nav-button next"><span>Próximo</span><h4>${next.title}</h4></a>`;
                }
                this.dom.navButtons.innerHTML = html;
            },

            renderSearchResults(results) {
                if (!this.dom.searchResults) return;
                if (results.length === 0) {
                    this.dom.searchResults.innerHTML = '<li class="no-results" role="option">Nenhum resultado encontrado.</li>';
                } else {
                    this.dom.searchResults.innerHTML = results.map(r => `<li role="option"><a href="/articles/${r.id}.html">${r.title}</a></li>`).join('');
                }
            },
            
            // --- HANDLERS DE EVENTOS E LÓGICA FINAL ---

            setupTocObserver() {
                if (this.tocObserver) this.tocObserver.disconnect();
                
                const headings = Array.from(this.dom.contentBody.querySelectorAll('h2, h3'));
                if (headings.length === 0 || !this.dom.mainContentGrid) return;

                const options = {
                    root: this.dom.mainContentGrid,
                    rootMargin: '0px 0px -80% 0px',
                };

                this.tocObserver = new IntersectionObserver(entries => {
                    entries.forEach(entry => {
                        const id = entry.target.getAttribute('id');
                        const tocLink = this.dom.tocNav.querySelector(`a[href="#${id}"]`);
                        if (tocLink) {
                            if (entry.isIntersecting) {
                                tocLink.classList.add('active');
                            } else {
                                tocLink.classList.remove('active');
                            }
                        }
                    });
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
                // ESTA É A FUNÇÃO CORRIGIDA
                if(!this.dom.sidebarPlaceholder) return; 
                this.state.sidebarOpen = !this.state.sidebarOpen;
                this.dom.sidebarPlaceholder.classList.toggle('open', this.state.sidebarOpen); 
                this.dom.menuToggleBtn.setAttribute('aria-expanded', this.state.sidebarOpen);
            },
            
            updateReadingProgress() {
                if(!this.dom.mainContentGrid || !document.getElementById('reading-progress-bar')) return;
                const scrollableHeight = this.dom.mainContentGrid.scrollHeight - this.dom.mainContentGrid.clientHeight;
                const scrollTop = this.dom.mainContentGrid.scrollTop;
                const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
                document.getElementById('reading-progress-bar').style.width = `${progress}%`;
            },
            
            handleSearch(event) {
                this.state.searchQuery = event.target.value.toLowerCase().trim();
                if (this.state.searchQuery.length > 1) {
                    if(this.dom.clearSearchBtn) this.dom.clearSearchBtn.classList.remove('hidden');
                    const results = Object.entries(this.manifest.articles)
                        .map(([id, article]) => ({ id, ...article }))
                        .filter(a => a.title.toLowerCase().includes(this.state.searchQuery));
                    this.renderSearchResults(results);
                } else {
                    this.clearSearch();
                }
            },
            
            clearSearch() {
                if(this.dom.searchInput) this.dom.searchInput.value = '';
                this.state.searchQuery = '';
                if(this.dom.searchResults) this.dom.searchResults.classList.add('hidden');
                if(this.dom.clearSearchBtn) this.dom.clearSearchBtn.classList.add('hidden');
            },

            handleClickOutsideSearch(event) {
                const searchContainer = this.dom.searchInput?.parentElement;
                if (searchContainer && !searchContainer.contains(event.target)) {
                    if(this.dom.searchResults) this.dom.searchResults.classList.add('hidden');
                }
            },

            applyGlossaryTooltips() {
                if(!this.dom.contentBody) return;
                // Lógica do glossário aqui
            }
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

/*================ FIM DA PARTE 4 (CORRIGIDA) ================*/
