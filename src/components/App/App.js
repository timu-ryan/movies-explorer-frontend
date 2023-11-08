import { Routes, Route } from 'react-router-dom';
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
import { useState } from 'react';


function App() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  function handleCloseNavigationClick() {
    setIsNavigationOpen(false);
  }
  function handleOpenNavigationClick() {
    setIsNavigationOpen(true);
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <>
            <Header 
              handleNavigationClick={handleOpenNavigationClick}
            />
            <Navigation 
              isOpen={isNavigationOpen}
              handleCloseClick={handleCloseNavigationClick}
            />
            <Main />
            <Footer />
          </>
        } />
        <Route path="/movies" element={
          <>
            <Header 
              handleNavigationClick={handleOpenNavigationClick}
            />
            <Navigation 
              isOpen={isNavigationOpen}
              handleCloseClick={handleCloseNavigationClick}
            />
            <Movies />
            <Footer />
          </>
        } />
        <Route path="/saved-movies" element={
          <>
            <Header 
              handleNavigationClick={handleOpenNavigationClick}
            />
            <Navigation 
              isOpen={isNavigationOpen}
              handleCloseClick={handleCloseNavigationClick}
            />
            <SavedMovies />
            <Footer />
          </>
        } />
        <Route path="/profile" element={
          <>
            <Header 
              handleNavigationClick={handleOpenNavigationClick}
            />
            <Navigation 
              isOpen={isNavigationOpen}
              handleCloseClick={handleCloseNavigationClick}
            />
            <Profile />
          </>
        } />
        <Route path="/signin" element={
          <>
            <Login />
          </>
        } />
        <Route path="/signup" element={
          <>
            <Register />
          </>
        } />
        <Route path="*" element={
          <>
            <PageNotFound />
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;
