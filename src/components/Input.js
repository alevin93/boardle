import React, {useState} from 'react';

function Input() {

  const [input, setInput] = useState('');


  async function handleSubmit() {
    const submitData = async() => {
      let message = {
        "data" : `${input}`,
      };
      const response = await fetch("http://localhost:4000/submit", {
        method: 'POST',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(message)
      });
    }

    await submitData();
  }


  return (
    <div>
      <div className='input-container'>
        <textarea className='input' onChange={(e) => {
            setInput(e.target.value)}}></textarea>
        <button className='submit-button' onClick={handleSubmit} >SUBMIT</button>
      </div>
    </div>
  )
}

export default Input