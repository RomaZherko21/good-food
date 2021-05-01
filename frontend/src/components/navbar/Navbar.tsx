import s from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { AppContext, initialState } from '../../state/context';
import { Types } from '../../state/reducers';

const Header: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <nav className={s.nav}>
      <h1>
        <Link to="/">Good F. food</Link>
      </h1>
      <ul>
        <li>
          <Link to="#">RECIPES</Link>
        </li>
        <li>
          <Link to="#">DISCOVER</Link>
        </li>
        <li>
          <Link to="#">NUTRITION</Link>
        </li>
        <li>
          <Link to="#">VIDEO</Link>
        </li>
      </ul>

      {state.user.logedIn ? (
        <div className={s.profile}>
          <Link to="profile">
            <i className="fas fa-user"></i>
          </Link>
          <Link to="shoppingCart">
            <i className="fas fa-pizza-slice"></i>
            <div className={s.cartAmount}>0</div>
          </Link>
          <i
            className="fas fa-door-open"
            onClick={() => {
              dispatch({
                type: Types.SignIn,
                payload: { ...initialState.user },
              });
            }}
          ></i>
        </div>
      ) : (
        <div className={s.authBtn}>
          <Link to="signUp">Sign up</Link> / <Link to="/signIn">Sign in</Link>
        </div>
      )}
      <i className="fas fa-search"></i>
    </nav>
  );
};

export default Header;
