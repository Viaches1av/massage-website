// App.jsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

// Ленивая загрузка страниц
const HomePage = lazy(() => import('./pages/home/HomePage'));
const MassagePage = lazy(() => import('./pages/massage/MassagePage'));
const PricesPage = lazy(() => import('./pages/prices/PricesPage'));
const ContactPage = lazy(() => import('./pages/contact/ContactPage'));

const App = () => {
  return (
    <div className="wrapper">
      <Header /> {/* Общий Header */}
      <main className="content">
        <Suspense fallback={<div>loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/massage" element={<MassagePage />} />
            <Route path="/prices" element={<PricesPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer /> {/* Общий Footer */}
    </div>
  );
};

// (Опционально) Оборачиваем компонент в React.memo для оптимизации
export default React.memo(App);
