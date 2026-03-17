import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ModelViewer } from './components/ModelViewer.jsx';
import { LandingPage } from './LandingPage.jsx';
import { ModelDirectory } from './components/ModelDirectory.jsx';
import { AnimePage } from './pages/AnimePage.jsx';
import { MapPage } from './pages/MapPage.jsx';
import { siteData } from './config/siteData.js';
import { MusicPlayer } from './components/MusicPlayer.jsx';

function DynamicBackground() {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      :root {
        --bg-light: ${siteData.background.lightImage ? `url(${siteData.background.lightImage})` : 'none'};
        --bg-dark: ${siteData.background.darkImage ? `url(${siteData.background.darkImage})` : 'none'};
      }
      body {
        background-image: var(--bg-light), linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
        background-size: cover, 200% 200%;
        background-position: center, 0% 0%;
        background-attachment: fixed, fixed;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  return null;
}

function AnimatedRoutes({ models }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/anime" element={<AnimePage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/models" element={<ModelDirectory models={models} />} />
        <Route path="/model/:id" element={<ModelViewer models={models} />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [models, setModels] = useState([]);

  useEffect(() => {
    fetch('/model_registry.json')
      .then(res => res.json())
      .then(data => setModels(data))
      .catch(err => console.error("Error loading models:", err));
  }, []);

  return (
    <Router>
      <div className="min-h-screen text-gray-900 selection:bg-indigo-500/30">
        <DynamicBackground />
        <MusicPlayer />
        <AnimatedRoutes models={models} />
      </div>
    </Router>
  );
}
