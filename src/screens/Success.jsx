import React from 'react';
import { StyleSheet, Image, Text, View, Button, TouchableOpacity } from 'react-native';

const Success = ({ route, navigation }) => {

  const addLearning = () => {
    navigation.navigate('Home', { uid: route.params.uid });
  };

  const viewLearning = () => {
    navigation.navigate('Timeline', { uid: route.params.uid });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.successText}>Successfully added to your learnings</Text>
      <Image
        style={styles.successIcon}
        source={require('../../assets/icon-check.png')}
      />
      <Text style={styles.learningQuote}>“The beautiful thing about learning is that nobody can take it away from you.” ― B.B. King</Text>
      <TouchableOpacity onPress={addLearning}>
        <Text style={styles.navLink}>Note down another learning</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={viewLearning}>
        <Text style={styles.navLink}>View my learnings timeline</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    textAlign: 'center',
    padding: 24,
    width: '100%',
    textAlign: 'justify',
  },
  successText: {
    fontSize: 24,
    margin: 16,
    marginTop: 32,
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
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'center',
    // color: '#80c905',
  },
  navLink: {
    margin: 12,
    padding: 8,
    fontSize: 16,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#80c905',
    backgroundColor: '#80c90528'
  }
});

export default Success;
