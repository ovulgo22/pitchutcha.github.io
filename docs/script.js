/*=============== INÍCIO DA PARTE 1 ===============*/

/* ==========================================================================
   PITCHUTCHA - SCRIPT PRINCIPAL (VERSÃO AVANÇADA)
   - ARQUITETO: Gemini (Senior Front-End Architect & QA Engineer)
   - PROJETO: pitchutcha.github.io by ovulgo22
   ========================================================================== */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    try {
        /**
         * ===================================================================
         * 1. BANCO DE DADOS DE CONTEÚDO (appData)
         * ===================================================================
         * Fonte única de verdade para todo o conteúdo do site.
         */
        const appData = {
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
                // HOME
                'home': {
                    title: 'Bem-vindo à Pitchutcha',
                    breadcrumb: 'Início',
                    subtitle: 'Uma enciclopédia de tecnologia curada, construída para desenvolvedores, por desenvolvedores.',
                    content: `
                        <p>Navegue pelo conhecimento que impulsiona o mundo digital. Da teoria fundamental da computação às últimas tendências em inteligência artificial e desenvolvimento web, nossa missão é fornecer informações claras, precisas e práticas.</p>
                        <p>Este projeto é um organismo vivo, mantido por <a href="https://github.com/ovulgo22" target="_blank" rel="noopener noreferrer">ovulgo22</a> e sua comunidade. Use o menu lateral para explorar os tópicos ou a busca para encontrar exatamente o que precisa.</p>
                    `,
                    lastUpdated: '2025-09-06',
                    readingTime: 1
                },
                // FUNDAÇÕES
                'fundacoes/maquina-turing': {
                    title: 'A Máquina de Turing',
                    breadcrumb: 'Fundações',
                    content: `<h2>O Modelo Abstrato da Computação</h2><p>Proposta por Alan Turing em 1936, a Máquina de Turing é um modelo matemático abstrato que define uma máquina teórica capaz de simular qualquer algoritmo de computador. Ela consiste em uma fita infinita dividida em células, um cabeçote de leitura/escrita e um conjunto de estados. Este conceito foi fundamental para o desenvolvimento da teoria da computação e da ciência da computação como um todo.</p><h3>Componentes:</h3><ul><li><strong>Fita Infinita:</strong> Onde os dados são armazenados.</li><li><strong>Cabeçote:</strong> Lê, escreve ou apaga símbolos na fita.</li><li><strong>Unidade de Controle:</strong> Um conjunto finito de estados que dita a ação do cabeçote.</li></ul>`,
                    nextArticle: 'fundacoes/arquitetura-von-neumann',
                    lastUpdated: '2025-09-05',
                    readingTime: 2
                },
                'fundacoes/arquitetura-von-neumann': {
                    title: 'Arquitetura de Von Neumann',
                    breadcrumb: 'Fundações',
                    content: `<h2>A Base dos Computadores Modernos</h2><p>A arquitetura de Von Neumann, descrita por John von Neumann em 1945, é um modelo de arquitetura de computador que usa uma única estrutura de armazenamento tanto para as instruções do programa quanto para os dados (um conceito conhecido como 'programa armazenado').</p><h3>Cinco Componentes Principais:</h3><ol><li><strong>Unidade Central de Processamento (CPU):</strong> Contém a ULA e a Unidade de Controle.</li><li><strong>Unidade Lógica e Aritmética (ULA):</strong> Executa operações matemáticas e lógicas.</li><li><strong>Unidade de Controle:</strong> Interpreta instruções e coordena outras partes do sistema.</li><li><strong>Memória:</strong> Armazena dados e instruções.</li><li><strong>Dispositivos de Entrada/Saída:</strong> Permitem a interação com o mundo exterior.</li></ol><p>Quase todos os computadores de hoje, de smartphones a supercomputadores, são baseados neste modelo.</p>`,
                    prevArticle: 'fundacoes/maquina-turing',
                    nextArticle: 'redes/modelo-osi',
                    lastUpdated: '2025-09-04',
                    readingTime: 3
                },
                // REDES E PROTOCOLOS
                'redes/modelo-osi': {
                    title: 'O Modelo OSI',
                    breadcrumb: 'Redes',
                    content: `<h2>As Sete Camadas da Comunicação</h2><p>O modelo Open Systems Interconnection (OSI) é um modelo conceitual que padroniza as funções de um sistema de telecomunicação ou computação em sete camadas de abstração. Ele fornece um framework para entender como os dados viajam de uma aplicação em um computador para outra em um computador diferente.</p>
                        <h3>As Camadas:</h3>
                        <ol>
                            <li><strong>Física:</strong> Transmissão de bits brutos sobre um meio físico.</li>
                            <li><strong>Enlace (Data Link):</strong> Transferência de quadros (frames) entre nós adjacentes.</li>
                            <li><strong>Rede:</strong> Roteamento de pacotes através de múltiplas redes (onde o IP opera).</li>
                            <li><strong>Transporte:</strong> Fornece comunicação ponta a ponta (onde TCP e UDP operam).</li>
                            <li><strong>Sessão:</strong> Gerencia o diálogo (sessões) entre computadores.</li>
                            <li><strong>Apresentação:</strong> Traduz, criptografa e comprime os dados.</li>
                            <li><strong>Aplicação:</strong> Fornece serviços de rede para as aplicações do usuário final (HTTP, FTP, SMTP).</li>
                        </ol>`,
                    prevArticle: 'fundacoes/arquitetura-von-neumann',
                    nextArticle: 'redes/tcp-ip',
                    lastUpdated: '2025-09-03',
                    readingTime: 4
                },
                'redes/tcp-ip': {
                    title: 'Pilha de Protocolos TCP/IP',
                    breadcrumb: 'Redes',
                    content: `<h2>O Protocolo Padrão da Internet</h2><p>Enquanto o Modelo OSI é um modelo teórico, a pilha de protocolos TCP/IP é o conjunto de protocolos de comunicação prático usado na Internet e em redes de computadores. Geralmente é descrito com quatro camadas.</p>
                        <h3>Camadas do TCP/IP vs. OSI:</h3>
                        <ul>
                            <li><strong>Aplicação:</strong> Corresponde às camadas 5, 6 e 7 do OSI (Sessão, Apresentação, Aplicação).</li>
                            <li><strong>Transporte:</strong> Corresponde à camada 4 do OSI. Onde rodam o TCP e o UDP.</li>
                            <li><strong>Internet (ou Rede):</strong> Corresponde à camada 3 do OSI. Onde roda o IP.</li>
                            <li><strong>Acesso à Rede (ou Enlace):</strong> Corresponde às camadas 1 e 2 do OSI (Física, Enlace).</li>
                        </ul>
                        <pre><code class="language-txt">Exemplo de encapsulamento:\n\n[ DADOS da Aplicação ]\n[ Cabeçalho TCP | DADOS ]  <- Segmento\n[ Cabeçalho IP | Cabeçalho TCP | DADOS ] <- Pacote\n[ Cabeçalho Ethernet | ... DADOS ... | Trailer ] <- Quadro</code></pre>`,
                    prevArticle: 'redes/modelo-osi',
                    nextArticle: 'redes/dns',
                    lastUpdated: '2025-09-02',
                    readingTime: 3
                },
                'redes/dns': {
                    title: 'DNS: O Sistema de Nomes de Domínio',
                    breadcrumb: 'Redes',
                    content: `<h2>A Lista Telefônica da Internet</h2><p>O Domain Name System (DNS) é um sistema hierárquico e distribuído que traduz nomes de domínio legíveis por humanos (como <code>pitchutcha.github.io</code>) em endereços IP numéricos (como <code>185.199.108.153</code>) que os computadores usam para se comunicar. Sem o DNS, teríamos que memorizar os endereços IP de todos os sites que visitamos.</p>
                        <h3>Como funciona (simplificado):</h3>
                        <ol>
                            <li>Seu computador pergunta a um servidor DNS (Resolvedor Recursivo): "Qual o IP de google.com?".</li>
                            <li>Se o resolvedor não sabe, ele pergunta aos servidores Raiz (Root Servers).</li>
                            <li>Os servidores Raiz direcionam para os servidores TLD (Top-Level Domain) para ".com".</li>
                            <li>O servidor TLD direciona para os servidores de Nome Autoritativos do domínio "google.com".</li>
                            <li>O servidor Autoritativo responde com o endereço IP final.</li>
                        </ol>`,
                    prevArticle: 'redes/tcp-ip',
                    lastUpdated: '2025-09-01',
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
                currentArticleId: null,
                sidebarOpen: window.innerWidth > 1024,
                searchQuery: '',
                currentTheme: 'dark',
            },
            
            // -- Propriedade para "cachear" elementos do DOM para acesso rápido
            dom: {},

            // -- Métodos da aplicação serão adicionados nas próximas partes
        };

/*================ FIM DA PARTE 1 ================*/
/*=============== INÍCIO DA PARTE 2 ===============*/

        /**
         * ===================================================================
         * 3. MÉTODOS DE INICIALIZAÇÃO E EVENTOS
         * ===================================================================
         * Adiciona os métodos de inicialização, cache do DOM e
         * registro de eventos ao objeto principal da aplicação.
         */
        Object.assign(PitchutchaApp, {
            
            /**
             * Ponto de entrada da aplicação. Orquestra a inicialização.
             */
            init() {
                console.log("PitchutchaApp: Inicializando aplicação...");
                this.loadTheme(); // Carrega o tema salvo antes de tudo
                this.cacheDom();
                this.bindEvents();
                this.handleRouting(); // Processa a URL inicial
                this.renderSidebar(); // Desenha a sidebar inicial
                console.log("PitchutchaApp: Aplicação pronta.");
            },

            /**
             * Mapeia elementos do DOM para o objeto `dom` para acesso rápido.
             */
            cacheDom() {
                this.dom.sidebar = document.getElementById('sidebar');
                this.dom.sidebarNav = document.getElementById('sidebar-nav');
                this.dom.mainContent = document.getElementById('main-content');
                this.dom.contentBody = document.getElementById('content-body');
                this.dom.breadcrumb = document.getElementById('breadcrumb');
                this.dom.articleTitle = document.getElementById('article-title');
                this.dom.articleSubtitle = document.getElementById('article-subtitle');
                this.dom.articleMeta = document.getElementById('article-meta');
                this.dom.navButtons = document.getElementById('nav-buttons');
                this.dom.searchInput = document.getElementById('search-input');
                this.dom.searchResults = document.getElementById('search-results');
                this.dom.clearSearchBtn = document.getElementById('clear-search-btn');
                this.dom.menuToggleBtn = document.getElementById('menu-toggle');
                this.dom.readingProgressBar = document.getElementById('reading-progress-bar');
                this.dom.themeToggler = document.getElementById('theme-toggler');
                this.dom.tocNav = document.getElementById('toc-nav');
                this.dom.tocSidebar = document.getElementById('toc-sidebar');
            },

            /**
             * Centraliza o registro de todos os eventos da aplicação.
             */
            bindEvents() {
                // Evento para navegação (cliques nos links de artigos) e categorias
                this.dom.sidebarNav.addEventListener('click', this.handleSidebarClick.bind(this));
                
                // Eventos da barra de busca
                this.dom.searchInput.addEventListener('keyup', this.handleSearch.bind(this));
                this.dom.searchInput.addEventListener('focus', () => this.dom.searchResults.classList.remove('hidden'));
                document.addEventListener('click', this.handleClickOutsideSearch.bind(this));
                this.dom.clearSearchBtn.addEventListener('click', this.clearSearch.bind(this));

                // Evento para o botão de menu em telas pequenas
                this.dom.menuToggleBtn.addEventListener('click', this.toggleSidebar.bind(this));

                // Evento para os botões de voltar/avançar do navegador
                window.addEventListener('popstate', this.handleRouting.bind(this));

                // Evento para a barra de progresso de leitura
                this.dom.mainContent.addEventListener('scroll', this.updateReadingProgress.bind(this));

                // Evento para o novo botão de tema
                this.dom.themeToggler.addEventListener('click', this.toggleTheme.bind(this));
            },

        });

/*================ FIM DA PARTE 2 ================*/
/*=============== INÍCIO DA PARTE 3 ===============*/

        /**
         * ===================================================================
         * 4. MÉTODOS DE LÓGICA E RENDERIZAÇÃO
         * ===================================================================
         * O coração da aplicação. Estes métodos são responsáveis por
         * processar dados e atualizar a interface do usuário (UI).
         */
        Object.assign(PitchutchaApp, {
            
            // --- MÉTODOS DE RENDERIZAÇÃO ---

            renderSidebar() {
                const getArticleLink = (id, title) => `<li role="none"><a href="#${id}" class="nav-link" role="menuitem">${title}</a></li>`;
                
                this.dom.sidebarNav.innerHTML = appData.categories.map(cat => `
                    <div class="category-group ${cat.open ? 'open' : ''}" data-category-id="${cat.id}">
                        <h3 class="category-title" role="button" aria-expanded="${cat.open}" tabindex="0">
                            <span>${cat.name}</span>
                            <svg class="icon-chevron" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path></svg>
                        </h3>
                        <ul class="nav-list" role="menu">${Object.entries(appData.articles)
                            .filter(([id]) => id.startsWith(cat.id))
                            .map(([id, art]) => getArticleLink(id, art.title)).join('')}
                        </ul>
                    </div>`).join('');
            },

            renderContent(articleId) {
                const article = appData.articles[articleId];
                if (!article) {
                    console.error(`Artigo com id "${articleId}" não encontrado. Redirecionando para home.`);
                    this.handleRouting('home', true); // Força o redirecionamento
                    return;
                }

                this.state.currentArticleId = articleId;
                document.title = `${article.title} - Pitchutcha`;

                this.dom.breadcrumb.textContent = article.breadcrumb || 'Artigo';
                this.dom.articleTitle.textContent = article.title;
                this.dom.articleSubtitle.innerHTML = article.subtitle || '';
                this.dom.contentBody.innerHTML = article.content;

                this.renderArticleMeta(article);
                this.renderNavButtons(article);
                this.renderToc();
                this.updateActiveSidebarLink();
                this.applyGlossaryTooltips();

                if (typeof hljs !== 'undefined') {
                    document.querySelectorAll('pre code').forEach(hljs.highlightElement);
                }

                this.dom.mainContent.scrollTop = 0;
                
                if (window.innerWidth <= 1024) this.closeSidebar();
            },
            
            renderArticleMeta(article) {
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
                
                // A lógica de observação do scroll para o TOC será adicionada na parte 4
            },

            renderNavButtons(article) {
                let html = '';
                if (article.prevArticle) {
                    const prev = appData.articles[article.prevArticle];
                    html += `<a href="#${article.prevArticle}" class="nav-button prev"><span>Anterior</span><h4>${prev.title}</h4></a>`;
                }
                if (article.nextArticle) {
                    const next = appData.articles[article.nextArticle];
                    html += `<a href="#${article.nextArticle}" class="nav-button next"><span>Próximo</span><h4>${next.title}</h4></a>`;
                }
                this.dom.navButtons.innerHTML = html;
            },

            renderSearchResults(results) {
                if (results.length === 0) {
                    this.dom.searchResults.innerHTML = '<li class="no-results" role="option">Nenhum resultado encontrado.</li>';
                } else {
                    this.dom.searchResults.innerHTML = results.map(r => `<li role="option"><a href="#${r.id}">${r.title}</a></li>`).join('');
                }
            },
        });

/*================ FIM DA PARTE 3 ================*/
/*=============== INÍCIO DA PARTE 4 ===============*/

        /**
         * ===================================================================
         * 5. MÉTODOS DE LÓGICA / HANDLERS DE EVENTOS
         * ===================================================================
         */
        Object.assign(PitchutchaApp, {
            
            tocObserver: null, // Propriedade para guardar nosso observador de scroll

            // --- MÉTODOS DE LÓGICA / HANDLERS DE EVENTOS ---

            handleRouting(articleId = null, isRedirect = false) {
                if (!articleId) {
                    articleId = window.location.hash.substring(1);
                }
                if (!appData.articles[articleId]) {
                    articleId = 'home';
                }
                
                if (isRedirect || window.location.hash !== `#${articleId}`) {
                    window.history.pushState(null, '', `#${articleId}`);
                }

                this.renderContent(articleId);
            },

            handleSidebarClick(event) {
                const categoryTitle = event.target.closest('.category-title');
                if (categoryTitle) {
                    this.toggleCategory(categoryTitle.parentElement);
                }
                // A navegação agora é tratada pelo 'popstate' e links href normais
            },

            handleSearch(event) {
                this.state.searchQuery = event.target.value.toLowerCase().trim();
                if (this.state.searchQuery.length > 1) {
                    this.dom.clearSearchBtn.classList.remove('hidden');
                    const results = Object.entries(appData.articles)
                        .map(([id, article]) => ({ id, ...article }))
                        .filter(a => a.title.toLowerCase().includes(this.state.searchQuery) || a.content.toLowerCase().includes(this.state.searchQuery));
                    this.renderSearchResults(results);
                    this.dom.searchResults.classList.remove('hidden');
                } else {
                    this.clearSearch();
                }
            },
            
            clearSearch() {
                this.dom.searchInput.value = '';
                this.state.searchQuery = '';
                this.dom.searchResults.classList.add('hidden');
                this.dom.clearSearchBtn.classList.add('hidden');
            },

            handleClickOutsideSearch(event) {
                if (!this.dom.searchInput.parentElement.contains(event.target)) {
                    this.dom.searchResults.classList.add('hidden');
                }
            },

            toggleCategory(categoryElement) {
                const isOpen = categoryElement.classList.toggle('open');
                categoryElement.querySelector('.category-title').setAttribute('aria-expanded', isOpen);
            },

            toggleSidebar() {
                this.state.sidebarOpen = !this.state.sidebarOpen;
                this.dom.sidebar.classList.toggle('open', this.state.sidebarOpen);
                this.dom.menuToggleBtn.setAttribute('aria-expanded', this.state.sidebarOpen);
            },

            closeSidebar() {
                if (this.state.sidebarOpen) this.toggleSidebar();
            },

            updateReadingProgress() {
                const scrollableHeight = this.dom.mainContent.scrollHeight - this.dom.mainContent.clientHeight;
                const scrollTop = this.dom.mainContent.scrollTop;
                const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
                this.dom.readingProgressBar.style.width = `${progress}%`;
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
                        this.setTheme(this.state.currentTheme); // Aplica o padrão
                    }
                } catch (e) {
                     this.setTheme(this.state.currentTheme); // Aplica o padrão em caso de erro
                }
            },
            
            // --- LÓGICA DO ÍNDICE "NESTA PÁGINA" (TOC) ---

            setupTocObserver() {
                if (this.tocObserver) {
                    this.tocObserver.disconnect();
                }

                const headings = this.dom.contentBody.querySelectorAll('h2, h3');
                if (headings.length < 2) return;

                const options = {
                    root: this.dom.mainContent,
                    rootMargin: '0px 0px -80% 0px', // Ativa quando o título está no topo da tela
                    threshold: 1.0
                };

                this.tocObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        const id = entry.target.getAttribute('id');
                        const tocLink = this.dom.tocNav.querySelector(`a[href="#${id}"]`);
                        if (entry.isIntersecting) {
                            this.dom.tocNav.querySelectorAll('a.active').forEach(a => a.classList.remove('active'));
                            if(tocLink) tocLink.classList.add('active');
                        }
                    });
                }, options);

                headings.forEach(heading => this.tocObserver.observe(heading));
            },


            // --- MÉTODOS UTILITÁRIOS ---

            updateActiveSidebarLink() {
                this.dom.sidebarNav.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.toggle('active', link.href.endsWith(`#${this.state.currentArticleId}`));
                });
            },

            applyGlossaryTooltips() {
                 const regex = new RegExp(`\\b(${Object.keys(appData.glossary).join('|')})\\b`, 'gi');
                const walker = document.createTreeWalker(this.dom.contentBody, NodeFilter.SHOW_TEXT);
                let node;
                while (node = walker.nextNode()) {
                    if (node.parentElement.tagName === 'SPAN' && node.parentElement.classList.contains('glossary-term')) continue;
                    
                    const newHTML = node.textContent.replace(regex, (match) => {
                        const termKey = Object.keys(appData.glossary).find(k => k.toLowerCase() === match.toLowerCase());
                        return `<span class="glossary-term" data-definition="${appData.glossary[termKey]}">${match}</span>`;
                    });

                    if (newHTML !== node.textContent) {
                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = newHTML;
                        node.replaceWith(...tempDiv.childNodes);
                    }
                }
            }
        });

        /**
         * ===================================================================
         * 6. INICIALIZAÇÃO DA APLICAÇÃO
         * ===================================================================
         * Dispara o método init do nosso objeto principal para iniciar o site.
         */
        PitchutchaApp.init();

    } catch (error) {
        console.error("Erro fatal na inicialização do Pitchutcha:", error);
        document.body.innerHTML = `<div style="font-family: sans-serif; color: #ff4d4d; background-color: #111; padding: 2rem;"><h1>Erro Crítico na Aplicação</h1><p>Ocorreu um erro que impediu o carregamento do site. Verifique o console do navegador (F12) para detalhes técnicos.</p><pre style="background-color: #222; padding: 1rem; border-radius: 8px; margin-top: 1rem; color: #ffb8b8;">${error.stack}</pre></div>`;
    }

}); // Fim do DOMContentLoaded


/*================ FIM DA PARTE 4 ================*/
