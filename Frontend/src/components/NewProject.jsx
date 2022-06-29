import {useState} from "react"
import axios from "axios"
import React from "react"

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
            
        })
        .catch(console.log('false'))
    }

    return (
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <input required className="input" onChange={handleChange} type="text" name="name" placeholder='name'/>
                <input required className="input" onChange={handleChange} type="text" name="description" placeholder='description' />
                <input required className="input" onChange={handleChange} type="text" name="category" placeholder='category'/>
                <input required className="input" onChange={handleChange} type="number" name="importance" placeholder='importance'/>
                <input required className="input" onChange={handleChange} type="date" name="date" placeholder='date'/>
                <input className="input" onChange={handleChange} type="hidden" name="complete" placeholder='false'/>
                <input className="input" onChange={handleChange} type="text" name="image" placeholder='image URL'/>
                <input className="input" type="submit" value="Create Project"/>
            </form>
        </div>
    )
}

export default NewForm