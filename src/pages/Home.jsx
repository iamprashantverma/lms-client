import React, { useEffect } from 'react'
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
function Home() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(()=>{
    if(user) {
      if(user.role === "ADMIN")
          navigate("/admin")
      else  
        navigate("/member");
    }
  },[])

  return (
    <div>
      <p>this is home page</p>
    </div>
  )
}

export default Home
