import React, { useEffect, useState } from 'react';
import { useParams, Link  } from 'react-router-dom';
import './BoardPage.css';
import CreateCardForm from '../CreateCardForm/CreateCardForm';
import KudoCard from '../KudoCard/KudoCard';
import CommentForm from '../CommentForm/CommentForm';
import Footer from '../Footer/Footer';

const BoardPage = () => {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [cards, setCards] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [currentCardId, setCurrentCardId] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleOpenCommentForm = (cardId) => {
    setCurrentCardId(cardId);
    setShowCommentForm(true);
  };

  const handleCloseCommentForm = () => {
    setShowCommentForm(false);
    setCurrentCardId(null);
  };

  const handleCreateComment = (cardId, newComment) => {
    fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/cards/${cardId}/comment`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        handleCloseCommentForm();
      })
      .catch(error => console.error('Error creating comment:', error));
  };

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
    setLoading(true);
    fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/${id}`)
      .then(response => response.json())
      .then(data => {
        setBoard(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching board:', error);
        setLoading(false);
      });

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
    setShowCreateForm(false);
  };

  const fetchCards = () => {
    fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/${id}/cards`)
      .then(response => response.json())
      .then(data => setCards(data))
      .catch(error => console.error('Error fetching cards:', error));
  }

  if (loading) {
    return (
      <div className="spinnerContainer">
        <div className="spinner"></div>
      </div>
    );
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
      onComment={() => handleOpenCommentForm(card.id)}
      />)
  })

  return (
    <div className="boardPage">
      <Link to="/" className="backButton">&lt;</Link>
      <h1 className="boardTitle">{board.title}</h1>
      <button className="createCardButton" onClick={() => setShowCreateForm(true)}>Create a Card</button>
      <div className="cardsContainer">
        {cardBox}
      </div>
      {showCreateForm && (
        <CreateCardForm
          boardId={id}
          onClose={() => setShowCreateForm(false)}
          onCreate={handleCreateCard}
        />
      )}
      {showCommentForm && (
        <CommentForm
          cardId={currentCardId}
          onClose={handleCloseCommentForm}
          onCreate={handleCreateComment}
        />
      )}
      <Footer/>
    </div>
  );
};

export default BoardPage;
