"use client";
import { useState } from "react";

interface Props {
  onFile: (file: File) => void;
  label?: string;
}

export default function FileUploader({ onFile, label = "파일을 드래그하거나 클릭하세요" }: Props) {
  const [dragging, setDragging] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) onFile(e.target.files[0]);
  };

  return (
    <label
      className={`block border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition ${
        dragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => { e.preventDefault(); setDragging(false); if (e.dataTransfer.files[0]) onFile(e.dataTransfer.files[0]); }}
    >
      <input type="file" className="hidden" onChange={handleChange} />
      <p className="text-gray-500">{label}</p>
    </label>
  );
}
