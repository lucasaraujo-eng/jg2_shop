'use client';

import { useEffect, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';

const btn =
  'rounded border border-border px-2 py-1 text-xs font-bold text-muted-2 transition hover:border-brand hover:text-brand disabled:opacity-40';
const btnActive = 'border-brand bg-surface-badge text-brand';

async function uploadInlineImage(file: File, folder: string): Promise<string> {
  const fd = new FormData();
  fd.append('file', file);
  fd.append('folder', folder);
  const res = await fetch('/api/upload', { method: 'POST', body: fd });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Falha no upload');
  return json.url as string;
}

export function RichTextEditor({
  value,
  onChange,
  folder = 'blog',
}: {
  value: string;
  onChange: (html: string) => void;
  folder?: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const lastExternal = useRef(value);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
      }),
      Image.configure({ allowBase64: false }),
    ],
    content: value || '',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'min-h-[220px] px-4 py-3 text-sm leading-relaxed text-ink outline-none prose prose-sm max-w-none [&_img]:max-h-64 [&_img]:rounded-lg',
      },
    },
    onUpdate: ({ editor: ed }) => {
      const html = ed.getHTML();
      lastExternal.current = html;
      onChange(html);
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (value === lastExternal.current) return;
    lastExternal.current = value;
    editor.commands.setContent(value || '', { emitUpdate: false });
  }, [editor, value]);

  if (!editor) {
    return (
      <div className="rounded-lg border border-border bg-surface-card px-4 py-8 text-center text-sm text-tertiary">
        Carregando editor…
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-white">
      <div className="flex flex-wrap gap-1.5 border-b border-border-soft bg-surface-card px-2 py-2">
        <button
          type="button"
          className={`${btn} ${editor.isActive('bold') ? btnActive : ''}`}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          N
        </button>
        <button
          type="button"
          className={`${btn} ${editor.isActive('italic') ? btnActive : ''}`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          I
        </button>
        <button
          type="button"
          className={`${btn} ${editor.isActive('heading', { level: 2 }) ? btnActive : ''}`}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          H2
        </button>
        <button
          type="button"
          className={`${btn} ${editor.isActive('heading', { level: 3 }) ? btnActive : ''}`}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          H3
        </button>
        <button
          type="button"
          className={`${btn} ${editor.isActive('bulletList') ? btnActive : ''}`}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          Lista
        </button>
        <button
          type="button"
          className={`${btn} ${editor.isActive('orderedList') ? btnActive : ''}`}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1.
        </button>
        <button
          type="button"
          className={`${btn} ${editor.isActive('link') ? btnActive : ''}`}
          onClick={() => {
            const prev = editor.getAttributes('link').href as string | undefined;
            const url = window.prompt('URL do link', prev ?? 'https://');
            if (url === null) return;
            if (!url) {
              editor.chain().focus().extendMarkRange('link').unsetLink().run();
              return;
            }
            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
          }}
        >
          Link
        </button>
        <button type="button" className={btn} onClick={() => fileRef.current?.click()}>
          Imagem
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            e.target.value = '';
            if (!file) return;
            try {
              const url = await uploadInlineImage(file, folder);
              editor.chain().focus().setImage({ src: url }).run();
            } catch (err) {
              window.alert(err instanceof Error ? err.message : 'Falha no upload');
            }
          }}
        />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
