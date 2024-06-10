import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { CircularProgress } from '@mui/material';

interface LoadingTransactionHashProps {
    isConfirmed: boolean;
    isReverted: boolean;
    isError: boolean;
    hash: `0x${string}` | undefined;
    type: string;
    className?: string;
}

const LoadingTransactionHash = ({
    isConfirmed,
    isReverted,
    isError,
    hash,
    type, className
}: LoadingTransactionHashProps) => {
    if (isConfirmed) {
        return (
            <div className={className}>
                <span>Transaction successful</span>
                <span>{type}</span>
                <Button>
                    <Link
                        href={`https://sepolia.etherscan.io/tx/${hash}`}
                        target="_blank"
                    >
                        Transaction hash
                    </Link>
                </Button>
            </div>
        );
    }

    if (isReverted) {
        return (
            <div className={className}>
                <span>Transaction failed</span>
                <span>{type}</span>
                <Button>
                    <Link
                        href={`https://sepolia.etherscan.io/tx/${hash}`}
                        target="_blank"
                    >
                        Transaction hash
                    </Link>
                </Button>
            </div>
        );
    }

    if (isError) {
        return (
            <div className={className}>
                <span>Transaction failed</span>
                <span>{type}</span>
            </div>
        );
    }

    return (
        <div className={className}>
            <CircularProgress />
            <span>Waiting...</span>
            <span>{type}</span>
        </div>
    );
};

export default LoadingTransactionHash;
