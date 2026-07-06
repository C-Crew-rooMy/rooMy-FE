import { NavLink } from 'react-router-dom';
import activityIcon from '../../assets/icons/ic-activity.png';
import albumIcon from '../../assets/icons/ic-album.png';
import archiveIcon from '../../assets/icons/ic-archvie.png';
import homeIcon from '../../assets/icons/ic-home.png';
import settingIcon from '../../assets/icons/ic-setting.png';
import './Sidebar.css';

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

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="sidebar__menu">
        <ul className="sidebar__main">
          <li>
            <NavLink to="/" className="sidebar__link">
              <img src={homeIcon} className="sidebar__icon" alt="" />
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/timeline" className="sidebar__link">
              <span className="sidebar__clock" aria-hidden="true" />
              <span>Timeline</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/album" className="sidebar__link">
              <img src={albumIcon} className="sidebar__icon" alt="" />
              <span>Album</span>
            </NavLink>
          </li>
        </ul>

        <div className="sidebar__section">
          <NavLink to="/archive" className="sidebar__link">
            <img src={archiveIcon} className="sidebar__icon" alt="" />
            <span>Archive</span>
          </NavLink>

          <ul className="sidebar__sub">
            {archiveMenus.map((menu) => (
              <li key={menu.path}>
                <NavLink to={menu.path} className="sidebar__sub-link">
                  {menu.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="sidebar__archive-gap" aria-hidden="true" />

        <ul className="sidebar__bottom">
          <li>
            <NavLink to="/activity" className="sidebar__link">
              <img src={activityIcon} className="sidebar__icon" alt="" />
              <span>Activity</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/setting" className="sidebar__link">
              <img src={settingIcon} className="sidebar__icon" alt="" />
              <span>Setting</span>
            </NavLink>
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
