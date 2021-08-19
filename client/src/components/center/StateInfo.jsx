import React, { useEffect, useContext, useState, Fragment } from 'react';
import ContractContext from './../../context/contract/ContractContext';

const StateInfo = (props) => {

    const {address} = props;
    const {contract} = useContext(ContractContext);
    const [info,setInfo] = useState({name: "", token: 0, loading: true});

    const FetchStateInfo = async ()=>{
        try{
            const res = await contract.methods.getStateDetails(address).call();
            console.log(res);
            setInfo({
                ...info,
                name: res[0],
                token: res[1],
                loading: false
            })
            
        }catch(error){
            console.log(error);
            setInfo({
                ...info,
                loading: true
            })
        }
       
    }

    useEffect(()=>{
        !!contract && FetchStateInfo();
    },[contract,address]);

    return (
        <Fragment>
            {!info.loading ? 
            <div className="stateWrapper">
                <div className="icon-container">
                    <img src={"/assets/state.png"} alt={"Not Available"} className="state-icon"/>
                </div>
                <div className="state-name text-center">{info.name}</div>
                <div className="due-token text-center">{info.token} token needed</div>
                <div className="address text-center sm-font">{address}</div>
            </div> :
            <p className="text-center">Loading...</p>
            }
        </Fragment>
    )
}
export default StateInfo;
