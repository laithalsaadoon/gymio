import {
	Container,
	Form,
	FormField,
	Select,
	SpaceBetween,
} from "@cloudscape-design/components";
import { useStoreState, useStoreActions } from "easy-peasy";

import {
	ROUND_COUNT_OPTIONS,
	REST_LENGTH_OPTIONS,
	ROUND_LENGTH_OPTIONS,
} from "../constants/constants";

export function WorkoutForm() {
	const [rounds, roundLength, restLength] = [
		ROUND_COUNT_OPTIONS,
		ROUND_LENGTH_OPTIONS,
		REST_LENGTH_OPTIONS,
	];

	const workout = useStoreState((state) => state.workout);
	const uiDisplayObject = useStoreState((state) => state.uiDisplayObject);

	const setUIDisplayObject = useStoreActions(
		(actions) => actions.setUIDisplayObject
	);

	const setWorkout = useStoreActions((actions) => actions.setWorkout);

	return (
		<Container>
			<Form>
				<SpaceBetween size="s">
					<FormField
						label="Rounds"
						description="Select the number of rounds"
					>
						<Select
							options={rounds.map((round) => {
								return {
									label: `${round}`,
									value: round,
								};
							})}
							onChange={(event) => {
								setUIDisplayObject({
									...uiDisplayObject,
									rounds: event.detail.selectedOption,
								});
								setWorkout({
									...workout,
									rounds: event.detail.selectedOption.value,
								});
							}}
							selectedOption={uiDisplayObject.rounds}
						/>
					</FormField>
					<FormField
						label="Round Duration"
						description="How long per round?"
					>
						<Select
							options={roundLength.map((length) => {
								return {
									label: `${length} seconds`,
									value: length,
								};
							})}
							onChange={(event) => {
								setUIDisplayObject({
									...uiDisplayObject,
									roundLength: event.detail.selectedOption,
								});
								setWorkout({
									...workout,
									train: event.detail.selectedOption.value,
								});
							}}
							selectedOption={uiDisplayObject.roundLength}
						/>
					</FormField>
					<FormField
						label="Rest Duration"
						description="How long per rest period?"
					>
						<Select
							onChange={(event) => {
								setUIDisplayObject({
									...uiDisplayObject,
									restLength: event.detail.selectedOption,
								});
								setWorkout({
									...workout,
									rest: event.detail.selectedOption.value,
								});
							}}
							selectedOption={uiDisplayObject.restLength}
							options={restLength.map((length) => {
								return {
									label: `${length} seconds`,
									value: length,
								};
							})}
						/>
					</FormField>
				</SpaceBetween>
			</Form>
		</Container>
	);
}
