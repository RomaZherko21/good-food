import './App.css';
import Routes from './Routes';

import useCookies from './hooks/useCookies';
import useRecipes from './hooks/useRecipes';

function App() {
  useCookies();
  useRecipes();
  return <Routes />;
}

export default App;
