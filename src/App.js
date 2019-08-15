import React from 'react';
import './App.css';
import {BrowserRouter as Router,  Switch } from 'react-router-dom';
import Home from './pages/home';
import Signup from './pages/signup';
import Login from './pages/login';
import Navbar from './components/Navbar';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';
import AuthRoute from './util/AuthRoute';
import ProtectedRoute from './util/ProtectedRoute';
import {Provider} from 'react-redux';
import {SET_AUTHENTICATED} from './redux/types';
import {logout} from './redux/actions/userActions';
import store from './redux/store';
import axios from 'axios';
import { getAllFactures } from './redux/actions/dataActions';

const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;

if(token){
  const decodedToken = jwtDecode(token);

  if(decodedToken.exp*1000 < Date.now()){
    store.dispatch(logout());
    window.location.href = '/login';
  }
  else{
   
    store.dispatch({type: SET_AUTHENTICATED});
    
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getAllFactures());
  }

}

function App() {
  return (
    <Provider store={store} >
      <MuiThemeProvider theme={theme}>
      
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            
            <ProtectedRoute exact path='/' component={Home} />
            <ProtectedRoute exact path='/signup' component={Signup}  />

            <AuthRoute exact path='/login' component={Login}   />
          </Switch>
        </div>
      </Router>
   
    </MuiThemeProvider>

    </Provider>
      );
}

export default App;
