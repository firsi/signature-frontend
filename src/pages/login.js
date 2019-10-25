import React, { Component } from 'react';
import logo from '../images/logo.svg';
import PropTypes from 'prop-types';


//Material ui
import withStyles from '@material-ui/core/styles/withStyles';
import  Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//Redux
import {connect} from 'react-redux';
import {loginUser} from '../redux/actions/userActions'; 

const styles = {
    form: {
        textAlign: 'center',
        height: '100vh',  
    },
    formContainer: {
        paddingLeft: '3%',
        paddingRight: '3%',
    },
    logo:{
      margin: '0px auto 0 auto',
      width: '300px'
    },
    title: {
        fontWeight: '700',
        marginBottom: '10px'
    },
    textField: {
    margin: '20px auto 20px auto',
    },
    input: {
    height: '2.8rem'
    },
    button: {
      marginTop:'30px',
      marginBottom:'20px',
      height:'50px',
      position: 'relative'
    },
    customError: {
      color: 'red',
      fontSize: '0.9rem'
    },
    progress :{
    position: 'absolute'
    
    },
    image: {
        backgroundImage: 'url(/loginBackground.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    }
  
};

class Login extends Component {
    constructor(){
        super();

        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.ui.errors){
            this.setState({errors: nextProps.ui.errors})
        }
    }

    handleSubmit = (event) => {
        
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData, this.props.history);
    }

    handleChange = (event) => {
        this.setState({ 
            [event.target.name] : event.target.value
        })
    }

    render() {
        const {classes, ui : {loading} } = this.props;
        const {errors} = this.state;
        return (
            <Grid container className={classes.form}  >
                <Grid item sm={4} md={7} xs={false} className={classes.image}/>
                <Grid item sm={8} md={5} xs={12} className={classes.formContainer}>
                    <img src={logo} className={classes.logo} alt='Signature logo' />
                    <Typography className = {classes.title} variant='h5' >Connectez vous pour commencer</Typography >

                    <form noValidate onSubmit={this.handleSubmit} >
                        <TextField variant='outlined' id='email' type='email' name='email' label ='Email' 
                        value={this.state.email} onChange={this.handleChange} 
                        helperText={errors.email}
                        error = {errors.email ? true : false}
                        className={classes.textField} fullWidth margin='normal' />

                        <TextField variant='outlined' id='password' type='password' 
                        name='password' label ='Mot de passe' placeholder='Mot de passe'
                        value={this.state.password} onChange={this.handleChange} 
                        helperText={errors.password}
                        error = {errors.password ? true : false}
                        className={classes.textField} margin='normal' fullWidth />
                        
                        {(errors.general) &&
                            <Typography variant='body2' className={classes.customError}>
                                {errors.general}
                            </Typography>
                        }
                        
                        <Button type='submit' variant='contained' color='secondary' 
                        fullWidth className={classes.button} disabled={loading} >
                            Connexion {loading && <CircularProgress size={30} className={classes.progress} color='secondary' />}
                        </Button><br />

                        {errors.general && <small>Avez-vous oublié votre mot de passe ?</small>}
                    </form>    
                </Grid>
            </Grid>
        )
    }
}

Login.propTypes = {
    classes : PropTypes.object.isRequired,
    loginUser : PropTypes.func.isRequired,
    data : PropTypes.object.isRequired,
    ui : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    ui : state.ui,
    data : state.data
})

const mapActionToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Login));
