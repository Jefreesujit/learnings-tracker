import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import TimelineList from 'react-native-timeline-flatlist'
import firestore from '@react-native-firebase/firestore';

const formatData = (data) => data.reverse().map(d => {
  const date = new Date(d.date).toDateString();
  const time = new Date(d.date).toLocaleString('en-US', {
    hour: 'numeric', minute: 'numeric', hour12: true,
  });
  return {
    time: `${time}, ${date.substring(date.indexOf(' ') + 1)}`,
    description: d.learningText,
    tags: d.tags.tagsArray
  };
});

const Timeline = ({ route, navigation }) => {
  const [timelineData, setTimelineData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  // const [search, setSearch] = useState('');

  const handleSearch = (search) => {
    const searchString = search.trim().toLowerCase();
    console.log(search, searchString);
    if (searchString !== '') {
      const filterData = timelineData.filter(data => {
        const desc = data.description.toLowerCase();
        const tags = data.tags.map(tag => tag.toLowerCase());
        if (desc.indexOf(searchString) !== -1) {
          return true;
        } else if (tags.indexOf(searchString) !== -1) {
          return true;
        } else {
          return false;
        }
      });
      setDisplayData(filterData.reverse());
    } else {
      setDisplayData(timelineData.reverse());
    }
  };

  useEffect(() => {
    const usersRef = firestore().collection('users');
    const uid = route.params.uid;
    usersRef.doc(uid).get()
      .then(fDoc => {
        // console.log('data', fDoc.data(), uid);
        const learningsList = fDoc.data().learnings.reverse();
        setTimelineData(formatData(learningsList));
        setDisplayData(formatData(learningsList));
        console.log('Set data');
      }).catch(error => {
        alert(error);
      });
  }, []);

  const renderDetail = (rowData, sectionID, rowID) => {
    let title = <Text style={[styles.rowTitle]}>{rowData.time}</Text>
    let tags = null;
    var desc = null;
    if (rowData.description) {
      desc = (
        <View style={styles.descriptionContainer}>
          <Text style={[styles.textDescription]}>{rowData.description}</Text>
        </View>
      )
    }
    if (rowData.tags) {
      const tagChips = rowData.tags.map(tag => <Text style={[styles.tag]}>{tag}</Text>);
      tags = (
        <View style={styles.tagsContainer}>
          {tagChips}
        </View>
      )
    }

    return (
      <View style={{ flex: 1 }}>
        {title}
        {desc}
        {tags}
      </View>
    )
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Timeline</Text>
      <TextInput
        style={styles.input}
        placeholder='Search'
        // value={search}
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => handleSearch(text)}
        autoCapitalize="none"
      />
      <TimelineList
        style={styles.timelineStyle}
        data={displayData}
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
  tagsContainer: {
    flexDirection: 'row',
    display: 'flex',
    marginLeft: 10,
    marginBottom: 10,
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
  input: {
    height: 40,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    // marginTop: 10,
    // marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 16
  },
  tag: {
    borderColor: '#80c905',
    height: 32,
    color: '#80c905',
    fontSize: 16,
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    margin: 4,
    fontWeight: 'bold',
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
