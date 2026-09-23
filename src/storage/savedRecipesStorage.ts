import AsyncStorage from '@react-native-async-storage/async-storage';
import { Recipe } from '../types/recipe';

const SAVED_RECIPES_KEY = '@saved_recipes';

export const getSavedRecipes = async (): Promise<Recipe[]> => {
  try {
    const data = await AsyncStorage.getItem(SAVED_RECIPES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting saved recipes:', error);
    return [];
  }
};

export const saveRecipe = async (recipe: Recipe): Promise<void> => {
  try {
    const currentRecipes = await getSavedRecipes();
    if (!currentRecipes.find((r) => r.id === recipe.id)) {
      const updatedRecipes = [recipe, ...currentRecipes];
      await AsyncStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(updatedRecipes));
    }
  } catch (error) {
    console.error('Error saving recipe:', error);
  }
};

export const removeSavedRecipe = async (recipeId: string): Promise<void> => {
  try {
    const currentRecipes = await getSavedRecipes();
    const updatedRecipes = currentRecipes.filter((r) => r.id !== recipeId);
    await AsyncStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(updatedRecipes));
  } catch (error) {
    console.error('Error removing saved recipe:', error);
  }
};

export const isRecipeSaved = async (recipeId: string): Promise<boolean> => {
  const recipes = await getSavedRecipes();
  return recipes.some((r) => r.id === recipeId);
};
