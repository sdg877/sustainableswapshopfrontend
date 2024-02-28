import React, { useState, useEffect } from 'react';
import { currentUser } from '../lib/currentUser.js'; // Import the currentUser function

function SwapForm({ onSubmit, ownerId }) {
  const [itemTitle, setItemTitle] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [offerAccepted, setOfferAccepted] = useState(false);
  const [userId, setUserId] = useState(null); // Store the user ID

  useEffect(() => {
    // Fetch the current user's ID when the component mounts
    const fetchUserId = async () => {
      const id = await currentUser();
      setUserId(id);
    };
    fetchUserId();
  }, []); // Run once when the component mounts

  const handleTitleChange = (e) => {
    setItemTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setItemDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ item_title: itemTitle, item_description: itemDescription, offer_accepted: false, user: userId, item: null }); // Item ID needs to be provided
    setItemTitle('');
    setItemDescription('');
    setOfferAccepted(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h4>Make your offer:</h4>
        <label>
          Item Title:
          <input type="text" value={itemTitle} onChange={handleTitleChange} />
        </label>
        <br />
        <label>
          Item Description:
          <textarea value={itemDescription} onChange={handleDescriptionChange} />
        </label>
        {ownerId === userId && ( 
          <>
            <br />
            <label>
              Offer Accepted:
              <input type="checkbox" checked={offerAccepted} onChange={() => setOfferAccepted(!offerAccepted)} />
            </label>
          </>
        )}
        <input type="hidden" value={userId} /> {/* Provide the user ID as a hidden input */}
        <button type="submit">Submit Offer</button>
      </form>
    </div>
  );
}

export default SwapForm;
