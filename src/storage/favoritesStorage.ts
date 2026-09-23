import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@favorite_recipes';

export const getFavorites = async (): Promise<string[]> => {
  try {
    const data = await AsyncStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

export const toggleFavorite = async (recipeId: string): Promise<boolean> => {
  try {
    let currentFavorites = await getFavorites();
    const isFavorited = currentFavorites.includes(recipeId);
    
    if (isFavorited) {
      currentFavorites = currentFavorites.filter((id) => id !== recipeId);
    } else {
      currentFavorites = [recipeId, ...currentFavorites];
    }
    
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(currentFavorites));
    return !isFavorited;
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return false;
  }
};

export const isFavorite = async (recipeId: string): Promise<boolean> => {
  const favorites = await getFavorites();
  return favorites.includes(recipeId);
};
