import axios from "axios";

export const fetchTokensData = async (tokenAddresses: any[]) => {
    try {
      const detailTokens = await axios({
        method: "post",
        url: "http://localhost:3001/api/token/contracts",
        headers: { "Content-Type": "application/json" },
        data: { contractAddresses: tokenAddresses, chainId: "0xaa36a7" },
      });
      if (detailTokens.data.error) 
        throw new Error(detailTokens.data.message);
      return detailTokens.data;
    } catch (error) {
      console.error("Error fetching token data", error);
      return [];
    }
  };

  export const fetchTokenData = async (tokenAddress: `0x${string}`) => {
    try {
      const detailToken = await axios({
        method: "post",
        url: "http://localhost:3001/api/token/contract",
        headers: { "Content-Type": "application/json" },
        data: { contractAddress: tokenAddress, chainId: "0xaa36a7" },
      });
      if (detailToken.data.error) 
        throw new Error(detailToken.data.message);
      return detailToken;
    } catch (error) {
      console.error("Error fetching token data", error);
      return null;
    }
  };