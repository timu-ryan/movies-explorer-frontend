import React, { useState } from 'react';
import './AuthInput.css'

const AuthInput = ({ 
  name, 
  title, 
  type,
  setIsValid,
  min,
  max,
 }) => {
  
  const [value, setValue] = useState('');

  function validate(value, min, max) {
    if (value < min) {
      setIsValid(false);
    } else if (value > max) {
      setIsValid(false);
    } else {
      setIsValid(true)
    }
  }

  function handleChange(e) {
    setValue(e.target.value);
    // console.log(value)
    validate(value, min, max);
  }

  return (
      <label className="auth-input">
        <span className='auth-input__input-description'>{title}</span>
        <input
          id={`${name}-input`}
          type={type}
          name={`auth-${name}-input`}
          value={value}
          onChange={handleChange}
          required
          className="auth-input__input"
        />
        <span className="auth-input-input-error"></span>
      </label>
  )
}

export default AuthInput