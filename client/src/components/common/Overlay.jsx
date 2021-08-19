import React,{Fragment, useEffect, useRef} from 'react'
import CreateVaccineForm from './CreateVaccineForm';
import IssueVaccineForm from './IssueVaccineForm';
import RegisterStateForm from './RegisterStateForm';

const Overlay = (props) => {

    const overlayRef = useRef();
    const { on, setOn, type } = props;

    useEffect(()=>{
        document.addEventListener("click",(e)=>{
            if(e.target.contains(overlayRef.current)){
                setOn(false)
            }else{
                console.log("does not contains close the overlay");
            }
        })
        return ()=>{
            document.removeEventListener("click",()=>{console.log("overlay removed")})
        }
    },[]);

    return(
        <Fragment>
                {!!on && <div className="overlay" ref={overlayRef}>
                <div className="overlay-body">
                   {type === 1 && <RegisterStateForm setOn={setOn} />}
                   {type === 2 && <CreateVaccineForm setOn={setOn} />}
                   {type === 3 && <IssueVaccineForm setOn={setOn} />}
                </div>
            </div>}
        </Fragment>
    )
    
}

export default Overlay
