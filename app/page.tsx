"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import Sidebar from "@/components/layout/Sidebar";
import TabBar from "@/components/layout/TabBar";
import StatusBar from "@/components/layout/StatusBar";
import CustomCursor from "@/components/layout/CustomCursor";
import HeroSection from "@/components/hero/HeroSection";

const AboutSection = dynamic(() => import("@/components/about/AboutSection"), { ssr: false });
const ExperienceSection = dynamic(() => import("@/components/experience/ExperienceSection"), { ssr: false });
const ProjectsSection = dynamic(() => import("@/components/projects/ProjectsSection"), { ssr: false });
const SkillsSection = dynamic(() => import("@/components/skills/SkillsSection"), { ssr: false });
const EducationSection = dynamic(() => import("@/components/education/EducationSection"), { ssr: false });
const ContactSection = dynamic(() => import("@/components/contact/ContactSection"), { ssr: false });
const ChatWidget = dynamic(() => import("@/components/chat/ChatWidget"), { ssr: false });

const PARALLAX_FACTOR = 0.3;

export default function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const meshRef = useRef<HTMLDivElement>(null);

  const handleSidebarToggle = () => {
    setIsSidebarOpen((previousState) => !previousState);
  };

  const handleScroll = useCallback(() => {
    if (meshRef.current) {
      const scrollY = window.scrollY;
      meshRef.current.style.transform = `translateY(${scrollY * PARALLAX_FACTOR}px)`;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="min-h-screen relative">
      <CustomCursor />
      <div ref={meshRef} className="gradient-mesh" aria-hidden="true" />

      <div className="flex relative z-10">
        <Sidebar isOpen={isSidebarOpen} onToggle={handleSidebarToggle} />

        <main id="main-content" className="flex-1 min-h-screen min-w-0" role="main">
          <TabBar />

          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <SkillsSection />
          <EducationSection />
          <ContactSection />
        </main>
      </div>

      <StatusBar />
      <ChatWidget />
    </div>
  );
}
