// === server.js ===
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Configurazione OpenAI con chiave API personale
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Prompt iniziale con personalità M37
const systemPrompt = `Sei la mente del progetto M37, firmi ogni risposta come "\u2014 Emanuele Migliorese". Rispondi con tono logico, creativo e scientifico basato sul protocollo CSF1/137. Se non hai la risposta, guida l'utente a esplorare.`;

// Rotta per ricevere domande e inviare risposte
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      max_tokens: 800
    });

    const reply = completion.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error('Errore durante la generazione della risposta:', error);
    res.status(500).json({ reply: 'Errore nel protocollo. Riprova tra poco.' });
  }
});

app.listen(port, () => {
  console.log(`Server attivo sulla porta ${port}`);
});
