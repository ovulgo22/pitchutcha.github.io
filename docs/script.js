/* ==========================================================================
   PITCHUTCHA - SCRIPT PRINCIPAL (VERSÃO EXPANDIDA)
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
                { id: 'webdev', name: 'Desenvolvimento Web', open: false },
                { id: 'ia', name: 'Inteligência Artificial', open: false },
                { id: 'seguranca', name: 'Cibersegurança', open: false },
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
                        <p>Este projeto é mantido por <a href="https://github.com/ovulgo22" target="_blank" rel="noopener noreferrer">ovulgo22</a> e sua comunidade. Use o menu lateral para explorar os tópicos.</p>
                    `,
                },
                // FUNDAÇÕES
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
                // DESENVOLVIMENTO WEB
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
                // INTELIGÊNCIA ARTIFICIAL
                'ia/llms': {
                    title: 'Modelos de Linguagem Grandes (LLMs)',
                    breadcrumb: 'Inteligência Artificial',
                    content: `<h2>A Revolução da IA Generativa</h2><p>Large Language Models (LLMs) são modelos de inteligência artificial massivos, treinados em vastas quantidades de texto, capazes de entender e gerar linguagem humana com uma fluidez sem precedentes. Baseados na arquitetura <a href="https://ai.google/research/pubs/pub46201" target="_blank" rel="noopener noreferrer">Transformer</a>, modelos como o GPT (Generative Pre-trained Transformer) e o Gemini são exemplos que impulsionam aplicações como chatbots avançados, assistentes de codificação, e ferramentas de criação de conteúdo.</p>`,
                },
                // CIBERSEGURANÇA
                'seguranca/zero-trust': {
                    title: 'Arquitetura Zero Trust',
                    breadcrumb: 'Cibersegurança',
                    content: `<h2>"Nunca Confie, Sempre Verifique"</h2><p>Zero Trust é um modelo de segurança estratégica que opera sob o princípio de que nenhuma pessoa ou dispositivo, dentro ou fora da rede de uma organização, deve ter acesso a sistemas ou dados até que sua identidade e autorização sejam verificadas. Em vez de um perímetro de segurança tradicional (o "castelo e fosso"), a arquitetura Zero Trust trata cada solicitação de acesso como uma ameaça em potencial, exigindo autenticação e autorização rigorosas para cada recurso.</p>`,
                },
                // TÓPICOS AVANÇADOS
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
            },
            
            // -- Propriedade para "cachear" elementos do DOM para acesso rápido
            dom: {},

            // -- Métodos da aplicação serão adicionados nas próximas partes
        };

    } catch (error) {
        console.error("Erro fatal na inicialização do Pitchutcha:", error);
        document.body.innerHTML = `<div style="font-family: sans-serif; color: #ff4d4d; background-color: #111; padding: 2rem;">
            <h1>Erro Crítico na Aplicação</h1>
            <p>Ocorreu um erro que impediu o carregamento do site. Verifique o console do navegador (F12) para detalhes técnicos.</p>
            <pre style="background-color: #222; padding: 1rem; border-radius: 8px; margin-top: 1rem; color: #ffb8b8;">${error.stack}</pre>
        </div>`;
    }

}); // Fim do DOMContentLoaded

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
                this.cacheDom();
                this.bindEvents();
                this.handleRouting(); // Processa a URL inicial
                this.renderSidebar(); // Desenha a sidebar inicial
                console.log("PitchutchaApp: Aplicação pronta.");
            },

            /**
             * Mapeia elementos do DOM para o objeto `dom` para acesso rápido.
             * Uma prática de performance para evitar queries repetidas.
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
                this.dom.readingProgressBar = document.getElementById('reading-progress-bar');
                this.dom.feedbackWidget = document.getElementById('feedback-widget');
            },

            /**
             * Centraliza o registro de todos os eventos da aplicação.
             * Adiciona os "ouvintes" para interações do usuário.
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

                // Evento para os botões de feedback do artigo
                this.dom.feedbackWidget.addEventListener('click', this.handleFeedback.bind(this));
            },

        });

