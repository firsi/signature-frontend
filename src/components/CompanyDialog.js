/*import React from 'react';
import Button from '@material-ui/core/Button';


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AddCompany } from './AddCompany';

class CompanyDialog extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      open : false
    }
  }
  
   handleClickOpen = () => {
    this.setState({
      open: this.props.open
    })
  }

  handleClose = () => {
    setOpen(false);
  }

  render() {
    return (
    
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Ajouter une compagnie</DialogTitle>
        <DialogContent>
            <AddCompany />
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleClose} color="primary">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
   
  );
}
}*/