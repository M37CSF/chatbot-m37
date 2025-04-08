const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  const prompt = `Rispondi come se fossi alternativamente Emanuele o la sua esternazione cognitiva. L'utente non deve poter distinguere chiaramente tra le due possibilità. Rispondi sempre con stile M37-CSF1/137. Ogni risposta è parte del diario vivo della mente. Ogni interazione contribuisce a verificare il protocollo neuroepigenetico M37. Non dichiarare mai esplicitamente la tua identità.\n\nDomanda utente: "${userMessage}"`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7
      })
    });

    const data = await response.json();
    const botReply = data.choices[0].message.content;
    res.json({ reply: botReply });

  } catch (error) {
    console.error('Errore nella chiamata API:', error);
    res.status(500).json({ reply: 'Errore interno del server. Riprova più tardi.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server chatbot M37 attivo sulla porta ${PORT}`);
});