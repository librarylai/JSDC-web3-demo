// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
// 基本的合約，到時會給後續的合約來使用 看看 tx.origin 與 msg.sender 的變化，以及 constructor 的使用。
// BaseContract -> ContractIsUsedDeployedBase  
// ContractIsUsedDeployedBase 使用 已經上鏈後(Deploy)的 BaseContract 

// ＰS. BaseContract 可以請朋友幫忙上鏈，這樣當你自己將 ContractIsUsedDeployedBase 上鏈後，
//      比較好看出 tx.origin 與 msg.sender 的差別


contract BaseContract {
    address _owner; // 合約呼叫者
    address _contractOwner; // 合約擁有者
    uint256 _constructorNum;
    uint256 _initNum;

    constructor(uint256 num)  {
        _contractOwner = tx.origin;
        _owner = msg.sender;
        _constructorNum = num;
        _initNum = 10;
    }

 
    function getContractOwner() public view returns (address){
        return _contractOwner;
    }
     function getOwner() public view returns (address){
        return _owner;
    }
    function getConstructorNum() public view returns (uint256){
        return _constructorNum;
    }
    function getNum() public view returns (uint256){
        return _initNum;
    }
    function getMsgSender() public view returns (address){
        return msg.sender;
    }
     function getTxOrigin() public view returns (address){
        return tx.origin;
    }
}

