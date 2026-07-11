'use client';

import Link from 'next/link';
import Image, { type StaticImageData } from 'next/image';
import { usePathname } from 'next/navigation';
import activityIcon from '../../assets/icons/ic-activity.png';
import albumIcon from '../../assets/icons/ic-album.png';
import archiveIcon from '../../assets/icons/ic-archvie.png';
import homeIcon from '../../assets/icons/ic-home.png';
import settingIcon from '../../assets/icons/ic-setting.png';

/*
2026.07.06 add : 윤소정
    - 사이드 바 작업 (공통 컴포넌트)
*/

const archiveMenus = [
  { label: 'Diary', path: '/diary' },
  { label: 'Routine', path: '/routine' },
  { label: 'Music', path: '/music' },
  { label: 'Movie', path: '/movie' },
  { label: 'Book', path: '/book' },
];

const getLinkClassName = (pathname: string, path: string, className: string) => {
  const isActive = path === '/' ? pathname === path : pathname.startsWith(path);

  return isActive ? `${className} active` : className;
};

interface SidebarIconProps {
  src: StaticImageData;
  alt?: string;
}

const SidebarIcon = ({ src, alt = '' }: SidebarIconProps) => (
  <Image src={src} className="sidebar__icon" alt={alt} aria-hidden={alt ? undefined : true} />
);

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <nav className="sidebar">
      <div className="sidebar__menu">
        <ul className="sidebar__main">
          <li>
            <Link href="/" className={getLinkClassName(pathname, '/', 'sidebar__link')}>
              <SidebarIcon src={homeIcon} />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              href="/timeline"
              className={getLinkClassName(pathname, '/timeline', 'sidebar__link')}
            >
              <span className="sidebar__clock" aria-hidden="true" />
              <span>Timeline</span>
            </Link>
          </li>
          <li>
            <Link
              href="/album"
              className={getLinkClassName(pathname, '/album', 'sidebar__link')}
            >
              <SidebarIcon src={albumIcon} />
              <span>Album</span>
            </Link>
          </li>
        </ul>

        <div className="sidebar__section">
          <Link
            href="/archive"
            className={getLinkClassName(pathname, '/archive', 'sidebar__link')}
          >
            <SidebarIcon src={archiveIcon} />
            <span>Archive</span>
          </Link>

          <ul className="sidebar__sub">
            {archiveMenus.map((menu) => (
              <li key={menu.path}>
                <Link
                  href={menu.path}
                  className={getLinkClassName(pathname, menu.path, 'sidebar__sub-link')}
                >
                  {menu.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="sidebar__archive-gap" aria-hidden="true" />

        <ul className="sidebar__bottom">
          <li>
            <Link
              href="/activity"
              className={getLinkClassName(pathname, '/activity', 'sidebar__link')}
            >
              <SidebarIcon src={activityIcon} />
              <span>Activity</span>
            </Link>
          </li>
          <li>
            <Link
              href="/setting"
              className={getLinkClassName(pathname, '/setting', 'sidebar__link')}
            >
              <SidebarIcon src={settingIcon} />
              <span>Setting</span>
            </Link>
          </li>
        </ul>
      </div>

      <button className="sidebar__profile" type="button">
        <span>T</span>
        <span>test</span>
      </button>
    </nav>
  );
};

export default Sidebar;
