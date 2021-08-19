// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import './State.sol';

contract VaccineFarm {
  uint public availableVaccine;
  string public name;
  mapping(address=>uint) vaccineIssueQue;
  mapping(address=>uint) vaccineIssuedList;
  address[] public states;

  event newStateAdded(address _address);
  event vaccineCreated(uint _amount);

  constructor(){
    availableVaccine = 10000;
    name = "VaccineFarm";
  }
  
  function ifStateExist (address _state) private view returns(bool) {
          for (uint i = 0; i < states.length; i++){
              if(states[i] == _state){
                return true;
              }
            }
            return false;
  }

  function addToVaccineIssueQue(address _state, uint _amount) public {
    require(ifStateExist(_state),"State not registerd yet");
    (bool success, ) = _state.call(abi.encodeWithSignature("requestForVaccine(uint256)",_amount));
    require(success == true,"Colud not add to issue statement");
    vaccineIssueQue[_state]+= _amount;
  }

  function issueVaccine(address _state, uint _amount) public {
    require(ifStateExist(_state),"State not registerd yet");
    (bool success, ) = _state.call(abi.encodeWithSignature("addVaccine(uint256)",_amount));
    require(success == true,"Colud not add to issue vaccine");
    require(availableVaccine >= _amount, "Vaccine out of stock !");
    vaccineIssueQue[_state] -= _amount;
    vaccineIssuedList[_state] += _amount;
    emit vaccineCreated(availableVaccine);
  }

  function registerNewState(string memory password, string memory _name) public returns(address) {
    State new_state = new State(0,password,_name);
    states.push(address(new_state));
    emit newStateAdded(address(new_state));
    return address(new_state);
  }

  function getTotalStates() public view returns(address[] memory){          
    return states;
  }

  function getStateDetails(address _state1) public  returns(string memory, uint256){
      (bool success, bytes memory result ) = _state1.call(abi.encodeWithSignature("getStateInfo()"));
      require(success == true,"Could not fetch state details");
      return abi.decode(result,(string,uint256));
  }

  function getVaccineIssueQueToState(address _state) public view returns(uint){
    return vaccineIssueQue[_state];
  }

  function createVaccine(uint _amount) public returns(uint){
    availableVaccine+=_amount;
    emit vaccineCreated(availableVaccine);
    return availableVaccine;

  }

  function totalVaccineIssued(address _state) public view returns(uint){
    return vaccineIssuedList[_state];
  }

}
