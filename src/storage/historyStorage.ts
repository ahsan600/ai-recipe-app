import AsyncStorage from '@react-native-async-storage/async-storage';
import { Recipe } from '../types/recipe';

const HISTORY_KEY = '@recipe_history';

export interface HistoryItem {
  recipe: Recipe;
  timestamp: number;
}

export const getHistory = async (): Promise<HistoryItem[]> => {
  try {
    const data = await AsyncStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting recipe history:', error);
    return [];
  }
};

export const addToHistory = async (recipe: Recipe): Promise<void> => {
  try {
    const currentHistory = await getHistory();
    const newItem: HistoryItem = { recipe, timestamp: Date.now() };
    const updatedHistory = [newItem, ...currentHistory].slice(0, 50); // Keep max 50 items
    
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error('Error adding to history:', error);
  }
};

export const clearHistory = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('Error clearing history:', error);
  }
};
