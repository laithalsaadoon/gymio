import Header from "@cloudscape-design/components/header";
import Button from "@cloudscape-design/components/button";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Modal from "@cloudscape-design/components/modal";
import Badge from "@cloudscape-design/components/badge";
import Icon from "@cloudscape-design/components/icon";
import { ChooseWorkout } from "../components/ChooseWorkout";

import { useStoreState, useStoreActions } from "easy-peasy";
import { useState } from "react";

export function GIOHeader() {
	const [workoutSetupModal, setWorkoutSetupModal] = useState(false);
	const { rounds, train, rest } = useStoreState((state) => state.workout);
	const workout = useStoreState((state) => state.workout);
	const startWorkout = useStoreActions((actions) => actions.startWorkout);
	const stopWorkout = useStoreActions((actions) => actions.stopWorkout);

	return (
		<Header
			variant="h1"
			actions={[
				<Box key={0}>
					<Modal
						header={<Header variant={"h2"}>Workout Setup</Header>}
						children={<ChooseWorkout />}
						visible={workoutSetupModal}
						onDismiss={() => setWorkoutSetupModal(false)}
					/>
					<SpaceBetween size="xs" direction="horizontal">
						<Button
							onClick={() =>
								setWorkoutSetupModal(!workoutSetupModal)
							}
						>
							<SpaceBetween size="xs" direction="horizontal">
								<Icon name="edit"></Icon>
								<Badge color="red">{rounds} rounds</Badge>
								<Badge color="blue">
									{train} second rounds
								</Badge>
								<Badge color="green">{rest} second rest</Badge>
							</SpaceBetween>
						</Button>

						<Button
							variant="primary"
							iconName="status-positive"
							onClick={() => startWorkout(workout)}
						>
							Start
						</Button>
						<Button
							variant="primary"
							iconName="close"
							onClick={() => stopWorkout(workout)}
						>
							Stop
						</Button>
					</SpaceBetween>
				</Box>,
			]}
		>
			GYMIO
		</Header>
	);
}
