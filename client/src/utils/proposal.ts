export type Proposal = {
  id: number;
  title: string;
  description: string;
  status: number;
  initialDeposit: number;
  type: number;
  totalVotes: number;
  owner: string;
  submitDate: Date;
}

// Type - 1: Text Proposal - 2: New Gauge Proposal
// Status - 1: Active (just created)- 2: Passed - 3: In Queue - 4: Canceled
export const proposals: Proposal[] = [
    {
      id: 1,
      title: "Title Proposal 1",
      description: "Description",
      status: 3,
      initialDeposit: 100, // Amount of BGT
      type: 1,
      totalVotes: 1000000, // Total amount of Votes
      owner: "0x999999999999999999999999999999",
      submitDate: new Date(),
    },
    {
      id: 2,
      title: "Title Proposal 2",
      description: "Description",
      status: 1,
      initialDeposit: 100, // Amount of BGT
      type: 2,
      msg: [
        {
          "authority": "bera10d07y265gmmuvt4z0w9aw880jnsr700jm36sq9",
          "receiverAddress": "0xdece87eeea432dfca6d4a40fb228ebd8008afe4c",
          "friendOfTheChef": true
        }
      ],
      totalVotes: 1000000, // Total amount of Votes
      submitDate: new Date(),
    },
    {
      id: 3,
      title: "Title Proposal 3",
      description: "Description",
      status: 1,
      initialDeposit: 100, // Amount of BGT
      type: 1,
      totalVotes: 1000000, // Total amount of Votes
      submitDate: new Date(),
    },
    {
      id: 4,
      title: "Title Proposal 4",
      description: "Description",
      status: 1,
      initialDeposit: 100, // Amount of BGT
      type: 1,
      totalVotes: 1000000, // Total amount of Votes
      submitDate: new Date(),
    },
    {
      id: 5,
      title: "Title Proposal 5",
      description: "Description",
      status: 1,
      initialDeposit: 100, // Amount of BGT
      type: 1,
      totalVotes: 1000000, // Total amount of Votes
      submitDate: new Date(),
    },
  ];
