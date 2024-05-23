import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  useAccount,
  useBalance,
  useChainId,
  useReadContract,
  useReadContracts,
  useToken,
  useWaitForTransactionReceipt,
  useWriteContract,
  type UseReadContractsReturnType,
} from "wagmi";
import { getStakingAbi, getWizardWealthAbi } from "@/contracts/utils/getAbis";
import {
  getStakingAddress,
  getWizardWealthAddress,
} from "@/contracts/utils/getAddress";
import Link from "next/link";
import { TokenModel } from "@/models/Token.Models";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { ethers } from "ethers";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { wagmiConfig, config } from "@/config/Wagmi.config";
import { bigint } from "zod";
import InputDialog from "./inputDialog";
import { toast } from "sonner";
import { CircularProgress } from "@mui/material";

interface ContentDashboardProps {
  props?: string;
}

const timeStampToDays = (timeStamp: any) => {
  return ethers.getNumber(timeStamp) / (60 * 60 * 24);
};

const ContentDashboard = ({ props }: ContentDashboardProps) => {
  const chain = useChainId();
  const stakingContract = {
    address: getStakingAddress(chain),
    abi: getStakingAbi(),
  } as const;

  const wizardWealthContract = {
    address: getWizardWealthAddress(chain),
    abi: getWizardWealthAbi(),
  } as const;

  const account = useAccount();

  const {
    data: readData,
    error: readDataError,
    isPending: readDataIsPending,
  } = useReadContracts({
    config: config,
    contracts: [
      {
        ...stakingContract,
        functionName: "rewardsDuration",
      },
      {
        ...stakingContract,
        functionName: "stakingToken",
      },
      {
        ...stakingContract,
        functionName: "rewardsToken",
      },
      {
        ...stakingContract,
        functionName: "rewardRate",
      },
      {
        ...stakingContract,
        functionName: "paused",
      },
      {
        ...stakingContract,
        functionName: "periodFinish",
      },
      {
        ...stakingContract,
        functionName: "getRewardForDuration",
      },
    ],
  });

  const {
    data: userData,
    error: userError,
    isPending: userIsPending,
    isSuccess: userIsSuccess,
  } = useReadContracts({
    config: wagmiConfig,
    allowFailure: true,
    contracts: [
      {
        ...stakingContract,
        functionName: "balanceOf",
        args: [account.address],
      },
      {
        ...stakingContract,
        functionName: "earned",
        args: [account.address],
      },
      {
        ...wizardWealthContract,
        functionName: "balanceOf",
        args: [account.address],
      },
    ],
  });

  const {
    data: stakeHash,
    isPending: stakeIsPending,
    isSuccess: stakeIsSuccess,
    isError: stakeIsError,
    writeContract: stakeWriteContract,
  } = useWriteContract();

  const {
    isError: stakeIsReverted,
    isPending: stakeIsConfirming,
    isSuccess: stakeIsConfirmed,
  } = useWaitForTransactionReceipt({
    confirmations: 10,
    hash: stakeHash,
  });

  const {
    data: unStakeHash,
    isPending: unStakeIsPending,
    writeContract: unStakeWriteContract,
    isError: unStakeIsError,
  } = useWriteContract();

  const {
    isError: unStakeIsReverted,
    isPending: unStakeIsConfirming,
    isSuccess: unStakeIsConfirmed,
  } = useWaitForTransactionReceipt({
    confirmations: 10,
    hash: unStakeHash,
  });

  const {
    data: earnHash,
    isPending: earnIsPending,
    isSuccess: earnIsSuccess,
    writeContract: earnWriteContract,
    isError: earnIsError,
  } = useWriteContract();

  const {
    isError: earnStakeIsReverted,
    isPending: earnStakeIsConfirming,
    isSuccess: earnStakeIsConfirmed,
  } = useWaitForTransactionReceipt({
    confirmations: 10,
    hash: earnIsSuccess ? earnHash : undefined,
  });

  const {
    data: approvalHash,
    isPending: approvalIsPending,
    writeContract: approvalWriteContract,
  } = useWriteContract();

  const {
    isError: approvalIsReverted,
    isPending: approvalIsConfirming,
    isSuccess: approvalIsConfirmed,
  } = useWaitForTransactionReceipt({
    confirmations: 10,
    hash: approvalHash,
  });

  const [stakeAmount, setStakeAmount] = useState<number>(0);
  const [unStakeAmount, setUnStakeAmount] = useState<number>(0);

  const stakingTokenAddress = readData ? readData[1].result : "";
  const rewardTokenAddress = readData ? readData[2].result : "";

  const stakingToken = useToken({
    address: rewardTokenAddress as `0x${string}`,
  });

  const rewardToken = useToken({
    address: rewardTokenAddress as `0x${string}`,
  });

  const rewardDuration = readData
    ? timeStampToDays(readData[0].result as any)
    : 0;
  const periodFinish = readData
    ? ethers.getNumber(readData[5].result as any) * 1000
    : 0;
  const rewardRate = ethers.formatEther(
    readData ? (readData[3].result as any) : 0
  );
  const rewardForDuration = ethers.formatEther(
    readData ? (readData[6].result as any) : 0
  );

  const stakingBalance: any = account
    ? parseFloat(
        ethers.formatEther(
          userIsSuccess && userData[0].status == "success"
            ? (userData?.[0].result as any)
            : (0 as any)
        )
      ).toFixed(5)
    : 0;

  const rewardBalance: any = account
    ? parseFloat(
        ethers.formatEther(
          userIsSuccess && userData[1].status == "success"
            ? (userData?.[1].result as any)
            : (0 as any)
        )
      ).toFixed(5)
    : 0;

  const tokenBalance: any = account
    ? parseFloat(
        ethers.formatEther(
          userIsSuccess && userData[2].status == "success"
            ? (userData?.[2].result as any)
            : (0 as any)
        )
      ).toFixed(5)
    : 0;

  const approvalSubmit = () => {
    approvalWriteContract({
      abi: getWizardWealthAbi(),
      address: getWizardWealthAddress(chain),
      functionName: "approve",
      args: [getStakingAddress(chain), ethers.MaxUint256],
    });
  };

  const stakeSubmit = () => {
    stakeWriteContract({
      abi: getStakingAbi(),
      address: getStakingAddress(chain),
      functionName: "stake",
      args: [ethers.parseEther(stakeAmount.toString())],
    });
  };

  const unStakeSubmit = () => {
    unStakeWriteContract({
      abi: getStakingAbi(),
      address: getStakingAddress(chain),
      functionName: "withdraw",
      args: [ethers.parseEther(unStakeAmount.toString())],
    });
  };

  console.log(
    earnIsError,
    earnIsPending,
    earnStakeIsConfirming,
    earnStakeIsConfirmed,
    earnStakeIsReverted
  );

  const earnSubmit = () => {
    earnWriteContract({
      abi: getStakingAbi(),
      address: getStakingAddress(chain),
      functionName: "getReward",
    });
    // toast.custom((t) => {
    //   return (
    //     <div className="flex flex-row items-center p-10">
    //       {earnStakeIsReverted || earnIsError ? (
    //         <div className="flex flex-row items-center">
    //           <CircularProgress /> <span>Transaction is failed</span>
    //         </div>
    //       ) : earnStakeIsConfirmed ? (
    //         <div className="flex flex-row items-center">
    //           <CircularProgress /> <span>Transaction is confirmed</span>
    //         </div>
    //       ) : (
    //         <div className="flex flex-row items-center">
    //           <CircularProgress /> <span>Transaction is confirming...</span>
    //         </div>
    //       )}
    //       <Button onClick={() => toast.dismiss(t)}>Close</Button>
    //     </div>
    //   );
    // });
  };

  const [isApproval, setIsApproval] = useState(false);

  const [earnDialogIsOpen, setEarnDialogIsOpen] = useState(false);

  const [stakeDialogIsOpen, setStakeDialogIsOpen] = useState(false);

  const [unStakeDialogIsOpen, setUnStakeDialogIsOpen] = useState(false);

  useEffect(() => {
    setIsApproval(approvalIsConfirmed ? true : false);
  }, [approvalHash, approvalIsConfirmed]);

  return (
    <div
      className={`flex flex-col w-full bg-fuchsia-100 h-auto p-10 gap-10 animate-fade-out ${props} min-h-[400px]`}
    >
      <span className="flex flex-row items-center justify-center w-full text-2xl font-bold">
        Staking Wizard Wealth Token
      </span>
      <div className="flex flex-row gap-1 w-full h-full">
        <div className="flex flex-col w-1/2 gap-2 items-start">
          <span className="text-2xl font-bold mb-2">General Information</span>
          <div className="flex flex-col gap-2 justify-center">
            <div className="flex flex-row items-center gap-2 font-medium text-sm">
              <span>Staking token:</span>
              <Link
                href={`https://sepolia.etherscan.io/address/${stakingToken.data?.address}`}
                className="text-slate-700 hover:opacity-70 hover:scale-110 hover:duration-500 hover:text-blue-600 font-bold"
              >
                {stakingToken
                  ? `${stakingToken.data?.name} (${stakingToken.data?.symbol})`
                  : "UnknownToken"}
              </Link>
            </div>
            <div className="flex flex-row items-center gap-2 font-medium text-sm">
              <span>Reward token:</span>
              <Link
                href={`https://sepolia.etherscan.io/address/${rewardToken.data?.address}`}
                className="text-slate-700 hover:opacity-70 hover:scale-110 hover:duration-500 hover:text-blue-600 font-bold"
              >
                {rewardToken
                  ? `${rewardToken.data?.name} (${rewardToken.data?.symbol})`
                  : "UnknownToken"}
              </Link>
            </div>
            <div className="flex flex-row items-center gap-1 font-medium text-sm">
              <span>Reward Duration: </span>
              <span className="opacity-70">{`${rewardDuration} days`}</span>
            </div>
            <div className="flex flex-row items-center gap-1 font-medium text-sm">
              <span>Period Finish: </span>
              <span className="opacity-70">{`${new Date(
                periodFinish
              ).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}`}</span>
            </div>
            <div className="flex flex-row items-center gap-1 font-medium text-sm">
              <span>Reward Rate: </span>
              <span className="opacity-70">{`${rewardRate}% / seconds`}</span>
            </div>
            <div className="flex flex-row items-center gap-1 font-medium text-sm">
              <span>Reward for Duration: </span>
              <span className="opacity-70">{`${rewardForDuration}`}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-1/2 items-start justify-start h-full">
          <span className="text-2xl font-bold mb-2">{`User's Information`}</span>
          <div className="flex flex-col gap-2 justify-center">
            <div className="flex flex-row items-center gap-1 font-medium text-sm">
              <span>Staked Balance: </span>
              <span className="opacity-70">{stakingBalance}</span>
            </div>
            <div className="flex flex-row items-center gap-1 font-medium text-sm">
              <span>Earned Reward: </span>
              <span className="opacity-70">{rewardBalance}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-2 rounded-md items-center justify-between">
        {/* <div className="flex flex-col justify-center gap-3 bg-white bg-opacity-60 border-2 border-black rounded-md h-[150px] p-5">
          <Label className="text-lg">Input amount</Label>
          <div className="flex flex-row justify-between">
            <Input
              className={`border-none bg-transparent p-0 outline-none text-2xl focus-visible:ring-0 focus-visible:ring-offset-0 -webkit-appearance-none`}
              type="number"
              inputMode="decimal"
              placeholder="0"
              value={undefined}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
            />
          </div>
          <div className="flex flex-row items-center justify-end h-[100px]">
            <div className="flex flex-row items-center justify-end gap-1 font-bold text-sm ">
              <span>Balance:</span>
              <span className="opacity-70">{`${parseFloat(
                ethers.formatEther(
                  (balance.data ? balance.data.value : 0).toString()
                )
              ).toFixed(5)}`}</span>
            </div>
          </div>
        </div> */}
        <div className="flex flex-col gap-2 justify-center h-[100px]">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                disabled={
                  !(account.status === "connected") ||
                  stakeIsPending ||
                  tokenBalance <= 0
                }
              >
                Stake token
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>Stake token</DialogHeader>
              <DialogTitle>Input the staking amount:</DialogTitle>
              <DialogDescription className="flex flex-col gap-1 justify-center">
                <Input
                  placeholder="0"
                  type="number"
                  value={stakeAmount ? stakeAmount : undefined}
                  onChange={(event) => {
                    setStakeAmount(
                      parseInt(
                        event.currentTarget.value
                          ? event.currentTarget.value
                          : "0"
                      )
                    );
                  }}
                />
                <span>{`Token balance: ${tokenBalance}`}</span>

                <Dialog
                  open={stakeDialogIsOpen}
                  onOpenChange={setStakeDialogIsOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      disabled={
                        stakeIsPending ||
                        stakeAmount <= 0 ||
                        !approvalIsConfirmed
                      }
                      className="w-1/2 self-center mt-2"
                      onClick={() => {
                        setStakeDialogIsOpen(true);
                        if (isApproval) {
                          stakeSubmit();
                        } else {
                          approvalSubmit();
                        }
                      }}
                    >
                      {!isApproval
                        ? "Approve"
                        : stakeIsPending
                        ? "Confirming..."
                        : "Stake token"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>Transaction Detail: </DialogHeader>
                    <DialogDescription className="flex flex-col gap-1 justify-center items-center">
                      {stakeIsConfirmed ? (
                        <div>
                          <span>Transaction successfully</span>
                          <Button>
                            <Link
                              href={`https://sepolia.etherscan.io/tx/${stakeHash}`}
                              target="_blank"
                            >
                              Transaction hash
                            </Link>
                          </Button>
                        </div>
                      ) : stakeIsReverted ? (
                        <div>
                          <span>Transaction failed</span>
                          <Button>
                            <Link
                              href={`https://sepolia.etherscan.io/tx/${stakeHash}`}
                              target="_blank"
                            >
                              Transaction hash
                            </Link>
                          </Button>
                        </div>
                      ) : stakeIsError ? (
                        <div>
                          <span>Transaction failed</span>
                        </div>
                      ) : (
                        <div>
                          <CircularProgress />
                          <span>Waiting...</span>
                        </div>
                      )}
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
              </DialogDescription>
            </DialogContent>
          </Dialog>
          <div className="flex flex-row items-center justify-end gap-1 font-bold text-sm ">
            <span>Balance:</span>
            <span className="opacity-70">{tokenBalance}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-center h-[100px]">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                disabled={
                  !(account.status === "connected") ||
                  unStakeIsPending ||
                  stakingBalance <= 0
                }
              >
                Unstake token
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>Unstake token</DialogHeader>
              <DialogTitle>Input the unstaking amount:</DialogTitle>
              <DialogDescription className="flex flex-col gap-1 justify-center">
                <Input
                  placeholder="0"
                  type="number"
                  value={unStakeAmount ? unStakeAmount : undefined}
                  onChange={(event) => {
                    setUnStakeAmount(
                      parseInt(
                        event.currentTarget.value
                          ? event.currentTarget.value
                          : "0"
                      )
                    );
                  }}
                />
                <span>{`Staking balance: ${stakingBalance}`}</span>

                <Dialog
                  open={unStakeDialogIsOpen}
                  onOpenChange={setUnStakeDialogIsOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      disabled={unStakeIsPending || unStakeAmount <= 0}
                      className="w-1/2 self-center mt-2"
                      onClick={() => {
                        setUnStakeDialogIsOpen(true);
                        unStakeSubmit();
                      }}
                    >
                      {unStakeIsPending
                        ? "Unstaking token..."
                        : "Unstake token"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>Transaction Detail: </DialogHeader>
                    <DialogDescription className="flex flex-col gap-1 justify-center items-center">
                      {unStakeIsConfirmed ? (
                        <div>
                          <span>Transaction successfully</span>
                          <Button>
                            <Link
                              href={`https://sepolia.etherscan.io/tx/${unStakeHash}`}
                              target="_blank"
                            >
                              Transaction hash
                            </Link>
                          </Button>
                        </div>
                      ) : unStakeIsReverted ? (
                        <div>
                          <span>Transaction failed</span>
                          <Button>
                            <Link
                              href={`https://sepolia.etherscan.io/tx/${unStakeHash}`}
                              target="_blank"
                            >
                              Transaction hash
                            </Link>
                          </Button>
                        </div>
                      ) : unStakeIsError ? (
                        <div>
                          <span>Transaction failed</span>
                        </div>
                      ) : (
                        <div>
                          <CircularProgress />
                          <span>Waiting...</span>
                        </div>
                      )}
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
              </DialogDescription>
            </DialogContent>
          </Dialog>

          <div className="flex flex-row items-center justify-end gap-1 font-bold text-sm ">
            <span>Staked Balance:</span>
            <span className="opacity-70">{stakingBalance}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-center h-[100px]">
          <Dialog open={earnDialogIsOpen} onOpenChange={setEarnDialogIsOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                disabled={
                  !(account.status === "connected") ||
                  earnIsPending ||
                  rewardBalance <= 0
                }
                onClick={() => {
                  setEarnDialogIsOpen(true);
                  earnSubmit();
                }}
              >
                {earnIsPending ? "Earning token..." : "Earn token"}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>Transaction Detail: </DialogHeader>
              <DialogDescription className="flex flex-col gap-1 justify-center items-center">
                {earnStakeIsConfirmed ? (
                  <div>
                    <span>Transaction successfully</span>
                    <Button>
                      <Link
                        href={`https://sepolia.etherscan.io/tx/${earnHash}`}
                        target="_blank"
                      >
                        Transaction hash
                      </Link>
                    </Button>
                  </div>
                ) : earnStakeIsReverted ? (
                  <div>
                    <span>Transaction failed</span>
                    <Button>
                      <Link
                        href={`https://sepolia.etherscan.io/tx/${earnHash}`}
                        target="_blank"
                      >
                        Transaction hash
                      </Link>
                    </Button>
                  </div>
                ) : earnIsError ? (
                  <div>
                    <span>Transaction failed</span>
                  </div>
                ) : (
                  <div>
                    <CircularProgress />
                    <span>Waiting...</span>
                  </div>
                )}
              </DialogDescription>
            </DialogContent>
          </Dialog>
          <div className="flex flex-row items-center justify-end gap-1 font-bold text-sm ">
            <span>Earned Reward Balance:</span>
            <span className="opacity-70">{rewardBalance.toString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDashboard;
