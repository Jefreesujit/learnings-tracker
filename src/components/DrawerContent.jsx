import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';

const hiddenRoutes = [];

const DrawerContent = (props) => {
  const filteredProps = {
    ...props,
    state: {
      ...props.state,
      routes: props.state.routes.filter(route => !hiddenRoutes.includes(route.name))
    }
  };

  const onLogoutPress = (props) => {
    auth().signOut()
      .then(() => {
        console.log('User signed out!');
        props.navigation.navigate('Login');
      });
  }


  return (
    <DrawerContentScrollView {...filteredProps} contentContainerStyle={styles.drawerContentContainer}>
      <View>
        <DrawerItemList {...filteredProps} />
        <DrawerItem label="Logout" onPress={() => onLogoutPress(props)} />
      </View>
      <View style={styles.footer}>
        <Text>Learnings Today</Text>
        <Text>v1.0.0</Text>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    fontSize: 16,
    textAlign: 'center',
  },
  footer: {
    textAlign: 'center',
    margin: 20,
    fontSize: 14,
    alignItems: 'center',
    lineHeight: 20,
  }
});

export default DrawerContent;
