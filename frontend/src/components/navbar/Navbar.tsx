import s from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../state/context';

function Header() {
  let { state, dispatch } = useContext(AppContext);
  return (
    <nav className={s.nav}>
      <h1>Good F. food {state.shoppingCart}</h1>
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
      <div className={s.authBtn}>
        <Link to="signUp">Sign up</Link>/<Link to="/signIn">Sign in</Link>
      </div>
      <i className="fas fa-search"></i>
    </nav>
  );
}

export default Header;