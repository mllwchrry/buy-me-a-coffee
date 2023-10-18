const hre = require("hardhat");

async function main() {

  const buyMeACoffee  = await hre.ethers.deployContract("BuyMeACoffee");

  await buyMeACoffee.waitForDeployment();

  console.log("BuyMeACoffee deployed to:", await buyMeACoffee.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
