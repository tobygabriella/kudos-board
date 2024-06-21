import '../CreateBoardForm/CreateBoardForm.css';
import { useState, useEffect } from 'react';

const CommentForm = ({ cardId, onClose, onCreate }) => {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = () => {
    fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/cards/${cardId}/comment`)
      .then(response => response.json())
      .then(data => setComments(data))
      .catch(error => console.error('Error fetching comments:', error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = { content, author };
    onCreate(cardId, newComment);
    setContent('');
    setAuthor('');
    fetchComments();
  };

  return (
    <div className="modalOverlay">
      <div className="modal">
        <button className="closeButton" onClick={onClose}>×</button>
        <h2>Add a Comment</h2>
        <div className="commentsContainer">
          {comments.map(comment => (
            <div key={comment.id} className="comment">
              <p><strong>{comment.author}</strong>: {comment.content}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="author">Author:</label>
            <input
              type="text"
              id="author"
              name="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label htmlFor="content">Comment:</label>
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="createCommentButton" >Add Comment</button>
        </form>
      </div>
    </div>
  );
};

export default CommentForm;
