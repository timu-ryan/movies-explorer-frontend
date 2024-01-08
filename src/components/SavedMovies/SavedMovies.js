import React, { useEffect, useState, useContext } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import films from '../../utils/films';

import { AppContext } from '../../contexts/AppContext';
import { getSavedMovies, removeFromFavourites } from '../../utils/MainApi';

const SavedMovies = () => {
  // const [savedMovies, setSavedMovies] = useState([]);

  // useEffect(() => {
  //   getSavedMovies()
  //     .then(movies => {
  //       console.log(movies)
  //       setSavedMovies(movies)
  //     })
  // }, [])

  const context = useContext(AppContext);
  const { savedMovieList } = context;


  
  // TODO: сделать запрос к базе данных 
  function handleSubmit(evt) {
    evt.preventDefault();
    // removeFromFavourites('6595ec51af832917c78a1554')
    //   .then(() => console.log(savedMovies))
  }

  
  return (
    <div>
      <SearchForm handleSubmit={handleSubmit}/>
      <MoviesCardList films={savedMovieList} isSavedCards={true} />
    </div>
  )
}

export default SavedMovies