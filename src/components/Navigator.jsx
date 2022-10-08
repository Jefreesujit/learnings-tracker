import React from 'react';
import { useColorScheme } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import DrawerContent from './DrawerContent';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Home from '../screens/Home';
import Timeline from '../screens/Timeline';
import Success from '../screens/Success';
import Settings from '../screens/Settings';
import About from '../screens/About';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const DrawerScreen = ({ route, navigation }) => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#80c905' },
        drawerActiveTintColor: '#80c905',
        drawerActiveBackgroundColor: '#80c90528',
        drawerLabelStyle: { fontSize: 18, paddingLeft: 8, paddingRight: 8 }
      }}
      drawerContent={DrawerContent}
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
        name="Settings"
        component={Settings}
        options={{
          title: 'Settings',
        }}
        initialParams={{ ...route.params }}
      />
      <Drawer.Screen
        name="About"
        component={About}
        options={{
          title: 'About',
        }}
        initialParams={{ ...route.params }}
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
        name="Success"
        component={Success}
      />
      <Stack.Screen
        name="Drawer"
        component={DrawerScreen}
      />
    </Stack.Navigator>
  );
}

export default Navigator;
