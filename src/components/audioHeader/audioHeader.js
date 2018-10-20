import React from "react";
import { remote as importedRemote } from "electron";

import style from "./audioHeader.css";

const AudioHeader = (props) => {
	let remote = importedRemote;
	return (
		<div className={style.audioHeader}>
			<button type="button" className={`${style.playButton} ${props.isPlaying && style.playing}`} onClick={props.playButtonClicked}></button>
			<button type="button" className={style.clearButton} onClick={props.clearAudio}>Clear</button>
			<button type="button" className={style.devtoolsButton} onClick={() => remote.getCurrentWebContents().openDevTools({mode: 'bottom'})}>Devtools</button>
		</div>
	);
}

export default AudioHeader;
