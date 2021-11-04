import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TimelineList from 'react-native-timeline-flatlist'

const data = [
  { time: 'Oct 30, 2021', title: 'Event 1', description: 'Event 1 Description Event 1 Description Event 1 Description Event 1 Description' },
  { time: 'Oct 29, 2021', title: 'Event 2', description: 'Event 2 Description Event 1 Description Event 1 Description' },
  { time: 'Oct 29, 2021', title: 'Event 3', description: 'Event 3 Description Event 1 Description' },
  { time: 'Oct 27, 2021', title: 'Event 4', description: 'Event 4 Description Event 1 Description Event 1 Description Event 1 Description' },
  { time: 'Oct 24, 2021', title: 'Event 5', description: 'Event 5 Description Event 1 Description' },
  { time: 'Oct 20, 2021', title: 'Event 6', description: 'Event 1 Description Event 1 Description Event 1 Description Event 1 Description' },
  { time: 'Oct 19, 2021', title: 'Event 7', description: 'Event 2 Description Event 1 Description Event 1 Description' },
  { time: 'Oct 19, 2021', title: 'Event 8', description: 'Event 3 Description Event 1 Description' },
  { time: 'Oct 17, 2021', title: 'Event 9', description: 'Event 4 Description Event 1 Description Event 1 Description Event 1 Description' },
  { time: 'Oct 14, 2021', title: 'Event 10', description: 'Event 5 Description Event 1 Description' }
];

const Timeline = () => {

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
        data={data}
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
    margin: 24,
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
