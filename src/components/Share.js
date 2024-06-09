import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Share() {
    const { share } = useParams();
    const [user, setUser] = useState();
    const navigate = useNavigate();

    const BASE_URL=process.env.REACT_APP_BASE_URL;

    useEffect( () => {
        if(localStorage.getItem('user') || localStorage.getItem('token')) {
            setUser(localStorage.getItem('share'))
            handleAddFriend();
        } else {
            localStorage.setItem('friend-to-add', share)
            navigate('/');
            window.location.reload();
        }
    }, [share])

    const handleAddFriend = async () => {
        const response = await fetch(`${BASE_URL}/linkFriends`, {
              method: 'POST',
              headers: {
                'Content-Type': "application/json"
              },
              body: JSON.stringify({ user : localStorage.getItem('share'), friend : share, token: localStorage.getItem('token')})
        })
        const data = await response.json();
        console.log("Data is: ", await JSON.parse(data).error);
        if(JSON.parse(data).error) {
          alert(JSON.parse(data).error);
        } else {
        }
        
        navigate('/');
        window.location.reload();
      }

    console.log(share);
  return (
    <p>adding friend...</p>
  )
}

export default Share