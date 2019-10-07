import React from 'react';
import withStyle from '@material-ui/core/styles/withStyles'
import Modal from '@material-ui/core/Modal';
import InvoiceDisplay from './InvoiceDisplay';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const styles = {
  paper: {
    width: '70%',
    backgroundColor: '#fff',
    margin: '0 auto',
    marginTop: '10%',
    
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

  class InvoiceModal extends React.Component  {
  
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
  const {classes} = this.props;
  return (
    <div>
      <Modal
        aria-labelledby="Facture"
        open={this.state.open}
        onClose={this.handleClose}
      >
        <div  className={classes.paper}>
          <div className={classes.modalTitle}>
            <h3 id="facture-title">{this.state.title}</h3>
            <div className={classes.textToright} ><span className={classes.company} >Nom de la compagnie : <b className = {classes.companyValue}>{this.state.companyName}</b></span><br />
            <span className={classes.date}>{this.state.date}</span>
            </div>
          </div>
          
          
            <InvoiceDisplay id={this.state.factureId}/>
        </div>
      </Modal>
    </div>
  );}
}



InvoiceModal.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  data: state.data,
 
})




export default connect(mapStateToProps,null, null,{forwardRef: true} )(withStyle(styles)(InvoiceModal));
