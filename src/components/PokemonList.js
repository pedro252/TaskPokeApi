import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PokemonList({ pokemonService, favoritesService }) {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const limit = 20;

  useEffect(() => {
    setLoading(true);
    pokemonService.fetchPokemons(page, limit)
      .then(({ results, count }) => {
        setPokemons(results);
        setTotalPages(Math.ceil(count / limit));
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching pokemons:', error);
        setLoading(false);
      });
  }, [page]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Pokémon List</h1>
      <Link 
        to="/favorites" 
        className="mb-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        View Favorites
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemons.map(pokemon => (
          <div 
            key={pokemon.id} 
            className="border rounded-lg p-4 text-center hover:shadow-lg transition-shadow"
          >
            <Link to={`/pokemon/${pokemon.id}`}>
              <img 
                src={pokemon.sprites.front_default} 
                alt={pokemon.name} 
                className="mx-auto w-24 h-24"
              />
              <h2 className="text-xl capitalize">{pokemon.name}</h2>
            </Link>
            <button
              onClick={() => favoritesService.addFavorite(pokemon)}
              className={`mt-2 px-2 py-1 rounded transition-colors ${
                favoritesService.isFavorite(pokemon.id)
                  ? 'bg-yellow-500 text-black'
                  : 'bg-yellow-400 text-black hover:bg-yellow-500'
              }`}
            >
              {favoritesService.isFavorite(pokemon.id) ? 'Favorited' : 'Add to Favorites'}
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4 gap-2">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-400 transition-colors"
        >
          Previous
        </button>
        <span className="self-center">Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage(p => p + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-400 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PokemonList; 