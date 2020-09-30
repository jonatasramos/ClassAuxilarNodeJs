/**
* Importa a classe de conexão
*/
const Conexao = require('./Conexao.class.js');

/**
* Atribuição de Symbol aos métodos privados
*/
const _Syntax  = Symbol('_Syntax');
const _Execute = Symbol('_Execute');
const _Tabela = Symbol('_Tabela');
const _Resultado = Symbol('_Resultado');
const _Termos = Symbol('_Termos');
const _Places = Symbol('_Places');
const _Query = Symbol('_Query');


/**
 * Classe responsavél pelo Delete de registros no banco de dados
 * @author Jonatas Ramos
 * @constructor
 * @private {String} Tabela    - Nome da tabela
 * @private {Bolean} Resultado - Retorno da inserção no banco.
 * @private {String} Termos    - Temor para inserção no banco Ex. "WHERE id = id"
 * @private {Array}  Places    - Valores para o Update
 * @private {String} Query     - Query de Delete no banco de dados
 */
class Delete extends Conexao {
  constructor() {
    super();
    this[_Tabela];
    this[_Resultado];
    this[_Termos];
    this[_Places];
    this[_Query];
  }

  /*****************************************************************************
  * @description <b>Inicia os valores da tabela e os dados para
  * serem deltados no banco de dados.</b>
  * @method ExeDelete
  * @param {String} Tabela - Nome da tabela do banco de dados
  * @param {Array}  Dados  - Objeto para ser deletado do banco
  * @param {String} Termos - Termos para o delete no banco
  *****************************************************************************/
  ExeDelete(Tabela, Termos, Dados = new Array()) {
    this[_Tabela] = Tabela;
    this[_Dados] = Dados;
    this[_Termos] = Termos;
    this[_Syntax]();
    this[_Execute]();
  }

  /****************************************************************************
  * @description <b> Retorna true ou false </b>
  * @method Result
  * @return {Boll} Resultado da query
  *****************************************************************************/
  getResult(){
    return this[_Resultado];
  }

  /****************************************************************************
   * @description <b>Retorna o número de dados deletados</b>
   * @method getRowCount
   * @return {Int} Quantidade de resultados
   *****************************************************************************/
  getRowCount() {
    return this[_Resultado].affectedRows;
  }

  /*============================================================================
  =========================== MÉTODOS PRIVADOS =================================
  ============================================================================*/
  /*****************************************************************************
  * @description <b>Monta a query para o Delete no banco de dados</b>
  * @method Syntax
  * @var {Object} colunas - Nome das colunas do banco vindos do @this[_Dados]
  * @var {Object} valores - Valores das colunas
  *****************************************************************************/
  [_Syntax]() {
    var colunas = Object.keys(this[_Dados]).join('= ?,')+'= ?';
    var valores = Object.values(this[_Dados]);
    this[_Places] = valores;
    this[_Query] = `DELETE FROM ${this[_Tabela]} ${this[_Termos]};`;
  }

  /****************************************************************************
  * @description <b>Executa a inserção no banco de dados</b>
  * @method Execute
  * @var conn   - Conexão com o banco de dados
  * @var query  - Query de consulta
  * @var places - Objeto com os valores a serem deletados no banco
  *****************************************************************************/
  [_Execute]() {
    var conn = this.Conn();
    var query = this[_Query];
    var places = this[_Places];
    try {
      new Promise(function(resolve, reject) {
        conn.query(query, places, function(err, rows) {
          if (err) {
            console.log("Erro na busca " + err);
          }
          resolve(rows);
        });
      }).then((res) => {
        this[_Resultado] = res;
      });
    } catch (e) {
      console.log("Erro na conexão: "+e);
    }
  }
}

module.exports = new Delete;
