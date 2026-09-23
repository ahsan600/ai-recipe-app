import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Search, Clock, Bookmark } from 'lucide-react-native';
import { Recipe } from '../types/recipe';
import { getSavedRecipes } from '../storage/savedRecipesStorage';

const CATEGORIES = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Desserts', 'Snacks', 'Healthy', 'Vegan'];

export default function SavedRecipesScreen() {
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const loadRecipes = async () => {
        const recipes = await getSavedRecipes();
        setSavedRecipes(recipes);
        setLoading(false);
      };
      loadRecipes();
    }, [])
  );

  const filteredRecipes = savedRecipes.filter((recipe: Recipe) => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || recipe.category.toLowerCase() === activeCategory.toLowerCase() || (recipe.tags && recipe.tags.includes(activeCategory));
    
    return matchesSearch && matchesCategory;
  });

  return (
    <View className="flex-1 bg-background">
      <View className="p-6 pt-12 pb-4 bg-white">
        <Text className="text-3xl font-bold text-textPrimary mb-4">Saved Recipes</Text>
        
        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-100 rounded-2xl px-4 py-3 mb-4">
          <Search color="#A0AEC0" size={20} className="mr-2" />
          <TextInput 
            className="flex-1 text-textPrimary text-base"
            placeholder="Search saved recipes..."
            placeholderTextColor="#A0AEC0"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Categories */}
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pb-2">
            {CATEGORIES.map((cat) => (
              <TouchableOpacity 
                key={cat}
                onPress={() => setActiveCategory(cat)}
                className={`mr-3 px-4 py-2 rounded-full border ${activeCategory === cat ? 'bg-primary border-primary' : 'bg-white border-gray-200'}`}
              >
                <Text className={activeCategory === cat ? 'text-white font-medium' : 'text-textPrimary'}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 pt-4">
        {!loading && savedRecipes.length === 0 ? (
          <View className="items-center justify-center mt-20">
            <View className="bg-gray-100 p-6 rounded-full mb-4">
              <Bookmark color="#A0AEC0" size={48} />
            </View>
            <Text className="text-textPrimary text-xl font-bold mb-2">No saved recipes yet</Text>
            <Text className="text-gray-500 text-center mb-6">
              When you find a recipe you like, tap the bookmark icon to save it here.
            </Text>
            <TouchableOpacity 
              className="bg-primary px-8 py-4 rounded-xl"
              onPress={() => navigation.navigate('Explore')}
            >
              <Text className="text-white font-bold">Explore Recipes</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="flex-row flex-wrap justify-between pb-10">
            {filteredRecipes.map((recipe: Recipe) => (
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
                  <Text className="text-gray-400 text-xs mb-2">{recipe.category || 'AI Generated'}</Text>
                  <View className="flex-row items-center">
                    <Clock color="#A0AEC0" size={14} className="mr-1" />
                    <Text className="text-gray-500 text-xs">{recipe.prepTime + recipe.cookTime} mins • {recipe.difficulty}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
            
            {filteredRecipes.length === 0 && savedRecipes.length > 0 && (
              <View className="w-full py-10 items-center justify-center">
                <Text className="text-gray-400 text-lg">No matches found for your search.</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
