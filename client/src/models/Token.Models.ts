export class TokenModel {
    name: string;
    symbol: string;
    address: string;
    imageUrl: string;

    constructor(name: string, symbol: string, address: string, imageUrl: string) {
        this.name = name;
        this.symbol = symbol;
        this.address = address;
        this.imageUrl = imageUrl;
    }
}