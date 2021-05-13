import { useParams } from 'react-router-dom';
// hooks
import { useChat } from '../../hooks/useChat';
import { useLocalStorage } from '../../hooks/useLocalstorage';
// components
import { MessageForm } from './MessageForm';
import { MessageList } from './MessageList';
import { UserList } from './UserList';
// styles
import { Container } from 'react-bootstrap';

export function ChatRoom() {
  const { roomId } = useParams();
  const [username] = useLocalStorage('username');
  const { users, messages, sendMessage, removeMessage } = useChat(roomId);

  return (
    <Container>
      <h2 className="text-center">Room: {roomId === 'job' ? 'Job' : 'Free'}</h2>
      <UserList users={users} />
      <MessageList messages={messages} removeMessage={removeMessage} />
      <MessageForm username={username} sendMessage={sendMessage} />
    </Container>
  );
}
