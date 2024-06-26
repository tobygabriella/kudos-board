import './HomePage.css';
import { useState, useEffect} from 'react';
import Header from '../Header/Header';
import Banner from '../Banner/Banner';
import CreateBoardForm from '../CreateBoardForm/CreateBoardForm';
import KudosBoard from '../KudoBoard/KudosBoard';
import Footer from '../Footer/Footer';

function HomePage() {
  const [boards, setBoards] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (selectedCategory) {
      fetchBoardsByCategory(selectedCategory);
    }  else if (searchQuery) {
      searchBoards(searchQuery);
    } else {
      fetchBoards();
    }
  }, [selectedCategory, searchQuery]);

  const handleOpenForm = () => {
    setShowCreateForm(true);
  };

  const handleCloseForm = () => {
    setShowCreateForm(false);
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const handleDeleteBoard = (id) => {
    fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/${id}`, {
      method: 'DELETE',
      headers:{
        "Content-Type": "application/json",
      },
    })
      .then(response => {
        if (response.status === 200) {
          setBoards(boards.filter(board => board.id !== id));
        } else {
          console.error('Error deleting board:', response.status);
        }
      })
      .then(data => {
        fetchBoards();
      })
      .catch(error => {
        console.error('Error deleting board:', error);
      });
  };

  const fetchBoards = () => {
    fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      setBoards(data);
    })
    .catch(error => {
      console.error('Error fetching photo:', error);
    });
  };

  const boardBox = boards.map(board => {
    return (
    <KudosBoard
      key={board.id}
      id={board.id}
      imageUrl={board.imgUrl}
      category={board.category}
      title= {board.title}
      onDelete={() => handleDeleteBoard(board.id)}
      />)
  })

  const handleCreateBoard = (newBoard) => {
    fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBoard),
      }
    )
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      fetchBoards();
    })
    .catch(error => {
      console.error('Error fetching photo:', error);
    });
  }

  const fetchBoardsByCategory = (category) => {
    if(category ==="recent"){
      const sortedBoard = boards.sort((a,b) => b.id -a.id);
      const lastThreeBoards = sortedBoard.slice(0,3)
      setSelectedCategory(category)
      setBoards(lastThreeBoards)
    }
    else{
    fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/category/${category}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setBoards(data);
      })
      .catch(error => {
        console.error(`Error fetching boards for category ${category}:`, error);
      });
    }
  };
  
  const searchBoards = (query) => {
    fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/search/${query}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setBoards(data);
      })
      .catch(error => {
        console.error(`Error searching boards for query ${query}:`, error);
      });
  };

  return (
    <>
      <Header />
      <Banner openForm={handleOpenForm} setCategory={setSelectedCategory} setSearchQuery={setSearchQuery} />
      {showCreateForm && <CreateBoardForm onClose={handleCloseForm} onCreate={handleCreateBoard}/>}
      <div className="boardContainer">{boardBox}</div>
      <Footer/>
    </>
  )
}

export default HomePage
