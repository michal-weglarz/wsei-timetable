import * as React from 'react';
import { Text, View, ActivityIndicator, Image } from 'react-native';

export default class LoadingScreen extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Image
					source={require('../assets/icons/meditation.png')}
					style={{ width: 125, height: 125 }}
				/>
				<Text style={{ marginTop: 15, marginBottom: 15 }}>Trwa wczytywanie planu zajęć...</Text>
				<ActivityIndicator size="large" color="#DD688F" />
			</View>
		);
	}
}
