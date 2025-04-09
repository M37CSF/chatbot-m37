const express = require("express");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Serve index.html e altri file statici dalla directory corrente
app.use(express.static(__dirname));

// Parsing del corpo delle richieste
app.use(bodyParser.json());

// Configura OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Rotta API per gestire i messaggi
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    res.json({ reply: completion.data.choices[0].message.content });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send("Errore interno");
  }
});

app.listen(port, () => {
  console.log(`Server avviato su porta ${port}`);
});