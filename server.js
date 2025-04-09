
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 1000;

app.use(cors());
app.use(bodyParser.json());

app.post("/api/chat", async (req, res) => {
    const message = req.body.message || "";
    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ reply: "Chiave API mancante." });
    }

    const reply = `Sto elaborando la tua richiesta collegata al protocollo CSF1/137...`;
    res.json({ reply });
});

app.listen(port, () => {
    console.log(`Server M37 avviato sulla porta ${port}`);
});
