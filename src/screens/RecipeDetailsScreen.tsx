import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Share } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeft, Bookmark, Heart, Clock, Users, Flame, Share2, CheckCircle2 } from 'lucide-react-native';
import { Recipe } from '../types/recipe';
import { saveRecipe, removeSavedRecipe, isRecipeSaved } from '../storage/savedRecipesStorage';
import { toggleFavorite, isFavorite } from '../storage/favoritesStorage';

export default function RecipeDetailsScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { recipe, isGenerated } = route.params as { recipe: Recipe, isGenerated?: boolean };

  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions' | 'tips'>('ingredients');
  const [saved, setSaved] = useState(false);
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      const isS = await isRecipeSaved(recipe.id);
      const isF = await isFavorite(recipe.id);
      setSaved(isS);
      setFavorited(isF);
    };
    checkStatus();
  }, [recipe.id]);

  const handleSave = async () => {
    if (saved) {
      await removeSavedRecipe(recipe.id);
      setSaved(false);
    } else {
      await saveRecipe(recipe);
      setSaved(true);
    }
  };

  const handleFavorite = async () => {
    const newStatus = await toggleFavorite(recipe.id);
    setFavorited(newStatus);
  };

  const onShare = async () => {
    try {
      await Share.share({
        message: `Check out this amazing recipe: ${recipe.title}!\n\n${recipe.description}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1" bounces={false}>
        {/* Header Image */}
        <View className="relative">
          <Image 
            source={{ uri: recipe.image }} 
            className="w-full h-80 bg-gray-200"
            resizeMode="cover"
          />
          <View className="absolute top-12 left-0 right-0 px-6 flex-row justify-between items-center z-10">
            <TouchableOpacity 
              className="bg-white/80 p-2 rounded-full"
              onPress={() => navigation.goBack()}
            >
              <ChevronLeft color="#1F2933" size={28} />
            </TouchableOpacity>
            
            <View className="flex-row">
              <TouchableOpacity 
                className="bg-white/80 p-3 rounded-full mr-2"
                onPress={handleFavorite}
              >
                <Heart color={favorited ? "#EF4444" : "#1F2933"} fill={favorited ? "#EF4444" : "none"} size={24} />
              </TouchableOpacity>
              <TouchableOpacity 
                className="bg-white/80 p-3 rounded-full"
                onPress={onShare}
              >
                <Share2 color="#1F2933" size={24} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Content */}
        <View className="bg-white -mt-8 rounded-t-3xl p-6">
          {isGenerated && (
            <View className="bg-primary/10 self-start px-3 py-1 rounded-full mb-3 flex-row items-center">
              <Sparkles color="#FF7A00" size={14} className="mr-1" />
              <Text className="text-primary font-bold text-xs">AI Generated</Text>
            </View>
          )}
          
          <Text className="text-3xl font-bold text-textPrimary mb-2">{recipe.title}</Text>
          <Text className="text-gray-500 text-base mb-6 leading-relaxed">{recipe.description}</Text>

          {/* Metadata Cards */}
          <View className="flex-row justify-between mb-6">
            <View className="items-center flex-1">
              <Clock color="#FF7A00" size={24} className="mb-1" />
              <Text className="text-textPrimary font-bold">{recipe.prepTime + recipe.cookTime} min</Text>
              <Text className="text-gray-400 text-xs">Total Time</Text>
            </View>
            <View className="items-center flex-1 border-l border-gray-200">
              <Flame color="#FF7A00" size={24} className="mb-1" />
              <Text className="text-textPrimary font-bold">{recipe.difficulty}</Text>
              <Text className="text-gray-400 text-xs">Difficulty</Text>
            </View>
            <View className="items-center flex-1 border-l border-gray-200">
              <Users color="#FF7A00" size={24} className="mb-1" />
              <Text className="text-textPrimary font-bold">{recipe.servings}</Text>
              <Text className="text-gray-400 text-xs">Servings</Text>
            </View>
            {recipe.calories && (
              <View className="items-center flex-1 border-l border-gray-200">
                <Text className="text-primary text-xl font-bold mb-0.5 mt-0.5">🔥</Text>
                <Text className="text-textPrimary font-bold">{recipe.calories}</Text>
                <Text className="text-gray-400 text-xs">Calories</Text>
              </View>
            )}
          </View>

          {/* Action Button */}
          <TouchableOpacity 
            className={`w-full py-4 rounded-xl flex-row justify-center items-center mb-8 ${saved ? 'bg-secondary/10' : 'bg-primary'}`}
            onPress={handleSave}
          >
            <Bookmark color={saved ? "#4CAF50" : "white"} fill={saved ? "#4CAF50" : "none"} size={20} className="mr-2" />
            <Text className={`font-bold text-lg ${saved ? 'text-secondary' : 'text-white'}`}>
              {saved ? 'Saved to Recipe Book' : 'Save Recipe'}
            </Text>
          </TouchableOpacity>

          {/* Tabs */}
          <View className="flex-row border-b border-gray-200 mb-6">
            <TouchableOpacity 
              className={`flex-1 pb-3 items-center ${activeTab === 'ingredients' ? 'border-b-2 border-primary' : ''}`}
              onPress={() => setActiveTab('ingredients')}
            >
              <Text className={`font-bold ${activeTab === 'ingredients' ? 'text-primary' : 'text-gray-400'}`}>Ingredients</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className={`flex-1 pb-3 items-center ${activeTab === 'instructions' ? 'border-b-2 border-primary' : ''}`}
              onPress={() => setActiveTab('instructions')}
            >
              <Text className={`font-bold ${activeTab === 'instructions' ? 'text-primary' : 'text-gray-400'}`}>Instructions</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className={`flex-1 pb-3 items-center ${activeTab === 'tips' ? 'border-b-2 border-primary' : ''}`}
              onPress={() => setActiveTab('tips')}
            >
              <Text className={`font-bold ${activeTab === 'tips' ? 'text-primary' : 'text-gray-400'}`}>Tips</Text>
            </TouchableOpacity>
          </View>

          {/* Tab Content */}
          <View className="pb-10">
            {activeTab === 'ingredients' && (
              <View>
                {recipe.ingredients.map((ing, idx) => (
                  <View key={idx} className="flex-row items-center justify-between py-3 border-b border-gray-100">
                    <View className="flex-row items-center flex-1">
                      <CheckCircle2 color="#4CAF50" size={20} className="mr-3" />
                      <Text className="text-textPrimary text-base flex-1">{ing.name}</Text>
                    </View>
                    <Text className="text-gray-500 font-medium">{ing.amount}</Text>
                  </View>
                ))}
              </View>
            )}

            {activeTab === 'instructions' && (
              <View>
                {recipe.instructions.map((inst, idx) => (
                  <View key={idx} className="flex-row mb-6">
                    <View className="bg-primary/10 w-8 h-8 rounded-full items-center justify-center mr-4 mt-1">
                      <Text className="text-primary font-bold">{inst.step}</Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-textPrimary font-bold text-lg mb-1">{inst.title}</Text>
                      <Text className="text-gray-600 leading-relaxed text-base">{inst.description}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {activeTab === 'tips' && (
              <View>
                {recipe.tips && recipe.tips.length > 0 ? (
                  recipe.tips.map((tip, idx) => (
                    <View key={idx} className="flex-row items-start mb-4 bg-yellow-50 p-4 rounded-xl">
                      <Sparkles color="#F59E0B" size={20} className="mr-3 mt-0.5" />
                      <Text className="text-gray-700 leading-relaxed flex-1">{tip}</Text>
                    </View>
                  ))
                ) : (
                  <Text className="text-gray-500 text-center italic">No tips provided for this recipe.</Text>
                )}
              </View>
            )}
          </View>

        </View>
      </ScrollView>
    </View>
  );
}

import { Sparkles } from 'lucide-react-native';
