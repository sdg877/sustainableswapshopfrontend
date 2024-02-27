import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../App/App.css';

function ItemViewPage() {
  const { itemId } = useParams();
  console.log(itemId); 

  const [item, setItem] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/items/${itemId}/`)
      .then(response => {
        setItem(response.data);
      })
      .catch(error => {
        console.error('Error fetching item details:', error);
      });
  }, [itemId]);

  return (
    <div>
      {item ? (
        <div className="item-card">
          <h1>{item.item_title}</h1>
          <p>{item.item_description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ItemViewPage;
