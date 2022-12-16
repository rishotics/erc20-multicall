import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Lock", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  

  async function deployEOA2Scw() {
    const T = await ethers.getContractFactory("MockERC20");

    const [deployer, s1, rec] = await ethers.getSigners();

    const t1 = await T.deploy("T1", "T11");
    const t2 = await T.deploy("T2", "T22");

    console.log(`T1: ${t1.address}`)
    console.log(`T2: ${t2.address}`)

    await t1.mint(s1.address, "1000");
    await t2.mint(s1.address, "1000");

    console.log(`t1 amount: ${await t1.balanceOf(s1.address)}`)
    console.log(`t2 amount: ${await t2.balanceOf(s1.address)}`)
    
    

    // await t1.mint()
    const amount = ethers.utils.parseEther("1000");
    console.log(`amount: ${amount}`)

    const Eoa2scw = await ethers.getContractFactory("EOA2ScwMigrator");
    const eoa2scw = await Eoa2scw.deploy();
    
    // const app1 = eoa2scw.connect(s1).interface.encodeFunctionData('approveToken', [t1.address, rec.address, amount])
    const tran1 = eoa2scw.connect(s1).interface.encodeFunctionData('sendToken',[t1.address,rec.address, amount])
    console.log(s1.address)
    console.log(`allowance: ${await t1.allowance(s1.address, rec.address)}`)

    // await t1.connect(s1).approve(rec.address, amount);
    // console.log(`allowance: ${await t1.allowance(s1.address, rec.address)}`)

    // console.log(`allowance: ${await t1.allowance(s1.address, rec.address)}`)
    // console.log(`t1 amount: ${await t1.balanceOf(s1.address)}`)
    // await t1.connect(rec).transferFrom(s1.address, rec.address, "10");
    
    // const app2 = eoa2scw.connect(s1).interface.encodeFunctionData('approveToken', [t2.address, rec.address, "1000"])
    // const tran2 = eoa2scw.interface.encodeFunctionData('sendToken',[t2.address, s1.address, rec.address, "1000"])
    
    
    const app1 = eoa2scw.approveToken(t1.address, rec.address, amount).encodeABI();

    await eoa2scw.multicall([app1])
    console.log(`allowance: ${await t1.allowance(s1.address, rec.address)}`)



  }

  describe("Withdrawals", function () {
    describe("Validations", function () {
      it("Should revert with the right error if called too soon", async function () {
        await deployEOA2Scw();

        // const app1 = eoa2swc.connect(s1).interface.encodeFunctionData('approveToken', [t1.address, s1.address, ethers.utils.parseEther("1000")])
        // await eoa2swc.multicall()
      });

      
    });

   

 
  });
});
