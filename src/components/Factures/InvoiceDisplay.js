import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import {connect} from 'react-redux';
import {getFacture} from '../../redux/actions/dataActions';
import PropTypes from 'prop-types';

const styles = {
  root: {
    width: '100%',
    minHeight: '200px', 
    overflowX: 'auto',
    
  },
  table: {
    minWidth: 650,
    marginBottom: '70px'
  },
  progress:{  
    margin: '0 auto',
    marginTop: '50px',
    marginLeft:'150%'
},
head:{
  backgroundColor: '#fef9f9',
},
headRow: {
    border: '0px',
    borderBottom: '2px solid #b71c1c',
    color: '#000',
    fontSize: '15px',
    fontWeight: '700',
    paddingTop: '7px',
    paddingBottom: '7px'
  
},
cell : {
  fontWeight: '600',
},
noBorderBottom: {
  borderBottom: '0px'
},
 total: {
   paddingTop: '40px',
   paddingBottom: '10px',
   borderBottom: '4px solid #b71c1c',
   fontWeight: '700',
   fontSize: '16px'
 }
};



class InvoiceDisplay extends React.Component {
constructor(props){
  super(props);
  this.state = {
    rows: [],
    loading: true
  }
}
  componentDidMount(){
   this.props.getFacture(this.props.id).then(data => {

    const commandes = data.commandes.map(current =>{
      return {
          product: current.product,
          qty: current.qty.toLocaleString('fr-FR'),
          defaultPrice: current.defaultPrice.toLocaleString('fr-FR'),
          montant: current.montant.toLocaleString('fr-FR'),
          
      }
  }
  )
     
    this.setState({rows: commandes, loading: false})
    console.log(data.commandes)
   });
  }
render(){

  const {classes} = this.props;
  const {rows} = this.state;
  const body = this.state.loading ? <CircularProgress size={60} className={classes.progress} color='secondary' /> :
                <TableBody>
                {rows.map(row => (
                  <TableRow key={row.product}>
                    <TableCell className={classes.cell} component="th" scope="row">
                      {row.product}
                    </TableCell>
                    <TableCell className={classes.cell} align="right">{row.qty}</TableCell>
                    <TableCell className={classes.cell} align="right">{row.defaultPrice}</TableCell>
                    <TableCell className={classes.cell} align="right">{row.montant}</TableCell>
                  </TableRow>
                ))}
              </TableBody>

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead className={classes.head}>
          <TableRow >
            <TableCell className={classes.headRow} >Désignation</TableCell>
            <TableCell className={classes.headRow} align="right">Quantité</TableCell>
            <TableCell className={classes.headRow} align="right">Prix Unit</TableCell>
            <TableCell className={classes.headRow} align="right">Montant</TableCell>
          </TableRow>
        </TableHead>
          {body}
          <TableRow>
            <TableCell className={classes.noBorderBottom} rowSpan={3} />
            <TableCell  className={classes.noBorderBottom} rowSpan={3} />
            <TableCell className={classes.total}colSpan={1}>Total</TableCell>
            <TableCell className={classes.total} align="right">{this.props.data.facture.totalPrice} </TableCell>
          </TableRow>
      </Table>
    </Paper>
  );
          }
}

InvoiceDisplay.propTypes = {
  data: PropTypes.object.isRequired

}

const mapStateToProps = (state) => ({
data: state.data,

})
const mapActionToProps = {
getFacture,
}


export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(InvoiceDisplay));