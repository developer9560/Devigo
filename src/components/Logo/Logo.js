import React from 'react';
import logo from './Logo.png';
import './Logo.css';



const Logo = ({ size = 'medium' }) => {
  // Define size-based classes
  const sizeClasses = {
    small: {
      container: "flex items-center",
      icon: "flex items-center justify-center w-7 h-7 rounded-lg mr-2 bg-gradient-to-br from-blue-600 to-blue-800 shadow-md shadow-blue-600/30",
      letter: "text-white font-extrabold text-base",
      text: "font-extrabold text-base bg-gradient-to-r from-white to-blue-600 bg-clip-text text-transparent tracking-wide"
    },
    medium: {
      container: "flex items-center",
      icon: "flex items-center justify-center w-10 h-10 rounded-lg mr-2 bg-gradient-to-br from-blue-600 to-blue-800 shadow-md shadow-blue-600/30",
      letter: "text-white font-extrabold text-2xl",
      text: "font-extrabold text-2xl bg-gradient-to-r from-white to-blue-600 bg-clip-text text-transparent tracking-wide"
    },
    large: {
      container: "flex items-center",
      icon: "flex items-center justify-center w-14 h-14 rounded-xl mr-3 bg-gradient-to-br from-blue-600 to-blue-800 shadow-md shadow-blue-600/30",
      letter: "text-white font-extrabold text-3xl",
      text: "font-extrabold text-3xl bg-gradient-to-r from-white to-blue-600 bg-clip-text text-transparent tracking-wide"
    }
  };

  const { container, icon, letter, text } = sizeClasses[size];

  return (
    <div className={container}>
      <div className={icon}>
        {/* <span className={letter}></span> */}
        <img src={logo} alt="Logo" className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 shadow-md shadow-blue-600/30" />
      </div>
      <span className={text}>DEVIGO</span>
    </div>
  );
};

export default Logo; 