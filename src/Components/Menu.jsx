import React, { useState, useEffect }  from 'react'
import { Button, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'


export default function Menu() {
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    if(localStorage.getItem('access_token') !== null) {
      setIsAuth(true)
    }
  }, [isAuth])
  return (
    <nav className="Navbar bg-ebfbee">
            <Navbar>
              {isAuth ? (
                  <Nav.Link href='/logout'>Logout</Nav.Link>
              ) : (
              <Nav.Link href='/login'>Login/Signup</Nav.Link>
              )}
              <br></br>
              <Nav.Link href='/items/create'>Add Item</Nav.Link>
            </Navbar>

    </nav>
  );
}

