import react from 'react'
import './App.css'
import { useState, useEffect } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import axios from 'axios';
import GetData from './components/GetData';
import NewProject from './components/NewProject'
import Detail from './components/Detail';
import Logo from './Logo.png'; 

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
        {/* <Link to="/">
      
            <h1 >
            <img  id="logo" src={Logo} alt="Logo"/>
            </h1>  
        </Link>
        
        <h1 > My Events </h1> */}

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
        <div>
        <h5 id="card" className="cardDisplay"> Create A New Project</h5>
        </div>

          </Link>
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
