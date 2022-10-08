import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
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
    },
    // descriptors: {
    //   ...props.descriptors,
    //   options:
    // },
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
        <View style={styles.drawerContentHeader}>
          <Image
            style={styles.logo}
            source={require('../../assets/icon.png')}
          />
          <Text style={styles.drawerContentTitle}>Learnings Today</Text>
        </View>
        <DrawerItemList {...filteredProps} />
        <DrawerItem labelStyle={styles.logout} label="Logout" onPress={() => onLogoutPress(props)} />
      </View>
      <View style={styles.footer}>
        <Text>Learnings Today</Text>
        <Text>v1.0.3</Text>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    textAlign: 'center',
    // margin: 16,
    // marginBottom: 4,
  },
  logo: {
    width: 56,
    height: 56,
    // padding: 4,
  },
  drawerContentHeader: {
    flexDirection: 'row',
    margin: 16,
    marginTop: 24,
    marginBottom: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  drawerContentTitle: {
    fontSize: 22,
    color: '#80c905',
    fontWeight: 'bold',
    width: 150,
    flexWrap: 'wrap',
    marginLeft: 12,
    textAlign: 'left',
    letterSpacing: 1.5,
  },
  logout: {
    fontSize: 18,
    paddingLeft: 8,
    paddingRight: 8,
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
