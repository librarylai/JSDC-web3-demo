// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

// 未上鏈合約
contract ContractUnDeploy {
    uint256 _price;
    constructor(uint256 value) {
        _price = value;
    }
    function getCPrice() public view returns (uint256){
        return _price;
    }
     function getCPricePlus() public view returns (uint256){
        return _price+5;
    }
}

// ContractUseUnDeployContract 使用上面 未上鏈合約，透過呼叫 setCPrice 去重複呼叫 ContractUnDeploy constructor。

contract ContractUseUnDeployContract {
    ContractUnDeploy contractC ;
    function setCPrice(uint256 num) public payable {
        contractC = new ContractUnDeploy(num);
    }
    function getCPricePlus() public view returns (uint256){
        return contractC.getCPricePlus();
    }

}

