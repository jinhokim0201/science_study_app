import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

const API_KEY = process.env.VITE_GEMINI_API_KEY;

async function listModels() {
    console.log("Fetching models...");
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            console.error("API Error:", JSON.stringify(data.error, null, 2));
            fs.writeFileSync('api_error.json', JSON.stringify(data.error, null, 2));
            return;
        }

        const availableModels = (data.models || [])
            .filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent"))
            .map(m => m.name); // e.g., "models/gemini-pro"

        console.log(`Found ${availableModels.length} models.`);
        fs.writeFileSync('available_models.json', JSON.stringify(availableModels, null, 2));
    } catch (e) {
        console.error("Request Failed:", e);
        fs.writeFileSync('request_error.txt', e.toString());
    }
}

listModels();
