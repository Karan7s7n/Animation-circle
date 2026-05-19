import AnimatedPathwaysSection from "./components/AnimatedPathwaysSection";
import CircularServicesSection from "./components/CircularServicesSection";
import CoordinatedSystemSection from "./components/CoordinatedSystemSection";
import FrontPage from "./components/FrontPage";
import CaseStudiesSection from "./components/CrouselSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-[#020817] min-h-screen">
      <FrontPage />
      <CircularServicesSection />
      <CoordinatedSystemSection />
      <AnimatedPathwaysSection />
      <CaseStudiesSection />
      <Footer />
    </main>
  );
}
