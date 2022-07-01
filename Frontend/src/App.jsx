import react from "react";
import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import GetData from "./components/GetData";
import NewProject from "./components/NewProject";
import Detail from "./components/Detail";
import Logo from "./Logo.png";
import Calendar from "./components/CalendarDisplay";

function App() {
  const [data, setData] = useState([]);
  const [dataRaw, setDataRaw] = useState([]);
  const API = "https://friedrice-kingdom.herokuapp.com/projects";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(API);
        setData(response);
        setDataRaw(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <nav>
        <div className="header">
          <div>
            <ul className="nav">
              <li>
                <Link to="/">
                  <img id="logo" src={Logo} alt="Logo" />
                </Link>
              </li>
              <Link to="/">
                <li id="events">My Events</li>
              </Link>
              <Link to="/">
                <li id="account">My Account</li>
              </Link>
              <Link to="/calendar">
                <li id="calendar">Calendar</li>
              </Link>
            </ul>

            <div className="btn-myaccount"></div>
          </div>
        </div>
      </nav>

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <GetData dataRaw={dataRaw} setData={setData} data={data} />
            }
          />
          <Route path="/create" element={<NewProject />} />
          <Route path="id/:id" element={<Detail />} />
          <Route path="/calendar" element={<Calendar data={data} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
