import s from './Chat.module.css';
import { useParams } from 'react-router-dom';

import { useChat } from '../../hooks/useChat';
// import { useLocalStorage } from '../../hooks/useLocalstorage';
import { MessageForm } from './MessageForm';
import { MessageList } from './MessageList';
import { UserList } from './UserList';
import { AppContext } from '../../state/context';
import { useContext } from 'react';

export function ChatRoom() {
  const { state } = useContext(AppContext);
  const { roomId } = useParams();
  // const [username] = useLocalStorage('username');
  const { users, messages, sendMessage, removeMessage } = useChat(roomId);

  return (
    <div className={s.chatRoom}>
      <h2 className="text-center" className={s.roomName}>
        Room: {roomId}
      </h2>
      <UserList users={users} />
      <MessageList messages={messages} removeMessage={removeMessage} />
      <MessageForm username={state.user.email} sendMessage={sendMessage} />
    </div>
  );
}
