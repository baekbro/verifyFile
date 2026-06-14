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
    <main className="max-w-xl mx-auto mt-20 px-4">
      <h1 className="text-2xl font-bold mb-2">문서 등록</h1>
      <p className="text-gray-500 mb-6">문서를 업로드하면 블록체인에 해시를 기록합니다.</p>
      <FileUploader onFile={handleFile} />
      {loading && <p className="mt-4 text-blue-500">블록체인에 등록 중...</p>}
      {result?.txHash && (
        <div className="mt-6 bg-green-50 border border-green-300 rounded-xl p-4">
          <p className="font-semibold text-green-700">✅ 등록 완료</p>
          <p className="text-sm mt-1 break-all text-gray-600">Hash: {result.fileHash}</p>
          <a href={`https://sepolia.etherscan.io/tx/${result.txHash}`} target="_blank" className="text-blue-500 text-sm underline">Etherscan에서 확인 →</a>
        </div>
      )}
      {result?.error && <p className="mt-4 text-red-500">{result.error}</p>}
    </main>
  );
}
