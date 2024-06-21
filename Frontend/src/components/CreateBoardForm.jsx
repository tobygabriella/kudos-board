import './CreateBoardForm.css';
import { useState, useEffect} from 'react';

const CreateBoardForm= ({onClose, onCreate}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBoard = {
      title,
      category,
      author,
    };
    onCreate(newBoard);
    onClose();
  };

  return (
    <div className="modalOverlay">
      <div className="modal">
        <button className="closeButton" onClick={onClose}>×</button>
        <h2>Create a New Board</h2>
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" value={title}
              onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="formGroup">
            <label htmlFor="category">Category:</label>
            <select id="category" name="category" value={category}
              onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select a category</option>
              <option value="celebration">Celebration</option>
              <option value="thankyou">Thank You</option>
              <option value="inspiration">Inspiration</option>
            </select>
          </div>
          <div className="formGroup">
            <label htmlFor="author">Author:</label>
            <input type="text" id="author" name="author" value={author}
              onChange={(e) => setAuthor(e.target.value)} />
          </div>
          <button type="submit" className="createBoardButton" >Create Board</button>
        </form>
      </div>
    </div>
  );
};

export default CreateBoardForm;
