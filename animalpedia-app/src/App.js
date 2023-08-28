import React from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';


import HomePage from './pages/HomePage'
import PageNotFound from './pages/PageNotFound';
import FavoritesPage from './pages/FavoritesPage'
import MapPage from './pages/MapPage'
import AboutPage from './pages/AboutPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
    </Router>
  );
}

export default App;
