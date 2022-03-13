import { DeployFunction } from 'hardhat-deploy/types';

const fn: DeployFunction = async function ({ deployments: { deploy, get }, ethers: { getSigners }, network }) {
  const deployer = (await getSigners())[0];
  const tokenContract = await get('ASIX_TOKEN');

  const contractDeployed = await deploy('NFTMarketPlace', {
    from: deployer.address,
    log: true,
    skipIfAlreadyDeployed: false,
    args: [
      tokenContract.address
    ]
  });
  console.log('npx hardhat verify --network '+ network.name +  ' ' + contractDeployed.address);

};
fn.skip = async (hre) => {
  return false;
  // Skip this on kovan.
  const chain = parseInt(await hre.getChainId());
  return chain != 1;
};
fn.tags = ['Marketplace'];
fn.dependencies = ['ASIX_TOKEN']
export default fn;
