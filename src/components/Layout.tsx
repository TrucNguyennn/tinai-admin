import Sidebar from './Sidebar';
import Header from './Header';
import { FC, useContext, useState } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';
import { RootState, useAppDispatch, useAppSelector } from '@/redux';

const Layout: FC<ILayout> = ({ children }) => {
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector((state: RootState) => state.authSlice.isLogin);

  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? `layout dark` : `layout`}>
      <Sidebar setDarkMode={undefined} />

      <div className={`layout__content-container`}>
        <Header />

        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
