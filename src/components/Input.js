import React, {useState} from 'react';

function Input() {

  const [input, setInput] = useState('');
  const [comment, setComment] = useState('');

  const BASE_URL = process.env.BASE_URL;


  async function handleSubmit() {
    const submitData = async() => {
      let message = {
        "user" : `${localStorage.getItem('user')}`,
        "data" : `${input}`,
        "comment" : `${comment}`
      };
      const response = await fetch(`https://localhost:4000/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(message)
      });
      console.log(response);
    }

    await submitData().then(res => window.location.reload());
  }


  return (
    <div>
      <div className='input-container'>
        <textarea className='input' placeholder="Enter your score from any game" onChange={(e) => {
            setInput(e.target.value)}}></textarea>
        <button className='submit-button' onClick={handleSubmit} >SUBMIT</button>
        <textarea className='input' placeholder="Enter comments..." onChange={(e) => {
            setComment(e.target.value)}}></textarea>
      </div>
    </div>
  )
}

export default Input