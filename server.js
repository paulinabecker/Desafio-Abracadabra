const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

// Definir la carpeta "public" como carpeta pública del servidor
app.use(express.static("public"));

// Crear un arreglo de nombres
const usuarios = ["Alicia", "Roberto", "Juan", "Daniela", "Pedro", "Camila", "Eduardo"];

// Ruta para devolver el arreglo de nombres en formato JSON
app.get('/abracadabra/usuarios', (req, res) => {
    res.json(usuarios);
});

// Middleware para verificar si el usuario existe
app.use("/abracadabra/juego/:usuario", (req, res, next) => {
    const usuario = req.params.usuario.toLowerCase();
    const usuarioValido = usuarios.some(
        (nombre) => nombre.toLowerCase() === usuario
    );

    usuarioValido
    ? next()
    : res.sendFile(path.join(__dirname, 'public', 'assets', 'who.jpeg'));
});

// Ruta para devolver la imagen del conejo o de Voldemort
app.get("/abracadabra/conejo/:n", (req, res) => {
    const n = Math.floor(Math.random() * 4) + 1;
    const numero = Number(req.params.n);
    const imageName = numero === n ? "conejito.jpg" : "voldemort.jpg";
    res.sendFile(path.join(__dirname, 'public', 'assets', imageName));
});

// Ruta genérica para manejar rutas inexistentes
app.use((req, res) => {
    res.send("Esta página no existe");
});

app.listen(port, () => {
  console.log(`El servidor está inicializado en el puerto ${port}`);
});
