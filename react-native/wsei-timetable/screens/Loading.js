import * as React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';

export default class LoadingScreen extends React.Component {
	render() {
		return (
			<View style={{ justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	}
}
