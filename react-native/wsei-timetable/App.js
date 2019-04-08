import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { AppLoading, Asset, Font, ScreenOrientation } from 'expo';
import Timetable from './screens/Timetable';
import UserStore from './stores/UserStore';
import DisplayModal from './screens/DisplayModal';
import LoadingScreen from './screens/Loading';

export default class App extends React.Component {
	state = {
		isReady: false,
	};
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.loadsAssetsAsync();
		Expo.ScreenOrientation.allowAsync(Expo.ScreenOrientation.Orientation.PORTRAIT);
	}

	loadsAssetsAsync = async () => {
		await Font.loadAsync({
			LatoBold: require('./assets/fonts/Lato-Bold.ttf'),
			LatoLight: require('./assets/fonts/Lato-Light.ttf'),
			LatoRegular: require('./assets/fonts/Lato-Regular.ttf'),
		});
		this.setState({ isReady: true });
	};

	render() {

		if (!this.state.isReady)
			return (
				<View
					style={{ justifyContent: 'center', alignItems: 'center' }}
				>
					<LoadingScreen />
				</View>
			);
		if (!UserStore.albumNum)
			return (
				<DisplayModal
					closeModal={() => this.setState({ settingsModal: false })}
					modalTitle="settingsModal"
					stateModal={this.state['settingsModal']}
				/>
			);
		return <Timetable />;
	}
}
