import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';
import Favorites from './components/Favorites';
import PokemonService from './services/PokemonService';
import FavoritesService from './services/FavoritesService';

// Dependency Injection Container
class DIContainer {
  constructor() {
    this.dependencies = new Map();
  }
  register(key, dependency) {
    this.dependencies.set(key, dependency);
  }
  get(key) {
    return this.dependencies.get(key);
  }
}

const container = new DIContainer();
container.register('pokemonService', new PokemonService());
container.register('favoritesService', new FavoritesService());

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <PokemonList 
              pokemonService={container.get('pokemonService')} 
              favoritesService={container.get('favoritesService')} 
            />
          } 
        />
        <Route 
          path="/pokemon/:id" 
          element={
            <PokemonDetails 
              pokemonService={container.get('pokemonService')} 
              favoritesService={container.get('favoritesService')} 
            />
          } 
        />
        <Route 
          path="/favorites" 
          element={
            <Favorites 
              favoritesService={container.get('favoritesService')} 
            />
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 