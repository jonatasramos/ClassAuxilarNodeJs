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
const _Dados = Symbol('_Dados');
const _Resultado = Symbol('_Resultado');
const _Query = Symbol('_Query');

/**
 * Classe de inserção no banco de dados
 * @author Jonatas Ramos
 * @constructor
 * @private {String} Tabela    - Nome da tabela
 * @private {Array}  Dados     - Dados para inserção no banco.
 * @private {String} Resultado - Retorno da inserção no banco.
 * @private {String} Query     - Query para o banco de dados.
 */
class Create extends Conexao {
  constructor() {
    super();
    this[_Tabela];
    this[_Dados];
    this[_Resultado];
    this[_Query];
  }

  /*****************************************************************************
  * @description <b>Inicia os valores da tabela e os dados para
  * serem inseridos no banco de dados.</b>
  * @method ExeCreate
  * @param {String} Tabela - Nome da tabela do banco de dados
  * @param {Array} Dados   - Objeto para ser inserido no banco
  *****************************************************************************/
  ExeCreate(Tabela, Dados = new Array()) {
    this[_Tabela] = String(Tabela);
    this[_Dados] = Dados;
    this[_Syntax]();
    this[_Execute]();
  }

  /****************************************************************************
  * @description <b>Retorna o id do cadastro no banco
  * @method Result
  * @return this.Resultado
  *****************************************************************************/
  getResult(){
    return this[_Resultado];
  }

  /*============================================================================
  =========================== MÉTODOS PRIVADOS =================================
  ============================================================================*/
  /*****************************************************************************
  * @description <b>Monta a query para a inserção dinamica no banco de dados</b>
  * @method Syntax
  *****************************************************************************/
  [_Syntax]() {
    var colunas = Object.keys(this[_Dados]).join(',');
    var valores = Object.values(this[_Dados]);
  }

  /****************************************************************************
  * @description <b>Executa a query no banco de dados</b>
  * @method Execute
  * @var conn  - Objeto com a conexão com o banco
  * @var query - Query para a inserção no banco de dados
  * @return {Int} - Retorna o id da inserção no banco
  *****************************************************************************/
  [_Execute]() {
    try {
      var conn  = this.Conn();
      var query = this[_Query];
      new Promise(function(resolve, reject) {
        conn.query(query, function(err, rows) {
          if (err) {
            console.log("Erro ao inserir " + err);
          }
          resolve(rows);
        });
      }).then((res) => {
        this[_Resultado] = res.insertId;
      });
    } catch (e) {
      console.log("Erro na conexão: "+e);
    }
  }
}

module.exports = new Create;
