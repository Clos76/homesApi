import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap for styling
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Import Bootstrap JavaScript

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
//   <BrowserRouter>
//   <App />
// </BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Measure performance (optional)
reportWebVitals();
