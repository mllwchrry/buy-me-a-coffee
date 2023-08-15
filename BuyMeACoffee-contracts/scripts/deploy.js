const hre = require("hardhat");

async function main() {

  const buyMeACoffee  = await hre.ethers.deployContract("BuyMeACoffee");

  await buyMeACoffee.waitForDeployment();

  console.log("BuyMeACoffee deployed to:", await buyMeACoffee.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
