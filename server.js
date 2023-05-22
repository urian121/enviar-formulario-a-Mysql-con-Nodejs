//Importando el módulo 'express'
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const connection = require("./configBD");

/**
 * Definiendo el puerto de nuestro Servidor
 */
const PORT = process.env.PORT || 3001;

//Creando una nueva aplicación Express.
const app = express();
const path = require("path");

/**
 * app.use(cors()): Es un middleware de CORS (Cross-Origin Resource Sharing) en tu aplicación Express.
 * CORS es un mecanismo de seguridad implementado en los navegadores que restringe las solicitudes HTTP
 * que se pueden realizar desde un origen (dominio) a otro. Al utilizar app.use(cors()),
 * estás permitiendo que tu servidor responda a las solicitudes de otros dominios,
 * lo que es útil cuando estás construyendo una API o cuando tu frontend se encuentra
 * en un dominio diferente al backend.
 *
 * app.use(bodyParser.urlencoded({ extended: false })): habilita el middleware de body-parser para analizar los datos enviados
 * en el cuerpo de las solicitudes HTTP.
 * body-parser es un middleware de Express que permite acceder y procesar los datos enviados en formularios HTML.
 * bodyParser.urlencoded() se utiliza para analizar los datos codificados en URL enviados en las solicitudes POST.
 * El parámetro { extended: false } configura el analizador para que solo admita datos codificados en URL tradicionales,
 * no datos complejos como matrices o objetos anidados.
 */
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * app.use Se utiliza para montar middlewares en la aplicación Express.
 * Los middlewares son funciones que se ejecutan en el flujo de procesamiento de una solicitud antes
 * de que se envíe una respuesta Middleware para servir archivos estáticos desde la carpeta "public"
 */
app.use("/public", express.static(path.join(__dirname, "public")));

/**
 * Establecer EJS como el Motor de plantillas
 * se utiliza para establecer la configuración de la aplicación Express. Puedes utilizar app.set
 * para configurar variables de entorno, ajustes específicos de la aplicación o valores personalizados.
 */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

/**
 * Definiendo mi ruta Home
 */
app.get("/", (req, res) => {
  res.render("inicio");
});

// Ruta de about
app.get("/form", (req, res) => {
  res.render("pages/form");
});

app.post("/enviar", async (req, res) => {
  console.log(req.body);
  /**
   * Desestructuración de los datos del body
   */
  const { nombre, email } = req.body;
  try {
    // Realizar la inserción en la base de datos
    const query = "INSERT INTO alumnos (nombre, email) VALUES (?, ?)";
    await connection.execute(query, [nombre, email]);

    res.send(`¡Formulario procesado correctamente!`);
  } catch (error) {
    console.error("Error al insertar en la base de datos: ", error);
    console.log(error); // Agregar esta línea para imprimir el error completo en la consola
    res.send("Error al procesar el formulario");
  }
});

/**
 * Procesando formulario
 */
app.post("/enviar2", (req, res) => {
  console.log(req.body);
  /**
   * Desestructuración de los datos del body
   */
  const { nombre, email } = req.body;
  console.log(nombre, email);

  const query = "INSERT INTO alumnos (nombre, email) VALUES (?, ?)";
  connection.query(query, [nombre, email], (error, results, fields) => {
    if (error) {
      console.error("Error al insertar en la base de datos: ", error);
      res.send("Error al procesar el formulario");
      return;
    }
    console.log(error);
    console.log(results);
    console.log(fields);

    res.send(`¡Formulario procesado correctamente!.`);
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
