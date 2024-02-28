
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { currentUser } from '../lib/currentUser';
// import ItemEdit from '../Components/ItemEdit.jsx'; // Import the ItemEdit component

// function ProfilePage() {
//     const [userItems, setUserItems] = useState([]); // Initialize userItems as an empty array
//     const userToken = localStorage.getItem('access_token'); 
//     const userId = currentUser(); 
//     const [editingItemId, setEditingItemId] = useState(null);

//     useEffect(() => {
//         // Fetch user's items
//         axios.get(`${process.env.REACT_APP_BACKEND_URL}/profile/${userId}/items/`, {
//             headers: {
//                 Authorization: `Bearer ${userToken}`
//             }
//         })
//         .then(response => {
//             // Check if response data is an array before setting state
//             if (Array.isArray(response.data)) {
//                 setUserItems(response.data);
//             } else {
//                 console.error('Invalid response format for user items:', response.data);
//             }
//         })
//         .catch(error => {
//             console.error('Error fetching user items:', error);
//         });
//     }, [userToken, userId]);

//     const handleDelete = (itemId) => {
//         axios.delete(`${process.env.REACT_APP_BACKEND_URL}/items/${itemId}/delete/`, {
//             headers: {
//                 Authorization: `Bearer ${userToken}`
//             }
//         })
//         .then(response => {
//             // Remove the deleted item from the state
//             setUserItems(prevItems => prevItems.filter(item => item.id !== itemId));
//         })
//         .catch(error => {
//             console.error('Error deleting item:', error);
//         });
//     };

//     const handleEdit = (itemId, updatedData) => {
//         axios.put(`${process.env.REACT_APP_BACKEND_URL}/items/${itemId}/edit/`, updatedData, {
//             headers: {
//                 Authorization: `Bearer ${userToken}`
//             }
//         })
//         .then(() => {
//         // Set the editingItemId to null to hide the edit form
//             setEditingItemId(null);
//         // Refresh userItems after editing
//             refreshUserItems();
//         })
//         .catch(error => {
//             console.error('Error editing item:', error);
//         });
//     };

//     return (
//         <div>
//             <h1>Your Items</h1>
//             <div className="card-container">
//                 {userItems.map(item => (
//                     <div className="item-card" key={item.id}>
//                         <h2>{item.item_title}</h2>
//                         <p>{item.item_description}</p>
//                         <button onClick={() => handleDelete(item.id)}>Delete</button>
//                         <button onClick={() => handleEdit(item.id)}>Edit</button>
//                     </div>
//                 ))}
//             </div>
//             {editingItemId && (
//                 <ItemEdit itemId={editingItemId} userToken={userToken} />
//             )}
//         </div>
//     );
// }

// export default ProfilePage;

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
        // Check if response data is an array before setting state
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

    const handleEdit = (itemId, updatedData) => {
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/items/${itemId}/edit/`, updatedData, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        })
        .then(() => {
            // Set the editingItemId to null to hide the edit form
            setEditingItemId(null);
            // Call refreshUserItems to update userItems
            refreshUserItems(userId, userToken, setUserItems);
        })
        .catch(error => {
            console.error('Error editing item:', error);
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
                    onUpdate={(updatedData) => handleEdit(editingItemId, updatedData)}
                />
            )}
        </div>
    );
}

export default ProfilePage;
