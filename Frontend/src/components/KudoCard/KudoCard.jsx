import './KudoCard.css';


const KudoCard= ({ id, description,title, author, imageUrl, onDelete,  upvote,onUpvote, onComment}) => {
  return (
    <div className="kudosCard">
      <img src={imageUrl} alt={description} className="kudosCardImage" />
      <h3 className="kudosCardTitle">Title: {title}</h3>
      <p className="kudosCardDescription">{description}</p>
      <p className="kudosCardAuthor">Author: {author}</p>
      <div className="kudosCardButtons">
        <button className="deleteButton" onClick={onDelete}>Delete Card</button>
        <button className="upvoteButton" onClick={() => onUpvote(id)}>Upvote: {upvote}</button>
        <button className="commentButton" onClick={onComment}>Comments</button>
      </div>
    </div>
  );
};

export default KudoCard;
