import React, { useState } from 'react';
import TagInput from 'react-native-tags-input';
import { Dimensions, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

const Home = () => {
  const [ learning, setLearning ] = useState('');
  const [tags, setTags] = useState({ tag: '', tagsArray: [] });
  return (
    <View style={styles.container}>
      <View style={styles.learningSection}>
        <Text style={styles.welcomeTitle}>Welcome Jefree,</Text>
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
          tagStyle={styles.tag}
          tagTextStyle={styles.tagText}
        />
      </View>
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.saveButton}>
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
    margin: 24,
  },
  questionText: {
    marginTop: 16,
    fontSize: 56,
    fontWeight: 'bold',
  },
  learningText: {
    marginTop: 36,
    marginBottom: 24,
    fontSize: 32,
    borderColor: 'gray',
    borderRadius: 32,
    borderStyle: 'dotted',
    borderWidth: 4,
    height: 260,
    lineHeight: 40,
    paddingTop: 24,
    includeFontPadding: true
  },
  welcomeTitle: {
    marginTop: 8,
    marginBottom: 16,
    fontSize: 24,
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
    height: 32,
  },
  tagText: {
    color: 'white',
    fontSize: 18,
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
  }
});

export default Home;
