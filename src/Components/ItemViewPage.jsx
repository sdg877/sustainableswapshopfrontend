// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import '../App/App.css';

// function ItemViewPage() {
//   const { itemId } = useParams();
//   console.log("Item ID:", itemId);

//   const [item, setItem] = useState(null);

//   useEffect(() => {
//     axios.get(`${process.env.REACT_APP_BACKEND_URL}/items/${itemId}/`)
//       .then(response => {
//         setItem(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching item details:', error);
//       });
//   }, [itemId]);

//   return (
//     <div className="centered-item-card-container">
//       {item ? (
//         <div className="item-card enlarged">
//           <h1>{item.item_title}</h1>
//           <p>{item.item_description}</p>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }

// export default ItemViewPage;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import '../App/App.css';
// import SwapForm from './SwapForm';

// function ItemViewPage() {
//   const { itemId } = useParams();
//   console.log("Item ID:", itemId);

//   const [item, setItem] = useState(null);
//   const [showForm, setShowForm] = useState(false);

//   useEffect(() => {
//     axios.get(`${process.env.REACT_APP_BACKEND_URL}/items/${itemId}/`)
//       .then(response => {
//         setItem(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching item details:', error);
//       });
//   }, [itemId]);

//   const handleFormSubmit = (formData) => {
//     // You can perform your submission logic here, such as sending the offer to the backend
//     console.log("Offer submitted:", formData);
//     setShowForm(false); // Hide the form after submission
//   };

//   return (
//     <div className="centered-item-card-container">
//       {item ? (
//         <div className="item-card enlarged">
//           <h1>{item.item_title}</h1>
//           <p>{item.item_description}</p>
//           {showForm ? (
//             <SwapForm onSubmit={handleFormSubmit} />
//           ) : (
//             <button onClick={() => setShowForm(true)}>Make Offer</button>
//           )}
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }

// export default ItemViewPage;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import '../App/App.css';
// import SwapForm from './SwapForm';

// function ItemViewPage() {
//   const { itemId } = useParams();
//   console.log("Item ID:", itemId);

//   const [item, setItem] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [swaps, setSwaps] = useState([]);

//   const handleFormSubmit = (formData) => {
//   // Submit the offer data to the backend
//   axios.post(`${process.env.REACT_APP_BACKEND_URL}/items/${itemId}/create-swap/`, formData)
//     .then(response => {
//       console.log("Offer submitted:", response.data);
//       // Refresh the swaps list to display the newly added swap
//       axios.get(`${process.env.REACT_APP_BACKEND_URL}/items/${itemId}/swaps/`)
//         .then(response => {
//           setSwaps(response.data);
//         })
//         .catch(error => {
//           console.error('Error fetching swaps:', error);
//         });
//       setShowForm(false); // Hide the form after successful submission
//     })
//     .catch(error => {
//       console.error('Error submitting offer:', error);
//       // Handle error
//     });
// };

//   useEffect(() => {
//     // Fetch item details and swaps associated with the item
//     axios.get(`${process.env.REACT_APP_BACKEND_URL}/items/${itemId}/`)
//       .then(response => {
//         setItem(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching item details:', error);
//       });
  
//     // Fetch swaps associated with the item
//     axios.get(`${process.env.REACT_APP_BACKEND_URL}/items/${itemId}/swaps/`)
//       .then(response => {
//         setSwaps(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching swaps:', error);
//       });
//   }, [itemId]);
  
//   return (
//     <div className="centered-item-card-container">
//       {item ? (
//         <div className="item-card enlarged">
//           <h1>{item.item_title}</h1>
//           <p>{item.item_description}</p>
//           {/* Display existing swaps */}
//           <h2>Swaps:</h2>
//           <ul>
//             {swaps.length > 0 ? (
//               swaps.map(swap => (
//                 <li key={swap.id}>{swap.offer}</li>
//               ))
//             ) : (
//               <li>No offers yet</li>
//             )}
//           </ul>
//           {/* Show swap form */}
//           <SwapForm onSubmit={handleFormSubmit} ownerId={item.user} />
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
//       }

// export default ItemViewPage;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import '../App/App.css';
// import SwapForm from './SwapForm';

// function ItemViewPage() {
//   const { itemId } = useParams();
//   console.log("Item ID:", itemId);

//   const [item, setItem] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [swaps, setSwaps] = useState([]);

//   const handleFormSubmit = (formData) => {
//     // Submit the offer data to the backend
//     axios.post(`${process.env.REACT_APP_BACKEND_URL}/items/${itemId}/create-swap/`, formData)
//       .then(response => {
//         console.log("Offer submitted:", response.data);
//         // Refresh the swaps list to display the newly added swap
//         axios.get(`${process.env.REACT_APP_BACKEND_URL}/items/${itemId}/swaps/`)
//           .then(response => {
//             setSwaps(response.data);
//           })
//           .catch(error => {
//             console.error('Error fetching swaps:', error);
//           });
//         setShowForm(false); // Hide the form after successful submission
//       })
//       .catch(error => {
//         console.error('Error submitting offer:', error);
//         // Handle error
//       });
//   };

//   useEffect(() => {
//     // Fetch item details and swaps associated with the item
//     axios.get(`${process.env.REACT_APP_BACKEND_URL}/items/${itemId}/`)
//       .then(response => {
//         setItem(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching item details:', error);
//       });
  
//     // Fetch swaps associated with the item
//     axios.get(`${process.env.REACT_APP_BACKEND_URL}/items/${itemId}/swaps/`)
//       .then(response => {
//         setSwaps(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching swaps:', error);
//       });
//   }, [itemId]);
  
//   return (
//     <div className="centered-item-card-container">
//       {item ? (
//         <div className="item-card enlarged">
//           <h1>{item.item_title}</h1>
//           <p>{item.item_description}</p>
//           {/* Display the image */}
//           {item.image_path && (
//             <img src={`https://sdg-ga-seb77.s3.amazonaws.com/${item.image_path}`} alt={item.item_title} />
//           )}
//           {/* Display existing swaps */}
//           <h2>Swaps:</h2>
//           <ul>
//             {swaps.length > 0 ? (
//               swaps.map(swap => (
//                 <li key={swap.id}>{swap.offer}</li>
//               ))
//             ) : (
//               <li>No offers yet</li>
//             )}
//           </ul>
//           {/* Show swap form */}
//           <SwapForm onSubmit={handleFormSubmit} ownerId={item.user} />
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }

// export default ItemViewPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../App/App.css';
import SwapForm from './SwapForm';

function ItemViewPage() {
  const { itemId } = useParams();
  console.log("Item ID:", itemId);

  const [item, setItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [swaps, setSwaps] = useState([]);

  const handleFormSubmit = (formData) => {
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/items/${itemId}/create-swap/`, formData)
      .then(response => {
        console.log("Offer submitted:", response.data);
        // Refresh the swaps list to display the newly added swap
        fetchSwaps();
        setShowForm(false);
      })
      .catch(error => {
        console.error('Error submitting offer:', error);
        // Handle error
      });
  };

  const fetchSwaps = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/items/${itemId}/swaps/`)
      .then(response => {
        setSwaps(response.data);
      })
      .catch(error => {
        console.error('Error fetching swaps:', error);
      });
  };

  useEffect(() => {
    // Fetch item details
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/items/${itemId}/`)
      .then(response => {
        setItem(response.data);
      })
      .catch(error => {
        console.error('Error fetching item details:', error);
      });

    // Fetch swaps associated with the item
    fetchSwaps();
  }, [itemId]);

  return (
    <div className="centered-item-card-container">
      {item ? (
        <div className="item-card enlarged">
          <h1>{item.item_title}</h1>
          <p>{item.item_description}</p>
          {/* Display the image */}
          {item.image_path && (
          <img src={`https://sdg-ga-seb77.s3.amazonaws.com/${item.image_path}`} alt={item.item_title} />
          )}
          {/* Display existing swaps */}
          <h2>Swaps:</h2>
          <ul>
            {swaps && swaps.length > 0 ? (
              swaps.map(swap => (
                <li key={swap.id}>{swap.offer}</li>
              ))
            ) : (
              <li>No offers yet</li>
            )}
          </ul>
          {/* Show swap form */}
          <SwapForm onSubmit={handleFormSubmit} ownerId={item.user} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ItemViewPage;

