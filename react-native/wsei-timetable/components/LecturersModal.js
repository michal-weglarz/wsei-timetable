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

export default class DisplayModal extends React.Component {
	state = { text: '', nestedModal: false };
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
							source={require('../assets/icons/professor.png')}
							style={{ width: 125, height: 125 }}
						/>
						<Text style={styles.title}>Podaj imię i nazwisko wykładowcy</Text>
						<TextInput
							style={styles.input}
							onChangeText={text => this.setState({ text })}
							value={this.state.text}
							placeholder="Imię i nazwisko"
						/>
						<TouchableOpacity
							onPress={() => this.setState({ nestedModal: true })}
							style={styles.button}
						>
							<Text style={styles.buttonText}>SZUKAJ PROWADZĄCEGO</Text>
						</TouchableOpacity>
					</View>
					{this.state.nestedModal && (
						<WebViewModal
							stateModal={this.state.nestedModal}
							closeModal={this.props.closeModal}
							modalTitle={this.props.modalTitle}
							argument={this.state.text}
						/>
					)}
				</Modal>
			</View>
		);
	}
}
