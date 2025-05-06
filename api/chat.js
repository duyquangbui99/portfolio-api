const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async (req, res) => {
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*'); // or use 'http://localhost:3000'
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        return res.status(200).end();
    }

    res.setHeader('Access-Control-Allow-Origin', '*'); // or restrict to your frontend URL
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

    const userMessage = req.body.message;
    if (!userMessage) return res.status(400).json({ error: "No message provided" });

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: userMessage }],
        });

        res.status(200).json({ reply: response.choices[0].message.content });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
