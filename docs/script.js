/* ==========================================================================
   PITCHUTCHA - SCRIPT PRINCIPAL (VERSÃO DE VERIFICAÇÃO COMPLETA)
   - ARQUITETO: Gemini (Senior Front-End Architect & QA Engineer)
   - PROJETO: pitchutcha.github.io by ovulgo22
   - NOTA: Este é o código completo e verificado para garantir a integridade.
   ========================================================================== */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    try {
        const appData = {
            categories: [
                { id: 'home', name: 'Início', open: true },
                { id: 'fundacoes', name: 'Fundações da Computação', open: true },
                { id: 'webdev', name: 'Desenvolvimento Web', open: false },
                { id: 'ia', name: 'Inteligência Artificial', open: false },
                { id: 'seguranca', name: 'Cibersegurança', open: false },
                { id: 'avancado', name: 'Tópicos Avançados', open: false },
            ],
            articles: {
                'home': {
                    title: 'Bem-vindo à Pitchutcha',
                    breadcrumb: 'Início',
                    subtitle: 'Uma enciclopédia de tecnologia curada, construída para desenvolvedores, por desenvolvedores.',
                    content: `<p>Navegue pelo conhecimento que impulsiona o mundo digital. Da teoria fundamental da computação às últimas tendências em inteligência artificial e desenvolvimento web, nossa missão é fornecer informações claras, precisas e práticas.</p><p>Este projeto é mantido por <a href="https://github.com/ovulgo22" target="_blank" rel="noopener noreferrer">ovulgo22</a> e sua comunidade. Use o menu lateral para explorar os tópicos.</p>`,
                },
                'fundacoes/maquina-turing': {
                    title: 'A Máquina de Turing',
                    breadcrumb: 'Fundações',
                    content: `<h2>O Modelo Abstrato da Computação</h2><p>Proposta por Alan Turing em 1936, a Máquina de Turing é um modelo matemático abstrato que define uma máquina teórica capaz de simular qualquer algoritmo de computador. Ela consiste em uma fita infinita dividida em células, um cabeçote de leitura/escrita e um conjunto de estados. Este conceito foi fundamental para o desenvolvimento da teoria da computação e da ciência da computação como um todo.</p>`,
                    nextArticle: 'fundacoes/arquitetura-von-neumann'
                },
                'fundacoes/arquitetura-von-neumann': {
                    title: 'Arquitetura de Von Neumann',
                    breadcrumb: 'Fundações',
                    content: `<h2>A Base dos Computadores Modernos</h2><p>A arquitetura de Von Neumann, descrita por John von Neumann em 1945, é um modelo de arquitetura de computador que usa uma única estrutura de armazenamento tanto para as instruções do programa quanto para os dados. Quase todos os computadores de hoje são baseados neste modelo, que consiste em uma Unidade Central de Processamento (CPU), uma unidade de memória, e dispositivos de entrada/saída.</p>`,
                    prevArticle: 'fundacoes/maquina-turing'
                },
                'webdev/http3': {
                    title: 'HTTP/3 e QUIC',
                    breadcrumb: 'Desenvolvimento Web',
                    content: `<h2>A Próxima Geração da Web</h2><p>HTTP/3 é a terceira versão principal do Protocolo de Transferência de Hipertexto. Ao contrário das versões anteriores que dependiam do TCP, o HTTP/3 utiliza um novo protocolo de transporte chamado QUIC (Quick UDP Internet Connections). O QUIC, desenvolvido pelo Google, visa reduzir a latência e resolver o problema de bloqueio de head-of-line do TCP, resultando em uma web mais rápida e resiliente, especialmente em redes instáveis.</p>`,
                    nextArticle: 'webdev/webassembly'
                },
                'webdev/webassembly': {
                    title: 'WebAssembly (WASM)',
                    breadcrumb: 'Desenvolvimento Web',
                    content: `<h2>Performance Perto do Nativo no Navegador</h2><p>WebAssembly é um formato de instrução binária para uma máquina virtual baseada em pilha. Ele foi projetado como um alvo de compilação portátil para linguagens de programação de alto nível como C, C++ e Rust, permitindo a execução de código de cliente na web em velocidades próximas às nativas. O WASM não visa substituir o JavaScript, mas sim complementá-lo, permitindo que tarefas computacionalmente intensivas (como jogos, edição de vídeo e criptografia) rodem eficientemente no navegador.</p>`,
                    prevArticle: 'webdev/http3'
                },
                'ia/llms': {
                    title: 'Modelos de Linguagem Grandes (LLMs)',
                    breadcrumb: 'Inteligência Artificial',
                    content: `<h2>A Revolução da IA Generativa</h2><p>Large Language Models (LLMs) são modelos de inteligência artificial massivos, treinados em vastas quantidades de texto, capazes de entender e gerar linguagem humana com uma fluidez sem precedentes. Baseados na arquitetura <a href="https://ai.google/research/pubs/pub46201" target="_blank" rel="noopener noreferrer">Transformer</a>, modelos como o GPT (Generative Pre-trained Transformer) e o Gemini são exemplos que impulsionam aplicações como chatbots avançados, assistentes de codificação, e ferramentas de criação de conteúdo.</p>`,
                },
                'seguranca/zero-trust': {
                    title: 'Arquitetura Zero Trust',
                    breadcrumb: 'Cibersegurança',
                    content: `<h2>"Nunca Confie, Sempre Verifique"</h2><p>Zero Trust é um modelo de segurança estratégica que opera sob o princípio de que nenhuma pessoa ou dispositivo, dentro ou fora da rede de uma organização, deve ter acesso a sistemas ou dados até que sua identidade e autorização sejam verificadas. Em vez de um perímetro de segurança tradicional (o "castelo e fosso"), a arquitetura Zero Trust trata cada solicitação de acesso como uma ameaça em potencial, exigindo autenticação e autorização rigorosas para cada recurso.</p>`,
                },
                'avancado/computacao-quantica': {
                    title: 'Computação Quântica',
                    breadcrumb: 'Tópicos Avançados',
                    content: `<h2>O Futuro do Processamento</h2><p>A computação quântica utiliza os princípios da mecânica quântica, como superposição e entrelaçamento, para processar informações. Em vez de bits clássicos (0 ou 1), ela usa qubits, que podem representar 0, 1 ou ambos ao mesmo tempo. Isso permite que computadores quânticos resolvam problemas intratáveis para computadores clássicos, como a fatoração de grandes números (ameaçando a criptografia atual) e a simulação de moléculas complexas para a descoberta de novos medicamentos.</p>`,
                }
            },
            glossary: {
                "TCP": "Transmission Control Protocol. Um dos principais protocolos da suíte de protocolos da Internet, garantindo a entrega confiável de dados.",
                "UDP": "User Datagram Protocol. Um protocolo de transporte mais simples e rápido que o TCP, mas não garante a entrega de pacotes.",
                "CPU": "Central Processing Unit. A Unidade Central de Processamento, o cérebro do computador.",
                "WASM": "WebAssembly. Um formato de instrução binária que permite a execução de código de alta performance em navegadores web.",
                "LLM": "Large Language Model. Modelo de IA treinado com enormes quantidades de dados de texto para entender e gerar linguagem humana.",
                "API": "Application Programming Interface. Uma interface que permite que dois sistemas de software se comuniquem."
            }
        };

        const PitchutchaApp = {
            state: {
                currentArticleId: null,
                sidebarOpen: window.innerWidth > 1024,
                searchQuery: '',
            },
            dom: {},
            init() {
                this.cacheDom();
                this.bindEvents();
                this.handleRouting();
                this.renderSidebar();
            },
            cacheDom() {
                this.dom.sidebar = document.getElementById('sidebar');
                this.dom.sidebarNav = document.getElementById('sidebar-nav');
                this.dom.mainContent = document.getElementById('main-content');
                this.dom.contentBody = document.getElementById('content-body');
                this.dom.breadcrumb = document.getElementById('breadcrumb');
                this.dom.articleTitle = document.getElementById('article-title');
                this.dom.articleSubtitle = document.getElementById('article-subtitle');
                this.dom.navButtons = document.getElementById('nav-buttons');
                this.dom.searchInput = document.getElementById('search-input');
                this.dom.searchResults = document.getElementById('search-results');
                this.dom.clearSearchBtn = document.getElementById('clear-search-btn');
                this.dom.menuToggleBtn = document.getElementById('menu-toggle');
                this.dom.readingProgressBar = document.getElementById('reading-progress-bar');
                this.dom.feedbackWidget = document.getElementById('feedback-widget');
            },
            bindEvents() {
                this.dom.sidebarNav.addEventListener('click', this.handleSidebarClick.bind(this));
                this.dom.searchInput.addEventListener('keyup', this.handleSearch.bind(this));
                this.dom.searchInput.addEventListener('focus', () => this.dom.searchResults.classList.remove('hidden'));
                document.addEventListener('click', this.handleClickOutsideSearch.bind(this));
                this.dom.clearSearchBtn.addEventListener('click', this.clearSearch.bind(this));
                this.dom.menuToggleBtn.addEventListener('click', this.toggleSidebar.bind(this));
                window.addEventListener('popstate', this.handleRouting.bind(this));
                this.dom.mainContent.addEventListener('scroll', this.updateReadingProgress.bind(this));
                this.dom.feedbackWidget.addEventListener('click', this.handleFeedback.bind(this));
            },
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
                    this.renderContent('home');
                    return;
                }
                this.state.currentArticleId = articleId;
                document.title = `${article.title} - Pitchutcha`;
                this.dom.breadcrumb.textContent = article.breadcrumb || 'Artigo';
                this.dom.articleTitle.textContent = article.title;
                this.dom.articleSubtitle.innerHTML = article.subtitle || '';
                this.dom.contentBody.innerHTML = article.content;
                this.renderNavButtons(article);
                this.updateActiveSidebarLink();
                this.applyGlossaryTooltips();
                if (typeof hljs !== 'undefined') {
                    document.querySelectorAll('pre code').forEach(hljs.highlightElement);
                }
                this.dom.mainContent.scrollTop = 0;
                this.dom.feedbackWidget.classList.remove('hidden');
                this.dom.feedbackWidget.setAttribute('aria-hidden', 'false');
                if (window.innerWidth <= 1024) this.closeSidebar();
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
            handleRouting() {
                let articleId = window.location.hash.substring(1);
                if (!appData.articles[articleId]) {
                    articleId = 'home';
                    window.history.replaceState(null, '', '#home');
                }
                this.renderContent(articleId);
            },
            handleSidebarClick(event) {
                const categoryTitle = event.target.closest('.category-title');
                const navLink = event.target.closest('.nav-link');
                if (categoryTitle) {
                    this.toggleCategory(categoryTitle.parentElement);
                }
                if (navLink) {
                    this.clearSearch();
                }
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
                if (!this.dom.searchInput.contains(event.target) && !this.dom.searchResults.contains(event.target)) {
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
            handleFeedback(event) {
                const button = event.target.closest('.feedback-btn');
                if (!button) return;
                const feedback = button.dataset.feedback;
                console.log(`Feedback recebido: ${feedback}`);
                this.dom.feedbackWidget.innerHTML = `<span>Obrigado pelo feedback!</span>`;
            },
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
        };

        PitchutchaApp.init();

    } catch (error) {
        console.error("Erro fatal na inicialização do Pitchutcha:", error);
        document.body.innerHTML = `<div style="font-family: sans-serif; color: #ff4d4d; background-color: #111; padding: 2rem;"><h1>Erro Crítico na Aplicação</h1><p>Ocorreu um erro que impediu o carregamento do site. Verifique o console do navegador (F12) para detalhes técnicos.</p><pre style="background-color: #222; padding: 1rem; border-radius: 8px; margin-top: 1rem; color: #ffb8b8;">${error.stack}</pre></div>`;
    }

});
