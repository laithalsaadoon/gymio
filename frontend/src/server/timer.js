import Axios from "axios";
import { useStoreState } from "../state";
import {host} from "../constants";

export function GIOTimerAPI(action) {
	const { roundsVal, roundLengthVal, restLengthVal } = [
		useStoreState("roundsVal"),
		useStoreState("roundLengthVal"),
		useStoreState("restLengthVal"),
	];

	const data = {
		rounds: roundsVal,
		train: roundLengthVal,
		rest: restLengthVal,
	};

	switch (action) {
		case "start":
			let uri = `${host}/start`;
			Axios
				.post(uri, { data: data })
				.then((response) => {
					console.log(response);
				})
				.catch((error) => {
					console.log(error);
				});
			return;
		case "stop":
			uri = `${host}/stop`;
			Axios
				.get(uri, {})
				.then((response) => {
					console.log(response);
				})
				.catch((error) => {
					console.log(error);
				});
			return;
		case "pause":
			uri = `${host}/pause`;
			Axios
				.get(uri, {})
				.then((response) => {
					console.log(response);
				})
				.catch((error) => {
					console.log(error);
				});
			return;
		case "resume":
			uri = `${host}/resume`;
			Axios
				.get(uri, {})
				.then((response) => {
					console.log(response);
				})
				.catch((error) => {
					console.log(error);
				});
			return;
		default:
			return;
	}

	// case action === "start":
	//     const uri = `${host}/start`;
	// if (action === "start") {
	//     const uri = `${host}/start`;
	//     axios.post(uri, {}).then((response) => {
	//         console.log(response);
	//     }).catch((error) => {
	//         console.log(error);
	//     });
	// } else if (action === "stop") {
	//     const uri = `${host}/stop`;
	//     axios.get(uri, {}).then((response) => {
	//         console.log(response);
	//     }).catch((error) => {
	//         console.log(error);
	//     });
	// }
}
