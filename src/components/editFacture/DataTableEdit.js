import React, { Component } from 'react'
import './dataTableEdit.css';
import {formatFacture} from '../../util/helpers';

//redux
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles'
import {getAllProducts} from '../../redux/actions/dataActions';
import {postFacture} from '../../redux/actions/dataActions';
import {createCompany, generatePdf} from '../../redux/actions/dataActions';
import {CLEAR_ERRORS, CLEAR_DATA} from '../../redux/types';

//Material UI
import Button from '@material-ui/core/Button';
import Selection from '../Selection';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress'
import TextField from '@material-ui/core/TextField';
import  AddCompany  from '../AddCompany';
import SimpleModal from '../SimpleModal';


const styles = {
    root:  {
        display:'flex',
       justifyContent: 'space-between',
        
    },
    toolbox: {
        marginTop: '2%',
        flex:1,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems:'center',
            
    },
    company: {
        flex: 1,
        },
    button: {
        marginRight: '2%',
        height:'35px',
    },
    textField: {
        marginBottom:'20px',
        marginLeft:'20px',
        width: '400px'
    },
    leftIcon: {
        marginRight: '5%'
    },
    progress :{
        position: 'absolute'
        
        }
}

class DataTableEdit extends Component {
   constructor(props) {
      super(props) ;
      this.addCompanyRef = React.createRef();

      this.state = { 
         facture: [{ product: 'House', qty: 1, defaultPrice: 5000, montant: 5000 }],
         total:0,
         companyName:'',
         facttitle:'',
         open: false,
      }
   }

   componentDidMount(){
    this.props.getAllProducts();
   }
   
   handleChange = (index,event) => { 
        let total = 0;
        const rows = this.state.facture;
     
      if(event.target.name === 'product'){
          rows[index][event.target.name] = event.target.value;
          this.setPriceField(index, event);
          this.setMontantField(index);
          total = this.computeTotal();
      }
      else if (event.target.name === 'defaultPrice' || event.target.name ==='qty'){ 
          rows[index][event.target.name] = event.target.value; 
          this.setMontantField(index);
          total = this.computeTotal();
      }

      this.setState({facture: rows, total: total});           
   }

   setPriceField( index, event){
    const rows = this.state.facture;
    const products = this.props.data.products;
    const selectedIndex = event.target.selectedIndex;

    rows[index].defaultPrice  = products[selectedIndex].defaultPrice;
   }

   setMontantField( index){
        const rows = this.state.facture;
        rows[index].montant = rows[index].qty * rows[index].defaultPrice;
   }

   computeTotal = () => {
        const rows = this.state.facture;
        return rows.reduce((accumulator, item) => {return accumulator + item.montant},0);
    }

   handleFactureTitle = (event) => {
        this.setState({[event.target.name] : event.target.value});
   }

   save = () => {
       const factureData = {
           title: this.state.facttitle,
           companyName: this.props.data.companyName,
           totalPrice: this.state.total,
           commandes: this.state.facture
       }

       this.props.postFacture(factureData);
   }

  
   print = () => {
    const data = {
         title: this.state.facttitle,
         totalPrice: this.state.total,
         commandes : this.state.facture,
         companyName: this.props.data.companyName
    }
    const factureData = formatFacture(data);

    this.props.generatePdf(factureData);
   }
     
   addRow = () => {
        const rows = this.state.facture;
        rows.push( { product: 'House', qty: 1, defaultPrice: 1, montant: 1 });
        this.setState({facture: rows});
   }

   deleteRow = (index) => {
    const rows = this.state.facture;
    rows.splice(index,1);
    const total = this.computeTotal();
    this.setState({facture: rows,
                     total: total
                  });
   }

   addCompany = () => {
    this.addCompanyRef.current.handleOpen();
   }

   renderAddProduct(classes){
    return (
            <div className={classes.company} >
                <SimpleModal ref={this.addCompanyRef} component={AddCompany} />
                <Selection />

                <IconButton color='secondary' aria-label="supprimer" onClick={this.addCompany}>
                    <AddIcon />
                </IconButton>   
            </div>
    );
   }

   renderToolbox(classes, loading){
       return(
                <div className={classes.toolbox}>
                    <Button size='small' color='primary' variant='contained' 
                    className={classes.button} onClick={this.addRow}>
                        <ViewHeadlineIcon className={classes.leftIcon}/>Ligne
                    </Button>

                    <Button size='small' color='primary' variant='contained' 
                    className={classes.button} onClick={this.print} disabled={loading}>
                        <PrintIcon className={classes.leftIcon}/>
                        Imprimer{loading && 
                                <CircularProgress size={20} className={classes.progress} color='secondary' />}
                    </Button>

                    <Button size='small' color='primary' variant='contained' 
                    className={classes.button} onClick={this.save} disabled={loading}>
                        <SaveIcon className={classes.leftIcon} />
                        Enregistrer {loading && 
                                    <CircularProgress size={20} className={classes.progress} color='secondary' />}
                    </Button>
                </div>
       )
   }

   renderTableData() {
    let products = this.props.data.products; 

    return this.state.facture.map((row, index) => {  
      let {montant} = row 
      const formattedMontant = montant.toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' });

       return (
        
          <tr key={index} className='row'>
             <td> 
                <IconButton color='secondary' aria-label="supprimer" 
                    onClick={(event) => this.deleteRow(index, event)}>
                    <DeleteIcon />
                </IconButton>   
            </td>

             <td>
                <select name='product' value={this.state.facture[index].product} 
                onChange={(event) => this.handleChange(index, event)} >
                        {products.map((item) => <option value={item.product}>{item.product}</option>)}
                </select>
            </td>

            <td>
                 <input type='number'name='qty' value={this.state.facture[index].qty} 
                    onChange={(event) => this.handleChange(index, event)} min={1}
                    />
            </td>

            <td>
                 <input type='number'name='defaultPrice' value={this.state.facture[index].defaultPrice}
                    onChange={(event) => this.handleChange(index, event)} min={1}/>
            </td>
                    
             <td onClick={this.computeTotal}> {formattedMontant} </td>
          </tr>
       )
    })
 }

 renderTableHeader() { 
    return (<tr>
                <th >Actions</th>
                <th >Designation</th>
                <th >Quantité</th>
                <th >Prix</th>
                <th >Montant</th>
            </tr>
      )
 }

    render() {
        let {classes, ui : {loading}} = this.props;

        return (
            <div>
                <div>
                    <TextField  id='facttitle' type='text' name='facttitle' label ="Titre de la facture" 
                    value={this.state.title} onChange={this.handleFactureTitle} 
                    className={classes.textField}  />
                </div>

                <div className={classes.root}>
                    {this.renderAddProduct(classes)}
                    {this.renderToolbox(classes, loading)}
                </div>
                
                <table id='facture'>
                    {this.renderTableHeader()}
                    <tbody>
                        {this.renderTableData()}
                        <tr>
                            <th id="total" colSpan={4}>Montant HT :</th>
                            <td id='total-value'>
                                {this.state.total.toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' })}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
 }
}
const clearErrors = () => ({ type: CLEAR_ERRORS });
const clearData = () => ({ type: CLEAR_DATA });

const mapStateToProps = (state) => ({
    data: state.data,
    ui: state.ui
});

const mapActionToProps = {
    getAllProducts,
    postFacture,
    createCompany,
    generatePdf,
    clearErrors,
    clearData
};



export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DataTableEdit));