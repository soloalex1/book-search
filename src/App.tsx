import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./view/Home";
import Search from "./view/Search";

import "./App.css";
import Header from "./components/header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/search" component={Search} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
