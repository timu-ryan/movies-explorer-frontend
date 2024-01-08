import React, { useState } from 'react'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import films from '../../utils/films'
import './Movies.css'
import { getFilms } from '../../utils/MoviesApi';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isShort, setIsShort] = useState(false);

  function handleSubmit(evt) {
    evt.preventDefault();
    getFilms()
      .then(films => setMovies(films));
    console.log(movies)
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleCheckboxChange = (e) => {
    setIsShort(e.target.checked)
  }

  return (
    <div className='movies'>
      <SearchForm 
        handleSubmit={handleSubmit} 
        inputValue={inputValue} 
        onInputChange={handleInputChange}
        isShort={isShort}
        onCheckboxChange={handleCheckboxChange}  
      />
      <MoviesCardList films={movies} isSavedCards={false} />
      <button type="button" className='movies__button'>Ещё</button>
    </div>
  )
}

export default Movies