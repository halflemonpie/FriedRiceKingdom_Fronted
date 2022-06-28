import React from "react";
import App from '../App';
import { useState, useEffect } from 'react'
import axios from 'axios';
import '../App.css'
import { Link } from 'react-router-dom'
import NewProject from './NewProject'

const GetData = ({data}) =>  {

const mapVariables = data.map((key) => {
      return (
        <Link to={`/id/${key._id}`}>
        <div className="cardDisplay">
                <h5 id="card">
                {key.name}
                </h5>
        </div>
        </Link>
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

   