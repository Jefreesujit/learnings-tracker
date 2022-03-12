import React, { useState, Fragment } from 'react';
import TagInput from 'react-native-tags-input';
import { Dimensions, StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from "react-native-responsive-fontsize";

const Home = ({ route, navigation }) => {
  const [ learning, setLearning ] = useState('');
  const [tags, setTags] = useState({ tag: '', tagsArray: [] });

  const onSaveLearning = async () => {

    const uid = route.params.uid;
    const newLearningItem = {
      learningText: learning,
      date: new Date().toISOString(),
      tags,
    };

    const usersRef = firestore().collection('users');
    usersRef.doc(uid).get()
      .then(fDoc => {
        console.log('data', fDoc.data());
        if (learning === '') throw 'Please input some learning';
        const learningsList = fDoc.data().learnings;
        usersRef.doc(uid).update({
          learnings: [...learningsList, newLearningItem]
        }).then((response) => {
          setLearning('');
          setTags({ tag: '', tagsArray: [] });
          navigation.navigate('Success', { uid });
        }).catch(error => {
          alert(error);
        });
      }).catch(error => {
        alert(error);
      });
  };

  const viewLearning = () => {
    navigation.navigate('Timeline', { uid: route.params.uid });
  };

  return (
    <Fragment>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={'#80c905'} />
        <KeyboardAwareScrollView
          style={{ width: '100%' }}
          keyboardShouldPersistTaps="always">
          <View style={styles.learningSection}>
            <View style={styles.titleSection}>
              <Text adjustsFontSizeToFit style={styles.welcomeTitle}>Welcome Learner,</Text>
              <TouchableOpacity onPress={viewLearning}>
                <Text adjustsFontSizeToFit style={styles.navLink}>Timeline</Text>
              </TouchableOpacity>
            </View>
            <Text adjustsFontSizeToFit style={styles.questionText}>What did you learn today?</Text>
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
              <Text adjustsFontSizeToFit style={styles.saveButtonText}>Save Learnings</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'column',
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
  learningSection: {
    margin: 16,
  },
  questionText: {
    marginTop: 24,
    fontSize: RFValue(48),
    fontWeight: 'bold',
  },
  learningText: {
    marginTop: 36,
    marginBottom: 24,
    fontSize: RFValue(26),
    borderColor: 'gray',
    borderRadius: 32,
    borderStyle: 'dotted',
    borderWidth: 4,
    height: 260,
    lineHeight: 34,
    paddingTop: 24,
    includeFontPadding: true,
    textAlignVertical: 'top'
  },
  welcomeTitle: {
    marginTop: 8,
    marginBottom: 12,
    fontSize: RFValue(22),
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
    fontSize: RFValue(18),
  },
  tagInput: {
    fontSize: RFValue(20),
    margin: 4
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
    fontSize: RFValue(24),
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
    fontSize: RFValue(16),
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#80c905',
    backgroundColor: '#80c90528'
  }
});

export default Home;
