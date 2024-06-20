import React, { useEffect, useState } from 'react';
import { useParams, Link  } from 'react-router-dom';
import './BoardPage.css';
import CreateCardForm from './CreateCardForm';

const BoardPage = () => {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [cards, setCards] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/${id}`)
      .then(response => response.json())
      .then(data => setBoard(data))
      .catch(error => console.error('Error fetching board:', error));

    fetchCards(id);
  }, [id]);

  const handleCreateCard = (newCard) => {
    fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/${id}/cards`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCard),
      })
        .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            fetchCards(id);
          })
        .catch(error => console.error('Error creating card:', error));
    console.log(newCard);
    setShowCreateForm(false);
  };

  const fetchCards = (boardId) => {
    fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/${boardId}/cards`)
      .then(response => response.json())
      .then(data => setCards(data))
      .catch(error => console.error('Error fetching cards:', error));
  }

  if (!board) {
    return <div>Loading...</div>;
  }

  return (
    <div className="board-page">
      <Link to="/" className="back-button">&lt;</Link>
      <h1 className="board-title">{board.title}</h1>
      <button className="create-card-button" onClick={() => setShowCreateForm(true)}>Create a Card</button>
      <div className="cards-container">
        {cards.map(card => (
          <div key={card.id} className="card">
            <img src={card.imgUrl} alt={card.message} className="card-image" />
            <p className="card-message">{card.message}</p>
            <p className="card-author">{card.author}</p>
            <div className="card-actions">
              <button className="upvote-button">Upvote</button>
              <button className="delete-button">Delete</button>
            </div>
          </div>
        ))}
      </div>
      {showCreateForm && (
        <CreateCardForm
          boardId={id} // Pass the board ID to the form
          onClose={() => setShowCreateForm(false)}
          onCreate={handleCreateCard}
        />
      )}

    </div>
  );
};

export default BoardPage;