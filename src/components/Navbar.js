import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {logout} from '../redux/actions/userActions';
import logoWhite from '../images/logoWhite.svg';
//Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { useTheme } from '@material-ui/styles';
import { fade, makeStyles } from '@material-ui/core/styles';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';

//Redux 
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';



const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        
      },
      logoWhite: {
        height: '70px',
      },
      title: {
        flexGrow: 1,
        marginLeft: '20vw'
      },
      leftIcon: {
        marginRight: theme.spacing(1),
      },
      buttonContained: {
        marginLeft: theme.spacing(3),
      }
}));



 function Navbar(props) {
  const classes = useStyles();

        
        let {user:{authenticated}} = props;
        return (
            (authenticated) ? <div className = {classes.root}>
                <AppBar color='primary'>
                    <Toolbar >
                    <Typography variant="h6" className={classes.title} edge="start">
                    <img src={logoWhite} className={classes.logoWhite} alt='Signature logoWhite' />
                    </Typography>
                    
                            <Button color='secondary' component={Link} to='/'>Acceuil</Button>
                            <Button color='secondary' component={Link} to='/'>Proforma</Button>
                            <Button color='secondary' component={Link} to='/'>Bordereau</Button>
                            <Button color='secondary' component={Link} to='/signup'>Réglages</Button>
                            <Button className={classes.buttonContained} variant='contained' color='secondary' onClick={props.logout} component={Link} to='/login'>
                              <SupervisedUserCircle className={classes.leftIcon} />
                              Déconnexion</Button>
                    </Toolbar>
                </AppBar>
            </div>
            : <div></div>
        )
    }


Navbar.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
}

const mapPropsToState = (state) => ({
    user: state.user
})

const mapActionToProps = {
  logout
}

export default connect(mapPropsToState, mapActionToProps)(Navbar);
