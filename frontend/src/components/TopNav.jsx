import { useStoreState, useStoreActions } from "easy-peasy";
import { TopNavigation } from "@cloudscape-design/components";
import React from "react";

export function TopNav() {
	const user = useStoreState((state) => state.user);
	const setUser = useStoreActions((actions) => actions.setUser);

	return (
		<React.Fragment>
			<TopNavigation
				identity={{
					href: "/",
					title: "GYMIO",
				}}
				i18nStrings={{
					searchIconAriaLabel: "Search",
					searchDismissIconAriaLabel: "Close search",
					overflowMenuTriggerText: "More",
					overflowMenuTitleText: "All",
					overflowMenuBackIconAriaLabel: "Back",
					overflowMenuDismissIconAriaLabel: "Close menu",
				}}
				utilities={[
					{
						type: "button",
						text: "Dashboard",
						href: "/dashboard",
						iconName: "share",
						variant: "primary-button",
					},
					{
						type: "menu-dropdown",
						onItemClick: (e) => {
							if (e.detail.id === "profile") {
								console.log("profile");
							} else {
								let user = {
									value: e.detail.id.toLowerCase(),
									label: e.detail.id,
								};
								console.log(user);
								setUser(user);
							}
						},
						iconName: user.label
							? "user-profile-active"
							: "user-profile",
						text: user.label ? user.label : "Login",
						items: [
							{ id: "profile", text: "Profile & Settings" },
							{
								id: "select",
								text: "Select user",
								items: [
									{
										id: "Sylvia",
										text: "Sylvia",
									},
									{
										id: "Laith",
										text: "Laith",
									},
								],
							},
						],
					},
				]}
			></TopNavigation>
		</React.Fragment>
	);
}
