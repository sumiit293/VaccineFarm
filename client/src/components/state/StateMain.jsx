import React,{ useContext, useState, useEffect } from 'react';
import ContractContext from './../../context/contract/ContractContext';
import StateAction from './StateAction';
import StateLogin from './StateLogin';

const StateMain = () => {

    const {contract} = useContext(ContractContext);
    const [loading,setLoading] = useState(true);
    const [loggedIn,setLoggedIn] = useState(false);
    const [cred,setCred] = useState({address: "", password: ""});



    const checkIfCredInLocalStrorage = async ()=>{
                try {
            const adrs = await localStorage.getItem("address");
            const psd = await localStorage.getItem("password");

            //if address and password check for authentication
            if(adrs && psd){
                const res = await contract.methods.authenticationForState(adrs,psd).call();
                if(res){
                    // if response is true
                    setCred({...cred,address: adrs,password: psd});
                    setLoggedIn(true);
                    setLoading(false);
                }else{
                    //if response is false
                    setCred({...cred,address: "",password: ""});
                    setLoggedIn(false);
                    setLoading(false);

                    //now delete the cred from localStorage
                    await localStorage.removeItem("address");
                    await localStorage.removeItem("password");
                }
            }else{
                // if address and password is not available in localstorage
                setCred({...cred,address: "",password: ""});
                setLoggedIn(false);
                setLoading(false);
            }
            
        } catch (error) {
            console.log(error);
            setCred({...cred,address: "",password: ""});
            setLoggedIn(false);
            setLoading(false);
        }
    }

    useEffect(()=>{
        !!contract && checkIfCredInLocalStrorage();
    },[contract]);



    if(loading){
        return <p className="text-center">Loading...</p>
    }
    else if(!loggedIn && !loading){
        return <StateLogin 
            cred={cred} 
            setCred={setCred} 
            setLoggedIn={setLoggedIn}
         />

    }else{
        return <StateAction cred={cred} />
    }
}

export default StateMain;
