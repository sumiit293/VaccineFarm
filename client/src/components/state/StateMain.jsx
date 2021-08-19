import React, { useState, useEffect } from 'react';
import StateAction from './StateAction';
import StateLogin from './StateLogin';

const StateMain = () => {

    const [loggedIn,setLoggedIn] = useState(false);

    useEffect(()=>{
       
    },[])

    if(!loggedIn){
        return <StateLogin setLoggedIn={setLoggedIn} />
    }else{
        return <StateAction />
    }
}

export default StateMain;
