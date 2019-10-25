import React, { Component } from 'react';
import {connect} from 'react-redux';
import {customersIncomeThisYear} from '../util/helpers';

import MaterialTable from 'material-table';

export class CompanyList extends Component {
    constructor(props){
        super(props);
        this.state = {
          formattedCompanies: []
        }
    }
   
    componentDidMount(){
      const customersIncome = customersIncomeThisYear(this.props.data.factures);
      const formattedCompanies = this.props.data.companies.map(company => {
       const companyFound = customersIncome.find(customerIncome => company.companyName === customerIncome.company)
       console.log(companyFound)  
       
            return {
            companyName: company.companyName,
            address: company.address,
            tel:company.tel,
            total: companyFound ? companyFound.total.toLocaleString('fr-FR') : '0',
          }
        
      })

      this.setState({formattedCompanies})
    }

    render() {
      const {classes, data:{companies,factures}} = this.props;
      console.log(this.props)

        return (
            <div>
                <MaterialTable 
          title=''
          columns={[
            { title: 'Compagnie', field: 'companyName' },
            { title: 'Adresse', field: 'address' },
            { title: 'Téléphone', field: 'tel' },
            { title: 'Montant Généré(Année en cours)', field: 'total' },
            
           
          ]}

          options= {{headerStyle: {
            backgroundColor: ' #f9fafe',
            paddingTop:'5px',
            paddingBottom: '5px',
            
          }}}
          hover = {true}
          data={this.state.formattedCompanies}        
          actions={[
            {
              icon: 'delete',
              iconProps: {color:'secondary'},
              tooltip: 'Delete',
              //onClick: (event, rowData) => this.print(rowData.id)
            },
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
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    data: state.data
})

export default connect(mapStateToProps)(CompanyList)
