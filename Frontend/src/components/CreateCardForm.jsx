import React, { useState, useEffect} from 'react';
import './CreateCardForm.css';

const CreateCardForm = ({boardId,  onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [owner, setOwner] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [gifs, setGifs] = useState([]);
  const [selectedGif, setSelectedGif] = useState('');

  const handleSearch = (searchQuery) => {
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_GIPHY_API_KEY}&q=${searchQuery}&limit=7`)
      .then(response => response.json())
      .then(data => setGifs(data.data))
      .catch(error => console.error('Error fetching gifs:', error));
  };

  const handleSelectedGif = (gifUrl) =>{
    setSelectedGif(gifUrl);
    setGifs([]);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const newCard = {
        title:title,
        description: description,
        imgUrl:selectedGif,
        author: owner,
        upvote:0,
        boardId: parseInt(boardId),
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
          <button type="button" onClick={()=> handleSearch(searchQuery)}>Search</button>
          <div className="gifGrid">
            {gifs.map(gif => (
              <img
                key={gif.id}
                src={gif.images.fixed_height_small.url}
                alt={gif.title}
                onClick={() => handleSelectedGif(gif.images.fixed_height_small.url)}
              />
            ))}
          </div>
          <input
            type="text"
            placeholder="Gifurl"
            value={selectedGif}
            onChange={(e) => setSelectedGif(e.target.value)}
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
