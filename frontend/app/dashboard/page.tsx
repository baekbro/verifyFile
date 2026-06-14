"use client";
import { useEffect, useState } from "react";
import { getHistory } from "@/lib/api";

export default function DashboardPage() {
  const [docs, setDocs] = useState<any[]>([]);
  useEffect(() => { getHistory().then(setDocs); }, []);

  const thisMonth = docs.filter((d) => new Date(d.registered_at).getMonth() === new Date().getMonth()).length;

  const stats = [
    { label: "총 등록", value: docs.length },
    { label: "이번 달 등록", value: thisMonth },
    { label: "유효율", value: "100%" },
  ];

  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-medium text-gray-900 mb-2">대시보드</h1>
      <p className="text-sm text-gray-500 mb-8">문서 등록 현황을 확인합니다.</p>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white border border-gray-100 rounded-2xl p-5">
            <p className="text-2xl font-medium text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-5">
        <p className="text-sm font-medium text-gray-700 mb-4">최근 등록</p>
        {docs.length === 0 && <p className="text-sm text-gray-400">등록된 문서가 없습니다.</p>}
        {docs.slice(0, 5).map((doc) => (
          <div key={doc.id} className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0">
            <span className="text-sm text-gray-700 truncate max-w-[220px]">{doc.file_name}</span>
            <span className="text-xs text-gray-400">{new Date(doc.registered_at).toLocaleDateString("ko-KR")}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
