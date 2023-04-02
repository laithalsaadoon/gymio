import React from "react";
import MyRoutes from "Routes";
import AppLayout from "@awsui/components-react/app-layout";
import SideNavigation from "@awsui/components-react/side-navigation";
import MyHeader from "components/Header";
import { ROUTES } from "./constants/routes";

function MySideNavigation() {
	return (
		<SideNavigation
			header={{
				text: "GYMIO",
				href: "/"
			}}
			items={[
				{
					text: ROUTES.workouts.name,
					type: "link",
					href: ROUTES.workouts.path
				},
				{
					text: ROUTES.profiles.name,
					type: "expandable-link-group",
					items: [
						{
							text: "Sylvia",
							type: "link",
							href: `${ROUTES.profiles.path}/sylvia`
						},
						{
							text: "Laith",
							type: "link",
							href: `${ROUTES.profiles.path}/laith`

						}
					]
				},
			]}
		/>);
}

function App() {
	const [isSideNavOpen, setIsSideNavOpen] = React.useState(false);

	return (
		<AppLayout
			toolsHide={true}
			navigationOpen={isSideNavOpen}
			onNavigationChange={(event) => setIsSideNavOpen(event.detail.open)}
			contentHeader={<MyHeader />}
			content={<MyRoutes />}
			navigation={<MySideNavigation />}
		>
		</AppLayout >
	);
}

export default App;
