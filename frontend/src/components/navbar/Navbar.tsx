import s from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';

import { AppContext, initialState } from '../../state/context';
import { Types } from '../../state/reducers';

const Header: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <nav className={s.nav}>
      <h1>
        <NavLink exact to="/">
          Good F. food
        </NavLink>
      </h1>
      <ul>
        <li>
          <NavLink exact to="#">
            RECIPES
          </NavLink>
        </li>
        <li>
          <NavLink exact to="#">
            DISCOVER
          </NavLink>
        </li>
        <li>
          <NavLink exact to="#">
            NUTRITION
          </NavLink>
        </li>
        <li>
          <NavLink exact to="#">
            VIDEO
          </NavLink>
        </li>
      </ul>

      {state.user.logedIn ? (
        <div className={s.profile}>
          <NavLink exact to="/profile">
            <i className="fas fa-user"></i>
          </NavLink>
          <NavLink exact to="/my-recipies">
            <i className="fas fa-pizza-slice"></i>
            <div className={s.cartAmount}>0</div>
          </NavLink>
          <i
            className="fas fa-door-open"
            onClick={() => {
              dispatch({
                type: Types.SignIn,
                payload: { ...initialState.user },
              });
              document.cookie = `password=undefined`;
            }}
          ></i>
        </div>
      ) : (
        <div className={s.authBtn}>
          <NavLink exact to="/signUp">
            Sign up
          </NavLink>{' '}
          /{' '}
          <NavLink exact to="/signIn">
            Sign in
          </NavLink>
        </div>
      )}
      <i className="fas fa-search"></i>
    </nav>
  );
};

export default Header;
