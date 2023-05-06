import * as React from "react";
import ContentLayout from "@cloudscape-design/components/content-layout";
import Button from "@cloudscape-design/components/button";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Modal from "@cloudscape-design/components/modal";
import Box from "@cloudscape-design/components/box";

import { ChooseWorkout } from "../components/ChooseWorkout";
import Header from "@cloudscape-design/components/header";

import { useStoreState, useStoreActions } from "easy-peasy";
import { useState } from "react";
import { ColumnLayout, Container } from "@cloudscape-design/components";

const ValueWithLabel = ({ label, children }) => (
	<div>
		<Box variant="awsui-key-label">{label}</Box>
		<div>{children}</div>
	</div>
);

export function GIOContentLayout() {
	const [workoutSetupModal, setWorkoutSetupModal] = useState(false);
	const { rounds, train, rest } = useStoreState((state) => state.workout);
	const workout = useStoreState((state) => state.workout);
	const startWorkout = useStoreActions((actions) => actions.startWorkout);
	const stopWorkout = useStoreActions((actions) => actions.stopWorkout);

	return (
		<ContentLayout header={<Header>Home</Header>}>
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
						<SpaceBetween size="m" direction="vertical">
							<Container>
								<ColumnLayout columns={1} borders="horizontal">
									<ValueWithLabel label="Rounds">
										{rounds}
									</ValueWithLabel>

									<ValueWithLabel label="Train">
										{train}
									</ValueWithLabel>
									<ValueWithLabel label="Rest">
										{rest}
									</ValueWithLabel>
								</ColumnLayout>
							</Container>
							<Box float="right">
								<SpaceBetween size="xs" direction="horizontal">
									<Button
										onClick={() =>
											setWorkoutSetupModal(
												!workoutSetupModal
											)
										}
									>
										Setup
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
							</Box>
						</SpaceBetween>
					</Container>
				</ColumnLayout>
			</Container>
		</ContentLayout>
	);
}
