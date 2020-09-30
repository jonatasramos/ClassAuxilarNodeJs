'use strict';
/*
 .------------------------------------------------------------------------------.
 |  Sofware: NodeCRUD                                                           |
 |  Version: 0.0.1                                                              |
 |  Author: Jonatas Ramos de Alexandria                                         |
 |  Copyright (c) 2018 Jonatas Ramos                                            |
 |                                                                              |
 |  Classe auxiliar para o CRUD em NodeJs usando Mysql.                         |
 |  Utilizar versões do NodeJs a partir da versão 8                             |
 ------------------------------------------------------------------------------
 */

 /**
  * Junta todas as classes em um único arquivo
  * @author Jonatas Ramos
  * @var {Object} Config - Variável contendo as classes
  */

var path = require('path');
var fs = require('fs');
var Config = [];

/*******************************************************************************
 *              Concatenando diretorio atual com a pasta dos arquivos
 ******************************************************************************/
var directoryPath = path.join(__dirname, 'CRUD');

/*******************************************************************************
*                            Lendo o diretorio
*******************************************************************************/
var files = fs.readdirSync(directoryPath);

/*******************************************************************************
*                 Listando todos os arquivos usando forEach
*******************************************************************************/
files.forEach(function (file) {
  var split = file.split(".");
  Config[split[0]] = require("./CRUD/"+file);
});

module.exports = () => {
  return Config;
};
