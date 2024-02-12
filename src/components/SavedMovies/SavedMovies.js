import React, { useEffect, useState, useContext } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
// import films from '../../utils/films';

import { AppContext } from '../../contexts/AppContext';
import { getSavedMovies, removeFromFavourites } from '../../utils/MainApi';

const SavedMovies = ({ windowWidth }) => {
  // const [savedMovies, setSavedMovies] = useState([]);
  const context = useContext(AppContext);
  const { savedMovieList, setSavedMovieList } = context; 
  const [visibleFilms, setVisibleFilms] = useState(savedMovieList);
  const [inputValue, setInputValue] = useState('');
  const [isShort, setIsShort] = useState(false);
  // const [isShort, setIsShort] = useState(localStorage.getItem(false));
  //const [visibleMovies, setVisibleMovies] = useState(JSON.parse(localStorage.getItem("foundFilms")).slice(0, addButtonParams.first) || []);
  const [isMoviesNotFound, setIsMoviesNotFound] = useState(false);
  const [isEmptySearch, setIsEmptySearch] = useState(false)
  const [isErrorSearch, setIsErrorSearch] = useState(false)
  
  function handleSubmit(evt) {
    evt.preventDefault();
    setVisibleFilms([])
    if(!inputValue) {
      setVisibleFilms(savedMovieList)
      setIsEmptySearch(true)
      setIsMoviesNotFound(false)
      setIsErrorSearch(false)
    } else {
      const foundFilms = savedMovieList.filter(film => {
        // console.log(film)
        if (film.nameRU.toLowerCase().search(inputValue.toLowerCase()) === -1
          && film.nameEN.toLowerCase().search(inputValue.toLowerCase()) === -1
        ) {
          return false;
        }
        if (isShort && film.duration > 40) {
          return false
        }
        return true;
      });
      if (foundFilms.length === 0) {
        setIsMoviesNotFound(true)
        setVisibleFilms([])
      } else {
        setIsMoviesNotFound(false)
      }
      setIsEmptySearch(false)
      setIsErrorSearch(false)
      setVisibleFilms(foundFilms)
    }
    // console.log(savedMovieList)
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleCheckboxChange = (e) => {
    setIsShort(e.target.checked)
  }
  
  return (
    <div>
      <SearchForm
        handleSubmit={handleSubmit} 
        inputValue={inputValue} 
        onInputChange={handleInputChange}
        isShort={isShort}
        onCheckboxChange={handleCheckboxChange}  
      />
      <MoviesCardList films={visibleFilms} isSavedCards={true} />
      {isEmptySearch && <span className='movies__not-found'>Нужно ввести ключевое слово</span>}
      {isErrorSearch && <span className='movies__not-found'>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</span>}
      {isMoviesNotFound && <span className='movies__not-found'>Ничего не найдено</span>}
    </div>
  )
}

export default SavedMovies