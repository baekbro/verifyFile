interface Meta { file_name: string; tx_hash: string; registered_at: string; email: string; }
interface Props { exists: boolean; fileHash: string; registeredAt?: number; meta?: Meta | null; }

export default function VerifyResult({ exists, fileHash, meta }: Props) {
  const rows = exists && meta ? [
    { label: "파일명", value: meta.file_name },
    { label: "등록자", value: meta.email },
    { label: "등록일", value: new Date(meta.registered_at).toLocaleDateString("ko-KR") },
    { label: "Tx Hash", value: `${meta.tx_hash.slice(0,10)}...${meta.tx_hash.slice(-6)} ↗`, link: `https://sepolia.etherscan.io/tx/${meta.tx_hash}` },
  ] : [{ label: "파일 해시", value: fileHash }];

  return (
    <div className={`rounded-2xl border p-5 mt-6 ${exists ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"}`}>
      <p className={`font-medium mb-4 flex items-center gap-2 text-sm ${exists ? "text-emerald-700" : "text-red-700"}`}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          {exists
            ? <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            : <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />}
        </svg>
        {exists ? "원본 문서 확인됨" : "등록되지 않은 문서 (위변조 의심)"}
      </p>
      <div className="text-sm space-y-0">
        {rows.map((r) => (
          <div key={r.label} className={`flex justify-between py-2.5 border-b last:border-0 ${exists ? "border-emerald-100" : "border-red-100"}`}>
            <span className="text-gray-500">{r.label}</span>
            {r.link
              ? <a href={r.link} target="_blank" className="font-mono text-xs text-emerald-600 hover:underline">{r.value}</a>
              : <span className="font-mono text-xs text-gray-700 max-w-[200px] truncate">{r.value}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
