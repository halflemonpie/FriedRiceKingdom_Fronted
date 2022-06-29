import react from 'react'
import './App.css'
import { useState, useEffect } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import axios from 'axios';
import GetData from './components/GetData';
import NewProject from './components/NewProject'
import Detail from './components/Detail';
import Logo from './Logo.png'; 
import Search from './components/Search';

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

  const fetchItems = async (e) => {
    e.preventDefault()
    console.log('fetching items')
    const result = await axios(`${API}/${query}`);
    setQueryResult(result.data);
  };


  return (
    <div className="App">
      <nav>

         
          <Search getQuery={q => setQuery(q)}  data={data} fetchItems={fetchItems}/>
    
        
       
<div className='header'>
            <div className='container'>
                <ul className="nav">
                    <li>
                      <Link to="/">
                        <img  id="logo" src={Logo} alt="Logo"/>
                      </Link>
                    </li>
                    <Link to='/'>
                    <li id= "events">My Events</li>
                    </Link>
                    <Link to='/'>
                    <li id= "account">My Account</li>
                    </Link>
                </ul>
                
                <div className='btn-myaccount'>
                   
            
                </div>
            </div>
        </div>
       
      </nav>

      <Link to="/create">
   
        {/* <h5 id="card" className="cardDisplay"> Create A New Project</h5> */}
    

          </Link>
      <main>
        <Routes>
          <Route path="/" element={<GetData dataRaw={dataRaw} setData={setData} data={data} setQueryResult={setQueryResult} />} />
          <Route path="/create" element={<NewProject />} />
          <Route path="id/:id" element={<Detail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
