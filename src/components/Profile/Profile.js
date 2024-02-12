import React, { useContext, useState } from 'react';
import './Profile.css'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';
import { updateProfile } from '../../utils/MainApi';

const Profile = () => {

  const context = useContext(AppContext);
  // const [nameValue, setNameValue] = useState('Тимур');
  // const [emailValue, setEmailValue] = useState('pochta@yandex.ru');
  const [formValue, setFormValue] = useState(context.userData);

  const navigate = useNavigate();
  // function handleNameChange(e) {
  //   setNameValue(e.target.value);
  // }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    })
  }

  // function handleEmailChange(e) {
  //   setEmailValue(e.target.value)
  // }

  function handleEditClick(e) {
    e.preventDefault();
    if(true) {       /// TODO: validate form
      const { name, email } = formValue;
      updateProfile(name, email)
        .then(res => context.setUserData({ name: res.name, email: res.email }))
        .catch(err => console.log(err))
    }
  }

  function handleExitClick() {
    localStorage.removeItem('jwt');  // clear localstorage
    localStorage.clear();
    context.setIsLoggedIn(false);

    navigate('/');
  }

  return (
    <section className='profile'>
      <h1 className='profile__title'>Привет, {context.userData.name}!</h1>
      <form 
        action="/" 
        onSubmit={handleEditClick} 
        name="search-form" 
        noValidate 
        className="profile__form"
      >
        <label className="profile__field">
          <span className='profile__input-description'>Имя</span>
          <input
            value={formValue.name}
            onChange={handleChange}
            id="name-input"
            placeholder='имя'
            type="text"
            name="name"
            required
            className="profile__input"
            minLength='4'
            maxLength='30'
          />
          <span className="profile-input-error"></span>
        </label>
        <label className="profile__field">
          <span className='profile__input-description'>E-mail</span>
          <input
            value={formValue.email}
            onChange={handleChange}
            id="email-input"
            placeholder='email'
            type="email"
            name="email"
            required
            className="profile__input"
          />
          <span className="profile-input-error"></span>
        </label>
        <button 
          type="submit"
          className="profile__button"
          // onClick={handleEditClick}
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