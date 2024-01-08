import React, { useContext, useEffect, useState } from 'react';
import './MoviesCard.css';

import { AppContext } from '../../contexts/AppContext';
import { addToSavedMovies, removeFromFavourites, getSavedMovies } from '../../utils/MainApi';


const MoviesCard = ({ movie, title, duration, imagePath, isSavedCards, savedImagePath }) => {
  const context = useContext(AppContext);
  const [isFavourite, setIsFavourite] = useState(false);
  const { savedMovieList, setSavedMovieList } = context;
  useEffect(() => {
    // проверка на то, есть ли в массиве лайкнутых этот фильм
    setIsFavourite(savedMovieList.find((savedMovie) => savedMovie.movieId === movie.id || savedMovie.movieId === movie.movieId ))
    // первое для вкладки movies, второе для вкладки saved-movies
  }, []);

  
  function addToFavourites() {
    addToSavedMovies(movie)
      .then(() => {
        setIsFavourite(true);
      })
  }

  function deleteFromFavourites() {
    removeFromFavourites(movie._id)
      .then(() => {
        setIsFavourite(false)
        setSavedMovieList(savedMovieList.filter((item) => item._id !== movie._id));
      })
  }

  return (
    <li className='card'>
      <img alt={title} src={imagePath} className='card__image'/>
      <div className='card__text'>
        <h2 className='card__title'>{title}</h2>
        <p className='card__duration'>{duration}</p>
      </div>
      {
        isSavedCards && (<button type='button' className='card__delete-button' onClick={ deleteFromFavourites }></button>)
      }{
      !isFavourite && (<>
          <button type='button' className='card__save-button' onClick={ addToFavourites }>Сохранить</button>
          <div className='card__saved-icon'></div>
        </>)
      }
    </li>
  )
}

export default MoviesCard