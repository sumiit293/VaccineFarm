import React, {useEffect, useContext} from 'react';
import VaccineFarm from "./../../contracts/VaccineFarm.json";
import getWeb3 from "./../../getWeb3";
import ContractContext from './../../context/contract/ContractContext';

const Navbar = () => {

    const { addContractToState, accounts: ac } = useContext(ContractContext);
    const setStatesForWeb3 = async ()=>{
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3();
      
            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();
      
            // Get the contract instance.
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = VaccineFarm.networks[networkId];
            const instance = new web3.eth.Contract(
              VaccineFarm.abi,
              deployedNetwork && deployedNetwork.address,
            );
            addContractToState(instance,web3,accounts);
          } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
              `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
          }
    }

    useEffect(()=> {
          setStatesForWeb3();
    },[]);

    return (
        <div className="d-flex bg-blue p-10">
            <div>Vaccine Farm</div>
            <div>Account: {!!ac ? ac: "Loading..."}</div>
        </div>
    )
}

export default Navbar
