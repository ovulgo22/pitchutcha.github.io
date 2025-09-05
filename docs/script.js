/*
====================================================================================
PROJETO: Pitchutcha (Versão Final Refatorada)
ARQUIVO: script.js
DESCRIÇÃO: Arquitetura central da Single Page Application (SPA).
           Inclui o banco de dados de conteúdo, o roteador e os renderizadores.
====================================================================================
*/

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    /**
     * ===================================================================
     * BANCO DE DADOS DE CONTEÚDO (appData)
     * ===================================================================
     * Todo o conteúdo do site vive aqui. Para adicionar uma nova página ou
     * seção, basta adicionar as informações neste objeto.
     */
    const appData = {
        // Definição das categorias para a sidebar
        categories: [
            { id: 'fundacoes', name: 'Fundações da Computação', open: true },
            { id: 'hardware', name: 'Hardware e Arquitetura', open: false },
            { id: 'so', name: 'Sistemas Operacionais', open: false },
            { id: 'redes', name: 'Redes de Computadores', open: false },
            { id: 'algoritmos', name: 'Algoritmos e Estruturas de Dados', open: false },
        ],
        // Todos os artigos, organizados por um ID único (categoria/arquivo)
        articles: {
            'introducao': {
                title: 'Bem-vindo ao Pitchutcha',
                breadcrumb: 'Início',
                subtitle: 'Uma enciclopédia aberta sobre a ciência da computação, desde os fundamentos teóricos até as tecnologias de ponta.',
                content: `
                    <p>Este projeto é um esforço colaborativo para documentar e explicar os conceitos que formam a base do nosso mundo digital. Navegue pelos tópicos na barra lateral para começar sua jornada.</p>
                    <div class="callout-box info">
                        <p><strong>Dica:</strong> Use a barra de pesquisa no topo para encontrar rapidamente o que você procura.</p>
                    </div>
                    <h2 id="comece-por-aqui">Comece por aqui</h2>
                    <p>Se você é novo no assunto, sugerimos começar por um dos nossos pilares de conteúdo:</p>
                    <div class="quick-nav-grid">
                        <a href="#fundacoes/pioneiros" class="card-link">
                            <div class="card">
                                <h3 class="card-title">Pioneiros da Computação</h3>
                                <p class="card-description">Conheça as mentes brilhantes como Ada Lovelace, Alan Turing e Grace Hopper.</p>
                            </div>
                        </a>
                        <a href="#hardware/cpu" class="card-link">
                            <div class="card">
                                <h3 class="card-title">Como funciona uma CPU</h3>
                                <p class="card-description">Mergulhe na arquitetura que alimenta todos os dispositivos modernos.</p>
                            </div>
                        </a>
                         <a href="#so/conceitos" class="card-link">
                            <div class="card">
                                <h3 class="card-title">Sistemas Operacionais</h3>
                                <p class="card-description">Descubra o software que gerencia todo o hardware do seu computador.</p>
                            </div>
                        </a>
                    </div>
                `,
                nextArticle: 'fundacoes/historia'
            },
            'fundacoes/historia': {
                title: 'História Antiga da Computação',
                breadcrumb: 'Fundações da Computação',
                content: `
                    <h2 id="o-abaco">O Ábaco</h2>
                    <p>Considerado um dos primeiros instrumentos de computação, o ábaco surgiu em civilizações antigas e permitia a realização de cálculos aritméticos de forma mecânica.</p>
                    <h2 id="mecanismo-de-anticitera">O Mecanismo de Anticitera</h2>
                    <p>Um dos artefatos mais fascinantes da antiguidade, este dispositivo grego é considerado o primeiro computador analógico conhecido, usado para prever posições astronômicas e eclipses.</p>
                `,
                prevArticle: 'introducao',
                nextArticle: 'fundacoes/pioneiros'
            },
            'fundacoes/pioneiros': {
                title: 'Pioneiros da Computação',
                breadcrumb: 'Fundações da Computação',
                content: `
                    <h2 id="charles-babbage">Charles Babbage</h2>
                    <p>Considerado o "pai do computador", Babbage projetou a Máquina Analítica, um dispositivo mecânico que continha os conceitos fundamentais de um computador moderno, como memória e uma unidade de processamento.</p>
                    <h2 id="ada-lovelace">Ada Lovelace</h2>
                    <p>Colaboradora de Babbage, Ada Lovelace é creditada como a primeira programadora da história. Ela escreveu algoritmos para a Máquina Analítica, prevendo que a máquina poderia ser usada para muito mais do que apenas cálculos.</p>
                    <h2 id="alan-turing">Alan Turing</h2>
                    <p>Um dos pais da ciência da computação, Turing formalizou os conceitos de algoritmo e computação com a Máquina de Turing. Seu trabalho foi fundamental para a quebra de códigos na Segunda Guerra Mundial e para o desenvolvimento da inteligência artificial.</p>
                `,
                prevArticle: 'fundacoes/historia',
                nextArticle: 'fundacoes/teoria'
            },
            // Adicionaremos mais artigos aqui...
        },
        glossary: {
            // Adicionaremos o glossário aqui...
        }
    };


    /**
     * ===================================================================
     * MÓDULO PRINCIPAL DA APLICAÇÃO (PitchutchaApp)
     * ===================================================================
     * Orquestra toda a aplicação, desde a renderização inicial até
     * o gerenciamento de rotas e eventos.
     */
    const PitchutchaApp = {
        // Elementos do DOM cacheados para performance
        elements: {
            mainContent: document.getElementById('main-content'),
            sidebarNav: document.getElementById('sidebar-nav'),
            tocNav: document.getElementById('toc-nav'),
            pageTitle: document.querySelector('title'),
            contentWrapper: document.getElementById('content-wrapper'),
        },

        // Ponto de entrada da aplicação
        init() {
            this.renderSidebar();
            this.handleRouteChange();

            // Ouve por mudanças na URL (cliques em links com #)
            window.addEventListener('hashchange', () => this.handleRouteChange());
            
            // Permite que links internos na página funcionem com o roteador
            this.elements.mainContent.addEventListener('click', (e) => {
                if (e.target.matches('.card-link, .card-link *')) {
                    const link = e.target.closest('.card-link');
                    if (link && link.getAttribute('href').startsWith('#')) {
                        e.preventDefault();
                        window.location.hash = link.getAttribute('href');
                    }
                }
            });

            console.log("Pitchutcha SPA Initialized.");
        },

        // Função principal que controla a navegação
        handleRouteChange() {
            const path = window.location.hash.slice(1) || 'introducao';
            this.loadArticle(path);
            this.updateActiveSidebarLink(path);
        },

        // Carrega e renderiza um artigo
        loadArticle(path) {
            const articleData = appData.articles[path];
            if (!articleData) {
                // TODO: Criar uma página de "Não encontrado" mais robusta
                this.elements.mainContent.innerHTML = '<h1>Artigo não encontrado</h1>';
                return;
            }

            // Animação de entrada
            this.elements.mainContent.classList.remove('is-loading');
            void this.elements.mainContent.offsetWidth; // Força o repaint para reiniciar a animação
            this.elements.mainContent.classList.add('is-loading');

            // Constrói o HTML do artigo
            let html = `
                <article class="content-article">
                    <header class="article-header">
                        <div class="breadcrumbs"><a href="#">Início</a> &rsaquo; ${articleData.breadcrumb}</div>
                        <h1 class="article-title" id="titulo-principal">${articleData.title}</h1>
                        ${articleData.subtitle ? `<p class="article-subtitle">${articleData.subtitle}</p>` : ''}
                    </header>
                    <section class="article-body">
                        ${articleData.content}
                    </section>
                </article>
                <footer class="article-footer">
                    <nav class="article-pagination" aria-label="Navegação de artigos">
                        ${this.createPaginationLink(articleData.prevArticle, 'prev')}
                        ${this.createPaginationLink(articleData.nextArticle, 'next')}
                    </nav>
                </footer>
            `;

            this.elements.mainContent.innerHTML = html;
            this.elements.pageTitle.textContent = `${articleData.title} - Pitchutcha`;
            this.renderTOC(this.elements.mainContent);
            this.elements.contentWrapper.scrollTop = 0; // Rola para o topo ao carregar
        },

        // Renderiza a barra de navegação lateral (Sidebar)
        renderSidebar() {
            let html = '<ul class="nav-list">';
            // Link fixo para a introdução
            html += `<li class="nav-item"><a href="#" data-path="introducao" class="nav-link">Introdução</a></li>`;

            appData.categories.forEach(cat => {
                html += `
                    <li class="nav-item">
                        <details ${cat.open ? 'open' : ''}>
                            <summary class="nav-summary">${cat.name}</summary>
                            <ul class="nav-sublist">
                `;
                // Encontra todos os artigos que pertencem a esta categoria
                for (const path in appData.articles) {
                    if (path.startsWith(cat.id + '/')) {
                        const article = appData.articles[path];
                        html += `<li><a href="#${path}" data-path="${path}" class="nav-link">${article.title}</a></li>`;
                    }
                }
                html += `</ul></details></li>`;
            });

            html += '</ul>';
            this.elements.sidebarNav.innerHTML = html;
        },

        // Renderiza o Sumário (Table of Contents) da página atual
        renderTOC(contentElement) {
            const headings = contentElement.querySelectorAll('h2[id]');
            if (headings.length === 0) {
                this.elements.tocNav.innerHTML = '';
                return;
            }
            
            let html = `
                <h2 id="toc-heading" class="toc-heading">Nesta Página</h2>
                <ul class="toc-list">
            `;
            headings.forEach(h => {
                html += `<li><a href="#${h.id}" class="toc-link">${h.textContent}</a></li>`;
            });
            html += '</ul>';
            this.elements.tocNav.innerHTML = html;
        },

        // Atualiza qual link está 'ativo' na sidebar
        updateActiveSidebarLink(path) {
            this.elements.sidebarNav.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-path') === path) {
                    link.classList.add('active');
                    // Abre o <details> pai, se estiver fechado
                    const details = link.closest('details');
                    if (details && !details.hasAttribute('open')) {
                        details.setAttribute('open', '');
                    }
                }
            });
        },

        // Helper para criar os links de paginação (anterior/próximo)
        createPaginationLink(path, type) {
            if (!path || !appData.articles[path]) return '';
            const article = appData.articles[path];
            const isNext = type === 'next';
            return `
                <a href="#${path}" class="pagination-link ${isNext ? 'next' : ''}">
                    <span class="pagination-label">${isNext ? 'Próximo' : 'Anterior'}</span>
                    <span class="pagination-title">${article.title}</span>
                </a>
            `;
        }
    };

    // Inicia a aplicação
    PitchutchaApp.init();
});

    /**
     * ===================================================================
     * MÓDULOS DE FUNCIONALIDADE
     * ===================================================================
     * Cada módulo é responsável por uma parte da interatividade da UI.
     */

    // MÓDULO: NAVEGAÇÃO MÓVEL
    const mobileNavModule = {
        init() {
            const menuToggle = document.getElementById('menu-toggle');
            const sidebar = document.getElementById('sidebar');
            const sidebarNav = document.getElementById('sidebar-nav');

            if (!menuToggle || !sidebar) return;

            menuToggle.addEventListener('click', () => {
                this.toggle(menuToggle, sidebar);
            });
            
            // Fecha o menu ao clicar em um link (melhora a UX no mobile)
            sidebarNav.addEventListener('click', (e) => {
                if(e.target.matches('.nav-link') && sidebar.classList.contains('is-open')) {
                    this.toggle(menuToggle, sidebar);
                }
            });
        },
        toggle(button, sidebar) {
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', !isExpanded);
            button.classList.toggle('is-active');
            sidebar.classList.toggle('is-open');
        }
    };

    // MÓDULO: TROCA DE TEMA (LIGHT/DARK)
    const themeSwitcherModule = {
        init() {
            const themeToggle = document.getElementById('theme-toggle');
            if (!themeToggle) return;

            themeToggle.addEventListener('click', () => this.toggleTheme());
            this.applyInitialTheme();
        },
        applyTheme(theme) {
            document.body.dataset.theme = theme;
            localStorage.setItem('pitchutcha-theme', theme);
        },
        toggleTheme() {
            const currentTheme = document.body.dataset.theme || 'light';
            this.applyTheme(currentTheme === 'light' ? 'dark' : 'light');
        },
        applyInitialTheme() {
            const savedTheme = localStorage.getItem('pitchutcha-theme');
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            if (savedTheme) {
                this.applyTheme(savedTheme);
            } else if (systemPrefersDark) {
                this.applyTheme('dark');
            } else {
                this.applyTheme('light');
            }
        }
    };

    // MÓDULO: TOC INTERATIVO (SCROLL SPY)
    const tocScrollSpyModule = {
        observer: null,
        init() {
            if (this.observer) {
                this.observer.disconnect(); // Limpa o observador anterior
            }

            const mainContent = document.querySelector('.content-and-toc-wrapper');
            const tocLinks = document.querySelectorAll('.toc-link');
            const headingElements = Array.from(tocLinks).map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);

            if (headingElements.length === 0 || !mainContent) return;

            const observerOptions = {
                root: mainContent,
                rootMargin: '0px 0px -80% 0px',
            };

            this.observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('id');
                        tocLinks.forEach(link => link.classList.remove('is-active'));
                        const activeLink = document.querySelector(`.toc-link[href="#${id}"]`);
                        if(activeLink) activeLink.classList.add('is-active');
                    }
                });
            }, observerOptions);

            headingElements.forEach(header => this.observer.observe(header));
        }
    };

    // MÓDULO: BOTÃO "COPIAR CÓDIGO"
    const copyCodeModule = {
        init() {
            // Usa delegação de eventos no container principal para performance
            const mainContent = document.getElementById('main-content');
            mainContent.addEventListener('click', (e) => {
                if (e.target.matches('.copy-code-button')) {
                    this.handleCopyClick(e.target);
                }
            });
        },
        // Adiciona o botão a todos os blocos de código <pre>
        attachButtonsToCodeBlocks() {
            const codeBlocks = document.querySelectorAll('.main-content .article-body pre');
            codeBlocks.forEach(block => {
                // Evita adicionar o botão múltiplas vezes se a função for chamada novamente
                if(block.querySelector('.copy-code-button')) return;

                const button = document.createElement('button');
                button.className = 'copy-code-button';
                button.setAttribute('aria-label', 'Copiar código');
                button.innerHTML = `
                    <svg class="copy-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="16" height="16"><path d="M0 4.75C0 3.784.784 3 1.75 3h6.5a.75.75 0 0 1 0 1.5h-6.5A.25.25 0 0 0 1.5 5v6.5c0 .138.112.25.25.25h6.5a.75.75 0 0 1 0 1.5h-6.5A1.75 1.75 0 0 1 0 11.25Zm9.5-3.25a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM11.25 2h3A1.75 1.75 0 0 1 16 3.75v9.5A1.75 1.75 0 0 1 14.25 15h-3a.75.75 0 0 1 0-1.5h3a.25.25 0 0 0 .25-.25V3.75a.25.25 0 0 0-.25-.25h-3a.75.75 0 0 1 0-1.5Z"></path></svg>
                    <svg class="success-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" width="16" height="16"><path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path></svg>
                    <span>Copiar</span>
                `;
                block.appendChild(button);
            });
        },
        // Lógica para copiar o texto
        handleCopyClick(button) {
            const pre = button.closest('pre');
            const code = pre.querySelector('code');
            const textToCopy = code ? code.innerText : pre.innerText;

            navigator.clipboard.writeText(textToCopy).then(() => {
                const textSpan = button.querySelector('span');
                const copyIcon = button.querySelector('.copy-icon');
                const successIcon = button.querySelector('.success-icon');

                textSpan.textContent = 'Copiado!';
                copyIcon.style.display = 'none';
                successIcon.style.display = 'block';

                setTimeout(() => {
                    textSpan.textContent = 'Copiar';
                    copyIcon.style.display = 'block';
                    successIcon.style.display = 'none';
                }, 2000);
            }).catch(err => {
                console.error('Falha ao copiar texto: ', err);
                const textSpan = button.querySelector('span');
                textSpan.textContent = 'Erro!';
            });
        }
    };

    // MÓDULO: BARRA DE PROGRESSO DE LEITURA
    const progressBarModule = {
        init() {
            const progressBar = document.getElementById('progressBar');
            const contentWrapper = document.getElementById('content-wrapper');

            if (!progressBar || !contentWrapper) return;

            contentWrapper.addEventListener('scroll', () => {
                const scrollableHeight = contentWrapper.scrollHeight - contentWrapper.clientHeight;
                const scrollTop = contentWrapper.scrollTop;
                const progress = (scrollTop / scrollableHeight) * 100;
                
                progressBar.style.width = `${progress}%`;
            });
        }
    };
