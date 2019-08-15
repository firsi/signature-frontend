import React, { Component } from 'react'
import './dataTableEdit.css';

//redux
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles'
import {getAllProducts} from '../redux/actions/dataActions';
import {postFacture} from '../redux/actions/dataActions';

//Material UI
import Button from '@material-ui/core/Button';
import Selection from './Selection';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress'
import CompanyDialog from './CompanyDialog';


const styles = {
    root:  {
        display:'flex',
       justifyContent: 'space-between',
        
    },
    toolbox: {
        marginTop: '2%',
        flex:1,
        display: 'flex',
        justifyContent: 'flex-end'     
    },
    company: {
        flex: 1,
        },
    button: {
        marginRight: '2%',
        height:'40px',
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
      super(props) 
      this.state = { 
         facture: [
            {  product: '', qty: 1, defaultPrice: 5000, montant: 5000 },
         ],
         total:0,
         companyName:'',
         open: false,
      }
   }
   componentWillMount(){
    this.props.getAllProducts();
   }
   handleChange = (index,event) => {
      const rows = this.state.facture;
        let total = 0;

        
      //when its a product, update the price field
      if(event.target.name === 'product'){


          const products = this.props.data.products;
          let selectedIndex = event.target.selectedIndex;

          rows[index].defaultPrice  = products[selectedIndex].defaultPrice;
          rows[index][event.target.name] = event.target.value;
          rows[index].montant = rows[index].qty * rows[index].defaultPrice;
          total = this.totalComputing();

      }else if (event.target.name === 'defaultPrice' || event.target.name ==='qty'){
          if(/\s*-\s*/.test(event.target.value)){
              console.log('dedans')
              return;
          }
        rows[index][event.target.name] = event.target.value;
        rows[index].montant = rows[index].qty * rows[index].defaultPrice;

         total = this.totalComputing();
       
      }
      
      this.setState({facture: rows,
                    total: total                    
                    });
   }
   totalComputing = () => {
        const rows = this.state.facture;
       return rows.reduce((accumulator, item) => {return accumulator + item.montant},0);
   }
   validation = (event) => {
       console.log(event.keyCode);
        if(event.keyCode === 107 || event.keyCode === 107 || event.target.value <= 0){
            event.preventDefault();
            return;
        }
   }
   
   save = () => {
       console.log(this.props.data.companyName);
       const factureData = {
           companyName: this.props.data.companyName,
           totalPrice: this.state.total,
           commandes: this.state.facture
       }

       console.log(factureData);
       this.props.postFacture(factureData);
   }
   addCompany = () => {
        this.setState({open: true})
   }
   addRow = () => {
        const rows = this.state.facture;
        rows.push( { product: '', qty: 1, defaultPrice: 1, montant: 1 });
        this.setState({facture: rows});
   }
   deleteRow = (index, event) => {
    const rows = this.state.facture;
    rows.splice(index,1);
    const total = this.totalComputing();
      this.setState({facture: rows,
                     total: total
                    });
   }
   renderTableData() {
    let products = this.props.data.products; 
    const rows  = this.state.facture;
    
    return this.state.facture.map((row, index) => {
        
       let { id, product, qty, defaultPrice, montant } = row //destructuring
      
      const formattedMontant = montant.toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' });;
      

       return (
        
          <tr key={index}>
             <td> <IconButton color='secondary' aria-label="supprimer" onClick={(event) => this.deleteRow(index, event)}>
                    <DeleteIcon />
                  </IconButton>   
            </td>
             <td><select name='product' value={this.state.facture[index].product} 
                    onChange={(event) => this.handleChange(index, event)} >
                        {products.map((item, index) => <option value={item.product}>{item.product}</option>)}
                </select>
            </td>

             <td><input type='number'name='qty' value={this.state.facture[index].qty} 
                    onChange={(event) => this.handleChange(index, event)}
                    min={1}
                    /></td>

             <td><input type='number'name='defaultPrice' value={this.state.facture[index].defaultPrice}
                    onChange={(event) => this.handleChange(index, event)}
                    min={1}
                    /></td>
             <td onClick={this.totalComputing}>{formattedMontant}</td>
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
           <CompanyDialog open={this.state.open} />
           <div className={classes.root}>
               <div className={classes.company} >
                 <Selection />
                 <IconButton color='secondary' aria-label="supprimer" onClick={this.addCompany}>
                    <AddIcon />
                  </IconButton>   
               </div>
               <div className={classes.toolbox}>
                    <Button variant='contained' className={classes.button} onClick={this.addRow}>
                        <ViewHeadlineIcon className={classes.leftIcon}/>
                        Ligne</Button>

                    <Button variant='contained' className={classes.button} onClick={this.print}>
                        <PrintIcon className={classes.leftIcon}/>
                        Imprimer</Button>

                   
                    <Button variant='contained' className={classes.button} onClick={this.save} disabled={loading}>
                        <SaveIcon className={classes.leftIcon} />
    Enregistrer {loading && <CircularProgress size={20} className={classes.progress} color='secondary' />}</Button>
               </div>
            
            
           </div>
       
        
          <table id='facture'>
              {this.renderTableHeader()}
             <tbody>
                {this.renderTableData()}
                <tr>
                    <th id="total" colSpan={4}>Montant HT :</th>
                    <td id='total-value'>{this.state.total.toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' })}</td>
                </tr>
             </tbody>
          </table>
       </div>
    )
 }
}

const mapStateToProps = (state) => ({
    data: state.data,
    ui: state.ui
});

const mapActionToProps = {
    getAllProducts,
    postFacture
};

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DataTableEdit));