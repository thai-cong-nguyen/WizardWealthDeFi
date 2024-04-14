type SupplyAsset = {
    id: string,
    name: string, 
    symbol: string,
    image: string,
    walletBalance: string,
    apy: number,
    collateral: boolean,
}

type BorrowAsset = {
    id: string,
    name: string,
    symbol: string,
    image: string,
    available: string,
    apy: number,
}

export const yourSupplyAssets: SupplyAsset[] = [
    {
        id: "1",
        name: "Wrapped BTC",
        symbol: "WBTC",
        image: "https://s2.coinmarketcap.com/static/img/coins/64x64/3717.png",
        walletBalance: "1000",
        apy: 30,
        collateral: true,
    },
    {
        id: "1",
        name: "Wrapped BTC",
        symbol: "WBTC",
        image: "https://s2.coinmarketcap.com/static/img/coins/64x64/3717.png",
        walletBalance: "1000",
        apy: 30,
        collateral: true,
    }
    ,{
        id: "1",
        name: "Wrapped BTC",
        symbol: "WBTC",
        image: "https://s2.coinmarketcap.com/static/img/coins/64x64/3717.png",
        walletBalance: "1000",
        apy: 30,
        collateral: true,
    }
]

export const yourBorrowAssets: BorrowAsset[] = [
    {
        id: "1",
        name: "Wrapped BTC",
        symbol: "WBTC",
        image: "https://s2.coinmarketcap.com/static/img/coins/64x64/3717.png",
        available: "1000",
        apy: 30,
    },
    {
        id: "1",
        name: "Wrapped BTC",
        symbol: "WBTC",
        image: "https://s2.coinmarketcap.com/static/img/coins/64x64/3717.png",
        available: "1000",
        apy: 30,
    },
    {
        id: "1",
        name: "Wrapped BTC",
        symbol: "WBTC",
        image: "https://s2.coinmarketcap.com/static/img/coins/64x64/3717.png",
        available: "1000",
        apy: 30,
    },
]