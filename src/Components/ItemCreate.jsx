import React, { useState } from 'react';
import axios from 'axios';

function ItemCreate() {
    const [formData, setFormData] = useState({
        item_title: '',
        item_description: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/items/create/`, formData)
            .then(response => {
                console.log(response.data);
                // Handle success response
            })
            .catch(error => {
                console.error('Error:', error.response.data);
                // Handle error response
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input type="text" name="item_title" value={formData.item_title} onChange={handleChange} />
            </div>
            <div>
                <label>Description:</label>
                <textarea name="item_description" value={formData.item_description} onChange={handleChange}></textarea>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}

export default ItemCreate;