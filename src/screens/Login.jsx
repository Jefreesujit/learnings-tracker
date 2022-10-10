import React, { useState, useEffect } from 'react';
import { Image, Icon, Text, TextInput, TouchableOpacity, View, StyleSheet, StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useTheme } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import { RFValue } from "react-native-responsive-fontsize";
import { getDeviceStats } from '../utils';

GoogleSignin.configure({
  webClientId: '672734400651-06sp7162bddehvnlk2jcn8ea3lhnuhsc.apps.googleusercontent.com',
});

export default function LoginScreen({ navigation }) {
  const [initializing, setInitializing] = useState(true);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const [showGoogleLogin, setShowGoogleLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  let hasTriggered = false;

  const navigateToHome = (data) => {
    navigation.reset({
      index: 0,
      routes: [{
        name: 'Drawer',
        params: { ...data }
      }]
    });
    // navigation.navigate('Drawer', { ...data });
  }

  const handleLoginSuccess = (user, source) => {
    const uid = user.uid;
    let name = user.name ? user.name : (fullName || 'Learner');
    let fcmToken;
    const usersRef = firestore().collection('users');
    const deviceStats = getDeviceStats();

    messaging().getToken().then(token => { fcmToken = token });

    usersRef.doc(uid).get()
      .then(firestoreDocument => {
        if (!firestoreDocument.exists) {
          usersRef.doc(uid).set({
            uid: uid,
            email: user.email || 'Anonymous',
            fullName: name,
            learnings: [],
            fcmToken,
            photo: user.photo || '',
            ...deviceStats,
          });
        } else {
          const fData = firestoreDocument.data();
          usersRef.doc(uid).update({
            ...deviceStats,
            fcmToken,
          });
          name = fData.fullName;
        }
        setShowNameInput(false);
        setShowEmailInput(false);
        navigateToHome({ uid, name });
      })
      .catch(error => {
        alert(error)
      });
  }

  const configureAppSettings = async () => {
    const configRef = firestore().collection('config');
    const confDoc = await configRef.doc('settings').get();
    const { googleLogin } = await confDoc.data();
    setShowGoogleLogin(googleLogin);
  };

  const onAuthStateChanged = (user) => {
    console.log('onAuthStateChanged', user);
    if (user) {
      if (!hasTriggered) {
        hasTriggered = true;
        handleLoginSuccess(user, 'AuthState');
      }
    } else {
      setInitializing(false);
    };
  }

  useEffect(async () => {
    await configureAppSettings();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const handleAnonymousSignIn = () => {
    if (!showNameInput) {
      setShowNameInput(true);
      setShowEmailInput(false);
    }
    else {
      auth().signInAnonymously()
        .then((response) => {
          console.log('User signed in anonymously', response);
          handleLoginSuccess(response.user, 'Anonymous SignIn');
        })
        .catch(error => {
          if (error.code === 'auth/operation-not-allowed') {
            console.log('Enable anonymous in your firebase console.');
          }
          console.error(error);
        });
    }
  }

  const onGoogleButtonPress = async () => {
    let idToken;
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      idToken = userInfo.idToken;
    } catch (error) {
      console.log('onGoogleError', error);
    }
    if (idToken) {
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      auth().signInWithCredential(googleCredential)
        .then((response) => {
          console.log('User signed in with google', response);
          handleLoginSuccess(response.user, 'Google SignIn');
        })
        .catch(error => {
          console.log('error', error);
          alert(error);
        });
    } else {
      alert('Google sigin failed temporarily, please try after some time.')
    }
  }

  const onLoginPress = () => {
    if (!showEmailInput) {
      setShowEmailInput(true);
      setShowNameInput(false);
    }
    else {
      if (email && password) {
        auth().signInWithEmailAndPassword(email, password)
          .then((response) => {
            console.log('User signed in with email', response);
            handleLoginSuccess(response.user, 'Email SignIn');
          })
          .catch(error => {
            alert(error)
          });
      } else {
        alert("Please enter a valid email and password.")
        return
      }
    }
  }

  const onFooterLinkPress = () => {
    navigation.navigate('SignUp')
  }

  const { colors } = useTheme();
  const styles = themedStyles(colors);

  if (initializing) return <View style={styles.wrapper}><Image source={require('../../assets/icon.png')}/></View>;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'#80c905'} />
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always">
        <Image
          style={styles.logo}
          source={require('../../assets/icon.png')}
        />
        {showGoogleLogin && (
          <TouchableOpacity
            style={styles.customGoogleButton}
            onPress={() => onGoogleButtonPress()}>
            <Image style={styles.googleIcon} source={require('../../assets/g-icon.png')} />
              <Text adjustsFontSizeToFit style={styles.googleText}>Sign in with Google</Text>
          </TouchableOpacity>
        )}
        { showEmailInput && (
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
          <Text adjustsFontSizeToFit style={styles.buttonTitle}>Sign in with Email</Text>
        </TouchableOpacity>
        <Text adjustsFontSizeToFit style={styles.separator}> ------------- OR ------------- </Text>
        {showNameInput && (
          <TextInput
            style={styles.input}
            placeholder='Nickname (Optional)'
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setFullName(text)}
            value={fullName}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAnonymousSignIn()}>
          <Text adjustsFontSizeToFit style={styles.buttonTitle}>Sign in Anonymously</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text adjustsFontSizeToFit style={styles.footerText}>Don't have an account? <Text adjustsFontSizeToFit onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

const themedStyles = theme => StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.background,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.background,
  },
  title: {
    paddingTop: 16,
  },
  logo: {
    flex: 1,
    height: 100,
    width: 100,
    alignSelf: "center",
    margin: 50,
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
    color: theme.text,
    backgroundColor: theme.background,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
    borderColor: '#80c905',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#80c905',
    marginLeft: 23,
    marginRight: 23,
    // marginTop: 20,
    marginBottom: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center'
  },
  customGoogleButton: {
    backgroundColor: '#4285f4',
    marginLeft: 23,
    marginRight: 23,
    // marginTop: 20,
    marginBottom: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  googleIcon: {
    height: 48,
    width: 48,
    backgroundColor: '#fff',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  googleText: {
    marginRight: '25%',
    color: 'white',
    fontSize: RFValue(16),
    fontWeight: "bold"
  },
  buttonTitle: {
    color: 'white',
    fontSize: RFValue(16),
    fontWeight: "bold"
  },
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20
  },
  footerText: {
    fontSize: RFValue(16),
    color: 'gray'
  },
  footerLink: {
    color: "#80c905",
    fontWeight: "bold",
    fontSize: RFValue(16)
  }
});
