const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const contactRouter = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Rutas API
app.use('/api/contact', contactRouter);

// Rutas básicas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/servicios', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/servicios.html'));
});

app.get('/voces', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/voces.html'));
});

app.get('/contacto', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/contacto.html'));
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
}); 