import '@rainbow-me/rainbowkit/styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { mainnet, sepolia} from 'wagmi/chains'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { cookieStorage, createStorage } from 'wagmi'


export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const infuraApiKey = process.env.NEXT_PUBLIC_INFURA_API_KEY;
const appName = 'Wizard Wealth DAO';

// Create wagmiConfig

// export const config = createConfig({
//   chains: [
//     // mainnet, 
//     sepolia
//   ],
//   transports: {
//     // [mainnet.id]: http(`https://mainnet.infura.io/v3/${infuraApiKey}`),
//     [sepolia.id]: http(`https://sepolia.infura.io/v3/${infuraApiKey}`),
//   },
// })

export const wagmiConfig = getDefaultConfig({
  appName: appName,
  projectId: projectId ? projectId : "",
  chains: [
    // mainnet, 
    sepolia
  ],
  transports: {
    // [mainnet.id]: http(`https://mainnet.infura.io/v3/${infuraApiKey}`),
    [sepolia.id]: http(`https://sepolia.infura.io/v3/${infuraApiKey}`),
  },
  storage: createStorage({
    storage: cookieStorage
  }),
})
