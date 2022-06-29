import React, { useState } from 'react';
import Calendar from 'react-calendar'
import App from '../App';
import 'react-calendar/dist/Calendar.css';

const CalendarDisplay = (data) => {

    const [date, setDate] = useState(new Date());
    const [inputeDate, setInputDate] = useState(Date(data))
  
    let displayDate = (
      (date.getFullYear() + "-" + 0 + (date.getMonth() + 1) + "-" + date.getDate()) 
    )
        // console.log(data.data[0].date)

        const mapDate = data.data.map((key) => {
            // console.log(key)
            return (
              <div>
                    {key.date}
              </div>
          )})
                // console.log(mapDate)

          let stringDate = (mapDate)
          let x = stringDate.getMonth
        //   let splitDate = stringDate.split(' ')
        //  let newDate = stringDate.toISOString().substring(0, 10);
          console.log(stringDate)
          console.log(x)
        //   console.log(splitDate[10])


    return (
     <div >
      <Calendar 
      className="calendarCells" 
      onChange={setDate} 
      value={date} 
      onClick={console.log(date)} />
      {displayDate}
      {/* {mapDate} */}
      {stringDate}
    </div>
    )
}

export default CalendarDisplay

// 2022-06-15