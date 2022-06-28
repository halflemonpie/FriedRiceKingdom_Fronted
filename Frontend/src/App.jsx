import react from 'react'
import './App.css'
import { useState, useEffect } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import axios from 'axios';
import GetData from './components/GetData';
import NewProject from './components/NewProject'
import Detail from './components/Detail';
import Search from './components/Search';

function App() {
  const [data, setData] = useState([]);
  const API = 'http://localhost:8080/projects';
  const [query, setQuery] = useState('');
  const [queryResult, setQueryResult] = useState({})

  console.log(query);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(API);
        setData(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const fetchItems = async (e) => {
    e.preventDefault()
    console.log('fetching items')
    const result = await axios(`${API}/${query}`);
    setQueryResult(result.data);
  };


  return (
    <div className="App">
      <nav>
        <Link to="/">
          <h1 className="nav">Fried Rice Kingdom</h1>
          <Search getQuery={q => setQuery(q)}  data={data} fetchItems={fetchItems}/>
        </Link>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<GetData data={data} setQueryResult={setQueryResult} />} />
          <Route path="/create" element={<NewProject />} />
          <Route path="id/:id" element={<Detail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
