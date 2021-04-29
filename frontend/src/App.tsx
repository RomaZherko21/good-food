import './App.css';
import Routes from './Routes';
import { AppProvider } from './state/context';

function App() {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
}

export default App;
