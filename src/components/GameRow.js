import React, {useEffect, useState} from 'react'
import Score from './Score'

function GameRow(props) {
  const { gameName, gameDataArray } = props;
  
  const [commentArray, setCommentArray] = useState([]);

  useEffect(() => { 
    let tempArray = [];
    for (let x = 0; x < gameDataArray.length; x++) {
        if (gameDataArray[x].comment !== '') { 
            tempArray.push(`"${gameDataArray[x].comment}" - ${gameDataArray[x].player}`);
        }
    }
    setCommentArray(tempArray);
    }, [gameDataArray]);
    
  if(commentArray.length > 0) {
    return (
      <div className='game-row-container'>
        <h2 className='game-title'>{gameName}</h2>
          <div className='score-container'> 
              {Object.entries(gameDataArray).map((gameData) => (
                  <div key={gameData.player}> 
                      <Score data={gameData} />
                  </div>
              ))}
          </div> 
          <div className='bigger-comment-container'>
            {
            Object.entries(commentArray).map((comments) => (
                <div className='comment-container'>
                <p key={comments} className='comment-text'>{comments}</p>
                </div>
            ))}
          </div>
      </div> 
  );
} else {
    return (
        <div className='game-row-container'>
          <h2 className='game-title'>{gameName}</h2>
            <div className='score-container'> 
                {Object.entries(gameDataArray).map((gameData) => (
                    <div key={gameData.player}> 
                        <Score data={gameData} />
                    </div>
                ))}
            </div>
        </div> 
    );
}
}

export default GameRow