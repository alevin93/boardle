import React from 'react'
import BackArrow from '@material-ui/icons/ArrowBack';
import ForwardArrow from '@material-ui/icons/ArrowForward';


function Calendar({ date, setDate, dateOffset, setDateOffset, restoreDate }) {

  const formatDate = (date) => {
    if(!date) { return; }
      let arr = date.split("-");
      return `${arr[1]}/${arr[2]}/${arr[0]}`;
  }

  const incrementDate = () => {
    setDateOffset(dateOffset + 1);
    let temp = date.split('-');
    let year = parseInt(temp[0]);
    let month = parseInt(temp[1]);
    let day = parseInt(temp[2]);
        if( month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10) {
          if (day === 31) {
            day = 1;
            month++;
          }
          else {
            day++;
          }
        }
        else if( month === 4 || month === 6 || month === 9 || month === 11) {
          if (day === 30) {
            day = 1;
            month++;
          }
          else {
            day++;
          }
        }
        else if (month === 12) {
          if (day === 31) {
            day = 1;
            month = 1;
            year++;
          }
          else {
            day++;
          }
        }
        else if(month === 2) {
            if( year === 2024 || year === 2028 || year === 2032 || year === 2036 || year === 2040 || year === 2044 || year === 2048) {
              if (day === 29) {
                day = 1;
                month++;
              }
              else {
                day++;
              }
    
            }
            else {
              if (day === 28) {
                day = 1;
                month++;
              }
              else {
                day++;
              }
    
            }
          }
      let tempDate = `${year}-${month}-${day}`
      setDate(tempDate)
  
  }

  const decrementDate = () => {
    setDateOffset(dateOffset - 1)
    let temp = date.split('-');
    let year = parseInt(temp[0]);
    let month = parseInt(temp[1]);
    let day = parseInt(temp[2]);
  
    if(month === 2|| month === 4|| month === 6|| month === 8|| month === 9|| month === 11) {
      if(day === 1) {
        day = 31;
        month--;
      }
      else {
        day--;
      }
    }
    else if(month === 5 || month === 7 || month === 10 || month === 12) {
      if(day === 1) {
        day = 30;
        month--;
      }
      else {
        day--;
      }
    }
    else if(month === 3) {
      if(day === 1) {  
        if(year === 2024 || year === 2028 || year === 2032 || year === 2036 || year === 2040 || year === 2044 || year === 2048) {
          day = 29;
          month--;
        }
        else {
          day = 28;
          month--;
        }
      }
      else {
        day--;
      }
    }
    else if(month === 1) {
      if(day === 1) {
        day=31;
        month=12;
        year--;
      }
    }
    let tempDate = `${year}-${month}-${day}`
      setDate(tempDate)
  }

  function getDate() {
    let currentDate = new Date();
    let year = currentDate.getFullYear(); // Get the full year
    let month = currentDate.getMonth() + 1; // Months are 0-indexed
    if (month < 10) { month = `0${month}`; }
    let day = currentDate.getDate();
    let formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  return (
    <div className='calendar-container'>
      <button className='calendar-buttons' onClick={decrementDate}><BackArrow/></button>
      <button className='date-button'>{formatDate(date)}</button>
      <button className='calendar-buttons' onClick={incrementDate} >{date === getDate() ? <p></p> : <ForwardArrow/>}</button>
    </div>
  )
}

export default Calendar;