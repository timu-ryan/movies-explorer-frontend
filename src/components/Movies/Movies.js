import React, { useState } from 'react'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import films from '../../utils/films'
import './Movies.css'
import { getFilms } from '../../utils/MoviesApi';

const Movies = () => {
  const [movies, setMovies] = useState([])

  function handleSubmit(evt) {
    evt.preventDefault();
    getFilms()
      .then(films => setMovies(films));
    console.log(movies)
  }
  

  return (
    <div className='movies'>
      <SearchForm handleSubmit={handleSubmit}/>
      <MoviesCardList films={movies} isSavedCards={false} />
      <button type="button" className='movies__button'>Ещё</button>
    </div>
  )
}

export default Movies