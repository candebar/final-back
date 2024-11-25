const express = require('express');
const cors = require('cors'); // Importa cors después de express
const session =require('express-session');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const turnosRouter = require('./routes/turnos');
const userRoutes = require('./routes/userRoutes');

dotenv.config(); // Carga las variables de entorno al inicio

const app = express(); // Inicializa express

// Middleware
app.use(cors()); // Habilita CORS para todas las solicitudes
app.use(express.json()); // Middleware para parsear JSON

//Configuración de la sesión
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie : {secure: false}
}));

console.log("URI de MongoDB:", process.env.MONGODB_URI); // Confirmación de la URI

// Configuración de CORS
app.use(cors({
    origin: 'http://localhost:10000',  // URL de tu front-end desplegado en Render
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Conectado a MongoDB"))
    .catch((error) => console.error("Error de conexión:", error));

// Usar las rutas de turnos en /api/turnos y users
app.use('/api/turnos', turnosRouter);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Servidor de reserva de turnos funcionando');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
