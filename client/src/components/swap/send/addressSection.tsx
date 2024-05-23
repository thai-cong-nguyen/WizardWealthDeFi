import { Input } from "@/components/ui/input";
import React from "react";

interface SendSectionProps {
  address?: string | undefined;
  onChangeAddress: (address: `0x${string}` | undefined) => void;
}

const AddressSection: React.FC<SendSectionProps> = ({
  address,
  onChangeAddress,
}) => {
  const handleAddressChange = (address: string) => {
    onChangeAddress(address);
  };
  return (
    <div className="flex flex-col justify-center bg-fuchsia-100 bg-opacity-60 rounded-md h-auto py-5 gap-2">
      <span className="px-5 text-lg font-bold">To</span>
      <div className="w-full px-2">
        <Input
          placeholder="Wallet address or ENS name"
          className="bg-transparent outline-none border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-lg w-full"
          inputMode="text"
          // value={address ? address : undefined}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleAddressChange(event.currentTarget.value);
          }}
        />
      </div>
    </div>
  );
};

export default AddressSection;
