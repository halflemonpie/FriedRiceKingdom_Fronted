import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { Routes, Route, Link } from "react-router-dom";
import Detail from './components/Detail';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>Hello Fried Rice</h1>
    <Routes>[]
      <Route path="/:id" element={<Detail />} />
    </Routes>
    </div>
  )
}

export default App
