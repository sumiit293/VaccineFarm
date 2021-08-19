import React, {useReducer, useContext} from 'react';
import ContractContext from './ContractContext';
import contractReducer from './ContractReducer';
import {ADD_CONTRACT_TO_STATE} from './../../components/Types';

const ContractState = (props)=>{

    const initialState = {
        contract: null,
        web3: null,
        accounts: null
    }

    const [state,dispatch] = useReducer(contractReducer,initialState);

    const addContractToState = (contract,web3,accounts)=>{
        dispatch({type: ADD_CONTRACT_TO_STATE,
                payload : {
                    accounts,
                    contract,
                    web3
                }
             });
    }

    return (
        <ContractContext.Provider
            value={{
                contract: state.contract,
                web3: state.web3,
                accounts: state.accounts,
                addContractToState
            }}
        >
            {props.children}
        </ContractContext.Provider>
    )
}

export default ContractState
