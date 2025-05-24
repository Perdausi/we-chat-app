import React, { useState } from 'react'
import GenderCheck from './GenderCheck'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup.js';


export const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullname: "",
    username: "",
    password: "",
    ConfirmPassword: "",
    gender: ""
});

const handleCheckBoxChange = (gender) => {
    setInputs({...inputs, gender});
}

const {loading, signup} = useSignup();

const handleSubmit = async(e) => {
    e.preventDefault();

    await signup(inputs);
}

    return (
        <div className="hero min-h-screen w-full bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 md:px-20 text-white font-sans">
  <div className="hero-content flex-col lg:flex-row-reverse gap-10">

    {/* Text Section */}
    <div className="text-center lg:text-left max-w-xl fade-in">
      <h1 className="text-6xl font-bold tracking-wide drop-shadow-xl text-white">Signup now!</h1>
      <p className="py-6 text-gray-300 text-base md:text-lg leading-relaxed drop-shadow-md">
        Say hello to your new favorite hangout spot! 💬 Connect instantly, chat freely, and stay close to the people who matter — anytime, anywhere. Let the conversations begin!
      </p>
    </div>

    {/* Signup Card */}
    <div className="zoom-in card w-full max-w-sm bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl">
      <div className="card-body text-white font-sans">
        <form onSubmit={handleSubmit}>
        <fieldset className="space-y-4">
          <div>
            <label className="fieldset-label text-sm text-gray-200">Full Name</label>
            <input type="text" className="input input-bordered w-full bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="John Doe" 
              value={inputs.fullname}
              onChange={(e) => setInputs({ ...inputs, fullname: e.target.value })}
            />
          </div>

          <div>
            <label className="fieldset-label text-sm text-gray-200">Username</label>
            <input type="text" className="input input-bordered w-full bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="johndoe123" 
              value={inputs.username}
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            />
          </div>

          <div>
            <label className="fieldset-label text-sm text-gray-200">Password</label>
            <input type="password" className="input input-bordered w-full bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="••••••••" 
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            />
          </div>

          <div>
            <label className="fieldset-label text-sm text-gray-200">Confirm Password</label>
            <input type="password" className="input input-bordered w-full bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="••••••••" 
              value={inputs.ConfirmPassword}
              onChange={(e) => setInputs({ ...inputs, ConfirmPassword: e.target.value })}
            />
          </div>

          <GenderCheck onCheckBoxChange={handleCheckBoxChange} selectedGender={inputs.gender}/>
          <div>
            <Link to={"/"} className="link link-hover text-sm text-gray-300 hover:text-primary">Already have an account?</Link>
          </div>
          <button className="rounded py-2 bg-primary text-white mt-4 hover:bg-primary/80 w-full border-none" disabled={loading}>
            {loading ? <span className='loading loading-spinner'></span> : "Sig up"}
          </button>
        </fieldset>
        </form>
      </div>
    </div>

  </div>
</div>


      )
}
