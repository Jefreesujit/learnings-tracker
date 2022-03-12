import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import store from '@react-native-firebase/firestore';

function Auth() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  function handleSignIn () {
    auth()
      .signInAnonymously()
      .then((user) => {
        console.log('User signed in anonymously', user);
      })
      .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }
        console.error(error);
      });
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <TouchableOpacity onPress={handleSignIn}>
          <Text adjustsFontSizeToFit style={styles.navLink}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  navLink: {
    marginTop: 8,
    marginBottom: 12,
    padding: 8,
    fontSize: 16,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#80c905',
    backgroundColor: '#80c90528'
  }
});

export default Auth;
