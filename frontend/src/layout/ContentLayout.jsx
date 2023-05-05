import * as React from "react";
import ContentLayout from "@cloudscape-design/components/content-layout";
import Button from "@cloudscape-design/components/button";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Modal from "@cloudscape-design/components/modal";
import Box from "@cloudscape-design/components/box";
import Badge from "@cloudscape-design/components/badge";
import Icon from "@cloudscape-design/components/icon";
import { ChooseWorkout } from "../components/ChooseWorkout";
import Header from "@cloudscape-design/components/header";

import { useStoreState, useStoreActions } from "easy-peasy";
import { useState } from "react";
import { ColumnLayout, Container } from "@cloudscape-design/components";

export function GIOContentLayout() {
	const [workoutSetupModal, setWorkoutSetupModal] = useState(false);
	const { rounds, train, rest } = useStoreState((state) => state.workout);
	const workout = useStoreState((state) => state.workout);
	const startWorkout = useStoreActions((actions) => actions.startWorkout);
	const stopWorkout = useStoreActions((actions) => actions.stopWorkout);

	return (
		<ContentLayout header={<Header />}>
			<Container>
				<ColumnLayout columns={2}>
					<Container
						header={<Header variant={"h2"}>Workout Setup</Header>}
					>
						<Modal
							header={
								<Header variant={"h3"}>Workout Setup</Header>
							}
							children={<ChooseWorkout />}
							visible={workoutSetupModal}
							onDismiss={() => setWorkoutSetupModal(false)}
						/>

						<ColumnLayout columns={1}>
							<Box>
								<Button
									onClick={() =>
										setWorkoutSetupModal(!workoutSetupModal)
									}
								>
									<SpaceBetween
										size="xs"
										direction="horizontal"
									>
										<Icon name="edit"></Icon>
										<Badge color="red">
											{rounds} rounds
										</Badge>
										<Badge color="blue">
											{train} second rounds
										</Badge>
										<Badge color="green">
											{rest} second rest
										</Badge>
									</SpaceBetween>
								</Button>
							</Box>
							<Box>
								<SpaceBetween size="xs" direction="horizontal">
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
							</Box>
						</ColumnLayout>
					</Container>
				</ColumnLayout>
			</Container>
		</ContentLayout>
	);
}
