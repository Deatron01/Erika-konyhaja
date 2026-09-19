import React from 'react';
import ReactDOM from 'react-dom/client';

// Saját tárhelyről kiszolgált betűtípusok (GDPR-barát, gyorsabb). Mindhárom tartalmazza az ő, ű betűket.
import '@fontsource-variable/fraunces/full.css';
import '@fontsource-variable/fraunces/full-italic.css';
import '@fontsource-variable/manrope';
import '@fontsource-variable/caveat';

import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
