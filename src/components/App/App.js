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
import { checkToken } from '../../utils/MainApi';

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
  });

  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
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
    tokenCheck();
  }, [isLoggedIn])

  return (
    <AppContext.Provider value={{ isLoggedIn, userData, setIsLoggedIn, setUserData }}>
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
              <ProtectedRouteElement element={Movies} />
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
              <ProtectedRouteElement element={SavedMovies} />
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
