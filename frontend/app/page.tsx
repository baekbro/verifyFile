"use client";
import { useState } from "react";
import FileUploader from "@/components/FileUploader";
import { registerDocument } from "@/lib/api";

export default function Home() {
  const [result, setResult] = useState<{ fileHash?: string; txHash?: string; error?: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFile = async (file: File) => {
    setLoading(true);
    setResult(null);
    const data = await registerDocument(file);
    setResult(data);
    setLoading(false);
  };

  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        Sepolia 테스트넷 연동
      </span>
      <h1 className="text-3xl font-medium text-gray-900 leading-tight mb-2">
        문서 위변조를<br />블록체인으로 검증
      </h1>
      <p className="text-sm text-gray-500 mb-8">업로드 즉시 SHA-256 해시를 이더리움 네트워크에 기록합니다.</p>

      <FileUploader onFile={handleFile} />

      <div className="grid grid-cols-2 gap-3 mt-4">
        <button
          disabled={loading}
          className="flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors disabled:opacity-50"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" /></svg>
          {loading ? "등록 중..." : "블록체인에 등록"}
        </button>
        <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 hover:bg-gray-50 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
          원본 검증
        </button>
      </div>

      {result?.txHash && (
        <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
          <p className="font-medium text-emerald-700 mb-4 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            원본 문서 확인됨
          </p>
          <div className="space-y-0 text-sm">
            {[
              { label: "파일 해시", value: result.fileHash?.slice(0, 20) + "..." },
              { label: "Tx Hash", value: result.txHash?.slice(0, 10) + "..." + result.txHash?.slice(-6), link: `https://sepolia.etherscan.io/tx/${result.txHash}` },
            ].map((row) => (
              <div key={row.label} className="flex justify-between py-2.5 border-b border-emerald-100 last:border-0">
                <span className="text-gray-500">{row.label}</span>
                {row.link ? (
                  <a href={row.link} target="_blank" className="font-mono text-xs text-emerald-600 hover:underline">{row.value} ↗</a>
                ) : (
                  <span className="font-mono text-xs text-gray-700">{row.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {result?.error && <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl p-4">{result.error}</p>}
    </main>
  );
}
