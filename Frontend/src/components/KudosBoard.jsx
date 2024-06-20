import './KudosBoard.css';
import { Link } from 'react-router-dom';

const KudosBoard= ({  id, title, category, imageUrl, onDelete }) => {
  return (
    <div className="kudosCard">
      <img src={imageUrl} alt={title} className="kudosCardImage" />
      <h3 className="kudosCardTitle">{title}</h3>
      <p className="kudosCardCategory">{category}</p>
      <div className="kudosCardButtons">
        <Link to={`/boards/${id}`} className="viewButton" >View Board</Link>
        <button className="deleteButton" onClick={onDelete}>Delete Board</button>
      </div>
    </div>
  );
};

export default KudosBoard;