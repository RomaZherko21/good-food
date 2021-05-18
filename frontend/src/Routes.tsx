import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Profile from './components/profile/Profile';
import Recipes from './components/recipes/Recipes';
import SignIn from './components/signIn/SignIn';
import SignUp from './components/signUp/SignUp';
import Customization from './components/profile/customization/Customization';
import MyRecipies from './components/myRecipies/MyRecipies';
import OneRecipe from './components/recipes/oneRecipe/OneRecipe';
import { Home } from './components/chat/Home';
import { ChatRoom } from './components/chat/ChatRoom';

const routes = [
  { path: '/', name: 'Recipes', Component: Recipes },
  { path: '/signIn', name: 'SignIn', Component: SignIn },
  { path: '/signUp', name: 'SignUp', Component: SignUp },
  { path: '/profile', name: 'Profile', Component: Profile },
  { path: '/my-recipies', name: 'MyRecipies', Component: MyRecipies },
  {
    path: '/profile/customization',
    name: 'Customization',
    Component: Customization,
  },
  { path: '/recipies:id', name: 'OneRecipe', Component: OneRecipe },
  { path: '/chat', name: 'Home', Component: Home },
  { path: '/chat/:roomId', name: 'ChatRoom', Component: ChatRoom },
];

function Routes() {
  return (
    <Router>
      <Switch>
        {routes.map(({ path, Component }) => {
          return (
            <Route exact path={path}>
              <Navbar />
              <Component />
            </Route>
          );
        })}
      </Switch>
    </Router>
  );
}
export default Routes;
