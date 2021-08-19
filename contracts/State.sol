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

    function getStateInfo() public view returns(string memory,uint){
        return(name,currentRequestedVaccine);
    }

    function requestForVaccine(uint _amount) public {
        currentRequestedVaccine+=_amount;
    }

    function addVaccine(uint _amount) public {
        currentRequestedVaccine-=_amount;
        currentAvailableVaccine+=_amount;
    }

    function consumeVaccine() public {
        require(currentAvailableVaccine > 0,"No vaccine available");
        currentAvailableVaccine--;
    }

    function changeYourPassword(string memory _newPassword) private {
        password = _newPassword;
    }

}