import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Favorites({ favoritesService }) {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setFavorites(favoritesService.getFavorites());
  }, []);

  const removeFavorite = (id) => {
    favoritesService.removeFavorite(id);
    setFavorites(favoritesService.getFavorites());
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => navigate('/')}
        className="mb-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
      >
        Back to List
      </button>
      <h1 className="text-3xl font-bold mb-4 text-center">Favorites</h1>
      
      {favorites.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-xl text-gray-600">No favorites yet.</p>
          <Link
            to="/"
            className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Browse Pokémons
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map(pokemon => (
            <div
              key={pokemon.id}
              className="border rounded-lg p-4 text-center hover:shadow-lg transition-shadow bg-white"
            >
              <Link to={`/pokemon/${pokemon.id}`}>
                <img
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className="mx-auto w-24 h-24"
                />
                <h2 className="text-xl capitalize mt-2">{pokemon.name}</h2>
              </Link>
              <button
                onClick={() => removeFavorite(pokemon.id)}
                className="mt-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites; 