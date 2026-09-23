import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Search, Clock } from 'lucide-react-native';
import recipesData from '../data/recipes.json';
import { Recipe } from '../types/recipe';

const CATEGORIES = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Desserts', 'Snacks', 'Vegetarian', 'Vegan', 'Healthy', 'Quick meals'];

export default function ExploreScreen() {
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter recipes based on search and category
  const filteredRecipes = recipesData.filter((recipe: Recipe) => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || recipe.category.toLowerCase() === activeCategory.toLowerCase() || recipe.tags.includes(activeCategory);
    
    return matchesSearch && matchesCategory;
  });

  return (
    <View className="flex-1 bg-background">
      <View className="p-6 pt-12 pb-4 bg-white">
        <Text className="text-3xl font-bold text-textPrimary mb-4">Explore Recipes</Text>
        
        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-100 rounded-2xl px-4 py-3 mb-4">
          <Search color="#A0AEC0" size={20} className="mr-2" />
          <TextInput 
            className="flex-1 text-textPrimary text-base"
            placeholder="Search recipes..."
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
        <Text className="text-gray-500 mb-4">{filteredRecipes.length} recipes found</Text>
        
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
                <Text className="text-gray-400 text-xs mb-2">{recipe.category}</Text>
                <View className="flex-row items-center">
                  <Clock color="#A0AEC0" size={14} className="mr-1" />
                  <Text className="text-gray-500 text-xs">{recipe.prepTime + recipe.cookTime} mins • {recipe.difficulty}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          
          {filteredRecipes.length === 0 && (
            <View className="w-full py-10 items-center justify-center">
              <Text className="text-gray-400 text-lg">No recipes found.</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
