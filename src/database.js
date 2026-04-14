const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.resolve(__dirname, "pets.db");

const db = new Database(dbPath);

db.serialize(() => {
  db.prepare(`
  CREATE TABLE IF NOT EXISTS pets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    idade INTEGER,
    porte TEXT,
    descricao TEXT,
    status TEXT,
    imagem TEXT
  )
`).run();
});

module.exports = db;