const { expect } = require("chai");
const { ethers } = require("hardhat");
import { Greeter } from "../src/types/Greeter";

describe("Greeter", function() {
    it("Should return the new greeting once it's changed", async function() {
        const Greeter = await ethers.getContractFactory("Greeter");
        const greeter: Greeter = await Greeter.deploy("Hello, world!") as Greeter;

        console.log("foo : ",await greeter.foo(3))
        expect(await greeter.greet()).to.equal("Hello, world!");

        const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

        // wait until the transaction is mined
        await setGreetingTx.wait();

        expect(await greeter.greet()).to.equal("Hola, mundo!");
    });
});