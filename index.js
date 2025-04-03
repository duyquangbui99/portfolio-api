require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();

// Setup CORS (Allow all origins for now, you can restrict later)
app.use(cors({
    origin: '*'
}));

app.use(express.json());

// Check if OPENAI_API_KEY is available
if (!process.env.OPENAI_API_KEY) {
    console.error("❌ OPENAI_API_KEY is missing! Please add it in Azure App Settings.");
} else {
    console.log("✅ OPENAI_API_KEY loaded successfully.");
}

// Initialize OpenAI client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// ✅ Health Check Route
app.get('/', (req, res) => {
    res.send("Hi THIS IS QUANG's API, I JUST WANT to test if it works!");
});

app.get('/health', (req, res) => {
    res.status(200).send('API is healthy ✅');
});

// ✅ OpenAI Chat API
app.post('/chat', async (req, res) => {
    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: "Server misconfiguration: Missing OpenAI API Key" });
    }

    const userMessage = req.body.message;
    if (!userMessage) return res.status(400).json({ error: "No message provided" });

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: userMessage }],
        });

        res.json({ reply: response.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
});

// ✅ Dynamic port for Azure or fallback to 3001 locally
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`✅ API running on http://localhost:${PORT}`);
});
