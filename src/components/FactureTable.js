import React from 'react';
import MaterialTable from 'material-table';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';


  class FactureTable extends React.Component {
    render() {
      return (
        <MaterialTable
          title="Toutes Mes Factures"
          columns={[
            { title: 'Compagnie', field: 'companyName' },
            { title: 'Montant', field: 'totalPrice' },
            { title: 'Créée le', field: 'createdAt', type: 'date' },
           
          ]}
          data={this.props.data.factures}        
          actions={[
            {
              icon: 'print',
              iconProps: {color:'secondary'},
              tooltip: 'Imprimer',
              onClick: (event, rowData) => alert("Vous allez imprimer une facture pour " + rowData.company)
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
      )
    }
  }

  FactureTable.propTypes = {
        data: PropTypes.object.isRequired
   
}

const mapStateToProps = (state) => ({
    data: state.data,
    
    
})



export default connect(mapStateToProps)(FactureTable);
