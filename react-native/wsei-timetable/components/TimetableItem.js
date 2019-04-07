import * as React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import ClassesStore from '../stores/ClassesStore';
import { observer } from 'mobx-react';
import { Constants } from 'expo';
import { Icon } from 'react-native-elements';
import FloatingButton from '../components/FloatingButton';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: Constants.statusBarHeight,
		width: Dimensions.get('window').width,
	},
	sectionHeader: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(128, 195, 66, 88)',
		width: Dimensions.get('window').width - 30,
		height: 80,
		margin: 5,
		marginLeft: 15,
		marginRight: 15,
		borderRadius: 10,
		elevation: 2,
	},
	sectionHeaderText: {
		color: '#ffffff',
		fontFamily: 'LatoBold',
	},
	sectionContentClasses: {
		backgroundColor: '#ffffff',
		borderRadius: 10,
		width: Dimensions.get('window').width - 30,
		marginTop: 4,
		marginBottom: 10,
		elevation: 2,
	},
	class: {
		flex: 1,
		justifyContent: 'center',
		flexDirection: 'row',
		borderTopColor: '#F0F3F4',
		borderTopWidth: 0.8,
		paddingBottom: 17.5,
		paddingLeft: 15,
		paddingRight: 15,
		minHeight: 100,
	},
	classText: {
		paddingTop: 8,
		fontFamily: 'LatoRegular',
		color: '#334856',
	},
	incomingMonth: {
		elevation: 1,
		padding: 30,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	incomingMonthName: {
		fontFamily: 'LatoRegular',
		fontSize: 50,
		color: '#334856',
	},
	incomingMonthIcon: {
		tintColor: '#334856',
		width: 50,
		height: 50,
		marginRight: 10,
	},
});

const continents = {
	america: {
		countries: [
			'San Francisco',
			'Toronto',
			'Montreal',
			'Los Angeles',
			'Meksyk',
			'San Diego',
			'Nowy York',
			'Miami'
		],
		icon: require('../assets/icons/united-states-of-america.png'),
	},
	europe: {
		countries: [
			'Praga',
			'Berlin',
			'Kopenhaga',
			'Rzym',
			'Paryż',
			'Warszawa',
			'Barcelona',
		],
		icon: require('../assets/icons/european-union.png'),
	},
};

const months = {
	'01': { name: 'styczeń', icon: require('../assets/icons/flower.png') },
	'02': { name: 'luty', icon: require('../assets/icons/flower.png') },
	'03': { name: 'marzec', icon: require('../assets/icons/flower.png') },
	'04': {
		name: 'kwiecień',
		icon: require('../assets/icons/two-butterflies.png'),
	},
	'05': { name: 'maj', icon: require('../assets/icons/sun.png') },
	'06': { name: 'czerwiec', icon: require('../assets/icons/sun-umbrella.png') },
	'07': { name: 'lipiec', icon: require('../assets/icons/sun-umbrella.png') },
	'08': { name: 'sierpień', icon: require('../assets/icons/sun-umbrella.png') },
	'09': { name: 'wrzesień', icon: require('../assets/icons/sun-umbrella.png') },
	'10': { name: 'październik', icon: require('../assets/icons/flower.png') },
	'11': { name: 'listopad', icon: require('../assets/icons/flower.png') },
	'12': { name: 'grudzień', icon: require('../assets/icons/flower.png') },
};

@observer
export default class Timetable extends React.Component {
	chooseContinentIcon = city => {
		if (continents.america.countries.includes(city))
			return continents.america.icon;
		if (continents.europe.countries.includes(city))
			return continents.europe.icon;
	};

	render() {
		return (
			<View style={styles.container}>
				{Object.keys(this.props.firstDayInMonth).map((month, idx) => {
					if (this.props.firstDayInMonth[month] === this.props.items[0].Date) {
						return (
							<View key={idx} style={styles.incomingMonth}>
								<Image
									style={styles.incomingMonthIcon}
									source={months[month].icon || ''}
									resizeMode="cover"
								/>
								<Text style={styles.incomingMonthName}>
									{months[month].name}
								</Text>
							</View>
						);
					}
				})}
				<View style={styles.sectionHeader}>
					<Text style={{ ...styles.sectionHeaderText, fontSize: 24 }}>
						{this.props.items['0'].Day}
					</Text>
					<View
						style={{
							borderBottomColor: '#ffffff',
							borderBottomWidth: 0.5,
							width: 50,
							opacity: 0.5,
							marginBottom: 5,
							marginTop: 5,
							borderRadius: 8,
						}}
					/>
					<Text style={{ ...styles.sectionHeaderText, fontSize: 12 }}>
						{this.props.items['0'].Date}
					</Text>
				</View>
				<View style={styles.sectionContentClasses}>
					{Object.values(this.props.items).map((item, idx) => (
						<View
							key={idx}
							style={[
								styles.class,
								{ borderTopColor: idx === 0 ? '#ffffff' : '#F0F3F4' },
							]}
						>
							<View
								style={{
									flex: 2,
									flexDirection: 'column',
									justifyContent: 'space-between',
									paddingTop: 10,
									maxWidth: 200,
								}}
							>
								<Text
									style={{
										...styles.classText,
										fontSize: 18,
										fontFamily: 'LatoBold',
									}}
								>
									{item.Subject}
								</Text>
								<Text style={{ ...styles.classText, fontSize: 16 }}>
									{item.Lecturer}
								</Text>
								<View
									style={{
										flexDirection: 'row',
										alignItems: 'center',
									}}
								>
									<Text
										style={{
											...styles.classText,
											color: '#798186',
											fontFamily: 'LatoLight',
											fontSize: 16,
										}}
									>
										{item.Start} - {item.End}
									</Text>
									<Icon
										name="clock"
										type="evilicon"
										color="#334856"
										opacity={0.48}
										top={3}
									/>
								</View>
							</View>
							<View
								style={{
									flex: 1,
									flexDirection: 'column',
									justifyContent: 'space-around',
									alignItems: 'flex-end',
									paddingTop: 10,
								}}
							>
								<Text style={{ ...styles.classText, fontSize: 12 }}>
									{item.ClassID}
								</Text>
								<View
									style={{
										flexDirection: 'row',
										alignItems: 'center',
									}}
								>
									<Image
										style={{
											height: 15,
											width: 20,
											opacity: 0.65,
											top: 3.5,
											right: 5,
										}}
										source={this.chooseContinentIcon(item.Classrom)}
									/>
									<Text
										style={{
											...styles.classText,
											color: '#798186',
											fontFamily: 'LatoLight',
											textAlign: 'right',
											fontSize: 18,
										}}
									>
										{item.Classrom}
									</Text>
								</View>
							</View>
						</View>
					))}
				</View>
			</View>
		);
	}
}
