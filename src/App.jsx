import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import HomePage from './pages/home/HomePage';
import MassagePage from './pages/massage/MassagePage';
import PricesPage from './pages/prices/PricesPage';
import ContactPage from './pages/contact/ContactPage';

const App = () => {
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    document.body.className = theme; // Меняем класс body в зависимости от темы
  }, [theme]);

  return (
    <div className="wrapper">
      <Header /> {/* Общий Header */}
      <main className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/massage" element={<MassagePage />} />
          <Route path="/prices" element={<PricesPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer /> {/* Общий Footer */}
    </div>
  );
};

export default App;
