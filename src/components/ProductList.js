import React, { Component } from 'react';
import {connect} from 'react-redux';


import MaterialTable from 'material-table';

export class ProductList extends Component {
    constructor(props){
        super(props);
    
    }
   
    render() {
        const {data:{products}} = this.props;

        return (
          <div>
              <MaterialTable 
                title=''
                columns={[
                  { title: 'Produit', field: 'product' },
                  { title: 'Prix', field: 'defaultPrice' },
                  { title: 'Description', field: 'description' },
                ]}

              options= {{headerStyle: {
                backgroundColor: ' #f9fafe',
                paddingTop:'5px',
                paddingBottom: '5px', 
              }}}

              hover = {true}
              data={products}        
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
                
              }}/>

           </div>
        )
    }
}


const mapStateToProps = (state) => ({
    data: state.data
})

export default connect(mapStateToProps)(ProductList)
