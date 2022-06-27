import React from "react";
import App from '../App';
import { useState, useEffect } from 'react'
import axios from 'axios';
import '../App.css'
<<<<<<< HEAD
import { Route, Routes, Link } from 'react-router-dom'
import NewProject from './NewProject'
=======
>>>>>>> dfeae613d07493316ef29d113b54045cf4a5db30

const GetData = () =>  {

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

const mapVariables = data.map((key) => {
      return (
        <div className="cardDisplay">
<<<<<<< HEAD
                <h5 id="card">
=======
                <h5 className="cardDisplay" id="card">
>>>>>>> dfeae613d07493316ef29d113b54045cf4a5db30
                {key.name}
                </h5>
        </div>
      )
     
      
})

return (
    <div>
<<<<<<< HEAD
           <Link to="/create">
            <div className="cardDisplay">
                    <h5 id="card" > Create A New Project</h5>
            </div>
          </Link>
=======
>>>>>>> dfeae613d07493316ef29d113b54045cf4a5db30
            {mapVariables}
    </div>
)
}

export default GetData

   