import React from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ListView,
  Dimensions
} from 'react-native';
var {height, width} = Dimensions.get('window');
import { MonoText } from '../components/StyledText';
import Title from '../components/title.js'
import PickCountry from '../components/pickCountry'
export default class HomeScreen extends React.Component {
  constructor(){
    super()
    this.state = {
      names: '',
      country: ''
    }
    this.displayInfo = this.displayInfo.bind(this);
  }
  componentWillMount() {
    let self = this;
    fetch('https://restcountries.eu/rest/v1/all')
    .then(function(countries) {
      var names = []
      JSON.parse(countries._bodyInit).forEach(function(country) {
        names.push(country)
      })
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      names = ds.cloneWithRows(names),
      self.setState({
        names: names
      })
    })
  }
  displayInfo(country){
    if(this.state.country === '') {
      this.setState({
        country: country
      })
    } else {
      this.setState({
        country: ''
      })
    }
  }
  render() {
    var self = this;
    if(this.state.country !== '') {
      let country = this.state.country
      return(
        <PickCountry displayInfo={this.displayInfo} country={country}/>
      )
    } else if(this.state.names !== '') {
      return (
        <View>
          <Title/>
            <View style={styles.ListView}>
              <Text style={{fontWeight: 'bold', fontSize: 20, color:'rgb(26,163,219)', marginBottom: 10}}>Select a  Country</Text>
              <ListView
                initialListSize={180}
                contentContainerStyle={styles.List}
                dataSource={this.state.names}
                renderRow = {(country) => (
                  <TouchableOpacity 
                    style={{marginBottom: 10, marginRight: 20}} 
                    onPress={function(){self.displayInfo(country)}}
                    >
                    <Text style={{fontWeight: 'bold',fontSize: 20}}>
                      {country.name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
        </View>
      );
    } else {
      return (
        <View style={styles.ListView}>
          <Text>Loading...</Text>
        </View>
      )
    }
  }
}


const styles = StyleSheet.create({
  ListView: {
    height: height * .8,
    alignItems: 'center',
  },
  listRow: {
    flexDirection: 'row',
    marginTop: 10
  },
  List: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width * .8,
    marginTop: 15,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  return: {
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 4,
    marginTop: 15,
  },
  select: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {height: -3},
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
