import React, { Component, Fragment } from 'react';
import BarChart from '@material-ui/icons/BarChart'
import BusinessCenter from '@material-ui/icons/BusinessCenter';
import Person from '@material-ui/icons/Person';
import withStyles from '@material-ui/core/styles/withStyles';
import {computeChiffreAffaire,bestCustomer} from '../../util/helpers';

import InfoBox from './InfoBox';
import {connect} from 'react-redux';

const styles = {
    boxIcon: {
        fontSize: '35px',
      },
}

class GeneralInfo extends Component {
    render() {

        const {classes} = this.props;
        const customer = bestCustomer(this.props.data.factures);
        const description = `Meilleur client du mois: ${customer.total.toLocaleString('fr-FR')} FCFA`;
 
        return (
            <Fragment >

          {/*General Info top bar*/}
          <InfoBox 
            icon={<BarChart className={classes.boxIcon}  />}
            label={computeChiffreAffaire(this.props.data.factures)}
            labelCurrency='FCFA'
            description = "Votre chiffre d'affaire de cette année"
            color='#c31a1a'
            
            />
            <InfoBox 
            icon={<Person className={classes.boxIcon}  />}
            label='Brigitte Edimo'
            description = "Votre meilleur employé sur le terrain"
            color='#1cb7a0'
            
            />
            <InfoBox 
            icon={<BusinessCenter className={classes.boxIcon}  />}
            label={customer.company}
            description = {description}
            color='#3db71c'
            
            />
          
        </Fragment>

        )
    }
}

const mapStateToProps = (state) => ({
    data: state.data
});
export default connect(mapStateToProps)(withStyles(styles)(GeneralInfo));
