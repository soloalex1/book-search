import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "@/view/Home";
import Search from "@/view/Search";

import Header from "@/components/Header";

import GlobalStyle from "@/globalStyle";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/search" component={Search} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
