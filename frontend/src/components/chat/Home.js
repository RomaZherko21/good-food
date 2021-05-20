import s from './Chat.module.css';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Home() {
  const [roomId, setRoomId] = useState('free');

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

export default Home;
