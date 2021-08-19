import React, { useState, useContext } from 'react';
import ContractContext from './../../context/contract/ContractContext';

const IssueVaccineForm = () => {

    const [disabled,setDisabled] = useState(false);
    const { contract , accounts} = useContext(ContractContext);
    const [cred,setCred]= useState({state_add: "", amount: ""});
    const {state_add, amount} = cred;

    const onChange = (e)=> {
        setCred({
            ...cred,
            [e.target.name]: e.target.value
        });
    }

    const issueVaccine = async ()=> {
        setDisabled(true);
        try {
            const res = await contract.methods.issueVaccine(state_add,amount).send({from: accounts[0]});
            console.log(res);
            setCred({
                ...cred,
                state_add: "",
                amount: ""
            });
        } catch (error) {
            console.log(error);
        }
        setDisabled(false);
    }

    return (
        <div className="center-container">
                <div className="form-body no-border">
                    <div className="header no-border">
                       Issue Vaccine
                    </div>
                    <div>
                        <div>
                            <input 
                                placeholder="Enter state adddress"
                                className="input-field sm-font" 
                                name="state_add" 
                                onChange={onChange} 
                            />
                        </div>
                        <div>
                            <input 
                                placeholder="Amount to be issued" 
                                className="input-field sm-font" 
                                name="amount" 
                                onChange={onChange} 
                            />
                        </div>
                        <div className="btn-right">
                            <button className="r-4" onClick={!disabled ? issueVaccine : undefined}>Issue</button>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default IssueVaccineForm;