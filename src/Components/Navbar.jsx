import React from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { getUser, logout } from './user'


const user = await getUser()
if(!user){
  redirect("/login")
}

function Navbar () {
  const navigate = useNavigate( )
  
  
  
 
  
  

  const logoutHandler = async() => {
    try {
      const res = await logout()
      console.log(res)
      navigate("/login")
      window.location.reload()

    } catch (error) {
      console.log(error)
    }
  }



    return (
      <div className="navbar bg-base-100">
<div className="flex-1">
<Link to = "/" className="btn btn-ghost text-xl">GetFit </Link>
</div>
<div className="flex-none gap-2">
<div className="dropdown dropdown-end">
<div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
  <div className="w-10 rounded-full">
    <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
  </div>
</div>
<ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
  <li><Link onClick={logoutHandler}>Logout</Link></li>
</ul>
</div>
</div>
</div>
  )
  
  
  }
  


export default Navbar