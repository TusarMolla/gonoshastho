import Hero from "./components/home/Hero";
import ServicesSection from "./components/home/ServicesSection";
import AboutSection from "./components/home/AboutSection";
import DoctorsSection from "./components/home/DoctorsSection";
import TestimonialsSection from "./components/home/TestimonialsSection";
import ContactSection from "./components/home/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <AboutSection />
      {/* <DoctorsSection /> */}
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
