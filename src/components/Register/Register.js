import React, { useState } from 'react';
import AuthInput from '../AuthInput/AuthInput';
import AuthPage from '../AuthPage/AuthPage';

const Register = ({ handleSubmit }) => {
  const pageTexts = {
    greeting: 'Добро пожаловать!',
    buttonText: 'Зарегистрироваться',
    suggestionText: 'Уже зарегистрированы?',
    linkText: 'Войти',
    linkTo: '/signin'
  }

  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const [isValid, setIsValid] = useState(true);

  const [errorClass, setErrorClass] = useState('auth-page__error-message');

  function handleSubmitClick(e) {
    setIsValid(isNameValid && isEmailValid && isPasswordValid) //если одно ложное вернет ложное
    e.preventDefault();
    if(isValid) {
      setErrorClass('auth-page__error-message')
    } else {
      setErrorClass('auth-page__error-message auth-page__error-message_active');  
    }
  }

  return (
    <AuthPage 
      texts={pageTexts}
      handleSubmitClick={handleSubmitClick} 
      errorClass={errorClass}
    >
      <AuthInput 
        name='name' 
        title='Имя' 
        type='text'
        setIsValid={setIsNameValid} 
        min={6}
        max={24} 
      />
      <AuthInput 
        name='email' 
        title='E-mail' 
        type='email'
        setIsValid={setIsEmailValid} 
        min={6}
        max={24} 
      />
      <AuthInput 
        name='password' 
        title='Пароль' 
        type='password' 
        setIsValid={setIsPasswordValid} 
        min={6}
        max={24}
      />
    </AuthPage>
  )
}

export default Register