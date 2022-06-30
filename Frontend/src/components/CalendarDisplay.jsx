import React, { useState } from 'react';
import Calendar from 'react-calendar'
import './Calendar.css';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
console.log(moment.now());

const CalendarDisplay = (data) => {

    const [date, setDate] = useState(new Date());

    let displayDate = moment(date).format().slice(0, 10);    
    
    const dataDisplay = data.data.filter((project) => {
        return (
            project.date.slice(0, 10) == displayDate
        )
    })

        const projectsDisplay = dataDisplay.map((project) => {
            return(
                <div id="card">
                    <p>Name: {project.name}</p>
                    <p>Category: {project.category}</p>
                </div>
            )
        })

        console.log(projectsDisplay);


    return (
     <div >
      <Calendar 
      className="calendarCells" 
      onChange={setDate} 
      value={date} 
      onClick={console.log()}/>
      {projectsDisplay}

    </div>
    )
}

export default CalendarDisplay