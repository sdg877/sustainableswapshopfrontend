
import React, { useState, useEffect } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { currentUser } from '../lib/currentUser.js'; 
import '../App/App.css';

export default function Menu() {
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState(null); 

  useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {
      setIsAuth(true);
      const id = currentUser(); 
      setUserId(id); 
    } else {
      setIsAuth(false);
      setUserId(null);
    }
  }, [isAuth]); 

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsAuth(false);
    setUserId(null);
    window.location.href = '/login';
  };

  return (
    <nav className="custom-navbar">
      <Navbar expand="lg">
        <Navbar.Brand style={{ color: '#6f42c1', fontSize: '40px' }}>Sustainable Swap Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            {isAuth ? (
              <>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                <Nav.Link href="/items/create">Add Item</Nav.Link>
                {userId && (
                  <Link to={`/profile/${userId}/items/`} className="nav-link">
                    Profile
                  </Link>
                )}
              </>
            ) : (
              <Nav.Link href="/login">Login/Signup</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </nav>
  );
}
