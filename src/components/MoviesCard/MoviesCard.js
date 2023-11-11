import React from 'react';
import './MoviesCard.css'

const MoviesCard = ({title, duration, imagePath, isSavedCards }) => {
  return (
    <li className='card '>
      <img alt={title} src={imagePath} className='card__image'/>
      <div className='card__text'>
        <h2 className='card__title'>{title}</h2>
        <p className='card__duration'>{duration}</p>
      </div>
      {
        isSavedCards
         ? <button type='button' className='card__delete-button'></button>
         : (<>
              <button type='button' className='card__save-button'>Сохранить</button>
              <div className='card__saved-icon'></div>
            </>)
      }
    </li>
  )
}

export default MoviesCard