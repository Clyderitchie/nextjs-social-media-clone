"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import PlaceHolder from "@tiptap/extension-placeholder";
import { submitPost } from "./actions";
import UserAvatar from "@/components/UserAvatar";
import { useSession } from "@/app/(main)/SessionProvider";
import { Button } from "@/components/ui/button";
import "./styles.css";

export default function PostEditor() {
  const {user} = useSession();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      PlaceHolder.configure({
        placeholder: "This is holding its place for you",
      }),
    ],
  });

  const input =
    editor?.getText({
      blockSeparator: "\n",
    }) || "";

  async function onSubmit () {
    await submitPost(input)
    editor?.commands.clearContent();
  }

  return <div className="flex flex-col gap-5 rounded-2xl bg-card shadow-sm p-5">
    <div className="flex gap-5">
      <UserAvatar avatarUrl={user.avatarUrl} className="hidden sm:inline" />
      <EditorContent 
      editor={editor}
      className="w-full max-h-[20rem] overflow-y-auto bg-background rounded-2xl px-5 py-3"
      />
    </div>
    <div className="flex justify-end gap-3">
      <Button
      onClick={onSubmit}
      disabled={!input.trim()}
      className="min-w-20"
      >
        Post
      </Button>
    </div>
  </div>
}
