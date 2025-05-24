import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogin';


const Login = () => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");

   const {loading, login} = useLogin();

  const handleSubmit = async (e) =>{
    e.preventDefault();

    await login(username, password);

  }

  return (
    <div className="hero min-h-screen w-full bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 md:px-20 text-white font-sans">
  <div className="hero-content flex-col lg:flex-row-reverse gap-10">

    {/* Text Section */}
    <div className="text-center lg:text-left max-w-xl">
    <h1 className="text-6xl font-bold tracking-wide drop-shadow-xl text-white animate-typewriter font-roboto py-3">Login now!</h1>
      <p className="py-6 fade-in text-gray-300 text-base md:text-lg leading-relaxed drop-shadow-md">
        Say hello to your new favorite hangout spot! 💬 Connect instantly, chat freely, and stay close to the people who matter — anytime, anywhere. Let the conversations begin!
      </p>
    </div>

    {/* Login Card */}
    <div className="zoom-in card w-full max-w-sm bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl">
      <form onSubmit={handleSubmit}>
      <div className="card-body text-white font-sans">
        <fieldset className="space-y-4">
          <div>
            <label className="fieldset-label text-sm text-gray-200">Email or Username</label>
            <input type="text" className="input input-bordered w-full bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="you@example.com" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="fieldset-label text-sm text-gray-200">Password</label>
            <input type="password" className="input input-bordered w-full bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <Link to={"/signup"} className="link link-hover text-sm text-gray-300 hover:text-primary">Create Account!</Link>
          </div>
          <button className="rounded py-2 bg-primary text-white mt-4 w-full border-none hover:bg-primary/80 transition-colors duration-200"
            disabled={loading}
          >
            {loading ? <span className='loading loading-spinner'></span> : "Login"}
          </button>
        </fieldset>
      </div>
      </form>
    </div>

  </div>
</div>

  )
}

export default Login