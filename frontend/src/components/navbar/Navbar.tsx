import s from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { AppContext } from '../../state/context';
import { useContext } from 'react';
import { Types } from '../../state/reducers';

function Header() {
  const { state, dispatch } = useContext(AppContext);
  return (
    <nav className={s.nav}>
      <h1>Good F. food</h1>
      <ul>
        <li>
          <Link to="/hell">RECIPES</Link>
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
            <i className="fas fa-shopping-cart"></i>
            <div className={s.cartAmount}>0</div>
          </Link>
          <i
            className="fas fa-door-open"
            onClick={() => {
              dispatch({
                type: Types.SignIn,
                payload: {
                  email: '',
                  id: '',
                  logedIn: false,
                },
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
}

export default Header;
