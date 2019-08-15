import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_AUTHENTICATED, SET_UNAUTHENTICATED} from '../types';
import Axios from 'axios';
import {getAllFactures} from './dataActions';

export const loginUser = (userData, history) => (dispatch) => {

    dispatch({type: LOADING_UI});
    
    Axios.post('/login', userData)
        .then(response => {
            
            dispatch({type: SET_AUTHENTICATED})
            const FBIdToken = `Bearer ${response.data.token}`;
            
            localStorage.setItem('FBIdToken', FBIdToken);
            
            
            Axios.defaults.headers.common['Authorization'] = FBIdToken;
            
            dispatch(getAllFactures());
          
            dispatch({type: CLEAR_ERRORS});
            history.push('/');
        })
        .catch(error => {
          
           dispatch({type: SET_ERRORS,
                    payload:  error.response.data
            });
           
        })
        
};


export const signupUser = (userData, history) => (dispatch) => {

    dispatch({type: LOADING_UI});
   
    Axios.post('/signup', userData)
        .then(response => {
          
            dispatch({type: CLEAR_ERRORS});
            history.push('/');
        })
        .catch(error => {
           console.log(error.response.data);
           dispatch({type: SET_ERRORS,
                    payload:  error.response.data
            });
           
        })
        
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete Axios.defaults.headers.common['Authorization'];
    dispatch({type: SET_UNAUTHENTICATED});
}

