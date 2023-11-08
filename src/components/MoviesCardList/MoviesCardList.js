import React from 'react';
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({ films, isSavedCards }) => {
  return (
    <div className='card-container'>
      <div className='card-container__list'>
        {films.map(film => (
          <MoviesCard 
            key={film.title}
            title={film.title} 
            duration={film.duration} 
            imagePath={film.imagePath} 
            isSavedCards={isSavedCards}
          />
        ))}
      </div>
      {/* <button className='card-container__button'>Ещё</button> */}
    </div>
  )
}

export default MoviesCardList