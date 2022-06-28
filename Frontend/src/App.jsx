import react from 'react'
import './App.css'
import { useState, useEffect } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import axios from 'axios';
import GetData from './components/GetData';
import NewProject from './components/NewProject'
import Detail from './components/Detail';

function App() {
  const [data, setData] = useState([])
  const API = "http://localhost:8080/projects"

  useEffect(() => {
    const fetchData = async () => {
    
      try { 
        const {data: response} = await axios.get(API)
        setData(response);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
    
    
    }, []);

  return (
    <div className="App">
      <nav>
        <Link to="/">
          <h1 className="nav">Fried Rice Kingdom</h1> 
        </Link>
      </nav>
      <main>
      <Routes>
        <Route path="/" element={<GetData data={data}/>}/>
        <Route path="/create" element={<NewProject />}/>
        <Route path="id/:id" element={<Detail />} />
      </Routes>
    </main>
    </div>
  )
}

export default App
