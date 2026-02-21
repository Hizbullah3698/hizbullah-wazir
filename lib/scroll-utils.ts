const SCROLL_OFFSET = 80;

export function scrollToSection(sectionId: string): void {
    const targetElement = document.getElementById(sectionId);

    if (!targetElement) return;

    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - SCROLL_OFFSET;

    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
    });
}
