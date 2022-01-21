// Task 1: Initial setup
// We want to connect to the Kovan testnet (explorer: https://kovan.etherscan.io/)
// If this is your first time doing this, go to https://infura.io/ to register an account and create a project.
require("dotenv").config();
const Web3 = require("web3"); // 引入 web3.js
// 將 testnetURL 與 projectID 組成 （這也就是 infura 創建完 project id 後的 ENDPOINTS URL）
const rpcURL = `${process.env.testnetURL}${process.env.projectID}`;
// console.log(new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546'));

// import private key
//  Hierarchical Deterministic wallet (簡稱 “HD Wallet”)，是一個系統可以從單一個 seed 產生一樹狀結構儲存多組 keypairs（私鑰和公鑰）。
// seed 用方便記憶和書寫的單字表示。一般由 12 個單字組成，稱為 mnemonic code(phrase)，中文稱為助記詞或助記碼
const HDWalletProvider = require("@truffle/hdwallet-provider");
// 錢包私鑰
const privateKey = process.env.privateKey;
// 將 錢包私鑰 與  rpcURL (就是上面 infura 部分的 url)
const provider = new HDWalletProvider(privateKey, rpcURL);
// HDWalletProvider is compatible with Web3. Use it at Web3 constructor, just like any other Web3 Provider
const web3 = new Web3(provider);
console.log('...........................................')


async function main() {
  // See if the account is recovered from private key successfully
  const accounts = await web3.eth.getAccounts(); // 取得當前節點的地址資料。
  console.log(`Account: ${accounts[0]}\n`);// 將會顯示 錢包地址

  await keypress();

  // Task 2: Get ETH balance of an address
  // Double check if the amount is correct here: https://kovan.etherscan.io/address/0xac83d145634980a3f7bed4eb5084dd785b195e23
  //  透過 getBalance 去取得所擁有的 Wei，接著再透過 fromWei 將 Wei 轉換成 ETH。 1以太币= 10^18 Wei
  const balanceInWei = await web3.eth.getBalance(accounts[0]);
  console.log('balanceInWei',balanceInWei)
  const balanceInETH = web3.utils.fromWei(balanceInWei, "ether");
  console.log(`There's ${balanceInETH} ETH in the address ${accounts[0]}\n`);

  await keypress();

  // 另一種使用方法，透過 web3.eth.accounts.privateKeyToAccount 將我們的 metamask wallet 的 privateKey 傳入
  // 去建立一個 account 
  let account =  await web3.eth.accounts.privateKeyToAccount(privateKey);
  // 將 account 的 address 就是我們的 錢包地址
  const balanceInWei2 = await web3.eth.getBalance(account.address);
  const balanceInETH2 = web3.utils.fromWei(balanceInWei2, "ether");
  console.log(`There's ${balanceInETH2} ETH in the address ${account.address}\n`);


  // Task 3: Set up smart contract
  // 1. Go to https://remix.ethereum.org/ and deploy a Storage contract
  // 2. Copy ABI and contract address after deployment succeed
  // 3. Run this script

  const abi = [
    {
      inputs: [],
      name: "retrieve",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "num",
          type: "uint256",
        },
      ],
      name: "store",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const contractAddress = "0xD9F5d126226aF155c4B3D21FDd7d5C896aFE5DBd";

  const contract = new web3.eth.Contract(abi, contractAddress);
  console.log("Smart contract functions: ", contract.methods);

  await keypress();

  // Task 4: Interact with the smart contract
  // Set the contract value to 700

  const initialValue = await contract.methods.retrieve().call();
  console.log("\nInitial value:", initialValue);

  const newValue = 700;
  console.log(`Setting the value to ${newValue}...`);
  const txReceipt = await contract.methods
    .store(newValue)
    .send({ from: accounts[0] });

  const updatedValue = await contract.methods.retrieve().call();
  console.log("Value afterwards:", updatedValue);

  await keypress();

  // View receipt of the transaction we just sent
  console.log("\nTransaction receipt:", txReceipt);
}

main();

const keypress = async () => {
  process.stdin.setRawMode(true);
  return new Promise((resolve) =>
    process.stdin.once("data", () => {
      process.stdin.setRawMode(false);
      resolve();
    })
  );
};
