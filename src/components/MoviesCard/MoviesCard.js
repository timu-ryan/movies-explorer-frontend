import React from 'react';
import './MoviesCard.css'

const MoviesCard = ({title, duration, imagePath, isSavedCards }) => {
  return (
    <div className='card '>
      <img alt={title} src={imagePath} className='card__image'/>
      <div className='card__text'>
        <h3 className='card__title'>{title}</h3>
        <p className='card__duration'>{duration}</p>
      </div>
      {
        isSavedCards
         ? <button className='card__delete-button'></button>
         : (<>
              <button className='card__save-button'>Сохранить</button>
              <div className='card__saved-icon'></div>
            </>)
      }
    </div>
  )
}

export default MoviesCard