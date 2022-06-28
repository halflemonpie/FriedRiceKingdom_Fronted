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
          <div className="nav">
          <h1 className="nav">Home</h1> 
          <input className="filter" type="text" name="filter" placeholder='Filter your projects'/>
          </div>
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
