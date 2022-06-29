import {useState} from "react"
import axios from "axios"
import React from "react"
import { useNavigate } from 'react-router-dom'
 
const NewForm = props => {
    const [data, setData] = useState({
        name: "",
        description: "",
        category: "",
        importance: 0,
        date: 0,
        complete: false,
        image: "",
    })


        let navigate = useNavigate();
        const goHome = () => {
          navigate("/");
        };

    const handleChange = (e) => {
       setData({
            ...data, 
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
       axios.post("http://localhost:8080/projects", data)
       .then(resp => {
            console.log(resp);
            goHome()
            
        })
        .catch(console.log('false'))
    }

    return (
        <div> 
            <p className="nav">Please input your new project information below:</p>
            <form className="form" onSubmit={handleSubmit}>
                <input className="input" onChange={handleChange} type="text" name="name" placeholder='name'/>
                <input className="input" onChange={handleChange} type="text" name="description" placeholder='description' />
                <input className="input" onChange={handleChange} type="text" name="category" placeholder='category'/>
                <input className="input" onChange={handleChange} type="number" max="5" min="0" name="importance" placeholder='importance'/>
                <input className="input" onChange={handleChange} type="date" name="date" placeholder='date'/>
                <input className="input" onChange={handleChange} type="hidden" name="complete" placeholder='false'/>
                <input className="input" onChange={handleChange} type="text" name="image" placeholder='image URL'/>
                <input className="input" type="submit" value="Create Project"/>
            </form>
            {/* date: */}
            {console.log(data.date)}
        </div>
    )
}

export default NewForm