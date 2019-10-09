import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

//Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddProduct from '../components/AddProduct';

const styles = {
    
};


export class Products extends Component {
   
    render() {
        
        let {classes} = this.props;
        let { ui: {loading}} = this.props;
       // let RecentFacturesMarkup = !loading ? <FactureTable /> : <CircularProgress size={100} className={classes.progress} color='secondary' /> 

       return <AddProduct />;
       
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
