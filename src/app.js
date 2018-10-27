import React from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import SimpleTTS from "../simpletts";
import debounce from "lodash/debounce";

import AudioHeader from "./components/audioHeader/audioHeader.js";
import TextList from "./components/textList/textList.js";

let tts;
let speechIntervalList = [];
let speechStartDelayList = [];
class App extends React.Component {
	constructor(props) {
		super(props);
		if (!tts) {
			tts = new SimpleTTS();
		}
		this.state.data = JSON.parse(localStorage.getItem("speechData") || "[]");
	}

	componentDidMount() {
		Notification.requestPermission().then(function(result) {
		  console.log(result);
		});
	}

	componentWillUnmount() {
		this.clearAudio();
	}

	state = {
		isPlaying : false
	}

	clearAudio = () => {
		speechStartDelayList.forEach(item => clearTimeout(item));
		speechIntervalList.forEach(item => clearInterval(item));
		speechStartDelayList = [];
		speechIntervalList = [];
	}

	playSoundAndDisplayNoti = (ttsObject) => {
		tts.read(ttsObject).then(res => console.log(res)).catch(err => console.log(err));
		let ttsNoti = new Notification('Repeated-speech', {
			body: ttsObject.text,
			tag: "repeated-speech-noti"
		});
		setTimeout(() => ttsNoti.close(), 2500);
	}

	playButtonClicked = () => {
		this.clearAudio();
		if (!this.state.isPlaying) {
			this.state.data.forEach(speech => {
				if (speech.enabled) {
					speechStartDelayList.push(setTimeout(() => {
						this.playSoundAndDisplayNoti({text : speech.text, speed : speech.speed, volume: speech.volume});
						speechIntervalList.push(setInterval(() => {
							this.playSoundAndDisplayNoti({text : speech.text, speed : speech.speed, volume: speech.volume});
						}, speech.interval));
					}, speech.startDelay));
				}
			})
		}

		this.setState((state, props) => {
			return {isPlaying: !state.isPlaying}
		});
	}

	addSpeech = (text) => {
		let newSpeech = {
			id: Date.now(),
			enabled: true,
			text: text,
			speed: 100,
			volume: 75,
			startDelay: 0,
			interval: 5000
		}
		this.setState((state) => {
			let newData = [...state.data, newSpeech];
			localStorage.setItem("speechData", JSON.stringify(newData));
			return {data: newData};
		});
	}

	onStartDelayChange = debounce((id, startDelay) => {
		this.setState((state) => {
			let newData = state.data.map((speech) => {
				if (speech.id === id) {
					speech.startDelay = startDelay;
				}
				return speech;
			});
			localStorage.setItem("speechData", JSON.stringify(newData));
			return {data: newData};
		});
	}, 50)

	onIntervalChange = (id, interval) => {
		this.setState((state) => {
			let newData = state.data.map((speech, index) => {
				if (speech.id === id) {
					speech.interval = interval;
				}
				return speech;
			});
			localStorage.setItem("speechData", JSON.stringify(newData));
			return {data: newData};
		});
	}

	onSpeedChange = (id, speed) => {
		this.setState((state) => {
			let newData = state.data.map((speech, index) => {
				if (speech.id === id) {
					speech.speed = speed;
				}
				return speech;
			});
			localStorage.setItem("speechData", JSON.stringify(newData));
			return {data: newData};
		});
	}

	onVolumeChange = (id, volume) => {
		this.setState((state) => {
			let newData = state.data.map((speech, index) => {
				if (speech.id === id) {
					speech.volume = volume;
				}
				return speech;
			});
			localStorage.setItem("speechData", JSON.stringify(newData));
			return {data: newData};
		});
	}

	onEnabledChange = (id, enabled) => {
		this.setState((state) => {
			let newData = state.data.map((speech, index) => {
				if (speech.id === id) {
					speech.enabled = enabled;
				}
				return speech;
			});
			localStorage.setItem("speechData", JSON.stringify(newData));
			return {data: newData};
		});
	}

	deleteSpeech = (id) => {
		this.setState((state) => {
			let newData = state.data.filter(speech => speech.id !== id)
			localStorage.setItem("speechData", JSON.stringify(newData));
			return {data: newData};
		});
	}

	render() {
		return (
			<React.Fragment>
				<AudioHeader isPlaying={this.state.isPlaying} playButtonClicked={this.playButtonClicked} clearAudio={this.clearAudio} />
				<TextList speechList={this.state.data} addSpeech={this.addSpeech} action={{onStartDelayChange: this.onStartDelayChange, onIntervalChange: this.onIntervalChange, onSpeedChange: this.onSpeedChange, onVolumeChange: this.onVolumeChange, onEnabledChange: this.onEnabledChange, deleteSpeech: this.deleteSpeech}}/>
			</React.Fragment>
		)
	}
}

ReactDOM.render(<App />, document.getElementById("app"));
