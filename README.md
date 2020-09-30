# ClassAuxilarNodeJs
Classe para interação com banco de dados com NodeJs

* Ainda pêndente de melhorias.

A classe no momento utiliza apenas mysql, alterar dados de conexão dentro de CRUD/Conexao.class.js

## Importando a Classe
```javascript
// Import da classe config
var Config = require('./Config.class.js');
```

## Após a importação inclua a classe que deseja utilizar

```javascript
/**
* Create, Delete, Read ou Update
*/
var Create = Config()['Create'];
var Delete = Config()['Delete'];
var Read   = Config()['Read'];
var Update = Config()['Update'];
```

## Exemplos

## Create
```javascript

Create.ExeCreate([tabela do banco de dados], [dados a serem inseridos]);

// Obtêndo o resultado da inserção
Create.getResult()
```

## Delete
```javascript

Delete.ExeDelete([tabela do banco de dados], [Termos para o delete], [valores dos termos]);

// Obtêndo o resultado da inserção
Delete.getResult()

ou

// Pega aquantidade de items afetados
Delete.getRowCount()
```

