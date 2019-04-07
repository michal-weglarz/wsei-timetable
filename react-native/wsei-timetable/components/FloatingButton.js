import * as React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	TouchableWithoutFeedback,
	TouchableHighlight,
	TouchableNativeFeedback,
	Dimensions,
} from 'react-native';
import DisplayModal from '../screens/DisplayModal';
//import console = require('console');

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
	},
	mainActivationButtonContainer: {
		flex: 1,
		backgroundColor: '#ffffff',
		elevation: 20,
		borderRadius: 35,
		right: 10,
		bottom: 10,
	},
	mainActivationButton: {
		tintColor: '#DD688F',
		width: 70,
		height: 70,
	},
	additionalButtonContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		right: 10,
		bottom: 10,
	},
	additionalButtonText: {
		color: '#F1E7E7',
		fontFamily: 'LatoRegular',
		fontSize: 20,
		marginRight: 15,
	},
	additionalButton: {
		width: 60,
		height: 60,
		tintColor: '#F1E7E7',
		marginBottom: 17.5,
		marginRight: 3,
	},
});

const actions = [
	{
		text: 'Wykładowcy',
		icon: require('../assets/icons/professor.png'),
		modal: 'lecturersModal',
	},
	{
		text: 'Mapa uczelni',
		icon: require('../assets/icons/map.png'),
		modal: 'localizationModal',
	},
	{
		text: 'Ustawienia',
		icon: require('../assets/icons/settings-work-tool.png'),
		modal: 'settingsModal',
	},
];

export default class FloatingButton extends React.Component {
	state = {
		showAdditionalButtons: false,
		blurBackground: false,
	};

	handlePress = e => {
		this.setState({
			showAdditionalButtons: !this.state.showAdditionalButtons,
			blurBackground: !this.state.blurBackground,
		});
	};

	handleModals = text => {
		this.setState({
			[text]: !this.state[text],
		});
	};

	render() {
		return (
			<View style={styles.mainContainer}>
				{Object.values(actions).map((obj, idx) => {
					if (this.state[obj.modal]) {
						return (
							<DisplayModal
								key={idx}
								closeModal={modalTitle =>
									this.setState({ [modalTitle]: false })
								}
								modalTitle={obj.modal}
								stateModal={this.state[obj.modal]}
							/>
						);
					}
				})}
				{this.state.blurBackground && (
					<View
						style={{
							backgroundColor: 'rgba(0,0,0,0.70)',
							width: Dimensions.get('window').width + 100,
							height: Dimensions.get('window').height + 100,
							position: 'absolute',
							zIndex: 0,
						}}
					/>
				)}
				{this.state.showAdditionalButtons && (
					<View
						style={{
							justifyContent: 'flex-end',
							alignItems: 'flex-end',
							height: 300,
						}}
					>
						{Object.values(actions).map((item, idx) => (
							<TouchableOpacity
								key={idx}
								style={styles.additionalButtonContainer}
								onPress={e => {
									this.handlePress(e);
									this.handleModals(item.modal);
								}}
							>
								<Text style={styles.additionalButtonText}>{item.text}</Text>
								<Image style={styles.additionalButton} source={item.icon} />
							</TouchableOpacity>
						))}
					</View>
				)}
				<View style={styles.mainActivationButtonContainer}>
					<TouchableOpacity delayPressIn={0} onPress={e => this.handlePress(e)}>
						<Image
							style={styles.mainActivationButton}
							source={require('../assets/icons/menu.png')}
						/>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}
