const mysql = require("mysql2");

const config = {
  host: "localhost",
  user: "root",
  password: "",
  database: "demo",
  port: 3306,
};

const connection = mysql.createConnection(config);
console.log("Conexión a BD exitosa.!");

/**
 * En Node.js, module es un objeto global que representa el módulo actual
 * en el cual se está ejecutando el código. Proporciona una forma de exportar
 * valores desde un módulo para que puedan ser utilizados en otros módulos.
 */
module.exports = connection;
