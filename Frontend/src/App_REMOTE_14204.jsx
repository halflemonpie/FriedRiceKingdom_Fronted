import react from 'react'
import './App.css'
import { useState, useEffect } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import axios from 'axios';
import GetData from './components/GetData';
import NewProject from './components/NewProject'

function App() {

  return (
    <div className="App">
      <nav>
        <Link to="/">
          <h1 className="nav">Home</h1> 
          <Link to="/create">
            <h5 id="card" className="cardDisplay"> Create A New Project</h5>
          </Link>
        </Link>
      </nav>
      <main>
      <Routes>
        <Route path="/" element={<GetData />}/>
        <Route path="/create" element={<NewProject />}/>
      </Routes>
    </main>
    </div>
  )
}

export default App
