import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';

function Routes() {
  return (
    <Router>
      <Switch>
        <Navbar />
        <Route exact path="/"></Route>
      </Switch>
    </Router>
  );
}
export default Routes;
