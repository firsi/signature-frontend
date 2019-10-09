import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import AddCompany from '../components/AddCompany';

//Material UI
import withStyles from '@material-ui/core/styles/withStyles';



const styles = {
    
};


export class Company extends Component {
   
    render() {
        
        let {classes} = this.props;
        let { ui: {loading}} = this.props;

       return <AddCompany />;
       
    }
}

Company.propTypes = {
    classes: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    ui: state.ui
})



export default connect(mapStateToProps)(withStyles(styles)(Company));
