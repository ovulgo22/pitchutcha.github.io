---
layout: article
title: "A Máquina de Turing"
description: "Entenda o modelo matemático abstrato que define uma máquina teórica capaz de simular qualquer algoritmo de computador."
breadcrumb: "Fundações da Computação"
url: "/articles/fundacoes/maquina-turing.html"
lastUpdated: "2025-09-06"
readingTime: 3
---

## O Modelo Abstrato da Computação
Proposta por Alan Turing em 1936, a Máquina de Turing é um modelo matemático abstrato que define uma máquina teórica capaz de simular qualquer algoritmo de computador. Ela não foi projetada para ser construída fisicamente, mas sim como um experimento mental para explorar os limites da computação.

Ela consiste em uma fita infinita dividida em células, um cabeçote de leitura/escrita e um conjunto de estados finitos que representam a "programação" da máquina.

### Componentes Chave
* **Fita Infinita:** Atua como a memória do computador. Cada célula na fita pode conter um símbolo de um alfabeto finito.
* **Cabeçote:** Pode ler o símbolo na célula atual, escrever um novo símbolo e mover-se uma célula para a esquerda ou para a direita.
* **Unidade de Controle:** Um registrador que armazena o estado atual da máquina. Com base no estado atual e no símbolo lido, a tabela de transição (o "programa") dita o que a máquina deve escrever, para onde se mover e qual será o próximo estado.

### Significado e Legado
O trabalho de Turing com esta máquina teórica foi revolucionário. Ele usou-a para formalizar os conceitos de **algoritmo** e **computabilidade**. A Tese de Church-Turing, um dos princípios fundamentais da ciência da computação, postula que qualquer função computável por um algoritmo pode ser computada por uma Máquina de Turing.

Isso significa que, se um problema não pode ser resolvido por uma Máquina de Turing, ele é considerado "incomputável". Este conceito lançou as bases não apenas para a teoria da computação, mas também para o desenvolvimento da inteligência artificial.
