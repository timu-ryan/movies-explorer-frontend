import React, { useContext, useEffect, useState } from 'react'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
// import films from '../../utils/films'
import './Movies.css'
import { getFilms } from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader'
import { AppContext } from '../../contexts/AppContext';

const Movies = ({ windowWidth }) => {
  const addButtonParams = { // >769px
    first: 12,
    additional: 6,
  }
  if (windowWidth < 770) {
    addButtonParams.first = 8;
    addButtonParams.additional = 4;
  }
  if (windowWidth < 450) {
    addButtonParams.first = 5;
    addButtonParams.additional = 2;
  }
  let foundFilms = []
  if (JSON.parse(localStorage.getItem("foundFilms"))) {
    foundFilms = JSON.parse(localStorage.getItem("foundFilms")).slice(0, addButtonParams.first) 
  }

  let initialIsShort = false;
  if (localStorage.getItem('isShort') === 'true') {
    initialIsShort = true;
  }

  const [movies, setMovies] = useState(JSON.parse(localStorage.getItem("foundFilms")) || []);
  // const [movies, setMovies] = useState([]]);
  const [inputValue, setInputValue] = useState(localStorage.getItem('inputValue') || '');
  const [isShort, setIsShort] = useState(initialIsShort || false);
  // const [isShort, setIsShort] = useState(localStorage.getItem(false));
  const [visibleMovies, setVisibleMovies] = useState(foundFilms);
  const [isMoviesNotFound, setIsMoviesNotFound] = useState(false);
  const [isEmptySearch, setIsEmptySearch] = useState(false);
  const [isErrorSearch, setIsErrorSearch] = useState(false);

  // const [visibleFilmsNumber, setVisibleFilmsNumber] = useState(0)
  const [visibleFilmsNumber, setVisibleFilmsNumber] = useState(visibleMovies.length)

  const { isVisiblePreloader, setIsVisiblePreloader } = useContext(AppContext);

  // useEffect(() => {
  //   if(JSON.parse(localStorage.getItem("foundFilms")) !== null) {
  //     // setMovies(JSON.parse(localStorage.getItem("foundFilms")))
  //     // setVisibleFilmsNumber(prev => addButtonParams.first);
  //     // setVisibleMovies(movies.slice(0, addButtonParams.first))
  //     // setMovies(JSON.parse(localStorage.getItem("foundFilms")))
  //     console.log(visibleMovies)
  //     // setIsShort(localStorage.getItem('isShort'))
  //     // setInputValue(localStorage.getItem('inputValue'))
  //   }
  // }, [])

  useEffect(() => {
    setVisibleMovies(movies.slice(0, visibleFilmsNumber))
  }, [movies, visibleFilmsNumber])

  function handleSubmit(evt) {
    evt.preventDefault();
    setIsVisiblePreloader(true);
    setVisibleMovies([])
    localStorage.setItem('inputValue', inputValue);
    //localStorage.setItem('isShort', isShort);
    getFilms()
      .then(films => {
        setVisibleFilmsNumber(prev => addButtonParams.first);  // depending on the screen size
        if(!inputValue) {
          // setMovies(prev => films)
          setVisibleMovies([])
          setIsEmptySearch(true)
          setIsMoviesNotFound(false)
          setIsErrorSearch(false)
        } else {
          const foundFilms = films.filter(film => {
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
          // console.log(foundFilms) // setMovies
          if (foundFilms.length === 0) {
            setIsMoviesNotFound(true)
            setVisibleMovies([])
          } else {
            setIsMoviesNotFound(false)
          }
          setIsEmptySearch(false)
          setIsErrorSearch(false)
          setMovies(foundFilms)
          localStorage.setItem("foundFilms", JSON.stringify(foundFilms));
        }
      })
      .catch((err) => {
        console.log(err)
        setVisibleMovies([])
        setIsErrorSearch(true)
      })
      .finally(() => setIsVisiblePreloader(false))
  }

  function addVisibleFilms() {
    setVisibleFilmsNumber(prev => prev + addButtonParams.additional) // depending on screen size
    setVisibleMovies(movies.slice(0, visibleFilmsNumber)) 
  }  

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleCheckboxChange = (e) => {
    e.preventDefault();
    setIsVisiblePreloader(true);
    setIsShort((prev) => {
      localStorage.setItem('isShort', e.target.checked);
      setVisibleMovies([])
      localStorage.setItem('inputValue', inputValue);
      //localStorage.setItem('isShort', isShort);
      getFilms()
        .then(films => {
          setVisibleFilmsNumber(prev => addButtonParams.first);  // depending on the screen size
          if(!inputValue) {
            // setMovies(prev => films)
            setVisibleMovies([])
            setIsEmptySearch(true)
            setIsMoviesNotFound(false)
            setIsErrorSearch(false)
          } else {
            const foundFilms = films.filter(film => {
              if (film.nameRU.toLowerCase().search(inputValue.toLowerCase()) === -1
                && film.nameEN.toLowerCase().search(inputValue.toLowerCase()) === -1
              ) {
                return false;
              }
              if (!prev && film.duration > 40) {
                return false
              }
              return true;
            });
            // console.log(foundFilms) // setMovies
            if (foundFilms.length === 0) {
              setIsMoviesNotFound(true)
              setVisibleMovies([])
            } else {
              setIsMoviesNotFound(false)
            }
            setIsEmptySearch(false)
            setIsErrorSearch(false)
            setMovies(foundFilms)
            localStorage.setItem("foundFilms", JSON.stringify(foundFilms));
          }
        })
        .catch((err) => {
          console.log(err)
          setVisibleMovies([])
          setIsErrorSearch(true)
        })
        .finally(() => setIsVisiblePreloader(false))
        return e.target.checked;
    })
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
      <Preloader isVisible={isVisiblePreloader} />
      <MoviesCardList films={visibleMovies} isSavedCards={false} />
      {isEmptySearch && <span className='movies__not-found'>Нужно ввести ключевое слово</span>}
      {isErrorSearch && <span className='movies__not-found'>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</span>}
      {isMoviesNotFound && <span className='movies__not-found'>Ничего не найдено</span>}
      {!isVisiblePreloader 
        && !isEmptySearch
        && !isErrorSearch
        && !isMoviesNotFound 
        && visibleFilmsNumber < movies.length
        && movies.length !== 0
        && <button type="button" className='movies__button' onClick={addVisibleFilms}>Ещё</button>}
    </div>
  )
}

export default Movies