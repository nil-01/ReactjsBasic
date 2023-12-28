import React, { useState , useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import About from './components/About';
import Navbar from './components/Navbar';
import CouponForm from './components/CouponForm';
import CouponList from './components/CouponList';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [mode, setMode] = useState('light');
  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      SetText('Disable Dark Mode');
      SetFontText('text-light');
    } else {
      setMode('light');
      SetText('Enable Dark Mode');
      SetFontText('');
    }
  };
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setIsAuthenticated(true);
    }
  }, []); 

  const [fontColor, SetFontText] = useState('');
  const [text, SetText] = useState('Enable Dark Mode');

  const handleLogin = () => {
    setIsAuthenticated(true);
    // Redirect to Navbar after successful login
    return <Navigate to="/coupon" />;
  };

  return (
    <Router>
      <div className="App">
        {isAuthenticated && (
          <Navbar
            title="Coupon Management"
            AddEmployee="AddCoupon"
            EmployeeList="Coupons"
            isAuthenticated={setIsAuthenticated}
            toggleMode={toggleMode}
            fontColor={fontColor}
            mode = {mode}
            text={text}
          />
        )}
        <Routes>
          <Route path="/add-coupon" element={<CouponForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/coupons" element={<CouponList />} />
          <Route path="/editCoupon/:couponId" element={<CouponForm/>} />
          <Route
            path="/"
            element={<Login onLogin={handleLogin} />}
          />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
