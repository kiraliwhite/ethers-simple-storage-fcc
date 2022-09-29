# 使用etherJS部署智能合約到Goerli測試網

## 來源
https://github.com/smartcontractkit/full-blockchain-solidity-course-js#lesson-5-ethersjs-simple-storage

### 前置環境：

#### a. 安裝 [virtual studio code](https://code.visualstudio.com/), [NodeJs](https://nodejs.org/en/)

#### b. 安裝 virtual studio code 延伸模組：solidity+Hardhat, prettier

#### c. 建立一工作資料夾
> mkdir workspace

#### d. 進入工作資料夾, 安裝[yarn](https://yarnpkg.com/getting-started/install)
> cd workspace<br>
> corepack enable<br>

#### e. 安裝相關node_module
> yarn add solc<br>
> yarn add solc@0.8.7-fixed<br>
> yarn add ethers<br>
> yarn add fs-extra<br>
> yarn add dotenv<br>

### 開始：

#### 1. 撰寫 solidity 智能合約 SimpleStorage.sol

#### 2. 使用 solc 指令 compile 智能合約, 產生 abi 與 bin 檔

> yarn solcjs --bin --abi --include-path node_modules/ --base-path . -o . SimpleStorage.sol

#### 3.(optional) 撰寫.env, .encryptKey.js

PRIVATE_KEY從MetaMask上取得

在.env內寫入 PRIVATE_KEY_PASSWORD 和 PRIVATE_KEY

使用密碼(PRIVATE_KEY_PASSWORD) 加密 MetaMask所提供的PRIVATE_KEY,並產出 encryptedKey.json

> node .encryptKey.js

加密完成之後從.env中 刪除PRIVATE_KEY_PASSWORD 和 PRIVATE_KEY

#### 4. 註冊alchemy,取得RPC URL

https://www.alchemy.com/

建立app，取得RPC_URL並寫入.env，例如

https://eth-goerli.g.alchemy.com/v2/xxxxxxxxxxxx

#### 5. 撰寫 deploy.js

> PRIVATE_KEY_PASSWORD=xxxxx node deploy.js 

部署智能合約 SimpleStorage.sol 到本地區塊鏈環境 Ganache
