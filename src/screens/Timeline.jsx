import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TimelineList from 'react-native-timeline-flatlist'
import firestore from '@react-native-firebase/firestore';

const formatData = (data) => data.reverse().çmap(d => {
  const date = new Date(d.date).toDateString();
  return {
    time: date.substring(date.indexOf(' ') + 1),
    description: d.learningText,
    title: d.tags
  };
});

const Timeline = ({ route, navigation }) => {
  const [timelineData, setTimelineData] = useState([]);

  useEffect(() => {
    const usersRef = firestore().collection('users');
    const uid = route.params.uid;
    usersRef.doc(uid).get()
      .then(fDoc => {
        console.log('data', fDoc.data(), uid);
        const learningsList = fDoc.data().learnings;
        setTimelineData(formatData(learningsList));
      }).catch(error => {
        alert(error);
      });
  }, []);

  const renderDetail = (rowData, sectionID, rowID) => {
    let title = <Text style={[styles.rowTitle]}>{rowData.time}</Text>
    var desc = null
    if (rowData.description)
      desc = (
        <View style={styles.descriptionContainer}>
          <Text style={[styles.textDescription]}>{rowData.description}</Text>
        </View>
      )

    return (
      <View style={{ flex: 1 }}>
        {title}
        {desc}
      </View>
    )
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Your learning timeline:</Text>
      <TimelineList
        style={styles.timelineStyle}
        data={timelineData}
        circleSize={25}
        circleColor='#80c905'
        lineColor='#80c905'
        lineWidth={4}
        innerCircle={'dot'}
        timeContainerStyle={styles.timeContainerStyle}
        timeStyle={styles.timeStyle}
        showTime={false}
        renderDetail={renderDetail}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    width: '100%'
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    margin: 16
  },
  timelineStyle: {
    margin: 8,
    marginTop: 24
  },
  timeContainerStyle: {
    minWidth: 74,
    marginLeft: -22,
    marginTop: -2
  },
  descriptionContainer: {
    padding: 16,
    backgroundColor: '#80c905',
    borderRadius: 16,
    margin: 8
  },
  textDescription: {
    fontSize: 18,
    color: 'white',
  },
  rowTitle: {
    padding: 8,
    fontWeight: 'bold',
    fontSize: 16,
    // textTransform: 'uppercase',
    marginTop: -16
  }
  // timeStyle: {
  //   textAlign: 'center',
  //   backgroundColor:'#ff9797',
  //   color: 'white',
  //   padding: 5,
  //   borderRadius: 13,
  //   marginLeft: 32,
  // }
});

export default Timeline;
