import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import Store from "./Redux/Store";
import MainRoute from "./Routes/MainRoute";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/Mern-task-app")
      navigate("/", { replace: true });
  }, []);

  return (
    <div className="App">
      <Provider store={Store}>
        <MainRoute />
      </Provider>
    </div>
  );
}

export default App;
