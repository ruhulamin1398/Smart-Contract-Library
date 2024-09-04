// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract StateVariable{
    uint public v1=5;  //initializin in declaration time 
    uint public v2;
    uint public v3;

    constructor (){
        // initalizing with constructor
        v3=10;
    }

    function setV2(uint _v2) public {
        // initializing using setter funciton     
        v2=_v2;
    }

}