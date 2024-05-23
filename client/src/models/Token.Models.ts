export class TokenModel {
    address: `0x${string}`;
    address_label: string | null;
    name: string | null;
    symbol: string | null;
    decimals: string | null;
    logo: string | null;
    logo_hash: string | null;
    thumbnail: string | null;
    total_supply: string | null;
    total_supply_formatted: string | null;
    block_number: string | null;
    validated: number | null;
    create_at: string | null;
    possible_spam: boolean | null;
    verified_contract: boolean | null;
    native?: boolean;

    constructor(address: `0x${string}`,
        address_label: string | null,
        name: string | null,
        symbol: string | null,
        decimals: string | null,
        logo: string | null,
        logo_hash: string | null,
        thumbnail: string | null,
        total_supply: string | null,
        total_supply_formatted: string | null,
        block_number: string | null,
        validated: number | null,
        create_at: string | null,
        possible_spam: boolean | null,
        verified_contract: boolean | null, 
        native?: boolean | null,
    ) {
        this.name = name;
        this.symbol = symbol;
        this.address = address;
        this.address_label = address_label;
        this.decimals = decimals;
        this.logo = logo;
        this.logo_hash = logo_hash;
        this.thumbnail = thumbnail;
        this.total_supply = total_supply;
        this.total_supply_formatted = total_supply_formatted;
        this.block_number = block_number;
        this.validated = validated;
        this.create_at = create_at;
        this.possible_spam = possible_spam;
        this.verified_contract = verified_contract;
        this.native = native || false;
    }
}