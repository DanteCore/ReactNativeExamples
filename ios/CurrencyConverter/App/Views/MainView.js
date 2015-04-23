'use strict'

var React = require('react-native'),
	CurrencyView = require('./CurrencyView'),
	Utils = require('../Utils/utils'),
	api = require('../API/api'),
	HUDActivityIndicator = require('../Components/HUDActivityIndicator.ios');


var ActionSheetIOS = require('ActionSheetIOS');


var {
	TextInput,
	StyleSheet,
	View,
	Text,
	Image,
	TouchableHighlight,
	ActivityIndicatorIOS
} = React;


var MainView = React.createClass({
	componentDidMount : function(){

	},
	getInitialState: function() {

	    return {
	    	isLoading: true,
	    	inputValue : '1',
	    	fromKey : 'USD',
	    	toKey : 'INR',
	    	outputValue : '12345678'
	    };
	},
	navigateToCurrencyView : function(callback){
		var currency = Utils.currency;
		var self = this;
		self.props.navigator.push({
			title: "Currency",
			component: CurrencyView,
			passProps: {currency: currency, onSelect : callback},
		});
	},
	handleFromButtonPressed : function(){
		var self = this;
		this.navigateToCurrencyView(function(key){
			self.state.fromKey = key;
		});
	},
	handleToButtonPressed : function(){
		var self = this;
		this.navigateToCurrencyView(function(key){
			self.state.toKey = key;
		});
	},
	handleConvertButtonPressed : function(){
		this.setState({outputValue: this.state.inputValue * 62 });

	},
	handleSwitchButtonPressed : function(){
		var from = this.state.fromKey,
			to = this.state.toKey;

			console.log(from + " " + to);
		this.setState({fromKey: to});
		this.setState({toKey: from});
	},
	onSearchTextChanged : function(event){
		this.setState({inputValue: event.nativeEvent.text});
	},
	render: function() {
		var spinner = this.state.isLoading ? (<HUDActivityIndicator />) : (<View />);

		return (
		<View style={styles.container}>
			<View style={styles.innerContainer}>
				<Text style={styles.buttonText}>Enter Currency Amount</Text>
			  <TextInput keyboardType="decimal-pad"
			  	value={this.state.inputValue}
			  	onChange={this.onSearchTextChanged.bind(this)} 
			    style={styles.textInput} />

			    <View style={styles.horContainer1}>
					<View style={styles.fromContainer}>
						<Text style={styles.buttonText}>From</Text>
					  	<TouchableHighlight style={[styles.button]} underlayColor='#99d9f4' onPress={this.handleFromButtonPressed}>
					    	<Text style={styles.buttonText}>{this.state.fromKey}</Text>
					  	</TouchableHighlight>
					</View>

					<View style={styles.switchContainer}>
						<TouchableHighlight style={styles.test} underlayColor='#99d9f4' onPress={this.handleSwitchButtonPressed}>
					    	<Image style={styles.icon} source={require('image!switch')} />
					  	</TouchableHighlight>
					</View>

					<View style={styles.toContainer}>
					<Text style={styles.buttonText}>To</Text>
					  	<TouchableHighlight style={styles.button} underlayColor='#99d9f4' onPress={this.handleToButtonPressed}>
					    	<Text style={styles.buttonText}>{this.state.toKey}</Text>
					  	</TouchableHighlight>
					</View>
				</View>

				<View style={styles.convertContainer}>
				   	<TouchableHighlight style={[styles.button, styles.convertButton]}
				      	underlayColor='#99d9f4' onPress={this.handleConvertButtonPressed}>
				      
				    	<Text style={styles.buttonText}>Convert</Text>
				  	</TouchableHighlight>
				</View>

	    	</View>
			{spinner}
			<View style={styles.horContainer1}>
			    	<Text style={styles.buttonText}>&#8377; &#36; 23,34,563</Text>
			</View>
		</View>
		); 
	}
});


var styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		marginTop: 50,

		// justifyContent: 'center',
		// alignItems: 'center', //flex-start, flex-end, center, stretch
		backgroundColor: '#1073ae'
	},
	innerContainer: {

	},
	textInput: {
		height: 36,
		marginBottom: 10,
		marginTop: 10,
		padding: 4,
		fontSize: 18,
		borderWidth: 1,
		borderColor: '#0ea378',
		backgroundColor: 'white',
		borderRadius: 3,
		color: '#48BBEC',
		justifyContent: 'flex-end',
		textAlign : 'right'
	},
	horContainer1: {
		flexDirection: 'row',
		marginBottom: 20,
		justifyContent : 'space-around'
	},
	fromContainer: {
		flex : 2,
		paddingRight : 10
	},
	switchContainer: {
		flex : 1,
		paddingLeft : 10,
		paddingRight : 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	toContainer: {
		flex : 2,
		alignItems: 'center',
		justifyContent: 'flex-end',
		paddingLeft : 10
	},
	icon : {
		width : 36,
		height : 36,
		// backgroundColor:'red'
	},
	convertContainer : {
		flex :1,
		flexDirection: 'row',
		marginBottom: 20,
		//alignItems: 'stretch',
		// backgroundColor: 'red',
				justifyContent: 'center',

	},
	text: {
	  	//marginTop: 40,
		fontSize: 15,
		textAlign: 'center',
		color: 'black',
		backgroundColor: 'transparent'
	},
	button: {
		height: 36,
		paddingRight: 10,
		paddingLeft: 10,
		backgroundColor: '#6BBD6D',
		borderColor: '#0ea378',
		borderWidth: 1,
		borderRadius: 3,
		alignSelf: 'stretch',
		justifyContent: 'center',
		// marginLeft: 20,
		// marginRight: 20,
		
	},
	convertButton: {
		flex: 1,
		marginRight: 20,
		marginLeft: 20
	},
	buttonText: {
		fontSize: 18,
		fontWeight: 'bold',
		color: 'white',
		alignSelf: 'center'
	},
	thumb: {
	   width: 200,
	   height: 200,
	   marginRight: 10,
	   borderRadius: 10
	},
	flowRight: {
  flexDirection: 'row',
  // alignItems: 'center',
  alignSelf: 'stretch'
},
	flowRight1: {
  flexDirection: 'row',
  // alignItems: 'center',
  alignSelf: 'stretch'
},
searchInput: {
  		height: 36,
  		width : 100,
		marginTop: 20,
		marginBottom: 10,
		padding: 4,
		fontSize: 18,
		borderWidth: 1,
		borderColor: '#0ea378',
		backgroundColor: 'white',
		borderRadius: 3,
		color: '#48BBEC'
}
});

module.exports = MainView;