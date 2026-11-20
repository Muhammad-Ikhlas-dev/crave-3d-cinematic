import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FoodExperience from "./components/FoodExperience";
import FinalSection from "./components/FinalSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FoodExperience />
        <FinalSection />
      </main>
      <Footer />
    </>
  );
}
