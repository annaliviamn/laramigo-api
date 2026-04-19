const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.json());

const mongoose = require("mongoose");

// 🔥 conexão com MongoDB
mongoose.connect("mongodb+srv://annaliviamaciel_db_user:ngsKVDs5U2jE7hV2@cluster0.mtvtvtv.mongodb.net/laramigo?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB conectado 🔥"))
  .catch(err => console.log(err));

// 🐶 modelo Pet
const Pet = mongoose.model("Pet", {
  nome: String,
  idade: Number,
  porte: String,
  descricao: String,
  status: String,
  imagem: String
});

const PORT = process.env.PORT || 3000;

// rota teste
app.get("/", (req, res) => {
  res.send("API de adoção de pets funcionando 🐾");
});

// cadastrar pet
app.post("/pets", async (req, res) => {
  try {
    const pet = new Pet(req.body);
    await pet.save();
    res.json(pet);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// listar pets
app.get("/pets", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});