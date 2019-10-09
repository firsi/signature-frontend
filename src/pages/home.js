import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

//Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
//import FactureTable from '../components/Factures/FactureTable';
import TabFactures from '../components/Factures/TabFactures';
import {AppBar, Tabs} from '@material-ui/core'
import GeneralInfo from '../components/Factures/GeneralInfo';

const styles = {
    loadingContainer: {
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
    },
    topInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        height: '20vh',
        width: '100%',
       // backgroundColor:'#fbfafa',
        marginBottom: '1%',
        padding: '1% 2 1% 0',
        borderBottom: '1px solid #860a0afc',
      },
     

};


export class Home extends Component {
   
    render() {
        
        let {classes} = this.props;
        let { ui: {loading}} = this.props;
        
        
       return <Fragment>
           <div className={classes.topInfo}>
               <GeneralInfo />
           </div>
             <TabFactures />
           </Fragment>

       
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    ui: state.ui
})



export default connect(mapStateToProps)(withStyles(styles)(Home));
