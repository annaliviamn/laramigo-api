const sqlite3 = require("sqlite3").verbose();

const path = require("path");

const dbPath = path.resolve(__dirname, "pets.db");

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS pets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      idade INTEGER,
      porte TEXT,
      descricao TEXT,
      status TEXT,
      imagem TEXT
    )
  `);
});

module.exports = db;