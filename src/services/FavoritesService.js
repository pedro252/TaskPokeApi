class FavoritesService {
  getFavorites() {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  }

  addFavorite(pokemon) {
    const favorites = this.getFavorites();
    if (!favorites.some(fav => fav.id === pokemon.id)) {
      favorites.push(pokemon);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }

  removeFavorite(id) {
    const favorites = this.getFavorites().filter(fav => fav.id !== id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  isFavorite(id) {
    return this.getFavorites().some(fav => fav.id === id);
  }
}

export default FavoritesService; 