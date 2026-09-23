import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ChevronLeft, Heart, Clock } from 'lucide-react-native';
import { Recipe } from '../types/recipe';
import { getFavorites } from '../storage/favoritesStorage';
import recipesData from '../data/recipes.json';

export default function FavoritesScreen() {
  const navigation = useNavigation<any>();
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const loadFavorites = async () => {
        const favoriteIds = await getFavorites();
        // For simplicity, we assume favorites are mostly built-in.
        // In a real app, AI generated favorites would also be stored with full recipe data.
        const favoriteRecipes = recipesData.filter(r => favoriteIds.includes(r.id));
        setFavorites(favoriteRecipes);
        setLoading(false);
      };
      loadFavorites();
    }, [])
  );

  return (
    <View className="flex-1 bg-background">
      <View className="flex-row items-center p-6 pt-12 bg-white border-b border-gray-100">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <ChevronLeft color="#1F2933" size={28} />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-textPrimary">Favorites</Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        {!loading && favorites.length === 0 ? (
          <View className="items-center justify-center mt-20">
            <View className="bg-red-50 p-6 rounded-full mb-4">
              <Heart color="#EF4444" size={48} />
            </View>
            <Text className="text-textPrimary text-xl font-bold mb-2">No favorites yet</Text>
            <Text className="text-gray-500 text-center mb-6">
              Tap the heart icon on any recipe to add it to your favorites.
            </Text>
            <TouchableOpacity 
              className="bg-primary px-8 py-4 rounded-xl"
              onPress={() => navigation.navigate('Explore')}
            >
              <Text className="text-white font-bold">Find Recipes</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="flex-row flex-wrap justify-between pb-10">
            {favorites.map((recipe: Recipe) => (
              <TouchableOpacity 
                key={recipe.id}
                className="w-[48%] bg-white rounded-2xl mb-4 overflow-hidden shadow-sm border border-gray-100"
                onPress={() => navigation.navigate('RecipeDetails', { recipe })}
              >
                <Image 
                  source={{ uri: recipe.image }} 
                  className="w-full h-32 bg-gray-200"
                  resizeMode="cover"
                />
                <View className="p-3">
                  <Text className="text-textPrimary font-bold text-base mb-1" numberOfLines={2}>
                    {recipe.title}
                  </Text>
                  <View className="flex-row items-center mt-1">
                    <Clock color="#A0AEC0" size={14} className="mr-1" />
                    <Text className="text-gray-500 text-xs">{recipe.prepTime + recipe.cookTime} mins</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
