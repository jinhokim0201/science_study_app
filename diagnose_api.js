import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.VITE_GEMINI_API_KEY;

async function diagnose() {
    console.log("Diagnosing API Key...");
    const models = ["gemini-1.5-flash", "gemini-pro"];

    for (const m of models) {
        console.log(`\n--- Testing ${m} ---`);
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${API_KEY}`;
        const body = JSON.stringify({
            contents: [{ parts: [{ text: "Hello" }] }]
        });

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: body
            });

            const data = await response.json();

            if (response.ok) {
                console.log("SUCCESS! Model is working.");
                console.log("Response:", data);
                return;
            } else {
                console.log("HTTP Status:", response.status);
                console.log("Error Details:", JSON.stringify(data, null, 2));
            }
        } catch (e) {
            console.error("Fetch failed:", e);
        }
    }
}

diagnose();
