import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Bookmark, Compass, User } from 'lucide-react-native';

// Import Screens (to be created)
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import SavedRecipesScreen from '../screens/SavedRecipesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import GenerateRecipeScreen from '../screens/GenerateRecipeScreen';
import RecipeResultScreen from '../screens/RecipeResultScreen';
import RecipeDetailsScreen from '../screens/RecipeDetailsScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let Icon = Home;
          if (route.name === 'Home') Icon = Home;
          else if (route.name === 'Saved') Icon = Bookmark;
          else if (route.name === 'Explore') Icon = Compass;
          else if (route.name === 'Profile') Icon = User;
          
          return <Icon color={color} size={size} />;
        },
        tabBarActiveTintColor: '#FF7A00',
        tabBarInactiveTintColor: '#A0AEC0',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 10,
          shadowOpacity: 0.1,
          height: 60,
          paddingBottom: 10,
          paddingTop: 5,
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Saved" component={SavedRecipesScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="GenerateRecipe" component={GenerateRecipeScreen} />
      <Stack.Screen name="RecipeResult" component={RecipeResultScreen} options={{ gestureEnabled: false }} />
      <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
    </Stack.Navigator>
  );
};
