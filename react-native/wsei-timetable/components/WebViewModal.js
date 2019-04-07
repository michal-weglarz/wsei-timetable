import * as React from 'react';
import { View, Text, Modal, WebView, StatusBar } from 'react-native';
import { Constants } from 'expo';
import { ScreenOrientation } from 'expo';


const uris = {
	localizationModal: 'http://mapa.wsei.edu.pl',
	lecturersModal: 'https://www.wsei.edu.pl',
	settingsModal: 'http://google.com',
};

export default class DisplayModal extends React.Component {

	componentDidMount = () => {
		Expo.ScreenOrientation.allowAsync(Expo.ScreenOrientation.Orientation.ALL);
	}

	componentWillUnmount = () => {
		Expo.ScreenOrientation.allowAsync(Expo.ScreenOrientation.Orientation.PORTRAIT);
	}

	render() {
		let uri;

		if (this.props.modalTitle === 'lecturersModal')
			uri = `${uris[this.props.modalTitle]}/${this.props.argument}`;
		else uri = uris[this.props.modalTitle];
		return (
			<View>
				<Modal
					animationType="slide"
					transparent={false}
					visible={this.props.stateModal}
					onRequestClose={() => {
						this.props.closeModal(this.props.modalTitle);
					}}
					style={{ backgroundColor: 'red' }}
				>
					<WebView source={{ uri }} style={{ margin: 0 }} />
				</Modal>
			</View>
		);
	}
}
