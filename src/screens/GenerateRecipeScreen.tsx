import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Sparkles, ChevronLeft } from 'lucide-react-native';
import { useNetwork } from '../hooks/useNetwork';

const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'];
const DIET_TYPES = ['None', 'Vegetarian', 'Vegan', 'Keto', 'High Protein', 'Low Carb'];
const TIME_OPTIONS = ['15 min', '30 min', '60 min', 'Any'];
const SERVING_OPTIONS = ['1', '2', '4', '6+'];
const SUGGESTIONS = ['Healthy breakfast', 'Chicken curry', 'Pasta', 'Vegan dinner', 'Quick lunch', 'Dessert'];

export default function GenerateRecipeScreen() {
  const navigation = useNavigation<any>();
  const isConnected = useNetwork();
  
  const [description, setDescription] = useState('');
  const [mealType, setMealType] = useState('Dinner');
  const [diet, setDiet] = useState('None');
  const [time, setTime] = useState('30 min');
  const [servings, setServings] = useState('2');

  const handleGenerate = () => {
    if (!isConnected) {
      Alert.alert('Offline', 'Internet connection required to create a new AI recipe.');
      return;
    }
    
    if (description.trim().length < 3) {
      Alert.alert('Hold on', 'Please provide a bit more detail about what you want to cook.');
      return;
    }

    const prompt = `Recipe request: ${description}. Preferences: Meal=${mealType}, Diet=${diet}, Time=${time}, Servings=${servings}.`;
    
    navigation.navigate('RecipeResult', { prompt });
  };

  const renderChips = (options: string[], selected: string, onSelect: (val: string) => void) => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
      {options.map((opt) => (
        <TouchableOpacity 
          key={opt}
          onPress={() => onSelect(opt)}
          className={`mr-3 px-4 py-2 rounded-full border ${selected === opt ? 'bg-primary border-primary' : 'bg-white border-gray-200'}`}
        >
          <Text className={selected === opt ? 'text-white font-medium' : 'text-textPrimary'}>
            {opt}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center p-6 pt-12 bg-white">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <ChevronLeft color="#1F2933" size={28} />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-textPrimary">Generate Recipe</Text>
      </View>

      <ScrollView className="flex-1 p-6" keyboardShouldPersistTaps="handled">
        <Text className="text-3xl font-bold text-textPrimary mb-2">What are you craving?</Text>
        <Text className="text-gray-500 mb-6 text-base">Tell us what you have or what you'd like to cook.</Text>
        
        {/* Main Input */}
        <View className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 mb-6">
          <TextInput
            multiline
            numberOfLines={4}
            className="text-textPrimary text-lg text-left align-top h-32"
            placeholder="e.g. creamy chicken pasta with vegetables"
            placeholderTextColor="#A0AEC0"
            value={description}
            onChangeText={setDescription}
            maxLength={1000}
          />
          <Text className="text-right text-gray-400 text-xs">{description.length}/1000</Text>
        </View>

        {/* Quick Suggestions */}
        <Text className="text-textPrimary font-bold mb-3">Quick Suggestions</Text>
        <View className="flex-row flex-wrap mb-8">
          {SUGGESTIONS.map((sug) => (
            <TouchableOpacity 
              key={sug}
              onPress={() => setDescription(sug)}
              className="bg-gray-100 rounded-full px-4 py-2 mr-2 mb-2"
            >
              <Text className="text-gray-600">{sug}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Preferences */}
        <Text className="text-textPrimary font-bold mb-3">Meal Type</Text>
        {renderChips(MEAL_TYPES, mealType, setMealType)}

        <Text className="text-textPrimary font-bold mb-3">Dietary Preference</Text>
        {renderChips(DIET_TYPES, diet, setDiet)}

        <Text className="text-textPrimary font-bold mb-3">Cooking Time</Text>
        {renderChips(TIME_OPTIONS, time, setTime)}

        <Text className="text-textPrimary font-bold mb-3">Servings</Text>
        {renderChips(SERVING_OPTIONS, servings, setServings)}
        
        <View className="h-20" />
      </ScrollView>

      {/* CTA Button */}
      <View className="p-6 bg-white border-t border-gray-100">
        <TouchableOpacity 
          className={`flex-row justify-center items-center rounded-2xl py-4 ${isConnected ? 'bg-primary' : 'bg-gray-300'}`}
          onPress={handleGenerate}
          disabled={!isConnected}
        >
          <Sparkles color="white" size={24} className="mr-2" />
          <Text className="text-white text-lg font-bold">✨ Create My Recipe</Text>
        </TouchableOpacity>
        {!isConnected && (
          <Text className="text-center text-red-500 mt-2 text-sm">
            Internet connection required to generate recipe.
          </Text>
        )}
      </View>
    </View>
  );
}
