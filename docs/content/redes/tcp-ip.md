## O Protocolo Padrão da Internet
Enquanto o Modelo OSI é um modelo teórico de 7 camadas, a pilha de protocolos TCP/IP é o conjunto de protocolos prático usado na Internet. Geralmente é descrito com quatro camadas que mapeiam as funções do modelo OSI.

### Camadas do TCP/IP vs. OSI:
* **Aplicação:** Corresponde às camadas 5, 6 e 7 do OSI. Protocolos como HTTP, HTTPS, FTP, DNS operam aqui.
* **Transporte:** Corresponde à camada 4 do OSI. Onde rodam o `TCP` (confiável) e o `UDP` (rápido).
* **Internet (ou Rede):** Corresponde à camada 3 do OSI. Onde roda o `IP` (Internet Protocol), responsável pelo endereçamento lógico.
* **Acesso à Rede (ou Enlace):** Corresponde às camadas 1 e 2 do OSI. Lida com o hardware físico da rede.

O TCP/IP é o modelo que efetivamente faz a internet funcionar hoje.
