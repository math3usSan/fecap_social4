const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

// Criação do banco de dados SQLite
const db = new sqlite3.Database('./banco.db', (err) => {
  if (err) {
    console.error('Erro ao abrir o banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados.');
  }
});

// Criação das tabelas no banco, caso não existam
db.run(`CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  usuario TEXT UNIQUE,
  senha TEXT
)`);

const app = express();

// Configuração do CORS e BodyParser
app.use(cors());
app.use(bodyParser.json());

// Rota para cadastro de usuário (sem criptografia)
app.post('/cadastro', (req, res) => {
  const { usuario, senha } = req.body;

  const sql = 'INSERT INTO usuarios (usuario, senha) VALUES (?, ?)';
  db.run(sql, [usuario, senha], function (err) {
    if (err) {
      return res.status(400).send('Usuário já cadastrado. Tente novamente.');
    }
    res.status(200).send('Usuário cadastrado com sucesso.');
  });
});

// Rota para login de usuário
app.post('/login', (req, res) => {
  const { usuario, senha } = req.body;

  const sql = 'SELECT * FROM usuarios WHERE usuario = ? AND senha = ?';
  db.get(sql, [usuario, senha], (err, row) => {
    if (err || !row) {
      return res.status(400).send('Usuário ou senha incorretos.');
    }
    res.status(200).send('Login bem-sucedido.');
  });
});

// Iniciar o servidor na porta 5000
app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});
