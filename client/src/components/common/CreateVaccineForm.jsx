import React, { useState, useContext } from 'react';
import ContractContext from './../../context/contract/ContractContext';

const CreateVaccineForm = () => {
    const { contract, accounts } = useContext(ContractContext);
    const [amount,setAmount] = useState(0);
    const [disabled,setDisabled] = useState(false);

    const createVaccine1 =  async ()=> {
        setDisabled(true);
        try {
            const res = await contract.methods.createVaccine(amount).send({from: accounts[0]});
            console.log(res);
        } catch (error) {
            console.log(error);
        }
        setDisabled(false);
    }

    return (
        <div className="center-container">
                <div className="form-body no-border">
                    <div className="header no-border">
                       Create Vaccine
                    </div>
                    <div>
                        <div>
                            <input 
                                placeholder="Enter vaccine amount" 
                                className="input-field sm-font" 
                                onChange={(e)=>setAmount(e.target.value)} 
                            />
                        </div>
                        <div className="btn-right">
                            <button className="r-4" onClick={!disabled ? () => createVaccine1(): undefined}>CREATE</button>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default CreateVaccineForm;