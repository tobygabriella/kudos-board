import React, { useEffect, useState } from 'react';
import { useParams, Link  } from 'react-router-dom';
import './BoardPage.css';
import CreateCardForm from './CreateCardForm';
import KudoCard from './KudoCard';


const BoardPage = () => {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [cards, setCards] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleUpvote = (cardId) => {
    fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/cards/${cardId}/upvote`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(updatedCard => {
        setCards(cards.map(card => card.id === cardId ? updatedCard : card));
      })
      .catch(error => console.error('Error upvoting card:', error));
  };

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

  const fetchCards = () => {
    fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/${id}/cards`)
      .then(response => response.json())
      .then(data => setCards(data))
      .catch(error => console.error('Error fetching cards:', error));
  }

  if (!board) {
    return <div>Loading...</div>;
  }

  const handleDeleteCard = (id) => {
    fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/cards/${id}`, {
      method: "DELETE",
      headers:{
        "Content-Type": "application/json",
      },
    })
      .then(response => {
        if (response.ok) {
          setCards(cards.filter(card => card.id !== id));
        } else {
          console.error('Error deleting board:', response.status);
        }
      })
      .then(data => {
        fetchCards();
      })
      .catch(error => {
        console.error('Error deleting board:', error);
      });
  };

  const cardBox = cards.map(card => {
    return (
    <KudoCard
      key={card.id}
      id={card.id}
      boardId ={card.boardId}
      imageUrl={card.imgUrl}
      description={card.description}
      title ={card.title}
      author= {card.author}
      upvote={card.upvote}
      onDelete={() => handleDeleteCard(card.id)}
      onUpvote={handleUpvote}
      />)
  })

  return (
    <div className="board-page">
      <Link to="/" className="back-button">&lt;</Link>
      <h1 className="board-title">{board.title}</h1>
      <button className="create-card-button" onClick={() => setShowCreateForm(true)}>Create a Card</button>
      <div className="cards-container">
        {cardBox}
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
