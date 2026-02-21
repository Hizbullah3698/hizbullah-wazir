export type NavLink = {
    label: string;
    sectionId: string;
    fileName: string;
};

export const NAV_LINKS: NavLink[] = [
    { label: "About", sectionId: "about", fileName: "about.tsx" },
    { label: "Experience", sectionId: "experience", fileName: "experience.tsx" },
    { label: "Projects", sectionId: "projects", fileName: "projects.tsx" },
    { label: "Skills", sectionId: "skills", fileName: "skills.tsx" },
    { label: "Education", sectionId: "education", fileName: "education.tsx" },
    { label: "Contact", sectionId: "contact", fileName: "contact.tsx" },
];
