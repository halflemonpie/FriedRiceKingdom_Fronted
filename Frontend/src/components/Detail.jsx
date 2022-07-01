import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Details.css";
import deleteButton from "./delete.png";
import addButton from "./add.png";
import moment from "moment";

export default function Detail() {
  const params = useParams().id;
  const [data, setData] = useState({});
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState({
    name: false,
    image: false,
    date: false,
    description: false,
    importance: false,
    category: false,
    complete: false,
    todo: false,
  });
  const [isHovering, setIsHovering] = useState({
    name: false,
    image: false,
    date: false,
    description: false,
    importance: false,
    category: false,
    todo: false,
  });

  const apiCall = () => {
    axios.get(`http://localhost:8080/projects/${params}`).then((res) => {
      console.log(res.data);
      setData(res.data);
      setLoading(false);
    });
  };

  const apiUpdate = () => {
    axios.put(`http://localhost:8080/projects/${params}`, data).then((res) => {
      console.log(res);
    });
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:8080/projects/${params}`).then((res) => {
      console.log(res);
    });
  };

  const handleNewTodo = () => {
    let request = {
      name: task,
      complete: false,
    };
    setData({
      ...data,
      task: data.tasks.push(request),
    });

    axios
      .put(`http://localhost:8080/projects/newTodo/${params}`, request)
      .then((res) => {
        console.log(res);
        setLoading(false);
        setEditing({
          ...editing,
          todo: false,
        });
      });
  };

  useEffect(() => {
    apiCall();
  }, []);

  useEffect(() => {
    apiUpdate();
  }, [data.complete]);

  let toDoList;
  if (loading) {
    toDoList = <h1>loading</h1>;
  } else {
    toDoList = data.tasks.map((todo, index) => {
      if (!todo.complete) {
        return (
          <li
            className="to-do-list"
            key={index}
            onClick={() => handleBooleanTask(index)}
            onMouseOver={() => handleMouseOver("todo")}
            onMouseOut={() => handleMouseOut("todo")}
          >
            <span>{todo.name}</span>{" "}
            {isHovering.todo && (
              <i
                className="fa-solid fa-trash-can"
                onClick={() => handleDeleteTodo(index)}
              ></i>
            )}
          </li>
        );
      } else {
        return (
          <li
            className="to-do-list"
            key={index}
            onClick={() => handleBooleanTask(index)}
            onMouseOver={() => handleMouseOver("todo")}
            onMouseOut={() => handleMouseOut("todo")}
          >
            <s>{todo.name}</s>{" "}
            {isHovering.todo && (
              <i
                className="fa-solid fa-trash-can"
                onClick={() => handleDeleteTodo(index)}
              ></i>
            )}
          </li>
        );
      }
    });
  }

  let dateDisplay;
  if (loading) {
    dateDisplay = <p>loading</p>;
  } else {
    dateDisplay = <span>{data.date.slice(0, 10)}</span>;
  }

  const handleMouseOver = (component) => {
    setIsHovering({
      ...isHovering,
      [component]: true,
    });
  };

  const handleMouseOut = (component) => {
    setIsHovering({
      ...isHovering,
      [component]: false,
    });
  };

  const handleEdit = (item) => {
    setEditing({
      ...editing,
      [item]: true,
    });
  };

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (item) => {
    apiUpdate();

    setEditing({
      ...editing,
      [item]: false,
    });
  };

  const handleImportance = (option) => {
    if (option == "+" && data.importance < 6) {
      setData({
        ...data,
        importance: (data.importance += 1),
      });
    } else if (option == "-" && data.importance > 0) {
      setData({
        ...data,
        importance: (data.importance -= 1),
      });
    }
  };

  const handleBoolean = (item) => {
    console.log(data.complete);
    setData({
      ...data,
      [item]: !data[item],
    });
  };

  const handleBooleanTask = (index) => {
    data.tasks[index].complete = !data.tasks[index].complete;
    setData({ ...data });
    apiUpdate();
  };

  const handleDeleteTodo = (index) => {
    data.tasks.splice(index, 1);
    setData({ ...data });
    console.log(data.tasks);
    apiUpdate();
  };

  return (
    <div className="detail-card">
      <ul>
        <li id="name">
          {editing.name ? (
            <input
              name="name"
              type="text"
              onChange={handleChange}
              value={data.name}
            />
          ) : (
            <h1
              onMouseOver={() => handleMouseOver("name")}
              onMouseOut={() => handleMouseOut("name")}
            >
              {data.name}{" "}
              {isHovering.name && (
                <i
                  className="fa-solid fa-pen-to-square"
                  onClick={() => {
                    handleEdit("name");
                  }}
                ></i>
              )}
            </h1>
          )}
          {editing.name && (
            <button
              onClick={() => {
                handleSubmit("name");
              }}
            >
              Save
            </button>
          )}
        </li>

        <li
          id="image"
          onMouseOver={() => handleMouseOver("image")}
          onMouseOut={() => handleMouseOut("image")}
        >
          {editing.image ? (
            <input
              name="image"
              type="text"
              onChange={handleChange}
              value={data.image}
            />
          ) : (
            <div>
              <img src={data.image} alt={`image for ${data.name}`} />
              <br />
              {isHovering.image && (
                <i
                  id="img-icon"
                  className="fa-solid fa-pen-to-square"
                  onClick={() => {
                    handleEdit("image");
                  }}
                ></i>
              )}
            </div>
          )}
        </li>
        <li id="image">
          {editing.image && (
            <button
              onClick={() => {
                handleSubmit("image");
              }}
            >
              Save
            </button>
          )}
        </li>

        <li id="date">
          {editing.date ? (
            <input
              name="date"
              type="date"
              onChange={handleChange}
              value={data.date}
            />
          ) : (
            <p
              onMouseOver={() => handleMouseOver("date")}
              onMouseOut={() => handleMouseOut("date")}
            >
              Date: {dateDisplay}{" "}
              {isHovering.date && (
                <i
                  className="fa-solid fa-calendar-days"
                  onClick={() => {
                    handleEdit("date");
                  }}
                ></i>
              )}
            </p>
          )}
          {editing.date && (
            <button
              onClick={() => {
                handleSubmit("date");
              }}
            >
              Save
            </button>
          )}
        </li>

        <li id="description">
          {editing.description ? (
            <input
              name="description"
              type="text"
              onChange={handleChange}
              value={data.description}
            />
          ) : (
            <p
              onMouseOver={() => handleMouseOver("description")}
              onMouseOut={() => handleMouseOut("description")}
            >
              Description: {data.description}{" "}
              {isHovering.description && (
                <i
                  className="fa-solid fa-pen-to-square"
                  onClick={() => {
                    handleEdit("description");
                  }}
                ></i>
              )}
            </p>
          )}
          {editing.description && (
            <button
              onClick={() => {
                handleSubmit("description");
              }}
            >
              Save
            </button>
          )}
        </li>

        <li id="category">
          {editing.category ? (
            <input
              name="category"
              type="text"
              onChange={handleChange}
              value={data.category}
            />
          ) : (
            <p
              onMouseOver={() => handleMouseOver("category")}
              onMouseOut={() => handleMouseOut("category")}
            >
              Category: {data.category}{" "}
              {isHovering.category && (
                <i
                  className="fa-solid fa-pen-to-square"
                  onClick={() => {
                    handleEdit("category");
                  }}
                ></i>
              )}
            </p>
          )}
          {editing.category && (
            <button
              onClick={() => {
                handleSubmit("category");
              }}
            >
              Save
            </button>
          )}
        </li>

        <li id="importance">
          <p
            onMouseOver={() => handleMouseOver("importance")}
            onMouseOut={() => handleMouseOut("importance")}
          >
            Importance Level: <i className={`fa-solid fa-${data.importance}`}></i>{" "}
            {isHovering.importance && (
              <i
                className="fa-solid fa-pen-to-square"
                onClick={() => {
                  handleEdit("importance");
                }}
              ></i>
            )}
          </p>
          {editing.importance && (
            <div>
              <button
                onClick={() => {
                  handleImportance("+");
                }}
              >
                +
              </button>
              <button
                onClick={() => {
                  handleImportance("-");
                }}
              >
                -
              </button>
              <button
                onClick={() => {
                  handleSubmit("importance");
                }}
              >
                Save
              </button>
            </div>
          )}
        </li>

        <li id="handleEvent">
          {loading ? (
            <p>loading</p>
          ) : (
            <p>Complete: {data.complete ? "✅" : "❌"}</p>
          )}
          <button
            onClick={() => {
              handleBoolean("complete");
            }}
          >
            ✅ / ❌
          </button>
        </li>

        <li>
          <button onClick={handleDelete}>
            <img id="deleteButton" src={deleteButton} alt="delete button" />
            DELETE EVENT
          </button>
        </li>

        <li id="todoList" className="to-do-box">
          <h1>To Do:</h1>
          <ul>{toDoList}</ul>
          {editing.todo ? (
            <div>
              <input
                type="text"
                name="task"
                onChange={(e) => setTask(e.target.value)}
              />{" "}
              <button onClick={handleNewTodo}>add</button>
            </div>
          ) : (
            <button onClick={() => handleEdit("todo")}>
              <img id="addButton" src={addButton} alt="add button" />
              To Do
            </button>
          )}
        </li>
      </ul>
    </div>
  );
}
