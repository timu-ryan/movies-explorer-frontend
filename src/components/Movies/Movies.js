import React from 'react'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import films from '../../utils/films'
import './Movies.css'

const Movies = () => {

  function handleSubmit(evt) {
    evt.preventDefault();
  }

  return (
    <div className='movies'>
      <SearchForm handleSubmit={handleSubmit}/>
      <MoviesCardList films={films} isSavedCards={false} />
      <button className='movies__button'>Ещё</button>
    </div>
  )
}

export default Movies