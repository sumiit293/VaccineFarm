import React, { Fragment, useContext } from 'react';

const BasicFunc = (props) => {

    const {setOn,setType,vaccine} = props;

    const chnageOverlayState = (num)=>{
        setOn(true);
        setType(num);
    }

    return (
        <Fragment>
            {!vaccine ? <p className="text-center">Loading</p>:<p className="text-center">Total available vaccine: {vaccine} </p>}
            <div className="func-wrapper">
                <div className="d-flex">
                    <div className="img-container">
                        <img src={"assets/vaccine.png"} alt={"NA"} />
                    </div>
                    <div className="functions-slot">
                        <div className="function" onClick={()=>{chnageOverlayState(2)}}>Create Vaccine</div>
                        <div className="function" onClick={()=>{chnageOverlayState(3)}}>Issue vaccine</div>
                    </div>
                </div>
                <div className="register-states text-center function" onClick={()=>{chnageOverlayState(1)}}>Register new state</div>
            </div>
        </Fragment>
    )
}

export default BasicFunc;
