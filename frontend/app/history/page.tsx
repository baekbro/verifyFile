"use client";
import { useEffect, useState } from "react";
import TxHashBadge from "@/components/TxHashBadge";
import { getHistory } from "@/lib/api";

export default function HistoryPage() {
  const [docs, setDocs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { getHistory().then((d) => { setDocs(d); setLoading(false); }); }, []);

  const iconFor = (name: string) => {
    if (name.endsWith(".pdf")) return "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z";
    return "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z";
  };

  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-medium text-gray-900 mb-2">등록 이력</h1>
      <p className="text-sm text-gray-500 mb-8">블록체인에 등록된 내 문서 목록입니다.</p>

      {loading && <p className="text-sm text-gray-400">불러오는 중...</p>}
      {!loading && docs.length === 0 && <p className="text-sm text-gray-400 text-center py-16">등록된 문서가 없습니다.</p>}

      <ul className="space-y-3">
        {docs.map((doc) => (
          <li key={doc.id} className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d={iconFor(doc.file_name)} />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{doc.file_name}</p>
              <p className="text-xs text-gray-400 mt-0.5">{new Date(doc.registered_at).toLocaleDateString("ko-KR")}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full">원본</span>
              <TxHashBadge txHash={doc.tx_hash} />
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
