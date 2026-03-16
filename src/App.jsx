import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './components/ThemeToggle.jsx';
import { BentoGrid } from './components/BentoGrid.jsx';
import { ModelViewer } from './components/ModelViewer.jsx';

function AnimatedRoutes({ models }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<BentoGrid models={models} />} />
        <Route path="/model/:id" element={<ModelViewer models={models} />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [models, setModels] = useState([]);

  useEffect(() => {
    fetch('/models.json')
      .then(res => res.json())
      .then(data => setModels(data))
      .catch(err => console.error("Error loading models:", err));
  }, []);

  return (
    <Router>
      <div className="min-h-screen text-gray-900 dark:text-gray-100 pb-20">
        <ThemeToggle />
        <AnimatedRoutes models={models} />
      </div>
    </Router>
  );
}
