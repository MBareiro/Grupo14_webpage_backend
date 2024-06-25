// Aplicacion principal

const express = require('express');
const cors = require('cors');

require('dotenv').config();

/* const { checkToken } = require('./utils/middlewares');*/
const userRoutes = require("./routes/user.routes");
const carRoutes = require("./routes/car.routes");
const historyRoutes = require("./routes/history.routes");
const contactRoutes = require("./routes/contact.routes");
const parameterRoutes = require("./routes/parameter.routes");

// Crear una instancia de la aplicación Express
const app = express();

// Configuración
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas
// Las rutas con checkToken estan protegidas por lo cual necesitar recibir un token valido para poder accederse. Sacar checkToken para usar libremente
app.use("/api/users", userRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/histories", historyRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/parameters", parameterRoutes);


// Definir el puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
