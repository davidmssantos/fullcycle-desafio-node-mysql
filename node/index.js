const express = require("express");
const app = express();
const port = 3000;
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};
const mysql = require("mysql");
const connection = mysql.createConnection(config);

const sql = `INSERT INTO people(name) values('David')`;
connection.query(sql);

app.get("/", (req, res) => {
  connection.query("SELECT name FROM people", (error, results, fields) => {
    if (error) {
      console.error("Erro:", error);
      res.status(500).send("Erro ao buscar dados do banco de dados.");
      return;
    }
    res.send(`<h1>Full Cycle Rocks!</h1>
      <ol>
        ${
          !!results.length
            ? results.map((r) => `<li>${r.name}</li>`).join("")
            : ""
        }
      </ol>
    `);
  });
});

app.listen(port, () => {
  console.log("Rodando na porta " + port);
});
