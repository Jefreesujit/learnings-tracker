import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Home from '../screens/Home';
import Timeline from '../screens/Timeline';
import Success from '../screens/Success';

const Stack = createNativeStackNavigator();

function Navigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#80c905' },
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: 'Login',
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: 'SignUp',
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Learnings Today',
        }}
      />
      <Stack.Screen
        name="Timeline"
        component={Timeline}
        options={{
          title: 'Learnings Timeline',
        }}
      />
      <Stack.Screen
        name="Success"
        component={Success}
        options={{
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default Navigator;
