// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

// ContractIsUsedDeployedBase 使用 已經上鏈後(Deploy)的 BaseContract  
// 請呼叫裡面的每一個 function 看看 BaseContract 與 ContractIsUsedDeployedBase 合約內的 tx.origin 與 msg.sender 的變化，以及 constructor 的使用。

// ＰS. BaseContract 可以請朋友幫忙上鏈，這樣當你自己將 ContractIsUsedDeployedBase 上鏈後，
//      比較好看出 tx.origin 與 msg.sender 的差別


interface IBaseContract {
    function getContractOwner() external view returns (address);
    function getOwner() external view returns (address);
    function getConstructorNum() external view returns (uint256);
    function getNum() external view returns (uint256);
    function getMsgSender() external view returns (address);
    function getTxOrigin() external view returns (address);
}

contract ContractUseDeployedBase {
  
    IBaseContract baseContract ;
    constructor(address _address) {
        baseContract =  IBaseContract(_address);
    }

 
    function getBCContractOwner() public view returns (address){
        return baseContract.getContractOwner();
    }
     function getBCOwner() public view returns (address){
        return baseContract.getOwner();
    }
    function getBCConstructorNum() public view returns (uint256){
        return baseContract.getConstructorNum();
    }
    function getBCNum() public view returns (uint256){
        return baseContract.getNum();
    }
    function getBCMsgSender() public view returns (address){
        return baseContract.getMsgSender();
    }
     function getBCTxOrigin() public view returns (address){
        return baseContract.getTxOrigin();
    }
    function getMsgSender() public view returns (address){
        return msg.sender;
    }
     function getTxOrigin() public view returns (address){
        return tx.origin;
    }
}

