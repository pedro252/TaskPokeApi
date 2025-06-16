import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PokemonDetails({ pokemonService, favoritesService }) {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    pokemonService.fetchPokemonDetails(id)
      .then(data => {
        setPokemon(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching pokemon details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="text-center p-4">
        <h2 className="text-2xl font-bold text-red-600">Pokemon not found</h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Back to List
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => navigate('/')}
        className="mb-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
      >
        Back to List
      </button>
      <div className="border rounded-lg p-6 max-w-4xl mx-auto bg-white shadow-lg">
        <h1 className="text-4xl font-bold capitalize text-center mb-6">{pokemon.name}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Main Info */}
          <div className="space-y-6">
            <div className="text-center">
              <img
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
                className="mx-auto w-64 h-64 object-contain"
              />
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Basic Info</h2>
              <ul className="space-y-2">
                <li><strong>Height:</strong> {pokemon.height / 10} m</li>
                <li><strong>Weight:</strong> {pokemon.weight / 10} kg</li>
                <li><strong>Base Experience:</strong> {pokemon.base_experience}</li>
                <li>
                  <strong>Types:</strong>{' '}
                  {pokemon.types.map(t => (
                    <span
                      key={t.type.name}
                      className="inline-block px-2 py-1 rounded-full text-sm bg-gray-200 mr-2"
                    >
                      {t.type.name}
                    </span>
                  ))}
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Additional Details */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Abilities</h2>
              <ul className="list-disc pl-5">
                {pokemon.abilities.map(ability => (
                  <li key={ability.ability.name} className="capitalize">
                    {ability.ability.name}
                    {ability.is_hidden && ' (Hidden)'}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Stats</h2>
              <div className="space-y-2">
                {pokemon.stats.map(stat => (
                  <div key={stat.stat.name} className="flex items-center">
                    <span className="w-32 capitalize">{stat.stat.name}:</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 w-12 text-right">{stat.base_stat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Sprites</h2>
              <div className="grid grid-cols-2 gap-4">
                <img src={pokemon.sprites.front_default} alt="Front" className="w-full" />
                <img src={pokemon.sprites.back_default} alt="Back" className="w-full" />
                <img src={pokemon.sprites.front_shiny} alt="Front Shiny" className="w-full" />
                <img src={pokemon.sprites.back_shiny} alt="Back Shiny" className="w-full" />
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => favoritesService.addFavorite(pokemon)}
          className={`mt-6 w-full py-2 rounded transition-colors ${
            favoritesService.isFavorite(pokemon.id)
              ? 'bg-yellow-500 text-black'
              : 'bg-yellow-400 text-black hover:bg-yellow-500'
          }`}
        >
          {favoritesService.isFavorite(pokemon.id) ? 'Favorited' : 'Add to Favorites'}
        </button>
      </div>
    </div>
  );
}

export default PokemonDetails; 