import * as React from 'react';
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	Dimensions,
	AsyncStorage,
} from 'react-native';
import classes from '../classes.json';
import TimetableItem from '../components/TimetableItem';
import FloatingButton from '../components/FloatingButton';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import UserStore from '../stores/UserStore';
import { observer } from 'mobx-react';
import LoadingScreen from './Loading';
import { ScreenOrientation } from 'expo';
const STORE = 'wsei-timetable::classes';

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F0F3F4',
		position: 'relative',
	},
	actionButton: {
		position: 'absolute',
		zIndex: 2,
		right: 0,
		bottom: 0,
	},
});

@observer
export default class Timetable extends React.Component {
	state = {
		isLoading: false,
		classes: null,
		albumNum: null,
	};

	load = async () => {
		try {
			const data = await AsyncStorage.getItem(STORE);
			if (data !== null) {
				console.log('Data successfully loaded!')
				this.setState({ classes: JSON.parse(data) })
			}
			else {
				console.log("NUL LKURWA")
				this.fetchData(UserStore.albumNum)
			}
		} catch (error) {
			console.log('Error while retrieving data')
			console.log(error)
		}
	}

	save = async data => {
		try {
			await AsyncStorage.setItem(STORE, JSON.stringify(data));
		} catch (error) {
			console.log('Error while saving data:')
			console.log(error)
		}
	}

	componentDidMount = () => {
		Expo.ScreenOrientation.allowAsync(Expo.ScreenOrientation.Orientation.PORTRAIT);
		this.setState({ albumNum: UserStore.albumNum })
		console.log('async storage items', AsyncStorage.getItem(STORE))
		this.load()
		UserStore.updateStatus(false)
	};

	componentDidUpdate = (prevProps, prevState) => {
		if (UserStore.updated) {

			console.log('updated');

			this.fetchData(UserStore.albumNum);
		}
	}

	fetchData = async (albumNum) => {
		console.log('fetchData', albumNum)
		let response = await fetch(
			`http://ec2-18-220-112-71.us-east-2.compute.amazonaws.com/api/${albumNum}`
		);
		let data = await response.json();
		console.log('ended fetching')
		this.save(data);
		this.setState({
			classes: data,
			albumNum,
		});
		UserStore.updateStatus(false)
	};

	transformData = () => {
		let output = {};
		let firstDayInMonth = {};
		this.state.classes &&
			Object.values(this.state.classes).forEach(item => {
				if (output[item.Date]) {
					output[item.Date].push(item);
				} else output[item.Date] = [item];
				if (
					firstDayInMonth[item.Date.slice(5, 7)] &&
					item.Date < firstDayInMonth[item.Date.slice(5, 7)]
				)
					firstDayInMonth[item.Date.slice(5, 7)] = item.Date;
				if (!firstDayInMonth[item.Date.slice(5, 7)])
					firstDayInMonth[item.Date.slice(5, 7)] = item.Date;
			});
		return { output, firstDayInMonth };
	};


	renderData = albumNum => {
		return Object.values(this.transformData().output)
	}

	render() {
		return (
			< View style={styles.container} >
				<View style={styles.actionButton}>
					<FloatingButton />
				</View>
				{
					UserStore.updated ?
						<View
							style={{ justifyContent: 'center', alignItems: 'center' }}
						>
							<LoadingScreen />
						</View> :
						<View>
							<FlatList
								data={this.renderData(UserStore.albumNum)}
								renderItem={({ item }) => (
									<TimetableItem
										items={item}
										firstDayInMonth={this.transformData().firstDayInMonth}
									/>
								)}
								keyExtractor={(item, index) => index.toString()}
								initialNumToRender={2}
							/>
						</View>}
			</View >
		);
	}
}
