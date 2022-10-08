import React, { useState, useCallback, useEffect, Fragment } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView,
  StatusBar,
  Platform,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import TimelineList from 'react-native-timeline-flatlist';
import InsetShadow from 'react-native-inset-shadow'
import firestore from '@react-native-firebase/firestore';
import { RFValue } from "react-native-responsive-fontsize";

const formatData = (data) => data.reverse().map(d => {
  // const date = new Date(d.date).toDateString();
  let day, month, date, time, year, blank;

  if (Platform.OS == 'android') {
    [
      day, month, blank, date, time, year,
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
  const [refreshing, setRefreshing] = useState(false);

  const addLearning = () => {
    navigation.navigate('Home', { uid: route.params.uid, name: route.params.name });
  };

  const timelinePrefix = route.params.name ? `${route.params.name.split(' ')[0].substring(0, 8)}'s ` : '';

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    const usersRef = firestore().collection('users');
    const uid = route.params.uid;
    usersRef.doc(uid).get()
      .then(fDoc => {
        // console.log('data', fDoc.data(), uid);
        const learningsList = fDoc.data().learnings.reverse();
        setTimelineData(formatData(learningsList));
        setDisplayData(formatData(learningsList));
        setRefreshing(false);
      }).catch(error => {
        alert(error);
      });
  }, []);

  const sortData = useCallback(() => {
    const reversedData = [...displayData].reverse();
    setDisplayData(reversedData);
  });

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
    setRefreshing(true);
    const usersRef = firestore().collection('users');
    const uid = route.params.uid;
    usersRef.doc(uid).get()
      .then(fDoc => {
        // console.log('data', fDoc.data(), uid);
        const learningsList = fDoc.data().learnings.reverse();
        setTimelineData(formatData(learningsList));
        setDisplayData(formatData(learningsList));
        setRefreshing(false);
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

  const { colors } = useTheme();
  const styles = themedStyles(colors);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'#80c905'} />
      <View style={styles.searchContainer}>
        <View style={styles.titleSection}>
          <Text adjustsFontSizeToFit style={styles.sectionTitle}>{timelinePrefix}Timeline</Text>
          <TouchableOpacity style={styles.sortButton} onPress={sortData}>
            <Image
              style={styles.sortIcon}
              source={require('../../assets/sort-icon.png')}
            />
            {/* <Text adjustsFontSizeToFit style={styles.sortButton}>🔃 Sort</Text> */}
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder='🔍 Search'
          // value={search}
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => handleSearch(text)}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.timelineContainer}>
        <InsetShadow containerStyle={styles.insetStyle} bottom={false} right={false} left={false}>
          {(!refreshing && timelineData.length === 0) ? (
            <View style={styles.noDataContainer}>
              <Text style={styles.noData}>No Learnings Found</Text>
              <Text style={styles.noDataCaption}>Click the button below to add your first learning!</Text>
              <TouchableOpacity onPress={addLearning}>
                <Text adjustsFontSizeToFit style={styles.navLink}>Add Learnings</Text>
              </TouchableOpacity>
            </View>
          ): (
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
            options={{
              refreshControl: (
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              ),
            }}
          />
          )}
        </InsetShadow>
      </View>
    </View>
  );
}

const themedStyles = theme => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    // alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    paddingLeft: 0,
    paddingRight: 0,
    width: '100%'
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
    alignItems: 'center',
    color: theme.text,
  },
  sortButton: {
    marginTop: 12,
    marginBottom: 12,
    padding: 6,
    fontSize: RFValue(16),
    color: '#80c905',
    // backgroundColor: '#80c90528',
    // textTransform: 'uppercase',
    fontWeight: 'bold',
    marginRight: 28,
    // marginLeft: 24,
    marginTop: 160,
    borderWidth: 2,
    borderColor: '#80c905',
    borderRadius: 6,
  },
  sortIcon: {
    width: 26,
    height: 22,
    padding: 4,
  },
  timelineContainer: {
    marginBottom: 150,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
    alignItems: 'center'
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
    marginBottom: 16,
    paddingTop: 16,
    textTransform: 'capitalize',
    color: theme.text,
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
  insetStyle: {
    marginBottom: 48,
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
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: theme.background,
    color: theme.text,
    // marginTop: 10,
    // marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
    borderColor: '#80c905',
    borderWidth: 2,
    fontSize: RFValue(16),
  },
  tag: {
    borderColor: '#80c905',
    height: 32,
    color: '#80c905',
    fontSize: 16,
    borderWidth: 2,
    borderRadius: 10,
    padding: 3,
    paddingLeft: 6,
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
    marginTop: -16,
    color: theme.text,
  },
  noDataContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
  },
  noData: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'gray',
  },
  noDataCaption: {
    margin: 20,
    fontSize: 16,
    color: 'gray',
    marginLeft: 80,
    marginRight: 80,
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
  },
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
