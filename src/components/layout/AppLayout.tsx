import type { ReactNode } from 'react';
import './AppLayout.css';
import Sidebar from './Sidebar';

/*
2026.07.06 add : 윤소정
    - 레이아웃 작업 (공통 컴포넌트)
    - 배경 이미지 + 흰색 패널 + 사이드바 영역 + 콘텐츠 영역 + 반응형

ex). const MoviePage = () => {
        return <AppLayout>MoviePage</AppLayout>;
    };
*/

interface AppLayoutProps {
  children: ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
  return (
    <main className="app-layout">
      <div className="app-layout_panel">
        <aside className="app-layout_sidebar">
          <Sidebar />
        </aside>

        <section className="app-layout_content">{children}</section>
      </div>
    </main>
  );
}

export default AppLayout;
