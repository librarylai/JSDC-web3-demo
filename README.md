# 【筆記】JSDC - Web3.js Demo 解讀 (攥寫中～～～)
###### tags: `筆記文章`
最近剛開始接觸到區塊鏈到東西，從透過幣安買幣開始到慢慢去了解何謂以太坊、何謂虛擬錢包...等，剛好這次的 JSDC 2021 有關於區塊鏈的講談，其中 ***李婷婷*** 講者的現場 DEMO 更是讓我耳目一新，所以打算詳細了解一下***李婷婷*** 講者在 JSDC 上的程式碼。

**本篇文章主要是一步一步去瞭解整個程式碼的運作，並跟著講者的 JSDC 影片實作，如有任何冒犯或錯誤的地方，再麻煩大大們告知。**

這邊也有我與朋友共同整理的一些筆記，內容會不定時慢慢增加，有點亂的地方還請見諒。[【筆記】區塊練相關 - 基礎知識](https://hackmd.io/@9iEIv7CwQuKe2LizHnDhaQ/ryr4kkbDK)

### 前置作業
1. Fork 講者的 Demo 專案到自己的 Github 中
    * Github: https://github.com/tina1998612
    * web3-demo: https://github.com/z-institute/Web3-Demo/blob/main/index.js

2. yarn install 載入所需要的 package 


## 錢包設定、測試網設定
本文章是使用 『**2021JSDC 大會 李婷婷 講者**』的 Demo 程式碼

### 使用 infura 與區塊鏈互動

infura 可以快速的讓我們跟區塊鏈的節點互動，而不用自己去建立一個節點( Geth )來跟以太坊溝通，並且我們可以透過 infura 提供的 API 來對以太坊進行互動。

#### 進入 infura 官網創建帳號
首先先進入到 [infura 官網](https://infura.io/)並申辦帳號(官網右上角)。

1. **輸入您的 Email 帳號以及您要在 infura 使用的密碼。**
    ![](https://i.imgur.com/sfBPCHg.png)
    
2. **前往 Email 點選確認信裡面的按鈕**
    ![](https://i.imgur.com/OWShqQi.png)
    
3. **點擊 Create New Project 去創建一個專案(選擇 Ethereum)** 
    ![](https://i.imgur.com/DNdkBqg.png)

#### 進入到 project setting 裡面
接著進入到 project setting 裡面將 `PROJECT ID` 與選擇 `ENDPOINTS` 後的 url 記到 `.env` 裡面，因為我們這邊是使用 Kovan testnet 所以選擇 Kovan。
![](https://i.imgur.com/1dkMNGd.png)

```javascript=
/* .env */
projectID = YOUR-PROJECT-ID
testnetURL = https://kovan.infura.io/v3/
```

#### 最後回來看一下程式碼

```javascript=
const Web3 = require("web3"); // 引入 web3.js
// 將 testnetURL 與 projectID 組成 （這也就是 infura 創建完 project id 後的 ENDPOINTS URL）
const rpcURL = `${process.env.testnetURL}${process.env.projectID}`;
```

### Wallet 設定錢包

接下來看一下錢包的部分，這邊我們要先建立一個錢包並將錢包的 private key 給到我們的套件中 `@truffle/hdwallet-provider`。

補充：何謂 HD Wallet
> Hierarchical Deterministic wallet (簡稱 “HD Wallet”)，是一個系統可以從單一個 seed 產生一樹狀結構儲存多組 keypairs（私鑰和公鑰）。
> seed 用方便記憶和書寫的單字表示。一般由 12 個單字組成，稱為 mnemonic code(phrase)，中文稱為助記詞或助記碼。

#### MetaMask 錢包與私鑰
1. **首先我們要先安裝 [MetaMask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn) 並使用 MetaMask 創建一個 Account 錢包。**

    ![](https://i.imgur.com/bFIzOxt.png)

2. **接著我們要匯出該錢包的 Private Key。**
    步驟為：帳戶詳情 -> 導出私鑰 -> 輸入密碼後顯示私鑰
    
    ![](https://i.imgur.com/JD0RoXw.png)
    
3. **將錢包私鑰複製進專案 `.env` 中**
    ```javascript
    /* .env */
    privateKey = YOUR-PRIVATW-KEY
    ```
#### 最後回來看一下程式碼
```javascript=
/* index.js */
const HDWalletProvider = require("@truffle/hdwallet-provider");
// 錢包私鑰
const privateKey = process.env.privateKey;
// 將 錢包私鑰 與  rpcURL (就是上面 infura 部分的 url)
const provider = new HDWalletProvider(privateKey, rpcURL);
// HDWalletProvider is compatible with Web3. Use it at Web3 constructor, just like any other Web3 Provider
const web3 = new Web3(provider);
```

### 領取測試幣
我們現在有了錢包但裡面沒有錢，所以我們要來領一些測試幣！
我們可以透過 [ https://gitter.im/kovan-testnet/faucet ]( https://gitter.im/kovan-testnet/faucet )這個網站來領取 Kovan 測試幣。

1. **到網站中點擊下方 『SIGN IN TO START TALKING』按鈕**
    可以使用 Gitlab、Github、Twitter 登入
    
    ![](https://i.imgur.com/DFpC5d2.png)
    ![](https://i.imgur.com/2wI9p9T.png)

    
2. **接著將 Metamask 錢包地址輸入到聊天室裡面**
   
   ![](https://i.imgur.com/7TwuYgy.png)

3. 看到`sent`回應後，就可以打開 Metamask 錢包看看測試幣有沒有正確到帳。
 
    ![](https://i.imgur.com/biy8G1a.png)

#### 補充：請確認您目前所選擇的網路，如果不是 『Kovan 測試網路』則可以參考一下步驟去開啟。
![](https://i.imgur.com/MIAWDEi.png)

1. 點選網路中的 『新增網路』
2. 進到『設定』頁後，點選進階設定
3. 往下滑開啟 『Show test networks』

![](https://i.imgur.com/BEF7AYb.png)

## 進入 Web3.js 世界

在上面我們已經將 測試網節點、錢包、測試幣 都設定完成了，現在就是要進入到使用 Web3.js 的部分。

首先當然就是要先初始化 web3.js，主要傳入一個 Provider ([JSON-RPC Server](https://geth.ethereum.org/docs/rpc/server)）。
這邊我覺得可以想像成，我們需要傳入一個節點，而我們是透過 infura 來幫我們與節點溝通，所以這邊可以直接傳入 infura 的 Endpoint。

而我們使用 `HDWalletProvider` 產出的 priovider，主要是將錢包與 Endpoint 綁定，而不用在去創建帳號並綁定 wallet。
```javascript=
const web3 = new Web3(provider);
```
### 查看帳戶餘額
因為我們上面提供的 provider 已經將錢包給設定完成，所以這邊我們可以直接透過 `getAccounts` 這個函式去查看『節點』下的帳戶資料（錢包地址）。

接著透過 `getBalance` 去取得所擁有的 `Wei`，接著再透過 `fromWei` 將 Wei 轉換成 ETH。 1以太币= 10^18 Wei

```javascript=
  const accounts = await web3.eth.getAccounts(); // 取得當前節點的地址資料。
  console.log(`Account: ${accounts[0]}\n`);// 將會顯示 錢包地址
    
  await keypress();
  // Task 2: Get ETH balance of an address
  const balanceInWei = await web3.eth.getBalance(accounts[0]); // getBalance 取得的單位為 Wei , 1Eth = 10 的 18 次方的 Wei
  const balanceInETH = web3.utils.fromWei(balanceInWei, "ether");
  console.log(`There's ${balanceInETH} ETH in the address ${accounts[0]}\n`);

  await keypress();
```
#### 另一種方法（Provider 未綁定 wallet）
我們可以自己去建立一個 Account，透過將 Metamask 的 privateKey 傳入 `web3.eth.accounts.privateKeyToAccount` 來建立 Account，接著可以透過 `account.address` 去取得錢包地址並查詢餘額。
```javascript=
let account =  await web3.eth.accounts.privateKeyToAccount(privateKey);
// 將 account 的 address 就是我們的 錢包地址
const balanceInWei2 = await web3.eth.getBalance(account.address);
const balanceInETH2 = web3.utils.fromWei(balanceInWei2, "ether");
console.log(`There's ${balanceInETH2} ETH in the address ${account.address}\n`);
```

兩者的差別在於，透過 `web3.eth.accounts` 創建的 account 無法透過 `web3.eth.getAccounts()` 去查詢到，因為 `getAccounts` 是
查看『節點』下的帳戶資料， [參考資料](https://ethereum.stackexchange.com/questions/68577/accounts-created-by-using-web3-eth-accounts-create-dont-appear-when-web3-eth)

## Reference
1. [開發 Dapp - web3.js 初始化 (Day05) - alincode](https://ithelp.ithome.com.tw/articles/10203431)