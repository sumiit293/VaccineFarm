import React, { Fragment, useRef, useEffect, useContext, useState } from 'react';
import ContractContext from './../../context/contract/ContractContext';

const StateAction = (props) => {

    const form1 = useRef();
    const form2 = useRef();
    const {cred: {address, password}} = props;
    const {contract, accounts} = useContext(ContractContext);
    const [loading,setLoading] = useState(true);
    const [amount,setAmount] = useState(0);
    const [amount1,setAmount1] = useState(0);

    const [stateInfo,setStateInfo] = useState({
        name: "",
        currentAvailable: 0,
        vaccineToBeIssued: 0
    });

    const toggleForm = (ref)=>{
        const condition = ref.current.classList.contains("hide");
        if(condition){
            ref.current.classList.remove("hide"); 
        }else{
            ref.current.classList.add("hide"); 
        }
    };

    const FetchStateInfo = async ()=> {
        try {
            const res = await contract.methods.fullDetailsForState(address,password).call();
            setStateInfo({
                ...stateInfo,
                name: res[0],
                currentAvailable: res[2],
                vaccineToBeIssued: res[1]
            });
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const requestForVaccine = async ()=>{
        try {
            const res = await contract.methods.addToVaccineIssueQue(address,amount1).send({from: accounts[0]});
            setAmount1(0);
        } catch (error) {
            console.log(error);
        }
    }

    const consumeVaccine = async ()=>{
        try {
            const res = await contract.methods.consumeVaccine(address,amount,password).send({from: accounts[0]});
            setAmount(0);
        } catch (error) {
            console.log(error);
        }
    }

    const listenToEvents = ()=> {
        contract.events.vaccineAddedToQue().on("data", async (_)=> {
            try {
                await FetchStateInfo();
            } catch (error) {
                console.log(error);
            }
        });

        contract.events.vaccineConsumed().on("data", async (_)=>{
            try {
                await FetchStateInfo();
            } catch (error) {
                console.log(error);
            }
        });
    }
        
    useEffect(()=>{
        !!contract && listenToEvents();
        !!contract && FetchStateInfo();
    },[contract]);

    return (
        <Fragment>
            {
               !loading ?
                <div className="state-action-container">
                    <div className="d-flex">
                        <div className="logo-state">
                            <img src={"assets/state.png"}/>
                        </div>
                        <div className="name">
                            <h2 className="text-center">{stateInfo.name}</h2>
                        </div>
                    </div>
                    <h3 className="text-center">{address}</h3>
                    <div className="d-flex bg-blue m-20 p-10 r-4">
                        <div className="key">In Que</div>
                        <div className="value">{stateInfo.vaccineToBeIssued}</div>
                    </div>
                    <div className="d-flex bg-blue m-20 p-10 r-4">
                        <div className="key">Current Available</div>
                        <div className="value">{stateInfo.currentAvailable}</div>
                    </div>
                </div>
                :
                <p className="text-center">Loading ...</p>
            }
            <div id="form1" className="center-container hide" ref={form1}>
                <div className="form-body">
                    <div className="header" onClick={()=> toggleForm(form1)}>
                        Consume Vaccine
                    </div>
                    <div className="">
                        <div>
                            <input 
                                placeholder="Enter amount to consume" 
                                value={amount} 
                                onChange={(e)=>setAmount(e.target.value)} 
                                className="input-field" 
                            />
                        </div>
                        <div className="btn-right">
                            <button className="r-4" onClick={consumeVaccine}>Consume</button>
                        </div>
                    </div>
                    <div className="footer text-center" onClick={()=> toggleForm(form1)}>
                        Collapse
                    </div>
                </div>
            </div>
            <div id="form2" className="center-container hide" ref={form2}>
                <div className="form-body">
                    <div className="header" onClick={()=> toggleForm(form2)}>
                        Request for new vaccine
                    </div>
                    <div className="">
                        <div>
                            <input 
                                placeholder="Enter amount" 
                                className="input-field" 
                                value={amount1} 
                                onChange={(e)=> setAmount1(e.target.value)} 
                            />
                        </div>
                        <div className="btn-right">
                            <button className="r-4" onClick={()=>requestForVaccine()}>Submit</button>
                        </div>
                    </div>
                    <div className="footer text-center" onClick={()=> toggleForm(form2)}>
                        Collapse
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default StateAction;
