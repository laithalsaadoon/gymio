import { Route, Routes } from "react-router-dom";
import "@cloudscape-design/global-styles/index.css";
import { GIOContentLayout } from "../layout/ContentLayout";
import { AppLayout } from "@cloudscape-design/components";
import { Login } from "../components/Login";

function Main() {
	return (
		<div id="main">
			<div id="app">
				<div id="app-content" className="content-view">
					<Routes>
						<Route
							index
							element={
								// <Login />
								<AppLayout
									toolsHide={true}
									navigationHide={true}
									content={<GIOContentLayout />}
								/>
							}
						/>
					</Routes>
				</div>
			</div>
		</div>
	);
}

export default Main;
