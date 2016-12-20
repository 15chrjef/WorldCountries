import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native';
import {
  ExponentLinksView,
} from '@exponent/samples';
import Title from '../components/title.js'
var {height, width} = Dimensions.get('window');

export default class LinksScreen extends React.Component {
  render() {
    console.log(this.props.country.flag)
		return(
			<View>
				<Title/>
				<View style={styles.select}>
          <View style={styles.listRow}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>Name: </Text>
            <Text style={{fontSize: 20}}>{this.props.country.name}</Text>
          </View>
					<View style={styles.listRow}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>Languages: </Text>
            <Text style={{fontSize: 20}}>{this.props.country.languages}</Text>
          </View>
					<View style={styles.listRow}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>Capital: </Text>
            <Text style={{fontSize: 20}}>{this.props.country.capital}</Text>
          </View>
					<View style={styles.listRow}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>Sub-Region: </Text>
            <Text style={{fontSize: 20}}>{this.props.country.subregion}</Text>
          </View>
					<View style={styles.listRow}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>Region: </Text>
            <Text style={{fontSize: 20}}>{this.props.country.region}</Text>
          </View>
					<View style={styles.listRow}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>NativeName: </Text>
            <Text style={{fontSize: 20}}>{this.props.country.nativeName}</Text>
          </View>
          <Image style={{marginTop: 10, marginBottom: 10, width: 200, height: 100}} source={{uri: this.props.country.flag}}/>
					<TouchableOpacity 
            onPress={this.props.displayInfo} 
            style={styles.return}
            >
            <Text style={{fontSize:20, fontWeight: 'bold',alignSelf: 'center', color: 'white'}}>Return to Countries</Text>
          </TouchableOpacity>
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
  },
  select: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
   return: {
    marginBottom: 10, 
    paddingLeft: 5,
    paddingRight: 5, 
    borderRadius: 2, 
    backgroundColor:'rgba(26,163,219,.4)'
  },
    listRow: {
    flexDirection: 'row',
    marginTop: 10
  }
});
