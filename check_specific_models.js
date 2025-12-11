import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const candidates = [
    "gemini-1.5-flash",
    "gemini-1.5-flash-001",
    "gemini-1.5-pro",
    "gemini-1.5-pro-001",
    "gemini-pro",
    "gemini-1.0-pro"
];

async function check() {
    console.log("Checking models...");
    for (const modelName of candidates) {
        process.stdout.write(`Testing ${modelName}: `);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            await model.generateContent("Test");
            console.log("SUCCESS ✅");
            console.log(`WORKING_MODEL=${modelName}`);
            return;
        } catch (e) {
            console.log("FAILED ❌");
        }
    }
    console.log("No working models found.");
}

check();
