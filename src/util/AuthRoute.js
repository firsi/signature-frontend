import React from 'react'
//import {Route, Redirect} from 'react-router-dom';
import {Router, navigate, Redirect} from '@reach/router';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';


const AuthRoute = ({component: Component,authenticated,...rest, }) => {

if(authenticated){
   
   return <Redirect to='/' noThrow/>;  
}
   return (<Router> 
         
         <Component {...rest} />
         
    </Router>)
};


AuthRoute.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
});
export default connect(mapStateToProps)(AuthRoute);
