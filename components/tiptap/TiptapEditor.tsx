"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";
import { Button } from "@/components/ui/button";
import {
  LucideBold,
  LucideItalic,
  LucideUnderline,
  Heading1,
  Heading2,
  Heading3,
  Pilcrow,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react";

interface TiptapEditorProps {
  value: string;
  onChange: (content: string) => void;
}

export default function TiptapEditor({ value, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      StarterKit.configure({
        heading: false, // disable to avoid conflict if you're using Heading extension separately
      }),
      Bold,
      Italic,
      Underline,
      Heading.configure({ levels: [1, 2, 3] }),
      TextAlign.configure({
        types: ["heading", "paragraph"], // enable for these nodes
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="space-y-2">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 border rounded px-2 py-1 bg-gray-100 dark:bg-gray-800">
        <div className="flex flex-wrap gap-2 border rounded px-2 py-1 bg-gray-100 dark:bg-gray-800">
          <Button
            type="button"
            size="sm"
            variant={editor.isActive("bold") ? "default" : "outline"}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <LucideBold className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant={editor.isActive("italic") ? "default" : "outline"}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <LucideItalic className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant={editor.isActive("underline") ? "default" : "outline"}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <LucideUnderline className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant={
              editor.isActive("heading", { level: 1 }) ? "default" : "outline"
            }
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            <Heading1 className="w-4 h-4" />
          </Button>

          <Button
            type="button"
            size="sm"
            variant={
              editor.isActive("heading", { level: 2 }) ? "default" : "outline"
            }
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            <Heading2 className="w-4 h-4" />
          </Button>

          <Button
            type="button"
            size="sm"
            variant={
              editor.isActive("heading", { level: 3 }) ? "default" : "outline"
            }
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            <Heading3 className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant={editor.isActive("paragraph") ? "default" : "outline"}
            onClick={() => editor.chain().focus().setParagraph().run()}
          >
            <Pilcrow className="w-4 h-4" />
          </Button>

          <Button
            type="button"
            size="sm"
            variant={
              editor.isActive({ textAlign: "left" }) ? "default" : "outline"
            }
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
          >
            <AlignLeft className="w-4 h-4" />
          </Button>

          <Button
            type="button"
            size="sm"
            variant={
              editor.isActive({ textAlign: "center" }) ? "default" : "outline"
            }
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
          >
            <AlignCenter className="w-4 h-4" />
          </Button>

          <Button
            type="button"
            size="sm"
            variant={
              editor.isActive({ textAlign: "right" }) ? "default" : "outline"
            }
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
          >
            <AlignRight className="w-4 h-4" />
          </Button>

          <Button
            type="button"
            size="sm"
            variant={
              editor.isActive({ textAlign: "justify" }) ? "default" : "outline"
            }
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          >
            <AlignJustify className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="border rounded min-h-[200px] p-3 bg-white dark:bg-gray-900">
        <EditorContent
          editor={editor}
          className="prose dark:prose-invert
            [&_h1]:text-3xl
            [&_h2]:text-2xl
            [&_h3]:text-xl
            [&_p]:text-base"
        />
      </div>
    </div>
  );
}
