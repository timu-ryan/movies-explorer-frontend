import React, { useState } from 'react';
import './Profile.css'

const Profile = ({ handleSubmit }) => {
  const [nameValue, setNameValue] = useState('Тимур');
  const [emailValue, setEmailValue] = useState('pochta@yandex.ru');

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
    e.preventDefault();
  }

  return (
    <div className='profile'>
      <h2 className='profile__title'>Привет, {nameValue}!</h2>
      <form 
      action="" 
      onSubmit={handleSubmit} 
      name="search-form" 
      noValidate 
      className="profile__form"
    >
        <label className="profile__field">
          <span className='profile__input-description'>Имя</span>
          <input
            id="name-input"
            type="text"
            name="search-input"
            required
            className="profile__input"
            onChange={handleNameChange}
            value={nameValue}
          />
          <span className="profile-input-error"></span>
        </label>
        <label className="profile__field">
          <span className='profile__input-description'>E-mail</span>
          <input
            id="email-input"
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
          type="submit" 
          className="profile__button profile__button_type_exit"
          onClick={handleExitClick}
        >Выйти из аккаунта</button>
    </form>
    </div>
  )
}

export default Profile