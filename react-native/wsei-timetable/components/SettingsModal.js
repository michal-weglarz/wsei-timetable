import * as React from 'react';
import {
	View,
	Text,
	Modal,
	WebView,
	Button,
	TextInput,
	Dimensions,
	StyleSheet,
	TouchableOpacity,
	Image,
} from 'react-native';
import { Constants } from 'expo';
import WebViewModal from './WebViewModal';
import UserStore from '../stores/UserStore';
import { observer } from 'mobx-react';

const styles = StyleSheet.create({
	container: { backgroundColor: '#F0F3F4' },
	title: {
		fontFamily: 'LatoBold',
		color: '#334856',
		fontSize: 30,
		margin: 50,
		marginTop: 25,
		marginBottom: 70,
		textAlign: 'center',
	},
	input: {
		width: Dimensions.get('window').width - 100,
		borderBottomColor: '#949CA2',
		borderBottomWidth: 0.2,
		borderRadius: 20,
		marginBottom: 30,
		fontFamily: 'LatoRegular',
		padding: 4,
		fontSize: 20,
		textAlign: 'center',
	},
	button: {
		width: Dimensions.get('window').width - 100,
		height: 80,
		borderRadius: 10,
		backgroundColor: 'rgba(128, 195, 66, 88)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonText: {
		fontFamily: 'LatoBold',
		color: '#ffffff',
	},
});

@observer
export default class SettingsModal extends React.Component {
	state = { input: null };

	updateAlbumNum = () => {
		UserStore.changeAlbumNum(this.state.input || UserStore.albumNum);
		this.props.closeModal(this.props.modalTitle);
	};

	render() {
		return (
			<View style={styles.container}>
				<Modal
					animationType="slide"
					transparent={false}
					visible={this.props.stateModal}
					onRequestClose={() => {
						this.props.closeModal(this.props.modalTitle);
					}}
				>
					<View
						style={{
							flex: 1,
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Image
							source={require('../assets/icons/settings-work-tool.png')}
							style={{ width: 125, height: 125 }}
						/>
						<Text style={styles.title}>
							Podaj swój numer albumu, aby pobrać plan zajęć
						</Text>
						<TextInput
							style={styles.input}
							onChangeText={input => this.setState({ input })}
							value={this.state.text}
							numeric
							placeholder={UserStore.albumNum.toString() || 'Numer albumu'}
						/>
						<TouchableOpacity
							onPress={() => this.updateAlbumNum()}
							style={styles.button}
						>
							<Text style={styles.buttonText}>POBIERZ HARMONOGRAM</Text>
						</TouchableOpacity>
					</View>
				</Modal>
			</View>
		);
	}
}
