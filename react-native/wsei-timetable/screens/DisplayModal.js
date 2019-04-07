import * as React from 'react';
import { View, Text, Modal, WebView, StatusBar } from 'react-native';
import { Constants } from 'expo';
import WebViewModal from '../components/WebViewModal';
import LecturersModal from '../components/LecturersModal';
import SettingsModal from '../components/SettingsModal';

export default class DisplayModal extends React.Component {
	render() {
		switch (this.props.modalTitle) {
			case 'lecturersModal':
				return (
					<LecturersModal
						stateModal={this.props.stateModal}
						closeModal={this.props.closeModal}
						modalTitle={this.props.modalTitle}
					/>
				);
			case 'settingsModal':
				return (
					<SettingsModal
						stateModal={this.props.stateModal}
						closeModal={this.props.closeModal}
						modalTitle={this.props.modalTitle}
					/>
				);
			default:
				return (
					<WebViewModal
						stateModal={this.props.stateModal}
						closeModal={this.props.closeModal}
						modalTitle={this.props.modalTitle}
					/>
				);
		}
	}
}
