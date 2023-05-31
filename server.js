//Importando el módulo 'express'
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

//Importando la conexion a BD
const connection = require("./configBD");

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
app.use(bodyParser.json());
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
app.set("views", path.join(__dirname, "views"));

/**
 * Definiendo mi ruta Home
 */
app.get("/", (req, res) => {
  res.render("inicio", {
    rutaActual: "/",
  });
});

app.get("/form-estudiante", (req, res) => {
  res.render("pages/form", {
    rutaActual: "/form-estudiante",
  });
});

/**
 * PROCESANDO FORMULARIO
 * el módulo mysql2 y hace uso de promesas y async/await para realizar la inserción en la base de datos.
 *  Esto permite un código más legible y fácil de mantener.
 *  Además, mysql2 es una biblioteca más moderna y eficiente para interactuar con MySQL en comparación con el módulo mysql.
 */
app.post("/procesar-formulario", async (req, res) => {
  /**
   * Desestructuración de los datos del body
   */
  console.log(req.body);
  // Verificar campos vacíos
  for (const campo in req.body) {
    if (!req.body[campo]) {
      res.send(`Error: El campo ${campo} está vacío.`);
      return;
    }
  }

  const { nombre_alumno, email_alumno, curso_alumno } = req.body;
  try {
    // Realizar la inserción en la base de datos
    const query =
      "INSERT INTO estudiantes (nombre_alumno, email_alumno, curso_alumno, created_at) VALUES (?, ?, ?, ?)";
    await connection.execute(query, [
      nombre_alumno,
      email_alumno,
      curso_alumno,
      new Date(),
    ]);
    res.send(`¡Formulario procesado correctamente!`);
  } catch (error) {
    console.error("Error al insertar en la base de datos: ", error);
    console.log(error); // Agregar esta línea para imprimir el error completo en la consola
    res.send("Error al procesar el formulario");
  }
});

app.post("/procesar-formulario3", async (req, res) => {
  console.log(req.body);
  const { nombre_alumno, email_alumno, curso_alumno } = req.body;
  try {
    const query =
      "INSERT INTO estudiantes (nombre_alumno, email_alumno, curso_alumno, created_at) VALUES (?, ?, ?,?)";
    connection.query(
      query,
      [nombre_alumno, email_alumno, curso_alumno, new Date()],
      (error, result) => {
        if (error) {
          console.error("Error al insertar en la base de datos: ", error);
          res.send("Error al procesar el formulario");
          return;
        }

        if (result && result.affectedRows > 0) {
          res.send("¡Formulario procesado correctamente!");
        } else {
          res.send("Error al procesar el formulario");
        }
      }
    );
  } catch (error) {
    console.error("Error al insertar en la base de datos: ", error);
    res.send("Error al procesar el formulario");
  }
});

/**
 * Insert segunda forma
 */
app.post("/procesar-formulario2", (req, res) => {
  console.log(req.body);
  const { nombre_alumno, email_alumno, curso_alumno } = req.body;
  const query =
    "INSERT INTO estudiantes (nombre_alumno, email_alumno, curso_alumno, created_at) VALUES (?, ?, ?, ?)";

  connection.query(
    query,
    [nombre_alumno, email_alumno, curso_alumno, new Date()],
    (error, result) => {
      if (error) {
        console.error("Error al insertar en la base de datos: ", error);
        res.send("Error al procesar el formulario");
        return;
      }

      if (result && result.affectedRows > 0) {
        res.send("¡Formulario procesado correctamente!");
      } else {
        res.send("Error al procesar el formulario");
      }
    }
  );
});

// Iniciar el servidor con Express
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
