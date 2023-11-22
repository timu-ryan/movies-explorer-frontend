import React, { useState } from 'react';
import './AuthInput.css'

const AuthInput = ({ 
  value,
  onChange,
  name, 
  title, 
  type,
  setIsValid,
  min,
  max,
 }) => {
  
  // const [value, setValue] = useState('');

  function validate(value, min, max) {
    if (value < min) {
      setIsValid(false);
    } else if (value > max) {
      setIsValid(false);
    } else {
      setIsValid(true)
    }
  }

  // function handleChange(e) {
  //   setValue(e.target.value);
  //   // console.log(value)
  //   validate(value, min, max);
  // }

  return (
      <label className="auth-input">
        <span className='auth-input__input-description'>{title}</span>
        <input
          id={`${name}-input`}
          type={type}
          placeholder={title}
          // name={`auth-${name}-input`}
          name={name}
          value={value}
          onChange={onChange}
          required
          className="auth-input__input"
          minLength={min}
          maxLength={max}
        />
        <span className="auth-input-input-error"></span>
      </label>
  )
}

export default AuthInput