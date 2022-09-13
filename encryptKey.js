const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  //使用private key還原一個暫時的錢包wallet
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);

  //這個wallet是etherJS產出來的 裡面有一個encrypt加密功能
  //輸入兩個值一個是密碼 另一個是PRIVATE KEY 這兩者都寫在.env檔案中
  //最後產出的結果 會存在encryptJsonKey 這個變數內
  //就是透過密碼對PRIVATE_KEY加密
  const encryptJsonKey = await wallet.encrypt(
    process.env.PRIVATE_KEY_PASSWORD,
    process.env.PRIVATE_KEY
  );
  //印出encryptJsonKey使用密碼加密PRIVATE_KEY的結果
  console.log(encryptJsonKey);
  //將加密後的結果存在當前目錄底下 成為一個檔案 名為.encryptedKey.json
  fs.writeFileSync("./.encryptedKey.json", encryptJsonKey);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
