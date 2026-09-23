import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ChevronLeft, ChefHat, AlertCircle } from 'lucide-react-native';
import { generateRecipe } from '../services/recipeGenerationService';
import { addToHistory } from '../storage/historyStorage';

export default function RecipeResultScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const prompt = route.params?.prompt || '';

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    const fetchRecipe = async () => {
      try {
        const recipe = await generateRecipe(prompt);
        if (!isMounted) return;
        
        // Add a fake ID to generated recipe for local use
        const generatedWithId = {
          ...recipe,
          id: `ai-${Date.now()}`,
          image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&q=80' // default AI image
        };

        // Save to history implicitly
        await addToHistory(generatedWithId as any);
        
        // Immediately navigate to details and replace this screen in stack
        navigation.replace('RecipeDetails', { recipe: generatedWithId, isGenerated: true });
        
      } catch (e) {
        if (!isMounted) return;
        setLoading(false);
        setError(true);
      }
    };

    fetchRecipe();

    return () => {
      isMounted = false;
    };
  }, [prompt]);

  return (
    <View className="flex-1 bg-gray-900 justify-center items-center p-6">
      <TouchableOpacity 
        className="absolute top-12 left-6 z-10"
        onPress={() => navigation.goBack()}
        disabled={loading} // Don't allow back while generating, or maybe we should?
      >
        <ChevronLeft color="white" size={32} />
      </TouchableOpacity>

      {loading && !error && (
        <View className="items-center">
          <Text className="text-white text-3xl font-bold mb-4">AI is Cooking...</Text>
          <Text className="text-gray-400 text-center text-base mb-12 px-6">
            Our AI is finding the best recipe for you. This may take a few seconds.
          </Text>
          
          <View className="bg-primary/20 p-8 rounded-full mb-8 items-center justify-center border-4 border-primary/40">
            <ChefHat color="#FF7A00" size={64} />
          </View>
          
          <ActivityIndicator size="large" color="#FF7A00" />
        </View>
      )}

      {error && (
        <View className="items-center bg-white p-8 rounded-3xl w-full">
          <AlertCircle color="#EF4444" size={64} className="mb-4" />
          <Text className="text-textPrimary text-2xl font-bold mb-2 text-center">
            We couldn't create your recipe right now.
          </Text>
          <Text className="text-gray-500 text-center mb-8">
            Please check your connection and try again.
          </Text>
          
          <TouchableOpacity 
            className="w-full bg-primary py-4 rounded-xl items-center mb-3"
            onPress={() => {
              setError(false);
              setLoading(true);
              // Simple reload logic via useEffect dependency could work, but calling fetch directly is better.
              // For simplicity, user can go back and press generate again.
              navigation.goBack();
            }}
          >
            <Text className="text-white font-bold text-lg">Try Again</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="w-full bg-gray-100 py-4 rounded-xl items-center"
            onPress={() => navigation.navigate('Explore')}
          >
            <Text className="text-textPrimary font-bold text-lg">Browse Offline Recipes</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
