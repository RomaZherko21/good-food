import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Recipes from './components/recipes/Recipes';
import SignIn from './components/signIn/SignIn';
import SignUp from './components/signUp/SignUp';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Navbar />
          <Recipes />
        </Route>
        <Route exact path="/signIn">
          <SignIn />
        </Route>
        <Route exact path="/signUp">
          <SignUp />
        </Route>
      </Switch>
    </Router>
  );
}
export default Routes;
