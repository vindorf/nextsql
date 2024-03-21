import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='flex  justify-start gap-5 shadow-lg p-3 mb-24 shadow-gray'>
        <Link href='/test'>Test</Link>
        <Link href='/user'>User</Link>
        <Link href='/users'>Users</Link>
        <Link href='/'>Home</Link>
        </div>
  )
}

export default Navbar