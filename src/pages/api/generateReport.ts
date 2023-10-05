import { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Parse the incoming request body to get the message
    const message = req.body.message;

    const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });

    const messages = [
        {
            role: 'system',
            content: `You're a digital Bitcoin Price checker for an online platform. Every second, you receive a price reading based on second-by-second data. You then craft a concise report on the price conditions. Try a sell or buy decision on hand on the price`,
        },
        {
            role: 'user',
            content: 'Price averages for the last second:\n' + JSON.stringify(message),
        },
    ];

    const openAIResponse = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
    });

    const priceReport = openAIResponse.choices[0].message?.content;

    if (priceReport) {
        res.status(200).json({ priceReport });
    } else {
        res.status(400).json({ error: 'Failed to generate report' });
    }
}