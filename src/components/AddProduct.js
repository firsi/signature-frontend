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
import Feedback from './Feedback';
//Redux
import {connect} from 'react-redux';
import {createProduct} from '../redux/actions/dataActions'; 




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
    description: {
        width:'40%'
    },
    
    input: {
    height: '2rem'
    },
    button: {
     
      margin:'20px 0 20px 0px',
      height: '55px',
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

export class AddProduct extends Component {
    constructor(){
        super();

        this.state = {
            product: '',
            defaultPrice: '',
            description: '',
            errors: {},
           
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.ui.errors){
           // console.log(nextProps.ui.errors)
            this.setState({errors: nextProps.ui.errors})
        }
    }
   

    handleSubmit = (event) => {
        
        event.preventDefault();
        const productData = {
            product: this.state.product,
            defaultPrice: this.state.defaultPrice,
            description: this.state.description
        };
        console.log('submit');
       this.props.createProduct(productData );
    }

    handleChange = (event) => {
        this.setState({ 
            [event.target.name] : event.target.value
        })
    }

    

    render() {
        const {classes, ui : {loading}, data: {message} } = this.props;
        const {errors} = this.state;
        

        return (
            <Grid container className={classes.form}  >
                    
                <Feedback />
                <Grid item sm={12}>
                    
                    
                    <Typography className = {classes.title} variant='h3' 
                     >Ajouter Un Produit</Typography >
                    <form noValidate onSubmit={this.handleSubmit} >
                        <TextField  id='product' type='text' name='product' label ='Designation' 
                        value={this.state.product} onChange={this.handleChange} 
                        helperText={errors.product}
                        error = {errors.product ? true : false}
                        className={classes.textField}  />

                        <TextField  id='defaultPrice' type='number' name='defaultPrice' label ='Prix' 
                        value={this.state.defaultPrice} onChange={this.handleChange} 
                        helperText={errors.defaultPrice}
                        error = {errors.defaultPrice ? true : false}
                        className={`${classes.textField} ${classes.prix}`}  />

                        <TextField  id='description' type='text'  name='description' label ='Description' 
                        value={this.state.description} onChange={this.handleChange} 
                        helperText={errors.description}
                        error = {errors.description ? true : false}
                        className={`${classes.textField} ${classes.description}`}  />
                        
                        
                        <Button type='submit' variant='contained' color='primary' 
                         className={classes.button} disabled={loading} >
                           <SaveOutlined className={classes.leftIcon} />
                            Enregistrer {loading && <CircularProgress size={30} className={classes.progress} color='secondary' />}
                        </Button><br />
                        
  
                        
                    </form>
                   
                </Grid>
               

            </Grid>
        )
    }
}

AddProduct.propTypes = {
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
    return bindActionCreators({ createProduct, clearErrors,clearData }, dispatch)
  }

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(AddProduct));

