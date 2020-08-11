# Proffy

Proffy é projeto que envolve um site e um app mobile(código) para tornar fácil aos estudantes procurarem professores para lhes ensinarem alguma matéria no momento em que você tiver disponibilidade.

## Instalação

Para configurar o caminho e acessos do banco de dados, acesse as pastas server\src\database\db.ts ,
altere todas as configurações para seu respectivo banco de dados

#### \Web & \Server & \Mobile

Ao acessar a estrutura correspondente e realizar a instalação dos pacotes para o funcionamento do mesmo.

```bash
  user: "postgres", // Seu usuário de acesso ao banco
  password: "password", // Sua senha de acesso ao banco
  host: "localhost", // O caminho para acessar a instância do postgre
  port: 5432, // Porta de acesso, por padrão já vem 5432
  database: "proffy", // Nome do banco de dados a ser acessado
```

### Banco de dados PostgreSQL

Você poderá localizar todo o sql para criação do banco postgress nesta estrutura no arquivo Proffy.sql

Você deverá criar o banco de dados e depois executar o script Proffy.sql nele, para que sejam criados as tabelas.

## Utilização

Para iniciar o servidor, rode o comando abaixo na respectiva pasta do server

```python
yarn start
```

depois que executado, seu servidor estará rodando em http://localhost:3333 dessa forma a parte Web poderá se conectar com sua API.

# Funcionalidades

## Conexões

- Rota para listar o total de conexões realizadas;
- Rota para criar uma nova conexão;

## Aulas

- Rota para criar uma aula;
- Rota para listar aulas;
  - Filtrar por matéria, dia da semana e horário;

## Demais instruções

Se tiver alguma dúvida, chama lá no linkedin: https://www.linkedin.com/in/james-leal-vieira-24436a115/
