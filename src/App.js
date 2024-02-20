// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrdenesList from './components/OrdenesList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OrdenesList />} />
      </Routes>
    </Router>
  );
}

export default App;
