import React from "react";
import App from '../App';
import { useState, useEffect } from 'react'
import axios from 'axios';
import '../App.css'

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
                <h5 className="cardDisplay" id="card">
                {key.name}
                </h5>
        </div>
      )
     
      
})

return (
    <div>
            {mapVariables}
    </div>
)
}

export default GetData

   