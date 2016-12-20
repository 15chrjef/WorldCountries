import React from 'react';
import {
  ScrollView,
  StyleSheet,
	View,
	Picker,
	Modal,
	Text,
	TouchableHighlight,
	Dimensions
} from 'react-native';
var {height, width} = Dimensions.get('window');


export default class SettingsScreen extends React.Component {
	constructor(){
		super()
	}
  render() {
		var self = this;
    return (
			<View style={{backgroundColor: 'background:rgba(0,0,0, 1)'}}>
				<Modal
          animationType={"fade"}
          transparent={true}
          visible={this.props.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{height: height, justifyContent: 'center', backgroundColor: 'rgba(200,200,219,.85)'}}>
          <Picker
						selectedValue={this.props.picker}
						onValueChange={function(value){self.props.modalChoice(value)}}
						>
						<Picker.Item style={{color: 'white'}} label="Name" value="name" />
						<Picker.Item style={{color: 'white'}} label="Language" value="lang" />
						<Picker.Item style={{color: 'white'}} label="Currency" value="currency" />
					</Picker>
         </View>
        </Modal>
			</View>
    );
  }
}
