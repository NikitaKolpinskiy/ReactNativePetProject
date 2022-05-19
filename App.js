// You can import Ionicons from @expo/vector-icons if you use Expo or
// react-native-vector-icons/Ionicons otherwise.
import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import Galery from "./src/components/Galery";
import GoogleMap from "./src/components/GoogleMap";
import Cards from "./src/components/Cards";

import Home from "./src/assets/svg/home.svg";
import Map from "./src/assets/svg/map.svg";
import Card from "./src/assets/svg/card.svg";

const GaleryTitle = "Galery";
const MapTitle = "Map";
const cards = "Cards";

const activeColor = "#9FADE3";
const inActiveColor = "#808080";


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            const IconConfig = {
              [GaleryTitle]:  <Home width={21} height={21} fill={color} />,
              [cards]: <Card width={21} height={21} fill={color} />,
              [MapTitle]: <Map width={21} height={21} fill={color} />,
            };

            return IconConfig[route.name];
          },
          tabBarActiveTintColor: activeColor,
          tabBarInactiveTintColor: inActiveColor,
          headerShown: false
        })}
      >
        <Tab.Screen name="Galery" component={Galery} />
        <Tab.Screen name="Map" component={GoogleMap} />
        <Tab.Screen name="Cards" component={Cards} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
