// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function ItemEdit({ itemId, userToken }) {
//     const [item, setItem] = useState(null);

//     useEffect(() => {
//         // Fetch item details
//         axios.get(`${process.env.REACT_APP_BACKEND_URL}/items/${itemId}`, {
//             headers: {
//                 Authorization: `Bearer ${userToken}`
//             }
//         })
//         .then(response => {
//             setItem(response.data);
//         })
//         .catch(error => {
//             console.error('Error fetching item details:', error);
//         });
//     }, [itemId, userToken]);

//     const handleFormSubmit = (event) => {
//         event.preventDefault();
//         // Implement logic to update the item
//         console.log('Form submitted:', item);
//     };

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setItem(prevItem => ({
//             ...prevItem,
//             [name]: value
//         }));
//     };

//     if (!item) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <h2>Edit Item</h2>
//             <form onSubmit={handleFormSubmit}>
//                 <label>
//                     Title:
//                     <input
//                         type="text"
//                         name="item_title"
//                         value={item.item_title}
//                         onChange={handleInputChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Description:
//                     <textarea
//                         name="item_description"
//                         value={item.item_description}
//                         onChange={handleInputChange}
//                     ></textarea>
//                 </label>
//                 <br />
//                 <button type="submit">Save Changes</button>
//             </form>
//         </div>
//     );
// }

// export default ItemEdit;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function ItemEdit({ itemId, userToken }) {
//     const [item, setItem] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         // Fetch item details
//         axios.get(`${process.env.REACT_APP_BACKEND_URL}/items/${itemId}`, {
//             headers: {
//                 Authorization: `Bearer ${userToken}`
//             }
//         })
//         .then(response => {
//             setItem(response.data);
//             setLoading(false);
//         })
//         .catch(error => {
//             setError('Error fetching item details');
//             setLoading(false);
//         });
//     }, [itemId, userToken]);

//     const handleFormSubmit = (event) => {
//         event.preventDefault();
        
//         // Send a PUT request to update the item data
//         axios.put(
//             `${process.env.REACT_APP_BACKEND_URL}/items/${itemId}/`, 
//             item, 
//             {
//                 headers: {
//                     Authorization: `Bearer ${userToken}`
//                 }
//             }
//         )
//         .then(response => {
//             console.log('Item updated successfully:', response.data);
//             // Optionally, update the local state with the updated item data
//             // setItem(response.data);
//             // Optionally, show a success message to the user
//         })
//         .catch(error => {
//             console.error('Error updating item:', error);
//             // Optionally, show an error message to the user
//         });
//     };

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setItem(prevItem => ({
//             ...prevItem,
//             [name]: value
//         }));
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>{error}</div>;
//     }

//     return (
//         <div>
//             <h2>Edit Item</h2>
//             <form onSubmit={handleFormSubmit}>
//                 <label>
//                     Title:
//                     <input
//                         type="text"
//                         name="item_title"
//                         value={item?.item_title}
//                         onChange={handleInputChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     Description:
//                     <textarea
//                         name="item_description"
//                         value={item?.item_description}
//                         onChange={handleInputChange}
//                     ></textarea>
//                 </label>
//                 <br />
//                 <button type="submit">Save Changes</button>
//             </form>
//         </div>
//     );
// }

// export default ItemEdit;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Set the CSRF token as a default header for all Axios requests
axios.defaults.xsrfCookieName = 'csrftoken'; // Set the CSRF cookie name used by Django
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'; // Set the CSRF header name expected by Django

// Function to fetch the CSRF token from cookies
const getCsrfToken = () => {
    const csrfTokenCookie = document.cookie.split(';')
        .map(c => c.trim())
        .find(c => c.startsWith('csrftoken='));
    if (!csrfTokenCookie) return null;
    return csrfTokenCookie.split('=')[1];
};

// Function to create Axios instance with CSRF token header
const axiosWithCsrf = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
        'X-CSRFToken': getCsrfToken(), // Set the CSRF token from cookies
    },
});

function ItemEdit({ itemId, userToken }) {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch item details
        axiosWithCsrf.get(`/items/${itemId}/`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        })
        .then(response => {
            setItem(response.data);
            setLoading(false);
        })
        .catch(error => {
            setError('Error fetching item details');
            setLoading(false);
        });
    }, [itemId, userToken]);

    const handleFormSubmit = (event) => {
        event.preventDefault();
        
        // Send a PUT request to update the item data
        axiosWithCsrf.put(
            `/items/${itemId}/`, 
            item, 
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            }
        )
        .then(response => {
            console.log('Item updated successfully:', response.data);
            // Optionally, update the local state with the updated item data
            // setItem(response.data);
            // Optionally, show a success message to the user
        })
        .catch(error => {
            console.error('Error updating item:', error);
            // Optionally, show an error message to the user
        });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setItem(prevItem => ({
            ...prevItem,
            [name]: value
        }));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Edit Item</h2>
            <form onSubmit={handleFormSubmit}>
                <label>
                    Title:
                    <input
                        type="text"
                        name="item_title"
                        value={item?.item_title}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Description:
                    <textarea
                        name="item_description"
                        value={item?.item_description}
                        onChange={handleInputChange}
                    ></textarea>
                </label>
                <br />
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}

export default ItemEdit;
