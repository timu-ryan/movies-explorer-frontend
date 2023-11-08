import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Navigation.css'

const Navigation = ({ isOpen, handleCloseClick }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  function checkIsActive(isActive) {
    if (isActive) {
      return 'navigation__link navigation__link_active'
    }
    return 'navigation__link';
  }

  return (
    <div className={
      isOpen
       ? 'navigation'
       : 'navigation navigation_invisible'
    }>
      
      <div className='navigation__background'></div>
      <nav className='navigation__bar'>
        <NavLink to="/" className={({ isActive }) => checkIsActive(isActive)}>Главная</NavLink>
        <NavLink to="/movies" className={({ isActive }) => checkIsActive(isActive)}>Фильмы</NavLink>
        <NavLink to="/saved-movies" className={({ isActive }) => checkIsActive(isActive)}>Сохранённые фильмы</NavLink>
       
          <NavLink to="/profile" className="navigation__account-button">Аккаунт</NavLink>
          
      </nav>
      <button 
        onClick={handleCloseClick}
        className='navigation__close-button'
      ></button>
    </div>
  )
}

export default Navigation