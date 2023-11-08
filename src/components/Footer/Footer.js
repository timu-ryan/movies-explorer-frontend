import React from 'react';
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer'>
      <p className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__info'>
        <span className='footer__year'>© 2020</span>
        <div className='footer__links'>
          <a 
            href='https://practicum.yandex.ru/' 
            target='_blank'
            rel="noreferrer"
            className='footer__link'>Яндекс.Практикум</a>
          <a 
            href='https://github.com/timu-ryan' 
            target='_blank'
            rel="noreferrer"
            className='footer__link'
          >Github</a>
        </div>
      </div>
    </div>
  )
}

export default Footer