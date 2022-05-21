import React from 'react';
import { StyleSheet, Image, Text, View, Button, TouchableOpacity, StatusBar } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
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
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'#80c905'} />
      <Text adjustsFontSizeToFit style={styles.welcomeTitle}>Learnings Today</Text>
      <Text adjustsFontSizeToFit style={styles.description}>
        Learnings Today is a simple tracker app that enables you to note down your everyday learnings and helps you to manage them.
        You also get a personalised learning timeline, where you can revisit your learnings and recall them.
      </Text>
      <Text adjustsFontSizeToFit style={styles.description}>
        This project is built during my free time, so incase if you face any issues or want to share any feedbacks, feel free to drop a message via the mail below
      </Text>
      <Text adjustsFontSizeToFit style={styles.navLink}>
        learningstodayapp@gmail.com
      </Text>
      {/* <Text adjustsFontSizeToFit style={styles.description}>
        Learnings Today is totally free to use and doesnt monetize in any way. (Not even ADs - Yes, totally free!!)
        At the same time, it takes funds, time and effort to maintain. If you like this work and want to contribute, you can support with the link below
        KO-FI
      </Text>
      <a href='https://ko-fi.com/learningstoday' target='_blank'>
        <img height='36' style='border:0px;height:36px;' src='https://cdn.ko-fi.com/cdn/kofi2.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' />
      </a> */}
      <Text adjustsFontSizeToFit style={styles.welcomeTitle}>
        Credits
      </Text>
      <Text adjustsFontSizeToFit style={styles.subHeader}>
        Developer
      </Text>
      <Text adjustsFontSizeToFit style={styles.listItem}>
        Jefree Sujit
      </Text>
      <Text adjustsFontSizeToFit style={styles.subHeader}>
        Testers
      </Text>
      <Text adjustsFontSizeToFit style={styles.listItem}>
        Aatish Daniel
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // textAlign: 'center',
    padding: 24,
    width: '100%',
    // textAlign: 'justify',
  },
  welcomeTitle: {
    marginTop: 8,
    marginBottom: 12,
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
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#80c905',
    backgroundColor: '#80c90528'
  }
});

export default Success;
