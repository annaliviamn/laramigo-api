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

  try {
    const stmt = db.prepare(`
      INSERT INTO pets (nome, idade, porte, descricao, status, imagem)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(nome, idade, porte, descricao, status, imagem);

    res.json({
      id: result.lastInsertRowid,
      nome,
      idade,
      porte,
      descricao,
      status,
      imagem
    });

  } catch (err) {
    res.status(500).json(err.message);
  }
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
  console.log(`Servidor rodando na porta ${PORT}`);
});