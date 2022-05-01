# TrackGo Bot 

<img src="./img/banner.jpg" alt="Banner TrackGo Bot">

> Gerencie e monitore encomendas através de um simples bot no Telegram. Limite-se a informar suas Tracks e deixe o resto com o TrackGo Bot.

## Sobre o projeto

TrackGo é um projeto simples para solucionar uma demanda pessoal para rastreio de encomendas do Correios Brasil.

### Ajustes e melhorias

O projeto ainda está em desenvolvimento e próximas atualizações serão voltadas nos seguintes recursos:

- [ ] Comentar o código <-- **PRIORIDADE**
- [ ] Adicionar instruções de boas-vindas
- [ ] Unificar API e BOT em um único serviço
- [ ] Simplificar requisições ao banco de dados
- [ ] Adicionar suporte a multi-usuários
- [ ] Resolver bug que impede atualização imediata de novas Tracks
- [ ] Menores bugs...

> Lista com recursos das versões nos tópicos abaixo

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:
<!---Estes são apenas requisitos de exemplo. Adicionar, duplicar ou remover conforme necessário--->
* `NodeJS v16.14.2` ou versão mais recente
* Projeto desenvolvido com `MySQL`, talvez haja incompatibilidade com o código em outros bancos de dados.

## 🚀 Instalando o TrackGo Bot

Para instalar o TrackGo Bot, siga estas etapas:

> Faça um clone do projeto:
```
git clone https://github.com/reedbluue/trackgo.git
```

> Instale as dependências do projeto em `./bot` e `./server`:
```
npm install
```

> Configure o arquivo `./server/.env` com as informações do banco de dados:
```
DB_HOST=localhost | <host do banco de dados>
DB_PORT=3306 | <porta que o banco de dados está rodando>
DB_DIALECT=mysql | <banco de dados que está utilizando>
DB_NAME=trackgo_db | <nome do banco de dados para criação de tabelas>
DB_USER=root | <usuário do banco de dados>
DB_PASS= | <deixar em branco caso não tenha>
```

> Configure o arquivo `./bot/.env` com o token de um bot Telegram:    
> Para informações de como conseguir um token: [Criando um bot Telegram](https://core.telegram.org/bots#6-botfather)
```
TOKEN=<token de um bot telegram>
```

> Inicialize os serviços em `./bot` e `./server`:
```
npm run start
```

## ☕ Usando o TrackGo Bot

Para utilizar o TrackGo Bot, basta iniciar uma conversa no chat do seu bot :)

### Comandos do chat

> `/adicionar` - inicia assistente para adicionar uma Track

> `/listaid` - lista todas as Tracks cadastradas

> `/listartodos` - lista todas as Tracks válidas cadastradas

> `/track id_da_track` - lista uma track específica

> `/deletar id_da_track` - deleta uma Track específica

> `/atualizar` - inicia assistente para atualizar uma Track

> `/start` - habilita o monitoramento automático de rastreio do bot

> `/stop` - desabilita o monitoramento automático de rastreio do bot

## 🤝 Acknowledgments

* [@finotilucas - Correios Brasil v2.2.2](https://www.npmjs.com/package/correios-brasil)
* [Logo part by catalyststuff](http://www.freepik.com)

## 🙋🏾‍♂️ Autor

* [Igor Oliveira](https://github.com/reedbluue) - Just another person

## 😄 Seja um dos contribuidores<br>

Quer fazer parte desse projeto? Clique [AQUI](./CONTRIBUTING.md) e leia como contribuir.

## 📝 Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](./LICENSE) para mais detalhes.