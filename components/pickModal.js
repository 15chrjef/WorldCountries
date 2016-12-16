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
		console.log('this.props.modalChoice',this.props)
		var self = this;
    return (
			<View style={{backgroundColor: 'background:rgba(0,0,0, 1)'}}>
				<Modal
          animationType={"fade"}
          transparent={true}
          visible={this.props.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{height: height, justifyContent: 'center', backgroundColor: 'background:rgba(0,0,0, .4)'}}>
          <Picker
						selectedValue={this.props.picker}
						onValueChange={function(value){self.props.modalChoice(value)}}
						>
						<Picker.Item label="Name" value="name" />
						<Picker.Item label="Language" value="lang" />
						<Picker.Item label="Currency" value="currency" />
					</Picker>
         </View>
        </Modal>
			</View>
    );
  }
}
