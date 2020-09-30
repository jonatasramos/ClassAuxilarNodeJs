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
const _Termos = Symbol('_Termos');
const _Places = Symbol('_Places');
const _Query = Symbol('_Query');

/**
 * Classe de Update de registros no banco de dados
 * @author Jonatas Ramos
 * @constructor
 * @var {String} Tabela    - Nome da tabela
 * @var {Array}  Dados     - Dados para o update no banco.
 * @var {Bolean} Resultado - Retorno do update no banco.
 * @var {String} Termos    - Temor para o update no banco Ex. "WHERE id = id"
 * @var {Array}  Places    - Valores para o Update
 */
class Update extends Conexao {
  constructor() {
    super();
    this[_Tabela];
    this[_Dados];
    this[_Resultado];
    this[_Query];
    this[_Termos];
    this[_Places];
  }

  /*****************************************************************************
  * @description <b>Inicia os valores da tabela e os dados para
  * serem atualizados no banco de dados.</b>
  * @method ExeUpdate
  * @param {String} Tabela - Nome da tabela do banco de dados
  * @param {Array}  Dados  - Objeto para ser inserido no banco
  * @param {String} Termos - Termos para o Update no banco
  *****************************************************************************/
  ExeUpdate(Tabela, Dados = new Array(), Termos) {
    this[_Tabela] = Tabela;
    this[_Dados] = Dados;
    this[_Termos] = Termos;
    this[_Syntax]();
    this[_Execute]();
  }

  /****************************************************************************
  * @description <b> Retorna true ou false </b>
  * @method Result
  * @return {Boll} this[_Resultado]
  *****************************************************************************/
  getResult(){
    return this[_Resultado];
  }

  /*============================================================================
  =========================== MÉTODOS PRIVADOS =================================
  ============================================================================*/
  /*****************************************************************************
  * @description <b>Monta a query para o update no banco de dados</b>
  * @method Syntax
  * @var {Object} colunas - Nome das colunas do banco vindos do @this[_Dados]
  * @var {Object} valores - Valores das colunas
  *****************************************************************************/
  [_Syntax]() {
    var colunas = Object.keys(this[_Dados]).join('= ?,')+'= ?';
    var valores = Object.values(this[_Dados]);
    this[_Places] = valores;
    this[_Query] = `UPDATE ${this[_Tabela]} SET ${colunas} ${this[_Termos]};`;
  }

  /****************************************************************************
  * @description <b>Executa o update no banco de dados</b>
  * @method Execute
  * @var conn   - Conexão com o banco de dados
  * @var query  - Query de update
  * @var places - Objeto com os valores a serem atualizados no banco
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
        if(res) {
          this[_Resultado] = true;
        } else {
          this[_Resultado] = false;
        }
      });
    } catch (e) {
      console.log("Erro na conexão: "+e);
    }
  }
}

module.exports = new Update;
