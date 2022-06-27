import React from "react";
import App from '../App';
import { useState, useEffect } from 'react'
import axios from 'axios';
import '../App.css'
import { Link } from "react-router-dom";

const GetData = ({data}) =>  {

const mapVariables = data.map((key) => {
      return (
        <Link to={`/id/${key._id}`}>
        <div className="cardDisplay">
                <h5 className="cardDisplay" id="card">
                {key.name}
                </h5>
        </div>
        </Link>
      )
     
      
})

return (
    <div>
            {mapVariables}
    </div>
)
}

export default GetData

   