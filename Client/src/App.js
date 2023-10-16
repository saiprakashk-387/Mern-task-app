import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import Store from "./Redux/Store";
import MainRoute from "./Routes/MainRoute";
import Loader from "./Loader/Loader";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000); ///5 seconds//

    if (location.pathname === "/Mern-task-app")
      navigate("/", { replace: true });
  }, []);

  return (
    <div className="App">
      {loading ? (
        <Loader />
      ) : (
        <Provider store={Store}>
          <MainRoute />
        </Provider>
      )}
    </div>
  );
}

export default App;
