import React from 'react'
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';


const ProtectedRoute = ({component: Component, authenticated, ...rest}) => (

    <Route 
        {...rest} 
        render = {(props) => 
        authenticated === false ? <Redirect to='/login' /> : <Component {...props} />
        
        }
        />
);


ProtectedRoute.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
});
export default connect(mapStateToProps)(ProtectedRoute);
