const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const db = require("./database");

app.use(express.json());

const PORT = process.env.PORT || 3000;

// rota teste
app.get("/", (req, res) => {
  res.send("API de adoção de pets funcionando 🐾");
});

// cadastrar pet
app.post("/pets", (req, res) => {
  const { nome, idade, porte, descricao, status, imagem } = req.body;

  const sql = `
    INSERT INTO pets (nome, idade, porte, descricao, status, imagem)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(sql, [nome, idade, porte, descricao, status, imagem], function (err) {
    if (err) {
      return res.status(500).json(err.message);
    }

    res.json({
      id: this.lastID,
      nome,
      idade,
      porte,
      descricao,
      status,
      imagem,
    });
  });
});

// listar pets
app.get("/pets", (req, res) => {
  const sql = "SELECT * FROM pets";

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json(err.message);
    }

    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});