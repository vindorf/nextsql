"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const UserDetails = ({ params }) => {
  const [input, setInput] = useState({ name: "", email: "" });
  const [user, setUser] = useState({});
  const [msg, setMsg] = useState("");

  const getUser = () => {
    axios.get(`/api/users/${params.id}`).then((res) => setUser(res.data));
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`/api/users/${params.id}`, { name: input.name, email: input.email })
      .then(
        () => getUser(),
        setMsg(`Updated User: ${input.name} ${input.email}`),
        setInput({ name: "", email: "" })
      );
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>USER Id: {params.id} </h1>
      <div>
        <p>Update User</p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center"
        >
          <input
            className="m-5 text-black w-[500px]"
            placeholder={user.name}
            value={input.name}
            name="name"
            onChange={handleInput}
          />
          <input
            className="m-5 text-black w-[500px]"
            placeholder={user.email}
            value={input.email}
            name="email"
            onChange={handleInput}
          />
         <button type='submit' className='bg-zinc-200 rounded w-[500px] hover:bg-zinc-300'>submit</button>
        </form>
        {msg && <div> {msg}</div>}
      </div>
    </div>
  );
};

export default UserDetails;
