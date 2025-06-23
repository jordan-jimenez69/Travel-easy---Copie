import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'API key not found' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    if (req.method === 'POST') {
        const { message } = req.body;

        const parts = [
            { text: `instruction: Réponds de maniere extrement cool et detente directement avec une suggestion de randonnée basée sur des informations générales. Si l'utilisateur ne fournit pas assez de détails, propose une randonnée classique et courante.` },
            { text: `Voici une liste d'équipements de randonnée pour l'utilisateur : chaussures, bâtons de marche, sacs à dos.` },
            { text: `input: ${message}` },
        ];

        try {
            const result = await model.generateContent({
                contents: [{ role: 'user', parts }],
            });
            const response = await result.response.text();
            res.status(200).json({ reply: response });
        } catch (error) {
            console.error('Failed to generate response', error);
            res.status(500).json({ error: 'Failed to generate response' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}