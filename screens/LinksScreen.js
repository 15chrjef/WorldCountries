import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Text,
  View,
  ListView,
  Dimensions
} from 'react-native';
import {
  ExponentLinksView,
} from '@exponent/samples';
var {height, width} = Dimensions.get('window');


export default class LinksScreen extends React.Component {
  constructor(){
    super()
    this.state = {
      text: '',
      results: '',
      error: false
    }
    this.search = this.search.bind(this);
  }
  static route = {
    navigationBar: {
      visible: false,
    }
  }
  search() {
    var self = this;
    fetch(`https://restcountries.eu/rest/v1/name/${self.state.text}`)
    .then(function(response) {
      if(response.status === '404' || response.status === 404) {
        self.setState({
          error: true,
          results: ''
        })
        return 'error';
      } else {
         return JSON.parse(response._bodyInit)
      }
    })
    .then(function(myResponse) {
      if(myResponse === 'error'){
        return;
      } else if(Array.isArray(myResponse))  {
        let realNames = [];
        myResponse.forEach(function(country) {
          realNames.push(country.name)
        })
        self.setState({
          results: realNames,
          error: false
        })
      } else if(myResponse.name){
        self.setState({
          results: [myResponse],
          error: false
        })
      } else {
        self.setState({
          results: '',
          error: true
        })
      }
    })
    .catch(function(err) {
      console.error(err)
    })
  }
  renderResults(){
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    if(this.state.results !== '' && this.state.error === false) {
      return (
        <View style={{alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 20, marginBottom: 10, marginTop: 10}}>Search Results</Text>
          <ListView 
            contentContainerStyle={{alignItems: 'center'}}
            dataSource={ds.cloneWithRows(this.state.results)}
            renderRow={(rowData) => <Text>{rowData}</Text>}
            />
        </View>
      )
    } else if(this.state.error === true) {
      return (
        <Text style={{color: 'red'}}>No Results Found!</Text>
      )
    }
  }
  render() {
      return (
         <View style={styles.container}>
          <Text>Find a Country</Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            placeholder='search here'
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            />
          <View style={styles.body}>
            <TouchableHighlight 
              style={{marginTop: 20, borderWidth: 1, borderLeftColor: 'black', width: 85}} 
              onPress={this.search  }
              >
              <Text>Search Now!</Text>
            </TouchableHighlight>
            {this.renderResults()}
          </View>
        </View>
      )
    }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    width: width * .9,
    alignItems: 'center',
    alignSelf: 'center'
  },
  body: {
    alignItems: 'center'
  }
});
