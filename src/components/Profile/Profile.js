import React, { useState } from 'react';
import './Profile.css'
import { useNavigate } from 'react-router-dom';

const Profile = ({ handleSubmit }) => {
  const [nameValue, setNameValue] = useState('Тимур');
  const [emailValue, setEmailValue] = useState('pochta@yandex.ru');

  const navigate = useNavigate();

  function handleNameChange(e) {
    setNameValue(e.target.value);
  }

  function handleEmailChange(e) {
    setEmailValue(e.target.value)
  }

  function handleEditClick(e) {
    e.preventDefault();
  }

  function handleExitClick(e) {
    navigate('/');
  }

  return (
    <section className='profile'>
      <h1 className='profile__title'>Привет, {nameValue}!</h1>
      <form 
        action="/" 
        onSubmit={handleSubmit} 
        name="search-form" 
        noValidate 
        className="profile__form"
      >
        <label className="profile__field">
          <span className='profile__input-description'>Имя</span>
          <input
            id="name-input"
            placeholder='имя'
            type="text"
            name="search-input"
            required
            className="profile__input"
            onChange={handleNameChange}
            value={nameValue}
            minLength='4'
            maxLength='30'
          />
          <span className="profile-input-error"></span>
        </label>
        <label className="profile__field">
          <span className='profile__input-description'>E-mail</span>
          <input
            id="email-input"
            placeholder='email'
            type="email"
            name="search-input"
            required
            className="profile__input"
            onChange={handleEmailChange}
            value={emailValue}
          />
          <span className="profile-input-error"></span>
        </label>
        <button 
          type="submit"
          className="profile__button"
          onClick={handleEditClick}
        >Редактировать</button>
        <button 
          type="button" 
          className="profile__button profile__button_type_exit"
          onClick={handleExitClick}
        >Выйти из аккаунта</button>
    </form>
    </section>
  )
}

export default Profile