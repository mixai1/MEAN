import { Routes } from './routes/routes';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/auth.context';
import './App.css';
import 'materialize-css';

function App() {
  const { login, logout, token, userId } = useAuth();
  const isAuth = !!token;
  const routes = Routes(isAuth);
  return (
    <AuthContext.Provider value={{login, logout, token, userId, isAuth}}>
      <div>
        <BrowserRouter>
          <div className="container">
            {routes}
          </div>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
