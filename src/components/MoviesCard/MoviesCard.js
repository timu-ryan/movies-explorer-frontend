import React, { useContext, useEffect, useState } from 'react';
import './MoviesCard.css';

import { AppContext } from '../../contexts/AppContext';
import { addToSavedMovies, removeFromFavourites, getSavedMovies } from '../../utils/MainApi';

//import Preloader from '../Preloader/Preloader';

const MoviesCard = ({ movie, title, duration, imagePath, isSavedCards, savedImagePath }) => {
  const context = useContext(AppContext);
  const [isFavourite, setIsFavourite] = useState(false);
  // const [clickedCard, setClickedCard] = useState({}); // для прелоадера


  const { savedMovieList, setSavedMovieList } = context;
  const { isVisiblePreloader, setIsVisiblePreloader } = context;
  useEffect(() => {
    // проверка на то, есть ли в массиве лайкнутых этот фильм
    setIsFavourite(savedMovieList.find((savedMovie) => savedMovie.movieId === movie.id || savedMovie.movieId === movie.movieId ))
    // первое для вкладки movies, второе для вкладки saved-movies
  }, [movie.id, movie.movieId, savedMovieList]);

  
  function addToFavourites() {
    setIsVisiblePreloader(true)
    // setClickedCard(movie)
    addToSavedMovies(movie)
      .then(() => {
        setIsFavourite(true);
      })
      .finally(() => {
        setIsVisiblePreloader(false)
        // setClickedCard({})
      })
  }

  function deleteFromFavourites() {
    setIsVisiblePreloader(true)
    // setClickedCard(movie)
    removeFromFavourites(movie._id)
      .then(() => {
        setIsFavourite(false)
        setSavedMovieList(savedMovieList.filter((item) => item._id !== movie._id));
      })
      .finally(() => {
        setIsVisiblePreloader(false)
        // setClickedCard({})
      })
  }

  return (
    <li className='card'>
      <a href={movie.trailerLink} target='_blank' rel="noreferrer" className='card__link'>
      {/* {Object.keys(clickedCard).length ? <Preloader isVisible={isVisiblePreloader} /> : <></>} */}
      <img alt={title} src={imagePath} className='card__image'/>
      <div className='card__text'>
        <h2 className='card__title'>{title}</h2>
        <p className='card__duration'>{duration}</p>
      </div>
      </a>
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