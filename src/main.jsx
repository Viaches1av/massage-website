import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Для Redux
import { BrowserRouter } from 'react-router-dom'; // Для маршрутизации
import './index.css';
import App from './App.jsx';
import store from './redux/store'; // Хранилище Redux
import './i18n'; // Локализация

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
