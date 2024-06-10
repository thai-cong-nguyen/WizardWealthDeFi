import React from "react";
import { notFound, useParams } from "next/navigation";
import axios from "axios";
import ProposalDetail from "@/components/proposal/ProposalDetail";
import { ethers } from 'ethers';
import { getGovernorAddress } from '@/contracts/utils/getAddress';
import { getGovernorAbi } from '@/contracts/utils/getAbis';
import { useChainId } from 'wagmi';

const Proposal = async ({
  params,
  searchParams,
}: {
  params: any;
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const fetchProposalDetail = async () => {
    const endpoint =
      "https://api.studio.thegraph.com/query/77725/wizardwealthsubgraph/v0.0.5";
    const headers = {
      "content-type": "application/json",
    };
    const graphqlQuery = {
      query: `{
        proposalCreateds (where: {proposalId: "${params.proposalId}"}) {
          id,
          proposalId,
          proposer,
          targets,
          values,
          calldatas,
          voteStart,
          voteEnd,
          description,
          blockTimestamp,
          transactionHash
        },
        voteCasts (where: {proposalId: "${params.proposalId}"}) {
          voter,
          proposalId,
        }
      }`,
      variables: {},
    };

    try {
      const response = await axios.post(endpoint, graphqlQuery, { headers });
      const data = response.data.data;
      return data;
    } catch (error) {
      console.error("Error fetching proposals:", error);
      return null;
    }
  }
  const proposalDetail = await fetchProposalDetail();
  const proposal = proposalDetail.proposalCreateds[0];

  if (proposal.length === 0) {
    notFound();
  }

  const getStatus = async (proposalId: any) => {
    const runner = new ethers.InfuraProvider("sepolia", process.env.NEXT_PUBLIC_INFURA_API_KEY);
    const governorContract = new ethers.Contract(getGovernorAddress("11155111"), getGovernorAbi(), runner);
    const stateData = await governorContract.state(proposalId);

    return stateData;
  };

  const proposalStatus = await getStatus(proposal.proposalId);

  return (
    <main>
      <ProposalDetail proposalDetail={proposal} proposalStatus={proposalStatus} voteCast={proposalDetail.voteCasts} />
    </main>
  );
};

export default Proposal;
