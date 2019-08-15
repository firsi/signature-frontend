import {SET_FACTURES, CREATE_PRODUCT, CREATE_COMPANY, CLEAR_DATA, SET_COMPANIES,SET_SELECTED_COMPANY, SET_PRODUCTS, SEND_FACTURE} from '../types';

const initialState = {
   
    factures: [],
    message:'',
    companies:[],
    products: [],
   
}

export default function (state = initialState, action) {
    
    switch (action.type) {
        case SET_FACTURES :
            return {  
                ...state,
                factures: action.payload
            }
        case SEND_FACTURE :
            return {  
                    ...state,
                    message: action.payload
                }

        case SET_COMPANIES :

                return {  
                    ...state,
                    companies: action.payload
                }
        case SET_SELECTED_COMPANY : 
                return{
                    ...state,
                    companyName: action.companyName,
                }
        
         case SET_PRODUCTS :

                return {  
                    ...state,
                    products: action.payload
                }
        
        case CREATE_PRODUCT : 
            return {
                ...state,
                message: action.payload
            }

            case CREATE_COMPANY : 
            return {
                ...state,
                company: action.payload
            }
        case  CLEAR_DATA: 
            return {
                ...state,
                 message:''
            }

        default : 
            return state;
    }
}