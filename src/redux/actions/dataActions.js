import {SET_FACTURES, 
        LOADING_UI, 
        CLEAR_ERRORS, 
        CREATE_PRODUCT, 
        SET_ERRORS, 
        CREATE_COMPANY, 
        SET_COMPANIES, 
        SET_PRODUCTS,
        SET_SELECTED_COMPANY,
        SEND_FACTURE}  from '../types';

        import axios from 'axios';
 
export const getAllFactures = () => (dispatch) => {

    dispatch({type: LOADING_UI});
    
    axios.get('/factures')
    .then(response => {
        dispatch({type: CLEAR_ERRORS});
        dispatch({type: SET_FACTURES,
                  payload: response.data
        })
    })
    .catch(error => console.log(error))

};

export const postFacture = (factureData) => (dispatch) => {

    dispatch({type: LOADING_UI});
    console.log('inside');
    axios.post('/createFacture',factureData)
    .then(response => {
       
        dispatch({type: SEND_FACTURE,
                  payload: response.data
        })
        dispatch({type: CLEAR_ERRORS});
    })
    .catch(error =>{
        //console.log(error.response.data);
        dispatch({type: SET_ERRORS,
                 payload:  error.response.data
         });
    } 
        
        )

};


export const getAllCompanies = () => (dispatch) => {

    axios.get('/companies')
    .then(response => {
        dispatch({type: CLEAR_ERRORS});
        dispatch({type: SET_COMPANIES,
                  payload: response.data
        })
    })
    .catch(error => console.log(error))
};

export const setCompany = (company) => (dispatch) => {
        dispatch({type: SET_SELECTED_COMPANY,
                  companyName: company
        })
};

export const getAllProducts = () => (dispatch) => {
    axios.get('/products')
    .then(response => {
        dispatch({type: CLEAR_ERRORS});
        dispatch({type: SET_PRODUCTS,
                  payload: response.data
        })
    })
    .catch(error => console.log(error))

};

export const createProduct = (productData) => (dispatch) => {

    dispatch({type: LOADING_UI});
    console.log('inside');
    axios.post('/createProduct',productData)
    .then(response => {
       
        dispatch({type: CREATE_PRODUCT,
                  payload: response.data
        })
        dispatch({type: CLEAR_ERRORS});
    })
    .catch(error =>{
        //console.log(error.response.data);
        dispatch({type: SET_ERRORS,
                 payload:  error.response.data
         });
    } 
        
        )

};

export const createCompany = (companyData) => (dispatch) => {

    dispatch({type: LOADING_UI});
    console.log('inside');
    axios.post('/createCompany',companyData)
    .then(response => {
       
        dispatch({type: CREATE_COMPANY,
                  payload: response.data
        })
        dispatch({type: CLEAR_ERRORS});
    })
    .catch(error =>{
        //console.log(error.response.data);
        dispatch({type: SET_ERRORS,
                 payload:  error.response.data
         });
    } 
        
        )

};