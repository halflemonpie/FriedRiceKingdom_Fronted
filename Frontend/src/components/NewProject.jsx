import {useState} from "react"
import axios from "axios"
import React from "react"

<<<<<<< HEAD

const NewForm = props => {
    
=======
const NewForm = props => {

>>>>>>> dfeae613d07493316ef29d113b54045cf4a5db30
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
<<<<<<< HEAD

=======
>>>>>>> dfeae613d07493316ef29d113b54045cf4a5db30
       axios.post("http://localhost:8080/projects", data)
       .then(resp => {
            console.log(resp);
            
        })
        .catch(console.log('false'))
    }

    return (
        <div>
<<<<<<< HEAD
            <p3 className="nav">Please input your new project information below:</p3>
=======
>>>>>>> dfeae613d07493316ef29d113b54045cf4a5db30
            <form className="form" onSubmit={handleSubmit}>
                <input className="input" onChange={handleChange} type="text" name="name" placeholder='name'/>
                <input className="input" onChange={handleChange} type="text" name="description" placeholder='description' />
                <input className="input" onChange={handleChange} type="text" name="category" placeholder='category'/>
                <input className="input" onChange={handleChange} type="number" name="importance" placeholder='importance'/>
                <input className="input" onChange={handleChange} type="date" name="date" placeholder='date'/>
                <input className="input" onChange={handleChange} type="hidden" name="complete" placeholder='false'/>
                <input className="input" onChange={handleChange} type="text" name="image" placeholder='image URL'/>
                <input className="input" type="submit" value="Create Project"/>
            </form>
        </div>
    )
}

export default NewForm