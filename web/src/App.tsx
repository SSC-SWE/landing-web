import { ApplyForm } from "./components/ApplyForm";
import { Carousel } from "./components/Carousel";
import { Footer } from "./components/Footer";
import { GridLines } from "./components/GridLines";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Loader } from "./components/Loader";
import { Marquee } from "./components/Marquee";
import { Principles } from "./components/Principles";
import { Stack } from "./components/Stack";
import { Tools } from "./components/Tools";
import { usePageMotion } from "./lib/motion";

export function App() {
  usePageMotion();

  return (
    <>
      <Loader />
      <GridLines />
      <Header />
      <main>
        <Hero />
        <Principles />
        <Marquee />
        <Tools />
        <Carousel />
        <Stack />
        <ApplyForm />
      </main>
      <Footer />
    </>
  );
}
