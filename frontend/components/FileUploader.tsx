"use client";
import { useState } from "react";

interface Props { onFile: (file: File) => void; label?: string; }

export default function FileUploader({ onFile, label = "파일을 드래그하거나 클릭하세요" }: Props) {
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handle = (file: File) => { setFileName(file.name); onFile(file); };

  return (
    <label className={`flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-2xl p-12 cursor-pointer transition-all ${
      dragging ? "border-emerald-500 bg-emerald-50" : "border-gray-200 hover:border-emerald-400 hover:bg-emerald-50/30"
    }`}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => { e.preventDefault(); setDragging(false); if (e.dataTransfer.files[0]) handle(e.dataTransfer.files[0]); }}
    >
      <input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && handle(e.target.files[0])} />
      <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg>
      </div>
      {fileName ? (
        <div className="text-center">
          <p className="text-sm font-medium text-emerald-700">{fileName}</p>
          <p className="text-xs text-gray-400 mt-1">다른 파일을 선택하려면 클릭</p>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-sm font-medium text-gray-700">{label}</p>
          <p className="text-xs text-gray-400 mt-1">PDF, DOCX, JPG · 최대 10MB</p>
        </div>
      )}
    </label>
  );
}
