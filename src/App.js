import "./App.css";
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <Header />
        <MainPage />
      </div>
    </Provider>
  );
}

export default App;
