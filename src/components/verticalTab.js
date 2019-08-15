import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flex:1,
    height: '100vh',
    position:'fixed',
    width:'100%'
    
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: '#fff7f7',
    width:'20vw',
    paddingTop: '35px'
  },

  tabElement: {
      fontSize: '0.9rem',
      fontWeight: '700',
      margin: '8px 0'
  },
  tabPanel: {
      width:'100%'
  }
}));

export default function VerticalTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        aria-label="Gestion facture"
        className={classes.tabs}
      >
        <Tab className={classes.tabElement} label="Toutes les factures" {...a11yProps(0)} />
        <Tab className={classes.tabElement} label="Creer une facture" {...a11yProps(1)} />
        <Tab className={classes.tabElement} label="Ajouter un produit" {...a11yProps(2)} />
        <Tab className={classes.tabElement} label="Ajouter une compagnie" {...a11yProps(3)} />
        
      </Tabs>
      <TabPanel className={classes.tabPanel} value={value} index={0}>
        {props.element[0]}
      </TabPanel>
      <TabPanel className={classes.tabPanel} value={value} index={1}>
       {props.element[3]}
      </TabPanel>
      <TabPanel className={classes.tabPanel} value={value} index={2}>
        {props.element[1]}
      </TabPanel>
      <TabPanel className={classes.tabPanel} value={value} index={3}>
       {props.element[2]}
      </TabPanel>
     
    </div>
  );
}

