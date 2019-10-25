import React from 'react';
import PropTypes from 'prop-types';
import { StyledTreeItem } from './StyledTreeItem';

//Material-ui
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import SettingsApplications from '@material-ui/icons/SettingsApplications';
import Business from '@material-ui/icons/Business';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import Label from '@material-ui/icons/Label';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Divider from '@material-ui/core/Divider';

import { Link} from '@reach/router';
import { connect } from 'react-redux';


const NavLink = props => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      return {
        style: {
          color: isCurrent ? "#b71c1c" : "#fff"
        }
      };
    }}
  />
);

const useStyles = makeStyles((theme) => ({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
  divider: {
      backgroundColor: theme.palette.secondary.dark,
      marginTop: '12%',
      marginBottom: '12%',
      marginLeft: '11%',
      width:'30px'
  },
  bottomMargin: {
      marginBottom: '3%'
  }
}));

function MenuTreeView() {
  const classes = useStyles();

  return (
    <TreeView
      className={classes.root}
      defaultExpanded={['2']}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
    >
        <StyledTreeItem component={NavLink} to='/' className={classes.bottomMargin} 
        nodeId="1" labelText="Factures" labelIcon={LibraryBooksIcon} >
        </StyledTreeItem>
        
        <StyledTreeItem className={classes.bottomMargin} 
        nodeId="2" labelText="Proforma" labelIcon={CollectionsBookmarkIcon} />
        <StyledTreeItem nodeId="3" labelText="Bordereau" labelIcon={Label}/>

        <Divider variant="middle" className={classes.divider}/>

        <StyledTreeItem className={classes.bottomMargin} nodeId="4" labelText="Produit" labelIcon={ShoppingCart} >
          <StyledTreeItem component={NavLink} to='/products' 
          nodeId="7" labelText="Ajouter un produit" labelIcon={PlaylistAddIcon}/>
        </StyledTreeItem>

        <StyledTreeItem className={classes.bottomMargin} nodeId="5" labelText="Compagnies" labelIcon={Business} >
          <StyledTreeItem component={NavLink} to='/companies' 
          nodeId="8" labelText="Ajouter une compagnie" labelIcon={PlaylistAddIcon}/>
        </StyledTreeItem>
        
        <StyledTreeItem className={classes.bottomMargin} 
        nodeId="6" labelText="Réglages" labelIcon={SettingsApplications} />
    </TreeView>
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  ui: state.ui,
  data: state.data
})
export default connect(mapStateToProps)(MenuTreeView);