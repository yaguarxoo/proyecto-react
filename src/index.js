import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderizar la aplicación sin StrictMode en desarrollo
if (process.env.NODE_ENV === 'development') {
  root.render(
    <App />
  );
} else {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Si quieres empezar a medir el rendimiento de tu aplicación, pasa una función
// para registrar resultados (por ejemplo: reportWebVitals(console.log))
// o envía a un punto de análisis. Aprende más en: https://bit.ly/CRA-vitals
reportWebVitals();
