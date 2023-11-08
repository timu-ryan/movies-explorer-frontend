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
      {
        Object.keys(links).map(key => (
          <a 
            href={links[key]} 
            target="_blank" 
            rel="noreferrer"
            key={key}
            className='portfolio__link'
          >
            {key}
            <span className='portfolio__link-arrow'>↗</span>
          </a>
        ))
      }
    </div>
  );
}

export default Portfolio
