const express = require("express");
const router = express.Router();
const db = require("./db");

const CHAVE = 7391;

// ADMIN – CADASTRAR DOCUMENTO
router.post("/admin/criar", (req, res) => {
  const { descricao, data_registro, codigo_base } = req.body;
  const codigo_publico = codigo_base - CHAVE;

  db.run(
    "INSERT INTO documentos (descricao, data_registro, codigo_base, codigo_publico) VALUES (?, ?, ?, ?)",
    [descricao, data_registro, codigo_base, codigo_publico],
    (err) => {
      if (err) return res.status(500).json({ erro: err.message });
      res.json({ sucesso: true, codigo_publico });
    }
  );
});

// VERIFICAR
router.post("/verificar", (req, res) => {
  const { codigo } = req.body;
  const base = parseInt(codigo) + CHAVE;

  db.get(
    "SELECT * FROM documentos WHERE codigo_base = ?",
    [base],
    (err, row) => {
      if (err) return res.status(500).json({ erro: err.message });
      if (!row) return res.json({ valido: false });

      res.json({ valido: true, doc: row });
    }
  );
});

// DOCUMENTO
router.get("/documento/:codigo", (req, res) => {
  const codigo = req.params.codigo;
  const base = parseInt(codigo) + CHAVE;

  db.get(
    "SELECT * FROM documentos WHERE codigo_base = ?",
    [base],
    (err, row) => {
      if (err || !row) return res.send("Documento não encontrado.");
      res.json(row);
    }
  );
});

module.exports = router;
