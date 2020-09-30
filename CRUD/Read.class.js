/**
 * Importa a classe de conexão
 */
const Conexao = require('./Conexao.class.js');

/**
 * Atribuição de Symbol aos métodos e variáves privadas
 **/
const _Execute = Symbol('_Execute');
const _Resultado = Symbol('_Resultado');
const _Query = Symbol('_Query');
const _Termos = Symbol('_Termos');
const _Places = Symbol('_Places');

/**
 * Classe de Busca no banco de dados
 * @author Jonatas Ramos
 * @constructor
 * @private {String} Resultado - Retorno da busca no banco.
 * @private {String} Query     - Query para o banco de dados.
 * @private {String} Termos    - Condição para busca no banco de dados
 * @private {Array}  Places    - Valores para a Query
 */
class Read extends Conexao {
  constructor() {
    super();
    this[_Resultado] = new Array;
    this[_Query];
    this[_Termos];
    this[_Places] = new Array;
  }

  /*****************************************************************************
   * @description <b>Inicia os valores serem buscados no banco de dados.</b>
   * @method ExeRead
   * @param {String} Tabela - Nome da tabela do banco de dados
   * @param {String} Termos - Termos para busca no banco
   *****************************************************************************/
  ExeRead(Tabela, Termos = "", Dados = new Array) {
    this[_Query] = `SELECT * FROM ${Tabela} ${Termos}`;
    this[_Places] = Dados;
    this[_Execute]();
  }

  /*****************************************************************************
   * @description <b>Faz a busca no banco passando toda a query.</b>
   * @method FullRead
   * @param {String} Query - Query de inserção no banco
   * @param {String} Dados - Dados ParseString
   *****************************************************************************/
  FullRead(Query, Dados = new Array) {
    this[_Places] = Dados;
    this[_Query] = `${Query}`;
    this[_Execute]();
  }

  /****************************************************************************
   * @description <b>Retorna o objeto com os dados buscados no banco</b>
   * @method getResult
   * @return {Object} Retorno da consulta no banco
   *****************************************************************************/
  getResult() {
    return this[_Resultado];
  }

  /****************************************************************************
   * @description <b>Retorna o número de resultados encontrados</b>
   * @method getRowCount
   * @return {Int} Quantidade de resultados
   *****************************************************************************/
  getRowCount() {
    return this[_Resultado].length;
  }

  /*============================================================================
   =========================== MÉTODOS PRIVADOS =================================
   ============================================================================*/
  /****************************************************************************
   * @description <b>Executa a query no banco de dados</b>
   * @method Execute
   * @var conn  - Objeto com a conexão com o banco
   * @var query - Query para a inserção no banco de dados
   * @var places - Dados do ParseString
   * @return {Object} - Retorna os dados da busca
   *****************************************************************************/
  [_Execute] () {
    try {
      var conn = this.Conn();
      var query = this[_Query];
      var places = this[_Places];
      new Promise(function (resolve, reject) {
        conn.query(query, places, function (err, rows) {
          if (err) {
            console.log("Erro na busca " + err);
          }
          resolve(rows);
        });
      }).then((res) => {
        this[_Resultado] = res;
      });
    } catch (e) {
      console.log("Erro na conexão: " + e);
    }
  }
}

module.exports = new Read;
