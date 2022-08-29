import { useContext } from 'react';
import {
  MdChatBubbleOutline,
  MdFullscreenExit,
  MdNotificationsNone,
  MdOutlineDarkMode,
  MdOutlineLanguage,
  MdOutlineList,
  MdOutlineWbSunny,
  MdSearch,
} from 'react-icons/md';
import { DarkModeContext } from '../context/DarkModeContext';

const link =
  'https://www.pinkvilla.com/imageresize/tom_cruise_action_movies.jpg?width=752&format=webp&t=pvorg';

const Header = () => {
  const { darkMode, dispatch } = useContext(DarkModeContext);

  return (
    <div className={'header'}>
      <div className="header__container">
        <div className="searchbar">
          <input
            className={'searchbar__input'}
            type="text"
            placeholder={'Search...'}
          />
          <MdSearch className={'icon'} />
        </div>

        <div className="items">
          <div className="item">
            <MdOutlineLanguage className={'icon'} />
            English
          </div>

          <div className={'item'}>
            {darkMode ? (
              <MdOutlineWbSunny
                onClick={() => dispatch({ type: 'TOGGLE' })}
                className={'icon'}
              />
            ) : (
              <MdOutlineDarkMode
                onClick={() => dispatch({ type: 'TOGGLE' })}
                className={'icon'}
              />
            )}
          </div>

          <div className={'item'}>
            <MdFullscreenExit className={'icon'} />
          </div>

          <div className={'item'}>
            <MdNotificationsNone className={'icon'} />
            <div className="counter">2</div>
          </div>

          <div className={'item'}>
            <MdChatBubbleOutline className={'icon'} />
            <div className="counter">2</div>
          </div>

          <div className={'item'}>
            <MdOutlineList className={'icon'} />
          </div>

          <div className={'item'}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={link} className={'avatar'} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
