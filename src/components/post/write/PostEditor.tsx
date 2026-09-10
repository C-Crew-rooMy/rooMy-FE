'use client';

import { EditorContent, useEditor, useEditorState } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';

import { POST_EDITOR_EXTENSIONS, POST_EDITOR_PROPS } from './postEditorExtensions';
import {
  POST_EDITOR_TOOLBAR_ITEMS,
  getPostEditorFontColor,
  isPostEditorToolbarItemActive,
  runPostEditorToolbarCommand,
  setPostEditorFontColor,
  type PostEditorToggleItemId,
} from './postEditorToolbar';

import type { JSONContent } from '@tiptap/react';

import './PostEditor.css';

interface PostEditorProps {
  title: string;
  onTitleChange: (title: string) => void;
  content?: JSONContent;
  onChange?: (json: JSONContent) => void;
}

const PostEditor = ({ content, onChange, title, onTitleChange }: PostEditorProps) => {
  const editor = useEditor({
    extensions: POST_EDITOR_EXTENSIONS,
    content: content ?? '',
    immediatelyRender: false,
    editorProps: POST_EDITOR_PROPS,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getJSON());
    },
  });

  const toolbarState = useEditorState({
    editor,
    selector: ({ editor }) => {
      if (!editor) return null;

      const active = {} as Record<PostEditorToggleItemId, boolean>;

      POST_EDITOR_TOOLBAR_ITEMS.forEach((item) => {
        if (item.kind === 'toggle') {
          active[item.id] = isPostEditorToolbarItemActive(editor, item.id);
        }
      });

      return {
        color: getPostEditorFontColor(editor),
        active,
        isEmpty: editor.isEmpty,
      };
    },
  });

  if (!editor) return null;

  const isBodyEmpty = toolbarState?.isEmpty ?? editor.isEmpty;

  return (
    <div className="post-editor-wrap">
      <input
        type="text"
        className="post-editor-title"
        placeholder="제목을 입력하세요"
        value={title}
        aria-label="게시글 제목"
        onChange={(event) => onTitleChange(event.target.value)}
      />

      <div className="post-editor-divider" aria-hidden="true" />

      <div
        className={['post-editor-body', isBodyEmpty ? 'post-editor-body--empty' : '']
          .filter(Boolean)
          .join(' ')}
      >
        <EditorContent editor={editor} />
      </div>

      <BubbleMenu editor={editor} className="post-editor-bubble">
        {POST_EDITOR_TOOLBAR_ITEMS.map((item) => {
          if (item.kind === 'color') {
            return (
              <input
                key={item.id}
                type="color"
                className="post-editor-bubble__color"
                aria-label={item.ariaLabel}
                value={toolbarState?.color ?? '#000000'}
                onMouseDown={(event) => event.preventDefault()}
                onChange={(event) => setPostEditorFontColor(editor, event.target.value)}
              />
            );
          }

          const isActive = toolbarState?.active[item.id] ?? false;

          return (
            <button
              key={item.id}
              type="button"
              className="post-editor-bubble__button"
              aria-label={item.ariaLabel}
              aria-pressed={isActive}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => runPostEditorToolbarCommand(editor, item.id)}
            >
              {item.label}
            </button>
          );
        })}
      </BubbleMenu>
    </div>
  );
};

export default PostEditor;
