import "./App.css";
import { Switch, Route, Link } from "react-router-dom";
import Login from "./components/Authentication/Login";
import "nes.css/css/nes.min.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/feed/Home';

const Error = () => {
  return <div>Error 404 page not found.</div>;
};

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={Login} exact />
        <Route path="/" component={Home} exact />
        <Route component={Error} />
      </Switch>
      <ToastContainer/>
    </div>
  );
}

export default App;
