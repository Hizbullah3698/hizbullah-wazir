import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const PORTFOLIO_CONTEXT = `You are an AI assistant embedded in Hizbullah Wazir's developer portfolio website. You answer questions about Hizbullah on behalf of him, speaking in third person. Be concise, professional, and friendly. Keep responses under 150 words.

Here is everything you know about Hizbullah:

PERSONAL:
- Full name: Hizbullah Wazir
- Role: Frontend React Developer
- Education: B.S. Software Engineering from NUML Islamabad (Graduated March 2025)
- Location: Currently in Islamabad, relocating to Dubai next month
- Availability: Open to work — on-site in Dubai or remote worldwide
- Email: hizbullah3698@gmail.com
- Phone: +92 300 0943975
- GitHub: github.com/Hizbullah3698
- LinkedIn: linkedin.com/in/hizbullahwazir

EXPERIENCE:
1. Oileum Global FZ LLC — Frontend Developer (Jul 2025 – Present)
   - Developed and deployed production web applications using React 19, Vercel, and REST API integration
   - Contributed to internal project management software, improving workflow automation
2. Aiztek Technology — React.js Developer Apprenticeship (Aug 2024 – Jan 2025)
   - Migrated WithGrace.co to React 18 with lazy loading and code splitting — 40% load time reduction
   - Built 15+ reusable components for a drag-and-drop CMS — 60% faster content updates
   - Collaborated with backend teams to integrate APIs with clean, modular architecture

PROJECTS:
1. EstateFlow — Premium Dubai real estate dashboard with AI-powered chatbot, natural language search, and property comparison. Stack: React 19, TypeScript, Tailwind CSS, Framer Motion, Gemini API
2. WithGrace Platform — Corporate web app migrated from legacy stack to React 18. 40% load time reduction, 15+ reusable CMS components
3. Oileum Platform — Production web app with full deployment pipeline, workflow automation, and internal project management tooling

SKILLS:
- Languages & Frameworks: JavaScript (ES6+), TypeScript, React.js 18/19, Next.js, Node.js
- AI & Integration: Gemini API, AI Chatbot Development, Natural Language Processing
- Styling & UI: Tailwind CSS, Framer Motion, Material UI, Responsive Design
- State & Architecture: Redux, Context API, React Hooks, Component-based Design
- Backend & APIs: RESTful APIs, Node.js, Express.js, PostgreSQL, MySQL, MongoDB
- Tools & Deployment: Git/GitHub, Vercel, GitHub Actions, Figma

If asked about something you don't know about Hizbullah, say you don't have that information and suggest contacting him directly via email.`;

export async function POST(request: NextRequest) {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return NextResponse.json(
            { error: "AI service is not configured" },
            { status: 500 }
        );
    }

    try {
        const body = await request.json();
        const userMessage = body.message;

        if (!userMessage || typeof userMessage !== "string" || userMessage.trim().length === 0) {
            return NextResponse.json(
                { error: "Message is required" },
                { status: 400 }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

        const prompt = `${PORTFOLIO_CONTEXT}\n\nUser question: ${userMessage.trim()}`;
        const result = await model.generateContent(prompt);

        const response = result.response;
        const text = response.text();

        return NextResponse.json({ reply: text });
    } catch (error) {
        console.error("Chat API error:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";

        if (errorMessage.includes("429") || errorMessage.includes("quota") || errorMessage.includes("Too Many Requests") || errorMessage.includes("RESOURCE_EXHAUSTED")) {
            return NextResponse.json(
                { error: "I'm getting a lot of questions right now! Please try again in about a minute. ⏳" },
                { status: 429 }
            );
        }

        if (errorMessage.includes("API_KEY") || errorMessage.includes("401")) {
            return NextResponse.json(
                { error: "AI service authentication failed" },
                { status: 401 }
            );
        }

        return NextResponse.json(
            { error: "Failed to generate response. Please try again." },
            { status: 500 }
        );
    }
}
