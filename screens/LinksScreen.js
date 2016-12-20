import React from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ListView,
  Dimensions,
  Picker,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import {
  ExponentLinksView,
} from '@exponent/samples';
import Title from '../components/title.js'
import PickModal from '../components/pickModal.js'
import Colors from '../constants/Colors';
import {
  FontAwesome,
} from '@exponent/vector-icons';
import PickCountry from '../components/pickCountry.js'
var {height, width} = Dimensions.get('window');


export default class LinksScreen extends React.Component {
  constructor(){
    super()
    this.state = {
      text: '',
      results: '',
      error: false,
      picker: 'name',
      pickerLabel: 'Name',
      modalVisible: false,
      country: '',
      animating: false
    }
  this.Search = this.Search.bind(this)
  this.ModalChoice = this.ModalChoice.bind(this)
  this.displayInfo = this.displayInfo.bind(this)
  }
  Search() {
    var self = this;
    self.setState({
      text: '',
      animating: true,
      error: ''
    })
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
      } else if(Array.isArray(myResponse))  {
        let realNames = [];
        myResponse.forEach(function(country) {
          country.flag = `http://www.geognos.com/api/en/countries/flag/${country.alpha2Code}.png`
          realNames.push(country)
        })
        self.setState({
          results: realNames,
          error: false,
          animating: false
        })
      } else if(myResponse.name){
        self.setState({
          results: [myResponse],
          error: false,
          animating: false
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
   ModalChoice(value){
      var label;
      if(value === 'lang'){
        label = 'Language'
      } else if(value === 'name') {
        label = 'Name'
      } else {
        label = 'Currency'
      }
      this.setState({
      picker: value,
      pickerLabel: label,
      modalVisible: !this.state.modalVisible
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
  renderResults(){
    var self = this;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    if(this.state.results !== '' && this.state.error === false) {
      return (
        <View style={styles.ListViewContainer}>
          <ListView 
            initialListSize={180}
            contentContainerStyle={styles.ListView} 
            dataSource={ds.cloneWithRows(this.state.results)}
            renderRow={(country) => (
              <TouchableOpacity 
                style={{marginBottom: 10, marginRight: 20, paddingLeft: 5, paddingRight: 5, borderRadius: 2, backgroundColor:'rgba(26,163,219,.4)' }} 
                onPress={function(){self.displayInfo(country)}}
                >
                  <Text style={{textAlign: 'center', color: 'white', fontSize: 20}}>
                    {country.name}
                  </Text>
              </TouchableOpacity>
            )}
            />
        </View>
      )
    } else if(this.state.error === true) {
      return (
        <Text style={{fontSize: 20, color: 'red', marginTop: 20}}>No Results Found!</Text>
      )
    } else {
      return (
        <ActivityIndicator
          animating={self.state.animating}
          style={{height: 80}}
          size="large"
          />
      )
    }
  }
  render() {
    var self = this;
    if(this.state.country !== '') {
      let country = this.state.country
      return(
        <PickCountry country={country} displayInfo={self.displayInfo}/>
      )
    } else {
      return (
         <View>
          <Title/>
            <View style={styles.body}>
              <Text style={{marginTop: -20, fontWeight: 'bold', fontSize: 25, color:'rgb(26,163,219)'}}>Find a Country</Text>
              <Text style={{fontWeight: 'bold', fontSize: 17, color:'rgb(26,163,219)', marginBottom: -10}}>Searching by {this.state.pickerLabel}</Text>
              <View style={{ marginTop: 20, paddingLeft: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderColor: 'gray', borderWidth: 1,borderRadius: 20, width: width * .8 , height: 40, alignSelf: 'center'}}>
               <FontAwesome
                  name={'language'}
                  size={25}
                  color={Colors.tabIconDefault}
                  />
                <TextInput
                  style={{paddingLeft: 10, width: width * .8, height: 40}}
                  underlineColorAndroid='transparent'
                  placeholder='Search Here...'
                  onChangeText={(text) => this.setState({text})}
                  value={this.state.text}
                  />
              </View>
              <View style={{flexDirection:'row', marginTop: -15, justifyContent: 'space-between', width: width * .6}}>
                <TouchableOpacity 
                  style={{marginTop: 20,height: 30, borderWidth: 1, justifyContent: 'center', borderColor: 'gray', borderRadius: 10, width: 100}} 
                  onPress={function(){
                    self.setState({
                      modalVisible: true
                    })}
                  }
                  >
                  <Text style={{fontSize:18, alignSelf: 'center', color:'rgb(26,163,219)'}}>Category</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={{marginTop: 20,height: 30, borderWidth: 1, justifyContent: 'center', borderColor: 'gray', borderRadius: 10, width: 100}} 
                  onPress={this.Search}
                  >
                  <Text style={{fontSize:18,alignSelf: 'center', color:'rgb(26,163,219)'}}>Search</Text>
                </TouchableOpacity>
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
}
const styles = StyleSheet.create({
  ListViewContainer: {
    marginTop: 10,
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
    paddingBottom: 180
  },
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

