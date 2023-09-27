import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./view/Home";
import Search from "./view/Search";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/search" component={Search} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
