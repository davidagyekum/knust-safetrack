import { useState } from 'react';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import './index.css';

function App() {
  // Simple routing - check if URL has /dashboard
  const [view, setView] = useState(() => {
    return window.location.hash === '#dashboard' ? 'dashboard' : 'student';
  });

  // Listen for hash changes
  window.onhashchange = () => {
    setView(window.location.hash === '#dashboard' ? 'dashboard' : 'student');
  };

  if (view === 'dashboard') {
    return <Dashboard />;
  }

  return <Home />;
}

export default App;
