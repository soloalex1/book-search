import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "@/view/Home";
import Search from "@/view/Search";

import Header from "@/components/header";
import Footer from "@/components/footer";

import "./App.css";
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/search" component={Search} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
