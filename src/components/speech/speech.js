import React from "react";

import style from "./speech.css";

const Speech = (props) => (
	<div className={style.speechItem}>
		<div className={style.item_status}>
			<input type="checkbox" checked={props.speech.enabled} onChange={(event) => props.action.onEnabledChange(props.speech.id, event.target.checked)}/>
		</div>
		<div className={style.item_text}>{props.speech.text}</div>
		<div className={style.item_start_delay}>
			<span>Start delay</span>
			<input value={props.speech.startDelay} onChange={(event) => props.action.onStartDelayChange(props.speech.id, event.target.value)}/>
		</div>
		<div className={style.item_interval}>
			<span>Interval</span>
			<input value={props.speech.interval} onChange={(event) => props.action.onIntervalChange(props.speech.id, event.target.value)}/>
		</div>
		<div className={style.item_speed}>
			<span>Speed</span>
			<input value={props.speech.speed} onChange={(event) => props.action.onSpeedChange(props.speech.id, event.target.value)}/>
		</div>
		<div className={style.item_volume}>
			<span>Volume</span>
			<input value={props.speech.volume} onChange={(event) => props.action.onVolumeChange(props.speech.id, event.target.value)}/>
		</div>
		<div className={style.item_delete}>
			<button type="button" className={style.item_delete_button} onClick={() => props.action.deleteSpeech(props.speech.id)}>X</button>
		</div>
	</div>
)

export default Speech;
