import React, { Component } from 'react'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import VerticalTab from '../components/verticalTab';
import AddProduct from '../components/AddProduct';
import AddCompany from '../components/AddCompany';
import AddFacture from '../components/editFacture/AddFacture';


//Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import ListItem from '@material-ui/core/ListItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import FactureTable from '../components/Factures/FactureTable';


//redux
import {getAllFactures} from '../redux/actions/dataActions';


//import CommentIcon from '@material-ui/core/Icon/';
const styles = {
    root: {
      height: '60px',
      borderBottom: `1px solid rgba(0, 0, 0, 0.12)`,
           },
    vertical: {
        
    },
    primary: {
        body1 :{
            fontWeight: '700',
        }
    },
    progress:{  
        margin: '200px auto 0 400px'
    }
};

function ListItemLink(props) {
    return <ListItem button component={Link} {...props} />;
  }
export class Home extends Component {
   
    render() {
        
        let elementToShowArr = [];
        let {classes} = this.props;
        let {data:{factures}, ui: {loading}} = this.props;
        let RecentFacturesMarkup = !loading ? <FactureTable /> : <CircularProgress size={100} className={classes.progress} color='secondary' /> 

      /* elementToShowArr.push(RecentFacturesMarkup);
       elementToShowArr.push(<AddProduct />);
       elementToShowArr.push(<AddCompany />);
       elementToShowArr.push(<AddFacture />);
       
       */
      // <VerticalTab   element={elementToShowArr}/>
       return RecentFacturesMarkup;
       
               
                   
        
                   
               
        
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data,
    user: state.user,
    ui: state.ui
})

const mapActionToProps = {
    getAllFactures
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Home));
