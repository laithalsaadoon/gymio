import { createStore, action, thunk, persist } from "easy-peasy";
import TimerApiClient from "./apiClient/timerClient";

export const store = createStore({
	user: persist(
		{
			label: "",
			value: "",
		},
		{ storage: "localStorage" }
	),
	setUser: action((state, payload) => {
		state.user = payload;
	}),
	workout: {
		rounds: 3,
		train: 180,
		rest: 60,
	},
	setWorkout: action((state, payload) => {
		state.workout = payload;
	}),
	uiDisplayObject: {
		rounds: {
			label: "",
			value: "",
		},
		roundLength: {
			label: "",
			value: "",
		},
		restLength: {
			label: "",
			value: "",
		},
	},
	setUIDisplayObject: action((state, payload) => {
		state.uiDisplayObject = payload;
	}),
	workoutType: "cardio",
	setWorkoutType: action((state, payload) => {
		state.workoutType = payload;
	}),
	startWorkout: thunk(async (actions, payload) => {
		const timerClient = new TimerApiClient();
		const response = await timerClient.startWorkout(payload);
		console.log(response);
		actions.setWorkout(payload);
	}),
	stopWorkout: thunk(async (actions, payload) => {
		const timerClient = new TimerApiClient();
		const response = await timerClient.stopWorkout(payload);
		console.log(response);
	}),
});
