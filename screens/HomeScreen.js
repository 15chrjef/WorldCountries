import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ListView,
  Dimensions,
  ActivityIndicator
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
      country: '',
      animating: true
    }
    this.displayInfo = this.displayInfo.bind(this);
  }
  componentWillMount() {
    let self = this;
    fetch('https://restcountries.eu/rest/v1/all')
    .then(function(countries) {
      var names = []
      JSON.parse(countries._bodyInit).forEach(function(country) {
        country.flag = `http://www.geognos.com/api/en/countries/flag/${country.alpha2Code}.png`
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
        country: country,
        animating: false
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
            <View style={styles.ListViewContainer}>
              <Text style={{fontWeight: 'bold', fontSize: 25, color:'rgb(26,163,219)', marginBottom: 10}}>Select a  Country</Text>
              <ListView
                initialListSize={180}
                contentContainerStyle={styles.ListView}
                dataSource={this.state.names}
                renderRow = {(country) => (
                  <TouchableOpacity 
                    style={{marginBottom: 10, marginRight: 20, paddingLeft: 5, paddingRight: 5, borderRadius: 2, backgroundColor:'rgba(26,163,219,.4)' }} 
                    onPress={function(){self.displayInfo(country)}}
                    >
                    <Text style={{textAlign: 'center',fontSize: 20, color: 'white'}}>
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
        <View style={styles.loading}>
          <Text style={{fontSize: 30}}>Loading...</Text>
            <ActivityIndicator
            animating={this.state.animating}
            style={{height: 80}}
            size="large"
            />
        </View>
      )
    }
  }
}


const styles = StyleSheet.create({
  loading: {
    marginTop: height * .5 - 16,
    justifyContent: 'center' ,
    alignItems: 'center'
  },
  ListViewContainer: {
    marginTop: -20,
    height: height * .8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listRow: {
    overflow: 'hidden',
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ListView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width * .8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 25
  },
});
