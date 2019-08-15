import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

//redux
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getAllCompanies} from '../redux/actions/dataActions';
import {setCompany} from '../redux/actions/dataActions';

//Material
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';

const styles = {
    selection: {
        minWidth: '220px',
        margin: '30px 0 20px 20px'
    }
};

 class Selection extends Component {
    constructor(props){
        super(props);

        this.state = {
            companies: [],
    
            companyName:''
        }
    }
    

      handleChange = (event) => {
        this.setState({ 
            [event.target.name] : event.target.value
        })
        this.props.setCompany(event.target.value);
      }

      componentWillMount(){
          this.props.getAllCompanies();

      }
    componentWillReceiveProps(nextProps){
        if(nextProps.data.companies){
           // console.log(nextProps.ui.errors)
            this.setState({companies: nextProps.data.companies})
        }
       
    }

    render() {
        const {classes} = this.props;
        return (
            <Select
          className={classes.selection}
          value={this.state.companyName}
          onChange={this.handleChange}
          input={<Input name="companyName" id="name-readonly"  />}
          displayEmpty

          
        >
          <MenuItem value="" disabled>
            Compagnie
          </MenuItem>
            {this.state.companies.map((company, index) => {
               return <MenuItem key={`MenuItem ${index}`} value={company.companyName}>{company.companyName}</MenuItem>
            })}
          
          
        </Select>
        )
    }
}

Selection.propTypes = {
    data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionToProps =  {
    getAllCompanies,
    setCompany
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Selection));