import { Routes } from './routes/routes';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { useAuth } from './hooks/auth.hook';
import { Loader } from './components/Loader';
import { AuthContext } from './context/auth.context';
import './App.css';
import 'materialize-css';

function App() {
  const { login, logout, ready, token, userId } = useAuth();
  const isAuth = !!token;
  const routes = Routes(isAuth);

  if (!ready) {
    return (<Loader/>);
  }
  return (
    <AuthContext.Provider value={{ login, logout, token, userId, isAuth }}>
      <div>
        <BrowserRouter>
          <Navbar></Navbar>
          <div className="container">
            {routes}
          </div>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
