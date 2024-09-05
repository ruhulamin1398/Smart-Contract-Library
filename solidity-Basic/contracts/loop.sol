// SPDX-License-Identifier: GPL-3
pragma solidity 0.8.0;
contract Loop{
    uint[20] public arr;
   
    function forLoop() public {
        for(uint i = 0 ; i < arr.length; i++){
            arr[i]= i+1;
        }
    }
        function whileLoop() public {
            uint i =0;

            while (i < arr.length){
                arr[i]= i+1;
                i++;
            }
        
    }

    function doWhile() public {
        uint i =0;
        do {
                arr[i]=i+1;
                i++;
            } while (i<arr.length);
    }
}