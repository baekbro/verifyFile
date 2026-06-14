"use client";
import { useState } from "react";
import FileUploader from "@/components/FileUploader";
import VerifyResult from "@/components/VerifyResult";
import { verifyDocument } from "@/lib/api";

export default function VerifyPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleFile = async (file: File) => {
    setLoading(true);
    setResult(null);
    const data = await verifyDocument(file);
    setResult(data);
    setLoading(false);
  };

  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-medium text-gray-900 mb-2">문서 검증</h1>
      <p className="text-sm text-gray-500 mb-8">파일을 업로드하면 블록체인에서 원본 여부를 즉시 확인합니다.</p>
      <FileUploader onFile={handleFile} label="검증할 파일을 업로드하세요" />
      <button disabled={loading}
        className="mt-4 w-full py-3 rounded-xl bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium transition-colors disabled:opacity-50">
        {loading ? "검증 중..." : "원본 검증"}
      </button>
      {result && <VerifyResult {...result} />}
    </main>
  );
}
