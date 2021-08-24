// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract State {
    uint public currentAvailableVaccine;
    uint public currentRequestedVaccine;
    string private password;
    string public name;

    constructor(uint _availableVaccine, string memory _password, string memory _name){
        password = _password;
        currentAvailableVaccine = _availableVaccine;
        name = _name;
    }

    modifier onlyOwner(string  memory _password) {
      require(keccak256(abi.encodePacked(_password)) == keccak256(abi.encodePacked(password)));
      _;
    }

    function getStateInfo() public view returns(string memory,uint){
        return(name,currentRequestedVaccine);
    }

    function getStateFullInfo(string memory _password) public view onlyOwner(_password) returns(string memory, uint, uint){
        return (name,currentRequestedVaccine,currentAvailableVaccine);
    }

    function requestForVaccine(uint _amount) public {
        currentRequestedVaccine+=_amount;
    }

    function addVaccine(uint _amount) public {
        require(currentRequestedVaccine >= _amount);
        currentRequestedVaccine-=_amount;
        currentAvailableVaccine+=_amount;
    }


    function changeYourPassword(string memory _newPassword) private {
        password = _newPassword;
    }

    function authenticate(string  memory _password) public returns(bool){
        if (keccak256(abi.encodePacked(_password)) == keccak256(abi.encodePacked(password))){
            return true;
        }else{
            return false;
        }
    }

    function consumeVaccine(uint _amount, string memory _password) public {
        require(authenticate(_password),"only state owner can consume");
        require(currentAvailableVaccine >= _amount,"Cannot consume more than avialable");
        currentAvailableVaccine-=_amount;
    }

}