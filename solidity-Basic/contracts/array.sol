
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ArrayContract{


    // fixed size array 
    uint[4] public arr=[1,2,5,1];

    function setIndex(uint _index, uint _value) public {
        arr[_index]= _value;
    }
    function getIndex(uint _index) public view returns (uint){
        return arr [_index ];
    }
    function getLength() public view returns(uint){
        return arr.length;
    }


    // dynamic size array

    uint[] public dArray;

    function pushElement(uint _element) public {
        dArray.push(_element);
    }
    function popElement() public {
        dArray.pop();
    }
    function dSetIndex(uint _index, uint _value) public {
    dArray[_index]= _value;
    }
    function getDLength() public view returns (uint){
        return dArray.length;
    }   



//Bytes array   
// single bytes cannot be modified
bytes3 public b1; 

function setByeArray(bytes3 _b1) public returns(bool){

    b1= _b1;
    return true;
}

// Dynamic size bytes array
bytes public bArray = "125abc" ;

function pushElementBArray() public returns (bool){
    bArray.push("a");
    return true ;
}

function getElementBArray(uint _index) public view returns (bytes1){
     
    return bArray[_index] ;
}



}