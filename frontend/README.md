
```markdown
# Tarefas App

O Lista de Tarefas App é uma aplicação web que permite gerenciar tarefas em colunas personalizáveis. Você pode criar, mover e excluir tarefas em diferentes estados de conclusão.

## Funcionalidades

- Exibir tarefas em colunas "A Fazer", "Em Andamento" e "Concluído".
- Criar novas tarefas especificando título e coluna.
- Mover tarefas entre colunas.
- Excluir tarefas.

## Tecnologias Utilizadas

- **Front-end:** React
- **Back-end:** Node.js, Express.js
- **Banco de Dados:** MySQL

## Como Executar a Aplicação

Siga as instruções abaixo para executar a aplicação em seu ambiente local:

### Pré-requisitos

- Node.js: Certifique-se de ter o Node.js instalado em seu sistema. Você pode fazer o download em [nodejs.org](https://nodejs.org/).

- Banco de Dados MySQL: Certifique-se de ter um servidor MySQL em execução ou instale um. Você pode fazer o download em [mysql.com](https://www.mysql.com/).

### Configuração

1. Clone este repositório em sua máquina:

2. Acesse a pasta do projeto:


3. Configuração do Back-end:

   - Na pasta `server`, crie um arquivo `.env` e configure as variáveis de ambiente para o MySQL:

     ```
     DB_HOST=seu-host-mysql
     DB_USER= root mysql
     DB_PASSWORD= 12345-mysql
     DB_DATABASE=todo_app
     ```

   - Em seguida, instale as dependências do servidor:

     ```bash
     cd server
     npm install
     ```

   - Inicie o servidor:

     ```bash
     npm start
     ```

4. Configuração do Front-end:

   - Na pasta raiz do projeto, instale as dependências do cliente:

     ```bash
     npm install
     ```

   - Inicie o cliente:

     ```bash
     npm start
     ```

5. Acesse a aplicação em seu navegador:

   A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

6. Use a aplicação para gerenciar suas tarefas.

## Contribuindo

Sinta-se à vontade para contribuir com melhorias para este projeto. Basta seguir os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma nova branch para sua funcionalidade: `git checkout -b minha-funcionalidade`
3. Faça as alterações necessárias e faça commit: `git commit -m 'Minha nova funcionalidade'`
4. Envie as alterações para o seu fork: `git push origin minha-funcionalidade`
5. Crie um Pull Request para este repositório.

## Licença

Este projeto está licenciado sob a MIT License - consulte o arquivo [LICENSE](LICENSE) para obter detalhes.

---

  [keliton](https://github.com/kelitondossan).
```

