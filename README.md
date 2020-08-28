# EXAMPLE API REST NODE

Projeto de de api REST simples usando NODE.js.

### Instação

Executar o comando do composer na pasta do projeto:

```sh
$ npm install
```

Nomeei o banco de dados como crud, porém você pode alterar essas configurações no arquivo config/default.json.
Abaixo segue a query para criação da tabela:

```sh
CREATE TABLE `cliente` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) DEFAULT NULL,
  `cpf` varchar(45) DEFAULT NULL,
  `data_nascimento` varchar(45) DEFAULT NULL,
  `endereco` varchar(45) DEFAULT NULL,
  `bairro` varchar(45) DEFAULT NULL,
  `cidade` varchar(45) DEFAULT NULL,
  `cep` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
```

Execute o comando abaixo na pasta do index para iniciar o servidor:

```sh
$ npm start
```
