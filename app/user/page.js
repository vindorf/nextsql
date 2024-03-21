"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';



const UserPage =  () => {
  const[user, setUser] = useState(null);
  const [input, setInput] = useState({name: "", email: ""})

  const getUser = () =>{
    const allUser = axios.get('/api/users')
    .then((res) => setUser(res.data))
  }

  useEffect(() => {
getUser()
  },[])
  
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput(prevInput => ({
      ...prevInput,
      [name]: value
    }));
  }

  const submitHandler =  (e) =>  {
    e.preventDefault();

const newUser = axios.post('/api/users', {name:input.name, email:input.email})
.then((res) => {
  getUser()
})

  }

  return (
    <div>
      <div>
        {user && user.map((e) => 
        <div key={e.id} className='shadow-lg shadow-gray w-[500px] m-auto my-5'>
          <p>{e.name} </p>
          <p>{e.email} </p>
        <div className='flex justify-end pr-3'>
        <a 
          href={`/user/${e.id}`}
          className='hover:underline font-extralight text-xs cursor-pointer'
          >
            Details
          </a>
        </div>
        </div>
        )}
      </div>
      <h1>Create User</h1>
      <form onSubmit={submitHandler} className='flex flex-col justify-center items-center'>
        <input
        className='m-5 text-black w-[500px]'
        placeholder='name'
        value={input.name}
        name='name'
        onChange={handleInput}
        />
        <input
        className='m-5 text-black w-[500px]'
        placeholder='email'
        value={input.email}
        name='email'
        onChange={handleInput}
        />
        <button type='submit' className='bg-zinc-200 rounded w-[500px] hover:bg-zinc-300'>submit</button>
      </form>
    </div>
  )
}

export default UserPage