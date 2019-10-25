import React, { Fragment } from 'react';
import MaterialTable from 'material-table';


import withStyles from '@material-ui/core/styles/withStyles';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {formatFacture } from '../../util/helpers';
import { generatePdf } from '../../redux/actions/dataActions';
import { getFacture } from '../../redux/actions/dataActions';
import InvoiceModal from './InvoiceModal';
import './FactureTable.css';



const styles = {
  
  
};

  class FactureTable extends React.Component {
    constructor(props){
      super(props);
      this.InvoiceModalElement = React.createRef();
    }

    print = (id) => {
      
      this.props.getFacture(id).then((response) => {

        const data = {
          title: response.title,
          totalPrice: response.totalPrice,
          commandes : response.commandes,
          companyName: response.companyName
     }
     const factureData = formatFacture(data);
     this.props.generatePdf(factureData);

      })
    }
    displayFacture = (id, title, companyName, date) => {
     
      this.InvoiceModalElement.current.handleOpen(id, title, companyName, date);  
    }

   
    render() {

      const {classes} = this.props;
      const factures = this.props.data.factures.map((current) => {
      const formattedMontant = current.totalPrice.toLocaleString('fr-FR', { style: 'currency', currency: 'XOF' });
      const createdAt = <Moment format="YYYY-MM-DD">{current.createdAt}</Moment>;
      return {companyName: current.companyName,
              totalPrice: formattedMontant,
              createdAt,
              title: current.title,
              id: current.factureId
            }
            
       });
      
      
      
      return (<Fragment>
        
        <InvoiceModal ref = {this.InvoiceModalElement}/>
       
         {/*Invoices table*/}
         
        <MaterialTable className={classes.material}
          title="Toutes Mes Factures"
          columns={[
            { title: 'Compagnie', field: 'companyName' },
            { title: 'Titre', field: 'title' },
            { title: 'Montant', field: 'totalPrice' },
            { title: 'Créée le', field: 'createdAt', type: 'date' },
          
          ]}

          options= {{headerStyle: {
            backgroundColor: ' #f9fafe',
            paddingTop:'5px',
            paddingBottom: '5px',
            
          }}}
          hover = {true}
          data={factures}        
          actions={[
            {
              icon: 'print',
              iconProps: {color:'secondary'},
              tooltip: 'Imprimer',
              onClick: (event, rowData) => this.print(rowData.id)
            },
            {
              icon: 'open_in_browser',
              iconProps: {color:'secondary'},
              tooltip: 'Consulter les détails',
              onClick: (event, rowData) => this.displayFacture(rowData.id, rowData.title, rowData.companyName, rowData.createdAt)
            }
          ]}
          
          localization={{
            pagination: {
                labelDisplayedRows: '{from}-{to} sur {count}',
                labelRowsSelect : 'rangées',
                firstTooltip: 'Début',
                previousTooltip: 'Page précédente',
                nextTooltip: 'Page suivante',
                lastTooltip: 'Fin'
            },
            toolbar: {
                searchPlaceholder: 'Rechercher',
                searchTooltip: 'Rechercher'
            },
            body: {
              emptyDataSourceMessage: 'Rien à afficher'
            }
            
        }}
            
          
        />
        </Fragment>
      )
    }
  }

  FactureTable.propTypes = {
        data: PropTypes.object.isRequired
   
}

const mapStateToProps = (state) => ({
    data: state.data,
    
})
const mapActionToProps = {
  generatePdf,
  getFacture,
}



export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(FactureTable));
