import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI = null;
if (API_KEY) {
    genAI = new GoogleGenerativeAI(API_KEY);
}

export const generateProblems = async (curriculumSummary, grade, title) => {
    if (!genAI) {
        throw new Error("Gemini API Key is missing. Please check your .env settings.");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
        You are a Korean Science Teacher exam generator.
        Create a mock exam with **40 multiple-choice questions** for:
        - Grade: ${grade}
        - Subject/Topic: ${title}

        Use the following curriculum content context to generate relevant questions:
        ${curriculumSummary}

        Rules:
        1. Language: Korean (한국어)
        2. Format: JSON Array of objects.
        3. Difficulty: Mix of Easy, Medium, Hard.
        4. Each question object structure:
           {
             "id": "unique_id",
             "question": "Question text",
             "choices": ["Choice 1", "Choice 2", "Choice 3", "Choice 4", "Choice 5"],
             "answer": 0-4 (integer index of correct choice),
             "difficulty": "하" | "중" | "상",
             "explanation": "Brief explanation of the answer"
           }
        5. Total count: Exactly 40 questions.
        6. Return ONLY valid JSON text. No markdown formatting like \`\`\`json.
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        // Cleanup markdown if present
        text = text.replace(/```json/g, "").replace(/```/g, "").trim();

        const problems = JSON.parse(text);

        // Basic validation
        if (!Array.isArray(problems) || problems.length < 5) {
            throw new Error("Generated content is not a valid problem list.");
        }

        return problems;
    } catch (error) {
        console.error("Gemini Generation Error:", error);
        throw error;
    }
};
