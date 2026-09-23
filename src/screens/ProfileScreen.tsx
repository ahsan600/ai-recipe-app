import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { User, Bookmark, History, Settings, Bell, HardDrive, HelpCircle, Info, Heart, ChevronRight } from 'lucide-react-native';

export default function ProfileScreen() {
  const navigation = useNavigation<any>();

  const renderMenuItem = (icon: React.ReactNode, title: string, onPress: () => void, subtitle?: string, showArrow = true) => (
    <TouchableOpacity 
      className="flex-row items-center justify-between p-4 bg-white border-b border-gray-100"
      onPress={onPress}
    >
      <View className="flex-row items-center">
        <View className="bg-gray-50 p-2 rounded-xl mr-4">
          {icon}
        </View>
        <View>
          <Text className="text-textPrimary font-semibold text-base">{title}</Text>
          {subtitle && <Text className="text-gray-400 text-xs mt-0.5">{subtitle}</Text>}
        </View>
      </View>
      {showArrow && <ChevronRight color="#A0AEC0" size={20} />}
    </TouchableOpacity>
  );

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="bg-primary pt-16 pb-8 px-6 rounded-b-[40px] items-center mb-6">
        <View className="bg-white/20 p-4 rounded-full mb-4">
          <User color="white" size={48} />
        </View>
        <Text className="text-white text-2xl font-bold mb-1">Food Lover</Text>
        <Text className="text-white/80 text-sm">foodlover@example.com</Text>
      </View>

      <View className="px-6 pb-10">
        <Text className="text-gray-500 font-bold mb-3 uppercase text-xs tracking-wider">My Recipes</Text>
        <View className="bg-white rounded-2xl overflow-hidden shadow-sm mb-6 border border-gray-100">
          {renderMenuItem(<Bookmark color="#FF7A00" size={20} />, "My Saved Recipes", () => navigation.navigate("Saved"))}
          {renderMenuItem(<Heart color="#EF4444" size={20} />, "Favorites", () => navigation.navigate("Favorites"))}
          {renderMenuItem(<History color="#3B82F6" size={20} />, "Recipe History", () => navigation.navigate("History"))}
        </View>

        <Text className="text-gray-500 font-bold mb-3 uppercase text-xs tracking-wider">Settings & Preferences</Text>
        <View className="bg-white rounded-2xl overflow-hidden shadow-sm mb-6 border border-gray-100">
          {renderMenuItem(<Settings color="#6B7280" size={20} />, "App Settings", () => navigation.navigate("Settings"))}
          {renderMenuItem(<Bell color="#F59E0B" size={20} />, "Notifications", () => {})}
          {renderMenuItem(<HardDrive color="#10B981" size={20} />, "Data & Storage", () => {})}
        </View>

        <Text className="text-gray-500 font-bold mb-3 uppercase text-xs tracking-wider">Support</Text>
        <View className="bg-white rounded-2xl overflow-hidden shadow-sm mb-8 border border-gray-100">
          {renderMenuItem(<HelpCircle color="#8B5CF6" size={20} />, "Help & Support", () => {})}
          {renderMenuItem(<Info color="#3B82F6" size={20} />, "About AI Recipe App", () => {})}
        </View>
        
        <View className="items-center">
          <Text className="text-gray-400 text-xs">AI Recipe Generator v1.0.0</Text>
        </View>
      </View>
    </ScrollView>
  );
}
