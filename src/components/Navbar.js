import React, { Fragment } from 'react';
import {logout} from '../redux/actions/userActions';
import logoWhite from '../images/logoWhite.svg';

//Material UI
import MenuTreeView from './MenuTreeView';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';

//Redux 
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
      root: {
          backgroundColor:theme.palette.primary.main,
          height:'100vh',
        },

      logoWhite: {
        width: '170px',
        marginBottom:"10%",
        marginLeft:'10%'
      },

      title: {
        marginLeft: '20vw'
      },

      leftIcon: {
        marginRight: theme.spacing(1),
      },
      
      buttonContained: {
        marginLeft: theme.spacing(1),
        position: 'absolute',
        bottom: '5%',
        color: "#ffffff82",
        fontWeight:'500',
        fontSize: '12px'
      }
}));

 function Navbar(props) {
        const classes = useStyles();
        let {user:{authenticated: isAuthenticated}} = props;
        
        return (
          <aside>
            {isAuthenticated ?  
                    <div className = {classes.root}>
                        <img src={logoWhite} className={classes.logoWhite} alt='Signature logoWhite' />
                        <MenuTreeView />
                        <Button className={classes.buttonContained} variant='link' color='secondary' 
                        onClick={props.logout} /*component={Link} to='/login'*/>
                          <SupervisedUserCircle className={classes.leftIcon} /> Déconnexion
                        </Button>
                    </div> 

            : <Fragment></Fragment>}

         </aside>   
        )
    }


Navbar.propTypes = {
    user: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
}

const mapPropsToState = (state) => ({
    user: state.user,
    ui: state.ui,
    data: state.data
})

const mapActionToProps = {
  logout
}

export default connect(mapPropsToState, mapActionToProps)(Navbar);
