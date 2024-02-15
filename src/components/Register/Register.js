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

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [isValid, setIsValid] = useState(true);

  const [errorClass, setErrorClass] = useState('auth-page__error-message');

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errorText, setErrorText] = useState('что-то пошло не так...')

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormValue({
  //     ...formValue,
  //     [name]: value,
  //   })
  // }


  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    const regex = /[\wа-я\s\-ё]/gi;
    setFormValue(formValue => {
      const newFormValue = {
        ...formValue,
        [name]: value,
      }
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
          setErrorText('Все поля обязательные, длина имени должна быть не менее двух')
        }
        setErrorClass('auth-page__error-message auth-page__error-message_active');
      }
        return newFormValue;
    })
    
  }, [])

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   const regex = /[\wа-я\s\-ё]/gi;
  //   setFormValue(formValue => {
  //       const newFormValue = {
  //         ...formValue,
  //         [name]: value,
  //       }
  //       console.log(newFormValue)
  //       return newFormValue;
  //   })
  //   // console.log(formValue)
  //   // if (regex.test(formValue.name)
  //   //   && validator.validate(formValue.email)
  //   //   && formValue.name !== ''
  //   //   && formValue.password !== ''
  //   // ) {
  //   //   setIsButtonDisabled(false)
  //   // } else {
  //   //   setIsButtonDisabled(true)
  //   // }
  // }

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
      errorText={errorText}
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