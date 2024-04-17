import React, {useEffect, useState} from 'react'
import Score from './Score'

function GameRow(props) {
  const { gameName, gameDataArray } = props;
  
  const [commentArray, setCommentArray] = useState([]);

    console.log(gameDataArray);

  useEffect(() => { 
    let tempArray = [];
    for (let x = 0; x < gameDataArray.length; x++) {
        if (gameDataArray[x].comment !== '') { 
            tempArray.push(`${gameDataArray[x].name} -  ${gameDataArray[x].comment}`);
        }
    }
    setCommentArray(tempArray);
    }, [gameDataArray]);
    
  if(commentArray.length > 0) {
    return (
      <div className='game-row-container'>
        <h2 className='game-title'>{gameName}</h2>
          <div className='score-container'> 
              {gameDataArray.map((gameData) => (
                  <div key={gameData.name}> 
                      <Score data={gameData} />
                  </div>
              ))}
          </div> 
          <div className='comment-container'>
            {
            commentArray.map((comments) => (
                <p key={comments} className='comment-text'>{comments}</p>
            ))}
        </div>
      </div> 
  );
} else {
    return (
        <div className='game-row-container'>
          <h2 className='game-title'>{gameName}</h2>
            <div className='score-container'> 
                {gameDataArray.map((gameData) => (
                    <div key={gameData.name}> 
                        <Score data={gameData} />
                    </div>
                ))}
            </div>
        </div> 
    );
}
}

export default GameRow