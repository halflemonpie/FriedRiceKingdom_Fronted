import React, { useState } from 'react';
import Calendar from 'react-calendar'
import App from '../App.css';
import 'react-calendar/dist/Calendar.css';

const CalendarDisplay = (data) => {

    const [date, setDate] = useState(new Date());
  
    let displayDate = (
      (date.getFullYear() + "-" + 0 + (date.getMonth() + 1) + "-" + date.getDate()) 
    )
    
    const dataDisplay = data.data.filter((project) => {
        return (
            project.date.slice(0, 10) == displayDate
        )
    })

        const projectsDisplay = dataDisplay.map((project) => {
            return(
                <div id="card">
                    <p>{project.name}</p>
                    <p>{project.category}</p>
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
      onClick={console.log('hi')} />
      {projectsDisplay}

    </div>
    )
}

export default CalendarDisplay