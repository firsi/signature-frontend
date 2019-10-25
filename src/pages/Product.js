import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

//Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import AddProduct from '../components/AddProduct';
import  ProductList  from '../components/ProductList';
import  Typography  from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import SimpleModal from '../components/SimpleModal';


const styles = {
    pageHeader: {
        marginBottom: '3%',
     },
    AddCompany: {
        float: 'right',
     }
};


export class Products extends Component {
   constructor(props){
       super(props);
       this.addProductRef = React.createRef();
   }

   handleClick = () => {
       this.addProductRef.current.handleOpen();
   }
    render() { 
       const {classes} = this.props;

       return <Fragment>
                <div className={classes.pageHeader} >
                    <Typography display='inline' variant='h5'>Liste de mes clients</Typography>
                    <Button onClick={this.handleClick} className={classes.AddCompany} 
                    variant='contained' color='secondary' size='medium'>
                        Ajouter un produit
                    </Button> 
                </div> 
                
                <SimpleModal component={AddProduct} ref={this.addProductRef} />
                <ProductList />
             </Fragment>
       
    }
}

Products.propTypes = {
    classes: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    ui: state.ui
})



export default connect(mapStateToProps)(withStyles(styles)(Products));
