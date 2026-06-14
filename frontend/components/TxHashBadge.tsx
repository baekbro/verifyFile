interface Props {
  txHash: string;
}

export default function TxHashBadge({ txHash }: Props) {
  const short = `${txHash.slice(0, 8)}...${txHash.slice(-6)}`;
  return (
    <a
      href={`https://sepolia.etherscan.io/tx/${txHash}`}
      target="_blank"
      className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded font-mono hover:bg-gray-200"
    >
      🔗 {short}
    </a>
  );
}
