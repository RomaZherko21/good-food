import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Profile from './components/profile/Profile';
import Recipes from './components/recipes/Recipes';
import SignIn from './components/signIn/SignIn';
import SignUp from './components/signUp/SignUp';
import Customization from './components/profile/customization/Customization';
import MyRecipies from './components/myRecipies/MyRecipies';
import OneRecipe from './components/recipes/oneRecipe/OneRecipe';

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
        <Route exact path="/profile">
          <Navbar />
          <Profile />
        </Route>
        <Route exact path="/my-recipies">
          <Navbar />
          <MyRecipies />
        </Route>
        <Route path="/profile/customization">
          <Navbar />
          <Customization />
        </Route>
        <Route exact path="/recipies:id">
          <Navbar />
          <OneRecipe />
        </Route>
      </Switch>
    </Router>
  );
}
export default Routes;
