# Extensão NirvanaByPass

Este projeto é a extensão NirvanaByPass, desenvolvida para funcionar com o sistema `WSAction`. A extensão interage com a página para procurar por elementos específicos do tipo `iframe` e redirecionar o usuário de acordo. Também se conecta a um servidor WebSocket para gerenciar tarefas de armazenamento e comunicação.

## Instalação

Para instalar a extensão NirvanaByPass, siga estes passos:

1. Clone o projeto ou faça o download dos arquivos.
2. Coloque os arquivos no seguinte diretório dentro do seu projeto: `extensions/NirvanaByPass/`.

A estrutura de diretórios deve ficar assim:

```
extensions/
    NirvanaByPass/
        client.js
        index.js
        meta.json
        icon.png
```

## Arquivos

- **client.js**: Gerencia a funcionalidade do lado do cliente, incluindo a conexão WebSocket e interações com a página.
- **index.js**: Script principal que registra a extensão no sistema `WSAction`.
- **meta.json**: Arquivo de metadados da extensão, incluindo nome, versão e descrição.
- **icon.png**: Ícone que representa a extensão na interface.

## Uso

Após colocar os arquivos no local correto, a extensão NirvanaByPass será inicializada automaticamente quando o sistema `WSAction` carregar. A extensão irá:

- Aguardar o carregamento da página.
- Procurar por um `iframe` com atributos específicos.
- Redirecionar a página atual para a URL do `src` do `iframe`, quando encontrado.

## Requisitos

- Sistema `WSAction` instalado e configurado no seu projeto.
- Servidor WebSocket rodando no IP e porta definidos na configuração.
