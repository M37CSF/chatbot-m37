const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
require('dotenv').config();

app.use(express.static('public'));
app.use(express.json());

const API_KEY = process.env.OPENAI_API_KEY;

app.post('/chat', async (req, res) => {
  const prompt = req.body.prompt;
  const openaiResponse = {
    response: `Sto elaborando la tua richiesta collegata al protocollo CSF1/137...`,
    autore: 'Emanuele Migliorese'
  };
  res.json(openaiResponse);
});

const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`Server avviato sulla porta ${port}`);
});
