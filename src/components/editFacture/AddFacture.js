import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import ReactDataGrid from "react-data-grid";
import {getAllProducts} from '../../redux/actions/dataActions';
import {getAllCompanies} from '../../redux/actions/dataActions';
import PropTypes from 'prop-types';

//Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Feedback from '../Feedback';
import DataTableEdit from './DataTableEdit';

const styles = {
    paper: {
        paddingTop:'20px',
        paddingBottom: '80px',
    },
    title: {
        fontWeight: '700',
        margin: '0px 0 15px 20px',  
    },
}

 class AddFacture extends React.Component {

render (){
      
  let {classes} = this.props
  return (
    <Paper className={classes.paper}>
        <DataTableEdit />
    <Feedback />
    </Paper>
  );}
};

const mapStateToProps = (state) => ({
    data: state.data
});

const mapActionToProps = {
    getAllProducts
};

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles) (AddFacture));