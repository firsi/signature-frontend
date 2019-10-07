import React from 'react'
import {Route, Redirect, withRouter} from 'react-router-dom';
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
    authenticated: PropTypes.bool.isRequired,
    
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated,
    data: state.data,
    ui: state.ui
});
export default withRouter(connect(mapStateToProps)(ProtectedRoute));
