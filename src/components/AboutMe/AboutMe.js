import React from 'react';
import Portfolio from '../Portfolio/Portfolio';
import portfolioImagePath from '../../images/portfolio_image.png';
import './AboutMe.css'

const AboutMe = () => {
  return (
    <div id='about-me' className='about-me'>
      <h2 className='about-me__header'>Студент</h2>
      <div className='about-me__content'>
        <div>
          <h3 className='about-me__name'>Тимур</h3>
          <p className='about-me__description'>Фронтенд-разработчик, 20 лет</p>
          <p className='about-me__story'>
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a 
            href='https://github.com/timu-ryan' 
            target="_blank" 
            rel="noreferrer" 
            className='about-me__link'
          >Github</a>
        </div>
        <img alt='моя фотография' src={portfolioImagePath} className='about-me__image' />
      </div>
      <Portfolio />
    </div>
  )
}

export default AboutMe;