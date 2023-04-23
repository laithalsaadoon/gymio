import { Box, Button, SpaceBetween } from "@cloudscape-design/components";
import { WorkoutForm } from "./WorkoutForm";
import { useStoreActions, useStoreState } from "easy-peasy";

export function ChooseWorkout() {
	const setWorkoutType = useStoreActions((actions) => actions.setWorkoutType);
	const workoutType = useStoreState((state) => state.workoutType);

	return (
		<Box>
			<SpaceBetween size="s" direction="horizontal">
				<Button
					onClick={() => {
						setWorkoutType("cardio");
					}}
				>
					Cardio/Boxing
				</Button>
				<Button
					onClick={() => {
						setWorkoutType("weights");
					}}
				>
					Weights
				</Button>
			</SpaceBetween>
			<br />
			{workoutType === "cardio" ? <WorkoutForm /> : <Box />}
		</Box>
	);
}
