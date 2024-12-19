"use client";

import QuillEditor from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Label } from "./ui/label";
import { FC } from "react";
import { headers } from "next/headers";

interface RichTextEditorProps {
  label: string;
  value: string;
  isError: boolean;
  onChange: (value: string) => void;
}

const RichTextEditor: FC<RichTextEditorProps> = ({
  label,
  value,
  isError,
  onChange,
}) => {
  const quillModules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        [{ size: ["small", false, "large", "huge"] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        ["clean"],
      ],
    },
  };
  return (
    <div className="flex flex-col space-y-1.5">
      <Label>{label}</Label>
      <QuillEditor
        modules={quillModules}
        value={value}
        onChange={onChange}
        className="h-[300px] pb-16"
      />

      {isError && (
        <div className="text-xs text-red-500">This field is required</div>
      )}
    </div>
  );
};

export default RichTextEditor;
