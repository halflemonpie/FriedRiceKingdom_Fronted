import React from "react";
import App from '../App';
import { useState, useEffect } from 'react'
import axios from 'axios';
import '../App.css'
import { Link } from "react-router-dom";
import NewProject from './NewProject'
import CatFilterBar from "./CatFilterBar";
import NameFilterBar from "./NameFilterBar";

const GetData = ({dataRaw,setData, data, setQueryResult }) =>  {
  const [name, setName] = useState("")
  const handleNameFilter = (e) => {
    console.log(e.target.value);
    const blackListChar = /[()\\\|\/\[\]*%]/i;
    if (e.target.value == "" ) {
      axios.get(`http://localhost:8080/projects/`)
      .then((res) => {
        console.log(res);
        setData(res.data)
      })
    } else if (blackListChar.test(e.target.value)) {

    } else {
      axios.get(`http://localhost:8080/projects/name/${e.target.value}`)
      .then((res) => {
        console.log(res);
        setData(res.data)
      })
    }
  }

  const handleFilterChange = (e) => {
    console.log("filter called");
    let filteredProjects = dataRaw
    console.log(filteredProjects);
    filteredProjects = dataRaw.filter((project) => {
    return (project.category.toLowerCase().includes(e.target.value.toLowerCase()))
  })
    console.log(filteredProjects);
    setData(filteredProjects)
  }

const mapVariables = data.map((key) => {
      return (
        <Link to={`/id/${key._id}`}>
        <div className="cardDisplay">
                <h5 className="cardDisplay" id="card">
                {key.name}
                </h5>
                {/* the line below it's for testing purpose */}
                <p>category: {key.category}</p>
                {/* the line above it's for testing purpose */}
        </div>
        </Link>
      )
     
      
})

return (
    <div>
      <CatFilterBar handleFilterChange={handleFilterChange}/>
      <NameFilterBar handleNameFilter={handleNameFilter}/>
           <Link to="/create">
            <div className="cardDisplay">
                    <h5 id="card" > Create A New Project</h5>
                    {setQueryResult}
            </div>
          </Link>
            {mapVariables}
    </div>
)
}

export default GetData

   