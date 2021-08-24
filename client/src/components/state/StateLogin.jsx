import React,{ useContext, useState } from 'react';
import ContractContext from './../../context/contract/ContractContext';


const StateLogin = (props) => {

    const {contract} = useContext(ContractContext);
    const [loading,setLoading] = useState(false);
    const { setLoggedIn, setCred, cred } = props;
    const {address , password} = cred;

    const onChange = (e)=>{
        setCred({
            ...cred,
            [e.target.name]: e.target.value
        });
    }

    const authenticateState =  async ()=> {
        setLoading(true);
        try {
            const res = await contract.methods.authenticationForState(address,password).call();
            if(!res){
                alert("Wrong credentials ...");
            }else{
                await localStorage.setItem("loggedIn",true);
                await localStorage.setItem("address",address);
                await localStorage.setItem("password",password);
                setLoading(false);
                setLoggedIn(res);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            
            alert("Wrong credentials ...");
        }
        
    }

    return (
        <div className="login-container">
            
            <div className="state-logo">
                <div>
                    <h1 className="text-center">Login to state</h1>
                </div>
                <div>
                    <img src={"/assets/state.png"}/>
                </div>
            </div>
            <div className="login-form">
                <div className="input-field">
                    <input 
                        placeholder="Enter the address of state" 
                        name={"address"} 
                        onChange={onChange}
                    />
                </div>
                <div className="input-field">
                    <input 
                        type="password" 
                        placeholder="Password" 
                        name={"password"} 
                        onChange={onChange}
                    />
                </div>
                <div className="sbtm-btn">
                    <button onClick={!loading ? authenticateState: undefined}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default StateLogin;
