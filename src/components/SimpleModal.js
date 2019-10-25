import React from 'react';
import withStyle from '@material-ui/core/styles/withStyles'
import Modal from '@material-ui/core/Modal';
import AddCompany from './AddCompany';
import Grid from '@material-ui/core/Grid'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';

const styles = {
  paper: {
    backgroundColor: '#fff',
    padding:'5%',
    margin: '0 auto',
    marginTop: '10%',
  },
  paperContainer: {
    '&&:focus' : {
        outline: 'none',
    },
  },
  modalTitle: {
    display: 'flex',
    justifyContent:'space-between',
    padding: '20px 20px',
    fontFamily:"Lexend Deca",
  },
  company: {
    lineHeight:'30px',
    color: '#a4a4a4',
  },
  date: {
    lineHeight:'30px',
    color: '#a4a4a4',
    
    fontSize:'12px'
  },
  companyValue: {
    color: '#000'
  },
  textToright: {
    textAlign: 'right',
  }
};

  class SimpleModal extends React.Component  {
  
  constructor(props){
    super(props);
    this.state = {
      open: false,
      factureId: '',
      title:'',
      companyName:'',
      date:'',
    }
  }
  handleOpen = (id, title, companyName, date) => {

      this.setState({open: true, 
        factureId:id, 
        title, 
        companyName,
        date,
      })
      
  };

   handleClose = () => {
   this.setState({open: false});
  };
  
render (){
  const {classes, component: Component, ariaLabelledBy} = this.props;
  return (
    <div>
      <Modal
        aria-labelledby={ariaLabelledBy}
        open={this.state.open}
        onClose={this.handleClose}
      >
        <Grid className={classes.paperContainer} container alignContent='center' >    
        <Grid item sm={2} md={4} xs={1}></Grid>    
            <Grid item sm={8} md={4} xs={10}  >
             <Paper className={classes.paper}>
            <Component />
          </Paper>
          <Grid item sm={2} md={4} xs={1}></Grid> 
            
        </Grid>
        </Grid>

      </Modal>
    </div>
  );}
}



SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  data: state.data,
 
})




export default connect(mapStateToProps,null, null,{forwardRef: true} )(withStyle(styles)(SimpleModal));
