import Sidebar from './Sidebar';
import { FC, useContext, useEffect, useState } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';
import { useRouter } from 'next/router';
import { RootState, useAppSelector } from '@/redux';

const Layout: FC<ILayout> = ({ children }) => {
  const isLogin = useAppSelector((state: RootState) => state.authSlice.isLogin);
  const router = useRouter();

  const [token, setToken] = useState<string>(
    localStorage.getItem(`token`) as string,
  );

  useEffect(() => {
    setToken(localStorage.getItem(`token`) as string);
  }, [isLogin]);

  const { darkMode } = useContext(DarkModeContext);

  if (token) {
    return (
      <div className={darkMode ? `layout dark` : `layout`}>
        <Sidebar setDarkMode={undefined} />

        <div className={`layout__content-container`}>
          <main>{children}</main>
        </div>
      </div>
    );
  } else {
    router.push(`/sign-in`);
    return null;
  }
};

export default Layout;
