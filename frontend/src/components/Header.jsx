import Header from "@cloudscape-design/components/header";
import Button from "@cloudscape-design/components/button";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Modal from "@cloudscape-design/components/modal";
import Form from "@cloudscape-design/components/form";
import FormField from "@cloudscape-design/components/form-field";
import Select from "@cloudscape-design/components/select";
import Container from "@cloudscape-design/components/container";
import Badge from "@cloudscape-design/components/badge";
import Icon from "@cloudscape-design/components/icon";
import { dispatch, useStoreState } from "../state";
import { GIOTimerAPI } from "../server";

const rounds = [3, 4, 5, 6, 7, 8, 9];
const roundLength = [60, 90, 120, 150, 180, 210, 240];
const restLength = [30, 60, 90, 120, 150, 180, 210, 240];

function WorkoutForm() {
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
								dispatch({
									type: "setRounds",
									rounds: event.detail.selectedOption,
								});
								dispatch({
									type: "setRoundsVal",
									roundsVal:
										event.detail.selectedOption.value,
								});
							}}
							selectedOption={useStoreState("rounds")}
						></Select>
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
								dispatch({
									type: "setRoundLength",
									roundLength: event.detail.selectedOption,
								});
								dispatch({
									type: "setRoundLengthVal",
									roundLengthVal:
										event.detail.selectedOption.value,
								});
							}}
							selectedOption={useStoreState("roundLength")}
						></Select>
					</FormField>
					<FormField
						label="Rest Duration"
						description="How long per rest period?"
					>
						<Select
							onChange={(event) => {
								dispatch({
									type: "setRestLength",
									restLength: event.detail.selectedOption,
								});
								dispatch({
									type: "setRestLengthVal",
									restLengthVal:
										event.detail.selectedOption.value,
								});
							}}
							selectedOption={useStoreState("restLength")}
							options={restLength.map((length) => {
								return {
									label: `${length} seconds`,
									value: length,
								};
							})}
						></Select>
					</FormField>
				</SpaceBetween>
			</Form>
		</Container>
	);
}

function ChooseWorkout() {
	return (
		<Box>
			<SpaceBetween size="s" direction="horizontal">
				<Button
					onClick={() => {
						dispatch({ type: "setWorkout", workout: "cardio" });
					}}
				>
					Cardio/Boxing
				</Button>
				<Button
					onClick={() => {
						dispatch({ type: "setWorkout", workout: "weights" });
					}}
				>
					Weights
				</Button>
			</SpaceBetween>
			<br />
			{useStoreState("workout") === "cardio" ? <WorkoutForm /> : <Box />}
		</Box>
	);
}

export function GIOHeader() {
	return (
		<Header
			variant="h1"
			actions={[
				<Box key={0}>
					<Modal
						header={<Header variant={"h2"}>Workout Setup</Header>}
						children={<ChooseWorkout />}
						visible={useStoreState("workoutSetupModal")}
						onDismiss={() =>
							dispatch({
								type: "setWorkoutSetupModal",
								payload: false,
							})
						}
					/>
					<SpaceBetween size="xs" direction="horizontal">
						<Button
							onClick={() =>
								dispatch({
									type: "setWorkoutSetupModal",
									payload: true,
								})
							}
						>
							<SpaceBetween size="xs" direction="horizontal">
								<Icon name="edit"></Icon>
								<Badge color="red">
									{useStoreState("roundsVal")} rounds
								</Badge>
								<Badge color="blue">
									{useStoreState("roundLengthVal")} second
									rounds
								</Badge>
								<Badge color="green">
									{useStoreState("restLengthVal")} second rest
								</Badge>
							</SpaceBetween>
						</Button>

						<Button variant="primary" iconName="status-positive" onClick={GIOTimerAPI("start")}>
							Start
						</Button>
					</SpaceBetween>
				</Box>,
			]}
		>
			GYMIO
		</Header>
	);
}