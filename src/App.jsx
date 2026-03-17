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

import { CompilerLoading } from './components/CompilerLoading.jsx';
import { PhysicsCursor } from './components/PhysicsCursor.jsx';
import { FocusProvider } from './components/FocusContext.jsx';

function DynamicBackground() {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      :root {
        --bg-light: ${siteData.background.lightImage ? `url(${siteData.background.lightImage})` : 'none'};
        --bg-dark: ${siteData.background.darkImage ? `url(${siteData.background.darkImage})` : 'none'};
      }
      body {
        ${!siteData.background.video ? `background-image: var(--bg-light), linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);` : 'background-color: transparent;'}
        background-size: cover, 200% 200%;
        background-position: center, 0% 0%;
        background-attachment: fixed, fixed;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  
  return (
    <>
      {siteData.background.video && (
        <video
          className="fixed inset-0 w-full h-full object-cover -z-50 pointer-events-none"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={siteData.background.video} type="video/mp4" />
        </video>
      )}
    </>
  );
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
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    fetch('/model_registry.json')
      .then(res => res.json())
      .then(data => setModels(data))
      .catch(err => console.error("Error loading models:", err));
  }, []);

  return (
    <FocusProvider>
      <Router>
        <PhysicsCursor />
        <AnimatePresence>
          {!isReady && <CompilerLoading key="loading" onComplete={() => setIsReady(true)} />}
        </AnimatePresence>
        
        <div className={`min-h-screen text-gray-900 selection:bg-indigo-500/30 transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'}`}>
          <DynamicBackground />
          <MusicPlayer />
          <AnimatedRoutes models={models} />
        </div>
      </Router>
    </FocusProvider>
  );
}
