import React,{ useState } from 'react'

function Register() {

    const [input, setInput] = useState('');

    const handleCreateUser = async () => {
        console.log("HandleCreateUser Run");
        const getNewUser = async() => {
            console.log("getNewUser Run")
            const response = await fetch("http://localhost:4000/createUser", {
              method: 'POST',
              headers: {
                'Content-Type': "application/json"
              },
            }).then(result => {
                console.log();
            })
        }
        await getNewUser();
    }

    const handleSubmit = (e) => {
        console.log(input);
    }

  return (
    <div className='register-card-container'>
        <div className='create-user-container'>
            <h3 className='create-user-text'>New to Boardle?</h3>
            <button className='create-user-button' onClick={handleCreateUser}>Create User</button>
        </div>
        <div className='return-user-container'>
            <h3 className='create-user-text'>Returning User?  Enter private code below!</h3>
            <input className='return-user-input' onChange={(e) => {
            setInput(e.target.value)}}></input>
            <button className='return-user-submit' onClick={handleSubmit}>Submit</button>
        </div>
    </div>
  )
}

export default Register