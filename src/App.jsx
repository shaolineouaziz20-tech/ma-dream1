import "./i18n";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Products from "./components/Products";
import QuoteForm from "./components/QuoteForm";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Products />
      <QuoteForm />
      <Contact />
      <Footer />
    </>
  );
}
