const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
    //Goerli RPC_URL 是alchemy 提供的
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    //const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    //移除上方wallet這行 改用讀取.encryptedKey.json 讀取結果存在變數encryptedJson 中
    const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8");
    //透過ethers.wallet還原一個錢包,輸入變數encryptedJson與加密私鑰的密碼(這邊是寫env的變數)
    let wallet = new ethers.Wallet.fromEncryptedJsonSync(
        encryptedJson,
        process.env.PRIVATE_KEY_PASSWORD
    );
    //將還原後的wallet與最上方宣告的provider連接
    wallet = await wallet.connect(provider);
    const abi = fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.abi",
        "utf8"
    );
    const binary = fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.bin",
        "utf8"
    );
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
    console.log("Deploying, please wait...");
    const contract = await contractFactory.deploy(); //STOP here,會停在這,等待合約部署完成,回傳一個promise
    await contract.deployTransaction.wait(1); //等待一個區塊確認
    console.log(`Contract Address is : ${contract.address}`);
    //從部署出來的合約中呼叫function取得回傳值  透過console.log輸出
    const getNumberFromSolidity = await contract.retrieve();
    console.log(`Number is : ${getNumberFromSolidity.toString()}`);
    //呼叫solidity的store function存入777
    const setNumber = await contract.store("777");
    //等待1個區塊時間
    await setNumber.wait(1);
    //再次呼叫solidity 的view function
    const getUpdateNumber = await contract.retrieve();
    //輸出結果到console.log
    console.log(`Update Number is : ${getUpdateNumber}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
