import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import films from '../../utils/films'

const SavedMovies = () => {

  function handleSubmit(evt) {
    evt.preventDefault();
  }

  const savedFilms = films.slice(0, 3)
  
  return (
    <div>
      <SearchForm handleSubmit={handleSubmit}/>
      <MoviesCardList films={savedFilms} isSavedCards={true} />
    </div>
  )
}

export default SavedMovies