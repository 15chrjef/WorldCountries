import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Text,
  View,
  ListView,
  Dimensions,
  Picker,
} from 'react-native';
import {
  ExponentLinksView,
} from '@exponent/samples';
import Title from '../components/title.js'
import PickModal from '../components/pickModal.js'
var {height, width} = Dimensions.get('window');


export default class LinksScreen extends React.Component {
  constructor(){
    super()
    this.state = {
      text: '',
      results: '',
      error: false,
      picker: 'name',
      modalVisible: false
    }
  this.Search = this.Search.bind(this)
  this.ModalChoice = this.ModalChoice.bind(this)
  }
  static route = {
    navigationBar: {
      visible: false,
    }
  }
  Search() {
    var self = this;
    fetch(`https://restcountries.eu/rest/v1/${self.state.picker}/${self.state.text.toLowerCase()}`)
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
              console.log('selfselfselfself', self.state)
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
      console.log('selfselfselfself', self.state)
    })
    .catch(function(err) {
      console.error(err)
    })
  }
   ModalChoice(input){
    console.log('input',input)
    this.setState({
      picker: input,
      modalVisible: !this.state.modalVisible
    })
  }
  renderResults(){
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    if(this.state.results !== '' && this.state.error === false) {
          console.log('here')
      return (
        <View style={{alignItems: 'center', marginTop: 30}}>
          <Text style={{color:'rgb(26,163,219)',fontWeight: 'bold', fontSize: 20}}>Search Results</Text>
          <ListView 
            contentContainerStyle={{alignItems: 'center', height: height * 1.1}}
            dataSource={ds.cloneWithRows(this.state.results)}
            renderRow={(rowData) => <Text>{rowData}</Text>}
            />
        </View>
      )
    } else if(this.state.error === true) {
      return (
        <Text style={{color: 'red', marginTop: 20}}>No Results Found!</Text>
      )
    }
  }
  render() {
    var self = this;
      return (
         <View>
          <Title/>
            <View style={styles.body}>
              <Text style={{fontWeight: 'bold', fontSize: 17, color:'rgb(26,163,219)'}}>Find a Country</Text>
              <Text style={{fontWeight: 'bold', fontSize: 17, color:'rgb(26,163,219)'}}>Searching by {this.state.picker}</Text>
              <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1, width: width * .9 , alignSelf: 'center'}}
                placeholder='Search Here...'
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
                />
              <View style={{flexDirection:'row', justifyContent: 'space-between', width: width * .7}}>
                <TouchableHighlight 
                  style={{marginTop: 20,height: 30, justifyContent: 'center', backgroundColor: 'rgb(26,163,219)', width: 135}} 
                  onPress={function(){
                    self.setState({
                      modalVisible: true
                    })}
                  }
                  >
                  <Text style={{fontSize:16,fontWeight: 'bold', alignSelf: 'center', color: 'white'}}>Select Category</Text>
                </TouchableHighlight>
                <TouchableHighlight 
                  style={{marginTop: 20,height: 30, justifyContent: 'center', backgroundColor: 'rgb(26,163,219)', width: 125}} 
                  onPress={this.Search}
                  >
                  <Text style={{fontSize:16, fontWeight: 'bold',alignSelf: 'center', color: 'white'}}>Search Now!</Text>
                </TouchableHighlight>
              </View>
              <PickModal 
                picker={this.state.picker} 
                modalVisible={this.state.modalVisible} 
                modalChoice={this.ModalChoice.bind(this)} 
                />
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
    alignItems: 'center',
  }
});
