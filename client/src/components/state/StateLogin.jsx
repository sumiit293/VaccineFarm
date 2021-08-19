import React from 'react';

const StateLogin = (props) => {

    const {setLoggedIn} = props;

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
                    <input placeholder="Enter the address of state"/>
                </div>
                <div className="input-field">
                    <input type="password" placeholder="Password"/>
                </div>
                <div className="sbtm-btn">
                    <button onClick={()=>setLoggedIn(true)}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default StateLogin;
