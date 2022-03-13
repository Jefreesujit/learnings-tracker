import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Home from '../screens/Home';
import Timeline from '../screens/Timeline';
import Success from '../screens/Success';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const DrawerScreen = ({ route, navigation }) => {
  console.log('route params outside', { ...route.params });
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#80c905' },
        activeTintColor: '#80c905',
        itemStyle: { padding: 0 },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Learning',
        }}
        initialParams={{ ...route.params }}
      />
      <Drawer.Screen
        name="Timeline"
        component={Timeline}
        options={{
          title: 'Timeline',
        }}
        initialParams={{ ...route.params }}
      />
      <Drawer.Screen
        name="Success"
        component={Success}
        options={{
          gestureEnabled: false,
        }}
      />
    </Drawer.Navigator>
  );
}

function Navigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
      />
      <Stack.Screen
        name="Drawer"
        component={DrawerScreen}
      />
    </Stack.Navigator>
  );
}

export default Navigator;
