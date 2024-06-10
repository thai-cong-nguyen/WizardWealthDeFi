"use client";
import React, { useState, useEffect } from "react";
// Components
import ItemProposal from "./itemProposal";
import { useChainId, useReadContract, useReadContracts, useWatchContractEvent } from "wagmi";
import { getGovernorAddress } from "@/contracts/utils/getAddress";
import { getGovernorAbi } from "@/contracts/utils/getAbis";
import { ethers } from "ethers";
import axios from "axios";

const statusProposal: any = {
  pending: 0,
  active: 1,
  canceled: 2,
  defeated: 3,
  succeeded: 4,
  queued: 5,
  expired: 6,
};

interface ListProposal {
  status: string;
  search: string;
  order: string;
}

const ListProposal = ({ status, search, order }: ListProposal) => {
  const [proposals, setProposals] = useState<any[]>([]);
  const [voteCasts, setVoteCasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const chain = useChainId();
  const flag = proposals.length > 0;

  const getStatus = async (proposalId: any) => {
    const runner = new ethers.InfuraProvider("sepolia", process.env.NEXT_PUBLIC_INFURA_API_KEY);
    const governorContract = new ethers.Contract(getGovernorAddress(chain), getGovernorAbi(), runner);
    const stateData = await governorContract.state(proposalId);
    return stateData;
  };

  useEffect(() => {
    const fetchProposals = async () => {
      const endpoint = 'https://api.studio.thegraph.com/query/77725/wizardwealthsubgraph/v0.0.5';
      const headers = { "content-type": "application/json" };
      const graphqlQuery = {
        query: `{
          proposalCreateds {
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
          voteCasts {
            voter,
            proposalId,
            support,
            weight
          }
        }`,
        variables: {}
      };

      try {
        const response = await axios.post(endpoint, graphqlQuery, { headers });
        const data = response.data.data;
        const filteredProposals = await Promise.all(data.proposalCreateds.map(async (proposal: any) => {
          const proposalStatus = Number(await getStatus(proposal.proposalId));
          return proposalStatus === statusProposal[status] ? proposal : null;
        }));

        const validProposals = filteredProposals.filter(proposal => proposal !== null);

        const searchedProposals = validProposals.filter(proposal =>
          proposal.proposalId.includes(search) || proposal.description.toLowerCase().includes(search.toLowerCase())
        );

        const sortedProposals = searchedProposals.sort((a, b) =>
          order === "newest" ? b.blockTimestamp - a.blockTimestamp : a.blockTimestamp - b.blockTimestamp
        );

        setProposals(sortedProposals);
        setVoteCasts(data.voteCasts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching proposals:', error);
        setLoading(false);
      }
    };

    fetchProposals();
  }, [status, search, order]);

  return (
    <div className={`flex flex-col gap-3 justify-center ${flag ? "items-center" : ""}`}>
      <div className={`flex flex-col gap-3 justify-center ${flag ? "items-center" : ""} w-full`}>
        {loading && <div>Loading proposals...</div>}
        {!loading && proposals.map((proposal, index) => (
          <ItemProposal key={index} proposal={proposal} />
        ))}
      </div>
      {!flag && !loading && <div className="w-full">No proposals</div>}
    </div>
  );
};

export default ListProposal;
