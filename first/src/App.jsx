import { useState, useEffect } from 'react';

function App() {
  const [msg, setMsg] = useState([]);

 useEffect(() => {
  fetch('http://localhost:3000/user/api/users')
    .then(res => res.json())
    .then(data => setMsg(data))
}, []);


  return (
    <div>
    <ul>
      <h1>User Details</h1>
    
    {
    msg.map((item)=> <div><li>Name : {item.name}</li> <li>Age : {item.age}</li> <li>Mobile : {item.mob}</li> <li>City : {item.city}</li> <hr></hr></div>)
    }
    </ul>
    </div>
  )
}

export default App;
