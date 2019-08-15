import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {getAllProducts} from '../redux/actions/dataActions';
import {getAllCompanies} from '../redux/actions/dataActions';
import PropTypes from 'prop-types';
import Selection from './Selection';


//Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import { EditingState, DataTypeProvider } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
} from '@devexpress/dx-react-grid-material-ui';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';



const getRowId = row => row.id;

const styles = {
    paper: {
       
        paddingTop:'20px'
        
    },

    title: {
        fontWeight: '700',
        margin: '0px 0 15px 20px',
        
    },
   

    

}

 const AddFacture = (props) => {

  const [columns] = useState([
    { name: 'product', title: 'Designation' },
    { name: 'qty', title: 'Quantité' },
    { name: 'price', title: 'Prix Unit.' },
    { name: 'montant', title: 'Montant' },
   
  ]);
  const [rows, setRows] = useState([
      
  ]);
  const [tableColumnExtensions] = useState([
    { columnName: 'qty', width: 150 },
    { columnName: 'price', width: 150 },
    
  ]);
  const [editingRowIds, setEditingRowIds] = useState([]);
  const [addedRows, setAddedRows] = useState([]);
  const [rowChanges, setRowChanges] = useState({});
  const [productColumns] = useState(['product']);
  
   
   useEffect(() => {
    props.getAllProducts();

  }, []);

  
  const changeAddedRows = value => setAddedRows(
    value.map(row => (Object.keys(row).length ? row : {
      product: props.data.products[0].product,
      qty: 0,
      price: props.data.products[0].defaultPrice,
      montant: 0,
      
    })),
  );

  // Custom column set up
  const ProductEditor = ({ value, onValueChange }) => (
    <Select
      input={<Input />}
      value={value}
      onChange={event => {console.log('product changed');

      setRowChanges({
        product: props.data.products[0].product,
        qty: 0,
        price: props.data.products[0].defaultPrice,
        montant: 0,
        
      });
      
      return onValueChange( event.target.value )}}
      style={{ width: '100%',marginTop: '21px' }}
      displayEmpty
    >
        {props.data.products.map(item => <MenuItem key={`product${item.product}`} value={item.product}>{item.product}</MenuItem>)}
         <MenuItem value="" disabled>
            Produit
          </MenuItem>
    </Select>
  );

  const ProductFormatter = ({ value }) => <Chip label={value} />;

  //Editing Buttons 
  const AddButton = ({ onExecute }) => (
    <div style={{ textAlign: 'center' }}>
      <Button
        color="primary"
        onClick={onExecute}
        title="Create new row"
      >
        Ajouter
      </Button>
    </div>
  );
  
  const EditButton = ({ onExecute }) => (
    <IconButton onClick={onExecute} title="Modifier">
      <EditIcon />
    </IconButton>
  );
  
  const DeleteButton = ({ onExecute }) => (
    <IconButton
      onClick={() => {
        // eslint-disable-next-line
        if (window.confirm('Voulez vous vraiment supprimer cette ligne ?')) {
          onExecute();
        }
      }}
      title="Supprimer"
    >
      <DeleteIcon />
    </IconButton>
  );
  
  const CommitButton = ({ onExecute }) => (
    <IconButton onClick={onExecute} title="Sauvegarder">
      <SaveIcon />
    </IconButton>
  );
  
  const CancelButton = ({ onExecute }) => (
    <IconButton color="secondary" onClick={onExecute} title="Annuler">
      <CancelIcon />
    </IconButton>
  );
  
  const commandComponents = {
    add: AddButton,
    edit: EditButton,
    delete: DeleteButton,
    commit: CommitButton,
    cancel: CancelButton,
  };
  
  const Command = ({ id, onExecute }) => {
    const CommandButton = commandComponents[id];
    return (
      <CommandButton
        onExecute={onExecute}
      />
    );
  };

  //Tables  Changes handle
  
  /*const changeAddedRows = (value) => {
    const initialized = value.map(row => (Object.keys(row).length ? row : { city: 'Tokio' }));
    setAddedRows(initialized);
  };*/

  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
      
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = rows.filter(row => !deletedSet.has(row.id));
    }
    setRows(changedRows);
  };
  const {classes} = props;


  return (
    <Paper className={classes.paper}>
     
        <Typography className = {classes.title} variant='h6' 
                     >Produire une facture</Typography >

        <Selection />
      <Grid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
      >
          <DataTypeProvider
            formatterComponent={ProductFormatter}
            editorComponent={ProductEditor}
            {...props} 
            for={productColumns} 
            />

        <EditingState
          editingRowIds={editingRowIds}
          onEditingRowIdsChange={setEditingRowIds}
          rowChanges={rowChanges}
          onRowChangesChange={setRowChanges}
          addedRows={addedRows}
          onAddedRowsChange={changeAddedRows}
          onCommitChanges={commitChanges}
          
        />
        <Table
          columnExtensions={tableColumnExtensions}
        />
        <TableHeaderRow />
        <TableEditRow  />

        <TableEditColumn
          showAddCommand={!addedRows.length}
          showEditCommand
          showDeleteCommand
          commandComponent={Command}
        />
      </Grid>
    </Paper>
  );
};

const mapStateToProps = (state) => ({
    data: state.data
});

const mapActionToProps = {
    getAllProducts
};

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles) (AddFacture));