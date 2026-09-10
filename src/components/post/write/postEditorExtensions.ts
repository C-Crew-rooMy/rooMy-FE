import { Color, TextStyle } from '@tiptap/extension-text-style';
import StarterKit from '@tiptap/starter-kit';

import type { Extensions } from '@tiptap/react';

/** 글쓰기·상세 보기가 같은 스키마를 쓰도록 한 번만 생성 */
export const POST_EDITOR_EXTENSIONS: Extensions = [
  StarterKit.configure({
    heading: { levels: [1, 2] },
    //본문에서 링크 클릭 시 새 탭으로 열지 않도록 설정
    link: {
      openOnClick: false,
    },
  }),
  TextStyle,
  Color,
];

export const POST_EDITOR_PROPS = {
  attributes: {
    class: 'post-editor',
    'aria-label': '게시글 내용',
  },
};
