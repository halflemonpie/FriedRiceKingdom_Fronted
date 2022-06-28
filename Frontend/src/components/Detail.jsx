import React, { useState, useTransition } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// to-do:
//filter
// change task and projects schema




export default function Detail () {
    const params = useParams().id
    const [data, setData] = useState({})
    const [task, setTask] = useState("")
    const [loading, setLoading] = useState(true)
    // const [toDoList, setTodoList] = useState()
    const [editing, setEditing] = useState({
        name:false,
        image:false,
        date:false,
        description:false,
        importance:false,
        category: false,
        complete: false,
        todo: false
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
    
    const handleDelete = () => {
        axios.delete(`http://localhost:8080/projects/${params}`)
        .then((res) => {
            console.log(res);
        })
    }

    const handleNewTodo = () => {
        console.log("data sent");
        let request = {
            name: task,
            complete: false
        }
        setData({
            ...data,
            task: data.tasks.push(request)
        })
        
        axios.put(`http://localhost:8080/projects/newTodo/${params}`, request)
        .then((res) => {
            console.log(res);
            setLoading(false)
            setEditing({
                ...editing,
                todo:false
            })
        })
    }

    useEffect(() => {
        apiCall()
        
    }, [])

    useEffect(() => {
        apiUpdate()
    },[data.complete])

    
    let toDoList;
    if (loading) {
        toDoList = <h1>loading</h1>
    } else {
        toDoList = (
            data.tasks.map((todo) => {
                console.log(todo.complete);
                return (
                    <div>
                        <span>{todo.name}</span>
                        <span>{todo.complete.toString()}</span>
                    </div>
                )
            })
        )
    }
    
    
    
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
        console.log(data.complete);
        setData({
            ...data,
            [item]: !data[item]
        })
    }



    return (
        <div>
            {(editing.name) ? <input name="name" type="text" onChange={handleChange} value={data.name} /> : <h1>{data.name}</h1>}
            {(editing.name) ? <button onClick={() => {handleSubmit("name")}}>Save</button> : <button onClick={() => {handleEdit("name")}}>Edit for name</button>}
            
            {(editing.image) ? <input name="image" type="text" onChange={handleChange} value={data.image} /> : <img src={data.image} alt={`image for ${data.name}`}/> }
            {(editing.image) ? <button onClick={() => {handleSubmit("image")}}>Save</button> : <button onClick={() => {handleEdit("image")}}>Edit for Image</button>}

            {(editing.date) ? <input name="date" type="date" onChange={handleChange} value={data.date} /> : <p>Date: {data.date}</p>}
            {(editing.date) ? <button onClick={() => {handleSubmit("date")}}>Save</button> : <button onClick={() => {handleEdit("date")}}>Edit for date</button>}
            
            {(editing.description) ? <input name="description" type="text" onChange={handleChange} value={data.description} /> : <p>Description: {data.description}</p>}
            {(editing.description) ? <button onClick={() => {handleSubmit("description")}}>Save</button> : <button onClick={() => {handleEdit("description")}}>Edit for description</button>}

            {(editing.category) ? <input name="category" type="text" onChange={handleChange} value={data.category} /> : <p>Category: {data.category}</p>}
            {(editing.category) ? <button onClick={() => {handleSubmit("category")}}>Save</button> : <button onClick={() => {handleEdit("category")}}>Edit for category</button>}

            <p>Importance Level:{data.importance}</p>
            {(editing.importance) ? <div><button onClick={() => {handleImportance("+")}}>+</button><button onClick={() => {handleImportance("-")}}>-</button><button onClick={() => {handleSubmit("importance")}}>Save</button></div> : <button onClick={() => {handleEdit("importance")}}>edit for importance</button>}
             
            {loading ? <p>loading</p> : <p>Complete: {data.complete.toString()}</p>}<button onClick={() => {handleBoolean("complete")}}>Click Me tO Change</button>

            <button onClick={handleDelete}>Delete Event!</button>

            {/* {loading ? <p>loading</p> : data.tasks.map((todo) => {return (<div><p>{todo.name}</p><p>{todo.complete}</p></div>)})} */}
            {toDoList}

            {(editing.todo) ? <div><input type="text" name="task" onChange={(e) => setTask(e.target.value)}/>  <button onClick={handleNewTodo}>add</button></div> : <button onClick={() => handleEdit("todo")}>add todo</button>}

            
            
           

        </div>
    )
}