import React, { useContext, useState } from 'react';
import AuthInput from '../AuthInput/AuthInput';
import AuthPage from '../AuthPage/AuthPage';
import { authorize } from '../../utils/MainApi';
import { AppContext } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const pageTexts = {
    greeting: 'Рады видеть!',
    buttonText: 'Войти',
    suggestionText: 'Ещё не зарегистрированы?',
    linkText: 'Регистрация',
    linkTo: '/signup'
  }
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });


  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const [isValid, setIsValid] = useState(true);

  const [errorClass, setErrorClass] = useState('auth-page__error-message');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    })
  }

  function handleSubmitClick(e) {
    e.preventDefault();
    if (!formValue.email || !formValue.password) { 
      return;
    }
    const { email, password } = formValue;
    authorize(email, password)
      .then(data => {
        if(data.token) {
          setFormValue({
            email: '',
            password: '',
          })
          context.setIsLoggedIn(true);
          navigate('/movies', {replace: true});
          setErrorClass('auth-page__error-message');
        } else {
          setErrorClass('auth-page__error-message auth-page__error-message_active');
        }
      })
      .catch(err => {
        console.log(err)
        setErrorClass('auth-page__error-message auth-page__error-message_active');
      })

    // register(name, email, password)
    //   .then(res => navigate('/signin', { replace: true }))
    //   .catch(e => console.log(e))
  }

  // function handleSubmitClick(e) {
  //   e.preventDefault();
  //   setIsValid(isEmailValid && isPasswordValid)
  //   if(isValid) {
  //     setErrorClass('auth-page__error-message')
  //   } else {
  //     setErrorClass('auth-page__error-message auth-page__error-message_active');  
  //   }
  // }

  return (
    <AuthPage 
      texts={pageTexts} 
      handleSubmitClick={handleSubmitClick} 
      errorClass={errorClass} 
    >
      <AuthInput 
        value={formValue.name}
        onChange={handleChange}
        name='email' 
        title='E-mail' 
        type='email' 
        setIsValid={setIsEmailValid} 
        min={6}
        max={24}
      />
      <AuthInput 
        value={formValue.name}
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

export default Login