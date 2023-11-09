import React from 'react';
import './Portfolio.css'

const Portfolio = () => {
  const links = {
    "Статичный сайт": "https://github.com/timu-ryan/how-to-study",
    "Адаптивный сайт": "https://github.com/timu-ryan/russian-travel",
    "Одностраничное приложение": "https://github.com/timu-ryan/react-mesto-api-full-gha",
  };
  return (
    <div className='portfolio'>
      <h3 className='portfolio__header'>Портфолио</h3>
      <ul className='portfolio__list'>
        {
          Object.keys(links).map(key => (
            <li 
              className='portfolio__list-item'
              key={key}
            >
              <a 
                href={links[key]} 
                target="_blank" 
                rel="noreferrer"
                className='portfolio__link'
              >
                {key}
                <span className='portfolio__link-arrow'>↗</span>
              </a>
            </li>
          ))
        }
      </ul>
      
    </div>
  );
}

export default Portfolio
