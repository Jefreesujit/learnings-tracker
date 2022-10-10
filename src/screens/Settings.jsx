import React, { useState, useEffect, useContext } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet, StatusBar, Switch, AsyncStorage, Platform, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth';
import { useTheme, DefaultTheme, DarkTheme } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { RFValue } from "react-native-responsive-fontsize";
import { ThemeContext } from '../components/ThemeContext';
import { trackEvent } from '../utils/analytics';

const Settings = ({ route, navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [password, setPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { theme, setTheme } = useContext(ThemeContext);

  const usersRef = firestore().collection('users');

  useEffect(() => {
    const uid = route.params.uid;
    usersRef.doc(uid).get()
      .then(fDoc => {
        // console.log('data', fDoc.data(), uid);
        const isAnonymous = fDoc.data().email === 'Anonymous';
        const name = fDoc.data().fullName;
        // console.log('data', fDoc.data());
        setIsAnonymous(isAnonymous);
        setFullName(name);
      }).catch(error => {
        alert(error);
      });
  }, []);

  const updateDisplayName = () => {
    const uid = route.params.uid;
    usersRef.doc(uid).update({ fullName }).then(() => {
      navigation.setParams({ name: fullName });
      trackEvent('Change Name');
      alert('Display name updated successfully')
    });
  };

  const reauthenticate = (currentPassword) => {
    const user = auth().currentUser;
    const cred = auth.EmailAuthProvider.credential(
      user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }

  const changePassword = () => {
    reauthenticate(currentPassword).then(() => {
      const user = auth().currentUser;
      user.updatePassword(newPassword).then(() => {
        trackEvent('Change Password');
        alert("Password changed succesfully");
        setCurrentPassword('');
        setNewPassword('');
      }).catch((error) => {
        console.log(error);
        alert(error)
      });
    }).catch((error) => {
      console.log(error);
      alert(error)
    });
  }

  const linkWithCredential = () => {
    const uid = route.params.uid;
    if (email && password) {
      const cred = auth.EmailAuthProvider.credential(email, password);
      const user = auth().currentUser;
      auth().currentUser.linkWithCredential(cred).then((response) => {
        // console.log('Linked with email', response);
        trackEvent('Link with email');
        alert('Linked with email successfully');
        setIsAnonymous(false);
        usersRef.doc(uid).update({ email });
      }).catch((error) => {
        console.log(error);
        alert(error);
      });
    } else {
      alert("Please enter a valid credentials.");
      return;
    }
  }

  const toggleSwitch = async () => {
    console.log('toggleSwitch', theme);
    const newTheme = theme === DefaultTheme ? DarkTheme : DefaultTheme;
    AsyncStorage.setItem('theme', JSON.stringify(newTheme));
    setTheme(newTheme);
  }

  const deleteUser = async () => {
    const uid = route.params.uid;
    await usersRef.doc(uid).delete();
    await auth().currentUser.delete();
    trackEvent('Delete account');
    console.log('User deleted');
    navigation.navigate('Login');
  };

  const handleDeleteAccount = () =>
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Delete",
          onPress: () => deleteUser(),
          style: "delete"
        }
      ]
  );

  const { colors, dark } = useTheme();
  const styles = themedStyles(colors);

  const isEnabled = theme.dark === true;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'#80c905'} />
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always">
        <Text adjustsFontSizeToFit style={styles.sectionTitle}>Settings</Text>
        <Text style={styles.sectionSubTitle}>Change Display name</Text>
        <TextInput
          style={styles.input}
          placeholder='Display name'
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setFullName(text)}
          value={fullName}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => updateDisplayName()}>
          <Text adjustsFontSizeToFit style={styles.buttonTitle}>Update Display name</Text>
        </TouchableOpacity>
        {!isAnonymous ? (
          <View>
            <Text style={styles.sectionSubTitle}>Change Password</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="#aaaaaa"
              secureTextEntry
              placeholder='Current Password'
              onChangeText={(text) => setCurrentPassword(text)}
              value={currentPassword}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholderTextColor="#aaaaaa"
              secureTextEntry
              placeholder='New Password'
              onChangeText={(text) => setNewPassword(text)}
              value={newPassword}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => changePassword()}>
              <Text adjustsFontSizeToFit style={styles.buttonTitle}>Change Password</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
              <Text style={styles.sectionSubTitle}>Link with Email</Text>
            <Text style={styles.warningText}>
              You have logged in anonymously, link your account with email to prevent losing your progress!
            </Text>
            <TextInput
              style={styles.input}
              placeholder='Set Email'
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
              placeholder='Set Password'
              onChangeText={(text) => setPassword(text)}
              value={password}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => linkWithCredential()}>
              <Text adjustsFontSizeToFit style={styles.buttonTitle}>Link with Email account</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.themeSection}>
          <Text style={styles.sectionSubTitle}>Dark Theme</Text>
          <Switch
            style={Platform.OS === 'ios' ? {} : styles.switchStyle}
            trackColor={{ false: "#767577", true: "#cdcdcd" }}
            thumbColor={isEnabled ? "#80c905" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled} />
        </View>
        <View style={styles.divider}></View>
        <View style={styles.deleteSection}>
          <Text style={styles.sectionSubTitle}>Danger Zone</Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteAccount()}>
            <Text adjustsFontSizeToFit style={styles.buttonTitle}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

const themedStyles = theme => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.background,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: RFValue(24),
    margin: 16,
    color: theme.text,
  },
  sectionSubTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    margin: 12,
    marginLeft: 32,
    color: theme.text,
  },
  warningText: {
    marginLeft: 32,
    marginRight: 32,
    margin: 12,
    color: '#ff4f3d',
    padding: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ff4f3d',
  },
  themeSection: {
    marginTop: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 20,
  },
  divider: {
    marginLeft: 30,
    marginRight: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#cdcdcd',
  },
  switchStyle: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
    marginLeft: 20,
  },
  logo: {
    flex: 1,
    height: 100,
    width: 100,
    alignSelf: "center",
    margin: 30
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: theme.background,
    color: theme.text,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
    borderWidth: 1,
    borderColor: '#80c905',
  },
  button: {
    backgroundColor: '#80c905',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    marginBottom: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center'
  },
  deleteButton: {
    backgroundColor: 'red',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    marginBottom: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center'
  },
  deleteSection: {
    marginTop: 16,
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
    color: 'gray',
  },
  footerLink: {
    color: "#80c905",
    fontWeight: "bold",
    fontSize: RFValue(16)
  }
})

export default Settings;
