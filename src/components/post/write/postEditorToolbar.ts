import type { Editor } from '@tiptap/react';

export type PostEditorToolbarItemId =
  | 'heading1'
  | 'heading2'
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strike'
  | 'bulletList'
  | 'orderedList'
  | 'blockquote'
  | 'color';

export type PostEditorToggleItemId = Exclude<PostEditorToolbarItemId, 'color'>;

export type PostEditorToolbarItem =
  | {
      id: PostEditorToggleItemId;
      kind: 'toggle';
      label: string;
      ariaLabel: string;
    }
  | {
      id: 'color';
      kind: 'color';
      label: string;
      ariaLabel: string;
    };

export const POST_EDITOR_TOOLBAR_ITEMS: PostEditorToolbarItem[] = [
  { id: 'heading1', kind: 'toggle', label: 'H1', ariaLabel: '제목 1' },
  { id: 'heading2', kind: 'toggle', label: 'H2', ariaLabel: '제목 2' },
  { id: 'bold', kind: 'toggle', label: 'B', ariaLabel: '굵게' },
  { id: 'italic', kind: 'toggle', label: 'I', ariaLabel: '기울임' },
  { id: 'underline', kind: 'toggle', label: 'U', ariaLabel: '밑줄' },
  { id: 'strike', kind: 'toggle', label: 'S', ariaLabel: '취소선' },
  { id: 'bulletList', kind: 'toggle', label: '•', ariaLabel: '글머리 목록' },
  { id: 'orderedList', kind: 'toggle', label: '1.', ariaLabel: '번호 목록' },
  { id: 'blockquote', kind: 'toggle', label: '“', ariaLabel: '인용' },
  { id: 'color', kind: 'color', label: 'A', ariaLabel: '글자색' },
];

export const runPostEditorToolbarCommand = (
  editor: Editor,
  itemId: PostEditorToggleItemId,
) => {
  const chain = editor.chain().focus();

  switch (itemId) {
    case 'heading1':
      chain.toggleHeading({ level: 1 }).run();
      return;
    case 'heading2':
      chain.toggleHeading({ level: 2 }).run();
      return;
    case 'bold':
      chain.toggleBold().run();
      return;
    case 'italic':
      chain.toggleItalic().run();
      return;
    case 'underline':
      chain.toggleUnderline().run();
      return;
    case 'strike':
      chain.toggleStrike().run();
      return;
    case 'bulletList':
      chain.toggleBulletList().run();
      return;
    case 'orderedList':
      chain.toggleOrderedList().run();
      return;
    case 'blockquote':
      chain.toggleBlockquote().run();
  }
};

export const isPostEditorToolbarItemActive = (
  editor: Editor,
  itemId: PostEditorToggleItemId,
): boolean => {
  switch (itemId) {
    case 'heading1':
      return editor.isActive('heading', { level: 1 });
    case 'heading2':
      return editor.isActive('heading', { level: 2 });
    case 'bold':
      return editor.isActive('bold');
    case 'italic':
      return editor.isActive('italic');
    case 'underline':
      return editor.isActive('underline');
    case 'strike':
      return editor.isActive('strike');
    case 'bulletList':
      return editor.isActive('bulletList');
    case 'orderedList':
      return editor.isActive('orderedList');
    case 'blockquote':
      return editor.isActive('blockquote');
  }
};

const HEX_COLOR_PATTERN = /^#([0-9a-f]{6})$/i;

export const getPostEditorFontColor = (editor: Editor): string => {
  const color = editor.getAttributes('textStyle').color;

  return typeof color === 'string' && HEX_COLOR_PATTERN.test(color) ? color : '#000000';
};

export const setPostEditorFontColor = (editor: Editor, color: string) => {
  editor.chain().focus().setColor(color).run();
};
