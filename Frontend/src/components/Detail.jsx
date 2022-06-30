import React, { useState, useTransition } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './Details.css'

// to-do:
// delete todo
// change true false todo
// create event redirect to detail page




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
console.log(data)
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
            data.tasks.map((todo, index) => {
                console.log(todo);
                return (
                    <div>
                    <div onClick={() => handleBooleanTask(index)}>
                        <span>{todo.name}</span>
                        <span>{todo.complete.toString()}</span>
                    </div>
                    <button onClick={() => handleDeleteTodo(index)} >Delete Todo</button>
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

    const handleBooleanTask = (index) => {
    data.tasks[index].complete = !data.tasks[index].complete
    setData({...data})
    apiUpdate()
 
    }

    const handleDeleteTodo = (index) => {
        data.tasks.splice(index, 1)
        setData({...data})
        console.log(data.tasks);
        apiUpdate()
    }



    return (
        <div className="detail-card">
            <ul>

            <li id="name">
            {(editing.name) ? <input name="name" type="text" onChange={handleChange} value={data.name} /> : <h1>{data.name}</h1>}
            {(editing.name) ? <button onClick={() => {handleSubmit("name")}}>Save</button> : <button onClick={() => {handleEdit("name")}}>Edit for name</button>}
            </li>

            <li id="image">
            {(editing.image) ? <input name="image" type="text" onChange={handleChange} value={data.image} /> : <img src={data.image} alt={`image for ${data.name}`}/> }
            {(editing.image) ? <button onClick={() => {handleSubmit("image")}}>Save</button> : <button onClick={() => {handleEdit("image")}}> Edit for Image</button>}
            </li>

            <li id="date">
            {(editing.date) ? <input name="date" type="date" onChange={handleChange} value={data.date} /> : <p>Date: {data.date}</p>}
            {(editing.date) ? <button onClick={() => {handleSubmit("date")}}>Save</button> : <button onClick={() => {handleEdit("date")}}>Edit for date</button>}
            </li>

            <li id="description">
            {(editing.description) ? <input name="description" type="text" onChange={handleChange} value={data.description} /> : <p>Description: {data.description}</p>}
            {(editing.description) ? <button onClick={() => {handleSubmit("description")}}>Save</button> : <button onClick={() => {handleEdit("description")}}>Edit for description</button>}
            </li>

            <li id="category">
            {(editing.category) ? <input name="category" type="text" onChange={handleChange} value={data.category} /> : <p>Category: {data.category}</p>}
            {(editing.category) ? <button onClick={() => {handleSubmit("category")}}>Save</button> : <button onClick={() => {handleEdit("category")}}>Edit for category</button>}
            </li>

            <li id="importance">
            <p>Importance Level:{data.importance}</p>
            {(editing.importance) ? <div><button onClick={() => {handleImportance("+")}}>+</button><button onClick={() => {handleImportance("-")}}>-</button><button onClick={() => {handleSubmit("importance")}}>Save</button></div> : <button onClick={() => {handleEdit("importance")}}>edit for importance</button>}
            {loading ? <p>loading</p> : <p>Complete: {data.complete.toString()}</p>}<button onClick={() => {handleBoolean("complete")}}>Edit Event</button>
            </li>

            <li id="deleteEvent">
<button onClick={handleDelete}>Delete Event</button>
            </li>
            <li id="todoList">
                 {/* {loading ? <p>loading</p> : data.tasks.map((todo) => {return (<div><p>{todo.name}</p><p>{todo.complete}</p></div>)})} */}
            {toDoList}

{(editing.todo) ? <div><input type="text" name="task" onChange={(e) => setTask(e.target.value)}/>  <button onClick={handleNewTodo}>add</button></div> : <button onClick={() => handleEdit("todo")}>add todo</button>}

            </li>
            
            </ul>

        </div>
    )
}
