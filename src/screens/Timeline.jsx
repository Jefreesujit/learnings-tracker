import React, { useState, useCallback, useEffect, Fragment } from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, StatusBar, Platform } from 'react-native';
import TimelineList from 'react-native-timeline-flatlist';
import InsetShadow from 'react-native-inset-shadow'
import firestore from '@react-native-firebase/firestore';
import { RFValue } from "react-native-responsive-fontsize";

const formatData = (data) => data.reverse().map(d => {
  // const date = new Date(d.date).toDateString();
  let day, month, date, time, year;

  if (Platform.OS == 'android') {
    [
      day, month, date, time, year,
    ] = new Date(d.date).toLocaleString().split(' ');
  } else {
    [
      day, month, date, year, time,
    ] = new Date(d.date).toString().split(' ');
  }

  time = time.split(':').slice(0, 2).join(':');
  const timeString = `${time}, ${month} ${date} ${year}`;

  return {
    time: timeString,
    description: d.learningText,
    tags: d.tags.tagsArray
  };
});

const Timeline = ({ route, navigation }) => {
  const [timelineData, setTimelineData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [search, setSearch] = useState('');

  const handleTagClick = useCallback((tag) => {
    setSearch(tag);
    // console.log('timelineData', timelineData, search);
    // handleSearch(tag);
  }, [timelineData, search, setSearch]);

  const handleSearch = useCallback((searchTag) => {
    // console.log('search', searchTag);
    const searchString = searchTag.trim().toLowerCase();
    console.log(search, searchString);
    if (searchString !== '') {
      // console.log('timelineData', timelineData);
      const filterData = timelineData.filter(data => {
        // console.log('inside filter', data);
        const desc = data.description.toLowerCase();
        const tags = data.tags.map(tag => tag.toLowerCase());
        if (desc.indexOf(searchString) !== -1) {
          return true;
        } else if (tags.find(tag => tag.includes(searchString))) {
          return true;
        } else {
          return false;
        }
      });
      setDisplayData(filterData.reverse());
    } else {
      setDisplayData(timelineData.reverse());
    }
  }, [timelineData, search]);

  useEffect(() => {
    // console.log('route.params timeline', route.params);
    const usersRef = firestore().collection('users');
    const uid = route.params.uid;
    usersRef.doc(uid).get()
      .then(fDoc => {
        // console.log('data', fDoc.data(), uid);
        const learningsList = fDoc.data().learnings.reverse();
        setTimelineData(formatData(learningsList));
        setDisplayData(formatData(learningsList));
      }).catch(error => {
        alert(error);
      });
  }, []);

  const renderDetail = useCallback((rowData, sectionID, rowID) => {
    let title = <Text adjustsFontSizeToFit style={[styles.rowTitle]}>{rowData.time}</Text>
    let tags = null;
    var desc = null;
    if (rowData.description) {
      desc = (
        <View style={styles.descriptionContainer}>
          <Text adjustsFontSizeToFit style={[styles.textDescription]}>{rowData.description}</Text>
        </View>
      )
    }
    if (rowData.tags) {
      const tagChips = rowData.tags.map(tag => <Text adjustsFontSizeToFit onPress={() => { /* handleTagClick(tag) */ }} style={[styles.tag]}>{tag}</Text>);
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
  }, [handleTagClick]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'#80c905'} />
      <Text adjustsFontSizeToFit style={styles.sectionTitle}>Timeline</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder='Search'
          // value={search}
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => handleSearch(text)}
          autoCapitalize="none"
        />
      </View>
      <InsetShadow bottom={false} right={false} left={false}>
        <TimelineList
          style={styles.timelineStyle}
          data={displayData}
          circleSize={25}
          circleColor='#80c905'
          lineColor='#80c905'
          lineWidth={4}
          innerCircle={'dot'}
          listViewContainerStyle={styles.listViewContainer}
          timeContainerStyle={styles.timeContainerStyle}
          timeStyle={styles.timeStyle}
          showTime={false}
          renderDetail={renderDetail}
        />
      </InsetShadow>
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
    paddingLeft: 0,
    paddingRight: 0,
    width: '100%'
  },
  searchContainer: {
    margin: 16,
    marginBottom: 24,
  },
  tagsContainer: {
    flexDirection: 'row',
    display: 'flex',
    marginLeft: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: RFValue(24),
    marginLeft: 32,
    marginTop: 150,
    marginBottom: 8,
  },
  timelineStyle: {
    margin: 24,
    marginTop: 0
  },
  timeContainerStyle: {
    minWidth: 74,
    marginLeft: -22,
    marginTop: -20,
  },
  listViewContainer: {
    marginTop: 24,
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
    borderColor: '#aaaaaa',
    borderWidth: 1,
    fontSize: RFValue(16),
  },
  tag: {
    borderColor: '#80c905',
    height: 32,
    color: '#80c905',
    fontSize: RFValue(16),
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    margin: 4,
    fontWeight: 'bold',
  },
  textDescription: {
    fontSize: RFValue(18),
    color: 'white',
  },
  rowTitle: {
    padding: 8,
    fontWeight: 'bold',
    fontSize: RFValue(16),
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
