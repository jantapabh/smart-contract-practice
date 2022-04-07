import { useState } from "react";

// ethers
import {
  JsonRpcSigner,
  Web3Provider,
  JsonRpcProvider,
  AlchemyProvider
} from "@ethersproject/providers";
import { ethers, Wallet } from "ethers";
import { Greeter } from "../../src/types/Greeter";

//json file
import { address } from "./contracts/address.json";
import { abi } from "./contracts/abi.json";

//css
import "./App.css";

let provider: Web3Provider | JsonRpcProvider | AlchemyProvider;
let signer: JsonRpcSigner | Wallet;
let greetContract: Greeter;

const App = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  //Signer => Write, Provider => Read
  // cennect metamask fucntion
  const connectMetamask = async () => {
    if (typeof window.ethereum.enable() !== undefined) {
      // provider อ่านค่าอย่างเดียว
      // web3provider เป็นการเชื่อมต่อกับล contract
      // วิธี นี้เรียกว่า non-custodial  เป็นการทำธุรกรรมเองไม่ได้มีคนมาทำแทน แปะ object etheruem กับ window
      // connect metamask 
      // provider = new ethers.providers.Web3Provider(window.ethereum);

      // JsonRpcProvider
      // () ถ้าไม่ใส่อะไรเลย default = "" ช่องว่าง
      const url = "https://eth-rinkeby.alchemyapi.io/v2/1v-YlbZWB3o7UcDKARPDSvgGYjN0VSFJ";
      // provider = new ethers.providers.JsonRpcProvider(url);

      //alchemyapi provider
      provider = new ethers.providers.AlchemyProvider('rinkeby', '1v-YlbZWB3o7UcDKARPDSvgGYjN0VSFJ');
      
      //connect wallet
      const wallet: Wallet = new ethers.Wallet("7b025ccaec4c8182eefc735175065d7cdc5f5c82cfd5239fcb518a61adae6cfa", provider);
      

      signer = wallet.connect(provider);
      console.log("provider ... ",provider);
      
      await provider.send("eth_requestAccounts", []); 
      // ethereum.enable ใช้ได้เหมือนกัน เป็นการไปขอ premission เพื่อทำการ signer

      // asign get signer เพื่อ find transcation ได้
      // signer = provider.getSigner();

      //get address
      const myAddress = await signer.getAddress();
      setWalletAddress(myAddress);

      // response JsonRpcSigner
      console.log("signer : ", signer);

      // create contarct instance
      // ethers.Contract(address, abi , signer)
      greetContract = new ethers.Contract(address, abi, signer) as Greeter;
    }
  };

  const greet = async () => {
    // get message from contract
    if (greetContract === undefined)
      setStatus("Please firstly connect wallet.");
    // get message from contract
    else setStatus(await greetContract.greet());
  };

  const setGreeter = async () => {
    if (greetContract === undefined) {
      setStatus("Please firstly connect wallet.");
    } else {
      // ดารเขียนข้อมูลลง blockchain ต้องทำการ connect signer
      const tx = await greetContract.connect(signer).setGreeting(message);
      // wating process write data on blockchain
      tx.wait();
      setStatus("Write to block successfully.");
    }
  };

  return (
    <div className="App">
      <p>Address : {walletAddress}</p>
      <p>Status : {status}</p>
      <p>Message : {message}</p>
      <input onChange={(e) => setMessage(e.target.value)} />
      <div className="button">
        <button onClick={() => connectMetamask()}>Connect</button>
        <button onClick={() => greet()}>Get Messaeg</button>
        <button onClick={() => setGreeter()}>Set Messaeg</button>
      </div>
    </div>
  );
};

export default App;
