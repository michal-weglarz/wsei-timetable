import { observable, action } from 'mobx';
import { AsyncStorage } from 'react-native';
const STORE = 'vipande::user';

class ClassesStore {
	@observable loadedClasses = { loadedClassesDates: [] };

	defaultLoadedClasses = {
		loadedClassesDates: [],
	};
	@action addLoadedClassesDate(date) {
		this.loadedClasses.loadedClassesDates.push(date);
	}
}

const classesStore = new ClassesStore();
export default classesStore;
