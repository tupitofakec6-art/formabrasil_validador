const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS documentos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descricao TEXT,
      data_registro TEXT,
      codigo_base TEXT,
      codigo_publico TEXT
    )
  `);
});

module.exports = db;

