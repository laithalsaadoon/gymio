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
								<AppLayout
									toolsHide={true}
									navigationHide={true}
									content={<GIOContentLayout />}
								/>
							}
						/>
						<Route
							path="/login"
							element={
								<Login />}
						/>
					</Routes>
				</div>
			</div>
		</div>
	);
}

export default Main;
