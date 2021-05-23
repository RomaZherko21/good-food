import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import Profile from './views/profile/Profile';
import Recipes from './components/recipes/Recipes';
import SignIn from './views/signIn/SignIn';
import SignUp from './views/signUp/SignUp';
import Customization from './views/customization/Customization';
import MyRecipies from './views/myRecipies/MyRecipies';
import OneRecipe from './components/oneRecipe/OneRecipe';
import Home from './views/chat/Home';
import ChatRoom from './views/chat/ChatRoom';

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
            <Route key={path} exact path={path}>
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
