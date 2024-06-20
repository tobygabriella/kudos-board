import './KudoCard.css';


const KudoCard= ({ message, author, imageUrl, onDelete }) => {
  return (
    <div className="kudosCard">
      <img src={imageUrl} alt={message} className="kudosCardImage" />
      <h3 className="kudosCardMessage">{message}</h3>
      <p className="kudosCardAuthor">{author}</p>
      <div className="kudosCardButtons">
        <button className="deleteButton" onClick={onDelete}>Delete Board</button>
        <button className="upvote-button">Upvote</button>
      </div>
    </div>
  );
};

export default KudoCard;
