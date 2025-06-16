import axios from 'axios';

class PokemonService {
  async fetchPokemons(page, limit) {
    const offset = (page - 1) * limit;
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const results = await Promise.all(
      response.data.results.map(async (pokemon) => {
        const details = await axios.get(pokemon.url);
        return details.data;
      })
    );
    return { results, count: response.data.count };
  }

  async fetchPokemonDetails(id) {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return response.data;
  }
}

export default PokemonService; 