import './App.css';
import Routes from './Routes';

import useCookies from './hooks/useCookies';
import useRecipes from './hooks/useRecipes';

function App() {
  useCookies();
  useRecipes(3, 0);
  return <Routes />;
}

export default App;
