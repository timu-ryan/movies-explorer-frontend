import React, { useContext, useEffect, useState, useCallback } from 'react';
import './Profile.css'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';
import { updateProfile } from '../../utils/MainApi';

var validator = require("email-validator");

const Profile = () => {

  const context = useContext(AppContext);
  // const [nameValue, setNameValue] = useState('Тимур');
  // const [emailValue, setEmailValue] = useState('pochta@yandex.ru');
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
  });

  const [errorClass, setErrorClass] = useState('auth-page__error-message');
  const [errorText, setErrorText] = useState('что-то пошло не так...');
  const [successClass, setSuccessClass] = useState('auth-page__success-message')


  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

  const navigate = useNavigate();
  // function handleNameChange(e) {
  //   setNameValue(e.target.value);
  // }

  useEffect(() => {
    setFormValue(context.userData)
  }, [context.userData])

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    const regex = /[\wа-я\s\-ё]/gi;
    setFormValue(formValue => {
      const newFormValue = {
        ...formValue,
        [name]: value,
      };
      
      if(newFormValue.name === context.userData.name 
        && newFormValue.email === context.userData.email
      ) {
        setIsButtonDisabled(() => true)
        setErrorClass('auth-page__error-message');
      } else {
          if (regex.test(newFormValue.name)
          && validator.validate(newFormValue.email)
          && (newFormValue.name !== '')
          && (newFormValue.password !== '')
        ) {
          setIsButtonDisabled(false)
          setErrorClass('auth-page__error-message');
        } else {
          setIsButtonDisabled(true)
          if (!regex.test(newFormValue.name)) {
            setErrorText('Имя должно содержать только кириллицу, латиницу или дефис, длина должна быть больше 2')
          }
          if (!validator.validate(newFormValue.email)) {
            setErrorText('E-mail должен быть вида email@gmail.com')
          }
          if (newFormValue.name === '' || newFormValue.password === '') {
            setErrorText('Все поля обязательные, длина имени должна быть не менее двух символов')
          }
          setErrorClass('auth-page__error-message auth-page__error-message_active');
        }
      }
      return newFormValue;
    })
  }, [context.userData.email, context.userData.name])

  // function handleEmailChange(e) {
  //   setEmailValue(e.target.value)
  // }

  function handleEditClick(e) {
    e.preventDefault();
      const { name, email } = formValue;
      updateProfile(name, email)
        .then(res => {
          context.setUserData({ name: res.name, email: res.email })
          setSuccessClass('auth-page__success-message auth-page__success-message_active')
          setTimeout(() => {
            setSuccessClass('auth-page__success-message')
          }, 5000);
          setIsButtonDisabled(true)
          // setErrorClass(() => 'auth-page__error-message auth-page__error-message_active');
        })
        .catch(err => {
          setErrorText('что-то пошло не так...')
          setErrorClass('auth-page__error-message auth-page__error-message_active');
          console.log(err)
        })
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
        {/* <button 
          type="submit"
          className="profile__button"
          // onClick={handleEditClick}
        >Редактировать</button> */}
        {isButtonDisabled ? 
            <button 
              type="submit"
              className="profile__button profile__button_disabled"
              disabled
            >Редактировать</button>
          : <button 
              type="submit"
              className="profile__button"
            >Редактировать</button>
          }
          <span className={errorClass}>{errorText}</span>
          <span className={successClass}>Данные изменены!</span>
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