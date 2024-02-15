import React, { useState, useCallback, useContext } from 'react';
import AuthInput from '../AuthInput/AuthInput';
import AuthPage from '../AuthPage/AuthPage';
import { register, authorize } from '../../utils/MainApi';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';

var validator = require("email-validator");

const Register = ({ handleSubmit }) => {
  const pageTexts = {
    greeting: 'Добро пожаловать!',
    buttonText: 'Зарегистрироваться',
    suggestionText: 'Уже зарегистрированы?',
    linkText: 'Войти',
    linkTo: '/signin'
  }
  const context = useContext(AppContext);

  const navigate = useNavigate();

  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [isValid, setIsValid] = useState(true);

  const [errorClass, setErrorClass] = useState('auth-page__error-message');

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: '',
  });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormValue({
  //     ...formValue,
  //     [name]: value,
  //   })
  // }


  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    })
    const regex = /[\wа-я\s\-ё]/gi;
    if (regex.test(formValue.name)
      && validator.validate(formValue.email)
      && formValue.name !== ''
      && formValue.password !== ''
    ) {
      setIsButtonDisabled(false)
    } else {
      setIsButtonDisabled(true)
    }
    // console.log(formValue)
    // if (value) {
    //   if (value.length === 0) {
    //     setIsButtonDisabled(true)
    //   } else {
    //     setIsButtonDisabled(false)
    //   }
    // } else {
    //   setIsButtonDisabled(false)
    // }
    // if (name === 'email') {
    //   // value = '';
    //   setIsButtonDisabled(!validator.validate(value)); 
    // } /// TODO: validation required
    // if (name === 'name') {
    //   const regex = /[\wа-я\s\-ё]/gi;
    //   setIsButtonDisabled(!regex.test(value))
    // }
  })

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
        .then(res => {
          navigate('/signin', { replace: true });
          setErrorClass('auth-page__error-message');
        })
        .then(() => {
          authorize(email, password)
            .then(data => {
              if(data.token) {
                // setFormValue({
                //   email: '',
                //   password: '',
                // })
                context.setIsLoggedIn(true);
                navigate('/movies', {replace: true});
                setErrorClass('auth-page__error-message');
              } else {
                setErrorClass('auth-page__error-message auth-page__error-message_active');
              }
            })
        })
        .catch(e => {
          setErrorClass('auth-page__error-message auth-page__error-message_active');
          console.log(e)
        })
    }
  }

  // const handleCatchChange = useCallback(() => {
  //   setName(count + 1);
  // }, [count]);

  return (
    <AuthPage 
      texts={pageTexts}
      handleSubmitClick={handleSubmitClick} 
      errorClass={errorClass}
      isButtonDisabled={isButtonDisabled}
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