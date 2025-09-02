# 📝 Formulario HTML → MySQL con Node.js

> **Aplicación web completa** que permite enviar datos de un formulario HTML directamente a una base de datos MySQL usando Node.js, Express y EJS.

![Demo](https://raw.githubusercontent.com/urian121/imagenes-proyectos-github/master/portada-enviar-formulario-con-nodejs.png)

## 🚀 Características

- ✅ **Formulario responsivo** con Bootstrap 5
- ✅ **Validación de campos** en servidor
- ✅ **Conexión MySQL** con mysql2
- ✅ **Motor de plantillas** EJS
- ✅ **Navegación dinámica** con menú hamburguesa
- ✅ **Manejo de errores** robusto

## 🛠️ Tecnologías

- **Backend:** Node.js + Express
- **Base de datos:** MySQL
- **Frontend:** EJS + Bootstrap 5
- **Dependencias:** mysql2, cors, body-parser

## ⚡ Instalación rápida

```bash
# Clonar el proyecto
git clone [url-del-repo]
cd enviar-formulario-a-Mysql-con-Nodejs

# Instalar dependencias
npm install

# Importar base de datos
# Importa el archivo bd/nodejs.sql en tu MySQL

# Configurar conexión
# Edita configBD.js con tus credenciales

# Ejecutar proyecto
npm start
```

## 🗄️ Base de datos

Importa el archivo `bd/nodejs.sql` y configura la conexión en `configBD.js`:

```javascript
const connection = mysql.createConnection({
  host: "localhost",
  user: "tu_usuario",
  password: "tu_password",
  database: "nodejs"
});
```

## 📱 Uso

1. Inicia el servidor: `npm start`
2. Visita: `http://localhost:3001`
3. Navega a "Registrar estudiante"
4. Completa el formulario
5. ¡Los datos se guardan automáticamente!

---

**🎯 Proyecto ideal para aprender:** Integración frontend-backend, manejo de formularios, conexiones a BD y arquitectura MVC básica.
