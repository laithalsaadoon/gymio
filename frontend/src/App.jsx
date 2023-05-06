import { BrowserRouter } from "react-router-dom";
import Main from "./main/main";
import { TopNav } from "./components";

function App() {
	return (
		<BrowserRouter>
			<TopNav />
			<Main />
		</BrowserRouter>
	);
}

export default App;
