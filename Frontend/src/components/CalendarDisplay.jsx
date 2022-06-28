import React, { useState } from 'react';
import Calendar from 'react-calendar'
import App from '../App';
import 'react-calendar/dist/Calendar.css';

const CalendarDisplay = () => {

    const [date, setDate] = useState(new Date());

    return (
     <div >
      <Calendar className="calendarCells" onChange={setDate} value={date} onClick={console.log(date)} />
      {date.toString()}
    </div>

    )

}

export default CalendarDisplay