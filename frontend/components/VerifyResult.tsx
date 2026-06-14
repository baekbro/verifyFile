interface Meta {
  file_name: string;
  tx_hash: string;
  registered_at: string;
  email: string;
}

interface Props {
  exists: boolean;
  fileHash: string;
  registeredAt?: number;
  meta?: Meta | null;
}

export default function VerifyResult({ exists, fileHash, registeredAt, meta }: Props) {
  return (
    <div className={`rounded-xl p-6 mt-6 ${exists ? "bg-green-50 border border-green-300" : "bg-red-50 border border-red-300"}`}>
      <p className={`text-xl font-bold ${exists ? "text-green-700" : "text-red-700"}`}>
        {exists ? "✅ 원본 문서 확인됨" : "❌ 등록되지 않은 문서 (위변조 의심)"}
      </p>
      <p className="mt-2 text-sm text-gray-500 break-all">해시: {fileHash}</p>
      {exists && meta && (
        <div className="mt-4 text-sm space-y-1 text-gray-700">
          <p>📄 파일명: {meta.file_name}</p>
          <p>👤 등록자: {meta.email}</p>
          <p>📅 등록일: {new Date(meta.registered_at).toLocaleString("ko-KR")}</p>
          <p className="break-all">🔗 Tx: <a href={`https://sepolia.etherscan.io/tx/${meta.tx_hash}`} target="_blank" className="text-blue-500 underline">{meta.tx_hash}</a></p>
        </div>
      )}
    </div>
  );
}
