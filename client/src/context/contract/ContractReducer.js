import {ADD_CONTRACT_TO_STATE} from './../../components/Types';

export default (state,action)=>{
    switch(action.type){
        case ADD_CONTRACT_TO_STATE :
            return {
                ...state,
                contract: action.payload.contract,
                accounts: action.payload.accounts,
                web3: action.payload.web3
            }
        default :
            return {
                ...state
            }
    }
}