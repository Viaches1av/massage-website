// main.js
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Для Redux
import { BrowserRouter } from 'react-router-dom'; // Для маршрутизации
import './i18n'; // Локализация должна инициализироваться раньше
import store from './redux/store'; // Хранилище Redux
import App from './App.jsx';
import './index.css'; // Загружаем стили после инициализации i18n

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
