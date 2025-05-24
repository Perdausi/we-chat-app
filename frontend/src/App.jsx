// App.jsx
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/navbar/Navbar';
import Login from './pages/login/Login';
import { SignUp } from './pages/signup/SignUp';
import Home from './pages/home/Home';
import { useAuthContext } from './context/AuthContext';

function App() {
  const {authUser} = useAuthContext();
  const [theme, setTheme] = useState('light');
  

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gradient-img' : 'bg-dark'} transition-all duration-500 ease-in-out`}>
      <Navbar theme={theme} onToggleTheme={handleThemeToggle} />
      <div className='h-screen flex items-center justify-center p-0 m-0'>
        <Routes>
          <Route path='/login' element={authUser ? <Navigate to="/" /> : <Login />} />
          <Route path='/signup' element={authUser ? <Navigate to="/" /> : <SignUp />} />
          <Route path='/' element={authUser ? <Home /> : <Navigate to="/login" />} />
        </Routes>
        <Toaster />
      </div>
    </div>
  );
}

export default App;
