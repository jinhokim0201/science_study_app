import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
    console.error("No API Key found in .env");
    process.exit(1);
}

// Log the first few chars to verify it matches what the user provided (safely)
console.log(`Testing Key: ${API_KEY.substring(0, 10)}...`);

const genAI = new GoogleGenerativeAI(API_KEY);

const models = ["gemini-1.5-flash", "gemini-1.5-flash-8b", "gemini-1.5-flash-latest", "gemini-1.5-pro", "gemini-pro", "gemini-2.0-flash-exp"];

async function test() {
    for (const m of models) {
        process.stdout.write(`Testing ${m}... `);
        try {
            const model = genAI.getGenerativeModel({ model: m });
            await model.generateContent("Hello");
            console.log("SUCCESS ✅");
        } catch (e) {
            console.log(`FAILED ❌ (${e.status || e.message})`);
            if (e.message.includes("404")) console.log("  -> Not found / Not supported");
            if (e.message.includes("429")) console.log("  -> Quota Exceeded");
            if (e.message.includes("403")) console.log("  -> Key invalid/leaked");
        }
    }
}

test();
