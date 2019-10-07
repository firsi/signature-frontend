import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
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
import {NavLink, Link} from 'react-router-dom';
import LinkMUI from '@material-ui/core/Link';
import {withRouter} from 'react-router-dom';

const useTreeItemStyles = makeStyles(theme => ({
  root: {
    
    color: "#fff",
    '&:focus > $content': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.secondary.main})`,
      color: '#fff',
    },
  },
  content: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: '500',
    '$expanded > &': {
      color: theme.palette.secondary.main,
    },
  },
  group: {
    marginLeft: 0,
    '& $content': {
      paddingLeft: theme.spacing(2),
    },
  },
  expanded: {},
  label: {
    fontWeight: 'inherit',
    color: '#fff',
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(1),
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
  },
  link: {
    color: 'inherit',
    display: 'inline-block',
    width:'100%',
    '&:hover ':{
      textDecoration:'none'
    }
  },
  active: {
      color: theme.palette.secondary.main,
  }
}));

function StyledTreeItem(props) {
  const classes = useTreeItemStyles();
  const { labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, component, to, ...other } = props;

  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>

          {LabelIcon ? <LabelIcon color="inherit" className={classes.labelIcon} /> : <span></span>}
          <Typography variant="body2" className={classes.labelText}>
          <LinkMUI component = {component}
      to = {to} className={classes.link} activeClassName={classes.active}>  {labelText}</LinkMUI>
          </Typography> 
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </div>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        group: classes.group,
        label: classes.label,
      }}
      
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

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
      <StyledTreeItem component={NavLink} to='/' className={classes.bottomMargin} nodeId="1" labelText="Factures" labelIcon={LibraryBooksIcon} >
        </StyledTreeItem>
      <StyledTreeItem className={classes.bottomMargin} nodeId="2" labelText="Proforma" labelIcon={CollectionsBookmarkIcon} />
      <StyledTreeItem nodeId="3" labelText="Bordereau" labelIcon={Label}/>

      <Divider variant="middle" className={classes.divider}/>

      <StyledTreeItem className={classes.bottomMargin} nodeId="4" labelText="Produit" labelIcon={ShoppingCart} >
      <StyledTreeItem component={Link} to='/products' nodeId="7" labelText="Ajouter un produit" labelIcon={PlaylistAddIcon}/>

      </StyledTreeItem>
      <StyledTreeItem className={classes.bottomMargin} nodeId="5" labelText="Compagnies" labelIcon={Business} >
      <StyledTreeItem component={NavLink} to='/companies' nodeId="8" labelText="Ajouter une compagnie" labelIcon={PlaylistAddIcon}/>
      </StyledTreeItem>
      
      <StyledTreeItem className={classes.bottomMargin} nodeId="6" labelText="Réglages" labelIcon={SettingsApplications} />
    </TreeView>
  );
}

export default MenuTreeView;