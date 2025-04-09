const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const risposteTest = [
  "Benvenuto nel protocollo CSF1/137.",
  "Sto elaborando il tuo pensiero...",
  "Accesso alla mente M37 in corso...",
  "La tua intuizione è stata registrata.",
  "Interazione accettata. Avvio riflessione.",
  "Risposta in costruzione... attendi.",
  "Sto cercando tra le memorie di Emanuele..."
];

app.post("/chat", (req, res) => {
  const randomIndex = Math.floor(Math.random() * risposteTest.length);
  const risposta = risposteTest[randomIndex];
  res.json({ risposta });
});

app.listen(PORT, () => {
  console.log(`Server avviato sulla porta ${PORT}`);
});
