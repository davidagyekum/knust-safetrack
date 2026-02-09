import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Trips from './pages/Trips';
import Profile from './pages/Profile';
import './index.css';

function App() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('safetrack_auth') === 'true';
  });
  const [userType, setUserType] = useState(() => {
    return localStorage.getItem('safetrack_userType') || 'student';
  });

  // Simple routing - check URL hash
  const [view, setView] = useState(() => {
    const hash = window.location.hash.replace('#', '') || 'map';
    return hash;
  });

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'map';
      setView(hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Handle sign in
  const handleSignIn = (data) => {
    localStorage.setItem('safetrack_auth', 'true');
    localStorage.setItem('safetrack_userType', data.userType);
    setIsAuthenticated(true);
    setUserType(data.userType);
    window.location.hash = data.userType === 'security' ? 'dashboard' : 'map';
  };

  // Handle sign up (same as sign in for demo)
  const handleSignUp = (data) => {
    // In a real app, this would send a registration request
    // For demo, we show a success message and switch to sign in
    alert('Access request submitted! For demo purposes, you can now sign in.');
    window.location.hash = 'signin';
  };

  // Handle sign out
  const handleSignOut = () => {
    localStorage.removeItem('safetrack_auth');
    localStorage.removeItem('safetrack_userType');
    setIsAuthenticated(false);
    window.location.hash = 'signin';
  };

  // Show sign up page
  if (view === 'signup') {
    return (
      <SignUp
        onSignUp={handleSignUp}
        onSwitchToSignIn={() => (window.location.hash = 'signin')}
      />
    );
  }

  // Show sign in if not authenticated or explicitly on signin page
  if (!isAuthenticated || view === 'signin') {
    return (
      <SignIn
        onSignIn={handleSignIn}
        onSwitchToSignUp={() => (window.location.hash = 'signup')}
      />
    );
  }

  // Security dashboard
  if (view === 'dashboard' || userType === 'security') {
    return <Dashboard onSignOut={handleSignOut} />;
  }

  // Student app navigation
  switch (view) {
    case 'trips':
      return <Trips onSignOut={handleSignOut} />;
    case 'profile':
      return <Profile onSignOut={handleSignOut} />;
    case 'map':
    default:
      return <Home onSignOut={handleSignOut} />;
  }
}

export default App;
