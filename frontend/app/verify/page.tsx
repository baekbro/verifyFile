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
    <main className="max-w-xl mx-auto mt-20 px-4">
      <h1 className="text-2xl font-bold mb-2">문서 검증</h1>
      <p className="text-gray-500 mb-6">파일을 업로드하면 블록체인에서 원본 여부를 확인합니다.</p>
      <FileUploader onFile={handleFile} label="검증할 파일을 업로드하세요" />
      {loading && <p className="mt-4 text-blue-500">검증 중...</p>}
      {result && <VerifyResult {...result} />}
    </main>
  );
}
