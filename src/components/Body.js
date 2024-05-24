import React, { useEffect, useState } from 'react';
import GameRow from './GameRow';
import Input from './Input';
import Calendar from './Calendar';

const URL = process.env.BASE_URL;


function Body() {

  const [gamesData, setGamesData] = useState({});
  const [date, setDate] = useState(getDate());
  const [dateOffset, setDateOffset] = useState();


  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    console.log(Object.keys(gamesData))
    let temp = getDate();
    if (date) {
      fetchGames(date);
    }
    else {
      fetchGames(temp);
    }
  }, [date]); 


  async function fetchGames(date) {
    try {
    const response = await fetch(`${BASE_URL}/getfriendsdata`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: localStorage.getItem('share'), date: date, token: localStorage.getItem('token')}) 
    });
  
    const data = await response.json(); // Ensure data is fully parsed
    setGamesData(data);
    const rawGamesData = JSON.parse(data);
    const sortedGamesData = {};

    for (let x = 0; x < rawGamesData.length; x++) {
      if (!sortedGamesData.hasOwnProperty(rawGamesData[x].gameName)) {
        sortedGamesData[rawGamesData[x].gameName] = [];
      }
      sortedGamesData[rawGamesData[x].gameName].push(
        {
          "player": rawGamesData[x].player,
          "text": rawGamesData[x].text,
          "comment": rawGamesData[x].comment
        }
      )
    }
    setGamesData(sortedGamesData);
  } catch (error) {
    // ... your error handling logic ...
  }
}

const restoreDate = () => {
  setDate(getDate());
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
if(Object.keys(gamesData).length === 0) {
  return (
    <div className='main-container'>
        <Calendar date={date} setDate={setDate} dateOffset={dateOffset} setDateOffset={setDateOffset} restoreDate={restoreDate} />
        <div className="game-list"> 
            {Object.entries(gamesData).map(([gameName, gamesData]) => (
                <GameRow key={gameName} gameName={gameName} gameDataArray={gamesData} /> 
            ))}
        </div>
        <div className='no-data-text-container'>
        <p className='no-data-text'>Nobody has submitted for today.  Be the first!</p>
        </div>
        <Input />
    </div>
  );
}
else {
  return (
    <div className='main-container'>
        <Calendar date={date} setDate={setDate} dateOffset={dateOffset} setDateOffset={setDateOffset} restoreDate={restoreDate} />
        <div className="game-list"> 
            {Object.entries(gamesData).map(([gameName, gamesData]) => (
                <GameRow key={gameName} gameName={gameName} gameDataArray={gamesData} /> 
            ))}
        </div>
        <Input />
    </div>
  );
}
}

export default Body
