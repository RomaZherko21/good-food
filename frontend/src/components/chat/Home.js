import s from './Chat.module.css';
import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
// import { useLocalStorage } from '../../hooks/useLocalstorage';
import { AppContext } from '../../state/context';

export function Home() {
  const { state } = useContext(AppContext);
  const [roomId, setRoomId] = useState('free');
  // useEffect(() => {
  //   window.localStorage.setItem('username', state.user.email);
  // }, []);

  const handleChangeRoom = (e) => {
    setRoomId(e.target.value);
  };

  return (
    <div className={s.chatHome}>
      <label>Room:</label>
      <select value={roomId} onChange={handleChangeRoom}>
        <option value="free">Free</option>
        <option value="job" disabled>
          Job
        </option>
      </select>
      <NavLink exact to={`/chat/${roomId}`}>
        <button>Chat...</button>
      </NavLink>
    </div>
  );
}
