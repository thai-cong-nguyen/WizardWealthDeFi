import wizardWealthAbi from "../abis/wizardwealth.json";
import stakingAbi from "../abis/staking.json";
import lendingAbi from "../abis/lending.json";
import governanceTimeLockAbi from "../abis/governance_time_lock.json";
import governorAbi from "../abis/governor.json";
import swapAbi from "../abis/swap.json";
import IERC20Abi from "../abis/IERC20.json";
import WETHAbi from "../abis/weth.json";

export const getWizardWealthAbi = () => wizardWealthAbi;
export const getStakingAbi = () => stakingAbi;
export const getLendingAbi = () => lendingAbi;
export const getGovernanceTimelockAbi = () => governanceTimeLockAbi;
export const getGovernorAbi = () => governorAbi;
export const getSwapAbi = () => swapAbi;
export const getIERC20Abi = () => IERC20Abi;
export const getWETHAbi = () => WETHAbi;