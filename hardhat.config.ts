import { task } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import { HardhatUserConfig } from "hardhat/config";

//typechain
import '@typechain/hardhat';
import '@typechain/ethers-v5';
// import '@typechain/truffle-v5';

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async(taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log("Account : ", account.address);
    }
});

const mnemonic = `endorse safe cloud lumber depth angle main journey open lunch parrot prison`;
const privateKey = '7b025ccaec4c8182eefc735175065d7cdc5f5c82cfd5239fcb518a61adae6cfa';
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 const config: HardhatUserConfig = {
    solidity: "0.8.4",
    networks: {
        // ชื่ออะไรก็ได้
        rinkeby: {
            url: 'https://eth-rinkeby.alchemyapi.io/v2/1v-YlbZWB3o7UcDKARPDSvgGYjN0VSFJ',
            accounts: [privateKey]
            // accounts: []
        }
    },
    typechain: {
        outDir: "src/types",
        target: "ethers-v5",
        alwaysGenerateOverloads: false,
        externalArtifacts: ['externalArtifacts/*.json'],
      },
    // mnemonic , private key ใช้ในการ deploy contract
    // ถ้าเราต้องการ deploy contract ให้ทำงานบน network อื่น
    // ถ้าต้องการ access ไปยัง Rinkeby ได้เราต้องระบุบ node  (ตัวกลาง) ในการนำข้อมูลจาก hardhat deploy to blockchain network
    // โดย node มีหลายตัวเช่น archemy, อินฟูลล่า 
    // deploy  contract use :: npx hardhat run scripts/sample-script.js --network rinkeby

    // Typescript Description
    // typescript ==> ตัวที่ทำให้ js รู้จัก type และช่วยให้การทำ typechain (การทำให้ smart contract รู้จัก type) ง่ายขึ้น 
};  

export default config;