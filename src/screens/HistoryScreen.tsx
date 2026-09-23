import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ChevronLeft, History as HistoryIcon, Clock, Trash2 } from 'lucide-react-native';
import { getHistory, HistoryItem, clearHistory } from '../storage/historyStorage';

export default function HistoryScreen() {
  const navigation = useNavigation<any>();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadHistory = async () => {
    const data = await getHistory();
    setHistory(data);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [])
  );

  const handleClearHistory = async () => {
    await clearHistory();
    loadHistory();
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View className="flex-1 bg-background">
      <View className="flex-row items-center justify-between p-6 pt-12 bg-white border-b border-gray-100">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
            <ChevronLeft color="#1F2933" size={28} />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-textPrimary">Recipe History</Text>
        </View>
        {history.length > 0 && (
          <TouchableOpacity onPress={handleClearHistory}>
            <Trash2 color="#EF4444" size={20} />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        {!loading && history.length === 0 ? (
          <View className="items-center justify-center mt-20">
            <View className="bg-blue-50 p-6 rounded-full mb-4">
              <HistoryIcon color="#3B82F6" size={48} />
            </View>
            <Text className="text-textPrimary text-xl font-bold mb-2">No history yet</Text>
            <Text className="text-gray-500 text-center mb-6">
              Recipes you generate with AI will appear here so you can find them again.
            </Text>
            <TouchableOpacity 
              className="bg-primary px-8 py-4 rounded-xl"
              onPress={() => navigation.navigate('GenerateRecipe')}
            >
              <Text className="text-white font-bold">Generate Recipe</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="pb-10">
            {history.map((item, index) => (
              <TouchableOpacity 
                key={index}
                className="flex-row bg-white p-4 rounded-2xl mb-4 shadow-sm border border-gray-100 items-center"
                onPress={() => navigation.navigate('RecipeDetails', { recipe: item.recipe, isGenerated: true })}
              >
                <Image 
                  source={{ uri: item.recipe.image }} 
                  className="w-16 h-16 rounded-xl bg-gray-200 mr-4"
                  resizeMode="cover"
                />
                <View className="flex-1">
                  <Text className="text-textPrimary font-bold text-base mb-1" numberOfLines={1}>
                    {item.recipe.title}
                  </Text>
                  <View className="flex-row items-center">
                    <Clock color="#A0AEC0" size={14} className="mr-1" />
                    <Text className="text-gray-500 text-xs">{formatDate(item.timestamp)}</Text>
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
