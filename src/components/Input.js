import React, {useState} from 'react';

function Input() {

  const [input, setInput] = useState('');
  const [comment, setComment] = useState('');
  const [toggle, setToggle] = useState(false);

  const BASE_URL = process.env.REACT_APP_BASE_URL;


  async function handleSubmit() {
    const submitData = async() => {
      let message = {
        "user" : `${localStorage.getItem('user')}`,
        "data" : `${input}`,
        "date" : `${getDate()}`,
        "comment" : `${comment}`,
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
    }

    await submitData().then(res => window.location.reload());
  }

  const toggleInputSlider = () => {
    if(toggle === false) {
      setToggle(true);
    }
    else if(toggle === true) {
      setToggle(false);
    }
  }

  function getDate() {
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1; // Months are 0-indexed
    if(month < 10) { month = `0${month}`}
    let day = currentDate.getDate();
    let formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate)
    return(formattedDate)
  }


  return (
    <>
    <div className={`bigger-input-container ${toggle ? 'show' : ''}`}>
      <button className='top-input-container' onClick={toggleInputSlider}>
        <p>SUBMIT</p>
      </button>
      <div className='input-container'>
        <textarea className='input' placeholder="Enter your score from any game" onChange={(e) => {
            setInput(e.target.value)}}></textarea>
        <button className='submit-button' onClick={handleSubmit} >SUBMIT</button>
      </div>
      <textarea className='input-comment' placeholder="Enter comments..." onChange={(e) => {
            setComment(e.target.value)}}></textarea>
    </div>
    <div className={`cancel-area-container ${toggle ? 'show' : ''}`}>
        <button className='cancel-area' onClick={toggleInputSlider}>BUTTON</button>
    </div>
    </>
  )
}

export default Input
