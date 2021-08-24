import React, { useContext , useEffect, useState} from 'react';
import Overlay from './../common/Overlay';
import ContractContext from './../../context/contract/ContractContext';
import BasicFunc from './BasicFunc';
import StateInfo from './StateInfo';

const CenterMain = () => {

    const { contract } = useContext(ContractContext);
    const [on,setOn] = useState(false);
    const [type,setType] = useState(1);
    const [state,setState] = useState([]);
    const [loading,setLoading] = useState(true);
    const [vaccine,setVaccine] = useState(0);
    let arr = new Array();


    const FetchStateList = async ()=>{
        arr = new Array();
        try{
            const res = await contract.methods.getTotalStates().call();
            const resVaccine = await contract.methods.availableVaccine().call();
            setState(res);
            setVaccine(resVaccine);
            setLoading(false);
        }catch(error){
            console.log(error);
        }

    }

    const listenToEvents = ()=> {
        contract.events.newStateAdded().on("data", async (evt)=> {
            await FetchStateList();
            setOn(false);
        })

        contract.events.vaccineCreated().on("data", async (evt)=>{
            await FetchStateList();
            setOn(false)
        })

        contract.events.vaccineIssued().on("data", async (evt)=>{
            console.log("vaccine issued ----->",evt);
            await FetchStateList();
            setOn(false);
        })
        
    }

    useEffect(()=>{
        !!contract && listenToEvents();
        !!contract && FetchStateList();
    },[contract]);

    return (
        <div>
            <h1 className="text-center">Vaccine management console</h1>
            <BasicFunc setOn={setOn} setType={setType} vaccine={vaccine} />
            <div className="state-info-container">
                {loading ? <p className="text-center">Loading</p>
                 : 
                 Array.isArray(state) && state.map((address,index)=> <StateInfo key={index} address={address} arr={arr} />)}
            </div>
            <Overlay on={on} setOn={setOn} type={type} setOn={setOn} />
        </div>
    )
}

export default CenterMain;
