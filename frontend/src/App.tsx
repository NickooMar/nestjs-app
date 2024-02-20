import Routes from "./Routes/root";
import { Toaster } from "sonner";

const App = () => {
  return (
    <>
      <Toaster richColors position="top-right" duration={3500} />
      <Routes />
    </>
  );
};

export default App;
