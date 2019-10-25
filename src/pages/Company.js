import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import AddCompany from '../components/AddCompany';
import  CompanyList  from '../components/CompanyList';
import AddCompanyModal from '../components/SimpleModal';

//Material UI
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';



const styles = {
    pageTitle: {
        
       marginBottom: '3%',
    },
    AddCompany: {
        float: 'right',
    }
};


export class Company extends Component {
    constructor(props){
        super(props);
        this.addCompanyRef = React.createRef()
    }

    handleClick = () => {
        this.addCompanyRef.current.handleOpen();
    }
    render() {
        
        let {classes} = this.props;
        let { ui: {loading}} = this.props;

       return <Fragment>
           <div className={classes.pageTitle} >
             <Typography display='inline' variant='h5'>Liste de mes clients</Typography>
             <Button onClick={this.handleClick} className={classes.AddCompany} variant='contained' color='secondary' size='medium'>Ajouter une compagnie</Button> 
            
           </div> 
            <AddCompanyModal ref={this.addCompanyRef} component={AddCompany} ariaLabelledBy='Ajouter une compagnie'/>
            <CompanyList />
             </Fragment>
    }
}

Company.propTypes = {
    classes: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    ui: state.ui,
    data: state.data
})



export default connect(mapStateToProps)(withStyles(styles)(Company));
