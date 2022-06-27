import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


export default function Detail () {
    const params = useParams().id
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState({
        name:false,
        date:false,
        description:false,
        importance:false,
        category: false,
        complete: false
    })

    const apiCall = () => {
        axios.get(`http://localhost:8080/projects/${params}`)
        .then((res) => {
            console.log(res.data);
            setData(res.data)
            setLoading(false)
        })
    }

    const apiUpdate = () => {
        axios.put(`http://localhost:8080/projects/${params}`, data)
        .then((res) => {
            console.log(res);
        })
    }

    useEffect(() => {
        apiCall()
        
    }, [])
    
    const handleEdit = (item) => {
        setEditing({
            ...editing,
            [item]:true
        })
    }

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]:event.target.value
        })
    }

    const handleSubmit = (item) => {
        apiUpdate()

        setEditing({
            ...editing,
            [item]:false
        })
    }

    const handleImportance = (option) => {
        if (option == "+" && data.importance < 6) {
            setData({
                ...data,
                importance: data.importance += 1
            })
        } else if (option == "-" && data.importance > 0) {
            setData({
                ...data,
                importance: data.importance -= 1
            })
        }
    }

    const handleBoolean = (item) => {
        if (data.complete) {
            setData({
                ...data,
                complete: false
            })
        } else {
            setData({
                ...data,
                complete: true
            })
        }
    }


    return (
        <div>
            {(editing.name) ? <input name="name" type="text" onChange={handleChange} value={data.name} /> : <h1>{data.name}</h1>}
            {(editing.name) ? <button onClick={() => {handleSubmit("name")}}>Save</button> : <button onClick={() => {handleEdit("name")}}>Edit for name</button>}
            
            {(editing.date) ? <input name="date" type="date" onChange={handleChange} value={data.date} /> : <p>Date: {data.date}</p>}
            {(editing.date) ? <button onClick={() => {handleSubmit("date")}}>Save</button> : <button onClick={() => {handleEdit("date")}}>Edit for date</button>}
            
            {(editing.description) ? <input name="description" type="text" onChange={handleChange} value={data.description} /> : <p>Description: {data.description}</p>}
            {(editing.description) ? <button onClick={() => {handleSubmit("description")}}>Save</button> : <button onClick={() => {handleEdit("description")}}>Edit for description</button>}

            {(editing.category) ? <input name="category" type="text" onChange={handleChange} value={data.category} /> : <p>Category: {data.category}</p>}
            {(editing.category) ? <button onClick={() => {handleSubmit("category")}}>Save</button> : <button onClick={() => {handleEdit("category")}}>Edit for category</button>}

            
            <p>Importance Level:{data.importance}</p>
            {(editing.importance) ? <div><button onClick={() => {handleImportance("+")}}>+</button><button onClick={() => {handleImportance("-")}}>-</button><button onClick={() => {handleSubmit("importance")}}>Save</button></div> : <button onClick={() => {handleEdit("importance")}}>edit for importance</button>}
            
            
            {loading ? <p>loading</p> : <p>Complete: {data.complete.toString()}</p>}<button onClick={() => {handleBoolean("complete")}}>Click Me tO Change</button>
        </div>
    )
}