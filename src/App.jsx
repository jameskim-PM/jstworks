import { LanguageProvider } from './context/LanguageContext.jsx';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Vision from './components/Vision.jsx';
import BrandVision from './components/BrandVision.jsx';
import BrandMessage from './components/BrandMessage.jsx';
import Market from './components/Market.jsx';
import Quote from './components/Quote.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <LanguageProvider>
      <Nav />
      <Hero />
      <Vision />
      <BrandVision />
      <BrandMessage />
      <Market />
      <Quote />
      <Footer />
    </LanguageProvider>
  );
}
