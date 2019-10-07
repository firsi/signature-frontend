import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'

const styles = {
    InfoBox : {
    width:'27%',
    height:'80%',
    padding: '5px 15px',
    display: 'flex',
    flexDirection: 'column',
   
    fontSize: '1.35em',
    color: props => props.color || '#000' ,
    fontWeight: '500',
    borderLeft: props => `3px solid ${props.color}` || '#000',
    },
    topPart: {
        display:'flex',
    },
    bottomPart: {
        marginTop: '2%',
    },
    currency: {
        fontSize:'0.65em'
    },
    topBottom: {
        
    },
    iconContainer : {
        width: '25%',
        height:'60%',
        marginTop: '5%',
        textAlign: 'center',
        backgroundColor: props => props.color,
        

    },
    somme: {
        marginBottom:'2px',
        padding: '8% 2% 8% 8%',
        width: '100%'

    },
    affaireDescription: {
        fontSize: '11px ',
        color: '#949494',
       // marginBottom: '4%'
    },
    icon: {
        
        margin: '5% auto',
        color: '#fff'
    }
}

class InfoBox extends Component {
    
    
    
    render() {
        const {classes,color} = this.props;
        //Css properties
       // classes.iconContainer.backgroundColor = this.props.color;
        
        return (
            <Paper className={classes.InfoBox}>
                <div className={classes.topPart}>
                    <Paper elevation={4} className={classes.iconContainer}><span className={classes.icon}>{this.props.icon}</span></Paper>
                    
                    <Typography  variant='h5' className={classes.somme}>{this.props.label} <small className={classes.currency}>{this.props.labelCurrency}</small></Typography>
                        
                    
                </div>
                <Divider /> 
                <div className={classes.bottomPart}>
                    
                    <Typography variant='subtitle1' className={classes.affaireDescription}>{this.props.description}</Typography >
                </div>
            </Paper>
        )
    }
}

InfoBox.propTypes = {
    data: PropTypes.object.isRequired

}

const mapStateToProps = (state) => ({
data: state.data,

})



export default connect(mapStateToProps)(withStyles(styles)(InfoBox));
