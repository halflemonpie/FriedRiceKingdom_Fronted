import React, { useState } from "react";
import Calendar from "react-calendar";
import "./Calendar.css";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { Link } from "react-router-dom";

const CalendarDisplay = (data) => {
  const [date, setDate] = useState(new Date());
  let displayDate = moment(date).format().slice(0, 10);
  const dataDisplay = data.data.filter((project) => {
    return project.date.slice(0, 10) == displayDate;
  });

  const projectsDisplay = dataDisplay.map((project) => {
    return (
      <Link to={`/id/${project._id}`}>
        <div className="card">
          <p>{project.name}</p>
          <p>Category: {project.category}</p>
          <img
            className="card-image"
            src={project.image}
            alt={`image for ${project.name}`}
          />
        </div>
      </Link>
    );
  });

  return (
    <div>
      <div id="calendar-div">
        <Calendar
          className="calendarCells"
          onChange={setDate}
          value={date}
          onClick={console.log()}
        />
      </div>
      <div className="filter-container">{projectsDisplay}</div>
    </div>
  );
};

export default CalendarDisplay;
