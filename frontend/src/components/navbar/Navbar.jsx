// Navbar.jsx
import React from 'react';
import useLogout from '../../hooks/useLogout';
import { BiLogOut } from "react-icons/bi";
import { useAuthContext } from '../../context/AuthContext';

const Navbar = ({ theme, onToggleTheme }) => {
  const {logout} = useLogout();
  const {authUser} = useAuthContext();
  return (
    <div className="navbar bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50 ">
      <div className="flex-1">
        <div className='flex items-center justify-center gap-2 zoom-in ml-10'>
          <img src="/logo.png" alt="logo" className='w-14' />
          <a className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-white bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,255,255,0.15)]">
            WeChat
          </a>
        </div>
      </div>

      {/* LIGHT AND DARK MODE BUTTON */}
      <label className="toggle text-base-content cursor-pointer mr-10">
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={onToggleTheme}
        />

        {/* SUN ICON */}
        <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2"></path><path d="M12 20v2"></path>
            <path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path>
            <path d="M2 12h2"></path><path d="M20 12h2"></path>
            <path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path>
          </g>
        </svg>

        {/* MOON ICON */}
        <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
          </g>
        </svg>
      </label>

      {authUser ? (
        <button className="px-2 py-1 rounded bg-black shadow-none border-none hover:bg-gray-800 -ml-5"
        onClick={logout}>
          <BiLogOut className='w-6 h-6 text-primary cursor-pointer hover:text-secondary'/>
        </button>
      ) : ""}
    </div>
  );
};

export default Navbar;
