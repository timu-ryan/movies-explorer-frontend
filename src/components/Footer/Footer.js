import React from 'react';
import './Footer.css'

const Footer = () => {
  return (
    <footer className='footer'>
      <p className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__info'>
        <span className='footer__year'>© 2020</span>
        <ul className='footer__links'>
          <li className='footer__link-item'>
            <a 
              href='https://practicum.yandex.ru/' 
              target='_blank'
              rel="noreferrer"
              className='footer__link'
            >Яндекс.Практикум</a>
          </li>
          <li className='footer__link-item'>
            <a 
              href='https://github.com/timu-ryan' 
              target='_blank'
              rel="noreferrer"
              className='footer__link'
            >Github</a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer