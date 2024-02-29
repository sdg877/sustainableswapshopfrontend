import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { currentUser } from '../lib/currentUser';
import ItemEdit from '../Components/ItemEdit.jsx'; // Import the ItemEdit component

const refreshUserItems = (userId, userToken, setUserItems) => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/profile/${userId}/items/`, {
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    })
    .then(response => {
        if (Array.isArray(response.data)) {
            setUserItems(response.data);
        } else {
            console.error('Invalid response format for user items:', response.data);
        }
    })
    .catch(error => {
        console.error('Error fetching user items:', error);
    });
};

function ProfilePage() {
    const [userItems, setUserItems] = useState([]); // Initialize userItems as an empty array
    const userToken = localStorage.getItem('access_token'); 
    const userId = currentUser(); 
    const [editingItemId, setEditingItemId] = useState(null);

    useEffect(() => {
        refreshUserItems(userId, userToken, setUserItems);
    }, [userToken, userId]);

    const handleDelete = (itemId) => {
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/items/${itemId}/delete/`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        })
        .then(response => {
            // Remove the deleted item from the state
            setUserItems(prevItems => prevItems.filter(item => item.id !== itemId));
        })
        .catch(error => {
            console.error('Error deleting item:', error);
        });
    };

    return (
        <div>
            <h1>Your Items</h1>
            <div className="card-container">
            {userItems.map(item => (
                <div className="item-card" key={item.id}>
                    {item && (
                        <>
                            <h2>{item.item_title}</h2>
                            <p>{item.item_description}</p>
                            <button onClick={() => handleDelete(item.id)}>Delete</button>
                            <button onClick={() => setEditingItemId(item.id)}>Edit</button>
                        </>
                    )}
                </div>
            ))}
            </div>
            {editingItemId && (
                <ItemEdit
                    itemId={editingItemId}
                    userToken={userToken}
                />
            )}
        </div>
    );
}

export default ProfilePage;
