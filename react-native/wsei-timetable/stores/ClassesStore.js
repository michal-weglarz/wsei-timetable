import { observable, action } from 'mobx';
import { AsyncStorage } from 'react-native';
const STORE = 'vipande::user';

class ClassesStore {
	@observable loadedClasses = { loadedClassesDates: [] };

	defaultLoadedClasses = {
		loadedClassesDates: [],
	};
	// constructor() {
	// 	this.load();
	// }
	// load() {
	// 	AsyncStorage.getItem(STORE)
	// 		.then(JSON.parse)
	// 		.then(data => {
	// 			data ? (this.user = data) : (this.user = this.defaultUser);
	// 		});
	// }
	// save() {
	// 	AsyncStorage.setItem(STORE, JSON.stringify(this.user));
	// }
	@action addLoadedClassesDate(date) {
		this.loadedClasses.loadedClassesDates.push(date);
	}
}

const classesStore = new ClassesStore();
export default classesStore;
