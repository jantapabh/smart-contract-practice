import { Greeter } from "../src/types/Greeter";
import { artifacts, ethers } from "hardhat";
import fs from "fs";

async function main() {
  // We get the contract to deploy
  const Greeter = await ethers.getContractFactory("Greeter");
  const greeter: Greeter = (await Greeter.deploy("Hello, Hardhat!")) as Greeter;

  await greeter.deployed();
  console.log("Greeter deployed to:", greeter.address);
  // call fucntion saveContract
  saveContract(greeter);
}

function saveContract(greeter: Greeter) {
  //create path folder for save contract
  const path = __dirname + "/../frontend/src/contracts";
  console.log("path ..",path);
  
  if (!fs.existsSync(path)) fs.mkdirSync(path);
  // create address contract write on file
  fs.writeFileSync(
    `${path}/address.json`,
    JSON.stringify({ address: greeter.address }, undefined, 2)
  );
  fs.writeFileSync(
    `${path}/abi.json`,
    JSON.stringify(artifacts.readArtifactSync("Greeter"), undefined, 2)
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
