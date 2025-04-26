import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialCommunityIcons} from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

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
            tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28}  name="robot-excited" color={color} />,
        }}
      />
      <Tabs.Screen
        name="SpellsAbilities"
        options={{
          title: 'Spells & Abilities',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="crystal-ball" color={color} />,
        }}
      />
        <Tabs.Screen
            name="SkillsSavesRolls"
            options={{
                title: 'Skills & Saves',
                tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="hexagon-multiple-outline" color={color} />,
            }}
        />
        <Tabs.Screen
        name="Items"
        options={{
            title: 'Items',
            tabBarIcon: ({ color }) => <MaterialCommunityIcons size={28} name="hexagon-multiple-outline" color={color} />,
        }}
    />
        <Tabs.Screen
            name="LevelUpTab"
            options={{
                title: 'Level Up',
                tabBarIcon: ({ color }) => <MaterialIcons size={28} name="engineering" color={color} />,
            }}
        />
    </Tabs>
  );
}
