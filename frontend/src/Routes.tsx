import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Recipes from './components/recipes/Recipes';

function Routes() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Recipes />
        </Route>
      </Switch>
    </Router>
  );
}
export default Routes;
