import { observable, action } from 'mobx';
import { AsyncStorage } from 'react-native';
const STORE = 'wsei-timetbale::user';

class UserStore {
	@observable
	albumNum = '';
	@observable
	updated = 'false';

	constructor() {
		this.load();
	}
	load() {
		AsyncStorage.getItem(STORE)
			.then(JSON.parse)
			.then(data => {
				data ? (this.albumNum = data) : (this.albumNum = '');
			});
	}
	save() {
		AsyncStorage.setItem(STORE, JSON.stringify(this.albumNum));
	}
	@action
	changeAlbumNum(albumNum) {
		this.albumNum = albumNum;
		console.log('Updated in store', this.updated)
		this.updateStatus(true)
		this.save();
		console.log('userstore', this.albumNum);
	}

	@action
	updateStatus = (bool) => {
		this.updated = bool
	}
}

const userStore = new UserStore();
export default userStore;
