// Task 1: Initial setup
// We want to connect to the Kovan testnet (explorer: https://kovan.etherscan.io/)
// If this is your first time doing this, go to https://infura.io/ to register an account and create a project.
require('dotenv').config()
const Web3 = require('web3') // 引入 web3.js
// 將 testnetURL 與 projectID 組成 （這也就是 infura 創建完 project id 後的 ENDPOINTS URL）
const rpcURL = `${process.env.testnetURL}${process.env.projectID}`
// console.log(new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546'))

// import private key
//  Hierarchical Deterministic wallet (簡稱 “HD Wallet”)，是一個系統可以從單一個 seed 產生一樹狀結構儲存多組 keypairs（私鑰和公鑰）。
// seed 用方便記憶和書寫的單字表示。一般由 12 個單字組成，稱為 mnemonic code(phrase)，中文稱為助記詞或助記碼
const HDWalletProvider = require('@truffle/hdwallet-provider')
// 錢包私鑰
const privateKey = process.env.privateKey
// 將 錢包私鑰 與  rpcURL (就是上面 infura 部分的 url)
const provider = new HDWalletProvider(privateKey, rpcURL)
// HDWalletProvider is compatible with Web3. Use it at Web3 constructor, just like any other Web3 Provider
const web3 = new Web3(provider)
console.log('...........................................')
// console.log('web3.currentProvider', web3)

async function main() {
  // See if the account is recovered from private key successfully
  const accounts = await web3.eth.getAccounts() // 取得當前節點的地址資料。
  // console.log(`Account: ${accounts[0]}\n`) // 將會顯示 錢包地址

  await keypress()

  // Remix 透過將智能合約 Compile 後產生的 ABI
  const abi = [
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'num',
          type: 'uint256',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      inputs: [],
      name: 'getConstructorNum',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getContractOwner',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getMsgSender',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getNum',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getOwner',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getTxOrigin',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ]

  // 透過 Remix 發布(Deploy)到區塊鏈上後的 合約地址
  const contractAddress = '0x76Ff3150915c44AC2155b69aC273c526a3D469C6'

  const contract = new web3.eth.Contract(abi, contractAddress)
  // 查看 contract 裡的 methods，會根據傳入的 ABI 結構而顯示對應的 function
  // console.log('Smart contract functions: ', contract.methods)

  let contractOwner = await contract.methods.getContractOwner().call()
  console.log('contractOwner：', contractOwner)
  await keypress()

  let Owner = await contract.methods.getOwner().call()
  console.log('Owner：', Owner)
  await keypress()

  let contractNum = await contract.methods.getConstructorNum().call()
  console.log('contractNum：', contractNum)
  await keypress()

  let num = await contract.methods.getNum().call()
  console.log('num：', num)
  await keypress()

  let msgSender = await contract.methods.getMsgSender().call({ from: accounts[0] })
  console.log('msgSender：', msgSender)
  await keypress()

  let txOrigin = await contract.methods.getTxOrigin().call({ from: accounts[0] })
  console.log('txOrigin：', txOrigin)
  await keypress()
}

main()

const keypress = async () => {
  process.stdin.setRawMode(true)
  return new Promise((resolve) =>
    process.stdin.once('data', () => {
      process.stdin.setRawMode(false)
      resolve()
    })
  )
}
