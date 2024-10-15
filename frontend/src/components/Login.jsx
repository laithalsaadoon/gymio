import {
	Container,
	Form,
	FormField,
	SpaceBetween,
	Header,
	Button,
	Select,
} from "@cloudscape-design/components";
import { useStoreState, useStoreActions } from "easy-peasy";
import React from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
	const user = useStoreState((state) => state.user);
	const setUser = useStoreActions((actions) => actions.setUser);
	const navigate = useNavigate();

	const handleLogin = (event) => {
		event.preventDefault();

		navigate("/");
	};

	return (
		<React.Fragment>
			<div
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
				}}
			>
				<form onSubmit={(e) => handleLogin(e)}>
					<Form
						actions={
							<SpaceBetween direction="horizontal" size="xs">
								<Button variant="primary">Submit</Button>
							</SpaceBetween>
						}
						// header={<Header variant="h1">Form header</Header>}
					>
						<Container
							header={
								<Header variant="h2">Who's working out?</Header>
							}
						>
							<FormField label="Name">
								<Select
									options={[
										{ label: "Sylvia", value: "sylvia" },
										{ label: "Laith", value: "laith" },
									]}
									selectedOption={user}
									onChange={(e) =>
										setUser(e.detail.selectedOption)
									}
								/>
							</FormField>
						</Container>
					</Form>
				</form>
			</div>
		</React.Fragment>
	);
}
