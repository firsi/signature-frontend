import React, { Component } from 'react'
import Snackbar from '@material-ui/core/Snackbar'

//Redux
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import {CLEAR_ERRORS, CLEAR_DATA} from '../redux/types';


export class Feedback extends Component {

    constructor(){
        super();

        this.state = {
            errors: {},
            open:false,
            snackContent: ''
        }
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        console.log('handleclose')
        this.setState({open: false, errors: {}});
        
        this.props.clearErrors();
        this.props.clearData();

    }

    componentWillReceiveProps(nextProps){
        if(nextProps.ui.errors){
           // console.log(nextProps.ui.errors)
            this.setState({errors: nextProps.ui.errors})
        }
       
        if(nextProps.data.message){
            console.log(nextProps.data.message)
            this.setState({open: true,
                           snackContent: nextProps.data.message 
            })
        }
        if(nextProps.ui.errors) {
            if(nextProps.ui.errors.hasOwnProperty('message')){
                this.setState({open: true,
                    snackContent:  nextProps.ui.errors
     })
            }
        }


       
    }
    render() {
       
        return (
            <Snackbar
                            anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                            }}
                            open = {this.state.open}
                            autoHideDuration={3000}
                            onClose = {this.handleClose}
                            ContentProps={{
                            'aria-describedby': 'message-id',
                            }}
                            message={<span id="message-id">{this.state.snackContent.message}</span>}
                    />
        )
    }
}

Feedback.propTypes = {
    data : PropTypes.object.isRequired,
    ui : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data : state.data,
    ui : state.ui,
})


      
  const clearErrors = () => ({ type: CLEAR_ERRORS });
  const clearData = () => ({ type: CLEAR_DATA });
    
  function mapActionToProps(dispatch) {
    return bindActionCreators({ clearErrors,clearData }, dispatch)
  }

export default connect(mapStateToProps, mapActionToProps)(Feedback);
