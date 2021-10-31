import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Timeline from '../screens/Timeline';
import Success from '../screens/Success';

const Stack = createNativeStackNavigator();

function Navigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#80c905' },
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Learnings App',
        }}
      />
      <Stack.Screen
        name="Timeline"
        component={Timeline}
        options={{
          title: 'My Timeline',
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
