import AppLayout from '@/components/layout/AppLayout';
import Link from 'next/link';

/** Diary 목록 자리 표시용 임시 페이지 */
const DiaryPage = () => {
  return <AppLayout>DiaryPage
    <button>
      <Link href="/diary/write">
        Write
      </Link>
    </button>
  </AppLayout>;
};

export default DiaryPage;
