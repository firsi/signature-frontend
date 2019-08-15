import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

//Material ui
import  Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


//Redux 
import {connect} from 'react-redux';
import {signupUser} from '../redux/actions/userActions';


const styles = {
    form: {
        textAlign: 'center'
    },
    logo:{
      margin: '20px auto 30px auto',
      fontWeight: '700'
    },
    textField: {
    margin: '20px auto 20px auto',
    },
    input: {
    height: '2.8rem'
    },
    button: {
      marginTop:'20px',
      marginBottom:'20px',
      position: 'relative'
    },
    customError: {
      color: 'red',
      fontSize: '0.9rem'
    },
    progress :{
    position: 'absolute'
    
    }
  
}

class Signup extends Component {
    constructor(){
        super();

        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            loading: false,
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.ui.errors){
            this.setState({errors: nextProps.ui.errors});
        }
    }

    handleSubmit = (event) => {
        
        event.preventDefault();
        this.setState({
            loading: true
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword 
        };

        this.props.signupUser(newUserData, this.props.history);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
     
    }

    render() {
        const {classes, ui: {loading}} = this.props;
        const {errors} = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <Typography variant='h1' className={classes.logo}>Signature</Typography >
                    <Typography variant='h4' >Ajouter un nouvel utilisateur</Typography >
                    <form noValidate onSubmit={this.handleSubmit} >
                        <TextField  id='email' type='email' name='email' label ='Email' 
                        value={this.state.email} onChange={this.handleChange} 
                        helperText={errors.email}
                        error = {errors.email ? true : false}
                        className={classes.textField} fullWidth />

                        <TextField  id='password' type='password' name='password' label ='Mot de passe' 
                        value={this.state.password} onChange={this.handleChange} 
                        helperText={errors.password}
                        error = {errors.password ? true : false}
                        className={classes.textField} fullWidth />

                        <TextField  id='confirmPassword' type='password' name='confirmPassword' label ='Confirmez le mot de passe' 
                        value={this.state.confirmPassword} onChange={this.handleChange} 
                        helperText={errors.confirmPassword}
                        error = {errors.confirmPassword ? true : false}
                        className={classes.textField} fullWidth />
                        {(errors.general) &&
                            <Typography variant='body2' className={classes.customError}>
                                {errors.general}
                            </Typography>
                        }
                        
                        <Button type='submit' variant='contained' color='primary' 
                        fullWidth className={classes.button} disabled={loading} >
                            Ajouter {loading && <CircularProgress size={30} className={classes.progress} color='secondary' />}
                        </Button><br />

                       
                    </form>
                   
                </Grid>
                <Grid item sm/>

            </Grid>
        )
    }
}

Signup.propTypes = {
    classes : PropTypes.object.isRequired,
    ui : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    ui: state.ui
});

const mapActionToProps = {
    signupUser
}
export default connect(mapStateToProps, mapActionToProps) (withStyles(styles)(Signup));
