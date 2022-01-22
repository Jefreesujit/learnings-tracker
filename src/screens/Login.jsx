import React, { useState, useEffect } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function LoginScreen({ navigation }) {
  const [initializing, setInitializing] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSuccess = (user) => {
    const uid = user.uid;
    const usersRef = firestore().collection('users');
    usersRef.doc(uid).get()
      .then(firestoreDocument => {
        if (!firestoreDocument.exists) {
          usersRef.doc(uid).set({
            uid: uid,
            email: user.email || 'Anonymous',
            learnings: []
          });
        }
        setShowInput(false);
        navigation.navigate('Home', { uid });
      })
      .catch(error => {
        alert(error)
      });
  }

  const onAuthStateChanged = (user) => {
    console.log('onAuthStateChanged', user);
    if (user) {
      handleLoginSuccess(user)
    } else {
      setInitializing(false);
    };
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const handleAnonymousSignIn = () => {
    auth().signInAnonymously()
      .then((response) => {
        console.log('User signed in anonymously', response);
        handleLoginSuccess(response.user);
      })
      .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }
        console.error(error);
      });
  }

  const onLoginPress = () => {
    if (!showInput) {
      setShowInput(true);
    }
    else {
      auth().signInWithEmailAndPassword(email, password)
        .then((response) => {
          console.log('User signed in with email', response);
          handleLoginSuccess(response.user);
        })
        .catch(error => {
          alert(error)
        })
    }
  }

  const onFooterLinkPress = () => {
    navigation.navigate('SignUp')
  }

  if (initializing) return <View style={styles.wrapper}><Image source={require('../../assets/icon.png')}/></View>;

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always">
        <Image
          style={styles.logo}
          source={require('../../assets/icon.png')}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAnonymousSignIn()}>
          <Text style={styles.buttonTitle}>Log in Anonymously</Text>
        </TouchableOpacity>
        <Text style={styles.separator}> ------------- OR ------------- </Text>
        { showInput && (
          <>
          <TextInput
            style={styles.input}
            placeholder='E-mail'
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setEmail(text)}
            value={email}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaaaaa"
            secureTextEntry
            placeholder='Password'
            onChangeText={(text) => setPassword(text)}
            value={password}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          </>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => onLoginPress()}>
          <Text style={styles.buttonTitle}>Log in with Email</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: '#fff',
  },
  title: {
    paddingTop: 16,
  },
  logo: {
    flex: 1,
    height: 100,
    width: 100,
    alignSelf: "center",
    margin: 30
  },
  separator: {
    textAlign: 'center',
    color: 'gray',
    marginBottom: 20
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16
  },
  button: {
    backgroundColor: '#80c905',
    marginLeft: 30,
    marginRight: 30,
    // marginTop: 20,
    marginBottom: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center'
  },
  googleButton: {
    marginLeft: 30,
    marginRight: 30,
    // marginTop: 20,
    marginBottom: 20,
    height: 54,
    width: 330,
    textAlign: 'center',
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center'
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: "bold"
  },
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20
  },
  footerText: {
    fontSize: 16,
    color: '#2e2e2d'
  },
  footerLink: {
    color: "#80c905",
    fontWeight: "bold",
    fontSize: 16
  }
});
