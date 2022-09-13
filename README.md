# 使用etherJS部署智能合約到本地區塊鏈Ganache

## 來源
https://github.com/smartcontractkit/full-blockchain-solidity-course-js#lesson-5-ethersjs-simple-storage

### 前置環境：

#### a. 安裝 [virtual studio code](https://code.visualstudio.com/), [NodeJs](https://nodejs.org/en/)

#### b. 安裝 virtual studio code 延伸模組：solidity+Hardhat, prettier

#### c. 建立一工作資料夾

#### d. 進入此資料夾, 安裝[yarn](https://yarnpkg.com/getting-started/install)

#### e. yarn add solc, yarn add solc@0.8.7-fixed, yarn add ethers

#### f. 安裝[Ganache](https://trufflesuite.com/ganache/) 本地區塊鏈測試環境, 並啟動

### 開始：

#### 1. 撰寫 solidity 智能合約 SimpleStorage.sol

#### 2. 使用 solc 指令 compile 智能合約, 產生 abi 與 bin 檔

yarn solcjs --bin --abi --include-path node_modules/ --base-path . -o . SimpleStorage.sol

#### 3.(optional) 撰寫.env, .encryptKey.js

使用密碼加密 PRIVATE_KEY,並產出 encryptedKey.json

#### 4. 撰寫 deploy.js

#### 5. node deploy.js

部署智能合約 SimpleStorage.sol 到本地區塊鏈環境 Ganache
