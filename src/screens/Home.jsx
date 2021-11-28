import React, { useState } from 'react';
import TagInput from 'react-native-tags-input';
import { Dimensions, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

const Home = ({ navigation }) => {
  const [ learning, setLearning ] = useState('');
  const [tags, setTags] = useState({ tag: '', tagsArray: [] });

  const onSaveLearning = () => {
    navigation.navigate('Success', { name: 'Jefree' });
  };

  const viewLearning = () => {
    navigation.navigate('Timeline', { name: 'Jefree' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.learningSection}>
        <View style={styles.titleSection}>
          <Text style={styles.welcomeTitle}>Welcome Jefree,</Text>
          <TouchableOpacity onPress={viewLearning}>
            <Text style={styles.navLink}>My Timeline</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.questionText}>What did you learn today?</Text>
        <TextInput
          style={styles.learningText}
          multiline
          numberOfLines={4}
          padding={24}
          placeholder="Enter text.."
          onChangeText={text => setLearning(text)}
          value={learning}
          editable
          />
        <TagInput
          updateState={setTags}
          tags={tags}
          placeholder="Add labels"
          inputStyle={styles.tagInput}
          tagStyle={styles.tag}
          tagTextStyle={styles.tagText}
        />
      </View>
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={onSaveLearning}>
          <Text style={styles.saveButtonText}>Save Learnings</Text>
        </TouchableOpacity>
      </View>
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
  learningSection: {
    margin: 16,
  },
  questionText: {
    marginTop: 24,
    fontSize: 48,
    fontWeight: 'bold',
  },
  learningText: {
    marginTop: 36,
    marginBottom: 24,
    fontSize: 26,
    borderColor: 'gray',
    borderRadius: 32,
    borderStyle: 'dotted',
    borderWidth: 4,
    height: 260,
    lineHeight: 34,
    paddingTop: 24,
    includeFontPadding: true
  },
  welcomeTitle: {
    marginTop: 8,
    marginBottom: 12,
    fontSize: 22,
    alignItems: 'flex-start',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  actionContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  tag: {
    backgroundColor: '#80c905',
    height: 36,
  },
  tagText: {
    color: 'white',
    fontSize: 20,
  },
  tagInput: {
    fontSize: 24,
    margin: 8
  },
  saveButton: {
    width: '100%',
    height: 80,
    backgroundColor: '#80c905',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
    alignItems: 'center'
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

export default Home;