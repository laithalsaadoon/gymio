import { AppLayout } from "@cloudscape-design/components";
import { GIOContentLayout } from "./components";

function App() {
  return (
    <AppLayout
      toolsHide={true}
      navigationHide={true}
      content={<GIOContentLayout />}
    />
  );
}

export default App;
