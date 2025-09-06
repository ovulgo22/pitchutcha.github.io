/* ==========================================================================
   PITCHUTCHA: SCRIPT.JS
   ==========================================================================
   
   ARQUITETURA DA APLICAÇÃO:
   - Usamos um IIFE (Immediately Invoked Function Expression) para criar um escopo privado.
   - Criamos um objeto global `PitchutchaApp` para servir como nosso namespace,
     evitando poluir o escopo global.
   - A lógica é dividida em "módulos" dentro do objeto principal.

   TABELA DE CONTEÚDOS:
   1. ESTRUTURA PRINCIPAL (App)
      - Configurações e Seletores
      - Estado da Aplicação
      - Referências de Elementos DOM
   2. MÓDULO: TEMA (Theme)
      - Inicialização
      - Carregar preferência
      - Definir tema
      - Alternar tema
   3. INICIALIZAÇÃO GERAL
========================================================================== */

// IIFE para encapsular nosso código
(function() {
    'use strict';

    // Objeto principal que servirá como nosso namespace
    const PitchutchaApp = {
        
        // 1.1 Configurações e Seletores
        // Centralizar seletores aqui facilita a manutenção.
        config: {
            themeToggleBtn: '#theme-toggle',
            searchTriggerBtn: '.search-trigger',
            searchModal: '#search-modal',
            searchModalCloseBtn: '.search-modal__close-button',
            searchModalOverlay: '#search-modal-overlay',
            mobileMenuTrigger: '.mobile-menu-trigger',
            sidebarNav: '#sidebar-nav',
            contentArticle: '#content-article',
            tocContainer: '#toc-container'
        },

        // 1.2 Estado da Aplicação
        // Mantém o controle de estados dinâmicos.
        state: {
            currentTheme: 'light',
            isSidebarOpen: false,
            isSearchOpen: false
        },

        // 1.3 Referências de Elementos DOM
        // Guardamos referências aos elementos do DOM para não precisar buscá-los toda hora.
        elements: {},

        /**
         * Método principal que inicializa todos os módulos da aplicação.
         * É o ponto de entrada.
         */
        init: function() {
            // Garante que o DOM está pronto antes de executarmos qualquer coisa.
            document.addEventListener('DOMContentLoaded', () => {
                this.cacheDOMElements();
                this.theme.init();
                // Outros módulos serão inicializados aqui nas próximas partes...
            });
        },

        /**
         * Busca e armazena os elementos do DOM no objeto `elements`.
         */
        cacheDOMElements: function() {
            for (const key in this.config) {
                // Transforma 'themeToggleBtn' em 'themeToggleBtnEl' para o nome do elemento
                const elName = key + 'El'; 
                this.elements[elName] = document.querySelector(this.config[key]);
            }
            this.elements.htmlEl = document.documentElement; // Precisamos da tag <html> para o tema
        }
    };

    /* ==========================================================================
       2. MÓDULO: TEMA (Theme)
       ========================================================================== 
       Controla a funcionalidade de troca de tema claro/escuro.
    */
    PitchutchaApp.theme = {
        init: function() {
            this.loadInitialTheme();
            // Adiciona o evento de clique ao botão de troca de tema
            if (PitchutchaApp.elements.themeToggleBtnEl) {
                PitchutchaApp.elements.themeToggleBtnEl.addEventListener('click', () => this.toggleTheme());
            }
        },

        /**
         * No carregamento da página, verifica se há um tema salvo no localStorage
         * ou se o usuário tem uma preferência de sistema (prefers-color-scheme).
         */
        loadInitialTheme: function() {
            const savedTheme = localStorage.getItem('pitchutcha_theme');
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

            if (savedTheme) {
                this.setTheme(savedTheme);
            } else if (systemPrefersDark) {
                this.setTheme('dark');
            } else {
                this.setTheme('light');
            }
        },

        /**
         * Aplica um tema específico ao site.
         * @param {string} theme - O tema a ser aplicado ('light' or 'dark').
         */
        setTheme: function(theme) {
            // Define o atributo 'data-theme' na tag <html>, que o CSS usa para aplicar os estilos.
            PitchutchaApp.elements.htmlEl.setAttribute('data-theme', theme);
            
            // Salva a preferência do usuário no armazenamento local do navegador.
            localStorage.setItem('pitchutcha_theme', theme);
            
            // Atualiza o estado da aplicação.
            PitchutchaApp.state.currentTheme = theme;
        },

        /**
         * Alterna entre o tema claro e escuro.
         */
        toggleTheme: function() {
            const newTheme = PitchutchaApp.state.currentTheme === 'light' ? 'dark' : 'light';
            this.setTheme(newTheme);
        }
    };


    // ==========================================================================
    // 3. INICIALIZAÇÃO GERAL
    // ==========================================================================
    // Inicia a aplicação.
    PitchutchaApp.init();

})();
    /* ==========================================================================
       3. MÓDULO: NAVEGAÇÃO (Navigation)
       ========================================================================== 
       Controla a interatividade da navegação, como o menu móvel.
    */
    PitchutchaApp.navigation = {
        init: function() {
            // Adiciona o evento de clique ao gatilho do menu móvel
            if (PitchutchaApp.elements.mobileMenuTriggerEl) {
                PitchutchaApp.elements.mobileMenuTriggerEl.addEventListener('click', () => this.toggleSidebar());
            }

            // Adiciona um evento para fechar a sidebar se o usuário clicar fora dela
            document.addEventListener('click', (event) => {
                if (!PitchutchaApp.state.isSidebarOpen) return;

                const sidebar = PitchutchaApp.elements.sidebarNavEl;
                const trigger = PitchutchaApp.elements.mobileMenuTriggerEl;

                // Fecha a sidebar se o clique foi fora do menu E fora do botão que o abre
                if (!sidebar.contains(event.target) && !trigger.contains(event.target)) {
                    this.closeSidebar();
                }
            });
        },

        /**
         * Alterna a visibilidade da barra lateral de navegação em telas móveis.
         */
        toggleSidebar: function() {
            if (PitchutchaApp.state.isSidebarOpen) {
                this.closeSidebar();
            } else {
                this.openSidebar();
            }
        },

        /**
         * Exibe a barra lateral.
         */
        openSidebar: function() {
            if (PitchutchaApp.elements.sidebarNavEl) {
                PitchutchaApp.elements.sidebarNavEl.classList.add('sidebar-nav--open');
                PitchutchaApp.state.isSidebarOpen = true;
                // Previne a rolagem do corpo da página enquanto o menu estiver aberto
                document.body.style.overflow = 'hidden'; 
            }
        },

        /**
         * Esconde a barra lateral.
         */
        closeSidebar: function() {
            if (PitchutchaApp.elements.sidebarNavEl) {
                PitchutchaApp.elements.sidebarNavEl.classList.remove('sidebar-nav--open');
                PitchutchaApp.state.isSidebarOpen = false;
                // Restaura a rolagem do corpo da página
                document.body.style.overflow = '';
            }
        }
    };


    // AGORA, PRECISAMOS ATUALIZAR A INICIALIZAÇÃO DA NOSSA APLICAÇÃO
    // Encontre a função PitchutchaApp.init e adicione a chamada para o novo módulo.
    // Ela deve ficar assim:
    
    /**
     * Método principal que inicializa todos os módulos da aplicação.
     * É o ponto de entrada.
     */
    // (Esta função já existe no seu arquivo, apenas adicione a nova linha)
    // init: function() {
    //     document.addEventListener('DOMContentLoaded', () => {
    //         this.cacheDOMElements();
    //         this.theme.init();
    //         this.navigation.init(); // <-- ADICIONE ESTA LINHA
    //         // Outros módulos serão inicializados aqui nas próximas partes...
    //     });
    // },
// (Esta seção já existe, apenas adicione a nova linha)
// config: {
//     themeToggleBtn: '#theme-toggle',
//     searchTriggerBtn: '.search-trigger',
//     searchModal: '#search-modal',
//     searchModalInput: '#search-modal-input', // <-- ADICIONE ESTA LINHA
//     searchModalCloseBtn: '.search-modal__close-button',
//     // ...resto das configurações
// },
// (Esta seção já existe, apenas adicione a nova linha)
// config: {
//     ...
//     mobileMenuTrigger: '.mobile-menu-trigger',
//     sidebarNav: '#sidebar-nav',
//     pageNav: '#page-nav', // <-- ADICIONE ESTA LINHA
//     contentArticle: '#content-article',
//     ...
// },
    /* ==========================================================================
       6. MÓDULO: ROTEADOR (Router)
       ========================================================================== 
       Controla a navegação client-side, simulando uma SPA.
    */
    PitchutchaApp.router = {
        init: function() {
            // Escuta cliques em todo o corpo do documento para capturar cliques em links
            document.body.addEventListener('click', (e) => this.handleLinkClick(e));
            // Escuta os botões de voltar/avançar do navegador
            window.addEventListener('popstate', (e) => this.handlePopState(e));
            // Garante que o estado inicial da sidebar esteja correto
            this.updateSidebarActiveState(window.location.pathname);
        },

        handleLinkClick: function(e) {
            const link = e.target.closest('a');

            // Verifica se o clique foi realmente em um link válido para roteamento
            if (!link || link.target === '_blank' || e.metaKey || e.ctrlKey || !link.href.startsWith(window.location.origin)) {
                return;
            }
            
            // Ignora links que são apenas âncoras na mesma página
            if (link.pathname === window.location.pathname && link.hash) {
                return;
            }

            e.preventDefault(); // Impede a navegação padrão do navegador
            this.navigate(link.pathname);
        },
        
        handlePopState: function(e) {
            // Carrega o conteúdo quando o usuário usa os botões de voltar/avançar
            this.loadContent(e.state ? e.state.path : window.location.pathname);
        },

        navigate: function(path) {
            // Atualiza a URL na barra de endereços sem recarregar a página
            history.pushState({ path }, '', path);
            this.loadContent(path);
        },

        loadContent: async function(path) {
            const elements = PitchutchaApp.elements;
            
            // Adiciona uma classe para uma transição de fade-out
            elements.contentArticleEl.classList.add('is-loading');

            try {
                const response = await fetch(path);
                if (!response.ok) throw new Error('A página não pôde ser carregada.');

                const html = await response.text();
                const parser = new DOMParser();
                const newDoc = parser.parseFromString(html, 'text/html');

                const newContent = newDoc.querySelector(this.config.contentArticle);
                const newTitle = newDoc.querySelector('title').textContent;

                // Atualiza o conteúdo e o título da página
                document.title = newTitle;
                elements.contentArticleEl.innerHTML = newContent.innerHTML;

                // Após carregar o novo conteúdo, regera o sumário
                PitchutchaApp.content.generateTOC();

                // Atualiza o link ativo na sidebar principal
                this.updateSidebarActiveState(path);
                
                // Rola a página para o topo
                window.scrollTo(0, 0);

            } catch (error) {
                console.error('Erro de roteamento:', error);
                // Em caso de erro, simplesmente redireciona para a página
                window.location.href = path;
            } finally {
                // Remove a classe de loading para uma transição de fade-in
                elements.contentArticleEl.classList.remove('is-loading');
            }
        },

        updateSidebarActiveState: function(path) {
            const links = document.querySelectorAll('.sidebar-nav__link');
            
            links.forEach(link => {
                // Normaliza os caminhos para uma comparação mais segura
                const linkPath = new URL(link.href).pathname;
                if (linkPath === path) {
                    link.classList.add('sidebar-nav__link--active');
                } else {
                    link.classList.remove('sidebar-nav__link--active');
                }
            });
        }
    };
