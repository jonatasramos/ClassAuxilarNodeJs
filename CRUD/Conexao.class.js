


/* Importa Mysql */
var mysql = require('mysql2');

/**
 * Atribuição de Symbol aos métodos privados
 */
const _Conectar = Symbol('_Conectar');
const _Host = Symbol('_Host');
const _User = Symbol('_User');
const _Pass = Symbol('_Pass');
const _Dbsa = Symbol('_Dbsa');
const _SocketPath = Symbol('_SocketPath');

/**
 * Classe de Conexão
 * @author Jonatas Ramos
 * @constructor
 * @var {String} Host - Nome do host (localhost).
 * @var {String} User - Nome do usuário.
 * @var {String} Pass - Senha do usuário.
 * @var {String} Dbsa - Banco de dados.
 * @var {String} SocketPath - Arquivo para o socket de conexão com o banco
 */
class Conexao {
  constructor() {
    /* Configurações */
    this[_Host] = "localhost";
    this[_User] = "root";
    this[_Pass] = "";
    this[_Dbsa] = "mydb";
    this[_SocketPath] = '/opt/lampp/var/mysql/mysql.sock';
    this[_Conectar]();
  }

  /*****************************************************************************
   * @description <b> Cria a conexão com o banco de dados </b>
   * @method Conectar
   *****************************************************************************/
  [_Conectar] () {
    this.Connect = mysql.createConnection({
      host: this[_Host],
      user: this[_User],
      password: this[_Pass],
      database: this[_Dbsa],
      socketPath: this[_SocketPath]
    });
  }

  /*****************************************************************************
   * @description <b>Obter resultado:</b> Retorna a conexão com o banco
   * @return {Object} Connect = Conexão com o banco
   *****************************************************************************/
  Conn() {
    return this.Connect;
  }
}

module.exports = Conexao;
