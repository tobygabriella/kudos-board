import './KudosBoard.css';
import { Link } from 'react-router-dom';

const KudosBoard= ({  id, title, category, imageUrl, onDelete }) => {
  return (
    <div className="kudosBoard">
      <img src={imageUrl} alt={title} className="kudosBoardImage" />
      <h3 className="kudosBoardTitle">{title}</h3>
      <p className="kudosBoardCategory">{category}</p>
      <div className="kudosBoardButtons">
        <Link to={`/boards/${id}`} className="viewButton" >View Board</Link>
        <button className="deleteButton" onClick={onDelete}>Delete Board</button>
      </div>
    </div>
  );
};

export default KudosBoard;
