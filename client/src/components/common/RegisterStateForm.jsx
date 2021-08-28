import React, { useContext , useState} from 'react';
import { toast } from 'react-toastify';
import ContractContext from './../../context/contract/ContractContext';


const RegisterStateForm = () => {

    const { contract, accounts } = useContext(ContractContext);
    const [disabled,setDisabled] = useState(false);
    const [cred,setCred]= useState({state_name: "", state_password: ""});
    const { state_name , state_password } = cred;

    const onChange = (e)=>{
        setCred({
            ...cred,
            [e.target.name]: e.target.value
        })
    }

    const createState = async ()=> {
        setDisabled(true);
        try {

            // check if all fileds are provided
            if (!state_name || !state_password){
                toast("Both fields are required !");
            }
        const res = await contract.methods.registerNewState(state_password,state_name).send({from: accounts[0]});
            setCred({
                state_name: "",
                state_password: ""
            })
        } catch (error) {
            console.log(error);
        }
        setDisabled(false);
    };

    return (
        <div className="center-container">
                <div className="form-body no-border">
                    <div className="header no-border">
                       Register State
                    </div>
                    <div className="">
                        <div>
                            <input 
                                placeholder="Enter state name"
                                className="input-field sm-font" 
                                name="state_name" 
                                value={state_name} 
                                onChange={onChange} 
                            />
                        </div>
                        <div>
                            <input 
                                placeholder="Enter security key" 
                                className="input-field sm-font" 
                                name="state_password" 
                                value={state_password} 
                                onChange={onChange} 
                            />
                        </div>
                        <div className="btn-right">
                            <button className="r-4" onClick={()=> !disabled && createState()}>CREATE</button>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default RegisterStateForm;
