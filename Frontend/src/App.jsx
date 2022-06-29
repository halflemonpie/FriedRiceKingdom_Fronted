import react from 'react'
import './App.css'
import { useState, useEffect } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import axios from 'axios';
import GetData from './components/GetData';
import NewProject from './components/NewProject'
import Detail from './components/Detail';
import Search from './components/Search';
import Calendar from './components/CalendarDisplay'

function App() {
  const [data, setData] = useState([]);
  const [dataRaw, setDataRaw] = useState([]);
  const API = 'http://localhost:8080/projects';
  const [query, setQuery] = useState('');
  const [queryResult, setQueryResult] = useState({})

  

  // console.log(query);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(API);
        setData(response);
        setDataRaw(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);



  return (
    <div className="App">
      <nav>
        <Link to="/">
          <h1 className="nav">Fried Rice Kingdom</h1>
        </Link>
        <Link to="/calendar"> Calendar
        </Link>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<GetData dataRaw={dataRaw} setData={setData} data={data} setQueryResult={setQueryResult} />} />
          <Route path="/create" element={<NewProject />} />
          <Route path="id/:id" element={<Detail />} />
          <Route path="/calendar" element={<Calendar data={data}/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
