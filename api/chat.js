require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async (req, res) => {
    console.log("Method:", req.method);
    console.log("Body:", req.body);
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
