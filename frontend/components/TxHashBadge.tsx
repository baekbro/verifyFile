interface Props { txHash: string; }
export default function TxHashBadge({ txHash }: Props) {
  return (
    <a href={`https://sepolia.etherscan.io/tx/${txHash}`} target="_blank"
      className="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-lg font-mono transition-colors">
      {txHash.slice(0, 8)}…{txHash.slice(-6)} ↗
    </a>
  );
}
