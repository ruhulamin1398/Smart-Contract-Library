
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



}