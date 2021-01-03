import './App.css';
import 'materialize-css';
import { Routes } from './routes/routes';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const routes = Routes(false);
  return (
    <div className="container">
      <BrowserRouter>
      <div>
        {routes}
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
