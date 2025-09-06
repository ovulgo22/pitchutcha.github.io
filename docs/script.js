/* ==========================================================================
   PITCHUTCHA: SCRIPT.JS (VERSÃO FINAL)
   ==========================================================================
   
   ARQUITETURA DA APLICAÇÃO:
   - IIFE (Immediately Invoked Function Expression) para escopo privado.
   - Namespace único `PitchutchaApp` para evitar poluição global.
   - Arquitetura modular robusta, onde cada funcionalidade é um objeto separado.
   - Estado centralizado para controle total da UI.
   - Cache de elementos do DOM para performance otimizada.

   TABELA DE CONTEÚDOS:
   1. ESTRUTURA PRINCIPAL (App)
   2. MÓDULO: TEMA (Theme)
   3. MÓDULO: PREFERÊNCIAS (Preferences)
   4. MÓDULO: NAVEGAÇÃO (Navigation)
   5. MÓDULO: PALETA DE COMANDOS (CommandPalette)
   6. MÓDULO: CONTEÚDO (Content)
   7. MÓDULO: ROTEADOR (Router)
   8. INICIALIZAÇÃO

========================================================================== */

(function() {
    'use strict';

    const PitchutchaApp = {
        
        // 1.1 Configurações e Seletores
        config: {
            // Triggers
            themeToggle: '#theme-toggle',
            preferencesTrigger: '#preferences-trigger',
            commandPaletteTrigger: '.command-palette-trigger',
            mobileMenuTrigger: '#mobile-menu-trigger',

            // Modals
            preferencesModal: '#preferences-modal',
            commandPaletteModal: '#command-palette-modal',
            
            // Sidebar
            sidebar: '#sidebar-nav',
            sidebarFilter: '.sidebar-nav__filter',
            sidebarList: '#sidebar-nav-list',
            collapsibleTriggers: '[data-collapsible] > .sidebar-nav__category-button',

            // Conteúdo
            mainContent: '#main-content',
            contentArticle: '#content-article',
            tocContainer: '#toc-container',

            // Ações e Controles
            modalCloseActions: '[data-action="close-modal"]',
            fontSizeIncreaseAction: '[data-action="increase-font-size"]',
            fontSizeDecreaseAction: '[data-action="decrease-font-size"]',
            fontSizeValueDisplay: '#font-size-value',
            reduceMotionToggle: '#reduce-motion-toggle'
        },

        // 1.2 Estado da Aplicação
        state: {
            isSidebarOpen: false,
            isCommandPaletteOpen: false,
            isPreferencesOpen: false,
            currentTheme: 'light',
            fontSize: 1, // 0=Pequeno, 1=Normal, 2=Grande
            prefersReducedMotion: false
        },

        // 1.3 Cache de Elementos do DOM
        elements: {},

        // 1.4 Ponto de Entrada Principal
        init: function() {
            document.addEventListener('DOMContentLoaded', () => {
                this.cacheDOMElements();
                this.theme.init();
                this.preferences.init();
                // ... outros módulos serão inicializados aqui.
            });
        },

        cacheDOMElements: function() {
            for (const key in this.config) {
                const elName = key + 'El';
                // Usamos querySelectorAll para ações que podem ter múltiplos elementos
                if (key.endsWith('Actions') || key.endsWith('Triggers')) {
                    this.elements[elName] = document.querySelectorAll(this.config[key]);
                } else {
                    this.elements[elName] = document.querySelector(this.config[key]);
                }
            }
            this.elements.htmlEl = document.documentElement;
        }
    };

    /* ==========================================================================
       2. MÓDULO: TEMA (Theme)
       ========================================================================== */
    PitchutchaApp.theme = {
        init: function() {
            // O script embutido no <head> já lida com o carregamento inicial.
            // Este init só precisa adicionar o listener para a troca.
            PitchutchaApp.elements.themeToggleEl.addEventListener('click', () => this.toggleTheme());
            // Sincroniza o estado inicial
            PitchutchaApp.state.currentTheme = PitchutchaApp.elements.htmlEl.getAttribute('data-theme') || 'light';
        },
        
        setTheme: function(theme) {
            PitchutchaApp.elements.htmlEl.setAttribute('data-theme', theme);
            localStorage.setItem('pitchutcha_theme', theme);
            PitchutchaApp.state.currentTheme = theme;
        },

        toggleTheme: function() {
            const newTheme = PitchutchaApp.state.currentTheme === 'light' ? 'dark' : 'light';
            this.setTheme(newTheme);
        }
    };

    /* ==========================================================================
       3. MÓDULO: PREFERÊNCIAS (Preferences)
       ========================================================================== */
    PitchutchaApp.preferences = {
        fontSizes: ['Pequeno', 'Normal', 'Grande'],
        fontClasses: ['font-size-sm', 'font-size-md', 'font-size-lg'],

        init: function() {
            this.loadPreferences();
            
            PitchutchaApp.elements.preferencesTriggerEl.addEventListener('click', () => this.open());
            
            PitchutchaApp.elements.modalCloseActionsEls.forEach(el => {
                if(el.closest('#preferences-modal')) {
                    el.addEventListener('click', () => this.close());
                }
            });

            PitchutchaApp.elements.fontSizeIncreaseActionEl.addEventListener('click', () => this.changeFontSize(1));
            PitchutchaApp.elements.fontSizeDecreaseActionEl.addEventListener('click', () => this.changeFontSize(-1));
            PitchutchaApp.elements.reduceMotionToggleEl.addEventListener('click', () => this.toggleReducedMotion());
        },

        open: function() {
            if (PitchutchaApp.state.isPreferencesOpen) return;
            PitchutchaApp.state.isPreferencesOpen = true;
            const modal = PitchutchaApp.elements.preferencesModalEl;
            modal.removeAttribute('hidden');
            // Timeout para garantir a transição de CSS
            setTimeout(() => modal.setAttribute('aria-hidden', 'false'), 10);
        },

        close: function() {
            if (!PitchutchaApp.state.isPreferencesOpen) return;
            PitchutchaApp.state.isPreferencesOpen = false;
            const modal = PitchutchaApp.elements.preferencesModalEl;
            modal.setAttribute('aria-hidden', 'true');
            // Esconde o elemento do DOM após a animação
            modal.addEventListener('transitionend', () => {
                modal.setAttribute('hidden', 'true');
            }, { once: true });
        },

        loadPreferences: function() {
            // Carrega tamanho da fonte
            const savedFontSize = parseInt(localStorage.getItem('pitchutcha_fontSize'), 10);
            this.updateFontSize(isNaN(savedFontSize) ? 1 : savedFontSize);
            
            // Carrega preferência de movimento
            const savedMotion = localStorage.getItem('pitchutcha_reducedMotion') === 'true';
            this.updateReducedMotion(savedMotion);
        },

        changeFontSize: function(direction) {
            let currentSize = PitchutchaApp.state.fontSize;
            let newSize = Math.max(0, Math.min(2, currentSize + direction));
            this.updateFontSize(newSize);
        },
        
        updateFontSize: function(sizeIndex) {
            PitchutchaApp.state.fontSize = sizeIndex;
            localStorage.setItem('pitchutcha_fontSize', sizeIndex);

            // Remove classes antigas e adiciona a nova
            PitchutchaApp.elements.htmlEl.classList.remove(...this.fontClasses);
            PitchutchaApp.elements.htmlEl.classList.add(this.fontClasses[sizeIndex]);
            
            // Atualiza o texto no modal
            PitchutchaApp.elements.fontSizeValueDisplayEl.textContent = this.fontSizes[sizeIndex];
        },
        
        toggleReducedMotion: function() {
            this.updateReducedMotion(!PitchutchaApp.state.prefersReducedMotion);
        },

        updateReducedMotion: function(isEnabled) {
            PitchutchaApp.state.prefersReducedMotion = isEnabled;
            localStorage.setItem('pitchutcha_reducedMotion', isEnabled);
            PitchutchaApp.elements.htmlEl.setAttribute('data-reduced-motion', isEnabled ? 'true' : 'false');
            PitchutchaApp.elements.reduceMotionToggleEl.setAttribute('aria-checked', isEnabled);
        }
    };

    // Ponto de entrada final... será preenchido nas próximas partes.
    PitchutchaApp.init();

})();
    /* ==========================================================================
       4. MÓDULO: NAVEGAÇÃO (Navigation)
       ========================================================================== */
    PitchutchaApp.navigation = {
        init: function() {
            const elements = PitchutchaApp.elements;

            // 1. Lógica do Menu Móvel
            elements.mobileMenuTriggerEl.addEventListener('click', () => this.toggleSidebar());
            document.addEventListener('click', (e) => {
                if (!PitchutchaApp.state.isSidebarOpen) return;
                if (!elements.sidebarEl.contains(e.target) && !elements.mobileMenuTriggerEl.contains(e.target)) {
                    this.closeSidebar();
                }
            });
            window.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && PitchutchaApp.state.isSidebarOpen) {
                    this.closeSidebar();
                }
            });

            // 2. Lógica das Seções Expansíveis
            elements.collapsibleTriggersEls.forEach(trigger => {
                const sublist = trigger.nextElementSibling;
                sublist.setAttribute('aria-hidden', 'true');
                trigger.addEventListener('click', () => this.toggleCollapsibleSection(trigger, sublist));
            });
            
            // 3. Lógica do Filtro da Sidebar
            elements.sidebarFilterEl.addEventListener('input', (e) => this.filterSidebar(e.target.value));
        },
        
        // --- Métodos do Menu Móvel ---
        toggleSidebar: function() {
            PitchutchaApp.state.isSidebarOpen ? this.closeSidebar() : this.openSidebar();
        },
        openSidebar: function() {
            PitchutchaApp.state.isSidebarOpen = true;
            PitchutchaApp.elements.sidebarEl.classList.add('sidebar-nav--open');
            document.body.style.overflow = 'hidden';
        },
        closeSidebar: function() {
            PitchutchaApp.state.isSidebarOpen = false;
            PitchutchaApp.elements.sidebarEl.classList.remove('sidebar-nav--open');
            document.body.style.overflow = '';
        },
        
        // --- Métodos das Seções Expansíveis ---
        toggleCollapsibleSection: function(trigger, sublist) {
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
            trigger.setAttribute('aria-expanded', !isExpanded);
            sublist.setAttribute('aria-hidden', isExpanded);
        },

        // --- Métodos do Filtro ---
        filterSidebar: function(query) {
            const normalizedQuery = query.toLowerCase().trim();
            const allLinks = PitchutchaApp.elements.sidebarListEl.querySelectorAll('.sidebar-nav__link');
            
            allLinks.forEach(link => {
                const text = link.textContent.toLowerCase();
                const parentItem = link.closest('.sidebar-nav__item');
                const parentCollapsible = link.closest('[data-collapsible]');

                if (text.includes(normalizedQuery)) {
                    parentItem.style.display = 'block';
                    // Se o link corresponde e está dentro de uma seção, expande a seção
                    if (parentCollapsible) {
                        parentCollapsible.querySelector('button').setAttribute('aria-expanded', 'true');
                        parentCollapsible.querySelector('ul').setAttribute('aria-hidden', 'false');
                    }
                } else {
                    parentItem.style.display = 'none';
                }
            });
            
            // Lida com as categorias: se todos os filhos de uma categoria estão escondidos, esconde a categoria
            PitchutchaApp.elements.collapsibleTriggersEls.forEach(trigger => {
                const sublist = trigger.closest('[data-collapsible]');
                const visibleItems = sublist.querySelectorAll('.sidebar-nav__link');
                let hasVisibleChildren = false;
                visibleItems.forEach(item => {
                    if (item.closest('.sidebar-nav__item').style.display !== 'none') {
                        hasVisibleChildren = true;
                    }
                });
                
                if (normalizedQuery && !hasVisibleChildren) {
                    trigger.closest('.sidebar-nav__item').style.display = 'none';
                } else {
                    trigger.closest('.sidebar-nav__item').style.display = 'block';
                }
            });
        }
    };
    /* ==========================================================================
       5. MÓDULO: PALETA DE COMANDOS (CommandPalette)
       ========================================================================== */
    PitchutchaApp.commandPalette = {
        // Elemento que tinha o foco antes de abrirmos a paleta
        lastFocusedElement: null,

        init: function() {
            const elements = PitchutchaApp.elements;

            elements.commandPaletteTriggerEl.addEventListener('click', () => this.open());
            
            elements.modalCloseActionsEls.forEach(el => {
                if(el.closest('#command-palette-modal')) {
                    el.addEventListener('click', () => this.close());
                }
            });

            window.addEventListener('keydown', (e) => {
                if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                    e.preventDefault();
                    this.open();
                }
                if (e.key === 'Escape' && PitchutchaApp.state.isCommandPaletteOpen) {
                    this.close();
                }
            });
            
            // Adiciona a lógica de busca quando o usuário digita
            elements.commandPaletteModalEl.querySelector('input').addEventListener('input', (e) => this.performSearch(e.target.value));
        },

        open: function() {
            if (PitchutchaApp.state.isCommandPaletteOpen) return;
            
            this.lastFocusedElement = document.activeElement;
            PitchutchaApp.state.isCommandPaletteOpen = true;

            const modal = PitchutchaApp.elements.commandPaletteModalEl;
            modal.removeAttribute('hidden');
            setTimeout(() => {
                modal.setAttribute('aria-hidden', 'false');
                modal.querySelector('input').focus();
            }, 10);
            
            document.body.style.overflow = 'hidden';
        },

        close: function() {
            if (!PitchutchaApp.state.isCommandPaletteOpen) return;
            
            PitchutchaApp.state.isCommandPaletteOpen = false;

            const modal = PitchutchaApp.elements.commandPaletteModalEl;
            modal.setAttribute('aria-hidden', 'true');
            modal.addEventListener('transitionend', () => {
                modal.setAttribute('hidden', 'true');
                modal.querySelector('input').value = ''; // Limpa o campo ao fechar
                this.displayPlaceholder(); // Mostra o placeholder novamente
            }, { once: true });
            
            document.body.style.overflow = '';
            
            // Devolve o foco para o elemento original
            if (this.lastFocusedElement) {
                this.lastFocusedElement.focus();
            }
        },
        
        performSearch: function(query) {
            const resultsContainer = document.querySelector('#command-palette-results');
            if (query.length > 1) {
                // LÓGICA DE BUSCA ENTRARÁ AQUI FUTURAMENTE
                // Por enquanto, vamos apenas simular um resultado
                resultsContainer.innerHTML = `<div class="search-result-item"><p>Resultados para: <strong>${query}</strong></p></div>`;
            } else {
                this.displayPlaceholder();
            }
        },

        displayPlaceholder: function() {
            const resultsContainer = document.querySelector('#command-palette-results');
            resultsContainer.innerHTML = `<p class="command-palette__placeholder">Comece a digitar para buscar artigos e comandos...</p>`;
        }
    };
    /* ==========================================================================
       6. MÓDULO: CONTEÚDO (Content)
       ========================================================================== */
    PitchutchaApp.content = {
        // Observer para o scroll spy, para que possamos desconectá-lo ao carregar novo conteúdo
        tocObserver: null,

        init: function() {
            this.processArticleContent();
        },

        // Função principal para ser chamada sempre que um novo artigo é carregado
        processArticleContent: function() {
            this.addHeadingAnchors();
            this.generateTOC();
            this.initFeedbackComponent();
        },

        addHeadingAnchors: function() {
            const article = PitchutchaApp.elements.contentArticleEl;
            if (!article) return;
            
            const headings = article.querySelectorAll('h2, h3, h4');
            headings.forEach(heading => {
                const id = heading.id || this.createSlug(heading.textContent);
                heading.id = id;

                const anchor = document.createElement('a');
                anchor.href = `#${id}`;
                anchor.className = 'heading-anchor-link';
                anchor.setAttribute('aria-label', `Link para a seção ${heading.textContent}`);
                anchor.innerHTML = `<svg class="icon"><use href="#icon-link"></use></svg>`;
                heading.appendChild(anchor);
            });
        },

        generateTOC: function() {
            const elements = PitchutchaApp.elements;
            if (!elements.tocContainerEl || !elements.contentArticleEl) return;
            
            elements.tocContainerEl.innerHTML = '';
            const headings = elements.contentArticleEl.querySelectorAll('h2, h3');
            
            if (headings.length === 0) {
                elements.tocContainerEl.innerHTML = '<p class="toc-placeholder">Este artigo não possui seções.</p>';
                return;
            }

            const tocList = document.createElement('ul');
            headings.forEach(heading => {
                const listItem = document.createElement('li');
                listItem.className = `toc-item toc-item--level-${heading.tagName.toLowerCase()}`;
                const link = document.createElement('a');
                link.href = `#${heading.id}`;
                link.textContent = heading.textContent;
                link.className = 'toc-link';
                listItem.appendChild(link);
                tocList.appendChild(listItem);
            });

            elements.tocContainerEl.appendChild(tocList);
            this.setupTOCScrollSpy(headings);
        },

        setupTOCScrollSpy: function(headings) {
            // Desconecta o observer anterior se ele existir, para evitar múltiplos observers
            if (this.tocObserver) {
                this.tocObserver.disconnect();
            }

            this.tocObserver = new IntersectionObserver(entries => {
                // Remove a classe ativa de todos os links primeiro
                document.querySelectorAll('.toc-link.active').forEach(link => link.classList.remove('active'));

                // Encontra o último elemento visível para destacar
                const visibleEntries = entries.filter(e => e.isIntersecting);
                if (visibleEntries.length > 0) {
                    const lastVisibleEntry = visibleEntries[visibleEntries.length - 1];
                    const id = lastVisibleEntry.target.getAttribute('id');
                    const activeLink = document.querySelector(`.toc-link[href="#${id}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            }, {
                rootMargin: `-${PitchutchaApp.config.headerHeight} 0px -50% 0px`,
                threshold: 0
            });

            headings.forEach(heading => this.tocObserver.observe(heading));
        },
        
        initFeedbackComponent: function() {
            const feedbackContainer = document.querySelector('.page-feedback');
            if (!feedbackContainer) return;
            
            const buttons = feedbackContainer.querySelectorAll('button');
            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    feedbackContainer.innerHTML = `<p class="page-feedback__prompt">Obrigado pelo seu feedback!</p>`;
                }, { once: true }); // O evento só pode ser disparado uma vez
            });
        },
        
        createSlug: function(text) {
            return text.toString().toLowerCase().trim()
                .replace(/\s+/g, '-')           // Substitui espaços por -
                .replace(/[^\w\-]+/g, '')       // Remove todos os caracteres não-palavra
                .replace(/\-\-+/g, '-');        // Substitui múltiplos - por um único -
        }
    };
    /* ==========================================================================
       7. MÓDULO: ROTEADOR (Router)
       ========================================================================== */
    PitchutchaApp.router = {
        init: function() {
            document.body.addEventListener('click', e => this.handleLinkClick(e));
            window.addEventListener('popstate', e => this.handlePopState(e));
            this.updateSidebarActiveState(window.location.pathname);
        },

        handleLinkClick: function(e) {
            const link = e.target.closest('a');
            if (!this.isValidForRouting(link)) return;
            
            e.preventDefault();
            const targetPath = new URL(link.href).pathname;

            // Não faz nada se já estamos na página
            if (window.location.pathname === targetPath) return;

            this.navigate(targetPath);
        },

        isValidForRouting: function(link) {
            if (!link || 
                link.target === '_blank' ||
                link.hasAttribute('download') ||
                link.href.includes('mailto:') ||
                (link.pathname === window.location.pathname && link.hash) ||
                !link.href.startsWith(window.location.origin)
            ) {
                return false;
            }
            return true;
        },

        handlePopState: function(e) {
            const path = e.state ? e.state.path : window.location.pathname;
            this.loadContent(path, false); // false = não cria novo estado no histórico
        },

        navigate: function(path) {
            history.pushState({ path }, '', path);
            this.loadContent(path, true);
        },

        loadContent: async function(path, createHistoryState) {
            const mainContent = PitchutchaApp.elements.mainContentEl;
            mainContent.classList.add('is-loading');

            try {
                const response = await fetch(path);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                const html = await response.text();
                const parser = new DOMParser();
                const newDoc = parser.parseFromString(html, 'text/html');

                const newContentArticle = newDoc.querySelector(PitchutchaApp.config.contentArticle);
                const newTitle = newDoc.querySelector('title').textContent;

                // Transição suave para o novo conteúdo
                document.startViewTransition(() => {
                    document.title = newTitle;
                    PitchutchaApp.elements.contentArticleEl.innerHTML = newContentArticle.innerHTML;
                    
                    // Re-inicializa os componentes de conteúdo para a nova página
                    PitchutchaApp.content.processArticleContent();

                    this.updateSidebarActiveState(path);
                    
                    // Rola a página para o topo
                    window.scrollTo({ top: 0, behavior: 'smooth' });

                    // Fecha o menu móvel caso esteja aberto
                    if (PitchutchaApp.state.isSidebarOpen) {
                        PitchutchaApp.navigation.closeSidebar();
                    }
                });

            } catch (error) {
                console.error("Falha ao carregar a página:", error);
                // Em caso de erro (ex: 404), redireciona o navegador para a página
                window.location.href = path;
            } finally {
                // A View Transition API lida com a remoção do estado de loading
                 mainContent.classList.remove('is-loading');
            }
        },

        updateSidebarActiveState: function(path) {
            const links = document.querySelectorAll('.sidebar-nav__link');
            
            links.forEach(link => {
                const linkPath = new URL(link.href).pathname;
                
                if (linkPath === path) {
                    link.classList.add('sidebar-nav__link--active');
                    // Expande a seção pai do link ativo, se estiver recolhida
                    const parentCollapsible = link.closest('[data-collapsible]');
                    if (parentCollapsible) {
                        const button = parentCollapsible.querySelector('button');
                        if (button.getAttribute('aria-expanded') === 'false') {
                            PitchutchaApp.navigation.toggleCollapsibleSection(button, button.nextElementSibling);
                        }
                    }
                } else {
                    link.classList.remove('sidebar-nav__link--active');
                }
            });
        }
    };
    /* ==========================================================================
       8. MÓDULO: UTILITÁRIOS (Utils)
       ========================================================================== 
       Funções de ajuda que podem ser usadas em toda a aplicação.
    */
    PitchutchaApp.utils = {
        /**
         * Debounce: Atras a execução de uma função até que um certo tempo 
         * tenha passado sem que ela seja chamada. Útil para eventos de redimensionamento de janela.
         */
        debounce: function(func, delay = 250) {
            let timeoutId;
            return (...args) => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                }, delay);
            };
        },

        /**
         * Throttle: Garante que uma função não seja executada mais de uma vez 
         * dentro de um determinado período de tempo. Útil para eventos de rolagem (scroll).
         */
        throttle: function(func, limit = 100) {
            let inProgress = false;
            return (...args) => {
                if (!inProgress) {
                    func.apply(this, args);
                    inProgress = true;
                    setTimeout(() => {
                        inProgress = false;
                    }, limit);
                }
            };
        }
    };

    /* ==========================================================================
       9. INICIALIZAÇÃO FINAL DA APLICAÇÃO
       ========================================================================== 
       Esta é a função init final e completa. Ela garante que todos os módulos
       sejam carregados na ordem correta quando o DOM estiver pronto.
       Substitua sua função init antiga por esta.
    */
    PitchutchaApp.init = function() {
        // Envolve tudo em um listener para garantir que o HTML esteja totalmente carregado
        document.addEventListener('DOMContentLoaded', () => {
            console.log("PitchutchaApp: Inicializando aplicação...");

            // 1. Prepara o terreno, guardando referências aos elementos do DOM
            this.cacheDOMElements();
            
            // 2. Inicializa os módulos de interface e preferências
            this.theme.init();
            this.preferences.init();
            
            // 3. Inicializa os componentes de navegação interativa
            this.navigation.init();
            this.commandPalette.init();
            
            // 4. Analisa o conteúdo da página inicial
            this.content.init();
            
            // 5. Ativa o roteador para navegação SPA (último passo importante)
            this.router.init();

            console.log("PitchutchaApp: Aplicação pronta.");
        });
    };

    // Inicia a aplicação
    PitchutchaApp.init();

})(); // Fim do IIFE
