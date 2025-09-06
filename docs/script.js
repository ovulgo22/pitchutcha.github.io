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
