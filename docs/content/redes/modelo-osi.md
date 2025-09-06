## As Sete Camadas da Comunicação
O modelo Open Systems Interconnection (OSI) é um modelo conceitual que padroniza as funções de um sistema de telecomunicação ou computação em sete camadas de abstração. Ele fornece um framework para entender como os dados viajam de uma aplicação em um computador para outra em um computador diferente, mesmo que os sistemas operacionais e hardwares sejam distintos.

### As Camadas:
1.  **Física (Physical):** Transmissão de bits brutos sobre um meio físico (cabos, fibra ótica, rádio).
2.  **Enlace (Data Link):** Transferência de quadros (frames) entre nós adjacentes na mesma rede. Responsável pelo controle de erro básico.
3.  **Rede (Network):** Roteamento de pacotes através de múltiplas redes. É aqui que o endereço IP opera.
4.  **Transporte (Transport):** Fornece comunicação ponta a ponta confiável (como o `TCP`) ou não confiável (como o `UDP`).
5.  **Sessão (Session):** Gerencia o diálogo (sessões) entre computadores, abrindo, mantendo e fechando a comunicação.
6.  **Apresentação (Presentation):** Traduz, criptografa e comprime os dados, garantindo que a aplicação receba os dados em um formato utilizável.
7.  **Aplicação (Application):** Fornece serviços de rede diretamente para as aplicações do usuário final (HTTP, FTP, SMTP).
