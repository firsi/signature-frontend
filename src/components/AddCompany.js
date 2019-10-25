import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Material ui
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import SaveOutlined from '@material-ui/icons/SaveAltOutlined'
import Snackbar from '@material-ui/core/Snackbar'

//Redux
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {createCompany} from '../redux/actions/dataActions'; 
import {CLEAR_ERRORS, CLEAR_DATA} from '../redux/types';


const styles = {
    title: {
        fontWeight: '700',
        marginBottom: '10px'
    },
    
    input: {
        height: '2rem'
    },

    button: {
      position: 'relative',
      margin: '5% auto 0 auto',
      display: 'block',
      minWidth: '180px'
    },

    leftIcon: {
        marginRight:'10%',
      },

    customError: {
      color: 'red',
      fontSize: '0.9rem'
    },

    progress: {
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
        if(nextProps.data.message){
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
        
       this.props.createCompany(companyData );
    }

    handleChange = (event) => {
        this.setState({ 
            [event.target.name] : event.target.value
        })
    }

    handleClose = (reason) => {
        if (reason === 'clickaway') {
          return;
        }
        
        this.setState({open: false, errors: {}});
        this.props.clearErrors();
        this.props.clearData();
    }

    render() {
        const {classes, ui : {loading} } = this.props;
        const {errors} = this.state;
        
        return (
            <div  className={classes.form}  >
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
                     
                    <Typography className = {classes.title} variant='h5'>
                        Ajouter Une Compagnie
                    </Typography >

                    <form noValidate onSubmit={this.handleSubmit} >

                        <TextField   id='company' type='text' name='company' label ='Compagnie' 
                        value={this.state.company} onChange={this.handleChange} 
                        helperText={errors.company}
                        error = {errors.company ? true : false}
                        className={classes.textField}  fullWidth/>

                        <TextField   id='tel' type='number' name='tel' label ='Telephone' 
                        value={this.state.tel} onChange={this.handleChange} 
                        className={`${classes.textField} ${classes.tel}`} fullWidth />

                        <TextField   id='Address' type='text'  name='Address' label ='Adresse' 
                        value={this.state.Address} onChange={this.handleChange} 
                        className={`${classes.textField} ${classes.Address}`} fullWidth />
                        
                        
                        <Button type='submit' variant='contained' color='primary' 
                        className={classes.button} size='small' disabled={loading} >
                            <SaveOutlined className={classes.leftIcon} />
                            Enregistrer {loading && 
                                        <CircularProgress size={15} className={classes.progress} color='secondary' />}
                        </Button>
                        <br />
                        
                    </form>
                   
                </div>
        
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

