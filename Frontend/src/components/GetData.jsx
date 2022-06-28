import React from "react";
import App from '../App';
import { useState, useEffect } from 'react'
import axios from 'axios';
import '../App.css'
import { Route, Routes, Link } from 'react-router-dom'
import NewProject from './NewProject'

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
                <h5 id="card">
                {key.name}
                </h5>
        </div>
      )
     
      
})

return (
    <div>
           <Link to="/create">
            <div className="cardDisplay">
                    <h5 id="card" > Create A New Project</h5>
            </div>
          </Link>
            {mapVariables}
    </div>
)
}

export default GetData

   