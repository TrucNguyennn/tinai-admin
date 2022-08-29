import { RiDashboardFill } from 'react-icons/ri';
import { FaUser } from 'react-icons/fa';
import { MdOutlineStoreMallDirectory } from 'react-icons/md';
import {
  MdExitToApp,
  MdCreditCard,
  MdLocalShipping,
  MdInsertChart,
  MdNotifications,
  MdSettings,
} from 'react-icons/md';
import Link from 'next/link';
import { useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';
import { useRouter } from 'next/router';

const Sidebar = ({ setDarkMode }) => {
  const { dispatch } = useContext(DarkModeContext);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem(`token`);
    router.push(`/sign-in`);
  };

  return (
    <div className={'sidebar'}>
      <div className={'sidebar__top'}>
        <h3>Tinai</h3>
      </div>

      <hr />

      <div className={'sidebar__center'}>
        <div className={'sidebar__center-container'}>
          <p className={'title'}>Danh sách</p>
          <div className={'item'} onClick={() => router.push(`/users`)}>
            <FaUser className={'icon'} />
            <span>Người dùng</span>
          </div>
          <div className={'item'} onClick={() => router.push(`/purposes`)}>
            <MdOutlineStoreMallDirectory className={'icon'} />
            <span>Mục đích</span>
          </div>
          <div className={'item'} onClick={() => router.push(`/settings`)}>
            <MdSettings className={'icon'} />
            <span>Cài đặt</span>
          </div>
          <p className={'title'}>Cá nhân</p>
          <div className={'item'} onClick={() => router.push(`/profile`)}>
            <MdExitToApp className={'icon'} />
            <span>Cá nhân</span>
          </div>
          <div className={'item'} onClick={handleLogout}>
            <MdExitToApp className={'icon'} />
            <span>Đăng xuất</span>
          </div>
        </div>
      </div>

      <div className={'sidebar__bottom'}>
        <p className={'theme'}>Theme</p>
        <div className={'sidebar__bottom-container'}>
          <div
            onClick={() => dispatch({ type: 'LIGHT' })}
            className={'colorOption'}
          />
          <div
            onClick={() => dispatch({ type: 'DARK' })}
            className={'colorOption'}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
