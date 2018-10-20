import React from "react";

import Speech from "../speech/speech.js";
import AddSpeech from "../addSpeech/addSpeech.js";

import style from "./textList.css";

const TextList = (props) => (
	<div className={style.textList}>
		{props.speechList.map(speech => <Speech key={speech.id} speech={speech} action={props.action}/>)}
		<AddSpeech addSpeech={props.addSpeech} />
	</div>
)

export default TextList;
