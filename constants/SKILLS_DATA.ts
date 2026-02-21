import { SkillCategory } from "@/types/skill.types";

export const SKILLS_DATA: SkillCategory[] = [
    {
        categoryName: "Languages & Frameworks",
        categoryKey: "languagesAndFrameworks",
        skills: ["JavaScript (ES6+)", "TypeScript", "React.js 18/19", "Next.js", "Node.js"],
    },
    {
        categoryName: "AI & Integration",
        categoryKey: "aiAndIntegration",
        skills: ["Gemini API", "AI Chatbot Development", "Natural Language Processing"],
    },
    {
        categoryName: "Styling & UI",
        categoryKey: "stylingAndUI",
        skills: ["Tailwind CSS", "Framer Motion", "Material UI", "Responsive Design"],
    },
    {
        categoryName: "State & Architecture",
        categoryKey: "stateAndArchitecture",
        skills: ["Redux", "Context API", "React Hooks", "Component-based Design"],
    },
    {
        categoryName: "Backend & APIs",
        categoryKey: "backendAndAPIs",
        skills: ["RESTful APIs", "Node.js", "Express.js", "PostgreSQL", "MySQL", "MongoDB"],
    },
    {
        categoryName: "Tools & Deployment",
        categoryKey: "toolsAndDeployment",
        skills: ["Git/GitHub", "Vercel", "GitHub Actions", "Figma"],
    },
];
