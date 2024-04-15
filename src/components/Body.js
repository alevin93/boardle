import React, { useEffect, useState } from 'react';
import GameRow from './GameRow';



function Body() {

  const [gamesData, setGamesData] = useState({});
  const [gamesArray, setGamesArray] = useState([]);
  const [newGamesData, setNewGamesData] = useState([]);

  const BASE_URL = process.env.BASE_URL;

  useEffect(() => {
    fetchGames();
  }, []); 


  async function fetchGames() {
    try {
      const response = await fetch(`http://172.88.24.161:4000/getFriendsData`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: localStorage.getItem('user') }) 
      });
   
      const data = await response.json(); // Ensure data is fully parsed
      setGamesData(data);

      let date = getDate();
      let newData = JSON.parse(data);

      const gameNamesArray = []; // Array to store game names

      const newGamesData = {}; 

    for (let x = 0; x < newData.length; x++) {
        const playerData = newData[x];
        const date = getDate(); // Ideally, get this before the player loop

        for (const gameName in playerData.dates[date]) {
            if (!newGamesData[gameName]) {
                newGamesData[gameName] = []; 
            }

            const gameData = {
                name: playerData.name,
                text: playerData.dates[date][gameName].text,  
                comment: playerData.dates[date][gameName].comment, 
            };
            newGamesData[gameName].push(gameData); 
        }
    }
     setNewGamesData(newGamesData); 
    }
    catch (error) {
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
            {Object.entries(newGamesData).map(([gameName, newGamesData]) => (
                <GameRow key={gameName} gameName={gameName} gameDataArray={newGamesData} /> 
            ))}
        </div>
    </div>
  );
}

export default Body