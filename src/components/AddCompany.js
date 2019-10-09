import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import {CLEAR_ERRORS, CLEAR_DATA} from '../redux/types';


//Material ui
import withStyles from '@material-ui/core/styles/withStyles';
import  Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import SaveOutlined from '@material-ui/icons/SaveAltOutlined'
import Snackbar from '@material-ui/core/Snackbar'
//Redux
import {connect} from 'react-redux';
import {createCompany} from '../redux/actions/dataActions'; 





const styles = {
    form: { 
        flexGrow: 1,
    },

    
    title: {
        fontWeight: '700',
        marginBottom: '10px'
    },
    textField: {
    margin: '20px 15px 20px 15px',
    
    },
    Address: {
        width:'40%'
    },
    
    input: {
    height: '2rem'
    },
    button: {
      margin:'20px 0 20px 0px',
      position: 'relative'
    },
    leftIcon: {
        marginRight:'10%',
      },
    customError: {
      color: 'red',
      fontSize: '0.9rem'
    },
    progress :{
    position: 'absolute'
    
    }
  
};

export class AddCompany extends Component {
    constructor(props){
        super(props);

        this.state = {
            company: '',
            tel: '',
            address: '',
            errors: {},
            open:false,
            snackContent: ''
        }
    }

    componentWillReceiveProps(nextProps){
        console.log(this.props)
        if(nextProps.ui.errors){
            console.log(nextProps.ui.errors)
            
        }
       
        if(nextProps.data.message){
            console.log(nextProps.data.message)
            this.setState({open: true,
                           snackContent: nextProps.data.message 
            })
        }
        if(nextProps.ui.errors) {
            if(nextProps.ui.errors.hasOwnProperty('message')){
                this.setState({open: true,
                    snackContent:  nextProps.ui.errors
     })
            }

           else if(nextProps.ui.errors.hasOwnProperty('company')){
                this.setState({errors: nextProps.ui.errors})
            }
        }


       
    }

    handleSubmit = (event) => {
        
        event.preventDefault();
        const companyData = {
            company: this.state.company,
            tel: this.state.tel,
            address: this.state.address
        };
        console.log('submit');
       this.props.createCompany(companyData );
    }

    handleChange = (event) => {
        this.setState({ 
            [event.target.name] : event.target.value
        })
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        console.log('handleclose')
        this.setState({open: false, errors: {}});
        
        this.props.clearErrors();
        this.props.clearData();

    }

    render() {
        const {classes, ui : {loading} } = this.props;
        console.log(this.props)
        const {errors} = this.state;
        
        
        return (
            <Grid container className={classes.form}  >
                    <Snackbar
                            anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                            }}
                            open = {this.state.open}
                            autoHideDuration={3000}
                            onClose = {this.handleClose}
                            ContentProps={{
                            'aria-describedby': 'message-id',
                            }}
                            message={<span id="message-id">{this.state.snackContent.message}</span>}
                    />
                
                <Grid item sm={12}>
                    
                    
                    {this.props.isCalledFromAnotherPage ? '' : <Typography className = {classes.title} variant='h5' 
                     >Ajouter Une Compagnie</Typography >}
                    <form noValidate onSubmit={this.handleSubmit} >

                        <TextField   id='company' type='text' name='company' label ='Compagnie' 
                        value={this.state.company} onChange={this.handleChange} 
                        helperText={errors.company}
                        error = {errors.company ? true : false}
                        className={classes.textField}  />

                        <TextField   id='tel' type='number' name='tel' label ='Telephone' 
                        value={this.state.tel} onChange={this.handleChange} 
                        
                        className={`${classes.textField} ${classes.tel}`}  />

                        <TextField   id='Address' type='text'  name='Address' label ='Adresse' 
                        value={this.state.Address} onChange={this.handleChange} 
                        
                        className={`${classes.textField} ${classes.Address}`}  />
                        
                        
                       {this.props.isCalledFromAnotherPage ? '' : <Button type='submit' variant='contained' color='primary' 
                         className={classes.button} size='medium' disabled={loading} >
                           <SaveOutlined className={classes.leftIcon} />
                            Enregistrer {loading && <CircularProgress size={15} className={classes.progress} color='secondary' />}
                        </Button>}
                        <br />
                        
  
                        
                    </form>
                   
                </Grid>
               

            </Grid>
        )
    }
}

AddCompany.propTypes = {
    classes : PropTypes.object.isRequired, 
    data : PropTypes.object.isRequired,
    ui : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
   
    ui : state.ui,
    data : state.data
})


      
  const clearErrors = () => ({ type: CLEAR_ERRORS });
  const clearData = () => ({ type: CLEAR_DATA });
    
  function mapActionToProps(dispatch) {
    return bindActionCreators({ createCompany, clearErrors, clearData }, dispatch)
  }

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(AddCompany));

