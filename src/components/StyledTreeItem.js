import React from 'react';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import LinkMUI from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles'

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

export const StyledTreeItem = (props) => {
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