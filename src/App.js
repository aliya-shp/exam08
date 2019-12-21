import React, {Fragment} from 'react';
import {Container} from "reactstrap";
import NavigationBar from "./components/UI/NavigationBar/NavigationBar";
import {Route, Switch} from "react-router-dom";
import Quotes from "./containers/Quotes";
import AddQuote from "./containers/AddQuote";
import EditQuote from "./containers/EditQuote";

function App() {
  return (
      <Fragment>
          <NavigationBar/>
          <Container>
              <Switch>
                  <Route path="/" exact component={Quotes}/>
                  <Route path="/add-quote" component={AddQuote}/>
                  <Route path="/quotes/:id" component={EditQuote}/>
                  <Route render={() => <h3>No such page</h3>}/>
              </Switch>
          </Container>
      </Fragment>
  );
}

export default App;
