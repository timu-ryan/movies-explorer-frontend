import React, { useState } from 'react';
import AuthInput from '../AuthInput/AuthInput';
import AuthPage from '../AuthPage/AuthPage';
import { register } from '../../utils/MainApi';
import { useNavigate } from 'react-router-dom';

const Register = ({ handleSubmit }) => {
  const pageTexts = {
    greeting: 'Добро пожаловать!',
    buttonText: 'Зарегистрироваться',
    suggestionText: 'Уже зарегистрированы?',
    linkText: 'Войти',
    linkTo: '/signin'
  }

  const navigate = useNavigate();

  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const [isValid, setIsValid] = useState(true);

  const [errorClass, setErrorClass] = useState('auth-page__error-message');

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    })
  }

  function handleSubmitClick(e) {
    e.preventDefault();
    // setIsValid(isNameValid && isEmailValid && isPasswordValid) //если одно ложное вернет ложное
    // if(isValid) {
    //   setErrorClass('auth-page__error-message')
    // } else {
    //   setErrorClass('auth-page__error-message auth-page__error-message_active');  
    // }
    if (true) {    /// TODO: check is input valid  
      const { name, email, password } = formValue;
      register(name, email, password)
        .then(res => navigate('/signin', { replace: true }))
        .catch(e => console.log(e))
    }
  }

  return (
    <AuthPage 
      texts={pageTexts}
      handleSubmitClick={handleSubmitClick} 
      errorClass={errorClass}
    >
      <AuthInput 
        value={formValue.name}
        onChange={handleChange}
        name='name' 
        title='Имя' 
        type='text'
        setIsValid={setIsNameValid} 
        min={6}
        max={24} 
      />
      <AuthInput 
        value={formValue.email}
        onChange={handleChange}
        name='email' 
        title='E-mail' 
        type='email'
        setIsValid={setIsEmailValid} 
        min={6}
        max={24} 
      />
      <AuthInput 
        value={formValue.password}
        onChange={handleChange}
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