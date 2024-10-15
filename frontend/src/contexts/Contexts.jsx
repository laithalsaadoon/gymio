import { createContext, useContext } from "react";
import TimerApiClient from "../apiClient/timerClient";

export const AllContext = createContext();

const contextValues = {
	TimerApiClient: new TimerApiClient(),
	workout: {
		rounds: 2,
		train: 180,
		rest: 60,
	},
};

export default function ContextProvider({ children }) {
	return (
		<AllContext.Provider value={contextValues}>
			{children}
		</AllContext.Provider>
	);
}

export function useAllContext() {
	return useContext(AllContext);
}
