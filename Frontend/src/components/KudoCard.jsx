import './KudoCard.css';


const KudoCard= ({ id, description,title, author, imageUrl, onDelete,  upvote,onUpvote}) => {
  return (
    <div className="kudosCard">
      <img src={imageUrl} alt={description} className="kudosCardImage" />
      <h3 className="kudosCardDescription">{description}</h3>
      <p className="kudosCardTitle">{title}</p>
      <p className="kudosCardAuthor">{author}</p>
      <div className="kudosCardButtons">
        <button className="deleteButton" onClick={onDelete}>Delete Board</button>
        <button className="upvote-button" onClick={() => onUpvote(id)}>Upvote: {upvote}</button>
      </div>
    </div>
  );
};

export default KudoCard;
