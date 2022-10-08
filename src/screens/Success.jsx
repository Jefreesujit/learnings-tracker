import React from 'react';
import { StyleSheet, Image, Text, View, Button, TouchableOpacity, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { RFValue } from "react-native-responsive-fontsize";
import { getLearningQuote } from '../utils';

const Success = ({ route, navigation }) => {
  const { colors } = useTheme();

  const addLearning = () => {
    navigation.navigate('Home', { uid: route.params.uid, name: route.params.name });
  };

  const viewLearning = () => {
    navigation.navigate('Timeline', { uid: route.params.uid, name: route.params.name });
  };

  const { quote, by } = getLearningQuote();

  const styles = themedStyles(colors);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'#80c905'} />
      <Text adjustsFontSizeToFit style={styles.successText}>Successfully added to your learnings</Text>
      <Image
        style={styles.successIcon}
        source={require('../../assets/icon-check.png')}
      />
      <Text adjustsFontSizeToFit style={styles.learningQuote}>“{quote}” ― {by}</Text>
      <TouchableOpacity onPress={addLearning}>
        <Text adjustsFontSizeToFit style={styles.navLink}>Note down another learning</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={viewLearning}>
        <Text adjustsFontSizeToFit style={styles.navLink}>View your learnings timeline</Text>
      </TouchableOpacity>
    </View>
  );
}

const themedStyles = theme => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    alignItems: 'center',
    justifyContent: 'flex-start',
    textAlign: 'center',
    padding: 24,
    width: '100%',
    textAlign: 'justify',
  },
  successText: {
    fontSize: RFValue(24),
    margin: 16,
    marginTop: 64,
    alignSelf: 'center',
    textAlign: 'center',
    color: 'gray',
    lineHeight: 32,
  },
  successIcon: {
    width: 200,
    height: 200,
    margin: 16,
  },
  learningQuote: {
    margin: 24,
    marginBottom: 48,
    fontSize: RFValue(20),
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.text,
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
