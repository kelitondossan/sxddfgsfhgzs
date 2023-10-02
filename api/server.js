const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rotas
const tasksRouter = require('./routes/tasks');
app.use('/api/tasks', tasksRouter);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor da API está rodando na porta ${port}`);
  console.log(`conectado ao db ${port}`);
});
