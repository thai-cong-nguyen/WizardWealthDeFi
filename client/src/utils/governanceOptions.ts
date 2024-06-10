import { getBoxTestAbi, getGovernorAbi, getStakingAbi, getSwapAbi, getLendingAbi } from "@/contracts/utils/getAbis";
import { getBoxTestAddress, getGovernorAddress, getLendingAddress, getStakingAddress, getSwapAddress } from "@/contracts/utils/getAddress";
import { ethers } from "ethers";

export const governanceOptions = (chain: any) => [
    {
      name: "Swap Contract",
      address: getSwapAddress(chain),
      abi: getSwapAbi(),
      functions: [],
    },
    {
      name: "Staking Contract",
      address: getStakingAddress(chain),
      abi: getStakingAbi(),
      functions: [],
    },
    {
      name: "Lending Contract",
      address: getLendingAddress(chain),
      abi: getLendingAbi(),
      functions: [],
    },
    {
      name: "Governance Contract",
      address: getGovernorAddress(chain),
      abi: getGovernorAbi(),
      functions: [],
    },
    {
      name: "Box Contract",
      address: getBoxTestAddress(chain),
      abi: getBoxTestAbi(),
      functions: [
        {
          name: "Set value",
          signature: "store",
          inputs: [{ name: "value", type: "uint256" }]
        }
      ],
    },
  ];