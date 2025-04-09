const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = process.env.PORT || 1000;

app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('Errore OpenAI:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Errore durante la generazione della risposta' });
  }
});

app.get('/', (req, res) => {
  res.send('Server attivo. Chatbot M37 - CSF1/137');
});

app.listen(port, () => {
  console.log(`Server avviato su http://localhost:${port}`);
});
