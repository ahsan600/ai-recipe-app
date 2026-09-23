import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChefHat, Sparkles, Clock, Star, Flame } from 'lucide-react-native';
import { useNetwork } from '../hooks/useNetwork';
import recipesData from '../data/recipes.json';
import { Recipe } from '../types/recipe';

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const isConnected = useNetwork();

  // Get some popular recipes (first 3)
  const popularRecipes: Recipe[] = recipesData.slice(0, 3);

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-6 pt-12">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-primary text-xl font-medium mb-1">Good Morning ☀️</Text>
          <Text className="text-textPrimary text-3xl font-bold">What would you like to cook today?</Text>
        </View>

        {/* AI Card */}
        <TouchableOpacity 
          className="bg-primary rounded-3xl p-6 mb-8 shadow-sm"
          onPress={() => navigation.navigate('GenerateRecipe')}
        >
          <View className="flex-row justify-between items-start mb-4">
            <View className="flex-1 pr-4">
              <Text className="text-white text-2xl font-bold mb-2 leading-tight">
                Let AI Create Your Perfect Recipe
              </Text>
              <Text className="text-white/80 text-base mb-6">
                Describe what you want to eat and we'll create a recipe for you instantly!
              </Text>
            </View>
            <View className="bg-white/20 p-3 rounded-2xl">
              <Sparkles color="white" size={32} />
            </View>
          </View>
          
          <View className="bg-white rounded-2xl py-4 px-6 flex-row justify-center items-center">
            <ChefHat color="#FF7A00" size={24} className="mr-2" />
            <Text className="text-primary font-bold text-lg">Generate Recipe</Text>
          </View>

          {!isConnected && (
            <View className="mt-4 bg-white/20 p-3 rounded-xl">
              <Text className="text-white text-sm text-center">
                Internet required to create AI recipes.
              </Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Quick Actions */}
        <View className="flex-row justify-between mb-8">
          <TouchableOpacity 
            className="flex-1 bg-white p-4 rounded-2xl mr-2 items-center shadow-sm"
            onPress={() => navigation.navigate('GenerateRecipe')}
          >
            <View className="bg-primary/10 p-3 rounded-full mb-2">
              <Sparkles color="#FF7A00" size={24} />
            </View>
            <Text className="text-textPrimary font-semibold">Generate</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="flex-1 bg-white p-4 rounded-2xl mx-1 items-center shadow-sm"
            onPress={() => navigation.navigate('Saved')}
          >
            <View className="bg-secondary/10 p-3 rounded-full mb-2">
              <Star color="#4CAF50" size={24} />
            </View>
            <Text className="text-textPrimary font-semibold">Saved</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="flex-1 bg-white p-4 rounded-2xl ml-2 items-center shadow-sm"
            onPress={() => navigation.navigate('Explore')}
          >
            <View className="bg-blue-100 p-3 rounded-full mb-2">
              <Flame color="#3B82F6" size={24} />
            </View>
            <Text className="text-textPrimary font-semibold">Popular</Text>
          </TouchableOpacity>
        </View>

        {/* Popular Recipes Section */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-textPrimary text-xl font-bold">Popular Recipes</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
            <Text className="text-primary font-medium">View All →</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row flex-wrap justify-between">
          {popularRecipes.map((recipe) => (
            <TouchableOpacity 
              key={recipe.id}
              className="w-[48%] bg-white rounded-2xl mb-4 overflow-hidden shadow-sm"
              onPress={() => navigation.navigate('RecipeDetails', { recipe })}
            >
              <Image 
                source={{ uri: recipe.image }} 
                className="w-full h-32 bg-gray-200"
                resizeMode="cover"
              />
              <View className="p-3">
                <Text className="text-textPrimary font-bold text-base mb-1" numberOfLines={1}>
                  {recipe.title}
                </Text>
                <View className="flex-row items-center">
                  <Clock color="#A0AEC0" size={14} className="mr-1" />
                  <Text className="text-gray-500 text-xs">{recipe.prepTime + recipe.cookTime} mins • {recipe.difficulty}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </View>
    </ScrollView>
  );
}
