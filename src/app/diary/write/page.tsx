'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import AppLayout from '@/components/layout/AppLayout';
import PostEditor from '@/components/post/write/PostEditor';

import arrowIcon from '@/assets/icons/ic-default-arrow.png';
import lockIcon from '@/assets/icons/ic-lock-on.png';
import plusIcon from '@/assets/icons/ic-plus.png';
import mockImageA from '@/assets/images/size=400.png';
import mockImageB from '@/assets/images/size=300_400.png';
import mockImageC from '@/assets/images/size=600_400.png';

import type { JSONContent } from '@tiptap/react';
import type { StaticImageData } from 'next/image';

import './DiaryWritePage.css';

const CATEGORIES = ['Diary', 'Routine', 'Music', 'Movie', 'Book'] as const;

const MOCK_TAGS = ['일상', '자유로그', '오늘의휴식', '풍경', '오늘도화이팅'] as const;

const MOCK_IMAGES: { src: StaticImageData; isCover: boolean }[] = [
  { src: mockImageA, isCover: true },
  { src: mockImageB, isCover: false },
  { src: mockImageC, isCover: false },
  { src: mockImageA, isCover: false },
  { src: mockImageB, isCover: false },
];

/** 에디터·글쓰기 레이아웃 확인용 임시 페이지 */
const DiaryWritePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<JSONContent | undefined>();
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('Diary');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  return (
    <AppLayout className="app-layout--diary-write">
      <div className="diary-write">
        <header className="diary-write__header">
          <Link href="/diary" className="diary-write__back">
            <Image src={arrowIcon} alt="arrow icon" width={24} height={24} aria-hidden="true" />
            Back
          </Link>

          <div className="diary-write__actions">
            <p className="diary-write__privacy">
              <Image src={lockIcon} alt="" width={16} height={16} aria-hidden="true" />
              비공개 상태입니다.
            </p>
            <button type="button" className="diary-write__draft">
              임시저장 (2)
            </button>
            <button type="button" className="diary-write__submit">
              올리기
            </button>
          </div>
        </header>

        <div className="diary-write__category">
          <span className="diary-write__category-label">카테고리 선택</span>
          <div className="diary-write__category-field">
            <button
              type="button"
              className="diary-write__category-trigger"
              aria-expanded={isCategoryOpen}
              onClick={() => setIsCategoryOpen((open) => !open)}
            >
              {category}
              <span aria-hidden="true">{isCategoryOpen ? '▴' : '▾'}</span>
            </button>

            {isCategoryOpen ? (
              <ul className="diary-write__category-menu">
                {CATEGORIES.map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      className={
                        item === category
                          ? 'diary-write__category-option is-active'
                          : 'diary-write__category-option'
                      }
                      onClick={() => {
                        setCategory(item);
                        setIsCategoryOpen(false);
                      }}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        <PostEditor
          title={title}
          onTitleChange={setTitle}
          content={content}
          onChange={setContent}
        />

        <section className="diary-write__section" aria-label="태그">
          <h2>태그</h2>
          <div className="diary-write__tags">
            {MOCK_TAGS.map((tag) => (
              <span className="diary-write__tag" key={tag}>
                {tag}
                <button type="button" aria-label={`${tag} 태그 삭제`}>
                  ×
                </button>
              </span>
            ))}
            <button type="button" className="diary-write__tag-add">
              #태그
              <span className="diary-write__tag-add-icon">
                <Image src={plusIcon} alt="plus icon" width={10} height={10} />
              </span>
            </button>
          </div>
        </section>

        <section className="diary-write__section" aria-label="이미지">
          <h2>이미지</h2>
          <div className="diary-write__images">
            {MOCK_IMAGES.map((image, index) => (
              <div
                className="diary-write__image-slot"
                key={`${image.src.src}-${index}`}
                style={{ backgroundImage: `url(${image.src.src})` }}
                role="img"
                aria-label={`업로드 이미지 ${index + 1}`}
              >
                <button type="button" className="diary-write__image-remove" aria-label="이미지 삭제">
                  ×
                </button>
                {image.isCover ? <span className="diary-write__image-cover">대표</span> : null}
              </div>
            ))}
            <button type="button" className="diary-write__image-slot diary-write__image-slot--add">
              <Image src={plusIcon} alt="" width={28} height={28} aria-hidden="true" />
            </button>
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default DiaryWritePage;
