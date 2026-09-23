import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, Bell, WifiOff, Trash2, Database, Shield, FileText } from 'lucide-react-native';

export default function SettingsScreen() {
  const navigation = useNavigation<any>();
  const [notifications, setNotifications] = React.useState(true);
  const [offlineMode, setOfflineMode] = React.useState(false);

  const renderSettingItem = (icon: React.ReactNode, title: string, rightElement: React.ReactNode, onPress?: () => void) => (
    <TouchableOpacity 
      className="flex-row items-center justify-between p-4 bg-white border-b border-gray-100"
      onPress={onPress}
      disabled={!onPress}
    >
      <View className="flex-row items-center">
        <View className="mr-3">
          {icon}
        </View>
        <Text className="text-textPrimary font-medium text-base">{title}</Text>
      </View>
      <View>
        {rightElement}
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-background">
      <View className="flex-row items-center p-6 pt-12 bg-white border-b border-gray-100">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <ChevronLeft color="#1F2933" size={28} />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-textPrimary">Settings</Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        <Text className="text-gray-500 font-bold mb-3 uppercase text-xs tracking-wider">Preferences</Text>
        <View className="bg-white rounded-2xl overflow-hidden shadow-sm mb-6 border border-gray-100">
          {renderSettingItem(
            <Bell color="#6B7280" size={20} />, 
            "Push Notifications", 
            <Switch value={notifications} onValueChange={setNotifications} trackColor={{ true: '#FF7A00' }} />
          )}
          {renderSettingItem(
            <WifiOff color="#6B7280" size={20} />, 
            "Download All Images (Offline)", 
            <Switch value={offlineMode} onValueChange={setOfflineMode} trackColor={{ true: '#FF7A00' }} />
          )}
        </View>

        <Text className="text-gray-500 font-bold mb-3 uppercase text-xs tracking-wider">Data & Storage</Text>
        <View className="bg-white rounded-2xl overflow-hidden shadow-sm mb-6 border border-gray-100">
          {renderSettingItem(
            <Database color="#6B7280" size={20} />, 
            "Storage Usage", 
            <Text className="text-gray-400">12.5 MB</Text>,
            () => {}
          )}
          {renderSettingItem(
            <Trash2 color="#EF4444" size={20} />, 
            "Clear Cache", 
            <Text className="text-red-500 text-sm">Clear</Text>,
            () => {}
          )}
        </View>

        <Text className="text-gray-500 font-bold mb-3 uppercase text-xs tracking-wider">About</Text>
        <View className="bg-white rounded-2xl overflow-hidden shadow-sm mb-8 border border-gray-100">
          {renderSettingItem(
            <Shield color="#6B7280" size={20} />, 
            "Privacy Policy", 
            <ChevronLeft color="#A0AEC0" size={16} className="rotate-180" />,
            () => {}
          )}
          {renderSettingItem(
            <FileText color="#6B7280" size={20} />, 
            "Terms of Service", 
            <ChevronLeft color="#A0AEC0" size={16} className="rotate-180" />,
            () => {}
          )}
        </View>
        
        <View className="items-center pb-10">
          <Text className="text-gray-400 text-sm mb-1">AI Recipe App</Text>
          <Text className="text-gray-400 text-xs">Version 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}
