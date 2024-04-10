import React, {useState} from 'react'

function Input() {

  const [input, setInput] = useState('');


  function handleSubmit() {
    console.log(input)
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