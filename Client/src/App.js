import { Provider } from "react-redux";
import "./App.css";
import MainRoute from "./Routes/MainRoute";
import Store from "./Redux/Store";

function App() {
  return (
    <div className="App">
      <Provider store={Store}>
        <MainRoute />
      </Provider>
    </div>
  );
}

export default App;
