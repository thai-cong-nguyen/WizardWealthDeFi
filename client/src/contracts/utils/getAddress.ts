import { SMART_CONTRACT_ADDRESS } from "./common";

const getAddress = (address: any, chainId: any) => {
    return address[chainId];
}
export const getWizardWealthAddress = (chainId: any) => getAddress(SMART_CONTRACT_ADDRESS.WizardWealth, chainId);
export const getSwapAddress = (chainId: any) => getAddress(SMART_CONTRACT_ADDRESS.Swap, chainId);
export const getStakingAddress = (chainId: any) => getAddress(SMART_CONTRACT_ADDRESS.Staking, chainId);
export const getLendingAddress = (chainId: any) => getAddress(SMART_CONTRACT_ADDRESS.Lending, chainId);
export const getGovernanceTimelockAddress = (chainId: any) => getAddress(SMART_CONTRACT_ADDRESS.GovernanceTimelock, chainId);
export const getGovernorAddress = (chainId: any) => getAddress(SMART_CONTRACT_ADDRESS.Governor, chainId);

export const getWETHAddress = (chainId: any) => getAddress(SMART_CONTRACT_ADDRESS.WETH, chainId);
export const getFactoryAddress = (chainId: any) => getAddress(SMART_CONTRACT_ADDRESS.Factory, chainId);