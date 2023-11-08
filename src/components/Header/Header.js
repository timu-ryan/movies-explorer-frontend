import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import './Header.css'

import logoPath from '../../images/logo.svg';
// import Navigation from '../Navigation/Navigation';

const Header = ({ handleNavigationClick }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className='header'>
      <NavLink to="/" className='header__logo'>
        <img alt='логотип' src={logoPath} />
      </NavLink>

      {/* <button 
        style={{position: 'absolute'}}
        onClick={() => setIsLoggedIn(!isLoggedIn)}  
      >sth</button> */}

      {isLoggedIn && (
        <div className='header__navigation'>
          <NavLink to="/movies" className="header__navigation-link">Фильмы</NavLink>
          <NavLink to="/saved-movies" className="header__navigation-link">Сохранённые фильмы</NavLink>
        </div>
      )}
      
      {
        isLoggedIn 
        ? <NavLink to="/profile" className="header__account-button">Аккаунт</NavLink>
        : (
          <div className='header__sign-buttons'>
            <NavLink to="/signup" className="header__sign-button">Регистрация</NavLink>
            <NavLink to="/signin" className="header__sign-button header__sign-button_type_signin">Войти</NavLink>
          </div>
        )
      }

      {
        isLoggedIn && (
          <button 
            onClick={handleNavigationClick}
            className='header__navigation-button'
          ></button>
        )
      }
      

    </div>
  )
}

export default Header;