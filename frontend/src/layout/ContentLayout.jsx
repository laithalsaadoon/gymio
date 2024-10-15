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
import { Input, FormField } from "@cloudscape-design/components";
import TimerApiClient from "../apiClient/timerClient";

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
	const [buttonRestDuration, setButtonRestDuration] = useState("");
	const [showButtonRestForm, setShowButtonRestForm] = useState(false);

	const handleSaveButtonRestDuration = async () => {
		const timerClient = new TimerApiClient();
		try {
			const response = await timerClient.setButtonRestDuration(parseInt(buttonRestDuration));
			if (response.ok) {
				console.log("Button rest duration saved successfully");
				setShowButtonRestForm(false);
			} else {
				console.error("Failed to save button rest duration");
			}
		} catch (error) {
			console.error("Error saving button rest duration:", error);
		}
	};

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
					<Container
						header={<Header variant={"h2"}>Button Rest Duration</Header>}
					>
						<SpaceBetween size="m" direction="vertical">
							<Button onClick={() => setShowButtonRestForm(!showButtonRestForm)}>
								{showButtonRestForm ? "Hide Form" : "Set Button Rest Duration"}
							</Button>
							{showButtonRestForm && (
								<FormField label="Button Rest Duration (seconds)">
									<SpaceBetween size="s" direction="horizontal">
										<Input
											type="number"
											value={buttonRestDuration}
											onChange={(e) => setButtonRestDuration(e.detail.value)}
										/>
										<Button onClick={handleSaveButtonRestDuration}>Save</Button>
									</SpaceBetween>
								</FormField>
							)}
						</SpaceBetween>
					</Container>
				</ColumnLayout>
			</Container>
		</ContentLayout>
	);
}
