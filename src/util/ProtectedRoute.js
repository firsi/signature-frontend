import React from 'react'
import {Router, navigate} from '@reach/router';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';




const ProtectedRoute = ({component: Component, authenticated,...rest}) => {
    if(!authenticated){
        navigate('/login');
        return null;
    }
    
    return (<Router > 
         <Component  {...rest} />
       
    </Router>  )
};


ProtectedRoute.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated,
    data: state.data,
    ui: state.ui
});
export default connect(mapStateToProps)(ProtectedRoute);
