const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

// criação do banco de dados banco.db
const db = new sqlite3.Database('./banco.db', (err) => {
  if (err) {
    console.error('Erro ao abrir o banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados.');
  }
});

// nesse trecho sera criado a tabela usuarios, caso não exista
db.run(`CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  usuario TEXT UNIQUE,
  senha TEXT
)`);

const app = express();

app.use(cors());
app.use(bodyParser.json());

// rota para o cadastro do usuario, onde sera adicionado ao banco de dados
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

// validação para o login do usuario
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

// teste para iniciar porta do servidor 5000
app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});
