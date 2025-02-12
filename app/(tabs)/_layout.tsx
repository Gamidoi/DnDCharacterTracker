import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import {FontAwesome} from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,


      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Character',
          tabBarIcon: ({ color }) => <FontAwesome size={28}  name="user-secret" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Spells & Abilities',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="magic" color={color} />,
        }}
      />
        <Tabs.Screen
        name="explore2"
        options={{
            title: 'Level Up',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="level-up" color={color} />,
        }}
    />
    </Tabs>
  );
}
