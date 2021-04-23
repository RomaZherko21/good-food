import s from './Navbar.module.css';
import { Link, Router } from 'react-router-dom';

function Header() {
  console.log(s);
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
      <div className={s.authBtn}>
        <Link to="#">Sign up</Link>/<Link to="#">Sign in</Link>
      </div>
      <i className="fas fa-search"></i>
    </nav>
  );
}

export default Header;
