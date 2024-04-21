import React, { useEffect, useState } from 'react';
import GameRow from './GameRow';

const URL = process.env.BASE_URL;


function Body() {
 
  const [gamesData, setGamesData] = useState({});

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    fetchGames();
  }, []); 


  async function fetchGames() {
    try {
    const response = await fetch(`${BASE_URL}/getfriendsdata`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: localStorage.getItem('share'), date: getDate()}) 
    });
  
    const data = await response.json(); // Ensure data is fully parsed
    setGamesData(data);

    const date = getDate(); 
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
    console.log(gamesData)
  } catch (error) {
    // ... your error handling logic ...
  }
}

  function getDate() {
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1; // Months are 0-indexed
    if(month < 10) { month = `0${month}`}
    let day = currentDate.getDate();
    let formattedDate = `${year}-${month}-${day}`; 
    return(formattedDate)
  }

  return (
    <div className='main-container'>
        <div className="game-list"> 
            {Object.entries(gamesData).map(([gameName, gamesData]) => (
                <GameRow key={gameName} gameName={gameName} gameDataArray={gamesData} /> 
            ))}
        </div>
    </div>
  );
}

export default Body
