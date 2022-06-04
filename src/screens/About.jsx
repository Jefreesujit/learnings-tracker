import React from 'react';
import { StyleSheet, Image, Text, Linking, ScrollView, Button, TouchableOpacity, StatusBar } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import { borderColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { getLearningQuote } from '../utils';

const Success = ({ route, navigation }) => {

  const addLearning = () => {
    navigation.navigate('Home', { uid: route.params.uid });
  };

  const viewLearning = () => {
    navigation.navigate('Timeline', { uid: route.params.uid });
  };

  const { quote, by } = getLearningQuote();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'#80c905'} />
      <Text adjustsFontSizeToFit style={styles.welcomeTitle}>Learnings Today</Text>
      <Text adjustsFontSizeToFit style={styles.description}>
        Learnings Today is a simple tracker app that enables you to note down your everyday learnings and helps you to manage them.
        You also get a personalised learning timeline, where you can revisit your learnings and recall them.
      </Text>
      {/* <Text adjustsFontSizeToFit style={styles.description}>
        The app is completely free to use and doesnt monetize in any way. (Not even ADs - Yes, totally free!!)
        At the same time it takes time, effort and funds to maintain. If you like this work and want to contribute, you can support with the link below:
      </Text>
      <Text style={styles.navLink} onPress={() => {
          Linking.openURL('https://ko-fi.com/learningstoday');
        }}>
        Buy me a Coffee at ko-fi.com
      </Text> */}
      <Text adjustsFontSizeToFit style={styles.description}>
        This project is built during my free time, so incase if you face any issues or want to share any feedbacks, feel free to drop a message to the email below:
      </Text>
      <Text adjustsFontSizeToFit style={styles.navLink} onPress={() => {
        Linking.openURL('mailto:learningstodayapp@gmail.com');
      }}>
        learningstodayapp@gmail.com
      </Text>
      <Text adjustsFontSizeToFit style={styles.welcomeTitle}>
        Credits
      </Text>
      <Text adjustsFontSizeToFit style={styles.subHeader}>
        Developer
      </Text>
      <Text adjustsFontSizeToFit style={styles.listItem} onPress={() => {
          Linking.openURL('https:/github.com/jefreesujit');
        }}>
        Jefree Sujit
      </Text>
      <Text adjustsFontSizeToFit style={styles.subHeader}>
        Testers
      </Text>
      <Text adjustsFontSizeToFit style={styles.listItem}>
        Aatish Daniel
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // textAlign: 'center',
    padding: 16,
    width: '100%',
    // textAlign: 'justify',
  },
  description: {
    padding: 16,
    paddingBottom: 8,
    paddingTop: 8,
    fontSize: 16,
  },
  subHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    padding: 8,
  },
  listItem: {
    color: '#80c905',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  welcomeTitle: {
    margin: 8,
    fontSize: RFValue(22),
    alignItems: 'flex-start',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  successText: {
    fontSize: RFValue(24),
    margin: 16,
    marginTop: 32,
    alignSelf: 'center',
    textAlign: 'center',
    color: 'gray',
    lineHeight: 32,
  },
  navLink: {
    margin: 12,
    padding: 8,
    fontSize: RFValue(16),
    // textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#80c905',
    // backgroundColor: '#80c90528',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#80c905',
  }
});

export default Success;
