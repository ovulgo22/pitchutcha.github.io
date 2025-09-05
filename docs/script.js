/*
====================================================================================
PROJETO: Pitchutcha (Versão Final Completa)
ARQUIVO: script.js
DESCRIÇÃO: Script completo com arquitetura SPA, conteúdo e todas as funcionalidades.
====================================================================================
*/

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    /**
     * ===================================================================
     * BANCO DE DADOS DE CONTEÚDO (appData) - VERSÃO EXPANDIDA
     * ===================================================================
     * Todo o conteúdo do site vive aqui.
     */
    const appData = {
        categories: [
            { id: 'fundacoes', name: 'Fundações da Computação', open: true },
            { id: 'hardware', name: 'Hardware e Arquitetura', open: false },
            { id: 'so', name: 'Sistemas Operacionais', open: false },
            { id: 'redes', name: 'Redes de Computadores', open: false },
            { id: 'algoritmos', name: 'Algoritmos e Estruturas de Dados', open: false },
            { id: 'linguagens', name: 'Linguagens de Programação', open: false },
            { id: 'db', name: 'Bancos de Dados', open: false },
            { id: 'arquitetura', name: 'Arquitetura de Software', open: false },
            { id: 'seguranca', name: 'Segurança da Informação', open: false },
            { id: 'devops', name: 'DevOps e Cloud Computing', open: false },
            { id: 'avancado', name: 'Tópicos Avançados', open: false },
        ],
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
                            <div class="card"><h3 class="card-title">Pioneiros da Computação</h3><p class="card-description">Conheça as mentes brilhantes como Ada Lovelace, Alan Turing e Grace Hopper.</p></div>
                        </a>
                        <a href="#hardware/cpu" class="card-link">
                            <div class="card"><h3 class="card-title">Como funciona uma CPU</h3><p class="card-description">Mergulhe na arquitetura que alimenta todos os dispositivos modernos.</p></div>
                        </a>
                         <a href="#arquitetura/api-design" class="card-link">
                            <div class="card"><h3 class="card-title">Design de APIs</h3><p class="card-description">Descubra como os sistemas conversam entre si usando REST e GraphQL.</p></div>
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
                nextArticle: 'hardware/cpu'
            },
            'hardware/cpu': {
                title: 'CPU e Microprocessadores',
                breadcrumb: 'Hardware e Arquitetura',
                content: `
                    <h2 id="o-cerebro">O Cérebro do Computador</h2>
                    <p>A Unidade Central de Processamento, ou CPU, é o componente de hardware primário que executa as instruções de um programa de computador. Ela realiza operações aritméticas, lógicas, de controle e de entrada/saída (I/O).</p>
                    <h2 id="componentes">Componentes Principais</h2>
                    <ul>
                        <li><strong>Unidade Lógica e Aritmética (ULA):</strong> Realiza cálculos matemáticos e operações lógicas.</li>
                        <li><strong>Unidade de Controle (UC):</strong> Dirige o fluxo de operações, interpretando instruções e enviando sinais de controle para outros componentes.</li>
                        <li><strong>Registradores:</strong> Pequenas e rápidas unidades de memória que armazenam dados temporariamente para a CPU.</li>
                    </ul>
                    <h2 id="ciclo">Ciclo de Instrução</h2>
                    <p>A CPU opera em um ciclo contínuo para processar instruções:</p>
                    <ol>
                        <li><strong>Busca (Fetch):</strong> A UC busca a próxima instrução da memória.</li>
                        <li><strong>Decodificação (Decode):</strong> A UC interpreta a instrução.</li>
                        <li><strong>Execução (Execute):</strong> A ULA executa a operação.</li>
                        <li><strong>Armazenamento (Store):</strong> O resultado é armazenado em um registrador ou na memória.</li>
                    </ol>
                    <pre><code class="language-assembly">; Exemplo simples de Assembly
MOV AX, 5  ; Mover o valor 5 para o registrador AX
ADD AX, 3  ; Adicionar 3 ao registrador AX (agora AX = 8)</code></pre>
                `,
                prevArticle: 'fundacoes/pioneiros'
            },
            'arquitetura/api-design': {
                title: 'Design de APIs (REST & GraphQL)',
                breadcrumb: 'Arquitetura de Software',
                content: `
                    <h2 id="o-que-e-api">O que é uma API?</h2>
                    <p>Uma Interface de Programação de Aplicações (API) é um conjunto de regras e definições que permite que diferentes aplicações de software se comuniquem. Elas são os "garçons" do mundo do software, pegando um pedido (requisição) de um cliente e trazendo a resposta do sistema (servidor).</p>
                    <h2 id="rest">REST (Representational State Transfer)</h2>
                    <p>REST é um estilo arquitetural que define um conjunto de restrições para a criação de web services. É o padrão mais comum para APIs na web.</p>
                    <ul>
                        <li>Usa métodos HTTP padrão: <code>GET</code> (ler), <code>POST</code> (criar), <code>PUT</code>/<code>PATCH</code> (atualizar), <code>DELETE</code> (remover).</li>
                        <li>É stateless: cada requisição do cliente deve conter toda a informação necessária para o servidor entendê-la.</li>
                        <li>Usa URLs (endpoints) para identificar recursos. Ex: <code>/api/users/123</code>.</li>
                    </ul>
                    <h2 id="graphql">GraphQL</h2>
                    <p>GraphQL é uma linguagem de consulta para APIs desenvolvida pelo Facebook. Ela permite que o cliente peça exatamente os dados de que precisa, e nada mais.</p>
                    <ul>
                        <li><strong>Evita over-fetching:</strong> O cliente especifica os campos que quer, evitando receber dados desnecessários.</li>
                        <li><strong>Endpoint único:</strong> Geralmente, todas as requisições são enviadas para um único endpoint (ex: <code>/graphql</code>).</li>
                        <li><strong>Fortemente tipado:</strong> O schema da API é definido com um sistema de tipos, o que garante a consistência dos dados.</li>
                    </ul>
                    <pre><code class="language-graphql"># Exemplo de consulta GraphQL
query GetUserDetails {
  user(id: "123") {
    name
    email
    posts {
      title
    }
  }
}</code></pre>
                `,
            },
            'avancado/computacao-quantica': {
                title: 'Computação Quântica',
                breadcrumb: 'Tópicos Avançados',
                content: `
                    <h2 id="alem-do-bit">Além do Bit Clássico</h2>
                    <p>Enquanto a computação clássica se baseia em bits que podem ser 0 ou 1, a computação quântica usa <strong>qubits</strong>. Um qubit aproveita os princípios da mecânica quântica para existir em múltiplos estados ao mesmo tempo.</p>
                    <h2 id="superposicao">Superposição</h2>
                    <p>Um qubit pode estar em uma superposição de 0 e 1. É como uma moeda girando no ar antes de cair: ela não é nem cara nem coroa, mas uma combinação de ambas as possibilidades. Apenas quando medimos o qubit, ele "colapsa" para um estado definido (0 ou 1).</p>
                    <h2 id="entrelacamento">Entrelaçamento (Emaranhamento)</h2>
                    <p>O entrelaçamento é um fenômeno quântico onde dois ou mais qubits se tornam interligados de tal forma que o estado de um afeta instantaneamente o estado do outro, não importa a distância que os separe. Einstein chamou isso de "ação fantasmagórica à distância".</p>
                    <h2 id="aplicacoes">Aplicações Potenciais</h2>
                    <ul>
                        <li><strong>Criptografia:</strong> Quebra de algoritmos de criptografia atuais e criação de novos métodos seguros (criptografia quântica).</li>
                        <li><strong>Desenvolvimento de Fármacos:</strong> Simulação de moléculas complexas para criar novos medicamentos.</li>
                        <li><strong>Otimização:</strong> Resolução de problemas complexos de logística, finanças e machine learning de forma muito mais rápida.</li>
                    </ul>
                `,
            },
        },
        glossary: {
            "API": "Interface de Programação de Aplicações. Um conjunto de regras que permite que diferentes softwares se comuniquem.",
            "CPU": "Unidade Central de Processamento. O 'cérebro' do computador, responsável por executar instruções.",
            "HTTP": "Protocolo de Transferência de Hipertexto. O protocolo fundamental usado para a comunicação na World Wide Web.",
            "Qubit": "Bit quântico. A unidade básica de informação na computação quântica, que pode existir em uma superposição de estados.",
            "Kernel": "O núcleo de um sistema operacional, responsável por gerenciar os recursos do sistema e a comunicação entre hardware e software."
        }
    };

    // FIM DA PARTE 1. O código continua na próxima parte.
    /**
     * ===================================================================
     * OBJETO PRINCIPAL DA APLICAÇÃO (PitchutchaApp)
     * ===================================================================
     * Gerencia o estado, a renderização e os eventos do site.
     * Usamos um objeto para organizar o código de forma limpa e modular.
     */
    const PitchutchaApp = {
        // --- PROPRIEDADES (STATE) ---
        dom: {}, // Armazena referências aos elementos do DOM
        state: {
            currentArticleId: null, // ID do artigo sendo exibido
            sidebarOpen: window.innerWidth > 1024, // Sidebar começa aberta em telas grandes
            searchResults: [], // Armazena os resultados da busca
        },

        /**
         * Ponto de entrada da aplicação.
         * É chamado quando o DOM está pronto.
         */
        init() {
            console.log("PitchutchaApp: Inicializando a aplicação...");
            
            // 1. Mapeia os elementos do DOM para acesso fácil
            this.cacheDom();

            // 2. Registra todos os event listeners (cliques, busca, etc.)
            this.bindEvents();

            // 3. Processa a URL inicial para carregar o artigo correto
            this.handleRouting();

            // 4. Renderiza a barra lateral com categorias e artigos
            this.renderSidebar();

            // 5. Adiciona um listener para o botão de voltar/avançar do navegador
            window.addEventListener('popstate', this.handleRouting.bind(this));
            
            console.log("PitchutchaApp: Aplicação inicializada com sucesso.");
        },

        /**
         * Seleciona e armazena os elementos do DOM que serão usados frequentemente.
         */
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
        },

        /**
         * Centraliza o registro de todos os eventos da aplicação.
         */
        bindEvents() {
            // Evento para abrir/fechar categorias na sidebar
            this.dom.sidebarNav.addEventListener('click', this.toggleCategory.bind(this));
            
            // Eventos da barra de busca
            this.dom.searchInput.addEventListener('keyup', this.handleSearch.bind(this));
            this.dom.searchInput.addEventListener('focus', () => this.dom.searchResults.classList.remove('hidden'));
            document.addEventListener('click', this.handleClickOutsideSearch.bind(this)); // Fecha busca ao clicar fora
            this.dom.clearSearchBtn.addEventListener('click', this.clearSearch.bind(this));

            // Evento para o botão de abrir/fechar menu (mobile)
            this.dom.menuToggleBtn.addEventListener('click', this.toggleSidebar.bind(this));
        },

        // --- MÉTODOS DE RENDERIZAÇÃO E LÓGICA (Serão adicionados nas próximas partes) ---

    };

    // FIM DA PARTE 2. O código continua na próxima parte.
    /**
     * ===================================================================
     * CONTINUAÇÃO DO OBJETO PitchutchaApp (MÉTODOS DE RENDERIZAÇÃO)
     * ===================================================================
     */
    Object.assign(PitchutchaApp, {

        /**
         * Renderiza (desenha) todo o conteúdo da barra lateral.
         */
        renderSidebar() {
            const getArticleLink = (id, title) => {
                const isActive = id === this.state.currentArticleId;
                return `<li><a href="#${id}" class="nav-link ${isActive ? 'active' : ''}">${title}</a></li>`;
            };

            this.dom.sidebarNav.innerHTML = appData.categories.map(category => `
                <div class="category-group ${category.open ? 'open' : ''}" data-category-id="${category.id}">
                    <h3 class="category-title">
                        <span>${category.name}</span>
                        <svg class="icon-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>
                    </h3>
                    <ul class="nav-list">
                        ${Object.entries(appData.articles)
                            .filter(([id]) => id.startsWith(category.id))
                            .map(([id, article]) => getArticleLink(id, article.title))
                            .join('')
                        }
                    </ul>
                </div>
            `).join('');
        },

        /**
         * Renderiza o conteúdo principal de um artigo específico.
         * @param {string} articleId - A chave do artigo em appData.articles.
         */
        renderContent(articleId) {
            const article = appData.articles[articleId];
            if (!article) {
                this.renderContent('introducao'); // Artigo padrão se não encontrar
                return;
            }

            this.state.currentArticleId = articleId;
            document.title = `${article.title} - Pitchutcha`;

            // Atualiza o DOM
            this.dom.breadcrumb.textContent = article.breadcrumb;
            this.dom.articleTitle.textContent = article.title;
            this.dom.articleSubtitle.innerHTML = article.subtitle || '';
            this.dom.contentBody.innerHTML = article.content;

            // Renderiza os botões de navegação "Anterior" e "Próximo"
            this.renderNavButtons(article);

            // Realça o link ativo na sidebar
            this.updateActiveSidebarLink();
            
            // Aplica o realce de sintaxe nos blocos de código
            document.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightElement(block);
            });

            // Aplica tooltips do glossário
            this.applyGlossaryTooltips();

            // Rola a página para o topo
            this.dom.mainContent.scrollTop = 0;
            
            // Fecha a sidebar em telas pequenas após selecionar um artigo
            if (window.innerWidth <= 1024) {
                this.closeSidebar();
            }
        },

        /**
         * Renderiza os botões de navegação (artigo anterior/próximo).
         * @param {object} article - O objeto do artigo atual.
         */
        renderNavButtons(article) {
            let html = '';
            if (article.prevArticle) {
                const prev = appData.articles[article.prevArticle];
                html += `<a href="#${article.prevArticle}" class="nav-button prev">
                           <span>Anterior</span>
                           <h4>${prev.title}</h4>
                         </a>`;
            }
            if (article.nextArticle) {
                const next = appData.articles[article.nextArticle];
                html += `<a href="#${article.nextArticle}" class="nav-button next">
                           <span>Próximo</span>
                           <h4>${next.title}</h4>
                         </a>`;
            }
            this.dom.navButtons.innerHTML = html;
        },

        /**
         * Atualiza qual link está com a classe 'active' na sidebar.
         */
        updateActiveSidebarLink() {
            this.dom.sidebarNav.querySelectorAll('.nav-link').forEach(link => {
                if (link.href.endsWith(`#${this.state.currentArticleId}`)) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    });

    // FIM DA PARTE 3. O código continua na próxima parte.
    /**
     * ===================================================================
     * CONTINUAÇÃO DO OBJETO PitchutchaApp (LÓGICA DE EVENTOS E ROTEAMENTO)
     * ===================================================================
     */
    Object.assign(PitchutchaApp, {

        /**
         * Lida com a navegação baseada na hash da URL (#).
         * Determina qual artigo carregar.
         */
        handleRouting() {
            let articleId = window.location.hash.substring(1);
            if (!appData.articles[articleId]) {
                articleId = 'introducao'; // Artigo padrão
                window.location.hash = '#introducao';
            }
            this.renderContent(articleId);
        },

        /**
         * Lida com a entrada de texto na barra de busca.
         * Filtra os artigos e exibe os resultados.
         */
        handleSearch(event) {
            const query = event.target.value.toLowerCase().trim();

            if (query.length > 1) {
                this.dom.clearSearchBtn.classList.remove('hidden');
                this.state.searchResults = Object.entries(appData.articles)
                    .map(([id, article]) => ({ id, ...article }))
                    .filter(article =>
                        article.title.toLowerCase().includes(query) ||
                        article.content.toLowerCase().includes(query)
                    );

                this.renderSearchResults();
                this.dom.searchResults.classList.remove('hidden');
            } else {
                this.clearSearch();
            }
        },

        /**
         * Limpa o campo de busca e esconde os resultados.
         */
        clearSearch() {
            this.dom.searchInput.value = '';
            this.state.searchResults = [];
            this.dom.searchResults.classList.add('hidden');
            this.dom.clearSearchBtn.classList.add('hidden');
        },
        
        /**
         * Renderiza a lista de resultados da busca.
         */
        renderSearchResults() {
            if (this.state.searchResults.length === 0) {
                this.dom.searchResults.innerHTML = '<li class="no-results">Nenhum resultado encontrado.</li>';
            } else {
                this.dom.searchResults.innerHTML = this.state.searchResults.map(article =>
                    `<li><a href="#${article.id}">${article.title}</a></li>`
                ).join('');
            }
        },
        
        /**
         * Fecha a caixa de resultados da busca se o usuário clicar fora dela.
         */
        handleClickOutsideSearch(event) {
            if (!this.dom.searchInput.contains(event.target) && !this.dom.searchResults.contains(event.target)) {
                this.dom.searchResults.classList.add('hidden');
            }
        },

        /**
         * Expande ou recolhe uma categoria de artigos na sidebar.
         */
        toggleCategory(event) {
            const categoryTitle = event.target.closest('.category-title');
            if (categoryTitle) {
                categoryTitle.parentElement.classList.toggle('open');
            }
        },

        /**
         * Abre ou fecha a sidebar (usado em telas menores).
         */
        toggleSidebar() {
            this.state.sidebarOpen = !this.state.sidebarOpen;
            if (this.state.sidebarOpen) {
                this.dom.sidebar.classList.add('open');
            } else {
                this.dom.sidebar.classList.remove('open');
            }
        },

        openSidebar() {
            this.state.sidebarOpen = true;
            this.dom.sidebar.classList.add('open');
        },

        closeSidebar() {
            this.state.sidebarOpen = false;
            this.dom.sidebar.classList.remove('open');
        }
    });

    // FIM DA PARTE 4. O código continua na próxima parte.
    /**
     * ===================================================================
     * CONTINUAÇÃO DO OBJETO PitchutchaApp (LÓGICA FINAL E INICIALIZAÇÃO)
     * ===================================================================
     */
    Object.assign(PitchutchaApp, {
        
        /**
         * Encontra termos do glossário no conteúdo e adiciona tooltips.
         */
        applyGlossaryTooltips() {
            const content = this.dom.contentBody;
            const terms = Object.keys(appData.glossary);

            // Regex para encontrar os termos como palavras inteiras, não sensível a maiúsculas/minúsculas
            const regex = new RegExp(`\\b(${terms.join('|')})\\b`, 'gi');

            // Substitui apenas em nós de texto para não quebrar o HTML
            const textNodes = document.createTreeWalker(content, NodeFilter.SHOW_TEXT);
            let currentNode;
            while (currentNode = textNodes.nextNode()) {
                if (currentNode.parentElement.tagName === 'SPAN' && currentNode.parentElement.classList.contains('glossary-term')) {
                    continue; // Pula os nós que já foram processados
                }

                const newHTML = currentNode.textContent.replace(regex, (match) => {
                    const termKey = Object.keys(appData.glossary).find(key => key.toLowerCase() === match.toLowerCase());
                    const definition = appData.glossary[termKey];
                    return `<span class="glossary-term" data-definition="${definition}">${match}</span>`;
                });

                if (newHTML !== currentNode.textContent) {
                    const tempWrapper = document.createElement('div');
                    tempWrapper.innerHTML = newHTML;
                    const newNodes = Array.from(tempWrapper.childNodes);
                    
                    newNodes.forEach(newNode => {
                        currentNode.parentNode.insertBefore(newNode, currentNode);
                    });
                    
                    currentNode.parentNode.removeChild(currentNode);
                }
            }
        }
    });


    /**
     * ===================================================================
     * INICIALIZAÇÃO DA APLICAÇÃO
     * ===================================================================
     * Dispara o método init do nosso objeto principal.
     */
    PitchutchaApp.init();

});
