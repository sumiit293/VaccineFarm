var VaccineFarm = artifacts.require("./VaccineFarm.sol");

module.exports = async function(deployer,network,accounts) {
  // Deploy Mock DAI Token
  await deployer.deploy(VaccineFarm);
  const vaccinFarm = await VaccineFarm.deployed();

}