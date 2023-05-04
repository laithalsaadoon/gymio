import {
	Container,
	Form,
	FormField,
	SpaceBetween,
	Header,
	Input,
	Button,
} from "@cloudscape-design/components";
import React from "react";

export function Login() {
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
				<form onSubmit={(e) => e.preventDefault()}>
					<Form
						actions={
							<SpaceBetween direction="horizontal" size="xs">
								<Button formAction="none" variant="link">
									Cancel
								</Button>
								<Button variant="primary">Submit</Button>
							</SpaceBetween>
						}
						// header={<Header variant="h1">Form header</Header>}
					>
						<Container
							header={
								<Header variant="h2">
									Form container header
								</Header>
							}
						>
							<SpaceBetween direction="vertical" size="l">
								<FormField label="First field">
									<Input />
								</FormField>
								<FormField label="Second field">
									<Input />
								</FormField>
								<FormField label="Third field">
									<Input />
								</FormField>
							</SpaceBetween>
						</Container>
					</Form>
				</form>
			</div>
		</React.Fragment>
	);
}
