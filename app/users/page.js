"use client"
import React from 'react';
import {useQuery} from 'react-query';

const fetchUsers = async () => {
    const response = await fetch('/api/users');
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  };


const UsersPage = () => {
    const { data, isLoading, error } = useQuery('users', fetchUsers);

    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    
  return (
    <div className='flex flex-col gap-3 justify-center items-center'>
        <h1>All User</h1>
        {data && data.map((e) => 
        <div
        className='border w-56'
        key={e.id}>
            <p>{e.name} </p>
            {!e.email ? <p>No email provided</p>: <p>{e.email} </p>}
        </div>
        )}
    </div>
  )
}

export default UsersPage