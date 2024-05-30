import React, { useEffect, useState } from 'react';

function Input() {

  const supportedGames = [
    "connections",
    "wordle",
    "mini crossword",
    "strands",
    "costcodle",
    "bandle",
    "contexto",
    "flashback",
  ]


  const [input, setInput] = useState('');
  const [comment, setComment] = useState('');
  const [toggle, setToggle] = useState(false);
  const BASE_URL = process.env.REACT_APP_BASE_URL;


  async function handleSubmit() {
    setToggle(false);
    if(input)
    if(input === '') { return; }
    const submitData = async () => {
      let message = {
        "user": `${localStorage.getItem('user')}`,
        "data": `${input}`,
        "date": `${getDate()}`,
        "comment": `${comment}`,
        "token" : `${localStorage.getItem('token')}`
      };
      console.log(message);
      const response = await fetch(`${BASE_URL}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(message)
      });
      console.log(response);
      toggleInputSlider();
    };

    await submitData().then(res => window.location.reload());
  }



  const toggleInputSlider = () => {
    console.log("Toggle is: " + toggle);
    console.log("Input is: " + input);
    if (toggle) {
      setToggle(false);
    }
    else {
      setToggle(true);
    }
  }

  function getDate() {
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1; // Months are 0-indexed
    if (month < 10) { month = `0${month}`; }
    let day = currentDate.getDate();
    let formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate);
    return formattedDate;
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && toggle) {
      handleSubmit(); // Submit on Enter key press when toggle is true
    }
  }

  return (
    <>
      <div className={`bigger-input-container ${toggle ? 'show' : ''}`}>
        <button className='top-input-container' onClick={toggle? handleSubmit : toggleInputSlider}>
          <p>SUBMIT</p>
        </button>
        <div className='input-container'>
          <textarea
            id='form'
            className='input'
            placeholder="Enter your score from any game"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress} // Handle Enter key press
          />
        </div>
        <textarea
          className='input-comment'
          placeholder="Enter comments..."
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={handleKeyPress} // Handle Enter key press
        />
      </div>
      <div className={`cancel-area-container ${toggle ? 'show' : ''}`}>
        <button className='cancel-area' onClick={toggleInputSlider}>BUTTON</button>
      </div>
    </>
  );
}

export default Input;
