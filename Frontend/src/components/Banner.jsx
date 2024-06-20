import "./Banner.css"

const Banner = ({openForm, setCategory, setSearchQuery}) => {

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };


  return (
    <div className="banner">
      <input type="text" placeholder="Search boards..." className="search-input" onChange={handleSearchChange}/>
      <div className="button-container">
        <button className="filter-button"onClick={() => setCategory('')} >All</button>
        <button className="filter-button">Recent</button>
        <button className="filter-button" onClick={() => setCategory('celebration')} >Celebration</button>
        <button className="filter-button" onClick={() => setCategory('thankyou')}>Thank You</button>
        <button className="filter-button" onClick={() => setCategory('inspiration')}>Inspiration</button>
      </div>
      <button className="create-board-button" onClick={openForm}>Create a New Board</button>
    </div>
  );
};

export default Banner;