import React, { Fragment } from 'react';
import MaterialTable from 'material-table';
import BarChart from '@material-ui/icons/BarChart'
import BusinessCenter from '@material-ui/icons/BusinessCenter';
import Person from '@material-ui/icons/Person'

import withStyles from '@material-ui/core/styles/withStyles';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {formatFacture} from '../../util/helpers';
import { generatePdf } from '../../redux/actions/dataActions';
import { getFacture } from '../../redux/actions/dataActions';
import { withRouter } from 'react-router-dom';
import InvoiceModal from './InvoiceModal';
import './FactureTable.css';
import InfoBox from './InfoBox';


const styles = {
  material: {
     
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
  boxIcon: {
    fontSize: '35px',
  }
};

  class FactureTable extends React.Component {
    constructor(props){
      super(props);
      this.InvoiceModalElement = React.createRef();
      
    }

    computeChiffreAffaire(invoices){
      const total = invoices.reduce((accumulator, facture) => accumulator + facture.totalPrice,0);
      return total.toLocaleString('fr-FR');
    }
   bestCustomer = (invoices) => {
      const factures = invoices;
      //Get Invoices of this month
      const presentMonthFactures = factures.filter(current => {
        if(new Date(current.createdAt).getFullYear() === new Date().getFullYear()){
          return new  Date(current.createdAt).getMonth() === new Date().getMonth()
        }
      });
      let companies = [];
      presentMonthFactures.map(facture => {
          // check if we've already compute this company invoices
          if(!companies.find(name => name === facture.companyName)){
          //compute a single company total
          let singleCompanyMontantTotal =  presentMonthFactures.filter(current => facture.companyName === current.companyName)
                              .reduce((accumulator, fact) => accumulator+fact.totalPrice,0); 
            
            companies.push({company: facture.companyName ,
                            total: singleCompanyMontantTotal});
          }
      });
      //compare total
      let bestCustomer = {company:'', total:0}
      companies.forEach(facture => {
          if(facture.total > bestCustomer.total)bestCustomer=facture;
      })
      console.log(bestCustomer);
      
      return bestCustomer;
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
      const bestCustomer = this.bestCustomer(this.props.data.factures);
      const description = `Meilleur client du mois: ${bestCustomer.total.toLocaleString('fr-FR')} FCFA`
      return (<Fragment>
        
        <InvoiceModal ref = {this.InvoiceModalElement}/>
        <div className={classes.topInfo}>
          <InfoBox 
            icon={<BarChart className={classes.boxIcon}  />}
            label={this.computeChiffreAffaire(this.props.data.factures)}
            labelCurrency='FCFA'
            description = "Votre chiffre d'affaire de cette année"
            color='#c31a1a'
            
            />
            <InfoBox 
            icon={<Person className={classes.boxIcon}  />}
            label='Brigitte Edimo'
            description = "Votre meilleur employé sur le terrain"
            color='#1cb7a0'
            
            />
            <InfoBox 
            icon={<BusinessCenter className={classes.boxIcon}  />}
            label={bestCustomer.company}
            description = {description}
            color='#3db71c'
            
            />
          
          
        </div>
        <MaterialTable className={classes.material}
          title="Toutes Mes Factures"
          columns={[
            { title: 'Compagnie', field: 'companyName' },
            { title: 'Titre', field: 'title' },
            { title: 'Montant', field: 'totalPrice' },
            { title: 'Créée le', field: 'createdAt', type: 'date' },
           
          ]}
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



export default withRouter(connect(mapStateToProps, mapActionToProps)(withStyles(styles)(FactureTable)));
