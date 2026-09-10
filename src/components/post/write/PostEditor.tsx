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
  content?: JSONContent;
  onChange?: (json: JSONContent) => void;
}

const PostEditor = ({ content, onChange }: PostEditorProps) => {
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
      };
    },
  });

  if (!editor) return null;

  return (
    <div className="post-editor-wrap">
      <EditorContent editor={editor} />

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
