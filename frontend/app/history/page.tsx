"use client";
import { useEffect, useState } from "react";
import TxHashBadge from "@/components/TxHashBadge";
import { getHistory } from "@/lib/api";

export default function HistoryPage() {
  const [docs, setDocs] = useState<any[]>([]);

  useEffect(() => {
    getHistory().then(setDocs);
  }, []);

  return (
    <main className="max-w-2xl mx-auto mt-20 px-4">
      <h1 className="text-2xl font-bold mb-6">등록 이력</h1>
      {docs.length === 0 && <p className="text-gray-400">등록된 문서가 없습니다.</p>}
      <ul className="space-y-3">
        {docs.map((doc) => (
          <li key={doc.id} className="border rounded-xl p-4">
            <p className="font-medium">{doc.file_name}</p>
            <p className="text-xs text-gray-400 mt-1 break-all">{doc.file_hash}</p>
            <div className="mt-2 flex items-center gap-2">
              <TxHashBadge txHash={doc.tx_hash} />
              <span className="text-xs text-gray-400">{new Date(doc.registered_at).toLocaleString("ko-KR")}</span>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
