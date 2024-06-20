import React, { useState } from 'react';
import './CreateCardForm.css';

const CreateCardForm = ({boardId,  onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [owner, setOwner] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');
  const [gifs, setGifs] = useState([]);
  const [selectedGif, setSelectedGif] = useState('');

//   const handleSearch = (searchQuery) => {
//     fetch(`https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_GIPHY_API_KEY}&q=${searchQuery}&limit=10`)
//       .then(response => response.json())
//       .then(data => setGifs(data.data))
//       .catch(error => console.error('Error fetching gifs:', error));
//   };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCard = {
        messsage: description,  // TO DO: Correct field name
        author: owner,
        boardId: parseInt(boardId),
        imgUrl:"https://picsum.photos/200/300?random=3"
      // You may want to add the selected gif URL to the new card object
    };
    onCreate(newCard);
  };

  return (
    <div className="modalOverlay">
      <div className="modal">
        <button className="closeButton" onClick={onClose}>×</button>
        <h2>Create a New Card</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter card title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter card description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter search query"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter owner (optional)"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
          <button type="submit">Create Card</button>
        </form>
      </div>
    </div>
  );
};

export default CreateCardForm;
