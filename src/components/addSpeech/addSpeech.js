import React from "react";

import style from "./addSpeech.css";

class AddSpeech extends React.Component {
	state = {
		showInput: false,
		newSpeechText: ""
	}

	newSpeechInit = () => {
		this.setState((state, props) => ({showInput : !state.showInput, newSpeechText: ""}));
	}

	onNewSpeechChange = (event) => {
		this.setState({
			newSpeechText: event.target.value
		})
	}

	enterKeyListener = (event) => {
		if (event.keyCode === 13 && this.state.newSpeechText !== "") {
			this.props.addSpeech(this.state.newSpeechText);
			this.setState({newSpeechText: ""});
		}
	}

	render() {
		return (
			<div className={style.addSpeechContainer}>
				<button type="button" onClick={this.newSpeechInit} className={style.openButton}>+</button>
				<input type="text" className={`${style.newSpeechInput} ${this.state.showInput && style.showInput}`} value={this.state.newSpeechText} onChange={this.onNewSpeechChange} onKeyUp={this.enterKeyListener} />
			</div>
		)
	}
}

export default AddSpeech;
