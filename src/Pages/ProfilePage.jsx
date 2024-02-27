import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ProfilePage() {
  const [userItems, setUserItems] = useState([]);

  useEffect(() => {
    const userToken = localStorage.getItem('token');

    // Fetch user's items
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/items/user/`, {
      headers: {
        Authorization: `Bearer ${userToken}`
      }
    })
      .then(response => {
        setUserItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching user items:', error);
      });
  }, []);

  return (
    <div>
      <h1>Your Items</h1>
      <ul>
        {userItems.map(item => (
            <li>
            <div>{item.item_title}</div>
            <br />
            {item.item_description}
          </li> 
        ))}
      </ul>
    </div>
  );
}

export default ProfilePage;