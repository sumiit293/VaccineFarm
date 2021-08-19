import React, { Fragment, useRef } from 'react';

const StateAction = () => {
    const form1 = useRef();
    const form2 = useRef();

    const toggleForm = (ref)=>{
        const condition = ref.current.classList.contains("hide");

        if(condition){
            ref.current.classList.remove("hide"); 
        }else{
            ref.current.classList.add("hide"); 
        }
    };

    return (
        <Fragment>
            <div className="state-action-container">
                <div className="d-flex">
                    <div className="logo-state">
                        <img src={"assets/state.png"}/>
                    </div>
                    <div className="name">
                        <h2 className="text-center">State Name</h2>
                    </div>
                </div>
                <h3 className="text-center">Address</h3>
                <div className="d-flex bg-blue m-20 p-10 r-4">
                    <div className="key">In Que</div>
                    <div className="value">50</div>
                </div>
                <div className="d-flex bg-blue m-20 p-10 r-4">
                    <div className="key">Total Issued</div>
                    <div className="value">100</div>
                </div>
            </div>
            <div id="form1" className="center-container hide" ref={form1}>
                <div className="form-body">
                    <div className="header" onClick={()=> toggleForm(form1)}>
                        Consume Vaccine
                    </div>
                    <div className="">
                        <div>
                            <input placeholder="Enter amount to consume" className="input-field" />
                        </div>
                        <div className="btn-right">
                            <button className="r-4">Consume</button>
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
                            <input placeholder="Enter amount" className="input-field" />
                        </div>
                        <div className="btn-right">
                            <button className="r-4">Consume</button>
                        </div>
                    </div>
                    <div className="footer text-center" onClick={()=> toggleForm(form2)}>
                        Submit
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default StateAction;
