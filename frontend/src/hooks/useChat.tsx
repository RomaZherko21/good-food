import { useContext, useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

import { useBeforeUnload } from './useBeforeUnload';
import { AppContext } from '../state/context';
import { messageType } from '../views/chat/types';

const SERVER_URL: string | undefined = process.env.REACT_APP_SERVER_URL;

export function useChat<usersType, messagesType>(roomId: string) {
  const { state } = useContext(AppContext);
  const [users, setUsers] = useState<usersType | []>([]);
  const [messages, setMessages] = useState<messageType[]>([]);

  const userId = state.user.id;
  const username = state.user.email;

  const socketRef = useRef<any>(null);

  useEffect(() => {
    socketRef.current = io(SERVER_URL ? SERVER_URL : '', {
      query: { roomId },
    });

    socketRef.current.emit('user:add', { username, userId });

    socketRef.current.on('users', (users: usersType) => {
      setUsers(users);
    });

    socketRef.current.emit('message:get');

    socketRef.current.on('messages', (messages: messagesType) => {
      let newMessages =
        Array.isArray(messages) &&
        messages.map((msg: messageType) =>
          msg.userId === userId ? { ...msg, currentUser: true } : msg
        );
      newMessages && setMessages(newMessages);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId, userId, username]);

  const sendMessage = ({
    messageText,
    senderName,
  }: {
    messageText: string;
    senderName: string;
  }) => {
    socketRef.current.emit('message:add', {
      userId,
      messageText,
      senderName,
    });
  };

  const removeMessage = (id: string) => {
    socketRef.current.emit('message:remove', id);
  };

  useBeforeUnload(() => {
    socketRef.current.emit('user:leave', { userId, username });
  });

  return { users, messages, sendMessage, removeMessage };
}
