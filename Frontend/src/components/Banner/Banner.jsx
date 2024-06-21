import "./Banner.css"

const Banner = ({openForm, setCategory, setSearchQuery}) => {

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="banner">
      <input type="text" placeholder="Search boards..." className="searchInput" onChange={handleSearchChange}/>
      <div className="buttonContainer">
        <button className="filterButton" onClick={() => setCategory('')} >All</button>
        <button className="filterButton" onClick={() => setCategory('recent')}>Recent</button>
        <button className="filterButton" onClick={() => setCategory('celebration')} >Celebration</button>
        <button className="filterButton" onClick={() => setCategory('thankyou')}>Thank You</button>
        <button className="filterButton" onClick={() => setCategory('inspiration')}>Inspiration</button>
      </div>
      <button className="createBoardButton" onClick={openForm}>Create a New Board</button>
    </div>
  );
};

export default Banner;
