import { Routes, Route, useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';

import Navigation from '../Navigation/Navigation';

import './App.css';
import Login from '../Login/Login';
import Register from '../Register/Register';
import { useEffect, useState } from 'react';

import { AppContext } from '../../contexts/AppContext';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';
import { checkToken, getSavedMovies } from '../../utils/MainApi';

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
  });
  const [savedMovieList, setSavedMovieList] = useState([]);
  const [isVisiblePreloader, setIsVisiblePreloader] = useState(false); 

  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  function handleCloseNavigationClick() {
    setIsNavigationOpen(false);
  }
  function handleOpenNavigationClick() {
    setIsNavigationOpen(true);
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
      checkToken(jwt)
        .then(res => {
          if (res) {
            const userData = { name: res.name, email: res.email };
            setIsLoggedIn(true);
            setUserData(userData);
            navigate('/', { replace: true });
          }
        })
    }
  }

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth)
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    }
  })

  useEffect(() => {
    tokenCheck();
    if(isLoggedIn) {
      getSavedMovies()
      .then(movies => {
        setSavedMovieList(movies)
      })
    }
  }, [isLoggedIn])

  return (
    <AppContext.Provider value={{ 
      isLoggedIn, 
      userData, 
      savedMovieList,
      isVisiblePreloader,
      setIsLoggedIn, 
      setUserData,
      setSavedMovieList,
      setIsVisiblePreloader,
    }}>
    <div className="App">
      <Routes>
        <Route path="/" element={
          <>
            <Header 
              handleNavigationClick={handleOpenNavigationClick}
            />
            <main>
              <Navigation 
                isOpen={isNavigationOpen}
                handleCloseClick={handleCloseNavigationClick}
              />
              <Main />
            </main>
            <Footer />
          </>
        } />
        <Route path="/movies" element={
          <>
            <Header 
              handleNavigationClick={handleOpenNavigationClick}
            />
            <main>
              <Navigation 
                isOpen={isNavigationOpen}
                handleCloseClick={handleCloseNavigationClick}
              />
              {/* <Movies /> */}
              <ProtectedRouteElement element={Movies} windowWidth={windowWidth} />
            </main>
            <Footer />
          </>
        } />
        <Route path="/saved-movies" element={
          <>
            <Header 
              handleNavigationClick={handleOpenNavigationClick}
            />
            <main>
              <Navigation 
                isOpen={isNavigationOpen}
                handleCloseClick={handleCloseNavigationClick}
              />
              <ProtectedRouteElement element={SavedMovies} windowWidth={windowWidth} />
              {/* <SavedMovies /> */}
            </main>
            <Footer />
          </>
        } />
        <Route path="/profile" element={
          <>
            <Header 
              handleNavigationClick={handleOpenNavigationClick}
            />
            <main>
              <Navigation 
                isOpen={isNavigationOpen}
                handleCloseClick={handleCloseNavigationClick}
              />
              <ProtectedRouteElement element={Profile} />
              {/* <Profile /> */}
            </main>
            
          </>
        } />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
    </AppContext.Provider>
  );
}

export default App;
