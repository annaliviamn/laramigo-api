const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

let pets = [];

app.use(express.json());

const PORT = process.env.PORT || 3000;

// rota teste
app.get("/", (req, res) => {
  res.send("API de adoção de pets funcionando 🐾");
});

// cadastrar pet
app.post("/pets", (req, res) => {
  const { nome, idade, porte, descricao, status, imagem } = req.body;

  const novoPet = {
    id: pets.length + 1,
    nome,
    idade,
    porte,
    descricao,
    status,
    imagem
  };

  pets.push(novoPet);

  res.json(novoPet);
});

// listar pets
app.get("/pets", (req, res) => {
  res.json(pets);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});